"use client";

import { formatDate } from "@/app/util/dateUtil";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Comment {
  id: number;
  content: string;
  createdDate: string;
}

interface CommentListProps {
  commentList: Comment[];
  postId: number;
}

export default function CommentList({ commentList, postId }: CommentListProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteComment = async (commentId: number) => {
    if (isDeleting) return;
    
    if (!confirm("댓글을 삭제하시겠습니까?")) {
      return;
    }

    try {
      setIsDeleting(true);
      
      const response = await fetch("/api/comment/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commentId,
          postId,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // 삭제 성공 시 페이지 새로고침
        router.refresh();
      } else {
        throw new Error(data.message || "댓글 삭제 실패");
      }
    } catch (error) {
      console.error("댓글 삭제 오류:", error);
      alert("댓글을 삭제하는 중 오류가 발생했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="mt-4 mb-4">
      <h5>댓글 목록</h5>
      {commentList && commentList.length > 0 ? (
        commentList.map((comment: Comment) => (
          <div key={comment.id} className="card mb-2">
            <div className="card-body py-2">
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">
                  {formatDate(comment.createdDate)}
                </small>
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="btn btn-sm text-danger"
                  title="댓글 삭제"
                  disabled={isDeleting}
                >
                  ×
                </button>
              </div>
              <p className="mb-0 mt-1">{comment.content}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-muted">등록된 댓글이 없습니다.</p>
      )}
    </div>
  );
}