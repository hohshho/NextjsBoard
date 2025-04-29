interface SearchParams {
  id?: string;
}

interface EditProps {
  searchParams: Promise<SearchParams>;
}

interface PostData {
  id: number;
  title: string;
  content: string;
  created_date: string;
  view_count: number;
}

interface FileListData {
  id: number;
  postId: number;
  fileName: string;
  filePath: string;
  fileSize: number;
  uploadedDate: number[];
}

interface EditFormProps {
  postData: PostData;
  fileListData: FileListData[];
  postId: string;
}

interface PageParams {
  params: {
    postId: string;
  };
}
