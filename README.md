# HomePlate – Backend

![Node.js](https://img.shields.io/badge/node.js-20.x-green)
![Express](https://img.shields.io/badge/express-4.18-lightgrey)
![MongoDB](https://img.shields.io/badge/database-MongoDB-47A248?logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/auth-JWT-blue)

**HomePlate Backend** is a RESTful API that powers the HomePlate application, enabling users to create, share, and interact with recipes through likes, comments, and follows.


## Description

This backend service provides authentication, authorization, and full CRUD functionality for recipes as part of a collaborative full-stack MERN application.
It supports social features such as likes, comments, and following other users, ensuring a dynamic and interactive experience.
The API is designed to be consumed by a React frontend and follows RESTful conventions with secure JWT-based authentication.


## Project Links

- **Frontend Repository:**  
  [View the HomePlate Frontend repository on GitHub](https://github.com/Gabyara237/homeplate-frontend/)

- **Backend Repository:**  
  [View the HomePlate Backend repository on GitHub](https://github.com/Gabyara237/homeplate-backend)

- **Project Planning (Trello):**  
  [Explore the project planning board on Trello](https://trello.com/b/yilTjBMH/project-3-homeplate)

- **Deployed Application:**  
  [Visit the live HomePlate application](https://new-homeplate.netlify.app/)



## Core Features

- User authentication and authorization using JWT
- Create, read, update, and delete recipes
- Comment system with ownership-based permissions
- Like and unlike recipes
- Follow and unfollow users
- Populate related data (authors, comment authors)
- Secure access to protected routes
- RESTful API design with Express and MongoDB


## Technologies Used

- **Node.js** – backend runtime
- **Express.js** – server and routing framework
- **MongoDB** – NoSQL database
- **Mongoose** – ODM for schema modeling and population
- **JWT (JSON Web Tokens)** – authentication & authorization
- **bcrypt** – password hashing
- **dotenv** – environment variable management


## Entity Relationship Diagram (ERD)

![HomePlate ERD](https://trello.com/1/cards/696fb6fdade648e552685163/attachments/697c30aaf42ed5a103966f0e/download/ERD.png)

*High-level ERD showing relationships between users, recipes, comments, and follow connections.*


### Current Implementation Notes

For simplicity and performance in this phase:

- **Comments** are embedded inside the `Recipe` document
- **Likes** are stored as an array of User ObjectIds
- **Followers** are managed through user relationships

This approach simplifies queries and reduces the need for multiple joins while maintaining clarity and correctness.


### Future Scalability Considerations

In a larger-scale production environment, the following refactors could be applied:

- Move comments into a dedicated `Comment` collection
- Move likes into a separate `Reaction` or `Like` collection
- Add pagination for recipes and comments
- Introduce indexing for popular queries (likes count, author, tags)
- Add moderation and reporting tools


## API Routes Overview

### Authentication
- `POST /auth/signup`
- `POST /auth/signin`

### Recipes
- `GET /recipes`
- `GET /recipes/:recipeId`
- `POST /recipes`
- `PUT /recipes/:recipeId`
- `DELETE /recipes/:recipeId`

### Comments
- `POST /recipes/:recipeId/comments`
- `PUT /recipes/:recipeId/comments/:commentId`
- `DELETE /recipes/:recipeId/comments/:commentId`

### Likes
- `POST /recipes/:recipeId/likes`
- `DELETE /recipes/:recipeId/likes`

### Follows
- `POST /users/:userId/follow`
- `DELETE /users/:userId/unfollow`

> All protected routes require a valid JWT token.


## Team

This project was collaboratively developed by:

- **Gabriela Araujo** – Full Stack Development  
  [GitHub Profile](https://github.com/Gabyara237)

- **Rebecca** – Full Stack Development  
  [GitHub Profile](https://github.com/Rebecca-10)

- **Tavi** – Frontend Development  
  [GitHub Profile](https://github.com/TaviJ)


## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/homeplate-backend.git
cd homeplate-backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables

Create a .env file in the root directory:

```bash
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
PORT=3000
```
> The `PORT` variable is optional and defaults to `3000` if not provided.


### 4. Start the server
```bash
npm run dev # uses nodemon for hot reload
```

or
```bash
node server.js
```

## Future Improvements

- Add search functionality for recipes and tags

- Implement pagination and sorting for feeds

- Add recipe bookmarking / saving

- Add user profile images

- Improve error handling and API response consistency

- Add automated tests for routes and services

## Attributions

- Backend structure inspired by MEN Stack Auth Template (General Assembly)

- Recipe images used during development sourced from public image providers (for testing purposes only)