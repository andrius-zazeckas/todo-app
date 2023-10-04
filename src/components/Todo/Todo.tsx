import { Box } from "@mui/material";
import { Sidebar } from "../Sidebar/Sidebar";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

export const Todo = () => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        p: 2,
        width: "50%",
        justifyContent: "center",
      }}
    >
      <Stack
        divider={<Divider orientation="horizontal" flexItem />}
        spacing={2}
        justifyContent="center"
      >
        <p>One</p>
        <p>Two</p>
        <p>Three</p>
      </Stack>
    </Box>
  );
};
