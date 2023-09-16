import { useGetContactList } from "@/hooks/contact";
import { useEffect } from "react";

const ContactListProvider = ({ children }: any) => {
  const { error, data, loading } = useGetContactList();
  useEffect(() => {
    if (error) throw error;
    if (data && !loading) {
      localStorage.setItem("contacts", JSON.stringify(data.contact));
    }
  }, [data]);

  return <>{children}</>;
};

export default ContactListProvider;
