import { EspecialidadeI } from "./especialidades";

export interface MedicoI {
    id: number;
    nome: string;
    idade: number;
    preco: number;
    foto: string;
    email: string;
    disponivel: boolean;
    createdAt: Date;
    updatedAt: Date;
    especialidade: EspecialidadeI
    especialidadeId: number;
}
