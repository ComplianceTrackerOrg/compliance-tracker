import { Meta, StoryObj } from '@storybook/react'

import { LoginForm } from '../components/LoginForm'

const meta: Meta<typeof LoginForm> = {
    title: "Components/Login",
    component: LoginForm,
    parameters: {
        layout: "centered"
    },
    args: {

    }
}

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {}