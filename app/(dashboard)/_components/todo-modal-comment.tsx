import Button from '@/app/components/button';
import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import TODO_MODAL_COMMENT_SIZE from '@/constants/TODO_MODAL_COMMENT';
import { CardData } from '@/types/card';
import { Comment } from '@/types/commentData';
import { getCookie } from 'cookies-next';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import {
  deleteToDoCardComment,
  editToDoCardComment,
  postToDoCardComment,
} from '../dashboard/[id]/action';
import TodoModalCommentList from './todo-modal-comment-list';

export default function TodoModalComment({ ...props }: { props: CardData }) {
  const [comment, setComment] = useState('');
  const [commentDatas, setCommentDatas] = useState<Comment[]>([]);
  const [cursorId, setCursorId] = useState<number | null>(null);

  const params = useParams<{ id: string }>();
  const { ref, inView } = useInView();

  const fetchCommentDatas = useCallback(async () => {
    if (cursorId === null) return;

    const token = getCookie('token');

    const response = await fetch(
      `${TEAM_BASE_URL}/comments?size=${TODO_MODAL_COMMENT_SIZE}&cardId=${props.props.id}&cursorId=${cursorId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    setCommentDatas((prev) => [...prev, ...data.comments]);
    setCursorId(data.cursorId);
  }, [props.props.id, cursorId]);

  useEffect(() => {
    const fetchInitCommentDatas = async () => {
      const token = getCookie('token');
      const response = await fetch(
        `${TEAM_BASE_URL}/comments?size=${TODO_MODAL_COMMENT_SIZE}&cardId=${props.props.id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setCommentDatas(data.comments);
      setCursorId(data.cursorId);
    };

    fetchInitCommentDatas();
  }, [props.props.id]);

  useEffect(() => {
    if (inView) {
      fetchCommentDatas();
    }
  }, [inView, fetchCommentDatas]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();

    if (comment.trim() === '') return;

    const commentData = {
      content: comment,
      cardId: props.props.id,
      columnId: props.props.columnId,
      dashboardId: Number(params.id),
    };

    const data = await postToDoCardComment(commentData);

    setCommentDatas((prev) => [data, ...prev]);
    setComment('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleEditComment = async (commentId: number, newContent: string) => {
    await editToDoCardComment(commentId, newContent);
    const updatedComments = commentDatas.map((updatedComment) =>
      updatedComment.id === commentId
        ? { ...updatedComment, content: newContent }
        : updatedComment
    );
    setCommentDatas(updatedComments);
  };

  const handleDeleteComment = async (commentId: number) => {
    await deleteToDoCardComment(commentId);
    const updatedComments = commentDatas.filter(
      (deletedComment) => deletedComment.id !== commentId
    );
    setCommentDatas(updatedComments);
  };

  return (
    <div className="my-5">
      <form className="flex flex-col gap-y-[10px]" onSubmit={handleSubmit}>
        <label htmlFor="comment" className="text-sm font-medium md:text-base">
          댓글
        </label>
        <textarea
          id="comment"
          className="h-[70px] w-full resize-none rounded-md border p-4 text-xs md:h-[110px] md:text-sm"
          placeholder="댓글 작성하기"
          onChange={handleCommentChange}
          onKeyPress={handleKeyDown}
          value={comment}
        />
        <Button
          type="submit"
          variant="mobile84x28"
          className="ml-auto rounded-md border bg-background text-primary"
          disabled={comment.length === 0}
        >
          작성
        </Button>
      </form>
      {commentDatas?.map((commentData: Comment) => (
        <TodoModalCommentList
          commentData={commentData}
          key={commentData.id}
          onEdit={handleEditComment}
          onDelete={handleDeleteComment}
        />
      ))}
      <div ref={ref} />
    </div>
  );
}
