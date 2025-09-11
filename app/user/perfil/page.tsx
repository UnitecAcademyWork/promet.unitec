import type {Metadata} from "next"
import React from 'react'
import UserProfile from '../../../components/user/perfil/perfilUser'
import CandidatoHeader from "../../../components/user/perfil/UserHeader"

export const metadata: Metadata =
{
  title: "Perfil"
}
export default function page() {
  return (
    <div>
      <CandidatoHeader />
      <UserProfile />
    </div>
  )
}
