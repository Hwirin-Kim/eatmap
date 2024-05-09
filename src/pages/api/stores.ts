// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { StoreApiResponse, StoreType } from "@/interface";
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreApiResponse | StoreType[]>
) {
  const prisma = new PrismaClient();
  const { page } = req.query;

  if (page) {
    const pageNumber = typeof page === "string" ? parseInt(page, 10) || 1 : 1;
    const skipPage = pageNumber - 1;
    const count = await prisma.store.count();
    const stores = await prisma.store.findMany({
      orderBy: { id: "asc" },
      take: 10,
      skip: skipPage * 10,
    });
    res.status(200).json({
      page: pageNumber,
      data: stores,
      totalCount: count,
      totalPages: Math.ceil(count / 10),
    });
  } else {
    const stores = await prisma.store.findMany({
      orderBy: { id: "asc" },
    });

    res.status(200).json(stores);
  }
}
