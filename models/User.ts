import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
  email: string;
  password: string;
  role: "user" | "admin";
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = models?.User || model<IUser>("User", userSchema);

export default User;


// import mongoose , {Schema , model , models} from "mongoose";
// import bcrypt from 'bcryptjs'
// // import { unique } from "next/dist/build/utils";

// export interface IUser{
//     email: string;
//     password: string;
//     role: "user" | "admin";
//     _id?: mongoose.Types.ObjectId;
//     createdAt?: Date;
//     updatedAt?: Date;

// }

// const userSchema = new Schema<IUser>({
//     email:{type: String , required: true , unique: true},
//     password:{type: String , required: true },
//     role:{type: String , enum: ["user" , "admin"] , default: "user"}

// } , {timestamps: true})

// userSchema.pre("save" , async function(next) { // its a hook that hash the password before saving it to db
//     if(this.isModified("password")){
//         this.password = await bcrypt.hash(this.password , 10);
//     }
//     next();  
// })

// const User = models?.User || model<IUser>("User" , userSchema) // as its next js .. so this file might be running first ime or might be running nth time

// export default User;
