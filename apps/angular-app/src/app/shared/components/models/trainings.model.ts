import {
  AssignedLearningResource,
  LearningResource,
  LearningResourceType,
  ResourceStatus,
} from './globals.model';

export type TrainingData = {
  trainingName: string;
  trainingDesc: string;
  dueDate: string;
  trainingUrl: string;
  status?: string;
  isMandatory?: boolean;
  resourceType?: string;
};

export type LearningResourceData = {
  node: LearningResource & { learning_resource_type: LearningResourceType };
};

export type AssignedLearningResourceData = {
  node: AssignedLearningResource & {
    learning_resource: LearningResource;
    resource_status: ResourceStatus;
  };
};
