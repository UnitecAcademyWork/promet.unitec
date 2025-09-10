import type {Metadata} from "next"
import React from 'react'
import UserProfile from '../../../components/user/perfil/perfilUser'

export const metadata: Metadata =
{
  title: "Perfil"
}
export default function page() {
  return (
    <div className='h-screen'>
      <UserProfile />
    </div>
  )
}
