import { AuthenticationError } from "apollo-server";
import { userController } from "./user.controller";

const userResolver = {
    Query: {
        users(root: any, args: any, context: any) {
            // if (!context.authorized) {
            // 	console.error("User not authorized");
            // 	throw new AuthenticationError("you must be logged in");
            // }
            return userController.users(root, args.user);
        },
        validateUser(root: any, args: any) {
            return userController.findOrCreateUser(args.idToken);
        }
    },
    Mutation: {
        addUser(parent: any, args: any, context: any, info: any) {
            console.log('addUser args = ', args)
            return userController.saveUser(args.user)
        },
        updateUser(parent: any, args: any, context: any) {
            console.log('updateUser args = ', args, 'context = ', context)
            return userController.updateUser(args)
        }
    }
};

export { userResolver };
