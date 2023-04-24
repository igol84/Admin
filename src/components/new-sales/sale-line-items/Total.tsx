import React, {useContext} from 'react'
import {Box} from "@mui/material";
import {ViewTotal} from "./types";
import {useDictionaryTranslate} from "../../../hooks/pages";
import {formatter} from "../../Form";
import {LanguageModeContext} from "../../../language";

interface TotalProps {
  viewTotal: ViewTotal
}

const Total = ({viewTotal}: TotalProps) => {
  const {proceeds, income} = viewTotal
  const {language} = useContext(LanguageModeContext)
  const d = useDictionaryTranslate('NewSales')
  return (
    <Box>
      <Box>
        {d('Proceeds')}: {formatter(language).format(proceeds)}
      </Box>
      <Box>
        {d('Income')}: {formatter(language).format(income)}
      </Box>
    </Box>
  )
}

export default Total