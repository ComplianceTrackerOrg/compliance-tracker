"use client"
import { useEffect, useState } from "react"
import { AuthenticatedUser, ResourceType } from "@/types"
import UserTable from "./UserTable"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { ChevronLeft, ChevronRight } from "lucide-react"
import SelectResourceType from "./SelectResourceType"
import SelectResource from "./SelectResource"
import useAssignUsers from "@/lib/hooks/assignment/useAssignUsers"

const AssignUsers = () => {
  const {
    fetchAssignedRequirementUsers,
    fetchAssignedTrainingUsers,
    fetchUnassignedRequirementUsers,
    fetchUnassignedTrainingUsers,
  } = useAssignUsers()

  const [selectedResourceType, setResourceType] = useState<ResourceType>(
    ResourceType.Requirement
  )
  const [selectedResource, setSelectedResource] = useState(0)
  const [availableUsers, setAvailableUsers] = useState<AuthenticatedUser[]>([])
  const [assignedUsers, setAssignedUsers] = useState<AuthenticatedUser[]>([])
  const [selectedAvailable, setSelectedAvailable] = useState<Set<number>>(
    new Set()
  )
  const [selectedAssigned, setSelectedAssigned] = useState<Set<number>>(
    new Set()
  )

  const moveToAssigned = () => {
    const usersToMove = availableUsers.filter((user) =>
      selectedAvailable.has(user.id)
    )
    setAssignedUsers([...assignedUsers, ...usersToMove])
    setAvailableUsers(
      availableUsers.filter((user) => !selectedAvailable.has(user.id))
    )
    setSelectedAvailable(new Set())
  }

  const moveToAvailable = () => {
    const usersToMove = assignedUsers.filter((user) =>
      selectedAssigned.has(user.id)
    )
    setAvailableUsers([...availableUsers, ...usersToMove])
    setAssignedUsers(
      assignedUsers.filter((user) => !selectedAssigned.has(user.id))
    )
    setSelectedAssigned(new Set())
  }

  const handleAddAllUsers = () => {
    setAssignedUsers([...assignedUsers, ...availableUsers])
    setAvailableUsers([])
    setSelectedAvailable(new Set())
  }

  const handleRemoveAllUsers = () => {
    setAvailableUsers([...availableUsers, ...assignedUsers])
    setAssignedUsers([])
    setSelectedAssigned(new Set())
  }

  const handleResourceTypeSelection = (value: ResourceType) => {
    //TODO: fix resource dropdown selection when changing type
    setResourceType(value)
    setSelectedResource(0)
  }

  const handleResourceSelection = (resourceId: string) => {
    const value = Number(resourceId)
    setSelectedResource(value)
  }

  const getRequirementUsers = async (resourceId: number) => {
    const assigned = await fetchAssignedRequirementUsers(resourceId)
    const unassigned = await fetchUnassignedRequirementUsers(resourceId)

    if (unassigned) {
      setAvailableUsers(unassigned)
    }
    if (assigned) {
      setAssignedUsers(assigned)
    }
  }

  const getTrainingUsers = async (resourceId: number) => {
    const assigned = await fetchAssignedTrainingUsers(resourceId)
    const unassigned = await fetchUnassignedTrainingUsers(resourceId)

    if (unassigned) {
      setAvailableUsers(unassigned)
    }
    if (assigned) {
      setAssignedUsers(assigned)
    }
  }

  useEffect(() => {
    if (!selectedResourceType || !selectedResource) return

    switch (selectedResourceType) {
      case ResourceType.Requirement:
        getRequirementUsers(selectedResource)
        return

      case ResourceType.Training:
        getTrainingUsers(selectedResource)
        return

      default:
        return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedResourceType, selectedResource])

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Requirement / Training Selection</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
          <SelectResourceType onSelect={handleResourceTypeSelection} />
          <div className="col-span-2">
            <SelectResource
              mode={selectedResourceType}
              onSelect={handleResourceSelection}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-6 mt-10">
        <UserTable
          users={availableUsers}
          title="All Users"
          selected={selectedAvailable}
          onSelect={setSelectedAvailable}
          onAddAll={handleAddAllUsers}
        />
        <div className="flex flex-col items-center justify-center gap-4">
          <Button
            variant="default"
            size="icon"
            onClick={moveToAssigned}
            disabled={selectedAvailable.size === 0}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="default"
            size="icon"
            onClick={moveToAvailable}
            disabled={selectedAssigned.size === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
        <UserTable
          users={assignedUsers}
          title="Assigned Users"
          selected={selectedAssigned}
          onSelect={setSelectedAssigned}
          onRemoveAll={handleRemoveAllUsers}
        />
      </div>

      <div className="flex justify-end gap-4 mt-10">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </div>
    </div>
  )
}

export default AssignUsers
