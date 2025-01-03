import React, { FC } from 'react';
import Card from '../Card';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

interface PostCardSkeletonProps {
    size?: 'sm' | 'lg';
  }

const PostCardSkeleton: FC<PostCardSkeletonProps> = ({size = "sm"}) => {
  return (
    <div className="flex justify-center items-center cursor-pointer">
      <Card className={twMerge(
    clsx("flex flex-col justify-between bg-neutral-800 border border-gray-700 shadow-md transition delay-75 duration-300 hover:drop-shadow-md hover:border-gray-500",{'w-80 min-h-96': size === 'sm', 'w-full h-auto': size === 'lg'}))}>
        <div className="flex items-center gap-2 p-4">
          <div className="w-10 h-10 bg-gray-700 rounded-full animate-pulse"></div>
          <div>
            <div className="w-24 h-4 bg-gray-700 rounded animate-pulse mb-2"></div>
            <div className="w-16 h-3 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="px-4">
          <div className="w-full h-6 bg-gray-700 rounded animate-pulse mb-4"></div>
          <div className={twMerge(
    clsx("w-full bg-gray-700 rounded-xl animate-pulse",{' h-36': size === 'sm', 'h-96': size === 'lg'}))}></div>
        </div>
        <div className="px-4 py-4">
          <div className={twMerge(
    clsx("flex items-center",{'justify-between': size === 'sm', 'justify-center gap-20': size === 'lg'}))}>
            <div className="w-10 h-10 bg-gray-700 rounded-full animate-pulse"></div>
            <div className="w-10 h-10 bg-gray-700 rounded-full animate-pulse"></div>
            <div className="w-10 h-10 bg-gray-700 rounded-full animate-pulse"></div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PostCardSkeleton;