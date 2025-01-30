"use client"
import { useEffect, useState } from "react"
import { useMutation, useQuery } from "@urql/next"
import {
  mutationDisableTraining,
  mutationInsertTraining,
  mutationUpdateTraining,
} from "@/lib/graphql/mutations"
import { queryGetTraining } from "@/lib/graphql/queries"

interface TrainingModel {
  id: number
  name: string
  description?: string
  url?: string
  deadline_at?: string
  is_mandatory?: boolean
  learning_resource_type: {
    id: number
    name: string
    description?: string
  }
}
export interface TrainingInput {
  type_id: number
  name: string
  description?: string
  url?: string
  deadline_at?: string
  is_mandatory?: boolean
}

export interface UpdateTrainingInput {
  resourceId: number
  resourceDetails: TrainingInput
}

export const useTraining = (id: number) => {
  //TODO: handle no ID for add scenarios
  const [trainingData, setTrainingData] = useState<TrainingModel | null>(null)
  const [displayNow, setDisplayNow] = useState(false)

  if (isNaN(id)) {
    throw new Error("Invalid input: ID must be a number")
  }

  const value = Number(id)
  const [{ data: queryData, fetching }, reexecuteQuery] = useQuery({
    query: queryGetTraining.toString(),
    variables: {
      id: value,
    },
    pause: true, // run query only when needed
  })

  const [, insertTraining] = useMutation(mutationInsertTraining.toString())
  const [, updateTraining] = useMutation(mutationUpdateTraining.toString())
  const [, disableTraining] = useMutation(mutationDisableTraining.toString())

  useEffect(() => {
    if (!queryData || !queryData.learning_resourceCollection) {
      return
    }

    setTrainingData(
      queryData.learning_resourceCollection.edges[0].node as TrainingModel
    )
  }, [queryData, fetching])

  useEffect(() => {
    if (displayNow) {
      reexecuteQuery()
    }
  }, [reexecuteQuery, displayNow])

  const getTraining = () => {
    // will trigger running the get training detail query
    setDisplayNow(true)
  }

  const addTraining = async (input: TrainingInput) => {
    const { data, error } = await insertTraining({
      input,
    })

    return { data, error }
  }

  const editTraining = async (input: UpdateTrainingInput) => {
    const { data, error } = await updateTraining({
      resourceId: input.resourceId,
      resourceDetails: input.resourceDetails,
    })

    return { data, error }
  }

  const removeTraining = async (id: number) => {
    if (isNaN(id)) {
      throw new Error("Invalid input for Int type: id must be a number")
    }

    const resourceId = Number(id)
    const { data, error } = await disableTraining({
      resourceId,
    })

    return { data, error }
  }

  return {
    data: trainingData,
    fetching,
    addTraining,
    editTraining,
    getTraining,
    removeTraining,
  }
}
