import React, { useEffect, useState } from "react";
import ToolTip from "../../../components/ToolTip";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
import {
  HeartIcon,
  ChatBubbleBottomCenterTextIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { Link, useParams } from "react-router-dom";
import cardImage from "./assets/cardImage.png";
import userImage from "../../../assets/userImage.png";
import postImage from "../../../assets/postImage.webp";
import { Input, InputWrapper } from "../../../components/Fields";
import {
  fetchPostById,
  fetchPostByPostId,
  fetchPostsByIds,
  Post,
} from "../../../lib/fetchpost";
import { fetchUserById, User } from "../../../lib/fetchUser";
import PostCard from "../../../PostCard";
import PostCardSkeleton from "../../../components/loading_skeleton/PostCardSkeleton";

const PostId = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [comment, setComment] = useState<Post[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (postId) {
        const postData = await fetchPostById(Number(postId));
        setPost(postData);
        if (postData) {
          const postComment = await fetchPostsByIds(postData?.comments);
          setComment(postComment);
        }

        if (postData) {
          const userData = await fetchUserById(postData.userId);
          setUser(userData);
          console.log(postData?.comments);
        }
      }
    };

    fetchData();
  }, [postId]);

  if (!post || !user)
    return (
      <div className="min-h-screen space-y-10 text-white">
        <PostCardSkeleton size="lg" />
      </div>
    );

  console.log(post, user);
  return (
    <div className="min-h-screen space-y-10">
      <Card className="space-y-3 w-full h-auto bg-neutral-800 border border-gray-700 shadow-md transition delay-75 duration-300">
        <Link to={`/profile/${user.id}`} className="flex items-center gap-2">
          <img src={userImage} alt="user" className="w-10 rounded-full" />
          <div>
            <p className="text-neutral-300 font-bold">{user.name}</p>
            <p className="text-neutral-500 text-xs font-bold">
              @{user.username}
            </p>
          </div>
        </Link>
        <h1 className="text-xl text-gray-100 font-bold">{post?.title}</h1>
        <img
          src={post?.image}
          alt={post?.title}
          className="w-full h-auto object-fit rounded-xl"
        />
        <p className="text-gray-100">{post?.content}</p>
        <div className="flex justify-center items-center py-2">
          <div className="inline-flex justify-center items-center gap-10 border p-3 rounded-full">
            <ToolTip tip="Like">
              <Button
                size="lg"
                variant="invisible"
                className="border hover:text-red-500 hover:bg-transparent text-white"
                onClick={() => {}}
                Icon={HeartIcon}
              >
                {post?.like.length}
              </Button>
            </ToolTip>
            <ToolTip tip="Comment">
              <Button
                size="lg"
                variant="invisible"
                className="border hover:text-green-500 hover:bg-transparent text-white"
                onClick={() => {}}
                Icon={ChatBubbleBottomCenterTextIcon}
              >
                {post?.comments.length}
              </Button>
            </ToolTip>
            <ToolTip tip="Bookmark">
              <Button
                size="lg"
                variant="invisible"
                className="border hover:text-orange-500 hover:bg-transparent text-white"
                onClick={() => {}}
                Icon={BookmarkIcon}
              >
                {post?.bookmark.length}
              </Button>
            </ToolTip>
          </div>
        </div>
      </Card>

      <div className="flex flex-grow w-full border border-gray-700 rounded-full p-3">
        <img src={userImage} alt="user" className="w-16 rounded-full" />
        <InputWrapper variant="invisible" className="border-none">
          <Input
            variant="invisible"
            type="text"
            placeholder="Add a comment"
            className="w-full h-16 border-none text-white md:text-xl rounded-md shadow-sm focus:outline-none focus:ring-none focus:border-gray-300 sm:text-sm"
          />
        </InputWrapper>
        <Button
          size="lg"
          variant="invisible"
          Icon={PaperAirplaneIcon}
          className="px-5 rounded-full text-blue-500 hover:bg-neutral-800"
        />
      </div>
      <div className="space-y-5">
        {comment?.map((post) => (
          <Card className="space-y-3 w-full h-auto bg-neutral-800 border border-gray-700 shadow-md transition delay-75 duration-300 hover:drop-shadow-md hover:border-gray-500">
            <div className="flex items-center gap-2">
              <img src={userImage} alt="user" className="w-8 rounded-full" />
              <p className="text-neutral-300 font-bold">{user?.name}</p>
            </div>
            <h1 className="text-xl text-gray-100">{post?.title}</h1>
            <div className="">
              <div className="flex justify-start gap-5 items-center">
                <ToolTip tip="Like">
                  <Button
                    size="sm"
                    className="border border-gray-700 bg-neutral-800 text-white px-2"
                    onClick={() => {}}
                    Icon={HeartIcon}
                  >
                    {post?.like?.length}
                  </Button>
                </ToolTip>
                <ToolTip tip="Comment">
                  <Button
                    size="sm"
                    className="border border-gray-700 bg-neutral-800 text-white px-2"
                    onClick={() => {}}
                    Icon={ChatBubbleBottomCenterTextIcon}
                  >
                    {post?.comments?.length}
                  </Button>
                </ToolTip>
              </div>
            </div>
          </Card>
          //   <PostCard
          //   key={post.id}
          //   {...post}
          //   userImage={user?.image || ''}
          //   username={user?.username || ''}
          //   name={user?.name || ''}
          //   userId={user?.id || 0}
          // />
        ))}
      </div>
    </div>
  );
};

export default PostId;
