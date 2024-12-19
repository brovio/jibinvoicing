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
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Timesheet Client</TableHead>
            <TableHead>Suggested Match</TableHead>
            <TableHead>Confidence</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mappings.map((mapping) => (
            <TableRow key={mapping.mapping_id}>
              <TableCell>{mapping.timesheet_client_name}</TableCell>
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
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select a client..." />
                  </SelectTrigger>
                  <SelectContent>
                    {mapping.available_clients.map((client) => (
                      <SelectItem
                        key={client.clientid}
                        value={client.clientid.toString()}
                      >
                        {client.company}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
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
                      className="h-8 w-8 p-0"
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
                      className="h-8 w-8 p-0"
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