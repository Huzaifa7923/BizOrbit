import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query {
    users {
      id
      name
      email
      phone
      isAdmin
    }
  }
`;


export const GET_MY_PROFILE=gql`
query {
  user{
      id
      email
      name
      phone
      address
      isAdmin
  }
}
`