@api
Feature: "API tests from expandtesting practice"

@createNewUser
Scenario: Create new user account
  Given User details context
  When Create a new user
  Then Success response and contain the user details
  And Response status code is "201" Created

@login
Scenario: Login as an existing user
  Given User details
  When Login request with existing user
  Then Response message is "Login successful"

@getProfile
Scenario: Get profile information correctly and validate
  Given Logged in with existing user
  When Request the profile information
  Then Success response and contain the correct email and name
  And Response status code is "200" successful

@getProfileInvalidToken
Scenario: Try Get profile information with invalid token and validate
  Given Logged in with existing user
  When Request profile information with invalid token
  Then Invalid token authorization
  And Response status code is error "401" Unauthorized

@createNewNote
Scenario: Create a new note and validate
  Given Logged in with existing user
  When Create a new note
  Then Response message is "Note successfully created"
  And Response status code is "200" successful

@updateNote
Scenario: Update an existing note and validate
  Given Logged in with existing user
  When Update an existing note
  Then Response message is "Note successfully Updated"
  And Response status code is "200" successful

@getNote
Scenario: Get the note by id and validate
  Given Logged in with existing user
  When Get the note by id
  Then Response message is "Note successfully retrieved"
  And Response status code is "200" successful