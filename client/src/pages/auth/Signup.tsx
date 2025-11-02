import { useState, type ChangeEvent, type FormEvent } from "react";
import { signupSchema } from "@/zodSchema/authSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Eye, EyeOff, Phone, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import type { SignupInterface } from "@/types/auth";
import { useUserStore } from "@/zustand/useUserStore";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { signup, loading } = useUserStore();
  const [errors, setErrors] = useState<Partial<SignupInterface>>({});

  const [signupData, setSignupData] = useState<SignupInterface>({
    fullname: "",
    email: "",
    contact: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setErrors({});

    const validation = signupSchema.safeParse(signupData);

    if (!validation.success) {
      const fieldErrors: Partial<SignupInterface> = {};
      validation.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof SignupInterface;
        fieldErrors[field] = issue.message;
      });

      setErrors(fieldErrors);
      return;
    }
    try {
      await signup(signupData);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm rounded-lg border border-gray-200 p-6 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-semibold text-gray-900">
          FoodiFy
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullname"
              type="text"
              placeholder="Enter your full name"
              className={errors.fullname ? "border-red-500" : ""}
              value={signupData.fullname}
              onChange={handleChange}
            />
            {errors.fullname && (
              <p className="mt-1 text-sm text-red-600">{errors.fullname}</p>
            )}
          </div>

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
                className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                value={signupData.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="contact">Contact</Label>
            <div className="relative mt-2">
              <Phone
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                id="contact"
                name="contact"
                type="text"
                placeholder="Enter your contact number"
                className={`pl-10 ${errors.contact ? "border-red-500" : ""}`}
                value={signupData.contact}
                onChange={handleChange}
              />
            </div>
            {errors.contact && (
              <p className="mt-1 text-sm text-red-600">{errors.contact}</p>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword"> Password</Label>
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
                value={signupData.password}
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
              Signup
            </Button>
          )}
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-orange-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
