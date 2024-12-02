"use client";

import { useClienteStore } from "@/context/cliente";
import { FotoI } from "@/utils/types/fotos";
import { MedicoI } from "@/utils/types/medicos";
import { log } from "console";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Inputs = {
  descricao: string;
  dataSolicitada: Date;
};

export default function Detalhes() {
  const params = useParams();
  const { cliente } = useClienteStore();

  const [medico, setmedico] = useState<MedicoI>();
  const [fotos, setFotos] = useState<FotoI[]>([]);

  const { register, handleSubmit, reset } = useForm<Inputs>();

  useEffect(() => {
    async function getDados() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/medicos/${params.medico_id}`
      );
      const dados = await response.json();
      console.log(dados);
      setmedico(dados);
    }
    getDados();

    async function buscaFotos() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/fotos/${params.medico_id}`
      );
      const dados = await response.json();
      setFotos(dados);
    }
    buscaFotos();
  }, []);

  const listaFotos = fotos.map((foto) => (
    <div key={foto.id}>
      <img
        className="h-auto max-w-80 rounded-lg"
        src={`data:image/jpg;base64, ${foto.codigoFoto}`}
        alt={foto.descricao}
        title={foto.descricao}
      />
    </div>
  ));

  async function enviaProposta(data: Inputs) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/consultas`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          clienteId: cliente.id,
          medicoId: Number(params.medico_id),
          descricao: data.descricao,
          dataSolicitada: data.dataSolicitada,
        }),
      }
    );

    if (response.status == 201) {
      toast.success(
        "Obrigado. Sua req. de consulta foi enviada. Aguarde retorno"
      );
      reset();
    } else {
      toast.error("Erro... Não foi possível requisitar sua consulta");
    }
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="mb-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-gray-900 underline">
        Detalhes do médico
      </h1>

      <a
        href="#"
        className="flex flex-col py-10 px-4 items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-4xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        {listaFotos}
        {/* <img
          className="object-cover w-full rounded-t-lg h-96 md:h-96 md:w-96 md:rounded-none md:rounded-s-lg"
          src={medico?.foto}
          alt=""
        /> */}
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-4 text-4xl font-bold tracking-tight text-white">
            {medico?.nome}
          </h5>
          <p className="mb-3  text-xl font-normal text-gray-300">
            Especialidade: {medico?.especialidade.descricao}
          </p>
          <p className="mb-3  text-xl font-normal text-gray-300">
            Idade: {medico?.idade}
          </p>
          <p className="mb-3  text-xl font-normal text-gray-300">
            Email: {medico?.email}
          </p>
          <p className="mb-3  text-xl font-bold text-gray-200">
            Consulta Preço R$: {Number(medico?.preco).toLocaleString("pt-br")}
          </p>
          {cliente.id ? (
            <>
              <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Quer consultar? Requisite sua consulta!
              </h3>
              <form onSubmit={handleSubmit(enviaProposta)}>
                <input
                  type="text"
                  className="mb-2 mt-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={`${cliente.nome} (${cliente.email})`}
                  disabled
                  readOnly
                />
                <input
                  type="date"
                  className="mb-2 mt-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("dataSolicitada")}
                />
                <textarea
                  id="message"
                  className="mb-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Descreva a sua proposta"
                  required
                  {...register("descricao")}
                ></textarea>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Enviar Requisição
                </button>
              </form>
            </>
          ) : (
            <h3 className="text-xl font-bold tracking-tight text-orange-700 dark:text-white">
              ** Faça login para requisitar uma consulta com este médico
            </h3>
          )}
        </div>
      </a>
    </div>
  );
}
