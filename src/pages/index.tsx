import { useGetContactList } from "@/hooks/contact";
import { useState } from "react";

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

  // Handle form submission
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData); // Replace with your form submission logic
  };

  return (
    <>
      <form
        css={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "300px",
          margin: "0 auto",
        }}
        onSubmit={handleSubmit}
      >
        <input
          css={{
            marginBottom: "10px",
            padding: "5px",
            border: "1px solid #ccc",
            borderRadius: `${4}px`,
          }}
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          css={{
            marginBottom: "10px",
            padding: "5px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <button
          css={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#0056b3",
            },
          }}
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
}
