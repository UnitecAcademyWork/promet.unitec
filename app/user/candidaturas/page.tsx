import { Metadata } from 'next'
import React from 'react'
import MainCandidatura from '../../../components/user/candidaturas/MainCandidatura'

export const metadata: Metadata =
{
  title: "Minhas Candidaturas"
}
export default function page() {
  return (
    <div>
      <MainCandidatura />
    </div>
  )
}
