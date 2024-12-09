import { useState, useMemo } from 'react';
import { ClientEntry } from '../types/clients';

export const useClientFilters = (data: ClientEntry[]) => {
  const [rateFilter, setRateFilter] = useState("");
  const [currencyFilter, setCurrencyFilter] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);

  const requestSort = (key: string) => {
    let direction = "ascending";
    if (sortConfig?.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const filterData = (items: ClientEntry[]) => {
    return items.filter(item => {
      // Apply rate filter
      if (rateFilter) {
        const [min, max] = rateFilter.split('-').map(Number);
        if (max) {
          if (item.rate < min || item.rate > max) return false;
        } else {
          // Handle "151+" case
          if (item.rate < min) return false;
        }
      }

      // Apply currency filter
      if (currencyFilter && item.currency !== currencyFilter) {
        return false;
      }

      return true;
    });
  };

  const filteredAndSortedData = useMemo(() => {
    let sortableItems = [...data];
    
    // Apply filters first
    sortableItems = filterData(sortableItems);
    
    // Then apply sorting
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
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
  }, [data, sortConfig, rateFilter, currencyFilter]);

  return {
    rateFilter,
    setRateFilter,
    currencyFilter,
    setCurrencyFilter,
    sortConfig,
    requestSort,
    filteredAndSortedData
  };
};