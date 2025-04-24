"use client";

import Link from "next/link";
import { useCurrentPageStore } from "@/app/store/useCurrentPageStore";
import { formatDate } from "@/app/util/dateUtil";

// props 타입 정의
interface BoardListProps {
  boardPage: BoardPage;
}

// 구조분해를 통해 props 받기
export default function BoardList({ boardPage }: BoardListProps) {
  const { detail } = useCurrentPageStore();

  // 안전성 검사 추가
  if (!boardPage || !boardPage.content) {
    return <tr><td colSpan={4}>데이터를 불러올 수 없습니다.</td></tr>;
  }

  return (
    <>
      {boardPage.content.map((post: PostData) => (
        <tr key={post.id}>
          <th scope="row">{post.id}</th>
          <td>
            <Link
              href={`/detail?id=${post.id}`}
              onClick={detail} // 상태 업데이트
            >
              {post.title}
            </Link>
          </td>
          <td>{post.view_count}</td>
          <td>{formatDate(post.created_date)}</td>
        </tr>
      ))}
    </>
  );
}