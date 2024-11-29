'use client';
import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { getAccessToken, setAccessToken, removeAccessToken } from "../Auth/AuthService";
import { jwtDecode } from "jwt-decode";

// Define the shape of the authentication context
interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    authenticate: (newToken: string) => void;
    signout: () => void;
}

// Create the context with a more precise initial value
export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    token: null,
    authenticate: () => {},
    signout: () => {}
});

// Props interface for the AuthProvider
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    // State management with more explicit typing
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null);

    // Initialize authentication state on component mount
    useEffect(() => {
        const storedToken = getAccessToken();
        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
        }
    }, []);

    // Memoized authentication method to prevent unnecessary re-renders
    const authenticate = useCallback((newToken: string) => {
        try {
            // Set the access token in storage
            setAccessToken(newToken);
            
            // Update state
            setToken(newToken);
            setIsAuthenticated(true);
        } catch (error) {
            // Handle potential errors during authentication
            console.error('Authentication failed', error);
            setToken(null);
            setIsAuthenticated(false);
        }
    }, []);

    // Memoized signout method to prevent unnecessary re-renders
    const signout = useCallback(() => {
        // Remove the access token from storage
        removeAccessToken();
        
        // Reset authentication state
        setToken(null);
        setIsAuthenticated(false);
    }, []);

    // Provide the context value to children
    return (
        <AuthContext.Provider 
            value={{ 
                isAuthenticated, 
                token, 
                authenticate, 
                signout 
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
