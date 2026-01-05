"use client";

import { Alert, Button, Typography, InputAdornment } from "@mui/material";
import { useState } from "react";
import { Mail, Lock, EyeOff, Eye, User } from "lucide-react";
import InputField from "@/components/inputField";
import CreateUserAccount from "../lib/createAccount";
import Loader from "@/components/loader";
import SuccessModal from "@/components/processingModal";



const RegisterUser = () => {

    const[userEMail, setUserEmail] = useState('');
    const[name, setName] = useState('');
    const[surname, setSurname] = useState('');
    const[password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const[error, setError] = useState("");
    const[isLoading, setIsLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const handleRegister = async() => {
        if(userEMail == "" && name == "" && surname == "" && password == ""){
            setError("fill all fields");
        }
        else{
            console.log("trigged");
            setIsLoading(true);
            const results = await CreateUserAccount(name, surname, userEMail, password);
            window.alert(results.success);
            setIsLoading(false);
        }
    }

    const handleSuccessOk = () => {
        console.log("OK clicked! You can navigate or perform other actions here.");
        setModalOpen(false);
    };

    return(
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#020617] to-black px-4">
            <div className="w-full max-w-md">
                
                <div className="p-5 w-full max-w-[520px] bg-white/5 backdrop-blur-[16px] border border-white/10 rounded-[16px] shadow-[0_25px_50px_rgba(0,0,0,0.6)]">
                    
                        {/* Header */}
                        <div className="mb-5 text-center">
                            <h1 className="text-3xl font-bold text-white">Create Account</h1>
                            <p className="text-sm text-slate-400 mt-2">
                            Join <span className="text-[#00D26A] font-medium">selfEmploy</span> and start managing your work smarter
                            </p>
                        </div>

                        {error && (
                            <Alert severity="error" className="rounded-xl mb-5">
                                {error}
                            </Alert>
                        )}

                        {isLoading && <Loader />}
                        <SuccessModal isOpen={modalOpen} onClose={handleSuccessOk} message="Your account is being processed. Access will be granted within 24 hours."/>
                        {/* Form */}
                        <div>    
                            <div>
                                <InputField label="Email" placeholder="example@gmail.com" value={userEMail} icon={Mail} onChange={(e) => setUserEmail(e.target.value)}/>
                            </div>     

                            <div className="mt-6">
                                <InputField label="Name" placeholder="John" value={name} icon={User} onChange={(e) => setName(e.target.value)}/>
                            </div>    

                            <div className="mt-6">
                                <InputField label="Surname" placeholder="Doe" value={surname} icon={User} onChange={(e) => setSurname(e.target.value)}/>
                            </div>

                            <div className="mt-6">
                                <InputField label="Password" placeholder="••••••••" value={password} type="password" icon={Lock} onChange={(e) => setPassword(e.target.value)}/>
                            </div>             

                            <div className="space-y-4 mt-7">
                                <Button
                                    fullWidth
                                    size="large"
                                    onClick={handleRegister}
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
                                    Create Account
                                </Button>
                            </div>

                        </div>

                        <Typography
                            variant="body2"
                            color="#94a3b8"
                            textAlign="center"
                            mt={4}
                            >
                            Already have an account?{' '}
                            <a href="/login" style={{ color: "#00D26A", textDecoration: "none" }}>
                            Sign in
                            </a>
                        </Typography>
                    
                </div>
            </div>
        </div>
    )
}

export default RegisterUser;