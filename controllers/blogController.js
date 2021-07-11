const Blog = require('../models/blog')


const blogCreateGet = (req, res) => {
  res.render('create', { title: 'Create a new blog' });
}

const blogIndex = (req,res)=>{
  Blog.find()
      .then((result)=>{
        res.render('index', { blogs: result, title: 'All blogs' })
      })
      .catch((err)=>{
        console.log(err)
      })
}

const blogCreatePost = (req,res)=>{
  const blog = new Blog(req.body)

  blog.save()
      .then((result)=>{
        res.redirect('/')
      })
      .catch((err)=>{
        console.log(err)
      })
}

const blogDetails = (req,res)=>{
  const id = req.params.id
  Blog.findById(id)
      .then(result=>{
        res.render('details',{blog: result, title: "Blog Details"})
      })
      .catch(err=>{
        res.status(404).render('404',{title: "Blog not found"})
      })
}

const blogDelete = (req,res)=>{
  const id = req.params.id
  Blog.findByIdAndDelete(id)
      .then(result=>{
        res.json({redirect: '/blogs'})
      })
      .catch(err=>{
        console.log(err)
      })
}

module.exports = {
  blogIndex, 
  blogDetails, 
  blogCreateGet, 
  blogCreatePost, 
  blogDelete
}
