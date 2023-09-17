import tw from "twin.macro";
import { css } from "@emotion/react";
import { ContactCardProps, ContactProfile } from "@/types/contact";
import BookmarkIcon from "@/icons/bookmark-icon";
import AddBookmarkIcon from "@/icons/add-bookmark-icon";

const containerStyles = css`
  ${tw`flex justify-between cursor-pointer gap-2 relative p-4 w-full bg-white rounded-lg shadow hover:shadow-md`}
`;

const avatarStyles = css`
  ${tw`w-12 h-12 rounded-full bg-gray-100`}
`;

const nameStyles = css`
  ${tw`ml-3 font-medium text-sm lg:text-lg  text-gray-800`}
`;

const onlineStyles = css`
  ${tw`text-xs lg:text-sm text-gray-600`}
`;

function ContactCard({
  handleDetail,
  handleBookMark,
  isBoorkmark,
  contact,
}: ContactCardProps) {
  const handleBookmark = (e: any) => {
    e.stopPropagation();
    handleBookMark();
  };

  const handleClick = () => {
    handleDetail();
  };

  return (
    <div onClick={handleClick} css={containerStyles}>
      <div
        css={css`
          ${tw`flex items-center`}
        `}
      >
        <img
          css={tw`w-12 h-12 rounded-full mx-auto`}
          src="https://picsum.photos/200"
          alt="Profile picture"
        ></img>
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
          <div onClick={handleBookmark} css={tw`z-40`}>
            <BookmarkIcon />
          </div>
        ) : (
          <div onClick={handleBookmark} css={tw`z-40`}>
            <AddBookmarkIcon />
          </div>
        )}
        <p css={onlineStyles}>{contact.phones[0].number}</p>
      </div>
    </div>
  );
}

export default ContactCard;
