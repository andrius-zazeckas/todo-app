import { Input } from "@mui/material";
import { FormEventHandler, useState } from "react";
import type { TodoType } from "./types/Todo";

type NewTodoProps = {
  passDataToParent: (data: TodoType[]) => void;
};
export const NewTodo = ({ passDataToParent }: NewTodoProps) => {
  const [todoList, setTodoList] = useState<TodoType[]>([]);
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
        deleted: false,
      };

      setTodoList((prevList) => [...prevList, newTodo]);
      setInputData({ todo: "", done: false });

      passDataToParent([...todoList, newTodo]);
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
