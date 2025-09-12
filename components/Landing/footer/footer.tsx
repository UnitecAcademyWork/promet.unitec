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
    <footer id="contacto" className="w-full flex justify-center items-center bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-14">
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
                  href="/user/candidaturas" 
                  className="text-gray-400 hover:text-blue-300 transition-colors duration-300 flex items-center py-1"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Candidaturas
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
                  href="/cursos" 
                  className="text-gray-400 hover:text-blue-300 transition-colors duration-300 flex items-center py-1"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Formações
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Ecosistema</h3>
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
                  href="https://unitec.ac.mz/language" 
                  className="text-gray-400 hover:text-blue-300 transition-colors duration-300 flex items-center py-1"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Unitec Language
                </Link>
              </li>
              <li>
                <Link 
                  href="https://bpartner.unitec.ac.mz/" 
                  className="text-gray-400 hover:text-blue-300 transition-colors duration-300 flex items-center py-1"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Unitec BPartner
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
                <span>(+258) 870088787 | 834303184</span>
              </li>
              <li className="flex items-center transition-colors duration-300 hover:text-blue-300 text-gray-400">
                <span className="text-blue-400 mr-3"><Mail className="w-4 h-4" /></span>
                <span>promet@unitec.ac.mz</span>
              </li>
              <li className="flex items-center transition-colors duration-300 hover:text-green-400 text-gray-400">
                  <a 
                    href="https://wa.me/258834303184" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <span className="text-green-500 mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-5 h-5"
                      >
                        <path d="M12 .5C5.648.5.5 5.648.5 12c0 2.1.549 4.152 1.588 5.963L.542 23.5l5.722-1.497A11.46 11.46 0 0 0 12 23.5c6.352 0 11.5-5.148 11.5-11.5S18.352.5 12 .5Zm0 20.418c-1.883 0-3.721-.5-5.325-1.448l-.38-.225-3.397.889.905-3.307-.248-.394A9.462 9.462 0 0 1 2.542 12c0-5.206 4.252-9.458 9.458-9.458 5.205 0 9.458 4.252 9.458 9.458 0 5.205-4.253 9.458-9.458 9.458Zm5.184-7.065c-.283-.142-1.676-.828-1.936-.923-.26-.095-.449-.142-.638.142s-.732.923-.896 1.111c-.165.189-.331.213-.614.071-.283-.142-1.195-.44-2.275-1.402-.84-.749-1.407-1.672-1.572-1.955-.165-.283-.017-.437.124-.579.127-.127.283-.331.425-.496.142-.165.189-.283.283-.472.094-.189.047-.354-.024-.496-.071-.142-.638-1.538-.874-2.106-.23-.553-.465-.478-.638-.487l-.544-.01c-.189 0-.496.071-.756.354s-.99.968-.99 2.361 1.013 2.739 1.155 2.926c.142.189 1.994 3.042 4.83 4.263.676.292 1.202.467 1.612.598.678.216 1.295.185 1.783.112.544-.081 1.676-.685 1.912-1.348.236-.661.236-1.228.165-1.348-.071-.119-.26-.189-.543-.331Z" />
                      </svg>
                    </span>
                    <span>Whatsapp</span>
                  </a>
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