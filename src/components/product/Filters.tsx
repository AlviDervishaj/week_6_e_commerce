import Box from "@mui/material/Box/Box";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState, useContext } from "react";
import { availableSorts } from '../../utils/products';
import { ProductsContext } from "../../providers/ProductsContext";

export const Filters = () => {
  const { sortDefault, sortByPriceAscending, sortByPriceDescending } = useContext(ProductsContext);
  const [sort, setSort] = useState<string>('all');

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
    const _value = event.target.value;
    switch (_value as string) {
      case 'all':
        console.log('All');
        sortDefault();
        break;
      case 'price-low-to-high':
        console.log('Price: Low to High');
        sortByPriceAscending();
        break;
      case 'price-high-to-low':
        console.log('Price: High to Low');
        sortByPriceDescending();
        break;
      default:
        console.log('Unknown filter');
        sortDefault();
    }
  };
  return (
    <Box sx={{ width: 200, marginLeft: "auto", paddingRight: 5, paddingBottom: 6 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sort}
          label="Age"
          onChange={handleChange}
        >
          {availableSorts.map((filter) => <MenuItem key={filter.value} value={filter.value}>{filter.label}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  )
}
