"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type ProductColumn = {
  id: string;
  name: string;
  adtype: string;
  price: string;
  size: string;
  category: string;
  color: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "isFeatured",
    header: "Em destaque",
  },
  {
    accessorKey: "isArchived",
    header: "Arquivado",
  },
  {
    accessorKey: "adtype",
    header: "Anúncio",
  },
  {
    accessorKey: "price",
    header: "Preço",
  },
  {
    accessorKey: "size",
    header: "Tamanho",
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "color",
    header: "Cor",
    cell: ({ row }) => (
      <div className="flex item-center gap-x-2">
        {row.original.color}
        <div
          className="h-6 w-6 border-2 border-neutral-300 rounded-full"
          style={{ backgroundColor: row.original.color }}
        />
      </div>
    ),
  },

  {
    accessorKey: "createdAt",
    header: "Data",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
