interface CommentPropsCompiled {
  content: string;
  postId: string;
  userId: string;
  createdAt: Date;
  user?: User;
  id: string;
}

interface User {
  email: string;
  id: string;
  imageUrl: string | null;
  username: string;
}
