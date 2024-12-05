'use client'
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useClienteStore } from "@/context/cliente"

type Inputs = {
  email: string
  senha: string
  continuar: boolean
}

export default function Esqueceu() {

  const { register, handleSubmit } = useForm<Inputs>()
  const router = useRouter()
  const { logaCliente} = useClienteStore()

  async function EnviaCódigo(data: Inputs) {
    // console.log(data)
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/clientes/enviar-codigo`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email: data.email}),
      }
    );
    // console.log(response)
    if (response.status == 200) {
      const dados = await response.json()
      console.log(dados)
      router.push(`/esqueceu/${encodeURIComponent(data.email)}`);
    } else {
      alert("Erro... algo deu errado com esse email")
    }
  }


    return (
      <div className="w-screen h-[70vh]  flex items-center">
        <form
          className="max-w-sm mx-auto"
          onSubmit={handleSubmit(EnviaCódigo)}
        >
          <h2 className="text-3xl  mb-6">Digite seu Email</h2>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white"
            >
              Email de acesso
            </label>
            <input
              type="email"
              id="email"
              className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-300 text-white focus:ring-blue-500 focus:border-blue-500"
              required
              placeholder="Insira seu Email"
              {...register("email")}
            />
          </div>
          
          <button
            type="submit"
            className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
          >
            Enviar
          </button>

          
        </form>
      </div>
    );
}