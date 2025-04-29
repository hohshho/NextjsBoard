import Link from "next/link";
import Searchbar from "../../component/Searchbar/Searchbar";
import { formatDate } from "@/app/util/dateUtil";
import { serverGet } from "@/app/util/serverFetch";

export default async function Page({ searchParams }: SearchPageProps) {
  // searchParams를 await하여 실제 값에 접근
  const params = await searchParams;
  
  // keyword 파라미터만 사용
  const keyword = params.keyword || "";
  
  // 검색 API 호출 (page와 size 파라미터 제외)
  const { data: boardPage, error } = await serverGet<any>(
    "http://localhost:8300/api/search",
    { keyword }
  );

  return (
    <>
      <div className="container">
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
          <Link
            href="/"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
          >
            <span className="fs-4">EGIS</span>
          </Link>

          {/* 검색 폼 */}
          <Searchbar />

          <ul className="nav nav-pills">
            <li className="nav-item">
              <Link href="/" className="nav-link">
                list 페이지
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/write" className="nav-link">
                write 페이지
              </Link>
            </li>
          </ul>
        </header>
      </div>

      <div className="container mt-5">
        <h2 className="mb-4">게시판 검색 결과</h2>
        
        {keyword && (
          <p className="text-muted">
            "{keyword}" 검색 결과: 총 {boardPage.content.length}건
          </p>
        )}

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
            {boardPage.content && boardPage.content.length > 0 ? (
              boardPage.content.map((post: PostVO) => (
                <tr key={post.id}>
                  <th scope="row">{post.id}</th>
                  <td>
                    <Link href={`/detail?id=${post.id}`}>{post.title}</Link>
                  </td>
                  <td>{post.view_count}</td>
                  <td>{formatDate(post.created_date)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center">
                  검색 결과가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}