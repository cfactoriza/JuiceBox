const express = require('express');
const tagsRouter = express.Router();
const { getAllTags,getPostsByTagName } = require('../db');

tagsRouter.use ((req, res, next) => {
    console.log('Hello from the Tags');

    next();
});

tagsRouter.get('/', async (req, res) => {
    const tags = await getAllTags();
  
    res.send({
      tags
    });
  });

  tagsRouter.get('/:tagName/posts', async (req, res, next) => {
      const tag = req.params.tagName
    try {
      const posts = await getPostsByTagName(tag)
      const filteredPosts = posts.filter(post => {
        return post.active || (req.user && post.author.id === req.user.id);
      });
  
      res.send(filteredPosts )
    } catch ({ name, message }) {
      // forward the name and message to the error handler
      next({ name, message });
    }
  });

  

module.exports = tagsRouter