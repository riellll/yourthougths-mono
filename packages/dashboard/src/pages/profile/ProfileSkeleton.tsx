import React from 'react';
import Card from '../../components/Card';
import PostCardSkeleton from '../../components/loading_skeleton/PostCardSkeleton';

const ProfileSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <Card className="space-y-3 w-full h-auto bg-neutral-800 border border-gray-700 shadow-md transition delay-75 duration-300 hover:drop-shadow-md hover:border-gray-500 animate-pulse">
        <div className="flex justify-between items-center">
        <div className="flex justify-start gap-5 w-full items-center">
          <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
          <div className="w-1/2 h-6 bg-gray-700 rounded"></div>
        </div>
          <div className="w-10 h-6 bg-gray-700 rounded"></div>
        </div>
        <div className="w-full h-28 bg-gray-700 rounded"></div>
      </Card>

      <div className="flex justify-between items-center mt-10 animate-pulse">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="w-1/3 h-10 bg-gray-700 rounded mx-2"></div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-10">
        {Array.from({ length: 4 }).map((_) => (
         <PostCardSkeleton/>
        ))}
      </div>
    </div>
  );
};

export default ProfileSkeleton;