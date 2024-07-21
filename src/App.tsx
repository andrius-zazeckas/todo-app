import "./App.css";
import { Todo } from "./components/Todo/Todo";
import { Header } from "./components/Header/Header";
import { Box } from "@mui/material";

export const App = () => {
  return (
    <Box
      m={"auto"}
      marginTop={"20px"}
      p={"20px"}
      width="40%"
      minHeight="50vh"
      boxShadow={"5px 5px 5px gray"}
      borderRadius={"10px"}
      bgcolor={"#fbf9f9"}
    >
      <Header />
      <Todo />
    </Box>
  );
};
