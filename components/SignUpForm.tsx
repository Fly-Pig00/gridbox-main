import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormInput from './FormInput';
import { FormValues } from '@/utils/emailNotification';
import Spinner from './Spinner';
// import sendToWeb3forms from '@/utils/emailNotification';
// import sendToSanity from '@/utils/sendToSanity';


export type SignUp = {
  toggleState: Function;
  mailchimpProps: MailchimpSubscribeProps;
}
export type  MailchimpSubscribeProps ={
  subscribe: Function;
  status: string | null;
  message: string | null | Error;
}

const SignUpForm = ({toggleState, mailchimpProps} : SignUp) => {
  const {subscribe, status, message} = mailchimpProps;
  if (status === 'error') console.log("FORM SUBMIT ERROR: ",message);
  
  toggleState(status);

  const handleSubmit = async (values: FormValues, {resetForm}: {resetForm: Function}) => {
    subscribe(values);
    if (status === 'success') resetForm();
  };

  const validationSchema = Yup.object({
    EMAIL: Yup.string().email('Invalid email').required('Required'),
    FNAME: Yup.string().required('Required'),
    LNAME: Yup.string().required('Required'),
    PHONE: Yup.string().matches(new RegExp('^[0-9]*$'), 'Invalid phone number'),
  });

  return (
    <Formik
      initialValues={{
        FORMTYPE: 'Gridbox Datasheets Request',
        EMAIL: '',
        FNAME: '',
        LNAME: '',
        PHONE: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="flex flex-col justify-center">
        <FormInput
          label="First Name *"
          name="FNAME"
          as="input"
          type="text"
        />
        <FormInput
          label="Last Name *"
          name="LNAME"
          as="input"
          type="text"
        />
        <FormInput
          label="Email *"
          name="EMAIL"
          as="input"
          type="email"
        />
        <FormInput
          label="Phone"
          name="PHONE"
          as="input"
          type="tel"
        />
        <button type="submit" className='contact__form--button'>
          {
            status === 'sending' ? <Spinner/> : 'Submit'
          }
        </button>
        {
          status === 'error' && <p className='contact__form--error'>There was an error submitting your request, please try again.</p>
        }
      </Form>
    </Formik>
  )
};

export default SignUpForm;