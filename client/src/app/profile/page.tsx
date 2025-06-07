"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserSession } from "@/hooks/useUserSession";
import LogOutButton from "@/components/LogOutButton"

export default function ProfilePage() {
  const router = useRouter();
  const { session, loading } = useUserSession();

  useEffect(() => {
    if (!loading && !session) {
      router.push("/auth/signin");
    }
  }, [session, loading, router]);

  if (loading) {
    return <p className="text-white">Loading session…</p>;
  }

  return (
    <div className="text-white p-6">
      <h1>Welcome, {session?.user?.user_metadata?.full_name || session?.user?.email}!</h1>
      <LogOutButton/>
    </div>
  );
}