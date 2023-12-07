import React from 'react';
import Header from "../../components/Header";
import {Box} from "@mui/material";
import TagUrls from "../../components/TagUrls";
import {useDictionaryTranslate} from "../../hooks/pages";


const TagUrlPage = () => {
  const d = useDictionaryTranslate('tagUrl')
  return (
    <Box m={1}>
      <Box display='flex' justifyContent='space-around' alignItems='center'>
        <Header title={d('tagUrl')}/>
      </Box>
      <TagUrls/>
    </Box>
  );
};

export default TagUrlPage;