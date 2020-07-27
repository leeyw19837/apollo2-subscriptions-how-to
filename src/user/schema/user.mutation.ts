import { gql } from 'apollo-server';

const userMutation = gql`
    type Mutation {
        addUser(user: UserInput) : User
        updateUser(id: ID!, user: UserInput) : User
    }
`;

export { userMutation };
