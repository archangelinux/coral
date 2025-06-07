"use client";
import { createClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth/signin");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-200 hover:bg-red-100 text-black rounded-full text-sm"
    >
      Log out
    </button>
  );
}
