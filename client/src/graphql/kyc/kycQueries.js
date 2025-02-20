import { gql } from '@apollo/client';

export const GET_KYC = gql`
query {
  myKyc {
    id
    aadhaarNumber
    panNumber
    kycStatus
    createdAt
    updatedAt
  }
}
`;