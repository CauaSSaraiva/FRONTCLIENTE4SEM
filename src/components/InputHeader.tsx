import { MedicoI } from "@/utils/types/medicos"
import { useForm } from "react-hook-form"

type Inputs = {
  termo: string 

}

type InputPesquisaPros = {
  setMedicos: React.Dispatch<React.SetStateAction<MedicoI[]>>
}

export default function InputHeader({setMedicos}: InputPesquisaPros) {

    const { register, handleSubmit, reset} = useForm<Inputs>()

    async function enviaPesquisa(data: Inputs) {
         if (data.termo.length < 2) {
            alert("Informe, no mínimo, 2 caracteres para a pesquisa")
            return
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/medicos/pesquisa/${data.termo}`)
        const dados = await response.json()
        if (dados.length == 0) {
            alert("Não há médicos com o termo informado... Realize nova pesquisa.")
            reset({termo: ""})
            return
        }
        setMedicos(dados)
    }

    async function getDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/medicos`)
      const dados = await response.json()
      reset({termo: ""})
      setMedicos(dados)
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center mt-5">
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-gray-900 underline">Consultas Online</h1>
            </div>
            <div className="flex max-w-5xl mx-auto mt-3">
                <form className="flex-1" onSubmit={handleSubmit(enviaPesquisa)}>
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium  sr-only text-white">Search</label>
                    <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm  border  rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" 
                        placeholder="Procure por um médico (especialidade, preco, nome...)" required {...register("termo")} />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Buscar</button>
                    </div>
                </form>

                <button type="button" 
                className="ms-3  focus:outline-none text-white bg-blue-950 hover:bg-blue-950 focus:ring-4 focus:ring-purple-300 font-medium rounded-2xl text-sm px-5 py-4 mb-2"
                onClick={getDados}>
                    Médicos Disponíveis
                </button>
            </div>



            <div className="flex flex-col items-center justify-center mt-5">
                
                <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Agende já a sua consulta médica de forma online!</p>
                <h3 className="text-3xl font-bold dark:text-gray-900">Veja alguns dos médicos disponíveis</h3>
            </div>



        </>
    )
}