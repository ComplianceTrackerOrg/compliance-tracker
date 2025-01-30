export enum LearningResourceType {
  DIGITAL_LEARNING = 1,
  CLASSROOM = 2,
  VIRTUAL_CLASSROOM = 3,
}

export const LearningResourceTypeLabel: Record<LearningResourceType, string> = {
  [LearningResourceType.DIGITAL_LEARNING]: "Digital Learning",
  [LearningResourceType.CLASSROOM]: "Classroom",
  [LearningResourceType.VIRTUAL_CLASSROOM]: "Virtual Classroom",
}

export enum ResourceStatus {
  NOT_STARTED = 1,
  IN_PROGRESS = 2,
  COMPLETED = 3,
}

export const LearningStatusLabel: Record<ResourceStatus, string> = {
  [ResourceStatus.NOT_STARTED]: "Not Started",
  [ResourceStatus.IN_PROGRESS]: "In Progress",
  [ResourceStatus.COMPLETED]: "Completed",
}

export const LearningStatusChangeLabel: Record<ResourceStatus, string> = {
  [ResourceStatus.NOT_STARTED]: "Mark as Not Started",
  [ResourceStatus.IN_PROGRESS]: "Start Training",
  [ResourceStatus.COMPLETED]: "Mark as Completed",
}
