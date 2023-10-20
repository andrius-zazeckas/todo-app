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

  const handleCheckChange = (id: number) => {
    const updatedTodos = [...todos];
    const checkedTodo = updatedTodos[id];
    updatedTodos.splice(id, 1);
    // updatedTodos.push(checkedTodo);
    checkedTodo.done = !checkedTodo.done;
    if (checkedTodo.done === true) {
      setCompletedTodos([...completedTodos, checkedTodo]);
    }
    if (checkedTodo.done === false) {
      completedTodos.splice(id, 1);
    }
    // console.log(checkedTodo, checkedTodo.done);
    // setTodos(updatedTodos);
  };

  console.log(completedTodos);

  console.log(todos);
  const passDataToParent = (list: any) => {
    const sortedList = list.sort((a: any, b: any) => b.id - a.id);
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
                  onChange={() => handleCheckChange(id)}
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
                      onChange={() => handleCheckChange(id)}
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
