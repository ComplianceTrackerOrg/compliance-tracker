import { useMutation, useQuery } from "@urql/next"
import { queryGetAssignedTrainings } from "@/lib/graphql/queries"
import { mutationUpdateAssignedTrainingStatus } from "@/lib/graphql/mutations"

export const useAssignedTrainings = () => {
  const [{ data, error, fetching }, reexecuteQuery] = useQuery({
    query: queryGetAssignedTrainings.toString(),
    variables: {
      userId: 1, //TODO: use actual User ID
    },
  })

  const [, updateAssignedTraining] = useMutation(
    mutationUpdateAssignedTrainingStatus.toString()
  )

  const fetchAgain = () => {
    reexecuteQuery({ requestPolicy: "network-only" })
  }

  const updateStatus = async (assignedTrainingId: number, statusId: number) => {
    const { data, error } = await updateAssignedTraining({
      assignedTrainingId,
      statusId,
    })
    return { data, error }
  }

  return {
    data: data?.assigned_learning_resourceCollection?.edges,
    error,
    fetching,
    fetchAgain,
    updateStatus,
  }
}
