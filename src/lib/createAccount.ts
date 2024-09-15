
import bcrypt from 'bcrypt';
import { sql } from "@vercel/postgres";

export const createAccount = async (taskID: string, password: string | null) => {

  let hashedPassword = null;
  if (password) {
    const saltRounds = 10;
    hashedPassword = await bcrypt.hash(password, saltRounds);
  }

  try {
    const response = await sql`
      INSERT INTO tasks 
      (task_id, password_hash)
      VALUES (${taskID}, ${hashedPassword})
      RETURNING *;
    `;

    delete response.rows[0].password_hash;

    return response.rows[0]
  } catch (error) {
    // @ts-expect-error error is an instance of NeonDbError
    if(error.code === '23505') { 
      throw new Error('Task ID already exists')
    }

    throw error
  }

}