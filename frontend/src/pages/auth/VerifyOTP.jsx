import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authAPI } from "../../api/apiService";
import { toast } from "react-hot-toast";
import { Loader2, ShieldCheck } from "lucide-react";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      toast.error("Session expired. Please signup again.");
      navigate("/signup");
    }
    if (inputRefs.current[0]) inputRefs.current[0].focus();
  }, [email, navigate]);

  const handleChange = (element, index) => {
    const value = element.value;
    if (isNaN(value)) return false;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");

    if (finalOtp.length < 6) {
      return toast.error("Please enter the full 6-digit code.");
    }

    setLoading(true);
    try {
      await authAPI.verifyOTP({ email, otp: finalOtp });
      toast.success("Identity verified successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkBg px-4 py-6 md:py-12">
      <div className="glass-card p-6 md:p-10 w-full max-w-md transition-all duration-500 border border-white/5 shadow-2xl text-center">
        <div className="flex justify-center mb-6">
          <div className="p-3 md:p-4 bg-primary/10 rounded-full">
            <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-primary animate-pulse" />
          </div>
        </div>

        <h2 className="text-xl md:text-3xl font-space font-bold text-white mb-2 tracking-tight">
          Verify Identity
        </h2>

        <p className="text-text-muted mb-8 md:mb-10 text-xs md:text-sm leading-relaxed">
          Verification code sent to <br />
          <span className="text-tertiary font-bold tracking-wider break-all">
            {email}
          </span>
        </p>

        <form onSubmit={handleVerify} className="space-y-8 md:space-y-10">
          <div className="flex justify-center gap-2 sm:gap-3 md:gap-4">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength="1"
                ref={(el) => (inputRefs.current[index] = el)}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-10 h-12 sm:w-12 sm:h-14 md:w-14 md:h-16 text-center text-xl md:text-2xl font-bold bg-secondary/20 border-b-2 border-white/10 text-primary focus:border-primary focus:bg-primary/5 transition-all outline-none rounded-t-lg"
                required
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-neon w-full py-3 md:py-4 uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold text-xs md:text-sm flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Confirm Code"
            )}
          </button>
        </form>

        <div className="mt-8 flex flex-col gap-3">
          <button
            type="button"
            className="text-[9px] md:text-[10px] text-text-muted hover:text-primary transition-colors uppercase tracking-widest font-semibold"
          >
            Didn't receive code?{" "}
            <span className="text-primary cursor-pointer">Resend</span>
          </button>

          <div className="h-[1px] w-12 bg-white/10 mx-auto"></div>

          <button
            onClick={() => navigate("/signup")}
            className="text-[9px] md:text-[10px] text-text-muted hover:text-white transition-colors uppercase tracking-widest"
          >
            Back to Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
