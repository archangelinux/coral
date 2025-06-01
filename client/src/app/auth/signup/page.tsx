import Link from "next/link";
import SignupForm from "@/components/auth/SignupForm";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#1F1F1F] overflow-hidden">
      <div className="bg-[#2D2D2D] p-10 rounded-2xl shadow-xl w-full max-w-md">
        <Image
          src="/big-logo.svg"
          alt="CORAL logo"
          width={500}
          height={60}
          className="mx-auto mb-8"
        />
        <SignupForm />
        <p className="mt-6 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-[#B8864B] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
