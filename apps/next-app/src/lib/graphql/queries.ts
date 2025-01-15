import { graphql } from "./generated/gql"

export const GetAllTrainings = graphql(`
  query GetAllTrainings($isMandatory: Boolean) {
    learning_resourceCollection(
      filter: { is_mandatory: { eq: $isMandatory } }
    ) {
      edges {
        node {
          id
          name
          description
          is_mandatory
          deadline_at
          learning_resource_type {
            id
            name
            description
          }
        }
      }
    }
  }
`)

export const GetAssignedTrainingsByUser = graphql(`
  query GetAssignedTrainingsByUser($userId: Int!) {
    assigned_learning_resourceCollection(filter: { user_id: { eq: $userId } }) {
      edges {
        node {
          id
          user {
            id
            first_name
            last_name
          }
          learning_resource {
            name
            description
            deadline_at
          }
          learning_status {
            id
            name
          }
          started_at
          created_at
          completed_at
        }
      }
    }
  }
`)
