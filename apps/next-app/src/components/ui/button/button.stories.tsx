/* eslint-disable @typescript-eslint/no-explicit-any */

import { Meta, StoryObj } from "@storybook/react"

import { Button } from "./button"

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  args: {
    variant: "default",
    size: "default",
    children: "Button",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
      description: "Button variant",
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg", "icon"],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllVariants: Story = {
  render: (args) => (
    <div className="space-4-y">
      {["default", "destructive", "outline", "secondary", "ghost", "link"].map(
        (variant: string) => (
          <Button key={variant} {...args} variant={variant as any}>
            {variant}
          </Button>
        )
      )}
    </div>
  ),
}

export const CustomClassName: Story = {
  args: {
    className: "bg-gradient-to-r from-green-400 to-blue-500 text-white",
    children: "Custom Style",
  },
}
