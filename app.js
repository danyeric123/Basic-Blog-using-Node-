const express = require('express')
const mongoose = require('mongoose')

const blogRoutes = require('./routes/blogroutes')

// express app created here
const app = express()
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

const dbURI = 'mongodb+srv://nodetutorial:613jbs@cluster0.kzlqo.mongodb.net/Node-tutorial?retryWrites=true&w=majority'
mongoose.connect(dbURI)
        .then((result)=>app.listen(3000))
        .catch((err)=>console.log(err))

//set view engine
app.set('view engine', 'ejs')

/**
 * To set your views folder you would do the following:
 * app.set("views", [NAME OF DIRECTORY])
 */


app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res)=>{
  res.render('about',{title:"About"})
})

app.use("/blogs",blogRoutes)

app.get('/create', (req, res)=>{
  res.render('create',{title:"Create a New Blog"})
})

app.get('/about-us',(req,res)=>{
  res.redirect('/about')
})

app.use((req,res)=>{
  res.status(404).render('404',{title: "404"})
})