# Todo-List
Backend API Specifications
Create the backend for the ToDo List Website. All of the functionality below needs to be implemented in this project.
Projects
List all projects in the database
Get single project
  Present all tasks belonging to the project
Create new project
  Authenticated users only
  Field validation via Mongoose
Update project
  Owner/Admin only
Delete project
  Owner/Admin only
 
Tasks
List all tasks
  Filtering tasks based on different params(i.e.priority)
List all tasks for a single project
Create new task
  Authenticated users only
 Update task
  Owner only
 Delete task
  Owner only
 
Comments
List all comments for a task
Create a single comment
Update specific comment
  Owner only
Delete comment
  Owner only
 
Authentication
  Use JWT/cookies for authentication
  JWT and cookies should expire in 30 days
User registration
  Once registered, a token will be sent along with the cookie
  Hash password
User login
  User can log in with email and password
  Once logged in, a token will be sent along with the cookie
User logout
Get current log in user
  Get logged in user information(i.e.name) via token
  
Documentation
Use postman to create documentation
Use docgen to create Html file from Postman

Deployment
Push to github

Code related suggestions
NPM scripts for both dev and prod env
Create database seeder to import and destory data
Set a config file for important constants
