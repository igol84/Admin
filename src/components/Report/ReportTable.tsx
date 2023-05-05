import React from 'react';
import {Report} from "../../schemas/report";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

interface Props {
  report: Report[]
}

const ReportTable = ({report}: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Proceeds</TableCell>
            <TableCell align="right">Costs</TableCell>
            <TableCell align="right">Profit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {report.map(row => (
            <TableRow key={row.data} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
              <TableCell component="th" scope="row"> {row.data} </TableCell>
              <TableCell align="right">{row.proceeds}</TableCell>
              <TableCell align="right">{row.costs}</TableCell>
              <TableCell align="right">{row.proceeds - row.costs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ReportTable;