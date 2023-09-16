import ContactCard from "@/components/contact-card";
import ContactList from "@/components/contact-list";
import Pagination from "@/components/pagination";
import { ContactProfile } from "@/types/contact";
import { Global } from "@emotion/react";
import { useEffect, useState } from "react";
import tw from "twin.macro";

export default function Home() {
  const totalItems = 100;
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [contacts, setContacts] = useState<ContactProfile[]>();

  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
  };

  const globalStyles = {
    "*": {
      fontFamily: '"Open Sauce One", "Nunito Sans", -apple-system, sans-serif',
    },
  };

  useEffect(() => {
    const contacts = localStorage.getItem("contacts");
    if (contacts) setContacts(JSON.parse(contacts));
  }, []);

  return (
    <div css={tw`bg-gray-200 flex items-center justify-center min-h-screen`}>
      <ContactList>
        {contacts?.map((contact: ContactProfile, index: number) => {
          return <ContactCard contact={contact} key={index} />;
        })}
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
        <Global styles={globalStyles} />
      </ContactList>
    </div>
  );
}
