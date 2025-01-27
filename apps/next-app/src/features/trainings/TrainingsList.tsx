"use client"
import dayjs from "dayjs"
import { Pencil, Plus, Trash2 } from "lucide-react"
import { useTrainings } from "@/lib/hooks/learnings/useTrainings"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import AddTraining from "./AddTraining"
import DisableTraining from "./DisableTraining"
import UpdateTraining from "./UpdateTraining"

export default function TrainingsList() {
  const { data, fetchAgain } = useTrainings()

  const handleChangeSuccess = async () => {
    fetchAgain()
    console.log("training list reloaded")
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <CardTitle className="text-2xl">Manage Trainings</CardTitle>
            <CardDescription>Add, edit, or remove trainings</CardDescription>
          </div>
          <div className="col-span-1 flex justify-end">
            <AddTraining
              onAddSuccess={handleChangeSuccess}
              trigger={
                <Button className="bg-blue-500 text-white" variant="outline">
                  <Plus />
                  Add Training
                </Button>
              }
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="border rounded-lg">
          <div className="grid grid-cols-12 gap-4 p-4 border-b text-sm font-medium text-muted-foreground bg-gray-100">
            <div className="col-span-3">Name</div>
            <div className="col-span-3">Description</div>
            <div className="col-span-2">Mandatory</div>
            <div className="col-span-2">Due Date</div>
            <div className="col-span-2">Actions</div>
          </div>

          {data &&
            data?.map((item) => {
              const { node } = item
              const { id, name, description, deadline_at, is_mandatory } = node
              return (
                <div
                  key={id}
                  className="grid grid-cols-12 gap-4 p-4 border-b last:border-0 items-center"
                >
                  <div className="col-span-3 text-sm">{name}</div>
                  <div className="col-span-3 text-sm">{description}</div>
                  <div className="col-span-2 text-sm">
                    {is_mandatory ? "Yes" : "No"}
                  </div>
                  <div className="col-span-2 text-sm">
                    {deadline_at && (
                      <time dateTime={deadline_at}>
                        {dayjs(deadline_at).format("MMM D, YYYY")}
                      </time>
                    )}
                  </div>

                  <div className="col-span-2 flex justify-start space-x-2">
                    <span className="border rounded-lg p-1">
                      <UpdateTraining
                        id={id}
                        trigger={<Pencil className="cursor-pointer" />}
                        onUpdateSuccess={handleChangeSuccess}
                      />
                    </span>
                    <span className="border rounded-lg p-1">
                      <DisableTraining
                        id={id}
                        name={name}
                        trigger={<Trash2 className="cursor-pointer" />}
                        onDisableSuccess={handleChangeSuccess}
                      />
                    </span>
                  </div>
                </div>
              )
            })}
        </div>
      </CardContent>
    </Card>
  )
}
