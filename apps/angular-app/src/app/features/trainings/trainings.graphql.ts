import { gql } from 'apollo-angular';

export const GET_ALL_TRAININGS = gql`
  query queryGetAllActiveTrainings($isMandatory: Boolean) {
    learning_resourceCollection(
      filter: { is_mandatory: { eq: $isMandatory }, is_active: { eq: true } }
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
          is_active
        }
      }
    }
  }
`

export const GET_TRAINING = gql`
  query queryGetTraining($id: Int!) {
    learning_resourceCollection(filter: { id: { eq: $id } }) {
      edges {
        node {
          id
          name
          description
          url
          is_mandatory
          deadline_at
          learning_resource_type {
            id
            name
            description
          }
          is_active
        }
      }
    }
  }
`
