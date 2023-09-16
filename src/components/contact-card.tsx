import tw from "twin.macro";
import { css } from "@emotion/react";

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

function EmotionComponent() {
  return (
    <div css={containerStyles}>
      <div
        css={css`
          ${tw`flex items-center`}
        `}
      >
        <div css={avatarStyles}></div>
        <div css={nameStyles}>
          <p>John doe</p>
        </div>
      </div>
      <div
        css={css`
          ${tw`flex items-center`}
        `}
      >
        <p css={onlineStyles}>Last online 4 hours ago</p>
      </div>
    </div>
  );
}

export default EmotionComponent;
