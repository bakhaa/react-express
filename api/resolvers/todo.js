import TodoSchema from '../models/todo';
import { isAuthenticated } from '../models/user';

export default {
  Todo: {},
  Query: {
    getTodo: async (parent, { _id }) => {
      const todo = await TodoSchema.findById(_id).exec();
      return todo;
    },
    getTodos: async (_, __, { req }) => {
      isAuthenticated(req);
      // TODO: add pagination
      const todos = await TodoSchema.find()
        .limit(20)
        .sort({ created: -1 });
      return todos;
    },
  },
  Mutation: {
    addTodo: async (parent, args, { req }) => {
      try {
        isAuthenticated(req);

        const todo = new TodoSchema({ ...args });
        await todo.save();

        return { ok: true, todo };
      } catch (error) {
        return { ok: false, errors: [{ message: error }] };
      }
    },
    updateTodo: async (parent, { _id, text }) => {
      try {
        const todo = await TodoSchema.findOneAndUpdate({ _id }, { text }, { new: true });

        return { ok: true, todo };
      } catch (error) {
        return { ok: false, errors: [{ message: error }] };
      }
    },
    deleteTodo: async (parent, { _id }) => {
      try {
        await TodoSchema.findOneAndDelete({ _id });

        return { ok: true };
      } catch (error) {
        return { ok: false, errors: [{ message: error }] };
      }
    },
  },
};
