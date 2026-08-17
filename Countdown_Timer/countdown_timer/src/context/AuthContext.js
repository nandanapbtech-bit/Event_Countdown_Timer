import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(
        localStorage.getItem("access_token")
            ? true
            : false
    );

    const login = async (username, password) => {

        const response = await axios.post(
            "http://127.0.0.1:8000/api/token/",
            {
                username,
                password,
            }
        );

        localStorage.setItem(
            "access_token",
            response.data.access
        );

        localStorage.setItem(
            "refresh_token",
            response.data.refresh
        );

        setUser(true);
    };

    const logout = () => {

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        setUser(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};