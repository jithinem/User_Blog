To create a user-POST
http://localhost:3000/api/user
{
  "email": "zen@gmail.com",
  "password": "zen@blog#password",
  "username":"Zen"
}

Login of user-POST
http://localhost:3000/api/user/login
{
  "email": "zen@gmail.com",
  "password": "zen@blog#password"
}

To create a blog-POST
http://localhost:3000/api/blog
{
  "title": "Mastering Async/Await in JavaScript",
  "content": "This post explains how to effectively use async/await in JavaScript to handle asynchronous operations, with practical examples and common pitfalls to avoid."
}

GET,PUT, DELETE of blog
http://localhost:3000/api/blog/6763bfc0a7f0fc6badb0426f

GET all blogs of a user
http://localhost:3000/api/blog
