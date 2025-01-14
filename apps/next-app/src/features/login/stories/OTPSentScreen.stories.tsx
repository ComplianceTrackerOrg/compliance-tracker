import { Meta, StoryObj } from '@storybook/react';

import OTPSentScreen from "@/features/login/components/OTPSentScreen";

const meta: Meta<typeof OTPSentScreen> = {
    title: "Components/Login/Sub-components/OTP Sent Screen",
    component: OTPSentScreen,
    parameters: {
        layout: "centered",
    },
    args: {
        email: "daenerys@westeros.io",
    },
};


export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {name: "OTP message screen",};