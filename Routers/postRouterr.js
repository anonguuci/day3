import express, { json } from "express"
import { database } from "../Controller/usercontroller.js"
export const postRouter = express.Router()
let dataPost = [{ content: "hehehe", title: "lol", id: 1, idUser: 2 }, { content: "kkkkkkkkk", title: "lalsl", id: 2, idUser: 5 }, { content: "mdawdnawda", title: "dmadniwdadad", id: 3, idUser: 2 }]



postRouter.get("/", (req, res) => {
    res.json({ data: dataPost })
})

postRouter.get("/:id", (req, res) => {
    let id = req.params.id
    if (!id) return res.json({ error: "cannot the id!" })
    if (isNaN(id)) return res.json({ error: "the id is not the number!" })
    let findID = dataPost.findIndex((item) => item.id === +id)
    if (findID >= 0) {
        res.json({ dataPost: dataPost[findID] })
    } else return res.json(({ error: "not found!" }))
})

postRouter.get("/allpostUser/:idUser", (req, res) => {
    let finIDUser = dataPost.filter((item) => item.idUser === +req.params.idUser)
    if (finIDUser.length >= 0) {
        res.json({ data: finIDUser })
    } else return res.json({ error: "cannot find!" })
})
postRouter.post("/:idUser", (req, res) => {
    let idUser = req.params.idUser
    if (!idUser) return res.json({ error: "cannot empty!" })
    if (isNaN(idUser)) return res.json({ error: "cannot not the number!" })
    idUser = +idUser
    let findIDinDTB = database.find((user) => user.id === idUser)
    if (findIDinDTB) {
        if (!req.body.content && !req.body.title) return res.json({ error: "data not found!" })
        else {
             console.log("đã vào")
            dataPost.push({ content: req.body.content, title: req.body.title, id: Math.random(), idUser: idUser })
            console.log(dataPost)
            res.json({ complete: true })
        }
    } else {
        res.json({ error: "User not found!" })
    }
})
postRouter.put("/:idUser/:id", (req, res) => {
    let idUser = +req.params.idUser;
    let idPost = +req.params.id;
  
    if (isNaN(idUser) || isNaN(idPost))
      return res.status(404).json({ error: "user notfound! ||  post Notfound!" });
    if (
      database.find((user) => user.id === idUser) &&
      dataPost.find((post) => post.id === idPost)
    ) {
      dataPost = dataPost.map((post) => {
        if (post.idUser === idUser && post.id === idPost) {
          if (!req.body.content && !req.body.image) {
            res.status(404).json({ error: "data notfound!" });
          } else {
            post.content = req.body.content;
            post.image = req.body.image;
            return post;
          }
        } else {
          return post;
        }
      });
      res.json({ compete: true });
    } else {
      res.status(404).json({ error: "user notfound! ||  post Notfound!" });
    }
  });

  postRouter.delete("/:idUser",(req,res) => {
    let idUser = req.params.idUser
    if(!idUser) return res.json({err: "empty id"})
    if(isNaN(idUser)) return res.json({err: "thats not number"})
    let find = dataPost.find((item) => item.idUser === +idUser)
    if(find) {
        dataPost.filter((post) => post.idUser !== idUser)
        res.json({compete: true})
    } else {
        res.json({ error: "user notfound!"})
    }
  })

  postRouter.post("/cmt/:idUser",(req,res) => {
    let idUser = req.params.idUser
    if(!idUser) return res.json({err:  "empty id"})
    if(isNaN(idUser)) res.json({err: "cannot the number!"})
    let find = dataPost.find((id) => id.idUser === +idUser)
    if(find) {
      dataPost.push({cmt: req.body.cmt})
      res.json({compete: true})
    } 
  })

  export default postRouter