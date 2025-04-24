import Link from "next/link";
import Header from "../component/header/header";
import BoardList from "../component/BoardList/boardList";

export default async function Page({ searchParams }: HomeProps) {
  const params = await searchParams;

  const page = params.page ? parseInt(params.page) : "";
  const size = params.size ? parseInt(params.size) : "";

  const response = await fetch(
    `http://localhost:8300/api/list?page=${page}&size=${size}`
  );
  // 응답 본문을 JSON으로 파싱
  const boardPage = await response.json();

  return (
    <>
      <Header />

      <div className="container mt-5">
        <h2 className="mb-4">게시판</h2>

        {/* 게시글 목록 */}
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">번호</th>
              <th scope="col">제목</th>
              <th scope="col">조회수</th>
              <th scope="col">작성일</th>
            </tr>
          </thead>
          <tbody>
            <BoardList boardPage={boardPage} />
          </tbody>
        </table>

        {/* 페이징 (샘플 로직) */}
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center">
            {boardPage.currentPage > 1 && (
              <li className="page-item">
                <Link
                  className="page-link"
                  href={`?page=${boardPage.currentPage - 1}&size=${
                    boardPage.pageSize
                  }`}
                  aria-label="Previous"
                >
                  <span aria-hidden="true">&laquo;</span>
                </Link>
              </li>
            )}
            {Array.from({ length: boardPage.totalPages }, (_, i) => i + 1).map(
              i => (
                <li
                  key={i}
                  className={`page-item ${
                    i === boardPage.currentPage ? "active" : ""
                  }`}
                >
                  <Link
                    className="page-link"
                    href={`?page=${i}&size=${boardPage.pageSize}`}
                  >
                    {i}
                  </Link>
                </li>
              )
            )}
            {boardPage.currentPage < boardPage.totalPages && (
              <li className="page-item">
                <Link
                  className="page-link"
                  href={`?page=${boardPage.currentPage + 1}&size=${
                    boardPage.pageSize
                  }`}
                  aria-label="Next"
                >
                  <span aria-hidden="true">&raquo;</span>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
}
