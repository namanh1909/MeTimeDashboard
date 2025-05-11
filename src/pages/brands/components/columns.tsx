'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';

import DataTableColumnHeader from '@/components/common/DataTableColumnHeader/DataTableColumnHeader';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Brand } from '@/features/brands/services/type';
import { useModalStore } from '@/hooks/';

// Removed the top-level hook call and will use it inside the cell function

// This type is used to define the shape of our data.

export const columns: ColumnDef<Brand>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="ml-2"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'imageURL',
    header: 'Thumbnail',
    cell: ({ row }) => {
      const thumbnail: string = row.getValue('imageURL');
      return (
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={thumbnail}
            width={40}
            height={40}
            alt="Product thumbnail"
          />
        </div>
      );
    },
  },
  {
    accessorKey: 'brandName',
    header: 'Brand Name',
  },
  {
    accessorKey: 'qty',
    header: 'Quantity product',
  },
  {
    accessorKey: 'description',
    // header: 'Short Description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Short Description" />
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const brand = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                const open = useModalStore((state) => state.open);
                open({ params: brand });
              }}
            >
              <Edit className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
