
export type Experience = {
  id: string;
  cargo: string;
  empresa: string;
  periodo: string;
  descricao: string;
};

export type Education = {
  id: string;
  instituicao: string;
  curso: string;
  periodo: string;
  descricao?: string;
};

export type Skill = {
  id: string;
  name: string;
};

export type UserData = {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  localizacao?: string;
  overview?: string;
  experiencias?: Experience[];
  formacoes?: Education[];
  skills?: Skill[];
};

export type HabilidadesProps = {
  skills: Skill[];
  isEditing: boolean;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
};

export type ExperienciaProps = {
  experiencias: Experience[];
  addExperience: (exp: Experience) => void;
  removeExperience: (id: string) => void;
  isEditing: boolean;
};

export type FormacaoProps = {
  formacoes: Education[];
  addEducation: (edu: Education) => void;
  removeEducation: (id: string) => void;
  isEditing: boolean;
};
