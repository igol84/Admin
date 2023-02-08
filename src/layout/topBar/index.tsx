import React, {useContext} from 'react';
import {Box, IconButton, useTheme} from "@mui/material";
import {ColorModeContext} from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"
import {useLocation} from "react-router-dom";
import {ButtonLink} from "./ButtonLink";


const TopBar = () => {
  const location = useLocation()
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)

  return (
    <Box sx={{display: 'flex', justifyContent: 'flex-end'}} p={2}>

      {/*ICONS*/}
      <Box sx={{display: 'flex'}}>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? (
            <DarkModeOutlinedIcon/>
          ) : (
            <LightModeOutlinedIcon/>
          )}
        </IconButton>

        <ButtonLink icon={<PersonOutlineIcon/>} to='/auth' location={location.pathname} />

      </Box>
    </Box>
  )
}

export default TopBar