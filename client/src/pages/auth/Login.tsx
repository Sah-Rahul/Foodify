import { useState, type ChangeEvent, type FormEvent } from "react";
import { loginSchema } from "@/zodSchema/authSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import type { LoginInterface } from "@/types/auth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{ email?: string; password?: string }>({
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState<LoginInterface>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const validation = loginSchema.safeParse(loginData);

    if (!validation.success) {
      setLoading(false);

      const fieldErrors: { email?: string; password?: string } = {};
      validation.error.issues.forEach((issue) => {
        const field = issue.path[0] as "email" | "password";
        fieldErrors[field] = issue.message;
      });

      setErrors(fieldErrors);
      return;
    }

    setTimeout(() => {
      setLoading(false);
      console.log("✅ Login Data:", loginData);
      alert("Login successful!");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm rounded-lg border border-gray-200 p-6 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-semibold text-gray-900">
          FoodiFy
        </h1>

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
                type="text"
                placeholder="Enter your email"
                className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                value={loginData.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative mt-2">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`pl-10 pr-10 ${
                  errors.password ? "border-red-500" : ""
                }`}
                value={loginData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>
          <div className="text-end text-orange-500 underline">
            <Link to={'/forgot-password'}>Forgot password</Link>
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
              Login
            </Button>
          )}
        </form>

        {/* Footer */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-orange-600 hover:underline"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
