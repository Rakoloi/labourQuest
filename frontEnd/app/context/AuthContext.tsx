import { useState, createContext, useContext, ReactNode } from "react"

type AuthContextType = {
    email: string | null;
    setEmail: (email: string | null) => void;
    
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({children} : {children: ReactNode}) => {
    const [email, setEmail] = useState<string | null>(null);

    return(
        <AuthContext.Provider value={{ email, setEmail }}>
            {children}
        </AuthContext.Provider>
    ) 
}

export function useAuth() {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("user Auth must be used inside the AuthProvider");
    }
    return context;
}

export default AuthProvider; 