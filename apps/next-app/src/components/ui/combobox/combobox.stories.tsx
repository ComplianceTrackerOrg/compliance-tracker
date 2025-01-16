import type { Meta, StoryObj } from "@storybook/react"
import { Combobox as UICombobox } from "./combobox"
import { CircleCheckBig, CirclePlay } from "lucide-react"

const mockData = [
  {
    value: "1",
    label: "Start Training",
    icon: <CirclePlay />,
  },
  {
    value: "2",
    label: "Mark as Completed",
    icon: <CircleCheckBig color="#31C65E" />,
  },
]

const meta: Meta<typeof UICombobox> = {
  title: "UI/Combobox",
  component: UICombobox,
  parameters: {
    layout: "centered",
  },
  args: {
    enableSearch: true,
    placeholder: "Manage Training",
    inputPlaceholder: "Search...",
    itemNotFoundMessage: "Status not found",
    items: mockData,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Combobox: Story = {}
