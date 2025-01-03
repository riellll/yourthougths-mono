// Import the user data
import usersData from '../data_json/user.json';


export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  image: string;
  username: string;
}


const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


export const fetchAllUsers = async (): Promise<User[]> => {
  await delay(1000); // Simulate a 1-second delay
  return usersData;
};


export const fetchUserById = async (id: number): Promise<User | null> => {
  await delay(1000); // Simulate a 1-second delay
  const user = usersData.find((user) => user.id === id);
  return user || null;
};

// Example usage
const exampleUsage = async () => {
  const allUsers = await fetchAllUsers();
  console.log('All Users:', allUsers);

  const userId = 1;
  const user = await fetchUserById(userId);
  console.log(`User with ID ${userId}:`, user);
};

exampleUsage();