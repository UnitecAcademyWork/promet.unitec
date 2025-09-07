// "use client"
// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// // Definindo as cores da marca
// const COLORS = {
//   brand: {
//     main: '#4F46E5',   // Roxo azulado
//     lime: '#A3E635',   // Verde limão
//   }
// };

// // Componente principal da página de perfil
// export default function UserProfile() {
//   const [activeTab, setActiveTab] = useState('personal');
  
//   const tabs = [
//     { id: 'personal', label: 'Dados Pessoais' },
//     { id: 'overview', label: 'Visão Geral' },
//     { id: 'experience', label: 'Experiência' },
//     { id: 'education', label: 'Formação' },
//     { id: 'skills', label: 'Habilidades' },
//     { id: 'languages', label: 'Idiomas' },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-5xl mx-auto">
//         {/* Cabeçalho */}
//         <div className="text-center mb-12">
//           <motion.h1 
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="text-4xl font-bold text-gray-900 mb-4"
//           >
//             Meu Perfil
//           </motion.h1>
//           <p className="text-lg text-gray-600">Gerencie e edite suas informações profissionais</p>
//         </div>

//         {/* Navegação por abas */}
//         <div className="flex flex-wrap justify-center gap-2 mb-8">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`px-4 py-2 rounded-lg font-medium transition-all ${
//                 activeTab === tab.id
//                   ? 'bg-brand-main text-white shadow-lg'
//                   : 'text-gray-600 hover:text-brand-main hover:bg-gray-100'
//               }`}
//               style={{ '--brand-main': COLORS.brand.main }}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         {/* Conteúdo das abas */}
//         <div className="bg-white rounded-2xl shadow-xl p-6">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={activeTab}
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -20 }}
//               transition={{ duration: 0.3 }}
//             >
//               {activeTab === 'personal' && <PersonalData />}
//               {activeTab === 'overview' && <Overview />}
//               {activeTab === 'experience' && <Experience />}
//               {activeTab === 'education' && <Education />}
//               {activeTab === 'skills' && <Skills />}
//               {activeTab === 'languages' && <Languages />}
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Componente para Dados Pessoais
// function PersonalData() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [form, setForm] = useState({
//     name: 'João Silva',
//     title: 'Desenvolvedor Full Stack',
//     email: 'joao.silva@exemplo.com',
//     phone: '(11) 99999-9999',
//     location: 'São Paulo, Brasil',
//     linkedin: 'linkedin.com/in/joaosilva',
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsEditing(false);
//     // Aqui você faria a requisição para salvar os dados
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Dados Pessoais</h2>
//         <button
//           onClick={() => setIsEditing(!isEditing)}
//           className="px-4 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90"
//           style={{ backgroundColor: COLORS.brand.main }}
//         >
//           {isEditing ? 'Cancelar' : 'Editar'}
//         </button>
//       </div>

