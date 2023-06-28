import React, { createContext, useState, ReactNode } from 'react';


interface IUserContext {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext<IUserContext>({
    username: '',
    setUsername: () => undefined, 
  });
  
  
  
interface UserProviderProps {
  children: ReactNode;
}


export const UserProvider: React.FC<UserProviderProps> = ({children}) => {
  const [username, setUsername] = useState('');

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};
