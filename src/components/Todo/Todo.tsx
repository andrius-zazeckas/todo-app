import {
  Box,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { NewTodo } from "./NewTodo";
import { useState } from "react";

export const Todo = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [completedTodos, setCompletedTodos] = useState<any[]>([]);

  const handleCheck = (id: number) => {
    const todoToComplete = todos[id];
    const updatedTodos = todos.filter((_, i) => i !== id);
    setTodos(updatedTodos);
    setCompletedTodos([...completedTodos, { ...todoToComplete, done: true }]);
  };

  const handleUnceck = (id: number) => {
    const todoToUncomplete = completedTodos[id];
    const updatedCompletedTodos = completedTodos.filter((_, i) => i !== id);
    setCompletedTodos(updatedCompletedTodos);
    setTodos([
      ...todos,
      { ...todoToUncomplete, done: false, added: new Date().getTime() },
    ]);
  };
  console.log("completedTodos", completedTodos);

  console.log("todos", todos);
  const passDataToParent = (list: any) => {
    const sortedList = list.sort((a: any, b: any) => b.added - a.added);
    setTodos(sortedList);
  };

  return (
    <Box mt={"20px"} p={"20px"}>
      <NewTodo passDataToParent={passDataToParent} />
      <Stack
        divider={<Divider orientation="horizontal" flexItem />}
        spacing={2}
      >
        {todos.map((item: any, id: number) => (
          <List
            key={id}
            sx={{
              width: "100%",
              bgcolor: "background.paper",
              boxShadow: "5px 5px 5px lightgray",
              borderRadius: "5px",
            }}
          >
            <ListItem
              // sx={{ textDecoration: item.done ? "line-through" : "none" }}
              secondaryAction={
                <IconButton edge="end">
                  <Typography variant="h6">Delete</Typography>
                </IconButton>
              }
            >
              <ListItemText primary={item.todo} />

              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={item.done}
                  onChange={() => handleCheck(id)}
                />
              </ListItemIcon>
            </ListItem>
          </List>
        ))}
      </Stack>
      {completedTodos.length > 0 && (
        <Box>
          <Stack
            divider={<Divider orientation="horizontal" flexItem />}
            spacing={2}
          >
            <Typography variant="h6">Completed Todos</Typography>
            {completedTodos.map((item: any, id: number) => (
              <List
                key={id}
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                  boxShadow: "5px 5px 5px lightgray",
                  borderRadius: "5px",
                }}
              >
                <ListItem
                  // sx={{ textDecoration: item.done ? "line-through" : "none" }}
                  secondaryAction={
                    <IconButton edge="end">
                      <Typography variant="h6">Delete</Typography>
                    </IconButton>
                  }
                >
                  <ListItemText primary={item.todo} />

                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={item.done}
                      onChange={() => handleUnceck(id)}
                    />
                  </ListItemIcon>
                </ListItem>
              </List>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
};
