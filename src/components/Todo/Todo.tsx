import { Box, Checkbox, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { NewTodo } from "./NewTodo";
import { useState } from "react";

export const Todo = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const handleCheckChange = () => {
    setIsAllChecked(!isAllChecked);
  };

  const passDataToParent = (list: any) => {
    setTodos(list);
  };

  return (
    <Box mt={"20px"} p={"20px"}>
      <Stack
        divider={<Divider orientation="horizontal" flexItem />}
        spacing={2}
      >
        <NewTodo passDataToParent={passDataToParent} />
        {todos.map((item: any, index: number) => (
          <Box
            key={index}
            display={"flex"}
            justifyContent="space-between"
            sx={{
              color: "black",
              bgcolor: "white",
              padding: "10px",
              boxShadow: "5px 5px 5px lightgray",
              borderRadius: "5px",
            }}
          >
            <Typography variant="body1" p={"10px"}>
              {item.todo}
            </Typography>
            <Checkbox value={item.done} onClick={handleCheckChange} />
          </Box>
        ))}
      </Stack>
    </Box>
  );
};
