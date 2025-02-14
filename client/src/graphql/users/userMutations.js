import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation UpdateMyProfile($updateUserInput: UpdateUserInput!) {
    updateMyProfile(updateUserInput: $updateUserInput) {
      id
      email
      name
      phone
      address
      isAdmin
    }
  }
`;
