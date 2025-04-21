import Link from "next/link";
import Searchbar from "../searchbar/searchbar";

export default function Header({ active }: { active: string }) {

  return (
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
            <Link href="/" className={`nav-link ${active === "list" ? "active" : ""}`}>
              list 페이지
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/write" className={`nav-link ${active === "write" ? "active" : ""}`}>
              write 페이지
            </Link>
          </li>
        </ul>
      </header>
    </div>
  );
}
