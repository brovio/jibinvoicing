import { useState, useMemo } from 'react';
import { TimesheetEntry } from '../types/timesheet';

export const useTimesheetFilters = (data: TimesheetEntry[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [clientFilter, setClientFilter] = useState("");
  const [activityFilter, setActivityFilter] = useState("");
  const [staffFilter, setStaffFilter] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);

  const requestSort = (key: string) => {
    let direction = "ascending";
    if (sortConfig?.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const filterData = (items: TimesheetEntry[]) => {
    return items.filter(item => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || 
        item.client?.toLowerCase().includes(searchLower) ||
        item.activity?.toLowerCase().includes(searchLower) ||
        item.notes?.toLowerCase().includes(searchLower) ||
        item.full_name?.toLowerCase().includes(searchLower);

      const matchesClient = !clientFilter || item.client === clientFilter;
      const matchesActivity = !activityFilter || item.activity === activityFilter;
      const matchesStaff = !staffFilter || item.full_name === staffFilter;

      return matchesSearch && matchesClient && matchesActivity && matchesStaff;
    });
  };

  const filteredAndSortedData = useMemo(() => {
    let sortableItems = [...data];
    
    // Apply filters first
    sortableItems = filterData(sortableItems);
    
    // Then apply sorting
    if (sortConfig !== null) {
      sortableItems.sort((a: any, b: any) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig, searchQuery, clientFilter, activityFilter, staffFilter]);

  // Get unique values for filters
  const uniqueClients = useMemo(() => 
    Array.from(new Set(data.map(item => item.client))).filter(Boolean),
    [data]
  );

  const uniqueActivities = useMemo(() => 
    Array.from(new Set(data.map(item => item.activity))).filter(Boolean),
    [data]
  );

  const uniqueStaffNames = useMemo(() => 
    Array.from(new Set(data.map(item => item.full_name))).filter(Boolean),
    [data]
  );

  return {
    searchQuery,
    setSearchQuery,
    clientFilter,
    setClientFilter,
    activityFilter,
    setActivityFilter,
    staffFilter,
    setStaffFilter,
    sortConfig,
    requestSort,
    filteredAndSortedData,
    uniqueClients,
    uniqueActivities,
    uniqueStaffNames
  };
};