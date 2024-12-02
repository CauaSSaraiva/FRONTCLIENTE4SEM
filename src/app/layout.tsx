import type { Metadata } from "next";

import "./globals.css";
import Header from "@/components/Header";


export const metadata: Metadata = {
  title: "Consulta médica",
  description: "Agendar consulta médica",
  keywords: ["consulta", "medico", "agendar", "agendar consulta"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Header/>
        {children}
        </body>
    </html>
  );
}
