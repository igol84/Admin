import React from 'react';
import {Box, CircularProgress} from "@mui/material";

interface ILoadingIcon{
  show: boolean
}

const LoadingCircular = ({show = true}: ILoadingIcon) => (
    <Box
      sx={{
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        display: show ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress color="secondary"/>
    </Box>
  )


export default LoadingCircular