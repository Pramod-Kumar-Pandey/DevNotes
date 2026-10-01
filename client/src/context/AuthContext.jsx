import { createContext, useContext, useState ,useEffect } from "react";
import api from "../api/axios.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await api.get("/auth/me");
                setUser(response.data.user);
            } catch (error) {
                setUser(null);
            }finally {
                setAuthLoading(false);
            }
        };

        checkAuth();
    }, []);
    
    return (
        <AuthContext.Provider value={{ user, setUser,authLoading}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};