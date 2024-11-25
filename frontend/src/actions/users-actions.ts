"use server";

import { auth } from "@/lib/auth";
import { Client } from "pg";

export const getUsers = async () => {
  const session = await auth();
  if (!session) return null;
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
      FROM 
        tmusuarios AS u
      JOIN 
        tmcargos AS c 
          ON u.fkcod_car_user = c.cod_car
      WHERE
        u.fkcods_user != 0
      `);
    const users = res.rows;
    await client.end();
    return users;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const deleteUser = async (ced_emple: string) => {
  const session = await auth();
  if (!session) return null;
  try {
    const client = new Client();
    await client.connect();
    await client.query(
      `UPDATE tmusuarios SET fkcods_user = 0 WHERE ced_emple = $1`,
      [ced_emple]
    );
    await client.end();
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const createUser = async (data: {
  ced_user: string;
  nom_user: string;
  email_user: string;
  password_user: string;
  fkcod_car_user: number;
}) => {
  const session = await auth();
  if (!session) return null;
  const { ced_user, nom_user, email_user, password_user, fkcod_car_user } =
    data;

  try {
    const client = new Client();
    await client.connect();

    // Validar el correo y la cedula
    const res = await client.query(
      `SELECT * FROM tmusuarios WHERE ced_user = $1 OR email_user = $2`,
      [ced_user, email_user]
    );

    const userExists = res.rows[0];

    if (userExists) {
      if (userExists.ced_user === ced_user) {
        throw new Error("La cédula ya está registrada");
      }
      if (userExists.email_user === email_user) {
        throw new Error("El correo ya está registrado");
      }
    }

    // Insertar el usuario
    const insertUser = `
      INSERT INTO tmusuarios (ced_user, nom_user, email_user, password_user, fkcod_car_user)
      VALUES ($1, $2, $3, $4, $5);
    `;
    const insertUserValues = [
      ced_user,
      nom_user,
      email_user,
      password_user,
      fkcod_car_user,
    ];

    await client.query(insertUser, insertUserValues);

    await client.end();
  } catch (error: any) {
    console.log(error);
    throw new Error("Error al crear el usuario");
  }
};
