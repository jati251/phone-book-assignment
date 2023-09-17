import React, { useEffect, useState } from "react";
import Outside from "./outside";
import { ContactProfile } from "@/types/contact";
import { useGetContactDetail } from "@/hooks/contact";
import tw from "twin.macro";

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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { error, data, loading } = useGetContactDetail(id);

  const handleClose = () => {
    setIsLoading(true);
    onClose();
  };

  useEffect(() => {
    setContact(undefined);
    setContact(data?.contact_by_pk);
    setIsLoading(false);
  }, [data]);

  return (
    <>
      {open && contact && (
        <div
          css={tw`fixed inset-0 z-[70] grid place-content-end lg:place-content-center bg-gray-500 bg-opacity-50`}
        >
          <Outside onClick={handleClose}>
            <article>
              <main
                css={tw`flex flex-col lg:rounded-lg px-4 py-6 bg-white w-[300px] max-h-[800px] h-screen overflow-y-auto`}
              >
                <div css={tw`flex flex-col`}>
                  <span>{contact?.first_name}</span>
                  <span>{contact?.first_name}</span>
                  <span>{contact?.first_name}</span>
                  <span>{contact?.first_name}</span>

                  <span>{contact?.first_name}</span>
                  <span>{contact?.first_name}</span>
                </div>

                <div css={tw`flex flex-col`}>
                  <span>{contact?.first_name}</span>
                  <span>{contact?.first_name}</span>
                  <span>{contact?.first_name}</span>
                  <span>{contact?.first_name}</span>

                  <span>{contact?.first_name}</span>
                  <span>{contact?.first_name}</span>
                </div>
              </main>
            </article>
          </Outside>
        </div>
      )}
    </>
  );
};

export default ContactDetailModal;
