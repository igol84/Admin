import React from "react";
import {IconButton, SvgIconProps} from "@mui/material";
import {Link} from "react-router-dom";

interface ButtonLink{
  icon: React.ReactElement<SvgIconProps>
  to: string
  location: string
}

export const ButtonLink = ({icon, to, location}: ButtonLink)=>{
  return (
    <IconButton
      component={Link}
      to={to}
      color={location === to ? 'secondary' : undefined}
    >
      {icon}
    </IconButton>
  )
}