"use client";

import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../public/lottie/JustFlow.json";

interface LoaderProps {
  size?: number; // optional size
}

const Loader: React.FC<LoaderProps> = ({size = 100}) => {
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <Lottie
                animationData={loadingAnimation}
                loop= {true}
                style={{width: size, height: size}}
            />
            
        </div>
    );
}

export default Loader;