import { useState, useMemo } from "react";
import { ClientEntry } from "../types/clients";

export const useClientFilters = (initialData: ClientEntry[]) => {
  const [data, setData] = useState<ClientEntry[]>(initialData);
  const [rateFilter, setRateFilter] = useState("");
  const [currencyFilter, setCurrencyFilter] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  }>({ key: "", direction: "ascending" });

  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedData = useMemo(() => {
    let filteredData = [...data];

    if (rateFilter) {
      filteredData = filteredData.filter(client => 
        client.rate.toString() === rateFilter
      );
    }

    if (currencyFilter) {
      filteredData = filteredData.filter(client => 
        client.currency === currencyFilter
      );
    }

    if (sortConfig.key) {
      filteredData.sort((a: any, b: any) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredData;
  }, [data, rateFilter, currencyFilter, sortConfig]);

  return {
    rateFilter,
    setRateFilter,
    currencyFilter,
    setCurrencyFilter,
    sortConfig,
    requestSort,
    filteredAndSortedData,
    setData
  };
};