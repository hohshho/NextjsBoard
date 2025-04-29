"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useDebounce from "@/app/hooks/useDebounce";

export default function Searchbar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  const q = searchParams.get("keyword");
  const debouncedKeyword = useDebounce(inputValue, 300);

  useEffect(() => {
    setInputValue(q || "");
  }, [q]);

  useEffect(() => {
    // 여기서 debouncedKeyword를 활용가능 (자동완성 같은 로직)
  }, [debouncedKeyword]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      router.push(`/search?keyword=${encodeURIComponent(inputValue)}`);
    }
  };

  return (
    <form
      className="d-flex justify-content-center w-50"
      onSubmit={onSubmit} // ✨ 여기 수정
    >
      <input
        className="form-control me-1"
        type="search"
        placeholder="Search"
        name="keyword"
        aria-label="Search"
        value={inputValue}
        onChange={onChangeSearch}
      />
      <button className="btn btn-outline-success me-4" type="submit">
        Search
      </button>
    </form>
  );
}