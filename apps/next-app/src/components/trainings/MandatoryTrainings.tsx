// TODO: update UI based on Figma design
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  CardContent,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

import { LEARNING_STATUS } from "@/constants"

import dayjs from "@/lib/dayjs"
import { useAssignedTrainings } from "@/lib/hooks/learnings/useAssignedTrainings"

export default function MandatoryTrainings() {
  const { data: assignedTrainings } = useAssignedTrainings()

  const completedCount = assignedTrainings?.filter(
    (item) => item.node.learning_status.id === LEARNING_STATUS.COMPLETED
  ).length

  const totalCount = assignedTrainings?.length

  const progressPercentage =
    completedCount && totalCount && totalCount > 0
      ? (completedCount / totalCount) * 100
      : 0

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Your Mandatory Trainings</CardTitle>
        <CardDescription>
          Track and update your progress on required trainings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Overall Completion</h3>
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-sm text-muted-foreground">
            {completedCount} of {totalCount} trainings completed
          </p>
        </div>

        <div className="border rounded-lg">
          <div className="grid grid-cols-12 gap-4 p-4 border-b text-sm font-medium text-muted-foreground">
            <div className="col-span-4">Training Name</div>
            <div className="col-span-2">Due Date</div>
            <div className="col-span-3">Status</div>
            <div className="col-span-3">Actions</div>
          </div>

          {assignedTrainings?.map((item) => {
            const { node } = item
            const {
              id,
              learning_resource: resource,
              learning_status: status,
            } = node
            return (
              <div
                key={id}
                className="grid grid-cols-12 gap-4 p-4 border-b last:border-0 items-center"
              >
                <div className="col-span-4">
                  <h4 className="font-medium">{resource?.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {resource?.description}
                  </p>
                </div>
                <div className="col-span-2 text-sm">
                  {resource?.deadline_at && (
                    <time dateTime={resource?.deadline_at}>
                      {dayjs(resource?.deadline_at).format("MMM D, YYYY")}
                    </time>
                  )}
                </div>
                <div className="col-span-3 text-sm">
                  {status.id === LEARNING_STATUS.NOT_STARTED && (
                    <Button
                      variant="destructive"
                      className="rounded-full px-2.5 py-0.5 text-sm"
                    >
                      {status.name}
                    </Button>
                  )}
                  {status.id === LEARNING_STATUS.IN_PROGRESS && (
                    <Button
                      variant="default"
                      className="rounded-full px-2.5 py-0.5 text-sm bg-orange-400"
                    >
                      {status.name}
                    </Button>
                  )}
                  {status.id === LEARNING_STATUS.COMPLETED && (
                    <Button
                      variant="secondary"
                      className="rounded-full px-2.5 py-0.5 text-sm bg-lime-500"
                    >
                      {status.name}
                    </Button>
                  )}
                </div>
                {/* TODO: implement actions */}
                {/* <div className="col-span-3">
                  <Button
                    variant={
                      learning_status.name === "completed" ? "secondary" : "outline"
                    }
                    size="sm"
                  >
                    {learning_status.name === TRAINING_STATUS.COMPLETED
                      ? "Review Training"
                      : "Start Training"}
                  </Button>
                </div> */}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export { MandatoryTrainings }
