import React from "react";
import { Formik, Form } from 'formik';
import FormInput from "./FormInput";
import * as Yup from 'yup';
import graphRequest from "@/utils/graphql";
import { FormValues } from "@/utils/emailNotification";


const LoginForm = ({access, found} : {access: Function, found: Function}) => {

    const handleSubmit = async (values: FormValues) => {
        if (values.email) {
            const {data:{allSubscribers: members}} = await graphRequest(`{
                allSubscribers{
                    email
                }
            }`);

            const memberExists = members.find((member: FormValues) => member.email === values.email);

            if (memberExists) {
                sessionStorage.setItem("email", `${values.email}`)
                access(true);
                found(true);
                return;
            }

            found(false);
        }

    }

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Required'),
      });
    
      return (
        <Formik
          initialValues={{ email: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col justify-center">
            <FormInput
              label="Email *"
              name="email"
              as="input"
              type="email"
            />
           <button type="submit" className='contact__form--button'>Login</button>
          </Form>
        </Formik>
    )
}

export default LoginForm;