import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center w-full h-screen overflow-hidden bg-gradient-to-br from-brand-main-light/10 via-white to-brand-main-light/5 dark:from-gray-900 dark:via-gray-800 dark:to-brand-main/20">
      <div className="text-center px-6 max-w-3xl">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-brand-bgdark dark:text-white leading-tight">
          PROMET{" "}
          <span className="text-transparent bg-clip-text bg-brand-main">
            PROMET 
          </span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl leading-8 text-gray-600 dark:text-gray-300">
          PROMET
        </p>
        <div className="mt-10 flex justify-center">
          <Link
            href="/formulario"
            className="relative rounded-lg bg-brand-main px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl "
          >
            Quero Participar
          </Link>
        </div>

        <div className="mt-6 flex justify-center">
          <div className="h-1 w-32 rounded-full bg-brand-main"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
// import React from "react";
// import Image from "next/image";
// import Link from "next/link";

// const Hero = () => {
//   return (
//     <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden px-6">
//       <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        
//         <div className="flex flex-col space-y-6">
//           <h1 className="text-4xl md:text-6xl font-extrabold text-brand-main dark:text-white leading-tight">
//             Aprenda, Cresça e Conquiste! <span className="text-brand-lime"> PROMET</span>
//           </h1>
//           <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-lg">
//             Cursos e formações criadas para transformar o seu futuro. Comece hoje e faça parte de uma comunidade de jovens inovadores.
//           </p>
//           <div className="flex gap-4">
//             <Link
//               href="/formulario"
//               className="px-6 py-3 bg-brand-main text-white font-medium rounded-2xl shadow-md hover:bg-purple-700 transition"
//             >
//               Quero Participar
//             </Link>
//             {/* <Link
//               href="/contacto"
//               className="px-6 py-3 bg-gray-200 text-gray-900 font-medium rounded-2xl shadow hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition"
//             >
//               Fale Conosco
//             </Link> */}
//           </div>
//         </div>

//         <div className="flex justify-center">
//           <Image
//             src="/undraw_learning.svg" // 👉 coloque aqui um svg do undraw na pasta public
//             alt="Learning Illustration"
//             width={500}
//             height={400}
//             className="drop-shadow-xl"
//           />
//         </div>
//       </div>

//       {/* Background Elements */}
//       <svg
//         className="absolute top-0 left-0 w-64 h-64 text-purple-200 opacity-30"
//         viewBox="0 0 200 200"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           fill="currentColor"
//           d="M45.2,-58.4C59.5,-48.5,73.8,-36.8,77.7,-22.3C81.5,-7.7,75,10,64.1,23.9C53.2,37.7,37.8,47.8,22.1,55.9C6.4,64,-9.6,70.1,-24.2,65.4C-38.9,60.7,-52.1,45.1,-60.3,27.1C-68.5,9.1,-71.8,-11.4,-64.2,-27.6C-56.7,-43.8,-38.2,-55.8,-19.4,-64.4C-0.7,-73.1,18.5,-78.4,34.2,-71.8C50,-65.1,62.5,-46.3,45.2,-58.4Z"
//           transform="translate(100 100)"
//         />
//       </svg>
//     </section>
//   );
// };

// export default Hero;
