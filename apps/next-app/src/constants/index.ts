export enum LearningResourceType {
  DigitalLearning = 1,
  Classroom = 2,
  VirtualClassroom = 3,
}

export const LearningResourceTypeLabel: Record<LearningResourceType, string> = {
  [LearningResourceType.DigitalLearning]: "Digital Learning",
  [LearningResourceType.Classroom]: "Classroom",
  [LearningResourceType.VirtualClassroom]: "Virtual Classroom",
}

export enum LearningStatus {
  NotStarted = 1,
  InProgress = 2,
  Completed = 3,
}

export const LearningStatusLabel: Record<LearningStatus, string> = {
  [LearningStatus.NotStarted]: "Not Started",
  [LearningStatus.InProgress]: "In Progress",
  [LearningStatus.Completed]: "Completed",
}
