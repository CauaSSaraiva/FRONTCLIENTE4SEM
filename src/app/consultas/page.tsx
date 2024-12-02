'use client'
import './page.css'
import { useEffect, useState } from "react";
import { useClienteStore } from "@/context/cliente";
import { ConsultaI } from "@/utils/types/consultas";

export default function Consultas() {
  const [consultas, setconsultas] = useState<ConsultaI[]>([])
  const { cliente } = useClienteStore()

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/consultas/${cliente.id}`)
      const dados = await response.json()
      setconsultas(dados)
    }
    buscaDados()
  }, [])

  // para retornar apenas a data do campo no banco de dados
  // 2024-10-10T22:46:27.227Z => 10/10/2024
  function dataDMA(data: string) {
    const ano = data.substring(0, 4)
    const mes = data.substring(5, 7)
    const dia = data.substring(8, 10)
    return dia + "/" + mes + "/" + ano
  }

  const consultasTable = consultas.map((consulta) => (
    <tr
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
      key={consulta.id}
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {consulta.medico.nome}
      </th>
      <td className="px-6 py-4">
        <img
          src={consulta.medico.foto}
          className="fotoCarro"
          alt="Foto Carro"
        />
      </td>
      <td className="px-6 py-4">
        <p>
          <b>{consulta.descricao}</b>
        </p>
        <p>
          <i>Enviado em: {dataDMA(consulta.createdAt)}</i>
        </p>
      </td>
      <td className="px-6 py-4">
        {consulta.resposta ? (
          <>
            <p>
              <b>{consulta.resposta}</b>
            </p>
            <p>
              <i>Respondido em: {dataDMA(consulta.updatedAt as string)}</i>
            </p>
          </>
        ) : (
          <i>Aguardando...</i>
        )}
      </td>
    </tr>
  ));

  return (
    <section className="max-w-7xl mx-auto">
      <h1 className="mb-6 mt-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl ">
        Listagem de <span className="underline underline-offset-3 decoration-8 text-gray-900">Minhas consultas</span></h1>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-50 uppercase bg-gray-700 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nome do Médico
            </th>
            <th scope="col" className="px-6 py-3">
              Foto
            </th>
            <th scope="col" className="px-6 py-3">
              Consulta
            </th>
            <th scope="col" className="px-6 py-3">
              Resposta
            </th>
          </tr>
        </thead>
        <tbody>
          {consultasTable}
        </tbody>
      </table>
    </section>
  )
}