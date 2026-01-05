"use client";

import {
Card,
CardContent,
TextField,
Button,
Typography,
Divider,
IconButton,
Alert,
} from "@mui/material";
import { Lock, Mail, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { use, useState } from "react";
import { useRouter } from "next/navigation";

//custom imports
import InputField from "@/components/inputField";
import SignIn from "../lib/signIn";
import Loader from "@/components/loader";

//firebase imports
import {auth, db} from "../../config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const LoginPage = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const route = useRouter();

    const[userEmail, setUserEmail] = useState('');
    const[password, setUserPassword] = useState('');
    const[isLoading, setIsLoading] = useState(false);

    const handleLogin = async() => {
        // mock validation
        //setError("Invalid email or password. Please try again.");
        //route.push('/dashboard');
        setIsLoading(true);
        if(userEmail != "" || password != ""){
            try{
                const loginStatus = SignIn(userEmail, password);
                if((await loginStatus).results){
                    console.log("the login status is: "+ (await loginStatus).results)
                    route.push('/dashboard');
                    //setIsLoading(false);
                }
                else{
                    setError((await loginStatus).message);
                    console.log("the login status is: "+ (await loginStatus).results);
                    setIsLoading(false);
                }
                
            }catch(err: any){
                console.log(err.message);               
                setError("Login failed. please try again.");
                setIsLoading(false);               
            }
        }else{
            setError("make sure password and email are filled in..");
            setIsLoading(false);
        }
    };

    return(
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#020617] to-black px-4">
            <div className="p-5 w-full max-w-[520px] bg-white/5 backdrop-blur-[16px] border border-white/10 rounded-[16px] shadow-[0_25px_50px_rgba(0,0,0,0.6)]">
                <div className="mb-5 text-center">
                    <h1 className="text-3xl font-bold text-white">Sign In</h1>
                    <p className="text-sm text-slate-400 mt-2">
                        log into your <span className="text-[#00D26A] font-medium">selfEmploy</span> account
                    </p>
                </div>

                {error && (
                    <Alert severity="error" className="rounded-xl mb-10">
                        {error}
                    </Alert>
                )}
                {isLoading && <Loader />}

                <div>
                    <InputField label="Email" placeholder="example@gmail.com" value={userEmail} icon={Mail} onChange={(e) => setUserEmail(e.target.value)}/>
                </div>

                <div className="mt-10">
                    <InputField label="Email" placeholder="••••••••" type="password" value={password} icon={Mail} onChange={(e) => setUserPassword(e.target.value)}/>
                </div>

                <div className="space-y-4 mt-7">
                    <Button
                        fullWidth
                        size="large"
                        onClick={handleLogin}
                        sx={{
                            background: 'linear-gradient(135deg, #00D26A, #00B85D)',
                            color: '#fff',
                            borderRadius: '14px',
                            textTransform: 'none',
                            fontWeight: 600,
                            py: 1.5,
                            boxShadow: '0 8px 20px rgba(0, 210, 106, 0.25)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #00B85D, #009F50)',
                            },
                        }}
                    >
                        Login
                    </Button>
                </div>

                <Typography
                    variant="body2"
                    color="#94a3b8"
                    textAlign="center"
                    mt={4}
                    >
                    Dont have an account?{' '}
                    <a href="/register" style={{ color: "#00D26A", textDecoration: "none" }}>
                        Create
                    </a>
                </Typography>

            </div>
        </div>
    )
}
export default LoginPage;