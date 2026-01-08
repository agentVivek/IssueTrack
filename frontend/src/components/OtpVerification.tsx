import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { useOtpVerification } from '../hooks/useOtpVerification';

interface OtpVerificationProps{
  email: string;
  setStep: React.Dispatch<React.SetStateAction<'EMAIL' | 'OTP'>>;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({ email, setStep }) => {
  const {verifyOtp, loading} = useOtpVerification();
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  
  // Timer state (starts at 2 minutes: 120 seconds)
  const [timeLeft, setTimeLeft] = useState(120);

  // Refs to handle focus movement between inputs
  const inputRefs = useRef<(HTMLInputElement|null)[]>([]);

  // Timer Countdown Effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  // Format seconds into MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Handle Input Change
  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value)) || element.value === ' ') return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input box if value is entered
    if (element.value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Backspace
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // If empty and backspace pressed, move to previous
        inputRefs.current[index - 1]?.focus();
      } 
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    await verifyOtp(email, finalOtp);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center">
        
        {/* Icon */}
        <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
          <ShieldCheck className="h-8 w-8 text-blue-600" />
        </div>

        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Verify OTP
        </h2>
        <p className="text-gray-500 text-sm mb-8">
          Enter The 6-Digit OTP We Just Sent To Your Registered Email: {email}
        </p>

        {/* OTP Inputs */}
        <form onSubmit={handleVerify}>
          <div className="flex justify-center gap-2 mb-8">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                ref={(el) => {(inputRefs.current[index] = el)}}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl font-semibold text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            ))}
          </div>

          {/* Error Message */}
          {/* {error && (
            <div className="text-red-500 text-sm mb-4">
              {error}
            </div>
          )} */}

          {/* Verify Button */}
          <button
            type="submit"
            disabled={loading || timeLeft === 0}
            className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 mb-6 ${loading || timeLeft === 0 ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Verifying...' : 'VERIFY'}
          </button>
        </form>

        {/* Back to SignUp */}
        <div className="flex flex-col items-center space-y-4">
          <button 
            onClick={() => setStep('EMAIL')}
            className="flex items-center text-sm text-gray-500 hover:text-gray-700 transition duration-150 uppercase tracking-wide font-medium border border-gray-200 px-6 py-2 rounded w-full justify-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go to SignUp
          </button>

          {/* Timer */}
          <div className="text-sm font-medium text-gray-700">
                <span>{formatTime(timeLeft)}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OtpVerification;