'use client'
import InputHeader from "./InputHeader";
import Link from "next/link";
import { useClienteStore } from "@/context/cliente";
import { useRouter } from "next/navigation";

export default function Header() {
    const { cliente, deslogaCliente } = useClienteStore()
    const router = useRouter()

    function sairCliente() {
        deslogaCliente()
        if (localStorage.getItem("client_key")) {
        localStorage.removeItem("client_key")
        }
        router.push("/login")
    }

    return (
      <>
        <nav className=" border-gray-200 bg-gray-900">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
            <Link
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src="https://png.pngtree.com/png-clipart/20220303/original/pngtree-hospital-logo-pictures-png-image_7389253.png"
                className="h-8"
                alt="Flowbite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Consultas Médicas
              </span>
            </Link>
            <div className="flex items-center space-x-6 rtl:space-x-reverse max-w-max">
              {cliente.id ? (
                <>
                  <Link
                    href="/consultas"
                    className="font-bold text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Minhas Consultas
                  </Link>
                  <span className="text-gray-500 dark:text-white hover:underline">
                    Cliente: {cliente.nome}
                  </span>
                  <span
                    className="cursor-pointer font-bold text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={sairCliente}
                  >
                    Sair
                  </span>
                </>
              ) : (
                <>
                  <span className="text-gray-500 dark:text-white hover:underline">
                    (identifique-se)
                  </span>
                  <Link
                    href="/login"
                    className="font-bold text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Entrar
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </>
    );
}