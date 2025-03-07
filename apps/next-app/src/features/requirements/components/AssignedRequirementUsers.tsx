"use client"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRequirement } from "@/lib/hooks/requirements"
import { StatusButton } from "@/components/ui/status"
import { format } from "date-fns"

interface AssignedRequirementUsersProps {
  requirementId: number
  name: string
  description?: string
  trigger: React.ReactNode
}

const AssignedRequirementUsers = ({
  requirementId,
  name,
  description,
  trigger,
}: AssignedRequirementUsersProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { assignedUserList: userList, getAssignedUsers } =
    useRequirement(requirementId)

  const handleOpenChange = async (isModalOpen: boolean) => {
    if (isModalOpen) {
      getAssignedUsers()
    }
    setIsOpen(isModalOpen)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {!userList ||
          (userList?.length == 0 && (
            <div className="border rounded-lg text-center p-4">
              No assigned users
            </div>
          ))}
        {userList && userList.length > 0 && (
          <div className="border rounded-lg">
            <div className="grid grid-cols-4 gap-4 p-4 border-b text-sm font-medium text-muted-foreground bg-gray-100">
              <div className="col-span-2">Name</div>
              <div className="col-span-1 items-center">Status</div>
              <div className="col-span-1 text-right">Completion Date</div>
            </div>

            {userList.map((user) => {
              const { id, firstName, lastName, statusId, completionDate } = user
              const fullName = lastName ? `${firstName} ${lastName}` : firstName

              return (
                <div
                  key={id}
                  className="grid grid-cols-4 gap-4 p-4 border-b last:border-0 items-center text-sm"
                >
                  <div className="col-span-2">{fullName}</div>
                  <div className="col-span-1">
                    <StatusButton statusId={statusId} />
                  </div>
                  <div className="col-span-1 text-right">
                    {completionDate ? format(completionDate, "PPP") : ""}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default AssignedRequirementUsers
