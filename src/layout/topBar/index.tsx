import React, {useContext} from 'react';
import {Box, Button, Fade, IconButton, Menu, MenuItem, useTheme} from "@mui/material";
import {ColorModeContext} from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"
import {useLocation} from "react-router-dom";
import {ButtonLink} from "./ButtonLink";
import {LanguageModeContext, LanguageType} from "../../language";


const TopBar = () => {
  const {language, setLanguageMode, languageOptions} = useContext(LanguageModeContext)
  const location = useLocation()
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)


  const [anchorLanguageMenu, setAnchorLanguageMenu] = React.useState<null | HTMLElement>(null);
  const openLanguageMenu = Boolean(anchorLanguageMenu);
  const onClickLanguageButton = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorLanguageMenu(event.currentTarget);
  };
  const onCloseLanguageMenu = () => {
    setAnchorLanguageMenu(null);
  }

  const MenuItemLangCreator = (language: LanguageType, currentLanguage: LanguageType) => () => {
    const onClick = () => {
      setAnchorLanguageMenu(null);
      setLanguageMode(language)
    }
    const isSelected = language === currentLanguage
    const fullLanguageName = languageOptions[language]
    return (
      <MenuItem onClick={onClick} disabled={isSelected}>{fullLanguageName}</MenuItem>
    )
  };

  const MenuItemUa = MenuItemLangCreator('ua', language)
  const MenuItemRu = MenuItemLangCreator('ru', language)
  const MenuItemEn = MenuItemLangCreator('en', language)

  return (
    <Box sx={{display: 'flex', justifyContent: 'flex-end'}} pt={2} px={2}>

      {/*ICONS*/}
      <Box sx={{display: 'flex'}}>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? (
            <DarkModeOutlinedIcon/>
          ) : (
            <LightModeOutlinedIcon/>
          )}
        </IconButton>

        <ButtonLink icon={<PersonOutlineIcon/>} to='/auth' location={location.pathname}/>

        <Button
          id="fade-button"
          aria-controls={openLanguageMenu ? 'fade-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openLanguageMenu ? 'true' : undefined}
          onClick={onClickLanguageButton}
          color='inherit'
          size='large'
        >
          {language}
        </Button>
        <Menu
          id="fade-menu"
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          anchorEl={anchorLanguageMenu}
          open={openLanguageMenu}
          onClose={onCloseLanguageMenu}
          TransitionComponent={Fade}
        >
          <MenuItemUa/>
          <MenuItemRu/>
          <MenuItemEn/>
        </Menu>

      </Box>
    </Box>
  )
}

export default TopBar