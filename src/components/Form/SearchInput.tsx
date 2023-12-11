import React from 'react';
import {Box, IconButton, InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import {useDictionaryTranslate} from "../../hooks/pages";

interface SearchInputProps {
  value: string
  setValue: (value: string) => void
}

const SearchInput = (props: SearchInputProps) => {
  const {value, setValue} = props
  const dict = useDictionaryTranslate('form')
  const resetButtonIsHidden = !(!!value)
  const onClickResetButton = () => {
    setValue('')
  }
  return (
    <TextField
      className='search'
      size='small'
      sx={{mb: 1}}
      fullWidth
      variant="outlined"
      color='secondary'
      value={value}
      placeholder={`${dict('search')}...`}
      inputProps={{'aria-label': dict('search').toLowerCase()}}
      onChange={event => setValue(event.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon/>
          </InputAdornment>

        ),
        endAdornment: (
          <InputAdornment position="end">
            <Box hidden={resetButtonIsHidden}>
              <IconButton aria-label={dict('close').toLowerCase()} onClick={onClickResetButton} color="inherit">
                <CloseIcon/>
              </IconButton>
            </Box>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchInput;