import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClientMapping } from "./types";

interface ClientMappingTableProps {
  mappings: ClientMapping[];
  onUpdateMapping: (mapping: ClientMapping) => void;
}

export const ClientMappingTable = ({
  mappings,
  onUpdateMapping,
}: ClientMappingTableProps) => {
  return (
    <div className="border border-dashboard-border rounded-lg">
      <Table>
        <TableHeader className="bg-dashboard-hover">
          <TableRow className="hover:bg-dashboard-hover border-b border-dashboard-border">
            <TableHead className="text-gray-400 font-medium">Timesheet Client</TableHead>
            <TableHead className="text-gray-400 font-medium">Suggested Match</TableHead>
            <TableHead className="text-gray-400 font-medium">Confidence</TableHead>
            <TableHead className="text-gray-400 font-medium">Status</TableHead>
            <TableHead className="text-gray-400 font-medium">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mappings.map((mapping) => (
            <TableRow 
              key={mapping.mapping_id}
              className="hover:bg-dashboard-hover border-b border-dashboard-border"
            >
              <TableCell className="text-white">{mapping.timesheet_client_name}</TableCell>
              <TableCell>
                <Select
                  value={mapping.brovio_client_id?.toString() || ""}
                  onValueChange={(value) =>
                    onUpdateMapping({
                      ...mapping,
                      brovio_client_id: parseInt(value),
                      manually_verified: true,
                    })
                  }
                >
                  <SelectTrigger className="w-[200px] bg-dashboard-card border-dashboard-border text-white">
                    <SelectValue placeholder="Select a client..." />
                  </SelectTrigger>
                  <SelectContent className="bg-dashboard-card border-dashboard-border">
                    {mapping.available_clients.map((client) => (
                      <SelectItem
                        key={client.clientid}
                        value={client.clientid.toString()}
                        className="text-white hover:bg-dashboard-hover cursor-pointer"
                      >
                        {client.company}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-white">
                {mapping.confidence_score ? 
                  `${(mapping.confidence_score * 100).toFixed(0)}%` : 
                  'N/A'
                }
              </TableCell>
              <TableCell>
                {mapping.manually_verified ? (
                  <span className="flex items-center text-green-500">
                    <Check className="w-4 h-4 mr-1" />
                    Verified
                  </span>
                ) : (
                  <span className="flex items-center text-yellow-500">
                    Pending
                  </span>
                )}
              </TableCell>
              <TableCell>
                {!mapping.manually_verified && mapping.brovio_client_id && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-green-500 hover:text-green-400 hover:bg-dashboard-hover"
                      onClick={() =>
                        onUpdateMapping({
                          ...mapping,
                          manually_verified: true,
                        })
                      }
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-400 hover:bg-dashboard-hover"
                      onClick={() =>
                        onUpdateMapping({
                          ...mapping,
                          brovio_client_id: null,
                          manually_verified: false,
                        })
                      }
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};