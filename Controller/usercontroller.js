
export let database = [{ id: 1, name: "An" }, { id: 2, name: "Quân" }]  

export const getalll =  (req, res) => {
    res.json({ database })}

export const getid =(req, res) => {
    let id = req.params.id
    if (!id) return res.json({ error: "id not found!" })
    if (isNaN(id)) return res.json({ error: "id is not number!" })
    let findId = database.findIndex((item) => item.id === +id)
    if (findId >= 0) {
        res.json(database[findId])
    } else res.json({ error: "cannot find" })

}

export const post = (req, res) => {
    let id = database.length + 1 + Math.random()
    let newName = req.body.name
    if (!newName) return res.json({ error: "name is not string!" })
    if (newName.length < 6) return res.json({ error: "name > 6" })
    if (!isNaN(newName)) return res.json({ error: "newName is not a Number" })
    database.push({ name: newName, id })
    res.json({ database })
}

export const deleteR = (req, res) => {
    let id = req.params.id
    if (!id) return res.json({ error: "cannot find the id" })
    if (isNaN(id)) return res.json({ error: "id is not a number!" })
    let xoa = database.findIndex((item) => item.id === +id)
    if (xoa >= 0) {
        database = database.filter((item, i) => i !== xoa) //tham số đầu: phần từ,tham số 3: vị trí, 3 là array 
        res.json({data: database})
    } else {
        res.json({error: "user not found"})
    }
}

export const put_user = (req, res) => {
    let id = req.params.id
    let namePut = req.body.name
    if (!id) return res.json({ error: "cannot find the id" })
    if (isNaN(id)) return res.json({ error: "id is not a number!" })
    let put = database.findIndex((item) => item.id === +id)
    if (put >= 0) {
        database[put].name = namePut
        res.json({ data: database[put] })
    } else res.json({ error: "user not found!" })

}