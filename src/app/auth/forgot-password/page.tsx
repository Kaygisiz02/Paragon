"use client"

import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm"
import { AuthLayout } from "@/components/auth/AuthLayout"

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Şifremi Unuttum"
      subtitle="Hesabınıza yeniden erişim sağlayın"
      backLink={{
        text: "Giriş Yap",
        href: "/auth/login"
      }}
    >
      <ForgotPasswordForm />
    </AuthLayout>
  )
}
