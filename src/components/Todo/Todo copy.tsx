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
import type { TodoType } from "./types/Todo";
import { Delete } from "@mui/icons-material";

export const Todo = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [completedTodos, setCompletedTodos] = useState<TodoType[]>([]);

  const handleCheck = (id: number) => {
    const todoToComplete = todos[id];
    const updatedTodos = todos.filter((_, i) => i !== id);

    todoToComplete.done = true;
    setTodos(updatedTodos);

    // setTodos(updatedTodos);
    setCompletedTodos([...completedTodos, { ...todoToComplete }]);
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

  const handleDelete = (id: number, isCompleted: boolean) => {
    if (isCompleted) {
      const updatedCompletedTodos = completedTodos.filter((_, i) => i !== id);
      setCompletedTodos(updatedCompletedTodos);
    } else {
      const updatedTodos = todos.filter((_, i) => i !== id);
      setTodos(updatedTodos);
    }
  };

  console.log("todos", todos);
  console.log("completedTodos", completedTodos);
  const passDataToParent = (list: TodoType[]) => {
    console.log("list", list);
    const sortedList = list.sort(
      (a: TodoType, b: TodoType) => b.added - a.added
    );
    setTodos([...sortedList]); // Clear the existing todos and set them with the sorted list
  };

  return (
    <Box mt={"20px"} p={"20px"}>
      <NewTodo passDataToParent={passDataToParent} />
      <Stack
        divider={<Divider orientation="horizontal" flexItem />}
        spacing={2}
      >
        {todos.map((item: TodoType, id: number) => (
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
                <IconButton edge="end" onClick={() => handleDelete(id, false)}>
                  <Delete />
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
            {completedTodos.map((item: TodoType, id: number) => (
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
                  sx={{ textDecoration: item.done ? "line-through" : "none" }}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={() => handleDelete(id, true)}
                    >
                      <Delete />
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
