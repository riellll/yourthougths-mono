import React, { FC } from "react";
import {
  HeartIcon,
  ChatBubbleBottomCenterTextIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import ToolTip from "./components/ToolTip";
import { Link, useNavigate } from "react-router-dom";
import Button from "./components/Button";
import Card from "./components/Card";
// import cardImage from "./assets/cardImage.png";
import userImage from "./assets/userImage.png";

import { Post } from "./lib/fetchpost";


interface PostCardProps extends Post {
  userImage: string;
  username: string;
  name: string;
  userId: number;
}

const PostCard: FC<PostCardProps> = ({
  id,
  userId,
  title,
  image,
  like,
  bookmark,
  comments,
  username,
  name,
}) => {
  const navigate = useNavigate();

  const stopPropagation = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.stopPropagation();
  };

  return (
    <div
      key={id}
      onClick={() => navigate(`/post/${id}`)}
      className="flex justify-center items-center cursor-pointer"
    >
      <Card className="flex flex-col justify-between w-80 min-h-96 bg-neutral-800 border border-gray-700 shadow-md transition delay-75 duration-300 hover:drop-shadow-md hover:border-gray-500">
        <Link
          to={`/profile/${userId}`}
          onClick={stopPropagation}
          className="flex items-center gap-2"
        >
          <img
            src={userImage || userImage}
            alt="user"
            className="w-10 rounded-full"
          />
          <div>
            <p className="text-neutral-300 font-bold">{name}</p>
            <p className="text-neutral-500 text-xs font-bold">@{username}</p>
          </div>
        </Link>
        <h1 className="text-xl text-gray-100 font-bold">{title}</h1>
        <img
          src={image}
          alt={"title"}
          className="w-full h-36 object-fit rounded-xl"
        />
        <div className="px-4">
          <div className="flex justify-between items-center">
            <ToolTip tip="Like">
              <Button
                size="sm"
                className="border border-gray-700 bg-neutral-800 text-white px-2 hover:text-red-500 hover:drop-shadow-2xl hover:shadow-red-500"
                onClick={stopPropagation}
                Icon={HeartIcon}
              >
                {like.length}
              </Button>
            </ToolTip>
            <ToolTip tip="Comment">
              <Button
                size="sm"
                className="border border-gray-700 bg-neutral-800 text-white px-2 hover:text-green-500 hover:drop-shadow-2xl hover:shadow-green-500"
                onClick={() => navigate(`/post/${id}`)}
                Icon={ChatBubbleBottomCenterTextIcon}
              >
                {comments.length}
              </Button>
            </ToolTip>
            <ToolTip tip="Bookmark">
              <Button
                size="sm"
                className="border border-gray-700 bg-neutral-800 text-white px-2 hover:text-orange-500 hover:drop-shadow-2xl hover:shadow-orange-500"
                onClick={stopPropagation}
                Icon={BookmarkIcon}
              >
                {bookmark.length}
              </Button>
            </ToolTip>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PostCard;
