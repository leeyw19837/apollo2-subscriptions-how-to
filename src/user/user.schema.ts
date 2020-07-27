import {
	// addMocksToSchema,
	makeExecutableSchema
} from "apollo-server";

import { GraphQLSchema } from "graphql";
import { userType, userQuery, userMutation } from "./schema";

const userSchema: GraphQLSchema = makeExecutableSchema({
	typeDefs: [userType, userQuery, userMutation]
});
// addMocksToSchema({ schema: userSchema });

export { userSchema };
