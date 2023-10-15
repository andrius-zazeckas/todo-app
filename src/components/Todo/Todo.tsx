import { Box, Checkbox, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { NewTodo } from "./NewTodo";
import { useState } from "react";

export const Todo = () => {
  const [todos, setTodos] = useState<any[]>([]);

  const handleCheckChange = (id: number) => {
    const updatedTodos = [...todos];
    const checkedTodo = updatedTodos[id];
    updatedTodos.splice(id, 1);
    updatedTodos.push(checkedTodo);
    checkedTodo.done = !checkedTodo.done;
    setTodos(updatedTodos);
  };

  console.log(todos);
  const passDataToParent = (list: any) => {
    const sortedList = list.sort((a: any, b: any) => b.id - a.id);
    setTodos(sortedList);
  };

  return (
    <Box mt={"20px"} p={"20px"}>
      <Stack
        divider={<Divider orientation="horizontal" flexItem />}
        spacing={2}
      >
        <NewTodo passDataToParent={passDataToParent} />
        {todos.map((item: any, id: number) => (
          <Box
            key={id}
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
            <Typography
              variant="body1"
              p={"10px"}
              sx={{ textDecoration: item.done ? "line-through" : "none" }}
            >
              {item.todo}
            </Typography>
            <Checkbox
              checked={item.done}
              onChange={() => handleCheckChange(id)}
            />
          </Box>
        ))}
      </Stack>
    </Box>
  );
};
