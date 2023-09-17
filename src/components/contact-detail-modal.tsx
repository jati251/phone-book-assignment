import React, { useEffect, useState } from "react";
import Outside from "./outside";
import { ContactProfile } from "@/types/contact";
import { useGetContactDetail } from "@/hooks/contact";
import tw from "twin.macro";
import EditContactIcon from "@/icons/edit-contact-icon";
import { useRouter } from "next/router";

const ContactDetailModal = ({
  id,
  onClose,
  open,
}: {
  id: number;
  onClose: () => void;
  open: boolean;
}) => {
  const [contact, setContact] = useState<ContactProfile>();
  const { error, data, loading } = useGetContactDetail(id);

  const router = useRouter();

  const handleClose = () => {
    onClose();
  };

  const handleEdit = () => {
    router.push(`/edit/${id}`);
  };

  useEffect(() => {
    setContact(undefined);
    setContact(data?.contact_by_pk);
  }, [data]);

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
                <div css={tw`flex justify-center items-center gap-4`}>
                  <h2 css={tw`text-center text-2xl font-semibold mt-3`}>
                    {contact?.first_name} {contact?.last_name}
                  </h2>
                  <div onClick={handleEdit} css={tw`cursor-pointer`}>
                    <EditContactIcon />
                  </div>
                </div>

                <p css={tw`text-center text-gray-600 mt-1`}>
                  Software Engineer
                </p>

                <div css="mt-10">
                  <h3 css={tw`text-sm font-semibold mt-10`}>Phone Numbers</h3>
                  <hr></hr>

                  {contact?.phones.map((el, index) => {
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
