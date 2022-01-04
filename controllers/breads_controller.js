const express = require('express')
const router = express.Router()
const breadsList = require('../models/breads')

// This route renders a list of breads
// 'index' is the name of the file in our views folder to render as this view
// {breadsList: breadsList} passes information that we can use in the 'index' view
//GET /breads -> view
router.get('/', (req, res) => {
    res.render('breads', {
        breadsList: breadsList
    })
})

//GET /breads/new -> view
router.get("/new", (req, res) => {
    res.render("breads/submitBread")
})

//GET /breads/:breadIndex -> view
router.get('/:breadIndex', (req, res) => {
    const breadIndex = req.params.breadIndex
    //if it exists
    const bread = breadsList[breadIndex]
    if(bread){
        res.render('breads/breadDetails', {
            bread: bread,
            index: breadIndex
        })
    }
    else {
        res.render('error404')
    }
})

router.get('/:breadIndex/edit', (req,res) => {
    const props = {
        bread: breadsList[req.params.breadIndex],
        index: req.params.breadIndex
    }
    res.render('breads/editBread', props)
})

//POST /breads <-
router.post("/", (req, res) => {
    console.log("POST /breads recieved")
    console.log(req.headers)
    console.log(req.body)
    //TODO: validate this is a valid bread
    //insert that bread from req.body into breads list
    console.log("before", breadsList.length)
    breadsList.push(req.body)
    console.log("after", breadsList.length)
    //either redirect to the index
    // or send the back the id
    res.redirect("/breads")

})

//UPDATE /breads/:index <- update a bread in the breadsList
router.put('/:breadIndex', (req, res) => {
    if (req.body.hasGluten === "on") {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    if (breadsList[req.params.breadIndex]) {
        breadsList[req.params.breadIndex] = req.body
        res.redirect(`/breads/${req.params.breadIndex}`)
    } else {
        res.send(404)
    }
})


//DELETE /breads/:index <- remove a bread from breadsList
router.delete('/:breadIndex', (req, res) => {

    let index = req.params.breadIndex
    //if it exists
    if (breadsList[index]) {
        //remove from that breadList
        let bread = breadsList[index]
        breadsList.splice(index, 1)

        res.send({"message": "deleted", "breadDeleted": bread})
    }
    else {
        res.render('error404')
    }

})

module.exports = router