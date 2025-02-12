import { useMutation, useQuery } from "@urql/next"
import { queryGetAssignedRequirements } from "@/lib/graphql/queries"
import { mutationUpdateAssignedRequirementStatus } from "@/lib/graphql/mutations"

export const useAssignedRequirements = (userId: number) => {
  const [{ data, error, fetching }, reexecuteQuery] = useQuery({
    query: queryGetAssignedRequirements.toString(),
    variables: {
      userId,
    },
  })

  const [, updateAssignedRequirement] = useMutation(
    mutationUpdateAssignedRequirementStatus.toString()
  )

  const fetchAgain = () => {
    reexecuteQuery({ requestPolicy: "network-only" })
  }

  const updateStatus = async (
    assignedComplianceId: number,
    statusId: number
  ) => {
    const { data, error } = await updateAssignedRequirement({
      assignedComplianceId,
      statusId,
    })
    return { data, error }
  }

  return {
    data: data?.assigned_compliance_resourceCollection?.edges,
    error,
    fetching,
    fetchAgain,
    updateStatus,
  }
}
