'use client'

import React, { useState } from 'react'

import { EmailForm } from './EmailForm'

import  OTPSentScreen  from './OTPSentScreen'

export function LoginForm(): React.ReactElement {
  const [email, setEmail] = useState<string>('')
  const [isOTPSent, setIsOTPSent] = useState<boolean>(false)

  const handleSubmit = async (submittedEmail: string): Promise<void> => {
    // @note Here you would typically call your API to send the OTP
    // For this example, we'll just simulate the API call with a timeout
    setEmail(submittedEmail)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsOTPSent(true)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {!isOTPSent ? (
        <EmailForm onSubmit={handleSubmit} />
      ) : (
        <OTPSentScreen email={email} />
      )}
    </div>
  )
}

