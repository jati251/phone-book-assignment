import { ContactProfile } from "@/types/contact";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import tw from "twin.macro";

export default function ContactForm({ contact }: { contact?: ContactProfile }) {
  const [phoneNumber, setPhoneNumber] = useState([""]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");

  const router = useRouter();
  const addInput = () => {
    setPhoneNumber([...phoneNumber, ""]);
  };

  const createContact = () => {
    Swal.fire("Saved!", "", "success");
    router.push("/");
  };

  const handleInputChange = (index: any, event: any) => {
    const updatedInputFields = [...phoneNumber];
    updatedInputFields[index] = event.target.value;
    setPhoneNumber(updatedInputFields);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault(); // Prevent the default form submission behavior
    Swal.fire({
      title: "Do you want to save the contact?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        createContact();
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
    // Here, you can access the input field values in the `inputFields` state
    // You can send this data to an API, perform validation, or further processing.
    console.log("Form data submitted:", phoneNumber);
  };

  useEffect(() => {
    if (contact) {
      const newNumberArray = contact.phones.map((el) => {
        return el.number;
      });

      setPhoneNumber(newNumberArray);
      setFirstName(contact.first_name);
      setlastName(contact.last_name);
    }
  }, [contact]);

  return (
    <form
      action="submit"
      onSubmit={handleSubmit}
      css={tw`flex flex-col gap-5 px-2 py-6 my-7 `}
    >
      <div css={tw`flex flex-col justify-between gap-2`}>
        <div css={tw`flex flex-col lg:w-full`}>
          <label
            htmlFor="first_name"
            css={tw`text-sm font-medium text-gray-700`}
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(event) => setFirstName(event.currentTarget.value)}
            css={tw`mt-1 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm px-2 py-1`}
          />
        </div>
        <div css={tw`flex flex-col lg:w-full `}>
          <label htmlFor="lastName" css={tw`text-sm font-medium text-gray-700`}>
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(event) => setlastName(event.currentTarget.value)}
            css={tw`mt-1 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm px-2 py-1`}
          />
        </div>
      </div>
      <button
        type="button"
        onClick={addInput}
        css={tw`border-none bg-white hover:text-gray-500 cursor-pointer px-4 rounded`}
      >
        + Add More Number
      </button>

      {phoneNumber.map((input, index) => (
        <div key={index} css={tw`flex flex-col`}>
          <label
            htmlFor={`phoneNumber${index}`}
            css={tw`text-sm font-medium text-gray-700`}
          >
            Phone Number
          </label>
          <input
            type="text"
            id={`phoneNumber${index}`}
            name={`phoneNumber${index}`}
            value={input}
            onChange={(event) => handleInputChange(index, event)}
            css={tw`mt-1  rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm px-2 py-1`}
          />
        </div>
      ))}
      <input
        type="submit"
        value="Save Contact"
        css={tw`bg-green-600 cursor-pointer hover:bg-green-700 text-white px-4 py-2 rounded mt-4`}
      />
    </form>
  );
}
