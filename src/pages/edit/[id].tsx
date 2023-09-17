import ContactForm from "@/components/contact-form";
import { useGetContactDetail } from "@/hooks/contact";
import BackIcon from "@/icons/back-icon";
import { ContactContext } from "@/providers/contact-list-provider";
import { ContactContextType } from "@/types/contact";
import { Global } from "@emotion/react";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import tw from "twin.macro";

const globalStyles = {
  "*": {
    fontFamily: '"Open Sauce One", "Nunito Sans", sans-serif',
  },
};

export default function EditContactPage() {
  const router = useRouter();
  const { handleFetchSearch } = useContext(
    ContactContext
  ) as ContactContextType;
  const { id } = router.query;
  const { error, contact, loading } = useGetContactDetail(id);
  // console.log(data);

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div css={tw`min-h-screen bg-[#F6F7FB] text-[#344054]`}>
      <div css={tw`mx-auto max-w-[1700px] lg:py-8`}>
        <main css={tw`flex justify-center max-h-screen`}>
          <div
            css={tw`bg-white font-bold text-2xl h-screen lg:shadow-lg gap-3 px-3 overflow-y-auto overflow-hidden lg:my-8 lg:h-[700px] rounded-lg items-center w-screen lg:w-[600px] py-8`}
          >
            <div css={tw`flex flex-col cursor-pointer p-5`}>
              <div onClick={handleBack} css={tw`my-2`}>
                <BackIcon />
              </div>
              <span>Edit Contact</span>
              <ContactForm
                fetchContacts={() => handleFetchSearch(1, "")}
                isEdit={true}
                contact={contact}
              />
            </div>
          </div>
        </main>
      </div>
      <Global styles={globalStyles} />
    </div>
  );
}
