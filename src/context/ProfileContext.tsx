import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ProfileContextType {
  username: string;
  setUsername: (name: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState('Guest');

  return (
    <ProfileContext.Provider value={{ 
            username, 
            setUsername }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
