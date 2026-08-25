# Test Cases - Login

## TC-LOGIN-001 - Login with valid credentials


### Priority: High


### Objective
Verify that a registered user can log in with valid credentials


### Preconditions

- The user has an existing account.
- The backend API is available.
- The login page is accessible.


## Test Data

- Email: user@test.com
- Password: ValidPassword123


### Steps

1. Open the login page.
2. Enter a valid email.
3. Enter a valid password.
4. Click the Sign In button.


### Expected Result

- The login request is sent to the backend API.
- The backend API returns a successful response.
- The authentication token is saved.
- The user is redirected to the protected area.
- No error message is displayed.


## TC-LOGIN-002 - Login with invalid password

### Priority: High


### Objective

Verify that the system rejects login when the user enters an invalid password.


### Preconditions

- The user has an existing account.
- The backend API is available.
- The login page is accessible.


### Test Data

- Email: user@test.com
- Password: WrongPassword123

### Steps

1. Open the login page.
2. Enter a valid email.
3. Enter an invalid password.
4. Click the Sign In button.


### Expected Result

- The backend API rejects the login request.
- An error message is displayed.
- The user remains on the login page.
- No authentication token is saved.



## TC-LOGIN-003 - Login with empty required fields

### Priority: High


### Objective

Verify that the system prevents login when required fields are empty.


### Preconditions

- The login page is accessible.

### Test Data

- Email: empty
- Password: empty

### Steps

1. Open the login page.
2. Leave the email field empty.
3. Leave the password field empty.
4. Click the Sign In button.

### Expected Result

- The login form is not submitted.
- Required field validation is displayed.
- The login request is not sent to the backend API.
- The user remains on the login page.
- No authentication token is saved.




## TC-003 - Add movie to watchlist

Priority: High

Preconditions:
- User is logged in.
- Movie exists in the movie catalog.
- User is on the movie details page.

Test data:
- Movie title: Inception

Test steps:
1. Open the movie details page for "Inception".
2. Click the "Add to Watchlist" button.
3. Navigate to the watchlist page.

Expected result:
- "Inception" should be displayed in the user's watchlist.
- The movie should not be duplicated if added again.