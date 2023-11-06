import express from "express"
import { userRouter } from "./routers/userRouter.js"
import { postRouter } from "./routers/postRouterr.js"
const app = express()

app.use(express.json())

app.use("/api/userRouter",userRouter)

app.use("/api/postUser", postRouter)




app.listen(5000, () => {
    console.log("đang chạy port ở cổng: " + 5000)
})