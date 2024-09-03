import React, { useState, useEffect } from 'react';

// Define types for User and Post data
type User = {
  id: number;
  name: string;
};

// Define types for User and Post data
type Post = {
  userId: number;
};

// Define UserList component
const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch users and posts on component mount and update state with data when available 
  useEffect(() => {
    // Fetch users and posts
    const fetchUsersAndPosts = async () => {
      try {
        // Fetch users and posts from API endpoints in parallel using Promise.all 
        const [usersResponse, postsResponse] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/users'),
          fetch('https://jsonplaceholder.typicode.com/posts'),
        ]);

        // Parse response data as JSON and set state with data
        const usersData = await usersResponse.json();
        const postsData = await postsResponse.json();

        // Set state with data from both endpoints in parallel using Promise.all
        setUsers(usersData);
        setPosts(postsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    // Call function to fetch users and posts
    fetchUsersAndPosts();
  }, []);

  // Function to count posts by user ID
  const getPostCount = (userId: number) => {
    return posts.filter(post => post.userId === userId).length;
  };

  // Render user list if data is available
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            Name of the user: {user.name} - Number of Posts they have made: {getPostCount(user.id)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
