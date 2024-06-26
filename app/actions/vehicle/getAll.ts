"use server";

import prisma from "@/prisma/db";
import authCheck from "../auth/authCheck";

export default async function getAllVehicles() {
  const user = await authCheck();
  const buses = await prisma.bus.findMany({
    where: {
      userId: user.userId,
    },
    select: {
      id: true,
      name: true,
      userId: true,
      documents: true,
    },
  });
  return {
    success: true,
    message: "Vehicles fetched",
    data: buses,
  };
}
