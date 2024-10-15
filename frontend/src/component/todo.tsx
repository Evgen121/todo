import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  List,
  ListItem,
  Text,
  Checkbox,
} from "@chakra-ui/react";
import axios from "axios";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get("http://localhost:4444/todo");
    setTodos(response.data);
  };

  const handleAddTodo = async () => {
    if (inputValue.trim() === "") return;
    const newTodo = { text: inputValue.trim(), completed: false };
    await axios.post("http://localhost:4444/todo", newTodo);
    fetchTodos();
    setInputValue("");
  };

  const handleDeleteTodo = async (id: number) => {
    await axios.delete(`http://localhost:4444/todo/${id}`);
    fetchTodos();
  };

  const handleUpdateTodo = async (id: number) => {
    if (editValue.trim() === "") return;
    const updatedTodo = {
      text: editValue,
      completed: todos.find((todo) => todo.id === id)?.completed,
    };
    await axios.put(`http://localhost:4444/todo/${id}`, updatedTodo);
    fetchTodos();
    setEditTodoId(null); // Сбрасываем режим редактирования
    setEditValue("");
  };

  const handleToggleCompleted = async (id: number) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      const updatedTodo = { ...todo, completed: !todo.completed };
      await axios.put(`http://localhost:4444/todo/${id}`, updatedTodo);
      fetchTodos();
    }
  };

  const handleEditClick = (todo: Todo) => {
    setEditTodoId(todo.id);
    setEditValue(todo.text);
  };

  const handleCancelEdit = () => {
    setEditTodoId(null);
    setEditValue("");
  };

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>
        Todo List
      </Text>
      <Box display="flex" mb={4}>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a new task"
          mr={2}
        />
        <Button onClick={handleAddTodo} colorScheme="blue">
          Add Todo
        </Button>
      </Box>
      <List spacing={3}>
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            {editTodoId === todo.id ? (
              <>
                <Input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  mr={2}
                />
                <Button
                  colorScheme="green"
                  onClick={() => handleUpdateTodo(todo.id)}
                >
                  Save
                </Button>
                <Button colorScheme="gray" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Checkbox
                  isChecked={todo.completed}
                  onChange={() => handleToggleCompleted(todo.id)}
                />
                <Text as={todo.completed ? "s" : "span"}>{todo.text}</Text>
                <Box>
                  <Button
                    colorScheme="yellow"
                    mr={2}
                    onClick={() => handleEditClick(todo)}
                  >
                    Edit
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TodoApp;
