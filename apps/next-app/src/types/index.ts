import * as z from "zod"

export type Employee = {
  employeeId: string
  name: string
  department: string
  training: string
  status: "Not Started" | "In Progress" | "Completed"
  startDate: string | null
  completionDate: string | null
}

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
