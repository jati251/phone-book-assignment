import tw from "twin.macro";
import { css } from "@emotion/react";
import { ContactProfile } from "@/types/contact";
import BookmarkIcon from "@/icons/bookmark-icon";
import AddBookmarkIcon from "@/icons/add-bookmark-icon";

const containerStyles = css`
  ${tw`flex justify-between cursor-pointer gap-2 relative p-4 w-full bg-white rounded-lg overflow-hidden shadow hover:shadow-md`}
`;

const avatarStyles = css`
  ${tw`w-12 h-12 rounded-full bg-gray-100`}
`;

const nameStyles = css`
  ${tw`ml-3 font-medium text-gray-800`}
`;

const onlineStyles = css`
  ${tw`text-sm text-gray-600`}
`;

function ContactCard({
  addToBookmark,
  removeBookmark,
  isBoorkmark,
  contact,
}: {
  addToBookmark?: () => void;
  removeBookmark?: () => void;
  isBoorkmark: boolean;
  contact: ContactProfile;
}) {
  return (
    <div css={containerStyles}>
      <div
        css={css`
          ${tw`flex items-center`}
        `}
      >
        <div css={avatarStyles}></div>
        <div css={nameStyles}>
          <p>
            {contact.first_name} {contact.last_name}
          </p>
        </div>
      </div>
      <div
        css={css`
          ${tw`flex flex-col items-end`}
        `}
      >
        {isBoorkmark ? (
          <div onClick={removeBookmark} css={tw`z-40`}>
            <BookmarkIcon />
          </div>
        ) : (
          <div onClick={addToBookmark} css={tw`z-40`}>
            <AddBookmarkIcon />
          </div>
        )}
        <p css={onlineStyles}>{contact.phones[0].number}</p>
      </div>
    </div>
  );
}

export default ContactCard;
