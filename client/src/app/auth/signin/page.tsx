import Link from "next/link";
import SigninForm from "@/components/auth/SigninForm";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1F1F1F] px-4">
      <div className="bg-[#3E3D3F] w-full max-w-md px-6 sm:px-10 py-10 sm:py-20 rounded-2xl shadow-xl">
        <Image
          src="/big-logo.svg"
          alt="CORAL logo"
          width={300}
          height={30}
          className="mx-auto mb-6"
        />
        <SigninForm />
      </div>
    </div>
  );
}
