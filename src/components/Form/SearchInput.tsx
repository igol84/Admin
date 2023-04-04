import React from 'react';
import {Box, InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import {GridActionsCellItem} from "@mui/x-data-grid";

interface SearchInputProps {
  value: string
  setValue: (value: string) => void
}

const SearchInput = (props: SearchInputProps) => {
  const {value, setValue} = props
  const resetButtonIsHidden = !(!!value)
  const onClickResetButton = () => {
    setValue('')
  }
  return (
    <TextField
      sx={{mb: 1}}
      fullWidth
      variant="outlined"
      color='secondary'
      value={value}
      placeholder="Search…"
      inputProps={{'aria-label': 'search'}}
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
              <GridActionsCellItem icon={<CloseIcon/>} label={'close'} onClick={onClickResetButton} color="inherit"/>
            </Box>
          </InputAdornment>

        ),
      }}
    />
  );
};

export default SearchInput;