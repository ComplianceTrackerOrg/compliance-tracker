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

export const GET_MY_TRAININGS = gql`
  query queryGetAssignedTrainings($userId: Int!) {
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
            url
          }
          resource_status {
            id
            name
          }
          started_at
          completed_at
        }
      }
    }
  }
`

export const ADD_TRAINING = gql`
  mutation mutationInsertTraining($input: learning_resourceInsertInput!) {
    insertIntolearning_resourceCollection(objects: [$input]) {
      affectedCount
      records {
        id
        type_id
        name
        url
        description
        deadline_at
        is_mandatory
        created_at
      }
    }
  }
`