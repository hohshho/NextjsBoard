import CommentForm from "@/app/component/commentForm/commentForm";
import CommentList from "@/app/component/commentList/commentList";
import Header from "@/app/component/header/header";
import { formatDate } from "@/app/util/dateUtil";
import Link from "next/link";

export default async function Page({ searchParams }: DetailProps) {
  const { id } = await searchParams;

  const response = await fetch(`http://localhost:8300/api/detail?id=${id}`);
  const content = await response.json();

  return (
    <>
      <Header />

      <div className="container mt-5">
        <h2 className="mb-4">게시글 상세보기</h2>
        <div className="card">
          <div className="card-header">
            <h4>{content.post.title}</h4>
          </div>
          <div className="card-body">
            <div
              className="card-text"
              dangerouslySetInnerHTML={{ __html: content.post.content }}
            />
          </div>
          <div className="card-footer text-muted">
            {formatDate(content.post.created_date)}
            <span className="float-end">조회수: {content.post.view_count}</span>
          </div>
        </div>

        <div className="mt-4">
          <h5>첨부된 파일</h5>
          <ul className="list-group">
            {content.fileList.map((file: FileData) => (
              <li key={file.id} className="list-group-item">
                파일 ID: {file.id},
                <Link
                  href={`http://localhost:8300/fileDownload/${file.id}`}
                  className="text-primary"
                  download
                >
                  {file.fileName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="d-flex gap-3 mt-3">
          <Link href={`/edit/${content.post.id}`} className="btn btn-info">
            글 수정하기
          </Link>
          <Link href={`/api/posts/delete/${content.post.id}`} className="btn btn-danger">
            글 삭제하기
          </Link>
        </div>

        <CommentForm postId={content.post.id} />

        {/* 댓글 목록 */}
        <CommentList
          commentList={content.commentList}
          postId={content.post.id}
        />
      </div>
    </>
  );
}
