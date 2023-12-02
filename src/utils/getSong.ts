import { cookies, headers } from "next/headers";
import { ProtocalType } from "@/app/types/protocal";
import { getProtocal } from "./getProtocal";

export const getSong = async (id: string): Promise<any> => {
  if (id?.length !== 24) return;

  const host = headers().get("host");
  const protocal: ProtocalType = getProtocal(process.env.NODE_ENV);
  const token = cookies().get("next-auth.session-token")?.value;

  return await fetch(`${protocal}://${host}/api/song?id=${id}`, {
    method: "GET",
    cache: "no-store", // for now
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};
