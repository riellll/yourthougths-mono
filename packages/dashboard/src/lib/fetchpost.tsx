// Import the post data
import postsData from '../data_json/post.json';

// Define the Post interface
export interface Post {
  id: number;
  userId: number;
  postId: number | null;
  title: string;
  content: string;
  image: string;
  like: number[];
  bookmark: number[];
  comments: number[];
}


const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


export const fetchAllPosts = async (): Promise<Post[]> => {
  await delay(1000); // Simulate a 1-second delay
  return postsData;
};


export const fetchPostsWithoutPostId = async (): Promise<Post[]> => {
  await delay(1000); // Simulate a 1-second delay
  const filteredPosts = postsData.filter((post) => post.postId === null);
  return filteredPosts;
};


export const fetchPostByPostId = async (postId: number): Promise<Post | null> => {
  await delay(1000); // Simulate a 1-second delay
  const post = postsData.find((post) => post.postId === postId);
  return post || null;
};


export const fetchPostById = async (id: number): Promise<Post | null> => {
  await delay(1000); // Simulate a 1-second delay
  const post = postsData.find((post) => post.id === id);
  return post || null;
};

export const fetchPostByUserId = async (userId: number): Promise<Post[] | null> => {
  await delay(1000); // Simulate a 1-second delay
  const post = postsData.filter((post) => post.userId === userId);
  return post || null;
};

export const fetchPostByLike = async (like: number): Promise<Post[] | null> => {
  await delay(1000); // Simulate a 1-second delay
  const post = postsData.filter((post) => post.like.includes(like));
  return post || null;
};

export const fetchPostByBookmark = async (bookmark: number): Promise<Post[] | null> => {
  await delay(1000); // Simulate a 1-second delay
  const post = postsData.filter((post) => post.bookmark.includes(bookmark));
  return post || null;
};

export const fetchPostsByIds = async (ids: number[]): Promise<Post[]> => {
  await delay(1000); 
  const posts = postsData.filter((post) => ids.includes(post.id));
  return posts;
};


const exampleUsage = async () => {
  const allPosts = await fetchAllPosts();
  console.log('All Posts:', allPosts);

  const postsWithoutPostId = await fetchPostsWithoutPostId();
  console.log('Posts without postId:', postsWithoutPostId);

  const postId = 1;
  const postByPostId = await fetchPostByPostId(postId);
  console.log(`Post with postId ${postId}:`, postByPostId);

  const id = 1;
  const postById = await fetchPostById(id);
  console.log(`Post with id ${id}:`, postById);
};

exampleUsage();