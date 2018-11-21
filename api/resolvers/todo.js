import TodoSchema from '../models/todo';
import { isAuthenticated } from '../models/user';

export default {
  Todo: {},
  Query: {
    getTodo: async (parent, { _id }) => {
      const todo = await TodoSchema.findById(_id).exec();
      return todo;
    },
    getTodos: async (_, __, { req, user }) => {
      try {
        isAuthenticated(req);

        // TODO: add pagination

        const todos = await TodoSchema.find({ completed: false, user: user._id })
          .limit(20)
          .sort({ created: -1 });
        return todos;
      } catch (error) {
        return [];
      }
    },
  },
  Mutation: {
    addTodo: async (parent, args, { req, user }) => {
      try {
        isAuthenticated(req);

        const todo = new TodoSchema({ ...args, user: user._id });
        await todo.save();

        return { ok: true, todo };
      } catch (error) {
        return { ok: false, errors: [{ message: error, path: 'Add todo' }] };
      }
    },
    updateTodo: async (parent, args, { req, user }) => {
      try {
        isAuthenticated(req);

        const todo = await TodoSchema.findOneAndUpdate({ _id: args._id }, args, { new: true });

        if (todo.user.toString() !== user._id.toString()) {
          return { ok: false, errors: [{ message: 'User is not creator', path: 'Update todo' }] };
        }

        return { ok: true, todo };
      } catch (error) {
        return { ok: false, errors: [{ message: error, path: 'Update todo' }] };
      }
    },
    deleteTodo: async (parent, { _id, req }) => {
      try {
        isAuthenticated(req);

        await TodoSchema.findOneAndDelete({ _id });

        return { ok: true };
      } catch (error) {
        return { ok: false, errors: [{ message: error }] };
      }
    },
  },
};
