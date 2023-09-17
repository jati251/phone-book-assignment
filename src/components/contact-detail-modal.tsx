import React, { useEffect, useState } from "react";
import Outside from "./outside";
import { ContactProfile } from "@/types/contact";
import { DELETE_CONTACT_PHONE, useGetContactDetail } from "@/hooks/contact";
import tw from "twin.macro";
import EditContactIcon from "@/icons/edit-contact-icon";
import { useRouter } from "next/router";
import DeleteIcon from "@/icons/delete-icon";
import Swal from "sweetalert2";
import { useMutation } from "@apollo/client";

const ContactDetailModal = ({
  id,
  onClose,
  open,
  fetchContacts,
}: {
  id: number;
  onClose: () => void;
  open: boolean;
  fetchContacts: () => void;
}) => {
  const [contactDetail, setContactDetail] = useState<ContactProfile>();
  const { error, contact, loading } = useGetContactDetail(id);

  const [DeleteContact] = useMutation(DELETE_CONTACT_PHONE);

  const router = useRouter();

  const handleClose = () => {
    onClose();
  };

  const handleEdit = () => {
    router.push(`/edit/${id}`);
  };

  const deleteContact = async () => {
    try {
      const { data } = await DeleteContact({
        variables: { id: contactDetail?.id },
      });

      console.log("Phone deleted:", data.delete_contact_by_pk);
      Swal.fire("Contact has been deleted", "", "success");
      fetchContacts();
    } catch (error) {
      console.error("Error deleting phone:", error);
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Do you want delete this contact?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        deleteContact();
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  useEffect(() => {
    setContactDetail(undefined);
    setContactDetail(contact);
  }, [contact]);

  return (
    <>
      {open && (
        <div
          css={tw`fixed inset-0 z-[70] grid place-content-end lg:place-content-center bg-gray-500 bg-opacity-50`}
        >
          <Outside onClick={handleClose}>
            <article>
              <div
                css={tw` w-[222px] h-screen lg:h-auto overflow-y-auto bg-white rounded-lg shadow-md p-8`}
              >
                <div css={tw`flex mt-20`}>
                  <img
                    css={tw`w-32 h-32 rounded-full mx-auto`}
                    src="https://picsum.photos/200"
                    alt="Profile picture"
                  ></img>
                </div>
                <div css={tw`flex justify-center items-center gap-3`}>
                  <h2 css={tw`text-center text-2xl font-semibold mt-3`}>
                    {contactDetail?.first_name} {contactDetail?.last_name}
                  </h2>
                  <div onClick={handleEdit} css={tw`cursor-pointer`}>
                    <EditContactIcon />
                  </div>
                  <div onClick={handleDelete} css={tw`cursor-pointer`}>
                    <DeleteIcon />
                  </div>
                </div>

                <p css={tw`text-center text-gray-600 mt-1`}>
                  Software Engineer
                </p>

                <div css="mt-10">
                  <h3 css={tw`text-sm font-semibold mt-10`}>Phone Numbers</h3>
                  <hr></hr>

                  {contactDetail?.phones.map((el, index) => {
                    return (
                      <div key={index} css={tw`my-2`}>
                        <span>{el.number}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </article>
          </Outside>
        </div>
      )}
    </>
  );
};

export default ContactDetailModal;
