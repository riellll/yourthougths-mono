import React, { useEffect, useState } from "react";
import userImage from "../../assets/userImage.png";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import {
  HeartIcon,
  PhotoIcon,
  BookmarkIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";

import clsx from "clsx";
import { fetchPostByBookmark, fetchPostByLike, fetchPostByUserId, Post, } from "../../lib/fetchpost";
import { fetchUserById, User } from "../../lib/fetchUser";
import { Link, useParams } from "react-router-dom";
import PostCard from "../../PostCard";
import ProfileSkeleton from "./ProfileSkeleton";

const Profile = () => {
  const { id: userId } = useParams<{ id: string }>();
  const [barMark, setBarMark] = useState("Post");

  const [posts, setPosts] = useState<Post[] | null>(null);
  const [postsLike, setPostsLike] = useState<Post[] | null>(null);
  const [postsBookmark, setPostsBookmark] = useState<Post[] | null>(null);
  const [user, setUsers] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetchUserById(Number(userId));
      console.log(userData);
      setUsers(userData);
      
      if (userData) {
        const postData = await fetchPostByUserId(userData.id);
        setPosts(postData);
        const postLike = await fetchPostByLike(userData.id);
        setPostsLike(postLike);
        const postBookmark = await fetchPostByBookmark(userData.id);
        setPostsBookmark(postBookmark);
      }
      setLoading(false);
    };

    fetchData();
  }, [userId]);
  console.log(userId, posts, user);
  const ButtonBar = [
    { Icon: PhotoIcon, title: "Post" },
    { Icon: HeartIcon, title: "Heart" },
    { Icon: BookmarkIcon, title: "Bookmark" },
  ];

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="min-h-screen space-y-10">
      <Card className="flex flex-col gap-2 bg-transparent border-gray-600">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <img
              src={userImage}
              alt="user"
              className="w-16 h-16 rounded-full"
            />
           <div>
           <p className="text-neutral-300 font-bold">{user?.name}</p>
           <p className="text-neutral-500 text-xs font-bold">@{user?.username}</p>
           </div>
          </div>
          <Link to={`/profile/edit`}>
          <Button
            className="text-white bg-transparent hover:bg-neutral-800"
            size="sm"
            Icon={PencilSquareIcon}
          ></Button>
          </Link>
        </div>
        <p className="text-neutral-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
          voluptatibus, hic dolorum pariatur quidem alias odio harum tempora
          consequatur rem enim. Maiores ipsum in debitis, voluptatibus
          repudiandae laudantium odit optio!
        </p>
      </Card>

      <div className="flex justify-between items-center">
        {ButtonBar.map((item) => (
          <Button
            Icon={item.Icon}
            className={clsx(
              "text-white bg-transparent w-full text-center justify-center hover:bg-neutral-800 rounded-none border-gray-600",
              {
                "bg-neutral-800": item.title === barMark,
              }
            )}
            onClick={() => setBarMark(item.title)}
            size="sm"
            variant="dark"
          >
            {item.title}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {barMark === "Post" && posts?.map((post) => (
          <PostCard 
          key={post.id}
            {...post}
            userImage={user?.image || ''}
            username={user?.username || ''}
            name={user?.name || ''}
            userId={user?.id || 0}
             />
        ))}
        {barMark === "Heart" && postsLike?.map((post) => (
          <PostCard 
          key={post.id}
            {...post}
            userImage={user?.image || ''}
            username={user?.username || ''}
            name={user?.name || ''}
            userId={user?.id || 0}
             />
        ))}
        {barMark === "Bookmark" && postsBookmark?.map((post) => (
          <PostCard 
          key={post.id}
            {...post}
            userImage={user?.image || ''}
            username={user?.username || ''}
            name={user?.name || ''}
            userId={user?.id || 0}
             />
        ))}
      </div>
    </div>
  );
};

export default Profile;
