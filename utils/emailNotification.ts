export type FormValues = {
    formType?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    phone?: string,
    subject?: string,
    message?: string,
  }

const sendToWeb3forms = async (values: FormValues) =>  {
  // console.log(values)
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
    }
  } catch (error) {
    alert("something went wrong while submitting, please try again.",);
    console.log(error)
  }
}

export default sendToWeb3forms;