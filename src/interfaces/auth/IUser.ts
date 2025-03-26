import { Document } from "mongoose";

interface IUser extends Document {
  handle: string;
  name: string;
  email: string;
  password: string;
  description: string;
  image: string;
}

export default IUser;
