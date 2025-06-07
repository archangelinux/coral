"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";

export function useUserSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  return { session, loading };
}