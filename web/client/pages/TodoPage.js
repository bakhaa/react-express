import React from 'react';
import { TodoList, AddTodo } from '../components/todo';

const TodoPage = () => (
  <React.Fragment>
    <AddTodo />
    <TodoList />
  </React.Fragment>
);

export default TodoPage;
