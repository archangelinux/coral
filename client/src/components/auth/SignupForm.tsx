"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";
import { createClient } from "@/lib/supabaseClient";

export default function SignupForm() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    

    // 1) Basic client validation
    if (password !== confirmPwd) {
      setErrorMsg("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    // 2) Sign up with Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // After user clicks link, Supabase will redirect to /auth/verify-email
        emailRedirectTo: window.location.origin + "/auth/verify-email",
      },
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }
    console.log("signup response", data, error);

    // 3) Push user to “Check your inbox” page:
    router.push("/auth/verify-email");
  };

  return (
    <form
      onSubmit={handleSignup}
      className="w-full max-w-sm sm:max-w-md space-y-4"
    >
      {errorMsg && (
        <p className="text-sm text-red-400 bg-red-900/30 p-2 rounded">
          {errorMsg}
        </p>
      )}

      {/* EMAIL */}
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full pl-10 pr-3 py-3 text-sm bg-[#686666] placeholder-gray-300 text-[#E5C9C9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e2ac9d]"
        />
      </div>

      {/* PASSWORD */}
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
        <input
          type="password"
          placeholder="create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full pl-10 pr-3 py-3 text-sm bg-[#686666] placeholder-gray-300 text-[#E5C9C9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e2ac9d]"
        />
      </div>

      {/* CONFIRM */}
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
        <input
          type="password"
          placeholder="confirm password"
          value={confirmPwd}
          onChange={(e) => setConfirmPwd(e.target.value)}
          required
          className="w-full pl-10 pr-3 py-3 text-sm bg-[#686666] placeholder-gray-300 text-[#E5C9C9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e2ac9d]"
        />
      </div>

      {/* SIGN UP */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 text-sm bg-[#6AA88F] hover:bg-[#5f957f] rounded-full text-white font-medium flex justify-center items-center gap-2 disabled:opacity-50"
      >
        {loading ? "Registering…" : "Go Fishing"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 12h14" />
          <path d="M12 5l7 7-7 7" />
        </svg>
      </button>
    </form>
  );
}
