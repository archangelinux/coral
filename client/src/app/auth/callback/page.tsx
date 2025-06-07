"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

export default function AuthCallbackPage() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.push("/profile");
      } else {
        setTimeout(checkSession, 300);
      }
    };
    checkSession();
  }, [router, supabase]);
  
  return <p className="text-white">Redirecting…</p>;
}
