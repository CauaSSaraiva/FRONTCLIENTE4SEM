'use client'
import Header from "@/components/Header";
import InputHeader from "@/components/InputHeader";
import ItemMedicos from "@/components/ItemMedicos";
import Medicos from "@/components/ItemMedicos";
import { MedicoI } from "@/utils/types/medicos";
import Image from "next/image";
import { Input } from "postcss";
import { useEffect, useState } from "react";
import { useClienteStore } from "@/context/cliente";

export default function Home() {
  
  const [medicos, setMedicos] = useState<MedicoI[]>([])
  const {logaCliente} = useClienteStore()

  useEffect(()=> {

    async function getCliente(idCliente: string) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes/${idCliente}`)
      if (response.status == 200) {
        const dados = await response.json()
        logaCliente(dados)
      }
    }

    if (localStorage.getItem("client_key")) {
      const clienteSalvo = localStorage.getItem("client_key") as string
      getCliente(clienteSalvo)
    }
    


    async function getDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/medicos/disponiveis`)
      const dados = await response.json()
      console.log(dados)
      setMedicos(dados)
    }

    getDados()
  }, [])

  const listaMedicos = medicos.map(medico => (
    <ItemMedicos data={medico} key={medico.id} />
  ));

  return (
    <>
    <InputHeader setMedicos={setMedicos}/>
    <div className="flex justify-around mt-8">
      {listaMedicos}
    </div>
    </>
  );
}
