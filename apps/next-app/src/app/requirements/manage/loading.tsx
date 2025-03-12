import { SkeletonManageRequirements } from "@/components/ui/skeleton"

const ManageRequirementsLoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <SkeletonManageRequirements />
    </div>
  )
}

export default ManageRequirementsLoadingPage
