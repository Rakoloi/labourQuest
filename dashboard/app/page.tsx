"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button, Typography, Box } from '@mui/material';

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-black flex items-center justify-center px-6">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white/5 backdrop-blur-[16px] border border-white/10 rounded-[16px] shadow-[0_25px_50px_rgba(0,0,0,0.6)] overflow-hidden">

      {/* LEFT CONTENT */}
      <div className="p-10 md:p-14">
        <Typography
        variant="h3"
        component="h1"
        className="font-extrabold text-gray-900 mb-4"
        >
          <p className="text-gray-200">
            Welcome to 
          </p>
        <span className="text-green-600">selfEmploy</span>
        </Typography>

        <div className="mb-5">
          <Typography
            variant="body1"
            className="text-gray-600 leading-relaxed text-lg"
          >
          A modern platform where people connect to offer and find trusted
          local services — from cleaning and repairs to tutoring and
          babysitting. Empower yourself. Work your way.
          </Typography>
        </div>


        <Button
          onClick={() => router.push('/login')}
          variant="contained"
          size="large"
          sx={{
            backgroundColor: '#22c55e',
            paddingX: '2.5rem',
            paddingY: '0.9rem',
            fontSize: '1.05rem',
            fontWeight: 600,
            borderRadius: '9999px',
            textTransform: 'none',
            boxShadow: '0 12px 30px rgba(34,197,94,0.35)',
            '&:hover': {
              backgroundColor: '#16a34a',
            },
          }}
        >
        Log in
        </Button>


        <p className="mt-6 text-sm text-gray-500">
          New here? <span className="text-green-600 font-medium cursor-pointer"><Link href="/register">Create an account</Link></span>
        </p>
        </div>


        {/* RIGHT IMAGE */}
        <div className="relative h-full min-h-[320px]">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop"
            alt="People working together"
            className="h-full w-full object-cover"
          />


          <div className="absolute inset-0 bg-gradient-to-tr from-green-600/30 to-transparent" />
        </div>


      </div>
    </div>
  );
}
