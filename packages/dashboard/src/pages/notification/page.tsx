import Card from '../../components/Card'
import userImage from "../../assets/userImage.png";
import { HeartIcon } from '@heroicons/react/24/solid';

const Notification = () => {
  return (
    <div className='flex flex-col gap-5 min-h-screen'>
      <h1 className='text-white text-4xl font-bold'>Notifications</h1>
      {Array.from({ length: 5 }).map((_,) => (
      <Card className='flex justify-between items-center bg-neutral-800 gap-2'>
      <div className='flex items-center gap-2'>
      <img src={userImage} alt="user" className="w-10 h-10 rounded-full" />
      <div>
      <p className="text-neutral-200 font-bold">User Name <span className='text-neutral-200 font-normal'>liked your post</span></p>
      <p className="text-neutral-200 font-light">2 minutes ago</p>
      </div>
        </div>
       <HeartIcon className="w-8 h-8 text-red-500" />
      </Card>
        ))}
    </div>
  )
}

export default Notification