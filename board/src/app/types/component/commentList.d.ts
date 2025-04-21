interface Comment {
    id: number;
    content: string;
    createdDate: string;
  }
  
  interface CommentListProps {
    commentList: Comment[];
    postId: number;
  }
  