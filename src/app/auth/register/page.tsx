"use client"

import { RegisterForm } from "@/components/auth/RegisterForm"
import { AuthLayout } from "@/components/auth/AuthLayout"

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Kayıt Ol"
      subtitle="Finansal yolculuğunuza başlayın"
      backLink={{
        text: "Ana Sayfaya Dön",
        href: "/"
      }}
    >
      <RegisterForm />
    </AuthLayout>
  )
}