//       {isEditing ? (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
//               <input
//                 type="text"
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-main focus:border-transparent"
//                 style={{ '--brand-main': COLORS.brand.main }}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Cargo/Title</label>
//               <input
//                 type="text"
//                 value={form.title}
//                 onChange={(e) => setForm({ ...form, title: e.target.value })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-main focus:border-transparent"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
//               <input
//                 type="email"
//                 value={form.email}
//                 onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-main focus:border-transparent"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
//               <input
//                 type="tel"
//                 value={form.phone}
//                 onChange={(e) => setForm({ ...form, phone: e.target.value })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-main focus:border-transparent"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Localização</label>
//               <input
//                 type="text"
//                 value={form.location}
//                 onChange={(e) => setForm({ ...form, location: e.target.value })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-main focus:border-transparent"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
//               <input
//                 type="text"
//                 value={form.linkedin}
//                 onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-main focus:border-transparent"
//               />
//             </div>
//           </div>
//           <button
//             type="submit"
//             className="px-6 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90 mt-4"
//             style={{ backgroundColor: COLORS.brand.main }}
//           >
//             Salvar Alterações
//           </button>
//         </form>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="p-4 bg-gray-50 rounded-lg">
//             <p className="text-sm text-gray-500">Nome Completo</p>
//             <p className="font-medium">{form.name}</p>
//           </div>
//           <div className="p-4 bg-gray-50 rounded-lg">
//             <p className="text-sm text-gray-500">Cargo/Title</p>
//             <p className="font-medium">{form.title}</p>
//           </div>
//           <div className="p-4 bg-gray-50 rounded-lg">
//             <p className="text-sm text-gray-500">E-mail</p>
//             <p className="font-medium">{form.email}</p>
//           </div>
//           <div className="p-4 bg-gray-50 rounded-lg">
//             <p className="text-sm text-gray-500">Telefone</p>
//             <p className="font-medium">{form.phone}</p>
//           </div>
//           <div className="p-4 bg-gray-50 rounded-lg">
//             <p className="text-sm text-gray-500">Localização</p>
//             <p className="font-medium">{form.location}</p>
//           </div>
//           <div className="p-4 bg-gray-50 rounded-lg">
//             <p className="text-sm text-gray-500">LinkedIn</p>
//             <p className="font-medium">{form.linkedin}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // Componente para Visão Geral
// function Overview() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [overview, setOverview] = useState('Sou um desenvolvedor full stack com mais de 5 anos de experiência em criação de aplicações web escaláveis. Especializado em React, Node.js e tecnologias cloud. Apaixonado por resolver problemas complexos e criar experiências de usuário excepcionais.');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsEditing(false);
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Visão Geral</h2>
//         <button
//           onClick={() => setIsEditing(!isEditing)}
//           className="px-4 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90"
//           style={{ backgroundColor: COLORS.brand.main }}
//         >
//           {isEditing ? 'Cancelar' : 'Editar'}
//         </button>
//       </div>

//       {isEditing ? (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Resumo Profissional</label>
//             <textarea
//               value={overview}
//               onChange={(e) => setOverview(e.target.value)}
//               rows={5}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-main focus:border-transparent"
//             />
//           </div>
//           <button
//             type="submit"
//             className="px-6 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90"
//             style={{ backgroundColor: COLORS.brand.main }}
//           >
//             Salvar Alterações
//           </button>
//         </form>
//       ) : (
//         <div className="p-6 bg-gray-50 rounded-lg">
//           <p className="text-gray-700 leading-relaxed">{overview}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// // Componente para Experiência
// function Experience() {
//   const [experiences, setExperiences] = useState([
//     {
//       id: 1,
//       position: 'Desenvolvedor Full Stack',
//       company: 'Tech Solutions Inc.',
//       startDate: '2020-01-01',
//       endDate: '2023-05-31',
//       current: false,
//       description: 'Desenvolvimento de aplicações web com React e Node.js. Liderança de equipe de 5 desenvolvedores.'
//     },
//     {
//       id: 2,
//       position: 'Desenvolvedor Front-end',
//       company: 'Digital Agency',
//       startDate: '2018-03-15',
//       endDate: '2019-12-15',
//       current: false,
//       description: 'Criação de interfaces responsivas e otimização de performance.'
//     }
//   ]);

//   const [form, setForm] = useState({
//     position: '',
//     company: '',
//     startDate: '',
//     endDate: '',
//     current: false,
//     description: ''
//   });

//   const [isAdding, setIsAdding] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (form.position && form.company) {
//       const newExperience = {
//         id: Date.now(),
//         ...form
//       };
//       setExperiences([...experiences, newExperience]);
//       setForm({
//         position: '',
//         company: '',
//         startDate: '',
//         endDate: '',
//         current: false,
//         description: ''
//       });
//       setIsAdding(false);
//     }
//   };

//   const handleRemove = (id) => {
//     setExperiences(experiences.filter(exp => exp.id !== id));
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Experiência Profissional</h2>
//         <button
//           onClick={() => setIsAdding(!isAdding)}
//           className="px-4 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90"
//           style={{ backgroundColor: COLORS.brand.main }}
//         >
//           {isAdding ? 'Cancelar' : 'Adicionar Experiência'}
//         </button>
//       </div>

//       {isAdding && (
//         <motion.div 
//           initial={{ opacity: 0, height: 0 }}
//           animate={{ opacity: 1, height: 'auto' }}
//           exit={{ opacity: 0, height: 0 }}
//           className="mb-6 p-6 bg-gray-50 rounded-lg"
//         >
//           <h3 className="text-lg font-semibold mb-4">Nova Experiência</h3>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
//                 <input
//                   type="text"
//                   placeholder="Cargo"
//                   value={form.position}
//                   onChange={(e) => setForm({ ...form, position: e.target.value })}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-main focus:border-transparent"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
//                 <input
//                   type="text"
//                   placeholder="Empresa"
//                   value={form.company}
//                   onChange={(e) => setForm({ ...form, company: e.target.value })}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-main focus:border-transparent"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Data de Início</label>
//                 <input
//                   type="date"
//                   value={form.startDate}
//                   onChange={(e) => setForm({ ...form, startDate: e.target.value })}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-main focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Data de Término</label>
//                 <input
//                   type="date"
//                   value={form.endDate}
//                   onChange={(e) => setForm({ ...form, endDate: e.target.value })}
//                   disabled={form.current}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-main focus:border-transparent disabled:bg-gray-100"
//                 />
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 id="current-job"
//                 checked={form.current}
//                 onChange={(e) => setForm({ ...form, current: e.target.checked })}
//                 className="rounded focus:ring-brand-main"
//               />
//               <label htmlFor="current-job" className="text-sm text-gray-700">Emprego atual</label>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
//               <textarea
//                 placeholder="Descrição das atividades e conquistas"
//                 value={form.description}
//                 onChange={(e) => setForm({ ...form, description: e.target.value })}
//                 rows={3}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-main focus:border-transparent"
//               />
//             </div>
//             <button
//               type="submit"
//               className="px-6 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90"
//               style={{ backgroundColor: COLORS.brand.main }}
//             >
//               Adicionar Experiência
//             </button>
//           </form>
//         </motion.div>
//       )}

//       <div className="space-y-6">
//         {experiences.map((exp) => (
//           <motion.div 
//             key={exp.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="p-6 bg-gray-50 rounded-lg border-l-4"
//             style={{ borderLeftColor: COLORS.brand.main }}
//           >
//             <div className="flex justify-between items-start">
//               <div>
//                 <h3 className="text-xl font-semibold text-gray-800">{exp.position}</h3>
//                 <p className="text-lg text-gray-700">{exp.company}</p>
//                 <p className="text-sm text-gray-500 mt-1">
//                   {new Date(exp.startDate).toLocaleDateString('pt-BR')} - {exp.current ? 'Presente' : new Date(exp.endDate).toLocaleDateString('pt-BR')}
//                 </p>
//                 <p className="mt-3 text-gray-600">{exp.description}</p>
//               </div>
//               <button
//                 onClick={() => handleRemove(exp.id)}
//                 className="text-red-500 hover:text-red-700"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
//                 </svg>
//               </button>
//             </div>
//           </motion.div>
//         ))}

//         {experiences.length === 0 && (
//           <div className="text-center py-8 text-gray-500">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//             </svg>
//             <p className="mt-4">Nenhuma experiência adicionada ainda.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // Componente para Formação (similar ao de Experiência)
// function Education() {
//   const [educations, setEducations] = useState([
//     {
//       id: 1,
//       degree: 'Bacharelado em Ciência da Computação',
//       institution: 'Universidade Federal de São Paulo',
//       startDate: '2014-01-01',
//       endDate: '2018-12-15',
//       current: false,
//       description: 'Formação com ênfase em desenvolvimento de software e inteligência artificial.'
//     }
//   ]);

//   const [form, setForm] = useState({
//     degree: '',
//     institution: '',
//     startDate: '',
//     endDate: '',
//     current: false,
//     description: ''
//   });

//   const [isAdding, setIsAdding] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (form.degree && form.institution) {
//       const newEducation = {
//         id: Date.now(),
//         ...form
//       };
//       setEducations([...educations, newEducation]);
//       setForm({
//         degree: '',
//         institution: '',
//         startDate: '',
//         endDate: '',
//         current: false,
//         description: ''
//       });
//       setIsAdding(false);
//     }
//   };

