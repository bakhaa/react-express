import passport from 'passport';
import { UserSchema, requireAuth } from '../models/user';

export default {
  User: {},
  Query: {
    getUsers: requireAuth.createResolver(async () => {
      const users = await UserSchema.find().exec();
      return users;
    }),
    getUser: async (parent, { _id }) => {
      const user = await UserSchema.findById(_id).exec();
      return user;
    },
  },
  Mutation: {
    login: (parent, args, ctx) => new Promise((resolve, reject) => {
      passport.authenticate('local', (err, user, info) => {
        if (err) reject(err);
        if (!user || info) {
          return resolve({
            user: null,
            ok: false,
            errors: [{ message: 'Incorrect login or password', path: 'login' }],
          });
        }

        return ctx.req.logIn(user, error => {
          if (error) reject(error);
          return resolve({ errors: [], user, ok: true });
        });
      })({ query: args });
    }),
    logout: (_, __, ctx) => {
      try {
        ctx.req.logout();
        return { ok: true };
      } catch (error) {
        return { ok: false };
      }
    },
    register: async (parent, args) => {
      try {
        const userExists = await UserSchema.findOne({ email: args.email });
        if (userExists) {
          return {
            ok: false,
            errors: [{ message: 'Email alredy exists', path: 'email' }],
          };
        }

        const user = new UserSchema({ ...args });
        await user.save();

        return { ok: true, user };
      } catch (err) {
        return {
          ok: false,
          errors: [{ message: 'Error create user', path: 'register' }],
        };
      }
    },
  },
};
