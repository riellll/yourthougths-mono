import "./App.css";
import PostCard from "./PostCard";
import { fetchAllUsers, User } from "./lib/fetchUser";
import { useEffect, useState } from "react";
import { fetchPostsWithoutPostId, Post } from "./lib/fetchpost";
import PostCardSkeleton from "./components/loading_skeleton/PostCardSkeleton";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const postData = await fetchPostsWithoutPostId();
      setPosts(postData); 
      const userData = await fetchAllUsers();
      console.log(userData);
      setUsers(userData); 
      setLoading(false);
    };

    fetchData();
  }, []);


  if (loading) return <>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-10">
    {Array.from({ length: 8 }).map((_,) => (
      <PostCardSkeleton/>
    ))}
  </div>
  </>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-10">
      {posts.map((post) => {
        const user = users.find((user) => user.id === post.userId);
        return (
          <PostCard
            key={post.id}
            {...post}
            userImage={user?.image || ''}
            username={user?.username || ''}
            name={user?.name || ''}
            userId={user?.id || 0}
          />
        );
      })}
    </div>
  );
}

export default App;
