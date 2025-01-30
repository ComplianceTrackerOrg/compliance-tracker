"use client"
import { useEffect, useState } from "react"
import { useMutation, useQuery } from "@urql/next"
import { queryGetRequirement } from "@/lib/graphql/queries"
import {
  mutationDisableRequirement,
  mutationInsertRequirement,
  mutationUpdateRequirement,
} from "@/lib/graphql/mutations"

interface RequirementModel {
  id: number
  name: string
  description?: string
  url?: string
  deadline_at?: string
}
export interface RequirementInput {
  name: string
  description?: string
  url?: string
  deadline_at?: string
}

export interface UpdateRequirementInput {
  resourceId: number
  resourceDetails: RequirementInput
}

export const useRequirement = (id: number) => {
  //TODO: handle no ID for add scenarios
  const [requirementData, setRequirementData] =
    useState<RequirementModel | null>(null)
  const [displayNow, setDisplayNow] = useState(false)

  if (isNaN(id)) {
    throw new Error("Invalid input: ID must be a number")
  }

  const value = Number(id)
  const [{ data: queryData, fetching }, reexecuteQuery] = useQuery({
    query: queryGetRequirement.toString(),
    variables: {
      id: value,
    },
    pause: true, // run query only when needed
  })

  const [, insertRequirement] = useMutation(
    mutationInsertRequirement.toString()
  )
  const [, updateRequirement] = useMutation(
    mutationUpdateRequirement.toString()
  )
  const [, disableRequirement] = useMutation(
    mutationDisableRequirement.toString()
  )

  useEffect(() => {
    if (!queryData || !queryData?.compliance_resourceCollection?.edges) {
      return
    }
    setRequirementData(
      queryData.compliance_resourceCollection.edges[0].node as RequirementModel
    )
  }, [queryData, fetching])

  useEffect(() => {
    if (displayNow) {
      reexecuteQuery()
    }
  }, [reexecuteQuery, displayNow])

  const getRequirement = () => {
    // will trigger running the get training detail query
    setDisplayNow(true)
  }

  const addRequirement = async (input: RequirementInput) => {
    const { data, error } = await insertRequirement({ input })

    return { data, error }
  }

  const editRequirement = async (input: UpdateRequirementInput) => {
    const { data, error } = await updateRequirement({
      resourceId: input.resourceId,
      resourceDetails: input.resourceDetails,
    })

    return { data, error }
  }

  const removeRequirement = async (id: number) => {
    if (isNaN(id)) {
      throw new Error("Invalid input: ID must be a number")
    }

    const resourceId = Number(id)
    const { data, error } = await disableRequirement({ resourceId })

    return { data, error }
  }

  return {
    data: requirementData,
    fetching,
    getRequirement,
    addRequirement,
    editRequirement,
    removeRequirement,
  }
}
