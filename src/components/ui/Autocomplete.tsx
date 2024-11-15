import { Control, Controller } from 'react-hook-form';
import { InputType } from '../../types/form';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useContext } from 'react';
import { ProductsContext } from '../../providers/ProductsContext';

type ControllerProps = {
  control: Control<InputType>;
}

export const ControlledAutocomplete = ({ control }: ControllerProps) => {
    const {categories} = useContext(ProductsContext);
  
  return (
    <Controller
      name="category"
      control={control}
      render={({ field }) => (
        <Autocomplete
          options={categories}
          getOptionLabel={(option) => option}
          id="places"
          renderInput={(params) => <TextField {...params} sx={{textTransform: "capitalize"}} label="Category" />}
          {...field}
          value={field.value ||  null}
          onChange={(_, data) => {
            console.log({ data });
            field.onChange(data);
          }}
        />
      )}
    />
  );
}
