import {menuClasses, MenuItemStyles, useProSidebar} from "react-pro-sidebar";
import {PaletteMode, tokens} from "../../theme";
import {useTheme} from "@mui/material";

export const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const menuItemStyles = (): MenuItemStyles=>{
  const {collapsed} = useProSidebar();
  const theme = useTheme()
  const themeName = theme.palette.mode
  const color = tokens(themeName)
  return ({
    icon: {
      color: color.grey[100],
      [`&.${menuClasses.disabled}`]: {
        color: color.grey[300],
      },
      [`&.${menuClasses.active}`]: {
        color: color.greenAccent[500],
      },
    },
    SubMenuExpandIcon: {
      color:  color.grey[300],
    },

    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? hexToRgba( color.grey[300], !collapsed ? 0.4 : 1)
          : 'transparent',
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: color.grey[100],
      },
      '&:hover': {
        backgroundColor: hexToRgba(color.primary[500], 0.2),
        color: color.grey[100],
      },
      [`&.${menuClasses.active}`]: {
        color: color.greenAccent[500],
      },

    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  })
}