"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Searchbar() {
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState("");

  const q = searchParams.get("keyword");

  useEffect(() => {
    setKeyword(q || "");
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <form
      className="d-flex justify-content-center w-50"
      action="/search"
      method="get"
    >
      <input
        className="form-control me-1"
        type="search"
        placeholder="Search"
        name="keyword"
        aria-label="Search"
        value={keyword}
        onChange={onChangeSearch}
      />
      <button className="btn btn-outline-success me-4" type="submit">
        Search
      </button>
    </form>
  );
}
