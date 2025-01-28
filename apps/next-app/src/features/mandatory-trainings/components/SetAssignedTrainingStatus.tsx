import { CircleCheckBig, CirclePlay, Info } from "lucide-react"
import { LearningStatus, LearningStatusChangeLabel } from "@/constants"
import { Combobox } from "@/components/ui/combobox"

interface SetAssignedTrainingStatusProps {
  assignedTrainingId: string
  currentStatus: LearningStatus
  onStatusChange: (id: string, status: string) => void
}

export default function SetAssignedTrainingStatus({
  assignedTrainingId,
  currentStatus,
  onStatusChange,
}: SetAssignedTrainingStatusProps) {
  const GetStatuslist = (currentStatus: LearningStatus) => {
    switch (currentStatus) {
      case LearningStatus.NOT_STARTED:
        return [
          {
            value: LearningStatus.IN_PROGRESS.toString(),
            label: LearningStatusChangeLabel[LearningStatus.IN_PROGRESS],
            icon: <CirclePlay className="text-orange-500" />,
          },
          {
            value: LearningStatus.COMPLETED.toString(),
            label: LearningStatusChangeLabel[LearningStatus.COMPLETED],
            icon: <CircleCheckBig className="text-green-500" />,
          },
        ]
      case LearningStatus.IN_PROGRESS:
        return [
          {
            value: LearningStatus.NOT_STARTED.toString(),
            label: LearningStatusChangeLabel[LearningStatus.NOT_STARTED],
            icon: <Info className="text-gray-500" />,
          },
          {
            value: LearningStatus.COMPLETED.toString(),
            label: LearningStatusChangeLabel[LearningStatus.COMPLETED],
            icon: <CircleCheckBig className="text-green-500" />,
          },
        ]
      default:
        return [
          {
            value: LearningStatus.NOT_STARTED.toString(),
            label: LearningStatusChangeLabel[LearningStatus.NOT_STARTED],
            icon: <Info className="text-gray-500" />,
          },
          {
            value: LearningStatus.IN_PROGRESS.toString(),
            label: LearningStatusChangeLabel[LearningStatus.IN_PROGRESS],
            icon: <CirclePlay className="text-orange-500" />,
          },
        ]
    }
  }

  const handleStatusChange = (status: string) => {
    onStatusChange(assignedTrainingId, status)
  }

  return (
    <Combobox
      key={assignedTrainingId}
      items={GetStatuslist(currentStatus)}
      placeholder="Manage Training"
      onItemSelected={handleStatusChange}
    />
  )
}
