import { Box, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { NewTodo } from "./NewTodo";
import { useState } from "react";

export const Todo = () => {
  const [list, setList] = useState([]);

  const passDataToParent = (list: any) => {
    setList(list);
  };

  return (
    <Box mt={"20px"} p={"20px"}>
      <Stack
        divider={<Divider orientation="horizontal" flexItem />}
        spacing={2}
      >
        <NewTodo passDataToParent={passDataToParent} />
        {list.map((item: any, index) => (
          <Typography
            variant="body1"
            p={"10px"}
            key={index}
            sx={{
              color: "black",
              bgcolor: "white",
              boxShadow: 3,
              justifyContent: "left",
              borderRadius: "2px",
            }}
          >
            {item.todo}
            {item.done ? " ✅" : " ❌"}
          </Typography>
        ))}
      </Stack>
    </Box>
  );
};
