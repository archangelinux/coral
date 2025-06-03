import Link from "next/link";
import SignupForm from "@/components/auth/SignupForm";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <div className="max-h-screen flex items-center justify-center px-3 py-4 sm:px-4 mt-[15vh] overflow-y-hidden">
      <div className="bg-[#3E3D3F] w-full max-w-sm px-10 py-14 rounded-2xl shadow-xl">
        <Image
          src="/big-logo.svg"
          alt="CORAL logo"
          width={240}
          height={30}
          className="mx-auto mb-6"
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
