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

    // 3) Push user to “Check your inbox” page:
    router.push("/auth/verify-email");
  };

  return (
    <form onSubmit={handleSignup} className="space-y-6 w-full max-w-sm p-6">
      {errorMsg && (
        <p className="text-sm text-red-400 bg-red-900/30 p-2 rounded">
          {errorMsg}
        </p>
      )}

      {/* EMAIL INPUT */}
      <div className="flex items-center bg-[#4B4B4B] rounded-xl">
        <div className="px-3">
          <Mail className="text-gray-300" />
        </div>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 bg-transparent placeholder-gray-300 text-gray-50 py-3 pr-4 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B61]"
        />
      </div>

      {/* CREATE PASSWORD */}
      <div className="flex items-center bg-[#4B4B4B] rounded-xl">
        <div className="px-3">
          <Lock className="text-gray-300" />
        </div>
        <input
          type="password"
          placeholder="create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="flex-1 bg-transparent placeholder-gray-300 text-gray-50 py-3 pr-4 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B61]"
        />
      </div>

      {/* CONFIRM PASSWORD */}
      <div className="flex items-center bg-[#4B4B4B] rounded-xl">
        <div className="px-3">
          <Lock className="text-gray-300" />
        </div>
        <input
          type="password"
          placeholder="confirm password"
          value={confirmPwd}
          onChange={(e) => setConfirmPwd(e.target.value)}
          required
          className="flex-1 bg-transparent placeholder-gray-300 text-gray-50 py-3 pr-4 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B61]"
        />
      </div>

      {/* “Go Fishing” BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center items-center gap-2 py-3 bg-[#6AA88F] hover:bg-[#5f957f] rounded-full text-white font-medium disabled:opacity-50"
      >
        {loading ? "Registering…" : "Go Fishing"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
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
