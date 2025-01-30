import { LearningStatus, LearningStatusLabel } from "@/constants"
import { Button } from "@/components/ui/button"

interface TrainingStatusProps {
  id: number
}

export default function TrainingStatus({ id }: TrainingStatusProps) {
  const DisplayTrainingStatus = (id: number) => {
    switch (id) {
      case LearningStatus.NOT_STARTED:
        return (
          <Button
            variant="destructive"
            size="sm"
            className="rounded-full cursor-default"
          >
            {LearningStatusLabel[LearningStatus.NOT_STARTED]}
          </Button>
        )
      case LearningStatus.IN_PROGRESS:
        return (
          <Button
            variant="default"
            size="sm"
            className="rounded-full bg-orange-400 cursor-default"
          >
            {LearningStatusLabel[LearningStatus.IN_PROGRESS]}
          </Button>
        )
      case LearningStatus.COMPLETED:
        return (
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full bg-lime-500 cursor-default"
          >
            {LearningStatusLabel[LearningStatus.COMPLETED]}
          </Button>
        )
      default:
        return null
    }
  }
  return <>{DisplayTrainingStatus(id)}</>
}
