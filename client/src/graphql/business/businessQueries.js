import { gql } from '@apollo/client';

export const GET_BUSINESS = gql`
query {
  myBusiness {
      id
      business_name
      gst_number
      pan_number
      address
      pin_code
      created_at
      updated_at
  }
}
`;

export const GET_ALL_BUSINESS = gql`
query {
  businesses{
      id
      business_name
      gst_number
      pan_number
      address
      pin_code
      created_at
      updated_at
      user{
      name
      }
  }
}
`;