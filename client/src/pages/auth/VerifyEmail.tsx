import { useState, useRef, type ChangeEvent, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRef = useRef<Array<HTMLInputElement | null>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) inputRef.current[index + 1]?.focus();

    setError("");
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log("✅ OTP Verified:", otpValue);
      alert("Email verified successfully!");
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6">
      <div className="w-full max-w-md bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="font-extrabold text-2xl sm:text-3xl text-gray-900">
            Verify your email
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Enter the 6-digit code sent to your email address
          </p>
        </div>

        {/* OTP Form */}
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between gap-2 sm:gap-3 mb-4">
            {otp.map((digit, idx) => (
              <Input
                key={idx}
                ref={(el) => {
                  inputRef.current[idx] = el;
                }}
                type="text"
                maxLength={1}
                className="w-10 h-10 sm:w-12 sm:h-12 text-center text-lg sm:text-xl font-semibold 
                border border-gray-300 rounded-md 
                focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={digit}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(idx, e.target.value)
                }
                onKeyDown={(e) => handleKeyDown(idx, e)}
              />
            ))}
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-600 text-center mb-3">{error}</p>
          )}

          {/* Button */}
          {loading ? (
            <Button
              disabled
              className="w-full bg-orange-600 text-white flex items-center justify-center gap-2"
            >
              <Loader2 className="animate-spin" size={18} />
              Verifying...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full cursor-pointer bg-orange-600 hover:bg-orange-700 text-white"
            >
              Verify
            </Button>
          )}
        </form>

        {/* Footer */}
        <div className="mt-5 text-center text-sm text-gray-600 space-y-2">
          <p>
            Didn’t receive the code?{" "}
            <button
              type="button"
              onClick={() => alert("Resent new OTP")}
              className="font-medium cursor-pointer text-orange-600 hover:underline"
            >
              Resend OTP
            </button>
          </p>

          <p>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="font-medium cursor-pointer text-gray-700 hover:underline"
            >
              Back to Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
