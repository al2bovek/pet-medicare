import sql from "../dbConnection.js";

const normalize = (v) => typeof v === "string" ? v.trim() : v;

const userColumns = sql`
  id,
  user_name,
  email,
  role,
  created_at
`;


export const findUserByEmail = async (email) => {
  const result = await sql`
    SELECT id, email, password, role, created_at
    FROM users
    WHERE email = ${normalize(email)}
    LIMIT 1
  `;
  return result[0] || null;
};


export const findUserById = async (id) => {
  const result = await sql`
    SELECT ${userColumns}
    FROM users
    WHERE id = ${id}
    LIMIT 1
  `;
  return result[0] || null;
};


export const createUser = async ({ user_name, email, password, role }) => {
  const result = await sql`
    INSERT INTO users (user_name, email, password, role)
    VALUES (
      ${normalize(user_name)},
      ${normalize(email)},
      ${password},
      ${role}
    )
    RETURNING ${userColumns}
  `;
  return result[0];
};


export const userExists = async (user_name) => {
  const result = await sql`
    SELECT 1
    FROM users
    WHERE user_name = ${normalize(user_name)}
    LIMIT 1
  `;
  return result.length > 0;
};


export const emailExists = async (email) => {
  const result = await sql`
    SELECT 1
    FROM users
    WHERE email = ${normalize(email)}
    LIMIT 1
  `;
  return result.length > 0;
};


export const getAllUsersQuery = async () => {
  return await sql`
    SELECT ${userColumns}
    FROM users
    ORDER BY id
  `;
};


export const saveRefreshToken = async (userId, refreshToken) => {
  const result = await sql`
    UPDATE users
    SET refresh_token = ${refreshToken}
    WHERE id = ${userId}
    RETURNING id, email, role, refresh_token
  `;
  return result[0] || null;
};


export const findUserByRefreshToken = async (refreshToken) => {
  const result = await sql`
    SELECT id, email, role, refresh_token
    FROM users
    WHERE refresh_token = ${refreshToken}
    LIMIT 1
  `;
  return result[0] || null;
};


export const removeRefreshToken = async (userId) => {
  const result = await sql`
    UPDATE users
    SET refresh_token = NULL
    WHERE id = ${userId}
    RETURNING id
  `;
  return result[0] || null;
};
