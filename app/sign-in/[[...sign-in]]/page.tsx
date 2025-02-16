import { LoginForm } from "@/components/login-form";


export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center lg:justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full lg:max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
