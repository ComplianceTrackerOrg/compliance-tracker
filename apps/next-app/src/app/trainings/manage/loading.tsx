import { SkeletonManageTrainings } from "@/components/ui/skeleton"

const ManageTrainingsLoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <SkeletonManageTrainings />
    </div>
  )
}

export default ManageTrainingsLoadingPage
