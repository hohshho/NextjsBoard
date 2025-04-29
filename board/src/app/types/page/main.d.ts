interface SearchParams {
  page?: string;
  size?: string;
}

interface HomeProps {
  searchParams: Promise<SearchParams>;
}

// 게시글 항목에 대한 타입
interface PostData {
  id: number;
  title: string;
  content: string;
  view_count: number;
  created_date: string;
}

// 페이지네이션 정보를 포함한 게시판 데이터 타입
interface BoardPage {
  content: PostData[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

interface BoardListProps {
  boardPage: BoardPage;
}