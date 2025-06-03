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
    <form
      onSubmit={handleEmailSignIn}
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
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full pl-10 pr-3 py-3 text-sm bg-[#686666] placeholder-gray-300 text-[#E5C9C9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e2ac9d]"
        />
      </div>

      <div className="text-right text-xs text-gray-400 hover:text-gray-200">
        <a href="/auth/reset-password">forgot password &gt;</a>
      </div>

      {/* SIGN IN */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 text-sm bg-[#F98D6F] hover:bg-[#c7816e] rounded-full text-white font-medium disabled:opacity-50"
      >
        {loading ? "Signing in…" : "Sign In"}
      </button>

      {/* OR */}
      <div className="flex items-center justify-center gap-3 text-gray-400 text-sm">
        <span className="h-px flex-1 bg-gray-600"></span>
        <span>or</span>
        <span className="h-px flex-1 bg-gray-600"></span>
      </div>

      {/* GOOGLE */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="w-full flex justify-center items-center gap-2 py-3 text-sm bg-white hover:bg-gray-100 rounded-full text-gray-800 font-medium disabled:opacity-50"
      >
        <Image src="/google.svg" alt="Google" width={18} height={18} />
        {loading ? "Redirecting…" : "Sign in with Google"}
      </button>

      {/* SIGN UP */}
      <button
        type="button"
        onClick={() => router.push("/auth/signup")}
        className="w-full flex justify-center items-center gap-2 py-3 text-sm bg-[#B8864B] hover:bg-[#9c6f3f] rounded-full text-white font-medium"
      >
        <Mail className="w-4 h-4" />
        Sign up with Email
      </button>
    </form>
  );
}
