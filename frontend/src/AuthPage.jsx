import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plane, MapPin, CheckCircle2 } from "lucide-react";

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [useEmail, setUseEmail] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [verified, setVerified] = useState(false);

  const handleOtpRequest = () => {
    setOtpSent(true);
    setTimer(30);
  };

  const handleOtpVerify = () => {
    setVerified(true);
    setTimeout(() => {
      setIsSignIn(true);
      setOtpSent(false);
      setVerified(false);
    }, 2000);
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-200 via-sky-300 to-sky-400 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-white shadow-xl rounded-2xl p-8 space-y-6">
          {/* Header */}
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-2">
              <Plane className="w-8 h-8 text-sky-600" />
              <span className="text-2xl font-bold text-sky-700">TravelGo</span>
            </div>
            <p className="text-sky-600 text-sm flex items-center">
              <MapPin className="w-4 h-4 mr-1" /> Explore the world with us
            </p>
          </div>

          {/* Success State */}
          {verified ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center space-y-2"
            >
              <CheckCircle2 className="w-12 h-12 text-green-600" />
              <p className="text-green-700 font-semibold">
                OTP Verified! Welcome aboard ✈️
              </p>
            </motion.div>
          ) : (
            <>
              {/* Switch between Email / Phone */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setUseEmail(true)}
                  className={`px-4 py-1 rounded-xl ${
                    useEmail
                      ? "bg-sky-600 text-white"
                      : "border border-gray-300 text-gray-700"
                  }`}
                >
                  Use Email
                </button>
                <button
                  onClick={() => setUseEmail(false)}
                  className={`px-4 py-1 rounded-xl ${
                    !useEmail
                      ? "bg-sky-600 text-white"
                      : "border border-gray-300 text-gray-700"
                  }`}
                >
                  Use Number
                </button>
              </div>

              {/* Inputs */}
              <div className="space-y-4">
                {!isSignIn && (
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full rounded-xl p-2 border border-gray-300"
                  />
                )}
                {useEmail ? (
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-xl p-2 border border-gray-300"
                  />
                ) : (
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full rounded-xl p-2 border border-gray-300"
                  />
                )}
                {isSignIn ? (
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full rounded-xl p-2 border border-gray-300"
                  />
                ) : otpSent ? (
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    className="w-full rounded-xl p-2 border border-gray-300"
                  />
                ) : null}
              </div>

              {/* Buttons */}
              {isSignIn ? (
                <button className="w-full bg-sky-600 hover:bg-sky-700 rounded-xl py-2 text-white font-semibold shadow-md">
                  Sign In
                </button>
              ) : otpSent ? (
                <div className="space-y-3">
                  <button
                    onClick={handleOtpVerify}
                    className="w-full bg-sky-600 hover:bg-sky-700 rounded-xl py-2 text-white font-semibold shadow-md"
                  >
                    Verify OTP & Sign Up
                  </button>
                  <div className="text-center text-sm text-gray-600">
                    {timer > 0 ? (
                      <span>Resend OTP in {timer}s</span>
                    ) : (
                      <button
                        onClick={handleOtpRequest}
                        className="text-sky-600 font-semibold hover:underline"
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleOtpRequest}
                  className="w-full bg-sky-600 hover:bg-sky-700 rounded-xl py-2 text-white font-semibold shadow-md"
                >
                  Get OTP
                </button>
              )}

              {/* Switch link */}
              <div className="text-center text-sm text-gray-600">
                {isSignIn ? (
                  <>
                    Don’t have an account?{" "}
                    <button
                      onClick={() => setIsSignIn(false)}
                      className="text-sky-600 font-semibold hover:underline"
                    >
                      Sign Up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      onClick={() => setIsSignIn(true)}
                      className="text-sky-600 font-semibold hover:underline"
                    >
                      Sign In
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
