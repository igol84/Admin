import React from "react";
import {ItemForm} from "./types";
import {TableCell, TableHead, TableRow, TableSortLabel} from "@mui/material";
import {HeadCell, Order} from "../../hooks/form-data";

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof ItemForm) => void;
  order: Order;
  orderBy: keyof ItemForm;
  headCells: readonly HeadCell<ItemForm>[]
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {order, orderBy, onRequestSort, headCells} = props
  const createSortHandler =
    (property: keyof ItemForm) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell width='120px' />
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead