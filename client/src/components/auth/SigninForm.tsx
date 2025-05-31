"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/lib/supabase";

export default function LoginForm() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Email + password signin
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    // At this point, Supabase has set a session cookie in the browser.
    // Next request to /dashboard will pass the middleware guard.
    router.push("/dashboard");
  };

  // Or, Google OAuth Signin
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMsg(null);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/dashboard",
      },
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    // Note: signInWithOAuth redirects you away from the page
    // to Google, then Supabase callback, then back to /dashboard.
  };

  return (
    <form onSubmit={handleEmailSignIn} className="space-y-6 w-full max-w-sm">
      {errorMsg && (
        <p className="text-sm text-red-400 bg-red-900/30 p-2 rounded">
          {errorMsg}
        </p>
      )}

      {/* EMAIL INPUT */}
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full pl-10 pr-4 py-3 bg-[#4B4B4B] placeholder-gray-300 text-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-[#FF6B61]"
        />
      </div>

      {/* PASSWORD INPUT */}
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full pl-10 pr-4 py-3 bg-[#4B4B4B] placeholder-gray-300 text-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-[#FF6B61]"
        />
      </div>

      {/* FORGOT PASSWORD LINK */}
      <div className="text-right">
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
        className="w-full flex justify-center items-center gap-2 py-3 bg-[#FF6B61] hover:bg-[#e3564f] rounded-lg text-white font-medium disabled:opacity-50"
      >
        {loading ? "Signing in…" : "Sign In"}
      </button>

      {/* OR SEPARATOR */}
      <div className="flex items-center justify-center">
        <span className="h-px flex-1 bg-gray-600"></span>
        <span className="px-3 text-gray-400">or</span>
        <span className="h-px flex-1 bg-gray-600"></span>
      </div>

      {/* SIGN IN WITH GOOGLE */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="w-full flex justify-center items-center gap-2 py-3 bg-white hover:bg-gray-100 rounded-lg text-gray-800 font-medium disabled:opacity-50"
      >
          <Image src="/google.svg" alt="logo" width={16} height={16} />
        {loading ? "Redirecting…" : "Sign in with Google"}
      </button>
    </form>
  );
}
