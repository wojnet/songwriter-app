import { cookies, headers } from "next/headers";
import { ProtocalType } from "@/types/protocal";
import { getProtocal } from "./getProtocal";

export const getSong = async (id: string | undefined): Promise<any> => {
  if (id?.length !== 24) return;

  const host = headers().get("host");
  const protocal: ProtocalType = getProtocal(process.env.NODE_ENV);
  const token = cookies().get("next-auth.session-token")?.value;

  const song = await fetch(`${protocal}://${host}/api/song?id=${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

  console.log("[CONSOLE] function getSong() returned:", song);

  return song;
};
