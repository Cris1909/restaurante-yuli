"use server";

import { signIn, signOut } from "@/lib/auth";
import { Client } from "pg";

export const loginUser = async (data: any) => {
  try {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    return response;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const loginEmail = async (data: { password: string; email: string }) => {
  try {
    const client = new Client();
    await client.connect();
    const res = await client.query(`
      SELECT 
        u.ced_user,
        u.nom_user,
        u.email_user,
        u.fkcod_car_user,
        c.dcar
      FROM tmusuarios AS u
      JOIN tmcargos AS c 
        ON u.fkcod_car_user = c.cod_car
      WHERE 
        email_user = $1 AND 
        password_user = $2
      `,
      [data.email, data.password]
    );
    
    const user = res.rows[0];
    return user || null;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const logout = async () => {
  try {
    await signOut();
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      message: "No se pudo cerrar sesión",
    };
  }
};