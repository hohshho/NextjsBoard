"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CommentForm({ postId }: CommentFormProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) return;

    try {
      setIsSubmitting(true);

      // 내부 API Route 호출
      const response = await fetch("/api/comment/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          content,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok && data.success) {
        setContent("");

        // 리다이렉트 처리
        if (data.redirectUrl) {
          router.refresh();
        }
      } else {
        throw new Error("댓글 제출 실패");
      }
    } catch (error) {
      console.error("댓글 제출 오류:", error);
      alert("댓글을 작성하는 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-4">
      <h5>댓글</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="commentContent" className="form-label">
            댓글 내용
          </label>
          <textarea
            className="form-control"
            id="commentContent"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            required
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "작성 중..." : "댓글 작성"}
        </button>
      </form>
    </div>
  );
}