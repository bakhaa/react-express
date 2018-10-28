const todos = [{ id: 1, text: 'test' }, { id: 2, text: 'test2' }];

export default {
  Todo: {},
  Query: {
    getTodo: (parent, { todoId }, { models }) => todos.find(item => item.id === todoId),
    allTodos: () => todos,
  },
  Mutation: {
    addTodo: (parent, { text }, { models }) => {
      const todo = { id: todos.length + 1, text };
      todos.unshift(todo);
      return { ok: true, todo };
    },
  },
};
