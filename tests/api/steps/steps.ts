import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { APIResponse } from '@playwright/test';
import * as data from "../common/data";
import * as endpoints from "../common/endpoints";
import { fixture } from "../../utils/fixture";

// Variables to be used in the tests steps
let token: string;
let noteId: string;
let response: APIResponse;

// Scenarios steps

Given('User details context', async function () {
    await endpoints.createContext();
    fixture.logger.info('User details context created');
});

    When('Create a new user', async function () {
        response = await endpoints.createUser();
        fixture.logger.info('Called out endpoint to create new user: POST ' + process.env.BASE_URL_API);
    });

    Then('Success response and contain the user details', async function () {
        const responseBody = await response.json();
        assert.strictEqual(responseBody.data.name, data.USER_NAME);
        assert.strictEqual(responseBody.data.email, data.EMAIL);
        fixture.logger.info(`Success response and contain user "${data.USER_NAME}" and email "${data.EMAIL}"`);
    });

Given('User details', async function () {
  // Assume the user is already created
});

    When('Login request with existing user', async function () {
        response = await endpoints.loginUser();
        fixture.logger.info('Called out endpoint to login: POST ' + process.env.BASE_URL_API);
    });

    Then('Response message is "Login successful"', async function () {
        const responseBody = await response.json();
        assert.strictEqual(responseBody.message, "Login successful");
        assert.ok(responseBody.data.token);
        token = responseBody.data.token;
        fixture.logger.info(`Response message is "Login successful" for user "${data.EMAIL}"`);
    });

Given('Logged in with existing user', async function () {
  // Assume logged in and we have the token
});

    When('Request the profile information', async function () {
        response = await endpoints.getProfile(token);
        fixture.logger.info('Called out endpoint to get profile info: GET ' + process.env.BASE_URL_API);
    });

    Then('Success response and contain the correct email and name', async function () {
        const responseBody = await response.json();
        assert.strictEqual(responseBody.data.name, data.USER_NAME);
        assert.strictEqual(responseBody.data.email, data.EMAIL);
        fixture.logger.info(`Success response and contain the correct email "${data.USER_NAME}" and name "${data.EMAIL}"`);
    });

    When('Request profile information with invalid token', async function () {
        response = await endpoints.getProfile(data.INVALID_TOKEN);
        fixture.logger.info('Called out endpoint to get profile info with invalid token: GET ' + process.env.BASE_URL_API);
    });

    Then('Invalid token authorization', async function () {
        const responseBody = await response.json();
        assert.strictEqual(responseBody.message, 'Access token is not valid or has expired, you will need to login');
        fixture.logger.info(`Invalid token authorization with token ${data.INVALID_TOKEN}" retrieves correct error message: 'Access token is not valid or has expired, you will need to login'`);
    });

    When('Create a new note', async function () {
        response = await endpoints.createNote(token);
        const responseBody = await response.json();
        noteId = responseBody.data.id; // Guardar el noteId para su uso posterior
        fixture.logger.info('Called out endpoint to create a new note: POST ' + process.env.BASE_URL_API);
    });

    Then('Response message is "Note successfully created"', async function () {
        const responseBody = await response.json();
        assert.strictEqual(responseBody.message, 'Note successfully created');
        assert.strictEqual(responseBody.data.description, data.NOTE_DESCRIPTION);
        assert.strictEqual(responseBody.data.category, data.NOTE_CATEGORY);
        fixture.logger.info(`Response message is "Note successfully created" for note creation with description "${data.NOTE_DESCRIPTION}" and category "${data.NOTE_CATEGORY}"`);
    });

    When('Update an existing note', async function () {
        response = await endpoints.updateNote(noteId, token);
        fixture.logger.info('Called out endpoint to update an existing note: POST ' + process.env.BASE_URL_API);
    });

    Then('Response message is "Note successfully Updated"', async function () {
        const responseBody = await response.json();
        assert.strictEqual(responseBody.message, 'Note successfully Updated');
        assert.strictEqual(responseBody.data.description, data.NOTE_DESCRIPTION);
        assert.strictEqual(responseBody.data.category, data.NOTE_CATEGORY);
        fixture.logger.info(`Response message is "Note successfully Updated" for note updated with description "${data.NOTE_DESCRIPTION}" and category "${data.NOTE_CATEGORY}"`);
    });

    When('Get the note by id', async function () {
        response = await endpoints.getNoteById(noteId, token);
        fixture.logger.info('Called out endpoint to get note by id: GET ' + process.env.BASE_URL_API);
    });

    Then('Response message is "Note successfully retrieved"', async function () {
        const responseBody = await response.json();
        assert.strictEqual(responseBody.message, 'Note successfully retrieved');
        assert.strictEqual(responseBody.data.id, noteId);
        fixture.logger.info(`Response message is "Note successfully retrieved" for note details with noteID "${noteId}"`);
    });

    Then('Response status code is "201" Created', async function () {
        assert.strictEqual(response.status(), 201);
        fixture.logger.info('Response status code is "201" Created');
        });

    Then('Response status code is "200" successful', async function () {
        assert.strictEqual(response.status(), 200);
        fixture.logger.info('Response status code is "200" successful');
    });

    Then('Response status code is error "401" Unauthorized', async function () {
        assert.strictEqual(response.status(), 401);
        fixture.logger.info('Response status code is (error) "401" Unauthorized');
    });