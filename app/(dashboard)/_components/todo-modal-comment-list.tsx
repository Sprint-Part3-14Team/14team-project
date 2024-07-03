import ProfileImage from '@/app/components/profile/profile-image';
import formatDateHour from '@/utils/formDateHour';
import React from 'react';

export default function TodoModalCommentList({
  commentData,
}: {
  commentData: any;
}) {
  return (
    <div className="mt-4 flex gap-x-[10px]">
      <ProfileImage
        nickname={commentData.author.nickname}
        id={commentData.author.id}
        size="26px"
      />
      <div className="flex flex-col gap-y-[6px]">
        <div className="flex items-center gap-x-[6px]">
          <p className="text-xs font-semibold md:text-sm">
            {commentData.author.nickname}
          </p>
          <p className="text-[10px] text-xs text-gray-400">
            {formatDateHour(commentData.createdAt)}
          </p>
        </div>
        <p className="text-xs md:text-sm">{commentData.content}</p>
        <div className="flex gap-x-[6px] text-[10px] text-xs text-gray-400 underline">
          <button type="button">수정</button>
          <button type="button">삭제</button>
        </div>
      </div>
    </div>
  );
}
