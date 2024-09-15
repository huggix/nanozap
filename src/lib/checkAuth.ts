import { sql } from "@vercel/postgres";
import bcrypt from 'bcrypt';

export const checkAuth = async (taskID: string, password: string | null) => {

  const response = await sql`
    SELECT * FROM tasks
    WHERE task_id = ${taskID}
  `;

  if (response.rows.length > 0) {

    const {password_hash, ...data} = response.rows[0];

    if(!password_hash) {
      return data
    }

    if(!password) {
      throw new Error('Password is required')
    }
    
    const result = await bcrypt.compare(password, password_hash)

    if(result) {
      return data
    } else {
      throw new Error('Incorrect password')
    }

  } else {
    throw new Error('Task ID not found')
  }

}