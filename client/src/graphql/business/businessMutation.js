import { gql } from "@apollo/client";

export const CREATE_BUSINESS = gql`
  mutation CreateBusiness($createBusinessInput: CreateBusinessInput!) {
    createBusiness(createBusinessInput: $createBusinessInput) {
      id
    }
  }
`;

export const UPDATE_BUSINESS = gql`
  mutation UpdateMyBusiness($updateBusinessInput: UpdateBusinessInput!) {
    updateMyBusiness(updateBusinessInput: $updateBusinessInput) {
      id
    }
  }
`;

