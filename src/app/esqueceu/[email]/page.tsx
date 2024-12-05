'use client'

import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation";

type Inputs = {
  email: string;
  codigoRecuperacao: string;
  novaSenha: string;
};

export default function Digitar() {

  const { register, handleSubmit } = useForm<Inputs>()
  const router = useRouter();
  const {email } = useParams();
  // const { email } = router.query;



  const decodedEmail =  decodeURIComponent(email as string)
  console.log(decodedEmail)
  async function AlterarSenha(data: Inputs) {
    // console.log(data)
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/clientes/alterar-senha`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          email: decodedEmail,
          codigoRecuperacao: data.codigoRecuperacao,
          novaSenha: data.novaSenha
        }),
      }
    );
    // console.log(response)
    if (response.status == 200) {
      const dados = await response.json()
      console.log(dados)
      alert("Senha alterada com sucesso")
      router.push("/login")
    } else {
      alert("Erro ao alterar a senha")
    }
  }


    return (
      <div className="w-screen h-[70vh]  flex items-center">
        <form
          className="max-w-sm mx-auto"
          onSubmit={handleSubmit(AlterarSenha)}
        >
          <h2 className="text-3xl  mb-6">Alteração de senha</h2>
          {/* <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white"
            >
              Seu Email
            </label>
            <input
              type="email"
              id="email"
              className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-300 text-white focus:ring-blue-500 focus:border-blue-500"
              required
              placeholder="Insira seu Email"
              {...register("email")}
            />
          </div> */}
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white"
            >
              Nova Senha
            </label>
            <input
              type="password"
              id="password"
              className=" border  text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-300 text-white focus:ring-blue-500 focus:border-blue-500"
              required
              placeholder="Insira sua nova senha"
              {...register("novaSenha")}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="codigo"
              className="block mb-2 text-sm font-medium text-white"
            >
              Código de recuperação
            </label>
            <input
              type="password"
              id="password"
              className=" border  text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-300 text-white focus:ring-blue-500 focus:border-blue-500"
              required
              placeholder="Insira seu código"
              {...register("codigoRecuperacao")}
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