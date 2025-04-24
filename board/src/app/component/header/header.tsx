"use client";

import Link from "next/link";
import Searchbar from "../searchbar/searchbar";
import { useCurrentPageStore } from '../../store/useCurrentPageStore';

export default function Header() {
  const page = useCurrentPageStore(state => state.page)
  const { list, write } = useCurrentPageStore(); // 액션도 가져오기

  return (
    <div className="container">
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <Link
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
          onClick={list}
        >
          <span className="fs-4">EGIS</span>
        </Link>

        {/* 검색 폼 */}
        <Searchbar />

        <ul className="nav nav-pills">
          <li className="nav-item">
            <Link href="/" className={`nav-link ${page === "list" ? "active" : ""}`} onClick={list}>
              list 페이지
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/write" className={`nav-link ${page === "write" ? "active" : ""}`} onClick={write}>
              write 페이지
            </Link>
          </li>
        </ul>
      </header>
    </div>
  );
}
