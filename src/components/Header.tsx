import React from 'react';
import {Box, Typography, useTheme} from "@mui/material";
import {tokens} from "../theme";

interface headerModel{
  title: string
  subTitle: string
}

function Header({title, subTitle}: headerModel) {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <Box mb={'30px'}>
      <Typography
        variant='h2'
        color={colors.grey[100]}
        fontWeight='bold'
        sx={{mb: '5px'}}
      >
        {title}
      </Typography>
      <Typography
        variant='h5' color={colors.greenAccent[400]}
      >
        {subTitle}
      </Typography>
    </Box>
  );
}

export default Header;