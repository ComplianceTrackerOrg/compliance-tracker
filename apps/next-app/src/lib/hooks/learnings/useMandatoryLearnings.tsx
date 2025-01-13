import { useQuery } from "@urql/next"
import { GetAllTrainings } from "@/lib/graphql/queries"

export const useTrainings = (isMandatory?: boolean) => {
  const [result] = useQuery({
    query: GetAllTrainings.toString(),
    variables: {
      isMandatory: isMandatory,
    },
  })
  const { data, error } = result

  return {
    data: data?.learning_resourceCollection?.edges,
    error,
  }
}
