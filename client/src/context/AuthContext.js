import React, { useState, useContext } from 'react'
import { createContext } from 'react';

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem("sessionId") || null);

    const login = (user) => {
        localStorage.setItem("sessionId", user);
        setUser(user)
    }
    const logout = () => {
        localStorage.removeItem("sessionId");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}