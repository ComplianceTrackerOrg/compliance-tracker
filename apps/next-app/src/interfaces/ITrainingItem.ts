export default interface ITrainingItem {
    id: number,
    name: string,
    description: string,
    dueDate: string,
    status: "completed" | "not_completed"
}