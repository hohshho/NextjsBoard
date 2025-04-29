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

interface CommentFormProps {
  postId: string | number;
}

interface Comment {
  id: number;
  content: string;
  createdDate: string;
}

interface CommentListProps {
  commentList: Comment[];
  postId: number;
}
