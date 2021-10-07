import React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function CheckinFilter({ locationConfig, locationFilter, setLocationFilter }) {

  function handleLocationChange(e) {
    setLocationFilter(e.target.value);
  }

  const renderLocationOptions = locationConfig.map(location => {
    if (location.contactTracing) {
      return <MenuItem key={location.id} value={location.id}>{location.id} - {location.name}</MenuItem>
    }
    return null;
  })

  return (
    <div style={{ marginBottom: "10px" }}>
      <FormControl style={{ width: "200px" }}>
        <InputLabel id="Filter-by-label" size="small">Filter By Location</InputLabel>
        <Select
          labelId="Filter-by-label"
          id="Filter-by"
          label="Filter By Location"
          size="small"
          value={locationFilter}
          onChange={handleLocationChange}
        >
          <MenuItem value="All">All</MenuItem>
          {renderLocationOptions}
        </Select>
      </FormControl>
    </div>
  )
}

export default CheckinFilter;