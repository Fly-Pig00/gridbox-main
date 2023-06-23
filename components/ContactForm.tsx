import React from 'react';
import { Formik, Form } from 'formik';
import FormInput from './FormInput';
import * as Yup from 'yup';
import { MailchimpSubscribeProps } from './SignUpForm';
import Spinner from './Spinner';

const ContactForm = ({mailchimpProps} :{mailchimpProps: MailchimpSubscribeProps}) => {
  const {subscribe, status, message} = mailchimpProps;
  if (status === 'error') console.log("FORM SUBMIT ERROR: ",message);

  const validationSchema = Yup.object({
    FNAME: Yup.string().required('Required'),
    LNAME: Yup.string().required('Required'),
    EMAIL: Yup.string().email('Invalid email').required('Required'),
    PHONE: Yup.string().matches(new RegExp('^[0-9]*$'), 'Invalid phone number'),
    SUBJECT: Yup.string().required('Required'),
    MESSAGE: Yup.string().required('Required').max(255, 'Message must be less than 255 characters')
  });

  if (status === 'success' ) return (
    <div>
      <p className='text-center'>Thank you for reaching out, we&apos;ll contact you shortly!</p>
    </div>
  )
  
  return (
    <Formik
      initialValues={{
        FORMTYPE: 'Contact Form',
        FNAME: '',
        LNAME: '',
        EMAIL: '',
        PHONE: '',
        SUBJECT: '',
        MESSAGE: ''
      }}
      validationSchema={validationSchema}
      onSubmit={ formData => subscribe(formData)}
    >
      <Form>
        <div className='contact__form--fieldGroup'>
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
        </div>
        <div className='contact__form--fieldGroup'>
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
        </div>
        <div>
          <FormInput
            label="Subject *"
            name="SUBJECT"
            as="input"
            type="text"
          />
          <FormInput
            label="Message *"
            name="MESSAGE"
            as="textarea"
            type="text"
            rows={5}
            className="border-l"
            maxLength={255}
          />
        </div>
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

export default ContactForm;