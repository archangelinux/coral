import Link from "next/link";
import SigninForm from "@/components/auth/SigninForm";
import Image from "next/image";

export default function SignInPage() {
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
        <SigninForm />
      </div>
    </div>
  );
}
