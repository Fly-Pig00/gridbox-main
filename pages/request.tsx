import React, { useState } from 'react';
import SignUpForm from '@/components/SignUpForm';
import MailchimpSubscribe from "react-mailchimp-subscribe"

const Request = () => {
    const [submitState, setSubmitState] = useState('')
    return (
        <div className='p-20'>
            {
                submitState === 'success' ? 
                <div>
                    <h1 className='text-center mb-10'>Thank You!</h1>
                    <p className='text-center'>Thank you for reaching out, we&apos;ll contact you shortly!</p>
                </div>
                : 
                <div className='sm:w-1/2 mx-auto flex flex-col space-y-10'>
                    <h1 className='text-center'>Specifications Request</h1>
                    <p className='text-center'>Please fill out the request form below for specification sheets of our products.</p>
                    <MailchimpSubscribe
                        url={process.env.NEXT_PUBLIC_MAILCHIMP_URL || ""}
                        render={({subscribe, status, message}) => <SignUpForm toggleState={setSubmitState} mailchimpProps={{subscribe, status, message}}/> }
                    />
                </div>
            }
        </div>
    );
}

export default Request;