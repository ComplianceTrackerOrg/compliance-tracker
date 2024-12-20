"use client"

import { CheckCircle, Square } from "lucide-react"

import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { CardContent, Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { trainingMockData } from "../mockData/trainings.mock"

import ITrainingItem from "@/interfaces/ITrainingItem"

import './page.css'

const trainings = trainingMockData as ITrainingItem[]

export default function MandatoryTrainings() {
  const completedCount = trainings.filter((t) => t.status === "completed").length
    const totalCount = trainings.length
    
  const progressPercentage = (completedCount / totalCount) * 100

  return (
   <div className="my-compliance">
     <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Your Mandatory Trainings</CardTitle>
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

          {trainings.map((training) => (
            <div
              key={training.id}
              className="grid grid-cols-12 gap-4 p-4 border-b last:border-0 items-center"
            >
              <div className="col-span-4">
                <h4 className="font-medium">{training.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {training.description}
                </p>
              </div>
              <div className="col-span-2 text-sm">
                <time dateTime={training.dueDate}>{training.dueDate}</time>
              </div>
              <div className="col-span-3">
                {training.status === "completed" ? (
                  <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-50 text-green-700">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completed
                  </div>
                ) : (
                  <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-50 text-red-700">
                    <Square className="w-3 h-3 mr-1" />
                    Not Completed
                  </div>
                )}
              </div>
              <div className="col-span-3">
                <Button
                  variant={training.status === "completed" ? "secondary" : "outline"}
                  size="sm"
                >
                  {training.status === "completed"
                    ? "Review Training"
                    : "Start Training"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
   </div>
  )
}