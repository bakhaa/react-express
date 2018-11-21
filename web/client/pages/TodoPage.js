import React from 'react';
import styled from 'styled-components';

import { TodoList, AddTodo } from '../components/todo';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const TodoPage = () => (
  <Wrap>
    <AddTodo />
    <TodoList />
  </Wrap>
);

export default TodoPage;
