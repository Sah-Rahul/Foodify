import { useState, type ChangeEvent, type FormEvent } from "react";
import { forgotPasswordSchema } from "@/zodSchema/authSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const validation = forgotPasswordSchema.safeParse({ email });

    if (!validation.success) {
      setLoading(false);
      setError(validation.error.issues[0].message);
      return;
    }

    setTimeout(() => {
      setLoading(false);
      console.log("✅ Forgot Password Email:", email);
      alert("Password reset link sent to your email!");
      setEmail("");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm rounded-lg border border-gray-200 p-6 shadow-sm">
        {/* Title */}
        <h1 className="mb-6 text-center text-2xl font-semibold text-gray-900">
          Forgot Password
        </h1>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative mt-2">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className={`pl-10 ${error ? "border-red-500" : ""}`}
                value={email}
                onChange={handleChange}
              />
            </div>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>

          {loading ? (
            <Button
              disabled
              className="w-full bg-orange-600 text-white flex items-center justify-center gap-2"
            >
              <Loader2 className="animate-spin" size={18} />
              Please wait...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full cursor-pointer bg-orange-600 hover:bg-orange-700 text-white"
            >
              Send Reset Link
            </Button>
          )}
        </form>

        {/* Back to Login */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Remembered your password{" "} ? {" "}
          <Link
            to="/login"
            className="font-medium text-orange-600 hover:underline"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
