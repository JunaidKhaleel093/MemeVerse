
const Meme = {
  id: "",
  title: "",
  imageUrl: "",
  creator: "",
  createdAt: "",
  likes: 0,
  comments: [],
  tags: [],
  isLiked: false,
};

const Comment = {
  id: "",
  user: "",
  text: "",
  createdAt: "",
};

const User = {
  id: "",
  username: "",
  avatar: "",
  bio: "", 
  createdAt: "",
  followers: 0,
  following: 0,
  memes: [],
};

export { Meme, Comment, User };
