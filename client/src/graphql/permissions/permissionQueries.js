import { gql } from '@apollo/client';

export const GET_MY_PERMISSION = gql`
  query {
    getMyPermission {
      id
      role {
        id
        role
      }
      feature {
        id
        name
      }
      canCreate
      canRead
      canUpdate
      canDelete
    }
  }
`;

export const GET_ALL_PERMISSIONS = gql`
query {
  permissions{
    canRead
    canCreate
    canUpdate
    canDelete
    role{
      role
      id
    }
    id
    feature{
      name
    }
  }
}
`