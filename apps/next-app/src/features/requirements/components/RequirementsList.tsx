"use client"
import { Pencil, Plus, Trash2 } from "lucide-react"
import { formatDate } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRequirements } from "@/lib/hooks/requirements"
import AddRequirement from "./AddRequirement"
import UpdateRequirement from "./UpdateRequirement"
import DisableRequirement from "./DisableRequirement"

export default function RequirementsList() {
  // TODO: filter to include deactivated requirements
  const { requirementListWithDetails: data, fetchListWithDetails } =
    useRequirements(true)

  const handleChangeSuccess = async () => {
    fetchListWithDetails()
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <CardTitle className="text-2xl">Manage Requirements</CardTitle>
            <CardDescription>Add, edit, or remove requirements</CardDescription>
          </div>
          <div className="col-span-1 flex justify-end">
            <AddRequirement
              onAddSuccess={handleChangeSuccess}
              trigger={
                <Button className="bg-blue-500 text-white" variant="outline">
                  <Plus />
                  Add Requirement
                </Button>
              }
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="border rounded-lg">
          <div className="grid grid-cols-12 gap-4 p-4 border-b text-sm font-medium text-muted-foreground bg-gray-100">
            <div className="col-span-4">Name</div>
            <div className="col-span-5">Description</div>
            <div className="col-span-2">Due Date</div>
            <div className="col-span-1">Actions</div>
          </div>

          {data &&
            data?.map((item) => {
              const { node } = item
              const { id, name, description, deadline_at } = node
              return (
                <div
                  key={id}
                  className="grid grid-cols-12 gap-4 p-4 border-b last:border-0 items-center"
                >
                  <div className="col-span-4 text-sm">{name}</div>
                  <div className="col-span-5 text-sm">{description}</div>
                  <div className="col-span-2 text-sm">
                    {deadline_at && (
                      <time dateTime={deadline_at}>
                        {formatDate(deadline_at, "MMM D, YYYY")}
                      </time>
                    )}
                  </div>
                  <div className="col-span-1 flex justify-start space-x-2">
                    <span className="border rounded-lg p-1">
                      <UpdateRequirement
                        id={id}
                        trigger={<Pencil className="cursor-pointer" />}
                        onUpdateSuccess={handleChangeSuccess}
                      />
                    </span>
                    <span className="border rounded-lg p-1">
                      <DisableRequirement
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