//   const handleRemove = (id) => {
//     setEducations(educations.filter(edu => edu.id !== id));
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Formação Acadêmica</h2>
//         <button
//           onClick={() => setIsAdding(!isAdding)}
//           className="px-4 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90"
//           style={{ backgroundColor: COLORS.brand.main }}
//         >
//           {isAdding ? 'Cancelar' : 'Adicionar Formação'}
//         </button>
//       </div>

//       {isAdding && (
//         <motion.div 
//           initial={{ opacity: 0, height: 0 }}
//           animate={{ opacity: 1, height: 'auto' }}
//           exit={{ opacity: 0, height: 0 }}
//           className="mb-6 p-6 bg-gray-50 rounded-lg"
//         >
//           <h3 className="text-lg font-semibold mb-4">Nova Formação</h3>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Curso/Grau</label>
//                 <input
//                   type="text"
//                   placeholder="Ex: Bacharelado em Ciência da Computação"
//                   value={form.degree}
//                   onChange={(e) => setForm({ ...form, degree: e.target.value })}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-main focus:border-transparent"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Instituição</label>
//                 <input
//                   type="text"
//                   placeholder="Nome da instituição"
//                   value={form.institution}
//                   onChange={(e) => setForm({ ...form, institution: e.target.value })}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-main focus:border-transparent"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Data de Início</label>
//                 <input
//                   type="date"
//                   value={form.startDate}
//                   onChange={(e) => setForm({ ...form, startDate: e.target.value })}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-main focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Data de Término</label>
//                 <input
//                   type="date"
//                   value={form.endDate}
//                   onChange={(e) => setForm({ ...form, endDate: e.target.value })}
//                   disabled={form.current}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-main focus:border-transparent disabled:bg-gray-100"
//                 />
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 id="current-education"
//                 checked={form.current}
//                 onChange={(e) => setForm({ ...form, current: e.target.checked })}
//                 className="rounded focus:ring-brand-main"
//               />
//               <label htmlFor="current-education" className="text-sm text-gray-700">Cursando atualmente</label>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
//               <textarea
//                 placeholder="Detalhes relevantes do curso"
//                 value={form.description}
//                 onChange={(e) => setForm({ ...form, description: e.target.value })}
//                 rows={3}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-main focus:border-transparent"
//               />
//             </div>
//             <button
//               type="submit"
//               className="px-6 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90"
//               style={{ backgroundColor: COLORS.brand.main }}
//             >
//               Adicionar Formação
//             </button>
//           </form>
//         </motion.div>
//       )}

//       <div className="space-y-6">
//         {educations.map((edu) => (
//           <motion.div 
//             key={edu.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="p-6 bg-gray-50 rounded-lg border-l-4"
//             style={{ borderLeftColor: COLORS.brand.lime }}
//           >
//             <div className="flex justify-between items-start">
//               <div>
//                 <h3 className="text-xl font-semibold text-gray-800">{edu.degree}</h3>
//                 <p className="text-lg text-gray-700">{edu.institution}</p>
//                 <p className="text-sm text-gray-500 mt-1">
//                   {new Date(edu.startDate).toLocaleDateString('pt-BR')} - {edu.current ? 'Presente' : new Date(edu.endDate).toLocaleDateString('pt-BR')}
//                 </p>
//                 <p className="mt-3 text-gray-600">{edu.description}</p>
//               </div>
//               <button
//                 onClick={() => handleRemove(edu.id)}
//                 className="text-red-500 hover:text-red-700"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
//                 </svg>
//               </button>
//             </div>
//           </motion.div>
//         ))}

//         {educations.length === 0 && (
//           <div className="text-center py-8 text-gray-500">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path d="M12 14l9-5-9-5-9 5 9 5z" />
//               <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
//             </svg>
//             <p className="mt-4">Nenhuma formação acadêmica adicionada ainda.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // Componente para Habilidades
// function Skills() {
//   const [skills, setSkills] = useState([
//     { id: 1, name: 'React', level: 90 },
//     { id: 2, name: 'Node.js', level: 85 },
//     { id: 3, name: 'JavaScript', level: 95 },
//     { id: 4, name: 'TypeScript', level: 80 },
//   ]);

//   const [newSkill, setNewSkill] = useState({ name: '', level: 50 });
//   const [isAdding, setIsAdding] = useState(false);

