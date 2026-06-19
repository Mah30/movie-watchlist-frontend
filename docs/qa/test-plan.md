Test Plan - Movie Watchlist Frontend

## Objectiv

Validate the user experience of the Movie Watchlist Application through the browser, focusing on navigation, authentication flow, UI feedback, protected rotes and interection with the backend API. 

## Scope

The following areas are in scope:

- Home page
- Login page
- Signup page
- Navigation
- Profile page
- Browse / Watchlist page
- Error and success messages
- Basic responsiveness
- Integration with the backend API



## Out of Scope

The following areas are not covered in this initial test plan:

- Performance testing
- Load testing
- Cross-browser testing beyond Chrome
- Full accessibility audit
- Complete automated test coverage


## Test Types

- Manual functional testing
- Exploratory testing
- UI testing
- Regression testing
- End-to-end testing in the future


## Test Environment

- Frontend: hosted application
- Backend API: hosted backend service
- Browser: Chrome
- Test data: predefined test user and sample movies



## Main Risks

- The login page does not handle API errors correctly
- The token is not saved after login
- The user is not redirected after successful login
- Protected routes can be accessed without authentication
- The user cannot add or remove movies from the watchlist
- Users can access or modify another user's watchlist
- UI messages are unclear or missing
- Watchlist data is not displayed correctly