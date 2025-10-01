import React from 'react'
import RegisterForm from '../../components/Registro/formRegistro'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Registro | Promet",
  description:
    "Registre-se no PROMET e tenha acesso a formações para impulsionar a sua carreira.",
};

export default function page() {
  return (
    <div>
      <RegisterForm />
    </div>
  )
}
