import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AdminAuthProvider({ children }) {
    const [isAdminSignedUp, setAdminIsSignedUp] = useState(false);
    useEffect(() => {
        const email = localStorage.getItem("email");
        const role = localStorage.getItem("Role")
        if (email && role === "Admin") {
            setAdminIsSignedUp(true);
        }
    });

    return (
        <AuthContext.Provider value={{ isAdminSignedUp, setAdminIsSignedUp }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAdminAuth() {
    return useContext(AuthContext);
}