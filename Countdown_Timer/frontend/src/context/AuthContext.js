import React, {
    createContext,
    useContext,
    useState
} from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem("access")
    );

    const login = (accessToken, refreshToken) => {

        localStorage.setItem(
            "access",
            accessToken
        );

        localStorage.setItem(
            "refresh",
            refreshToken
        );

        setIsAuthenticated(true);
    };

    const logout = () => {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {

    return useContext(AuthContext);

};