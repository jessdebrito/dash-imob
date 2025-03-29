"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type RoomColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<RoomColumn>[] = [
  {
    accessorKey: "name",
    header: "Nome (TAG)",
  },
  {
    accessorKey: "value",
    header: "Quantidade",
  },
  {
    accessorKey: "createdAt",
    header: "Data de criação",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
