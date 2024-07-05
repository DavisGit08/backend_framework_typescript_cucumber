## Tests diagram

tests
│
├── api
│   ├── common
│       ├── data.ts      # Data to be used by the tests
│       └── endpoints.ts # Endpoints to be used
│
│   ├── features
│       └── api.feature  # Api scenarios
│
│   └── steps
│       └── steps.ts     # Logic to be used in the features
│
│

# Workflows

Workflows list:
· Create new user account
· Login as an existing user
· Get profile information correctly and validate
· Try Get profile information with invalid token and validate
· Create a new note and validate
· Update an existing note and validate
· Get the note by id and validate

# How to run
In order to run API tests, just execute the following command: npm run testAPI.

