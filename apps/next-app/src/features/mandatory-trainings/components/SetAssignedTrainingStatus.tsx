import { CircleCheckBig, CirclePlay, Info } from "lucide-react"
import { ResourceStatus, LearningStatusChangeLabel } from "@/constants"
import { Combobox } from "@/components/ui/combobox"

interface SetAssignedTrainingStatusProps {
  assignedTrainingId: string
  currentStatus: ResourceStatus
  onStatusChange: (id: string, status: string) => void
}

export default function SetAssignedTrainingStatus({
  assignedTrainingId,
  currentStatus,
  onStatusChange,
}: SetAssignedTrainingStatusProps) {
  const GetStatuslist = (currentStatus: ResourceStatus) => {
    switch (currentStatus) {
      case ResourceStatus.NOT_STARTED:
        return [
          {
            value: ResourceStatus.IN_PROGRESS.toString(),
            label: LearningStatusChangeLabel[ResourceStatus.IN_PROGRESS],
            icon: <CirclePlay className="text-orange-500" />,
          },
          {
            value: ResourceStatus.COMPLETED.toString(),
            label: LearningStatusChangeLabel[ResourceStatus.COMPLETED],
            icon: <CircleCheckBig className="text-green-500" />,
          },
        ]
      case ResourceStatus.IN_PROGRESS:
        return [
          {
            value: ResourceStatus.NOT_STARTED.toString(),
            label: LearningStatusChangeLabel[ResourceStatus.NOT_STARTED],
            icon: <Info className="text-gray-500" />,
          },
          {
            value: ResourceStatus.COMPLETED.toString(),
            label: LearningStatusChangeLabel[ResourceStatus.COMPLETED],
            icon: <CircleCheckBig className="text-green-500" />,
          },
        ]
      default:
        return [
          {
            value: ResourceStatus.NOT_STARTED.toString(),
            label: LearningStatusChangeLabel[ResourceStatus.NOT_STARTED],
            icon: <Info className="text-gray-500" />,
          },
          {
            value: ResourceStatus.IN_PROGRESS.toString(),
            label: LearningStatusChangeLabel[ResourceStatus.IN_PROGRESS],
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
