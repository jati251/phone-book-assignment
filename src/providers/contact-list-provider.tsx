import { useGetContactList } from "@/hooks/contact";
import { ContactContextType, ContactProfile } from "@/types/contact";
import { useEffect, useMemo, createContext } from "react";

export const ContactContext = createContext<null | ContactContextType>(null);

const ContactListProvider = ({ children }: any) => {
  const { error, contacts, loading, refetch } = useGetContactList();

  const handleFetchSearch = (page: number, value: string) => {
    const offset = (page - 1) * 10;
    let variables: any = {
      limit: 10,
      offset,
    };
    if (value.length) {
      variables.where = { first_name: { _like: `%${value}%` } };
      variables.offset = 0;
    }

    refetch(variables);
  };

  const handleSetContacts = (data: ContactProfile[]) => {
    localStorage.setItem("contacts", JSON.stringify(data));
  };

  useEffect(() => {
    if (error) throw error;
    if (contacts && !loading) {
      handleSetContacts(contacts);
    }
  }, [contacts]);
  return (
    <>
      <ContactContext.Provider value={{ contacts, handleFetchSearch }}>
        {children}
      </ContactContext.Provider>
    </>
  );
};

export default ContactListProvider;
