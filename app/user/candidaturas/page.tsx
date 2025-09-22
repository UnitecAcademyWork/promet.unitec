import { Metadata } from 'next'
import React from 'react'
import MainCandidatura from '../../../components/user/candidaturas/MainCandidatura'
// import Quiz from '../../../components/user/Quizz/teste'

export const metadata: Metadata =
{
  title: "Minhas Candidaturas"
}
export default function page() {
  return (
    <div>
      <MainCandidatura />
      {/* <Quiz /> */}
    </div>
  )
}
