
import { Container } from "@/components/container";
import { CardCustomer } from "./components/card";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import prismaClient from '@/lib/prisma';
import Link from "next/link";

export default async function Customer() {

  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    redirect("/")
  }

  const customers = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id
    }
  })

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Meus clientes</h1>
          <Link href="/dashboard/customer/new" className="bg-blue-500 text-white px-4 py-1 rounded">
            Novo cliente
          </Link>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
          {customers.map(customer => (
            <CardCustomer 
              key={customer.id} 
              customer={customer}
            />
          ))}
        </section>

        {customers.length === 0 && (
          <div className="mt-2 text-gray-500">
            <h1>Você ainda não possui clientes cadastrados.</h1>
          </div>
        )}
      </main>
    </Container>
  )
}