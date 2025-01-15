import { Meta, StoryObj } from '@storybook/react'

import { EmailForm } from '../components/EmailForm';

const meta: Meta<typeof EmailForm> = {
    title: "Components/Login/Sub-components/EmailForm",
    component: EmailForm,
    parameters: {
        layout: "centered",
    },
    
}

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {
    name: "Email form",   
}