"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Payment } from "../_types"

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

export const employeeData = [
  {
    employeeId: "E001",
    name: "John Doe",
    department: "Sales",
    training: "Workplace Safety",
    status: "Completed",
    startDate: "2024-01-01",
    completionDate: "2024-01-15",
  },
  {
    employeeId: "E002",
    name: "Jane Smith",
    department: "Marketing",
    training: "Code of Conduct",
    status: "In Progress",
    startDate: "2024-01-10",
    completionDate: null,
  },
  {
    employeeId: "E003",
    name: "Sam Wilson",
    department: "IT",
    training: "Cybersecurity Awareness",
    status: "Not Started",
    startDate: null,
    completionDate: null,
  },
]