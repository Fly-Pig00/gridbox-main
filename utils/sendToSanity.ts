import sanityApiClient from "@/utils/sanityClient";
import { FormValues } from "./emailNotification";

const sendToSanity = async (formValues : FormValues, _type: string) => {
    const data = { _type, ...formValues }
    try {
      const response = await sanityApiClient.create(data)
    //   console.log("Response from sanity: ", response);
      if (response) {
        // alert(JSON.stringify(response));
        alert("Submitted successfully!");
      }
    } catch (error) {
      alert("something went wrong while submitting, please try again.",);
      console.log(error)
    }
}

export default sendToSanity
