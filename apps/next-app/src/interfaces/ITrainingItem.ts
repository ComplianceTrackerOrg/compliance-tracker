import { TRAINING_STATUS } from "@/constants"
export default interface ITrainingItem {
    id: number,
    name: string,
    description: string,
    dueDate: string,
    status: typeof TRAINING_STATUS
}