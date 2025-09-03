"use client";

import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Facebook,
  Instagram,
  Youtube
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import UnitecFooterNew from "./../../../public/images/UnitecFooterNew.png"
import PrivacyPolicyModal from "./politicadeprovacidade";

export default function Footer() {
  return (
    <footer className="w-full flex justify-center items-center bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-14">
      <div className="mx-auto px-4 w-full max-w-7xl">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="mb-2">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Image src={UnitecFooterNew} alt="Unitec Logo" width={104} />
            </h3>
            <p className="text-gray-300 mb-6">Conectando o Presente ao Futuro.</p>
            <div className="flex space-x-4">
              <Link 
                href="https://facebook.com/unitecm" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 p-2 rounded-full bg-gray-800 hover:bg-gray-700"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link 
                href="https://instagram.com/unitecs_" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-colors duration-300 p-2 rounded-full bg-gray-800 hover:bg-gray-700"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://x.com/unitec_go"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-200 transition-colors duration-300 p-2 rounded-full bg-gray-800 hover:bg-gray-700"
                aria-label="X (Twitter)"
                title="X (Twitter)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>
              <Link 
                href="https://youtube.com/@unitec_go" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-400 transition-colors duration-300 p-2 rounded-full bg-gray-800 hover:bg-gray-700"
              >
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
            <div className="md:flex hidden flex-col mb-2 items-left mt-6">
              <p className="text-gray-500 text-sm mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} Unitec. Todos os direitos reservados.
              </p>
              <div className="flex space-x-6">
                <PrivacyPolicyModal />
              </div>
            </div>
          </div>
          
          {/* Quick links */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Links Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/formulario" 
                  className="text-gray-400 hover:text-blue-300 transition-colors duration-300 flex items-center py-1"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Formulário
                </Link>
              </li>
              <li>
                <Link 
                  href="/duvidas" 
                  className="text-gray-400 hover:text-blue-300 transition-colors duration-300 flex items-center py-1"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Dúvidas
                </Link>
              </li>
              <li>
                <Link 
                  href="/user/perfil" 
                  className="text-gray-400 hover:text-blue-300 transition-colors duration-300 flex items-center py-1"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Perfil
                </Link>
              </li>
              <li>
                <Link 
                  href="/promet/cursos" 
                  className="text-gray-400 hover:text-blue-300 transition-colors duration-300 flex items-center py-1"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Cursos
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Serviços</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="https://unitec.ac.mz/cursos" 
                  className="text-gray-400 hover:text-blue-300 transition-colors duration-300 flex items-center py-1"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Unitec Cursos
                </Link>
              </li>
              <li>
                <Link 
                  href="https://unibooks.unitec.ac.mz/" 
                  className="text-gray-400 hover:text-blue-300 transition-colors duration-300 flex items-center py-1"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Unitec Livros
                </Link>
              </li>
              <li>
                <Link 
                  href="https://unimentor.unitec.ac.mz/" 
                  className="text-gray-400 hover:text-blue-300 transition-colors duration-300 flex items-center py-1"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Unitec Mentoria
                </Link>
              </li>
              <li>
                <Link 
                  href="https://univents.unitec.ac.mz/" 
                  className="text-gray-400 hover:text-blue-300 transition-colors duration-300 flex items-center py-1"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Unitec Eventos
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact info */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Contactos</h3>
            <ul className="space-y-4">
              <li className="flex items-start transition-colors duration-300 hover:text-blue-300 text-gray-400">
                <span className="text-blue-400 mr-3 mt-1"><MapPin className="w-4 h-4" /></span>
                <span>Av. Salvador Allende Nº 60<br />Maputo, Moçambique</span>
              </li>
              <li className="flex items-center transition-colors duration-300 hover:text-blue-300 text-gray-400">
                <span className="text-blue-400 mr-3"><Phone className="w-4 h-4" /></span>
                <span>+258 870 088 787</span>
              </li>
              <li className="flex items-center transition-colors duration-300 hover:text-blue-300 text-gray-400">
                <span className="text-blue-400 mr-3"><Mail className="w-4 h-4" /></span>
                <span>suporte@unitec.co</span>
              </li>
              <li className="flex items-center transition-colors duration-300 hover:text-blue-300 text-gray-400">
                <span className="text-blue-400 mr-3"><Clock className="w-4 h-4" /></span>
                <span>Seg-Sex: 8:00 - 17:00</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="md:hidden flex flex-col items-center mt-8 pt-6 border-t border-gray-700">
          <p className="text-gray-500 text-sm mb-4">
            &copy; {new Date().getFullYear()} Unitec. Todos os direitos reservados.
          </p>
          <div className="flex">
            <PrivacyPolicyModal />
          </div>
        </div>
      </div>
    </footer>
  );
}