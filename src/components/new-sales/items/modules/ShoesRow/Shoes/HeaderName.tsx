import React from 'react';
import {Box} from "@mui/material";
import {AnimatePresence, motion} from "framer-motion";
import CloseButton from "../../../../../Form/CloseButton";


interface HeaderProps {
  selected: boolean
  name: string
  onClose: () => void
}

const HeaderName = (props: HeaderProps) => {
  const {selected, name, onClose} = props

  return (
    <Box className='header'>
      <Box sx={{width: '250px'}}>{name}</Box>
      <Box sx={{flex: '1'}}></Box>
      <AnimatePresence>
        {selected &&
          <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0, transition: {duration: 0.1}}}>
            <CloseButton onClick={onClose}/>
          </motion.div>}
      </AnimatePresence>
    </Box>
  );
};

export default HeaderName