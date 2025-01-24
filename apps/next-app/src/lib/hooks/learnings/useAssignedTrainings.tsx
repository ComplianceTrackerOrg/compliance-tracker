import { useQuery } from "@urql/next"
import { queryGetAssignedTrainings } from "@/lib/graphql/queries"

export const useAssignedTrainings = () => {
  const [result] = useQuery({
    query: queryGetAssignedTrainings.toString(),
    variables: {
      userId: 1, //TODO: use actual User ID
    },
    // requestPolicy: "network-only",
  })
  const { data, error, fetching } = result

  return {
    data: data?.assigned_learning_resourceCollection?.edges,
    error,
    fetching,
  }
}
