import React, { useState, useContext } from 'react'
import { createContext } from 'react';

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (user) => {
        setUser(user)
    }
    const logout = () => {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}