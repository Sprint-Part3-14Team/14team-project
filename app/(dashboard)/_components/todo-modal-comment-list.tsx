import ProfileImage from '@/app/components/profile/profile-image';
import formatDateHour from '@/utils/formDateHour';
import React, { useState } from 'react';

import {
  deleteToDoCardComment,
  editToDoCardComment,
} from '../dashboard/[id]/action';

export default function TodoModalCommentList({
  commentData,
  fetchCommentDatas,
}: {
  commentData: any;
  fetchCommentDatas: () => void;
}) {
  const [editComment, setEditComment] = useState(commentData.content);
  const [isEditing, setIsEditing] = useState(false);

  const handleDeleteComment = async () => {
    await deleteToDoCardComment(commentData.id);
    fetchCommentDatas();
  };

  const handleKeyPressEditComment = async (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      await editToDoCardComment(commentData.id, editComment);
      setIsEditing(false);
      fetchCommentDatas();
    }
  };

  return (
    <div className="mt-4 flex gap-x-[10px]">
      <ProfileImage
        nickname={commentData.author.nickname}
        id={commentData.author.id}
        size="26px"
      />
      <div className="flex w-full flex-col gap-y-[6px]">
        <div className="flex items-center gap-x-[6px]">
          <p className="text-xs font-semibold md:text-sm">
            {commentData.author.nickname}
          </p>
          <p className="text-[10px] text-xs text-gray-400">
            {formatDateHour(commentData.createdAt)}
          </p>
        </div>
        {isEditing ? (
          <textarea
            onKeyPress={handleKeyPressEditComment}
            value={editComment}
            onChange={(e) => setEditComment(e.target.value)}
            className="w-full resize-none rounded-md border p-2 text-xs md:text-sm"
          />
        ) : (
          <p className="text-xs md:text-sm">{commentData.content}</p>
        )}
        <div className="flex gap-x-[6px] text-[10px] text-gray-400 underline md:text-xs">
          <button type="button" onClick={() => setIsEditing(true)}>
            수정
          </button>
          <button type="button" onClick={handleDeleteComment}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
