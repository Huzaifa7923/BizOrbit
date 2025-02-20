import { gql } from "@apollo/client";

export const CREATE_KYC = gql`
  mutation CreateKyc($createKycInput: CreateKycInput!) {
    createKyc(createKycInput: $createKycInput) {
      id
    }
  }
`;
