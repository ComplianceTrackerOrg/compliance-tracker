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

export enum LearningStatus {
  NOT_STARTED = 1,
  IN_PROGRESS = 2,
  COMPLETED = 3,
}

export const LearningStatusLabel: Record<LearningStatus, string> = {
  [LearningStatus.NOT_STARTED]: "Not Started",
  [LearningStatus.IN_PROGRESS]: "In Progress",
  [LearningStatus.COMPLETED]: "Completed",
}

export const LearningStatusChangeLabel: Record<LearningStatus, string> = {
  [LearningStatus.NOT_STARTED]: "Mark as Not Started",
  [LearningStatus.IN_PROGRESS]: "Start Training",
  [LearningStatus.COMPLETED]: "Mark as Completed",
}
