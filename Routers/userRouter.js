import express from "express"
import { deleteR, getalll, getid, post, put_user } from "../Controller/usercontroller.js"



export const userRouter = express.Router()


userRouter.get("/", getalll)

userRouter.get("/:id", getid)

userRouter.post("/", post)

userRouter.put("/:id", put_user)

userRouter.delete("/:id", deleteR)