import type { Meta, StoryObj } from "@storybook/react"
import { Modal as UIModal } from "./modal"
import { Button } from "../button"

const meta: Meta<typeof UIModal> = {
  title: "UI/Modal",
  component: UIModal,
  parameters: {
    layout: "centered",
  },
  args: {
    isOpen: false,
    children: "Content",
    description: "Description",
    title: "Title",
    trigger: <Button>Open</Button>,
  },
  // argTypes: {
  //   isOpen: {
  //     defaultValue: true,
  //     options: [false, true],
  //     control: { type: "radio" },
  //   },
  // },
}

export default meta
type Story = StoryObj<typeof meta>

export const Modal: Story = {}
