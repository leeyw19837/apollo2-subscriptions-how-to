import { ApolloServer, PubSub } from "apollo-server";
import { GraphQLSchema } from "graphql";
import { mergeSchemas } from "graphql-tools";

const {OAuth2Client} = require("google-auth-library");

import dotenv from "dotenv";
import {
    CLIENT_ID,
} from "./common/util/secrets";
import { userController } from "./user/user.controller";
import schemas from "./schema";
import resolvers from "./resolvers";
import db from './db'

export const pubsub = new PubSub();

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({path: ".env"});

export const client = new OAuth2Client(CLIENT_ID);
// help to debug mongoose


const schema: GraphQLSchema = mergeSchemas({
    schemas,
    resolvers
});

// GraphQL
const server = new ApolloServer({
    schema,
    context: async ({req}: any) => {
        if (!req || !req.headers) {
            return;
        }

        // const token = req.headers.authorization || "";
        // const checkToken = await userController.findOrCreateUser(token);
        // if (!checkToken.hasOwnProperty("authorized")) {
        // 	return { user: checkToken, authorized: true };
        // }
        // return checkToken;

        const token = req.headers.authorization || "";
        return {token, db}
    },
    // tracing: true
});

server.listen().then(({url}) => {
    console.log(`🚀 Server ready at ${url}`);
});
