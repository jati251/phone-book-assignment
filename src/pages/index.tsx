import ContactCard from "@/components/contact-card";
import ContactList from "@/components/contact-list";
import Pagination from "@/components/pagination";
import { useGetContactList } from "@/hooks/contact";
import { Global } from "@emotion/react";
import { useState } from "react";
import css from "styled-jsx/css";
import tw from "twin.macro";

export default function Home() {
  const { error, data, loading } = useGetContactList();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  // Handle form input changes
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const totalItems = 100;
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
  };

  const globalStyles = {
    "*": {
      fontFamily: '"Open Sauce One", "Nunito Sans", -apple-system, sans-serif',
    },
  };

  return (
    <div css={tw`bg-gray-200 flex items-center justify-center min-h-screen`}>
      <ContactList>
        <ContactCard />
        <ContactCard />
        <ContactCard />
        <ContactCard />
        <ContactCard />
        <ContactCard />
        <ContactCard />
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
