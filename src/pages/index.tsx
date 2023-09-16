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
  const [contacts, setContacts] = useState<ContactProfile[]>([]);
  const [bookmarked, setBookmarked] = useState<ContactProfile[]>([]);

  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
  };

  const handleAddBookmark = (i: number) => {
    const newArray = bookmarked;
    contacts && newArray.push(contacts[i]);

    setBookmarked(newArray);
    setContacts(contacts.filter((item, index) => index !== i));
  };

  const handleRemoveBookmark = (i: number) => {
    const newArray = contacts;
    contacts && newArray.push(bookmarked[i]);

    setBookmarked(bookmarked.filter((item, index) => index !== i));
    setContacts(newArray);
  };

  const globalStyles = {
    "*": {
      fontFamily: '"Open Sauce One", "Nunito Sans", sans-serif',
    },
  };

  useEffect(() => {
    const contacts = localStorage.getItem("contacts");
    if (contacts) setContacts(JSON.parse(contacts));
  }, []);

  return (
    <div css={tw`bg-gray-200 flex items-center justify-center min-h-screen`}>
      <ContactList>
        <div css={tw`flex justify-start w-full py-6 font-bold text-2xl`}>
          <span>Contact List</span>
        </div>
        {bookmarked?.map((contact: ContactProfile, index: number) => {
          return (
            <ContactCard
              isBoorkmark={true}
              removeBookmark={() => handleRemoveBookmark(index)}
              contact={contact}
              key={index}
            />
          );
        })}
        {contacts?.map((contact: ContactProfile, index: number) => {
          return (
            <ContactCard
              isBoorkmark={false}
              addToBookmark={() => handleAddBookmark(index)}
              contact={contact}
              key={index}
            />
          );
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
