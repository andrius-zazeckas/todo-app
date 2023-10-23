import { Input } from "@mui/material";
import { FormEventHandler, useState } from "react";

type Todo = {
  id: number;
  todo: string;
  done: boolean;
  added: number;
};

export const NewTodo = ({ passDataToParent }: any) => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [inputData, setInputData] = useState({ todo: "", done: false });

  const updateInputData = (value: string, key: "todo" | "done") => {
    setInputData((prevData) => ({ ...prevData, [key]: value }));
  };

  const submitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (inputData.todo !== "") {
      const newTodo = {
        id: todoList.length + 1,
        todo: inputData.todo,
        done: inputData.done,
        added: new Date().getTime(),
      };

      setTodoList((prevList) => [...prevList, newTodo]);
      setInputData({ todo: "", done: false });

      passDataToParent([...todoList, newTodo]);
      console.log(todoList);
    }
  };

  return (
    <form onSubmit={submitForm}>
      <Input
        placeholder="New Todo"
        fullWidth
        sx={{
          padding: "0 10px",
        }}
        value={inputData.todo}
        onChange={(e) => updateInputData(e.target.value, "todo")}
      />
    </form>
  );
};
