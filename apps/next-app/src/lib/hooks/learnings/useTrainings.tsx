import { queryGetAllActiveTrainings } from "@/lib/graphql/queries"
import { useQuery } from "urql"

export const useTrainings = (isMandatory?: boolean) => {
  const [{ data, error, fetching }, reexecuteQuery] = useQuery({
    query: queryGetAllActiveTrainings.toString(),
    variables: {
      isMandatory: isMandatory,
    },
  })

  const fetchAgain = () => {
    reexecuteQuery({ requestPolicy: "network-only" })
  }

  return {
    data: data?.learning_resourceCollection?.edges,
    error,
    fetching,
    fetchAgain,
  }
}
