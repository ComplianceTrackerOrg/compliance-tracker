import { useQuery } from "@urql/next"
import { queryGetRequirements } from "@/lib/graphql/queries"

export const useRequirements = (isActiveOnly?: boolean) => {
  const [{ data, error, fetching }, reexecuteQuery] = useQuery({
    query: queryGetRequirements.toString(),
    variables: {
      isActive: isActiveOnly,
    },
  })

  const fetchAgain = () => {
    reexecuteQuery({ requestPolicy: "network-only" })
  }

  return {
    data: data?.compliance_resourceCollection?.edges,
    error,
    fetching,
    fetchAgain,
  }
}
