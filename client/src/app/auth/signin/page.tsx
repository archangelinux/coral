import Link from "next/link";
import SigninForm from "@/components/auth/SigninForm";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#1F1F1F] overflow-hidden ">
      <div className="bg-[#2D2D2D] p-8 rounded-2xl shadow-xl w-full max-w-md">
        <Image
          src="/big-logo.svg"
          alt="CORAL logo"
          width={500}
          height={60}
          className="mx-auto mb-8"
        />
        <SigninForm />
      </div>
    </div>
  );
}
