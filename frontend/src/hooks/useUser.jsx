import { useState } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(true);

  const updateUser = (newUser) => setUser(newUser);

  return { getUser: user, updateUser };
};

export default useAuth;
