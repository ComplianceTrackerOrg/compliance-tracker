import { AssignedLearningResource, LearningResource, User } from "./globals.model";

export type UsersData = {
  node: User & {
    assigned_learning_resourceCollection: {
      edges: {
        node: AssignedLearningResource & {
          learning_resource: LearningResource;
        };
      }[];
    };
  };
};
