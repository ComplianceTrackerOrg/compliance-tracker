import { graphql } from "./generated/gql"

export const mutationInsertTraining = graphql(`
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
`)

export const mutationUpdateTraining = graphql(`
  mutation mutationUpdateTraining(
    $resourceId: Int!
    $resourceDetails: learning_resourceUpdateInput!
  ) {
    updatelearning_resourceCollection(
      set: $resourceDetails
      atMost: 1
      filter: { id: { eq: $resourceId } }
    ) {
      affectedCount
      records {
        id
      }
    }
  }
`)

export const mutationDisableTraining = graphql(`
  mutation mutationDisableTraining($resourceId: Int!) {
    updatelearning_resourceCollection(
      set: { is_active: false }
      atMost: 1
      filter: { id: { eq: $resourceId } }
    ) {
      affectedCount
    }
  }
`)

export const mutationUpdateAssignedTrainingStatus = graphql(`
  mutation mutationUpdateAssignedTrainingStatus(
    $assignedTrainingId: BigInt!
    $statusId: Int!
  ) {
    updateassigned_learning_resourceCollection(
      set: { status_id: $statusId }
      atMost: 1
      filter: { id: { eq: $assignedTrainingId } }
    ) {
      affectedCount
    }
  }
`)
