import ProfileImage from '@/app/components/profile/profile-image';
import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { Comment } from '@/types/commentData';
import formatDateHour from '@/utils/formDateHour';
import { getCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react';

import {
  deleteToDoCardComment,
  editToDoCardComment,
} from '../dashboard/[id]/action';

export default function TodoModalCommentList({
  commentData,
  fetchCommentDatas,
}: {
  commentData: Comment;
  fetchCommentDatas: () => void;
}) {
  const [editComment, setEditComment] = useState(commentData.content);
  const [isEditing, setIsEditing] = useState(false);
  const [isCommentByMe, setIsCommentByMe] = useState(false);

  useEffect(() => {
    async function writtenByMe() {
      const token = getCookie('token');
      const response = await fetch(`${TEAM_BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setIsCommentByMe(data.id === commentData.author.id);
    }
    writtenByMe();
  }, [commentData.author.id]);

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
        profileImageUrl={commentData.author.profileImageUrl}
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
        {isCommentByMe && (
          <div className="flex gap-x-[6px] text-[10px] text-gray-400 underline md:text-xs">
            <button type="button" onClick={() => setIsEditing(true)}>
              수정
            </button>
            <button type="button" onClick={handleDeleteComment}>
              삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
