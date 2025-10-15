import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SplashScreen = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 2500); // 2.5 seconds delay
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        backgroundColor: "#ffffff",
        color: "#000000",
        textAlign: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <motion.img
        src="/logo.png"
        alt="Tripzo Logo"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        style={{
          width: "120px",
          height: "120px",
          marginBottom: "20px",
        }}
      />
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        style={{
          fontSize: "2rem",
          fontWeight: 600,
          marginBottom: "6px",
        }}
      >
        Tripzo
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        style={{
          fontSize: "1rem",
          opacity: 0.7,
          letterSpacing: "0.5px",
        }}
      >
        Travel with Tripzo
      </motion.p>
    </div>
  );
};

export default SplashScreen;
