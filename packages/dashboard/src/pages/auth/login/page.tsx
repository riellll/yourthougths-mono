import React from 'react';
import Card from '../../../components/Card';
import { Input } from '../../../components/Fields';
import Button from '../../../components/Button';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import Divider from '../../../components/Divider';
import { Link } from 'react-router-dom';


const Login: React.FC = () => {
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-900">
      <Card className="w-full max-w-md p-6 space-y-4 bg-neutral-950 border border-gray-700 shadow-md">
        <h2 className="text-2xl font-bold text-white">Login</h2>
        <form onSubmit={handleLogin} className="space-y-10">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <Input
              type="email"
              name="email"
              Icon={EnvelopeIcon}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <Input 
              type="password"
              name="password"
              Icon={LockClosedIcon}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className='flex flex-col gap-5'>
          <Button
            type="submit"
            className="w-full border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Login
          </Button>
          <Divider className='border-gray-700 border-t border-r-0 w-full'/>
          <div className='text-neutral-500 text-center'>Not a member yet? <Link to={"/auth/signup"} className='text-neutral-200 underline hover:no-underline'>Sign up</Link></div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;