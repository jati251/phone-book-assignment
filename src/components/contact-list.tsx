import tw from "twin.macro";
import React from "react";

export default function ContactList({ children }: { children: any }) {
  return (
    <div
      css={tw`bg-white shadow-lg gap-3 px-8 rounded-lg flex flex-col items-center w-[600px] py-8`}
    >
      {children}
    </div>
  );
}
