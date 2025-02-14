import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation SignIn($signInInput: SignInInput!) {
    signIn(signInInput: $signInInput) {
      token
      user {
        id
        email
        name
        phone
        isAdmin
      }
    }
  }
`;


export const CREATE_USER = gql`
mutation CreateUser($createUserInput: CreateUserInput!) {
  createUser(createUserInput: $createUserInput) {
  token
  user{
    id
    email
    name
    phone
    address
    isAdmin
    }
  }
}
`