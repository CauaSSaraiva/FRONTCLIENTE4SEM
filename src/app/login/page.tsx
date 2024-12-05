'use client'
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useClienteStore } from "@/context/cliente"

type Inputs = {
  email: string
  senha: string
  continuar: boolean
}

export default function Login() {

  const { register, handleSubmit } = useForm<Inputs>()
  const router = useRouter()
  const { logaCliente} = useClienteStore()

  async function verificaLogin(data: Inputs) {
    // console.log(data)
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes/login`,
      {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({email: data.email, senha: data.senha})
      }    
    )
    // console.log(response)
    if (response.status == 200) {
      const dados = await response.json()
      // alert("Ok")
      logaCliente(dados)

      if (data.continuar) {
        localStorage.setItem("client_key", dados.id)
      } else {
        if (localStorage.getItem("client_key")) {
          localStorage.removeItem("client_key")
        }
      }

      router.push("/")
    } else {
      alert("Erro... Login ou senha incorretos")
    }
  }


    return (
      <div className="w-screen h-[70vh]  flex items-center">
        <form
          className="max-w-sm mx-auto"
          onSubmit={handleSubmit(verificaLogin)}
        >
          <h2 className="text-3xl  mb-6">Login do cliente</h2>
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
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              className=" border  text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-300 text-white focus:ring-blue-500 focus:border-blue-500"
              required
              placeholder="Insira sua senha"
              {...register("senha")}
            />
          </div>
          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border bg-gray-700 border-gray-600 focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800"
                {...register("continuar")}
              />
            </div>
            <label
              htmlFor="remember"
              className="ms-2 text-sm font-medium text-gray-500"
            >
              Lembrar de mim
            </label>
          </div>
          <button
            type="submit"
            className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
          >
            Enviar
          </button>
          <div className="flex gap-20">

          <p className="drop-shadow mt-4 text-sm font-light text-gray-700 ">
            Esqueceu a senha?{" "}
            <a
              href="/esqueceu"
              className="font-medium text-primary-600 hover:underline text-blue-600"
            >
              Recuperar
            </a>
          </p>
          <p className="drop-shadow mt-4 text-sm font-light text-gray-700 ">
            Você não está cadastrado?{" "}
            <a
              href="/registro"
              className="font-medium text-primary-600 hover:underline text-blue-600"
            >
              Cadastre-se
            </a>
          </p>
          </div>
        </form>
      </div>
    );
}