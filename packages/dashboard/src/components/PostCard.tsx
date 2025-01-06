import { FC, useState } from "react";
import {
  HeartIcon,
  ChatBubbleBottomCenterTextIcon,
  BookmarkIcon,
  EllipsisVerticalIcon,
  TrashIcon,
  FlagIcon,
  PencilSquareIcon
} from "@heroicons/react/24/outline";
import ToolTip from "./ToolTip";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import Card from "./Card";
// import cardImage from "./assets/cardImage.png";
import userImage from "../assets/userImage.png";

import { Post } from "../lib/fetchpost";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  Portal,
  Root,
  Trigger,
} from "./Dropdown";
import ParamLink from "./ParamLink";
import { stopPropagation } from "../lib/stopPropagation";
import ConfirmModal from "./ConfirmModal";

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
  const sessionUser = { id: 1 };

  return (
    <div
      key={id}
      onClick={() => navigate(`/post/${id}`)}
      className="flex justify-center items-center cursor-pointer"
    >
      <Card className="flex flex-col justify-between w-80 min-h-96 bg-neutral-800 border border-gray-700 shadow-md transition delay-75 duration-300 hover:drop-shadow-md hover:border-gray-500">
        <div className="flex justify-between">
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
          <PostCardDropdown cardUserId={userId} userId={sessionUser.id} />
        </div>
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

interface PostCardDropdownProps {
  cardUserId: number;
  userId: number;
}

const PostCardDropdown: FC<PostCardDropdownProps> = ({
  cardUserId,
  userId,
}) => {
  const [open, setOpen] = useState(false);
  const canDelete = cardUserId === userId;

  const handleCloseDropdown = () => {
    setOpen(false);
  };

  const confirmDeleteCallBack = () => {
    console.log("delete");
  };
  const confirmReportCallBack = () => {
    console.log("report");
  };

  return (
    <div onClick={stopPropagation}>
      <Root open={open} onOpenChange={setOpen}>
        <Trigger>
          <div className="inline-flex">
            <EllipsisVerticalIcon className="h-5 w-5 text-neutral-300" />
          </div>
        </Trigger>
        <Portal>
          <DropdownMenuContent>
            <div onClick={handleCloseDropdown}>
              <DropdownMenuItem className="cursor-pointer w-full">
                <ParamLink
                  params={{ report: "1" }}
                  className="flex gap-2"
                  replace
                >
                  <FlagIcon className="w-4 h-5" /> {"Report"}
                </ParamLink>
              </DropdownMenuItem>
              {canDelete && (
                <>
                <DropdownMenuItem className="cursor-pointer">
                  <ParamLink
                    params={{ delete: "1" }}
                    className="flex gap-2"
                    replace
                    >
                    <TrashIcon className="w-4 h-5" /> {"Delete"}
                  </ParamLink>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Link
                    to={"/newpost"}
                    className="flex gap-2"
                    replace
                    >
                    <PencilSquareIcon className="w-4 h-5" /> {"Edit"}
                  </Link>
                </DropdownMenuItem>
              </>
              )}
            </div>
          </DropdownMenuContent>
        </Portal>
        <ConfirmModal
          name="report"
          title="Report Post"
          content="Are you sure to Report this post?"
          callBack={confirmReportCallBack}
        />
        <ConfirmModal
          name="delete"
          title="Delete Post"
          content="Are you sure to delete this post?"
          callBack={confirmDeleteCallBack}
        />
      </Root>
    </div>
  );
};

export default PostCard;
