import { gql } from '@apollo/client';

export const GET_DOCUMENTS = gql`
query {
  myDocuments {
    id
    docType
    fileUrl
    uploadedDate
  }
}
`;