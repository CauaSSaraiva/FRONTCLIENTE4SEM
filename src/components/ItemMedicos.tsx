import { MedicoI } from "@/utils/types/medicos";
import Link from "next/link";


export default function Medicos({data}: {data: MedicoI}) {
    return (
        <>
            <div className="max-w-sm  border rounded-lg shadow bg-gray-600 border-gray-500">
                <div className="flex justify-center">
                <a href="#">
                    <img className="rounded-t-lg w-72 h-64" src={data.foto} alt=""/>
                </a>
                </div>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{data.nome}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-300">
                        Especialidade: {data.especialidade.descricao}
                        </p>
                    <p className="mb-3 font-normal text-gray-300">
                        Preço R$: {Number(data.preco).toLocaleString("pt-br")}
                        </p>
                    <Link href={`/detalhes/${data.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Consultar
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </Link>
                </div>
            </div>

        </>
    )
}