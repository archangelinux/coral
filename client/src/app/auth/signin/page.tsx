import Link from 'next/link'
import SigninForm from '@/components/auth/SigninForm'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1F1F1F]">
      <div className="bg-[#2D2D2D] p-10 rounded-2xl shadow-xl w-full max-w-md">
        {/* LOGO “CORAL” */}
        <h1 className="text-center text-3xl font-semibold mb-8 text-[#FF6B61]">
          C
          <span className="inline-block transform translate-y-[-2px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18h6M10 22h4m-2-3v-2a4 4 0 10-4-4h4a4 4 0 100-8 4 4 0 00-4 4" />
            </svg>
          </span>
          RAL
        </h1>

        {/* Signin FORM */}
        <SigninForm />

        {/* LINK TO SIGN UP */}
        <p className="mt-6 text-center text-gray-400 text-sm">
          Don’t have an account?{' '}
          <Link href="/auth/signup" className="text-[#B8864B] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}