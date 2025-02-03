import type { Meta, StoryObj } from "@storybook/react"
import { StatusButton as UIStatusButton } from "@/components/ui/status/"
import { ResourceStatus } from "@/constants"

const meta: Meta<typeof UIStatusButton> = {
  title: "UI/Status/StatusButton",
  component: UIStatusButton,
  parameters: {
    layout: "centered",
  },
  args: {
    statusId: ResourceStatus.NOT_STARTED,
  },
  argTypes: {
    statusId: {
      defaultValue: ResourceStatus.NOT_STARTED,
      description:
        "ResourceStatus ID, affects how the button will be displayed",
      // TODO: display option labels
      options: [
        ResourceStatus.NOT_STARTED,
        ResourceStatus.IN_PROGRESS,
        ResourceStatus.COMPLETED,
      ],
      control: { type: "radio" },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const StatusButton: Story = {}
