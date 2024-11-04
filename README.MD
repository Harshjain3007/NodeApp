1. User Operations (CRUD with Advanced Conditions)

    Add User (POST /users):
        Add a new user with a unique email and phone number.
        Each user must have the following fields:
            email (must be unique, validated)
            name
            phone (must be unique, validated)
            status (can be active, inactive, or banned)
            createdAt and updatedAt timestamps.
        Email and phone number must pass validation and be unique.
Update User (PUT /users/:id):
        Update any user’s email, name, phone number, or status.
        Ensure email and phone remain unique and validated.
        Optimize by checking if the fields to be updated actually differ from the current values before making a DB call (avoid unnecessary writes).
    Delete User (DELETE /users/:id):
        Instead of hard-deleting, implement soft deletion by setting the user’s status to deleted.
    Get Users (GET /users and GET /users/:id):
        Retrie
Retrieve a list of users or details of a specific user.
        For listing users, add optional pagination, sorting, and filtering (e.g., by status or createdAt).
        Optimize the query by indexing on email and status to speed up search operations.
	
	API Response must have proper format with respective http status code