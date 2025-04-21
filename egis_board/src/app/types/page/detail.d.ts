interface SearchParams {
  id?: string;
}

interface DetailProps {
  searchParams: Promise<SearchParams>;
}

interface FileData {
    id: number;
    postId: number;
    fileName: string;
    filePath: string;
    fileSize: number;
    uploadedDate: Date;
}