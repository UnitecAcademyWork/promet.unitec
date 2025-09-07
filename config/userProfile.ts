"use client"
import { UserProfile } from '@/components/types/types';
import { jwtDecode as jwt_decode } from 'jwt-decode';

export function UserProfileData(){
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const decodedToken: any = jwt_decode(token);

            const profileData: UserProfile = {
                id: decodedToken.id,
                name: decodedToken.nome || "Nome não encontrado",
                surname: decodedToken.apelido || "Nome não encontrado",
                email: decodedToken.email || "Email não encontrado",
                phone: decodedToken.contacto || "Contacto não encontrado",
                courseCount: decodedToken.curso ? decodedToken.curso.length : 0,
            };

            return profileData;

        } catch (error) {
            console.error("Erro ao decodificar o token:", error);
        }
    }
}