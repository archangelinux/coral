"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import { createClient } from "@/lib/supabaseClient";

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setErrorMsg(null);
    setLoading(true);

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/auth/signin",
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      setMessage("Check your inbox for password reset instructions.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1F1F1F]">
      <div className="bg-[#2D2D2D] p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-center text-2xl font-semibold mb-6 text-[#FF6B61]">
          Reset Password
        </h1>

        {errorMsg && (
          <p className="mb-4 text-sm text-red-400 bg-red-900/30 p-2 rounded">
            {errorMsg}
          </p>
        )}

        {message ? (
          <p className="text-gray-200">{message}</p>
        ) : (
          <form onSubmit={handleReset} className="space-y-6">
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
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#FF6B61] hover:bg-[#e3564f] rounded-lg text-white font-medium disabled:opacity-50"
            >
              {loading ? "Sending…" : "Send Reset Link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
