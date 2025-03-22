import { Document } from "mongoose";

interface IUser extends Document {
  handle: string;
  name: string;
  email: string;
  password: string;
  description: string;
}

export default IUser;
