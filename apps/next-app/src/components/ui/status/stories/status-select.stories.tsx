import type { Meta, StoryObj } from "@storybook/react"
import { StatusSelect as UIStatusSelect } from "@/components/ui/status/"
import { ResourceStatus } from "@/constants"

const meta: Meta<typeof UIStatusSelect> = {
  title: "UI/Status/StatusSelect",
  component: UIStatusSelect,
  parameters: {
    layout: "centered",
  },
  args: {
    assignedId: "1",
    placeholder: "Select Status",
    currentStatus: ResourceStatus.NOT_STARTED,
  },
  argTypes: {
    currentStatus: {
      description: "ResourceStatus ID, affects the items to be displayed",
      control: {
        type: "select",
      },
      // TODO: display option labels
      options: [
        ResourceStatus.NOT_STARTED,
        ResourceStatus.IN_PROGRESS,
        ResourceStatus.COMPLETED,
      ],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const StatusSelect: Story = {}
