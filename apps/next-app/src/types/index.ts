import * as z from "zod"
import { UserRoleType } from "@/constants"

export enum ResourceType {
  Training = "1",
  Requirement = "2",
}

export type UserRole = {
  id: UserRoleType
  name: string
}

export type Employee = {
  employeeId: string
  name: string
  department: string
  training: string
  status: "Not Started" | "In Progress" | "Completed"
  startDate: string | null
  completionDate: string | null
}

export type AuthenticatedUser = {
  id: number
  firstName: string
  lastName?: string
  role?: UserRole
  avatarUrl?: string
  email?: string
  isActive?: boolean
}

// TODO: update validation rules
export const addTrainingSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
  type: z.string(),
  url: z.string().optional(),
  // url: z.string().url().optional(),
  dueDate: z.date().nullish(),
  // dueDate: z
  //   .string()
  //   .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Use mm-dd-yyyy")
  //   .refine((date) => !isNaN(Date.parse(date)), "Invalid date"),
  isMandatory: z.boolean().default(true),
})

export type AddTrainingModel = z.infer<typeof addTrainingSchema>

export const editTrainingSchema = addTrainingSchema.extend({
  id: z.string(),
})

export type EditTrainingModel = z.infer<typeof editTrainingSchema>

export const addRequirementSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
  url: z.string().optional(),
  dueDate: z.date().nullish(),
})

export type AddRequirementModel = z.infer<typeof addRequirementSchema>

export const editRequirementSchema = addRequirementSchema.extend({
  id: z.string(),
})

export type EditRequirementModel = z.infer<typeof editRequirementSchema>

export const userAssignmentSchema = z.object({
  movedToAssigned: z.array(z.number()).optional(),
  movedToUnassigned: z.array(z.number()).optional(),
})

export type UserAssignmentModel = z.infer<typeof userAssignmentSchema>
