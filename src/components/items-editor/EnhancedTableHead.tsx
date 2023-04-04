import React, {Dispatch, SetStateAction} from "react";
import {ItemForm} from "./types";
import {TableCell, TableHead, TableRow, TableSortLabel, TextField} from "@mui/material";
import {HeadCell, Order} from "../../hooks/form-data";

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof ItemForm) => void
  order: Order
  orderBy: keyof ItemForm
  headCells: readonly HeadCell<ItemForm>[]
  search: string
  setSearch: Dispatch<SetStateAction<string>>
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {order, orderBy, onRequestSort, headCells, search, setSearch} = props
  const createSortHandler = (property: keyof ItemForm) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }
  const searchInput =
    <TextField
      type="search"
      variant="standard"
      color='secondary'
      value={search}
      onChange={event => setSearch(event.target.value)}
    />
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
            {headCell.id == 'name' && searchInput}

          </TableCell>
        ))}
        <TableCell width='120px'/>
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead