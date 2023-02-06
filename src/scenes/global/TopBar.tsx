import React, {useContext} from 'react';
import {Box, IconButton, InputBase, useTheme} from "@mui/material";
import {ColorModeContext, tokens} from "../../theme";
import SearchIcon from "@mui/icons-material/Search"
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"

const TopBar = () => {
   const theme = useTheme()
   const colors = tokens(theme.palette.mode)
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

            <IconButton>
               <NotificationsOutlinedIcon/>
            </IconButton>

            <IconButton>
               <SettingsOutlinedIcon/>
            </IconButton>

            <IconButton>
               <PersonOutlineIcon/>
            </IconButton>
         </Box>
      </Box>
   )
}

export default TopBar;