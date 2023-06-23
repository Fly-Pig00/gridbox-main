import React from 'react';
import { Formik, Form, Field, useField, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import sanityApiClient from '@/pages/api/sanityClient';

type FormValues = {
  firstName?: string,
  lastName?: string,
  email?: string,
  phone?: string,
  inquirer?: string,
  location?: string,
  subject?: string,
  message?: string,
}

type FormInputProps = {
  label: string,
  name: string,
}

const FormInput = ({label, name, ...props }: FormInputProps & React.HTMLProps<HTMLSpanElement>) => {
  const [field] = useField({name});
  return (
    <div className='contact__form--fieldContainer'>
      <label htmlFor={name}>{label}</label>
      <Field
        {...field}
        {...props}
        id={name}
        name={name}
        className="contact__form--field"
      />
      <div className='contact__form--errorContainer'>
        <ErrorMessage name={name} component="p" className="contact__form--error"/>
      </div>
    </div>
  )
};


const RequestForm = ({signed} : {signed: Function}) => {
  // SEND CONTACTS TO SANITY DATABASE
  // const [submit, setSubmit] = useState(false);
  // const [contactValues, setContactValues] = useState({})

  // useEffect(() => {
  //   if(submit) {
  //     const sendToSanity = async (formValues : FormValues) => {
  //       const contactInfo = {
  //         _type: 'contacts',
  //         ...formValues
  //       }
  //       try {
  //         const response = await sanityApiClient.create(contactInfo)
  //         console.log("Response from sanity: ", response);
  //         if (response) {
  //           alert(JSON.stringify(response));
  //         }
  //       } catch (error) {
  //         alert("something went wrong while submitting, please try again.",);
  //         console.log(error)
  //       }
  //     }
  //     sendToSanity(contactValues);
  //   }
  // },[submit, contactValues])

  const sendToWeb3forms = async (values: FormValues, {resetForm}: any) =>  {
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY_DEVELOPMENT,
            ...values
          }),
      });
      const result = await response.json();
      if (result.success) {
          // console.log(result);
          alert("Thank you for reaching out, we'll contact you shortly!");
          signed(true)
          resetForm();
      }
    } catch (error) {
      alert("something went wrong while submitting, please try again.",);
      console.log(error)
    }
}

  const validationSchema = Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phone: Yup.string().matches(new RegExp('^[0-9]*$'), 'Invalid phone number'),
  });

  return (
    <Formik
      initialValues={{
        formType: 'Specification Sheet Request Form',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      }}
      validationSchema={validationSchema}
      onSubmit={sendToWeb3forms}
    >
      <Form>
        <div className='contact__form--fieldGroup'>
          <FormInput
            label="First Name *"
            name="firstName"
            as="input"
            type="text"
          />
          <FormInput
            label="Last Name *"
            name="lastName"
            as="input"
            type="text"
          />
        </div>
        <div className='contact__form--fieldGroup'>
          <FormInput
            label="Email *"
            name="email"
            as="input"
            type="email"
          />
          <FormInput
            label="Phone"
            name="phone"
            as="input"
            type="tel"
          />
        </div>
       <button type="submit" className='contact__form--button'>submit</button>
      </Form>
    </Formik>
  )
};

export default RequestForm;