"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/lib/supabaseClient";

export default function LoginForm() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 1) Email + Password sign-in
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    // Supabase set cookie → navigate to /dashboard
    router.push("/profile");
  };

  // 2) Google OAuth Sign-in
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMsg(null);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/profile",
      },
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }
    // Supabase + Google redirect happen automatically
  };

  return (
    <form onSubmit={handleEmailSignIn} className="w-full p-7">
      {errorMsg && (
        <p className="text-sm text-red-400 bg-red-900/30 p-2 rounded">
          {errorMsg}
        </p>
      )}

      {/* EMAIL FIELD */}
      <div className="relative mb-5">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full pl-10 pr-4 py-4 bg-[#686666] placeholder-gray-300 text-[#E5C9C9] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#e2ac9d]"
        />
      </div>

      {/* PASSWORD FIELD */}
      <div className="relative mb-2">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full pl-10 pr-4 py-4 bg-[#686666] placeholder-gray-300 text-[#E5C9C9] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#e2ac9d]"
        />
      </div>

      {/* “Forgot password” link */}
      <div className="text-right mb-6">
        <a
          href="/auth/reset-password"
          className="text-xs text-gray-400 hover:text-gray-200"
        >
          forgot password &gt;
        </a>
      </div>

      {/* SIGN IN BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="w-[70%] mx-auto flex justify-center items-center gap-2 py-3 mb-4 bg-[#F98D6F] hover:bg-[#c7816e] rounded-full text-white font-medium disabled:opacity-50"
      >
        {loading ? "Signing in…" : "Sign In"}
      </button>

      {/* OR SEPARATOR */}
      <div className="flex items-center justify-center mb-6">
        <span className="h-px flex-1 bg-gray-600"></span>
        <span className="px-3 text-gray-400">or</span>
        <span className="h-px flex-1 bg-gray-600"></span>
      </div>

      {/* SIGN IN WITH GOOGLE */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="w-[70%] mx-auto mb-6 flex justify-center items-center gap-2 py-3 bg-white hover:bg-gray-100 rounded-full text-gray-800 font-medium disabled:opacity-50"
      >
        <Image src="/google.svg" alt="Google" width={20} height={20} />
        {loading ? "Redirecting…" : "Sign in with Google"}
      </button>

      {/* SIGN UP WITH EMAIL */}
      <button
        type="button"
        onClick={() => router.push("/auth/signup")}
        className="w-[70%] mx-auto flex justify-center items-center gap-2 py-3 bg-[#B8864B] hover:bg-[#9c6f3f] rounded-full text-white font-medium"
      >
        <Mail className="w-5 h-5" />
        Sign up with Email
      </button>
    </form>
  );
}
