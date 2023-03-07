import { executeQuery } from "@/config/db";

export async function findOne(tableName, criteria) {
  const { column, value } = criteria;

  try {
    const query = `SELECT * FROM ${tableName} WHERE ${column} = ? LIMIT 1`;
    const [result] = await executeQuery({ query, values: [value] });

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
