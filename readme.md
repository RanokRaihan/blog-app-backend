# Blog App Backend

This is the backend for the Blog App. It provides APIs for managing blog posts, comments, and users.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install the dependencies, run:

```bash
npm install
```

## Usage

To start the server, run:

```bash
npm start
```

The server will start on `http://localhost:3000`.

## API Endpoints

### Posts

- `GET /posts` - Get all posts
- `POST /posts` - Create a new post
- `GET /posts/:id` - Get a post by ID
- `PUT /posts/:id` - Update a post by ID
- `DELETE /posts/:id` - Delete a post by ID

### Comments

- `GET /posts/:postId/comments` - Get all comments for a post
- `POST /posts/:postId/comments` - Create a new comment for a post
- `GET /comments/:id` - Get a comment by ID
- `PUT /comments/:id` - Update a comment by ID
- `DELETE /comments/:id` - Delete a comment by ID

### Users

- `GET /users` - Get all users
- `POST /users` - Create a new user
- `GET /users/:id` - Get a user by ID
- `PUT /users/:id` - Update a user by ID
- `DELETE /users/:id` - Delete a user by ID

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
