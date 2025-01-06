export type Payment = {
  employeeId: string;
  name: string;
  department: string;
  training: string;
  status: "Not Started" | "In Progress" | "Completed";
  startDate: string | null;
  completionDate: string | null;
}