import tw from "twin.macro";
import React from "react";

export default function ContactList({ children }: { children: any }) {
  return (
    <div
      css={tw`bg-white lg:shadow-lg gap-3 px-8 overflow-y-auto overflow-hidden lg:my-8 lg:h-[700px] rounded-lg flex flex-col items-center w-screen lg:w-[600px] py-8`}
    >
      {children}
    </div>
  );
}

