import Prisma from "@prisma/client"
import { randomUUID } from "crypto"

const prisma = new Prisma.PrismaClient()

prisma.category.createMany({
  data: [
    {
      name: "agro",
    },
    {
      name: "ciencia",
    },
    {
      name: "carnaval",
    },
    {
      name: "educacao",
    },
    {
      name: "economia",
    },
    {
      name: "empreendedorismo",
    },
    {
      name: "fato-ou-fake",
    },
    {
      name: "mundo",
    },
    {
      name: "especiais",
    },
    {
      name: "inovacao",
    },
    {
      name: "loterias",
    },
    {
      name: "meio-ambiente",
    },
    {
      name: "monitor-da-violencia",
    },
    {
      name: "olha-que-legal",
    },
    {
      name: "politica",
    },
    {
      name: "pop-arte",
    },
    {
      name: "saude",
    },
    {
      name: "tecnologia",
    },
    {
      name: "trabalho-e-carreira",
    },
    {
      name: "turismo-e-viagem",
    },
    {
      name: "autoesporte",
    },
  ]
}).then(() => console.log("Insertion commands executed successfully!!"));