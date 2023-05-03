import React from 'react';
import {motion} from "framer-motion";
import {Box, Divider, useTheme} from "@mui/material";
import {SelectedSize} from "./index";
import {tokens} from "../../../../../../theme";

interface SizeProps {
  selected: boolean
  id: number
  size: number
  price: number
  qty: number
  onSizeClick: (selectedSize: SelectedSize) => void
  onResetSize: () => void
}

const Size = (props: SizeProps) => {
  const {selected, id, qty, size, price, onSizeClick, onResetSize} = props
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const onClick = () => {
    selected ? onResetSize() : onSizeClick({id, price})
  }
  const className = `paper size${selected ? ' selected' : ''}`
  const variantsColors = {
    default: {backgroundColor: colors.blueAccent[700]},
    selected: {y: -3, backgroundColor: colors.blueAccent[600]},
    hover: {y: -3, backgroundColor: colors.blueAccent[500]}
  }
  return (
    <motion.div className={className} onClick={onClick} key={id} layoutId={id.toString()}
                variants={variantsColors}
                initial={selected ? {} : 'default'}
                animate={selected ? {} : 'selected'}
                whileHover={selected ? {} : 'hover'}
    >
      <Box>{size}</Box>
      <Divider orientation="horizontal" flexItem/>
      <Box>{qty}</Box>
    </motion.div>
  );
};

export default Size;