"use client"

import { LoginForm } from "@/components/auth/LoginForm"
import { AuthLayout } from "@/components/auth/AuthLayout"

export default function LoginPage() {
  return (
    <AuthLayout
      title="Giriş Yap"
      subtitle="Paragon hesabınıza erişin"
      backLink={{
        text: "Ana Sayfaya Dön",
        href: "/"
      }}
    >
      <LoginForm />
    </AuthLayout>
  )
}