//   const handleAddSkill = (e) => {
//     e.preventDefault();
//     if (newSkill.name) {
//       setSkills([...skills, { id: Date.now(), ...newSkill }]);
//       setNewSkill({ name: '', level: 50 });
//       setIsAdding(false);
//     }
//   };

//   const handleRemoveSkill = (id) => {
//     setSkills(skills.filter(skill => skill.id !== id));
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Habilidades</h2>
//         <button
//           onClick={() => setIsAdding(!isAdding)}
//           className="px-4 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90"
//           style={{ backgroundColor: COLORS.brand.main }}
//         >
//           {isAdding ? 'Cancelar' : 'Adicionar Habilidade'}
//         </button>
//       </div>

//       {isAdding && (
//         <motion.div 
//           initial={{ opacity: 0, height: 0 }}
//           animate={{ opacity: 1, height: 'auto' }}
//           exit={{ opacity: 0, height: 0 }}
//           className="mb-6 p-6 bg-gray-50 rounded-lg"
//         >
//           <h3 className="text-lg font-semibold mb-4">Nova Habilidade</h3>
//           <form onSubmit={handleAddSkill} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Habilidade</label>
//               <input
//                 type="text"
//                 placeholder="Ex: React, Python, UX Design"
//                 value={newSkill.name}
//                 onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-main focus:border-transparent"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Nível de Proficiência: {newSkill.level}%</label>
//               <input
//                 type="range"
//                 min="0"
//                 max="100"
//                 step="5"
//                 value={newSkill.level}
//                 onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
//                 className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                 style={{ accentColor: COLORS.brand.main }}
//               />
//               <div className="flex justify-between text-xs text-gray-500">
//                 <span>Iniciante</span>
//                 <span>Intermediário</span>
//                 <span>Avançado</span>
//                 <span>Especialista</span>
//               </div>
//             </div>
//             <button
//               type="submit"
//               className="px-6 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90"
//               style={{ backgroundColor: COLORS.brand.main }}
//             >
//               Adicionar Habilidade
//             </button>
//           </form>
//         </motion.div>
//       )}

//       <div className="space-y-4">
//         {skills.map((skill) => (
//           <motion.div 
//             key={skill.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="p-4 bg-gray-50 rounded-lg"
//           >
//             <div className="flex justify-between items-center mb-2">
//               <span className="font-medium text-gray-800">{skill.name}</span>
//               <button
//                 onClick={() => handleRemoveSkill(skill.id)}
//                 className="text-red-500 hover:text-red-700 text-sm"
//               >
//                 Remover
//               </button>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2.5">
//               <div 
//                 className="h-2.5 rounded-full" 
//                 style={{ 
//                   width: `${skill.level}%`,
//                   backgroundColor: COLORS.brand.main
//                 }}
//               ></div>
//             </div>
//             <div className="flex justify-between text-xs text-gray-500 mt-1">
//               <span>{skill.level}%</span>
//             </div>
//           </motion.div>
//         ))}

//         {skills.length === 0 && (
//           <div className="text-center py-8 text-gray-500">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//             </svg>
//             <p className="mt-4">Nenhuma habilidade adicionada ainda.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // Componente para Idiomas
// function Languages() {
//   const [languages, setLanguages] = useState([
//     { id: 1, name: 'Português', level: 'Nativo' },
//     { id: 2, name: 'Inglês', level: 'Avançado' },
//     { id: 3, name: 'Espanhol', level: 'Intermediário' },
//   ]);

//   const [newLanguage, setNewLanguage] = useState({ name: '', level: 'Básico' });
//   const [isAdding, setIsAdding] = useState(false);

//   const handleAddLanguage = (e) => {
//     e.preventDefault();
//     if (newLanguage.name) {
//       setLanguages([...languages, { id: Date.now(), ...newLanguage }]);
//       setNewLanguage({ name: '', level: 'Básico' });
//       setIsAdding(false);
//     }
//   };

//   const handleRemoveLanguage = (id) => {
//     setLanguages(languages.filter(lang => lang.id !== id));
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Idiomas</h2>
//         <button
//           onClick={() => setIsAdding(!isAdding)}
//           className="px-4 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90"
//           style={{ backgroundColor: COLORS.brand.main }}
//         >
//           {isAdding ? 'Cancelar' : 'Adicionar Idioma'}
//         </button>
//       </div>

