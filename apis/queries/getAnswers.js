import { gql } from "@apollo/client";

export const queryGet = gql`
  fragment Payload on REST {
    query: String
  }
  query getData($input: Payload!) {
    getData(input: $input) @rest(path: "/Question", method: "POST") {
      answer
      image
      url
    }
  }
`;
