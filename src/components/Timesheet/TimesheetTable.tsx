import React, { useState, useMemo } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { TimesheetHeader } from "./TimesheetHeader";
import { TimesheetRow } from "./TimesheetRow";
import { TimesheetEntry } from "@/utils/timesheetParser";
import { TimesheetModal } from "./TimesheetModal";
import { Input } from "@/components/ui/input";

export const TimesheetTable = ({ data }: { data: TimesheetEntry[] }) => {
  const [sortConfig, setSortConfig] = React.useState<{ key: string; direction: string } | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<TimesheetEntry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filter states
  const [clientFilter, setClientFilter] = useState("");
  const [projectFilter, setProjectFilter] = useState("");
  const [minHours, setMinHours] = useState("");
  const [maxHours, setMaxHours] = useState("");

  const requestSort = (key: string) => {
    let direction = "ascending";
    if (sortConfig?.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedData = useMemo(() => {
    let filteredItems = [...data];

    // Apply filters
    if (clientFilter) {
      filteredItems = filteredItems.filter(item => 
        item.client.toLowerCase().includes(clientFilter.toLowerCase())
      );
    }

    if (projectFilter) {
      filteredItems = filteredItems.filter(item =>
        item.project.toLowerCase().includes(projectFilter.toLowerCase())
      );
    }

    if (minHours) {
      filteredItems = filteredItems.filter(item =>
        item.hours >= parseFloat(minHours)
      );
    }

    if (maxHours) {
      filteredItems = filteredItems.filter(item =>
        item.hours <= parseFloat(maxHours)
      );
    }

    // Apply sorting
    if (sortConfig !== null) {
      filteredItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return filteredItems;
  }, [data, sortConfig, clientFilter, projectFilter, minHours, maxHours]);

  const handleView = (entry: TimesheetEntry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
    console.log("Viewing entry:", entry);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Client</label>
          <Input
            placeholder="Filter by client..."
            value={clientFilter}
            onChange={(e) => setClientFilter(e.target.value)}
            className="bg-[#252A38] border-gray-800 text-white placeholder:text-gray-500"
          />
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Project</label>
          <Input
            placeholder="Filter by project..."
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            className="bg-[#252A38] border-gray-800 text-white placeholder:text-gray-500"
          />
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Min Hours</label>
          <Input
            type="number"
            placeholder="Min hours..."
            value={minHours}
            onChange={(e) => setMinHours(e.target.value)}
            className="bg-[#252A38] border-gray-800 text-white placeholder:text-gray-500"
          />
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Max Hours</label>
          <Input
            type="number"
            placeholder="Max hours..."
            value={maxHours}
            onChange={(e) => setMaxHours(e.target.value)}
            className="bg-[#252A38] border-gray-800 text-white placeholder:text-gray-500"
          />
        </div>
      </div>

      <div className="bg-[#252A38] rounded-[10px] overflow-hidden border border-gray-800">
        <Table>
          <TimesheetHeader onSort={requestSort} />
          <TableBody>
            {filteredAndSortedData.map((item, index) => (
              <TimesheetRow 
                key={index} 
                data={item} 
                onView={(entry) => handleView(entry)}
                onEdit={(entry) => console.log("Edit entry:", entry)}
                onDelete={(entry) => console.log("Delete entry:", entry)}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      
      <TimesheetModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        entry={selectedEntry}
      />
    </div>
  );
};