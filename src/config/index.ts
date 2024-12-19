import dotenv from "dotenv";

// congigure dotenv
dotenv.config();

// export environment variables
export const {
  MONGODB_URI: mongodb_uri,
  PORT: port,
  DB_NAME: db_name,
} = process.env;