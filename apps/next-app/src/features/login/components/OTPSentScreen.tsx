import React from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'

interface OTPSentScreenProps {
    email:string 
}

const OTPSentScreen: React.FC<OTPSentScreenProps> = ({email}) => { 
    return (
        <Card className="max-w-md">
            <CardHeader>
                <CardTitle>OTP Sent</CardTitle>
                <CardDescription>
                    An OTP has been sent to <strong>{email}</strong>. Please check your email.
                </CardDescription>
                </CardHeader>
                <CardContent>   
                    <p>
                        {`If you don't see the email in your inbox, check your spam folder.`}
                    </p>
                </CardContent>
        </Card>
    )
}

export default OTPSentScreen