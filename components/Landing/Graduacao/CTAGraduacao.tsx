export default function CTAGraduacao() {
    return (
        <div className="relative bg-brand-lime shadow-2xl overflow-hidden">
            {/* Formas geométricas */}
            <div className="hidden md:block absolute top-0 right-0 w-64 h-64 bg-brand-main transform rotate-12 translate-x-20 -translate-y-20 rounded-3xl"></div>
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-blue transform -rotate-12 translate-x-32 -translate-y-10 rounded-3xl"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-brand-main transform rotate-12 translate-x-32 translate-y-32 rounded-3xl"></div>

            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 p-12 items-center">

                {/* Esquerda */}
                <div className="space-y-6 z-10">
                    {/* Logo PROMET */}
                    <div className="flex items-center space-x-3">
                        <img
                            src="/images/prometlogo.png"
                            alt="PROMET Logo"
                            className="w-10 h-10 object-contain rounded-lg bg-white p-1 shadow-md"
                        />
                        <div>
                            <div className="font-bold text-brand-main text-sm">PROMET</div>
                            <div className="text-xs text-gray-600">Formação Profissional</div>
                        </div>
                    </div>

                    {/* Título */}
                    <h1 className="text-4xl md:text-5xl font-bold text-white">
                        Graduação
                    </h1>
                    <h2 className="text-4xl md:text-5xl font-bold">
                        <span className="text-brand-main">que Transforma Futuros</span>
                    </h2>

                    {/* Descrição */}
                    <p className="text-white text-sm leading-relaxed max-w-md">
                        A sua graduação é o primeiro passo para transformar sonhos em
                        conquistas reais.
                        Este é o momento de acreditar no seu potencial, investir no seu
                        conhecimento e construir uma carreira que será motivo de orgulho
                        para você e para quem acredita em você.
                    </p>

                    {/* CTA */}
                    <div className="flex flex-wrap items-center gap-4">
                        <a
                            href="/user/graduacao/pagamento"
                            className="bg-brand-main hover:bg-brand-blue text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
                        >
                            PAGAR GRADUAÇÃO
                        </a>
                    </div>
                </div>

                {/* Imagem */}
                <div className="relative z-10 flex justify-center items-center">
                    <div className="relative">
                        <div className="relative bg-white p-6 rounded-full shadow-xl hover:scale-105 transition-transform">
                            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white shadow-inner">
                                <img
                                    src="/images/graduacao.jpg"
                                    alt="Estudantes em Graduação"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
