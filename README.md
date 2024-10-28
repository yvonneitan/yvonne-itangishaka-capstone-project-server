**_Paths:_**

- /api/users- GET the users and details
- /api/users/:id- GET the user and detail for user id 1, POST user
- /api/lists/task-lists?userId=:id - GET tasks lists for the for the active user id 1   in this case since there is only one user, PUT/edit ListName
- /api/lists/task-lists - POST a new list to the task lists
    /lists/task-lists/:id - DELETE a task list
- /api/tasks - POST a task
- /api/tasks?listName= lisName - GET Tasks in the specified ID
- /api/tasks/:id - PUT/ edit a task, DELETE a task/ UPDATE status of a task
- /api/tasks/completed - GET complted tasks
- /api/tasks/active - GET active tasks, no completed