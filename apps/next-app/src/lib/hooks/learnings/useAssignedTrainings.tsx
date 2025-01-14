import { useQuery } from "@urql/next"
import { GetAssignedTrainingsByUser } from "@/lib/graphql/queries"

export const useAssignedTrainings = () => {
  const [result] = useQuery({
    query: GetAssignedTrainingsByUser.toString(),
    variables: {
      userId: 1, //TODO: use actual User ID
    },
  })
  const { data, error, fetching } = result

  return {
    data: data?.assigned_learning_resourceCollection?.edges,
    error,
    fetching,
  }
}
