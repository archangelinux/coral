"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

export default function VerifyEmailPage() {
  const router = useRouter();
  const supabase = createClient();
  const [message, setMessage] = useState("Verifying your email…");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        setMessage("Error verifying email. Please try again.");
        setLoading(false);
        return;
      }

      // If email verified, Supabase sets session.user.email_confirmed_at
      if (session?.user?.email_confirmed_at) {
        router.push("/dashboard");
      } else {
        setMessage("Email verified, but please sign in again.");
        setLoading(false);
      }
    }

    checkSession();
  }, [router, supabase]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1F1F1F]">
      <div className="bg-[#2D2D2D] p-10 rounded-2xl shadow-xl w-full max-w-md text-center text-gray-100">
        <h2 className="text-2xl font-semibold mb-4">Verify Your Email</h2>
        <p className="mb-4">{message}</p>
        {!loading && (
          <button
            onClick={() => router.push("/auth/signin")}
            className="mt-4 px-6 py-2 bg-[#B8864B] hover:bg-[#9c6f3f] rounded-lg text-white font-medium"
          >
            Go to Sign In
          </button>
        )}
      </div>
    </div>
  );
}
