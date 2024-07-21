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
  const [uncompletedTodos, setUncompletedTodos] = useState<TodoType[]>([]);
  const [completedTodos, setCompletedTodos] = useState<TodoType[]>([]);

  const handleCheck = (id: number) => {
    const todoToComplete = uncompletedTodos[id];
    uncompletedTodos[id].done = true;
    const updatedUncompletedTodos = uncompletedTodos.filter((_, i) => i !== id);
    setUncompletedTodos(updatedUncompletedTodos);
    setCompletedTodos([
      ...completedTodos,
      { ...todoToComplete, done: true, added: new Date().getTime() },
    ]);
  };

  const handleUncheck = (id: number) => {
    const todoToUncheck = completedTodos[id];
    completedTodos[id].done = false;
    const updatedCompletedTodos = completedTodos.filter((_, i) => i !== id);
    setCompletedTodos(updatedCompletedTodos);
    setUncompletedTodos([
      ...uncompletedTodos,
      { ...todoToUncheck, done: false, added: new Date().getTime() },
    ]);
  };

  const handleDelete = (id: number, completed: boolean) => {
    const todoToDelete = completed ? completedTodos : uncompletedTodos;
    todoToDelete[id].deleted = true;
    const updatedTodos = todoToDelete.filter((_, i) => i !== id);

    if (completed) {
      setCompletedTodos(updatedTodos);
    } else {
      setUncompletedTodos(updatedTodos);
    }
  };

  const passDataToParent = (list: TodoType[]) => {
    const sortedUncompletedTodos = list
      .filter((item) => !item.done && !item.deleted)
      .sort((a, b) => b.added - a.added);

    const sortedCompletedTodos = list
      .filter((item) => item.done && !item.deleted)
      .sort((a, b) => b.added - a.added);

    setUncompletedTodos(sortedUncompletedTodos);
    setCompletedTodos(sortedCompletedTodos);
  };

  return (
    <Box mt={"20px"} p={"20px"}>
      <NewTodo passDataToParent={passDataToParent} />
      <Stack
        divider={<Divider orientation="horizontal" flexItem />}
        spacing={2}
      >
        {uncompletedTodos.map((todo, id) => (
          <TodoItem
            key={id}
            todo={todo}
            handleCheck={() => handleCheck(id)}
            handleDelete={() => handleDelete(id, false)}
          />
        ))}
      </Stack>
      {completedTodos.length > 0 && (
        <Box>
          <Stack
            divider={<Divider orientation="horizontal" flexItem />}
            spacing={2}
          >
            <Typography variant="h6">Completed Todos</Typography>
            {completedTodos.map((todo, id) => (
              <TodoItem
                key={id}
                todo={todo}
                handleCheck={() => handleUncheck(id)}
                handleDelete={() => handleDelete(id, true)}
              />
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

const TodoItem = ({
  todo,
  handleCheck,
  handleDelete,
}: {
  todo: TodoType;
  handleCheck: () => void;
  handleDelete: () => void;
}) => {
  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        boxShadow: "5px 5px 5px lightgray",
        borderRadius: "5px",
      }}
    >
      <ListItem
        sx={{ textDecoration: todo.done ? "line-through" : "none" }}
        secondaryAction={
          <IconButton edge="end" onClick={handleDelete}>
            <Delete />
          </IconButton>
        }
      >
        <ListItemText primary={todo.todo} />

        <ListItemIcon>
          <Checkbox edge="start" checked={todo.done} onChange={handleCheck} />
        </ListItemIcon>
      </ListItem>
    </List>
  );
};
