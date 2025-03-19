import mongoose from "mongoose";
import colors from "colors";

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URL);
    const url = `${connection.host}:${connection.port}`;
    console.log(url);
    console.log(colors.cyan.bold("MongoDB Conectado"));
  } catch (error) {
    console.log(
      colors.bgRed.magenta.bold(`MongoDB No Conecto: ${error.message}
      `)
    );
    process.exit(1);
  }
};
