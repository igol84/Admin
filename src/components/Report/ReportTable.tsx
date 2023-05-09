import React, {useContext} from 'react';
import {Report} from "../../schemas/report";
import {Box} from "@mui/material";
import {useBoxGridTableStyle} from "../Form/style";
import {DataGrid, GridColumns, GridValueFormatterParams, GridValueGetterParams} from "@mui/x-data-grid";
import {useDictionaryTranslate, useMuiLanguage} from "../../hooks/pages";
import {LanguageModeContext} from "../../language";
import {formatter} from "../Form";

interface Props {
  data: Report[]
}

const ReportTable = ({data}: Props) => {
  const d = useDictionaryTranslate('report')
  const boxTableStyle = useBoxGridTableStyle()
  const muiLanguage = useMuiLanguage()
  const {language} = useContext(LanguageModeContext)
  const formatMany = (value: string) => formatter(language).format(Number(value))
  const columns: GridColumns = [
    {
      field: 'data', headerName: d('date'), minWidth: 80, flex: 1,
      valueFormatter: (params: GridValueFormatterParams<string>) => {
        if (params.value.length === 7) {
          const dataSplit = params.value.split('-')
          return `${dataSplit[1]}.${dataSplit[0]}`
        } else {
          return params.value
        }
      }
    },
    {
      field: 'proceeds', headerName: d('proceeds'), minWidth: 120, flex: 1,
      valueFormatter: (params: GridValueFormatterParams<string>) => formatMany(params.value)
    },
    {
      field: 'costs', headerName: d('costs'), minWidth: 120, flex: 1,
      valueFormatter: (params: GridValueFormatterParams<string>) => formatMany(params.value)
    },
    {
      field: 'profit', headerName: d('profit'), minWidth: 120, flex: 1,
      valueGetter: (params: GridValueGetterParams) => params.row.proceeds - params.row.costs,
      valueFormatter: (params: GridValueFormatterParams<string>) => formatMany(params.value)
    },
  ]
  return (
    <Box height="60vh" sx={boxTableStyle}>
      <DataGrid
        columns={columns}
        rows={data}
        getRowId={(row) => row.data}
        localeText={muiLanguage.components.MuiDataGrid.defaultProps.localeText}
      />
    </Box>
  )
}

export default ReportTable;