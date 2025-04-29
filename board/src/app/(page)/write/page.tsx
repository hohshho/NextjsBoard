"use client";

import { useState, useRef } from "react";
import Header from "@/app/component/Header/Header";

export default function Page() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async () => {
    if (!fileInputRef.current?.files?.length) {
      alert("파일을 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("uploadFile", fileInputRef.current.files[0]);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("파일 업로드에 실패했습니다.");
      }

      const data: UploadResponse = await response.json();
      
      if (data.success && data.fileId && data.fileName) {
        const newFile: UploadedFile = {
          id: data.fileId,
          fileName: data.fileName
        };
        
        setUploadedFiles([...uploadedFiles, newFile]);
      } else {
        throw new Error(data.message || "파일 업로드에 실패했습니다.");
      }
      
      // 파일 입력 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("업로드 오류:", error);
      alert(error instanceof Error ? error.message : "파일 업로드 중 오류가 발생했습니다.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }
    
    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    const postData: Post = {
      title,
      content,
      fileIds: uploadedFiles.map(file => file.id),
    };

    try {
      const response = await fetch("/api/posts/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("게시글 작성에 실패했습니다.");
      }

      const data = await response.json();
      
      // 성공 시 목록 페이지로 이동
      window.location.href = "/";
    } catch (error) {
      console.error("게시글 작성 오류:", error);
      alert(error instanceof Error ? error.message : "게시글 작성 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h2 className="mb-4">새 글 작성</h2>

        <div className="mb-4">
          <form className="mb-3">
            <div className="input-group">
              <input
                type="file"
                className="form-control"
                ref={fileInputRef}
                id="uploadFile"
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleFileUpload}
              >
                파일 업로드
              </button>
            </div>
          </form>

          {uploadedFiles.length > 0 && (
            <div className="mt-2">
              <h6>첨부된 파일 리스트</h6>
              <ul className="list-group">
                {uploadedFiles.map((file, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    {file.fileName}
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => {
                        setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
                      }}
                    >
                      삭제
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              제목
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              내용
            </label>
            <textarea
              className="form-control"
              id="content"
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ minHeight: "300px" }}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary mt-4">
            게시글 작성
          </button>
        </form>
      </div>
    </>
  );
}