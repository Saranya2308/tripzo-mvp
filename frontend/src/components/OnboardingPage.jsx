import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const slides = [
  { title: "Explore the World", subtitle: "Discover amazing places with Tripzo" },
  { title: "Plan Your Trip", subtitle: "Create your travel itinerary easily" },
  { title: "Make Memories", subtitle: "Share your adventures with friends" },
];

const OnboardingPage = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      navigate("/signin"); // go to Sign In / Sign Up after last slide
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Poppins, sans-serif",
        backgroundColor: "#ffffff",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <motion.div
        key={current}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "10px", color: "#0077ff" }}>
          {slides[current].title}
        </h1>
        <p style={{ fontSize: "1rem", color: "#555" }}>{slides[current].subtitle}</p>
      </motion.div>

      <button
        onClick={nextSlide}
        style={{
          marginTop: "30px",
          padding: "12px 30px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#0077ff",
          color: "#fff",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        {current < slides.length - 1 ? "Next" : "Proceed to Sign In / Sign Up"}
      </button>
    </div>
  );
};

export default OnboardingPage;
