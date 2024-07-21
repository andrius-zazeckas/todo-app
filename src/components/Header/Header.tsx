import { Box, Typography } from "@mui/material";

export const Header = () => {
  return (
    <Box display={"flex"} justifyContent="center">
      <header>
        <Typography variant="h4">Todo App</Typography>
      </header>
    </Box>
  );
};
