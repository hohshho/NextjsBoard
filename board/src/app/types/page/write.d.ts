// 파일 인터페이스 정의
interface UploadedFile {
    id: number;
    fileName: string;
    fileSize?: number;
    fileType?: string;
  }
  
  // 서버 응답 인터페이스 정의
  interface UploadResponse {
    success: boolean;
    fileId?: number;
    fileName?: string;
    message: string;
    file?: UploadedFile;
  }
  
  // 게시글 인터페이스 정의
  interface Post {
    title: string;
    content: string;
    fileIds: number[];
  }