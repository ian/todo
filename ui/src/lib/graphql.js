import { request, gql } from "graphql-request"

export function graphql(query, variables = {}) {
  return request(
    "http://localhost:3282/graphql",
    gql`
      ${query}
    `,
    variables
  )
}
