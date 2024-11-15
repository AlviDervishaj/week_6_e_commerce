import { useColorScheme } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export const ThemeSwitcher = () => {
  const { mode, setMode } = useColorScheme();
  return (
    <Select
      value={mode ? mode : 'light'}
      onChange={(event) =>
        setMode(event.target.value as 'system' | 'light' | 'dark')
      }
      sx={{ position: 'fixed', top: '1rem', right: '1rem' }}
    >
      <MenuItem value="system">System</MenuItem>
      <MenuItem value="light">Light</MenuItem>
      <MenuItem value="dark">Dark</MenuItem>
    </Select>
  );
}

