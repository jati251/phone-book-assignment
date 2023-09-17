import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ContactCard from "../components/contact-card";
import { ContactProfile } from "@/types/contact";
import "@testing-library/jest-dom";

const mockContact: ContactProfile = {
  id: 1,
  __typename: "ContactProfile",
  first_name: "John",
  last_name: "Doe",
  phones: [{ number: "123-456-7890" }],
};

const mockHandleDetail = jest.fn();
const mockHandleBookMark = jest.fn();

describe("ContactCard Component", () => {
  it("renders contact details correctly", () => {
    const { getByText } = render(
      <ContactCard
        handleDetail={mockHandleDetail}
        handleBookMark={mockHandleBookMark}
        isBoorkmark={true}
        contact={mockContact}
      />
    );

    expect(getByText("John Doe")).toBeInTheDocument();

    expect(getByText("123-456-7890")).toBeInTheDocument();
  });

  it("calls handleDetail when clicked", () => {
    const { container } = render(
      <ContactCard
        handleDetail={mockHandleDetail}
        handleBookMark={mockHandleBookMark}
        isBoorkmark={true}
        contact={mockContact}
      />
    );

    fireEvent.click(container);

    expect(mockHandleDetail).toHaveBeenCalled();
  });

  it("calls handleBookMark when the bookmark icon is clicked", () => {
    const { getByTestId } = render(
      <ContactCard
        handleDetail={mockHandleDetail}
        handleBookMark={mockHandleBookMark}
        isBoorkmark={true}
        contact={mockContact}
      />
    );

    const bookmarkIcon = getByTestId("bookmark-icon");

    fireEvent.click(bookmarkIcon);

    expect(mockHandleBookMark).toHaveBeenCalled();
  });
});