//       {isAdding && (
//         <motion.div 
//           initial={{ opacity: 0, height: 0 }}
//           animate={{ opacity: 1, height: 'auto' }}
//           exit={{ opacity: 0, height: 0 }}
//           className="mb-6 p-6 bg-gray-50 rounded-lg"
//         >
//           <h3 className="text-lg font-semibold mb-4">Novo Idioma</h3>
//           <form onSubmit={handleAddLanguage} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Idioma</label>
//               <input
//                 type="text"
//                 placeholder="Ex: Inglês, Francês, Alemão"
//                 value={newLanguage.name}
//                 onChange={(e) => setNewLanguage({ ...newLanguage, name: e.target.value })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-main focus:border-transparent"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Nível de Proficiência</label>
//               <select
//                 value={newLanguage.level}
//                 onChange={(e) => setNewLanguage({ ...newLanguage, level: e.target.value })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-main focus:border-transparent"
//               >
//                 <option value="Básico">Básico</option>
//                 <option value="Intermediário">Intermediário</option>
//                 <option value="Avançado">Avançado</option>
//                 <option value="Fluente">Fluente</option>
//                 <option value="Nativo">Nativo</option>
//               </select>
//             </div>
//             <button
//               type="submit"
//               className="px-6 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90"
//               style={{ backgroundColor: COLORS.brand.main }}
//             >
//               Adicionar Idioma
//             </button>
//           </form>
//         </motion.div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {languages.map((lang) => (
//           <motion.div 
//             key={lang.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="p-6 bg-gray-50 rounded-lg border-l-4 flex justify-between items-center"
//             style={{ borderLeftColor: COLORS.brand.lime }}
//           >
//             <div>
//               <h3 className="text-lg font-semibold text-gray-800">{lang.name}</h3>
//               <p className="text-gray-600">{lang.level}</p>
//             </div>
//             <button
//               onClick={() => handleRemoveLanguage(lang.id)}
//               className="text-red-500 hover:text-red-700"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
//               </svg>
//             </button>
//           </motion.div>
//         ))}

//         {languages.length === 0 && (
//           <div className="text-center py-8 text-gray-500 col-span-2">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
//             </svg>
//             <p className="mt-4">Nenhum idioma adicionado ainda.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Tabs from "./Tabs";
import DadosPessoais from "./tabs/DadosPessoais";
import Experiencia, { Experience } from "./tabs/ExperienceTab";
import Formacao from "./tabs/Formacao";
import Idiomas from "./tabs/Idiomas";
import VisaoGeral from "./tabs/OverviewTab";
import Habilidades from "./tabs/SkillsTab";
import { UserData } from "../types/user-types";

const tabs = [
  "Dados Pessoais",
  "Visão Geral",
  "Experiência",
  "Formação",
  "Habilidades",
  "Idiomas",
];


export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
const [userData, setUserData] = useState<UserData>({
    id: "1",
    nome: "André Rodrigues",
    email: "andre.novela@promet.co.mz",
    overview: "Minha visão geral inicial...",
  });
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isEditing, setIsEditing] = useState(true);

  const addExperience = (exp: Experience) => {
    setExperiences((prev) => [...prev, exp]);
  };

  const removeExperience = (id: number) => {
    setExperiences((prev) => prev.filter((e) => e.id !== id));
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case "Dados Pessoais":
        return <DadosPessoais />;
      case "Visão Geral":
        return <VisaoGeral
        userData={userData}
        isEditing={true}
        setUserData={setUserData}
      />;
      case "Experiência":
        return  <Experiencia
        experiences={experiences}
        isEditing={isEditing}
        addExperience={addExperience}
        removeExperience={removeExperience}
      />;
      case "Formação":
        return <Formacao />;
      // case "Habilidades":
      //   return <Habilidades />;
      case "Idiomas":
        return <Idiomas />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-200 shadow-xl h-sreen">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-brand-main mb-6"
      >
        Perfil do Usuário
      </motion.h1>

      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-6"
      >
        {renderTabContent()}
      </motion.div>
    </div>
  );
}
