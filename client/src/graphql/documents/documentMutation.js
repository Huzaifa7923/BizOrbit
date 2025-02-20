import { gql } from '@apollo/client';

export const UPLOAD_DOCUMENT = gql`
mutation UploadDocument($docType: String!, $file: Upload!) {
  uploadDocument(docType: $docType, file: $file) {
    id
    docType
    fileUrl
    uploadedDate
  }
}
`;