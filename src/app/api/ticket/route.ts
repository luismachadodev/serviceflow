import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prismaClient from "@/lib/prisma"

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await request.json()

  const findTicket = await prismaClient.ticket.findFirst({
    where: {
      id: id as string,
    },
  })

  if (!findTicket) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 400 })
  }

  try {
    await prismaClient.ticket.update({
      where: {
        id: id as string,
      },
      data: {
        status: "FECHADO",
      },
    })
    return NextResponse.json({ message: "Ticket updated" }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 400 })
  }
}

export async function POST(request: Request) {
  const { customerId, name, description } = await request.json()

  try {
    if (!customerId || !name || !description) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 })
    }

    await prismaClient.ticket.create({
      data: {
        name: name,
        description: description,
        status: "ABERTO",
        customerId: customerId,
      },
    })

    return NextResponse.json({ message: "Ticket created" }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed create new ticket" },
      { status: 400 }
    )
  }
}
