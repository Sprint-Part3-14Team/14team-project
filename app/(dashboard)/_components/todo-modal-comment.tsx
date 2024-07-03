import Button from '@/app/components/button';
import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { CardData } from '@/types/card';
import { getCookie } from 'cookies-next';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { postToDoCardComment } from '../dashboard/[id]/action';
import TodoModalCommentList from './todo-modal-comment-list';

export default function TodoModalComment({ ...props }: { props: CardData }) {
  const [comment, setComment] = useState('');
  const [commentDatas, setCommentDatas] = useState<any[]>([]);

  const params = useParams<{ id: string }>();

  async function fetchCommentDatas() {
    const token = getCookie('token');
    // TODO - 무한 스크롤 구현
    const response = await fetch(
      `${TEAM_BASE_URL}/comments?size=100000&cardId=${props.props.id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    setCommentDatas(data.comments);
  }

  useEffect(() => {
    fetchCommentDatas();
  }, []);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const commentData = {
      content: comment,
      cardId: props.props.id,
      columnId: props.props.columnId,
      dashboardId: Number(params.id),
    };

    await postToDoCardComment(commentData);

    setComment('');
    await fetchCommentDatas();
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
          value={comment}
        />
        <Button
          type="submit"
          variant="mobile84x28"
          className="ml-auto rounded-md border bg-white text-violet-primary"
        >
          작성
        </Button>
      </form>
      {commentDatas?.map((commentData: any) => (
        <TodoModalCommentList commentData={commentData} key={commentData.id} />
      ))}
    </div>
  );
}
