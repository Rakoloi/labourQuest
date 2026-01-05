"use client";

import React from "react";
import Lottie from "lottie-react";
import successAnimation from "../public/lottie/Successful.json"; // replace with your success Lottie JSON

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void; // function triggered when OK is clicked
  message?: string; // custom message
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  message = "Your account has been successfully created!",
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: 400,
        //   padding: 5,
          borderRadius: 24,
          backgroundColor: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
        }}
      >
        {/* Lottie Success Animation */}
        <Lottie
          animationData={successAnimation}
          loop={true}
          style={{ width: 350, height: 350 }}
        />

        {/* Message */}
        <p
          style={{
            // marginTop: 6,
            textAlign: "center",
            color: "white",
            fontWeight: 500,
            fontSize: 16,
          }}
        >
          {message}
        </p>

        {/* OK Button */}
        <button
          onClick={onClose}
          style={{
            marginTop: 24,
            padding: "10px 24px",
            borderRadius: 9999,
            backgroundColor: "#00D26A",
            color: "black",
            fontWeight: 600,
            cursor: "pointer",
            border: "none",
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;