import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Create the context
const UserContext = createContext(null);

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useUser().
export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, setUser);
        return () => unsubscribe(); // Make sure we unmount the listener
    }, []);

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

// Custom hook that shorthands the context!
export const useUser = () => useContext(UserContext);

export default UserContext;
