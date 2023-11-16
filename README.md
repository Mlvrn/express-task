# Express + Sequelize (MySQL) Task Management

Express.js + Sequelize Project for Task Management App that features:

- CRUD operations for all models (User, Task , Tag).
- Creating task that have tags and priorities (high, medium, low).
- Set progress from todo, in progress, or done.

Libraries used:

- Express
- Sequelize (MySQL2)
- Joi

---

## Run the server

To run the server, use the following command:

```
npm run dev
```

Make sure to have MySQL running on port 3306

## URL

_Server_

```
http://localhost:3000
```

---

## Global Response

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

---

## RESTful Endpoints

- ### User Endpoints

---

### GET /api/users

> Get all users

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    <users_data>
}
```

---

### GET /api/users/:userId

> Get user by id

_Request Params_

```
<user_id>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    <user_data>
}
```

_Response (404)_

```
{
    message: 'User not found.',
}
```

---

### POST /api/users

> Create user

_Request Header_

```
not needed
```

_Request Body_

```
{
  "username": "<username>",
}
```

_Response (201)_

```
{
    "createdUser": {
       <user_data>
    },
    "message": "User <username> Created Successfully."
}
```

_Response (404)_

```
{
    message: 'User not found.',
}
```

_Response (400)_

```
{
    "message": "Username is already in use."
}
```

_Response (400)_ - Joi Validation Error

```
{
    "message": "Username is required"
}
{
    "message": "Username must be at least 3 characters long"
}
{
    "message": "Username cannot be more than 20 characters long"
}
{
    "message": "Username must only contain alphanumeric characters"
}
{
    "message": "\"username\" is not allowed to be empty"
}
```

---

### PUT /api/users/:userId

> Edit user by id

_Request Params_

```
<user_id>
```

_Request Header_

```
not needed
```

_Request Body_

```
{
  "username": "<username>",
}
```

_Response (200)_

```
{
    "editedUser": {
       <user_data>
    },
    "message": "User <username> Edited Successfully."
}
```

_Response (404)_

```
{
    message: 'User not found.',
}
```

_Response (400)_

```
{
    "message": "Username is already in use."
}
```

_Response (400)_ - Joi Validation Error

```
{
    "message": "Username is required"
}
{
    "message": "Username must be at least 3 characters long"
}
{
    "message": "Username cannot be more than 20 characters long"
}
{
    "message": "Username must only contain alphanumeric characters"
}
{
    "message": "\"username\" is not allowed to be empty"
}
```

---

### DELETE /api/users/:userId

> Delete user by id

_Request Params_

```
<user_id>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "deletedUser": {
        <user_data>
    },
    "message": "User <username> Deleted Successfully."
}
```

_Response (404)_

```
{
    message: 'User not found.',
}
```

---

- ### Task Endpoints

---

### GET /api/tasks/:taskId

> Get task by id

_Request Params_

```
<task_id>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    <task_data>,
    "tags": [
      <tags_data>
    ],
    "owner": {
      <user_data>
    }
}
```

_Response (400)_

```
{
    "message": "Task not found."
}
```

---

### GET /api/tasks/user/:userId

> Get tasks by user id

_Request Params_

```
<user_id>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
[
  {
      <task_data>,
      "tags": [
        <tags_data>
      ],
      "owner": {
        <user_data>
      }
  }
]

```

_Response (404)_

```
{
    message: 'Task not found.',
}
```

---

### POST /api/tasks/user/:userId

> Create task by userId

_Request Params_

```
<user_id>
```

_Request Header_

```
not needed
```

_Request Body_

```
{
  "title": "<title>",
  "tags": [<tag_id>],
  "description": "<description>",
  "priority": "<priority>",
}
```

_Response (201)_

```
{
    <task_data>,
    "tags": [<tag_data>]
    "owner": {<user_data>}
}
```

_Response (404)_

```
{
    message: 'User not found.',
}
```

_Response (400)_ - Joi Validation Error

```
{
    "message": "Title is required"
}
{
    "message": "Tags is required, add at least one tag"
}
{
    "message": "Title must be a string"
}
{
    "message": "Title must be at least 3 characters long"
}
{
    "message": "Title cannot be more than 255 characters long"
}
{
    "message": "Description must be a string"
}
{
    "message": "Description cannot be more than 1000 characters long"
}
{
    "message": "Priority must be one of high, medium, or low"
}
```

---

### PUT /api/tasks/user/:userId/:taskId

> Edit task by user id and task id

_Request Params_

```
<user_id>, <task_id>
```

_Request Header_

```
not needed
```

_Request Body_

```
{
  "title": "<title>",
  "tags": [<tag_id>],
  "description": "<description>",
  "priority": "<priority>",
}
```

_Response (200)_

```
{
    <task_data>,
    "tags": [<tag_data>]
    "owner": {<user_data>}
}
```

_Response (404)_

```
{
    message: 'Task not found.',
}
```

_Response (400)_ - Joi Validation Error

```
{
    "message": "Title is required"
}
{
    "message": "Tags is required, add at least one tag"
}
{
    "message": "Title must be a string"
}
{
    "message": "Title must be at least 3 characters long"
}
{
    "message": "Title cannot be more than 255 characters long"
}
{
    "message": "Description must be a string"
}
{
    "message": "Description cannot be more than 1000 characters long"
}
{
    "message": "Priority must be one of high, medium, or low"
}
```

---

### PUT /api/tasks/user/progress/:userId/:taskId

> Edit task progress by user id and task id

_Request Params_

```
<user_id>, <task_id>
```

_Request Header_

```
not needed
```

_Request Body_

```
{
    "progress": <progress>
}
```

_Response (200)_

```
{
    <task_data>,
    "tags": [<tag_data>]
    "owner": {<user_data>}
}
```

_Response (404)_

```
{
    message: 'Task not found.',
}
```

_Response (400)_ - Joi Validation Error

```
{
    "message": "Progress is required"
}
{
    "message": "Progress must be one of todo, in progress, or done"
}
```

---

### DELETE /api/tasks/user/:userId/:taskId

> Delete task by user id and task id

_Request Params_

```
<user_id>, <task_id>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "deletedTask": {
        <task_data>
    }
}
```

_Response (404)_

```
{
    message: 'Task not found.',
}
```

---

- ### Tag Endpoints

---

### GET /api/tags

> Get all tags

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
[
   <tags_data>
]
```

---

### GET /api/tags/:tagId

> Get tag by id

_Request Params_

```
<tag_id>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    <tag_data>
}
```

_Response (404)_

```
{
    message: 'Task not found.',
}
```

---

### POST /api/tags

> Create tag

_Request Header_

```
not needed
```

_Request Body_

```
{
  "name": "<name>",
}
```

_Response (201)_

```
{
    <tag_data>
}
```

_Response (404)_

```
{
    message: 'Tag not found.',
}
```

_Response (400)_ - Joi Validation Error

```
{
    "message": "Name is required"
}
```

---

### PUT /api/tags/:tagId

> Edit tag by id

_Request Params_

```
<tag_id>
```

_Request Header_

```
not needed
```

_Request Body_

```
{
  "name": "<name>",
}
```

_Response (200)_

```
{
    <tag_data>
}
```

_Response (404)_

```
{
    message: 'Tag not found.',
}
```

_Response (400)_ - Joi Validation Error

```
{
    "message": "Name is required"
}
```

---

### DELETE /api/tags/:tagId

> Delete tag by id

_Request Params_

```
<tag_id>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    <tag_data>
}
```

_Response (404)_

```
{
    message: 'Tag not found.',
}
```

---
