"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Payment = {
    employeeId: string;
    name: string;
    department: string;
    training: string;
    status: "Not Started" | "In Progress" | "Completed";
    startDate: string | null;
    completionDate: string | null;
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "employeeId",
        header: "Employee ID",
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "department",
        header: "Department",
      },
      {
        accessorKey: "training",
        header: "Training",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "startDate",
        header: "Start Date",
        cell: ({ row }) => (row.original.startDate ? row.original.startDate : "N/A"),
      },
      {
        accessorKey: "completionDate",
        header: "Completion Date",
        cell: ({ row }) =>
          row.original.completionDate ? row.original.completionDate : "N/A",
      },
]