import { gql } from 'apollo-angular';

export const GET_ALL_REQUIREMENTS = gql`
  query queryGetAllActiveRequirements {
    compliance_resourceCollection(filter: { is_active: { eq: true } }) {
      edges {
        node {
          id
          name
          description
          url
          is_active
          deadline_at
          created_at
        }
      }
    }
  }
`;

export const GET_REQUIREMENT = gql`
  query queryGetRequirement($id: Int!) {
    compliance_resourceCollection(filter: { id: { eq: $id } }) {
      edges {
        node {
          id
          name
          description
          url
          is_active
          deadline_at
          created_at
        }
      }
    }
  }
`;

export const GET_MY_REQUIREMENTS = gql`
  query Assigned_compliance_resourceCollection($id: Int!) {
    assigned_compliance_resourceCollection(filter: { user_id: { eq: $id } }) {
      edges {
        node {
          id
          user_id
          resource_id
          status_id
          started_at
          completed_at
          modified_at
          created_at
          compliance_resource {
            id
            name
            description
            url
            is_active
            deadline_at
            created_at
          }
        }
      }
    }
  }
`;

export const ADD_REQUIREMENT = gql`
  mutation mutationInsertRequirement($input: compliance_resourceInsertInput!) {
    insertIntocompliance_resourceCollection(objects: [$input]) {
      affectedCount
      records {
        id
        name
        description
        url
        is_active
        deadline_at
        created_at
      }
    }
  }
`;

export const UPDATE_REQUIREMENT = gql`
  mutation mutationUpdateRequirement(
    $resourceId: Int!
    $resourceDetails: compliance_resourceUpdateInput!
  ) {
    updatecompliance_resourceCollection(
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
`;

export const DISABLE_REQUIREMENT = gql`
  mutation mutationDisableRequirement($resourceId: Int!) {
    updatecompliance_resourceCollection(
      set: { is_active: false }
      atMost: 1
      filter: { id: { eq: $resourceId } }
    ) {
      affectedCount
    }
  }
`;
