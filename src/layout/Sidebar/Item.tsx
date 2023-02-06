import React from "react";
import {SvgIconProps, Typography} from "@mui/material";
import {MenuItem} from "react-pro-sidebar";
import {Link} from "react-router-dom";

interface ItemModel {
  title: string
  to: string
  icon: React.ReactElement<SvgIconProps>
  location: string
}

export const Item = ({title, to, icon, location}: ItemModel) => {
  return (
    <MenuItem
      component={<Link to={to}/>}
      active={location === to}
      icon={icon}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  )
}