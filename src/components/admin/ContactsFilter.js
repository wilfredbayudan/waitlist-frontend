import React from "react";
import styled from "styled-components";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Search = styled.div`
  float: left;
`;

const Sort = styled.div`
  float: right;
`;

function ContactsFilter({ sort, setSort, search, setSearch }) {
  
  function handleSortChange(e) {
    setSort(e.target.value)
  }

  function handleSearchChange(e) {
    setSearch(e.target.value)
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    console.log(`Submitting with ${sort} and/or ${search}`)
  }

  return (
    <div style={{ marginBottom: "10px" }}>
      <Search>
        <form onSubmit={handleSearchSubmit}>
        <TextField id="nameSearch" label="Search by name..." variant="outlined" size="small" value={search} onChange={handleSearchChange} />
        </form>
      </Search>
      <Sort>
        <FormControl style={{ width: "200px" }}>
          <InputLabel id="sort-by-label" size="small">Sort By</InputLabel>
          <Select
            labelId="sort-by-label"
            id="sort-by"
            label="Sort By"
            size="small"
            value={sort}
            onChange={handleSortChange}
          >
            <MenuItem value="firstNameAsc">First Name (Asc)</MenuItem>
            <MenuItem value="firstNameDesc">First Name (Desc)</MenuItem>
            <MenuItem value="lastNameAsc">Last Name (Asc)</MenuItem>
            <MenuItem value="lastNameDesc">Last Name (Desc)</MenuItem>
            <MenuItem value="signupDateAsc">Oldest</MenuItem>
            <MenuItem value="signupDateDesc">Newest</MenuItem>
          </Select>
        </FormControl>
      </Sort>
      <div style={{ clear: "both"}}></div>
    </div>
  )
}

export default ContactsFilter;