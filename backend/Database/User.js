import mongoose, { mongo } from "mongoose";

let Schema = mongoose.Schema({
    "email" : String,
    "password" : String
})

export const User = mongoose.model("Users",Schema)
