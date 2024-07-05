import { APIRequestContext, request } from '@playwright/test';
import * as data from "./data";

const baseUrl = process.env.BASE_URL_API ?? data.NOTES_URL;

let apiContext: APIRequestContext;

export async function createContext() {
    apiContext = await request.newContext();
}

export async function createUser() {
    const response = await apiContext.post(`${baseUrl}/users/register`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      form: {
        name: data.USER_NAME,
        email: data.EMAIL,
        password: data.PWD
      },
    });
    return response;
}

export async function loginUser() {
    const response = await apiContext.post(`${baseUrl}/users/login`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      form: {
        email: data.EMAIL,
        password: data.PWD
      }
    });
    return response;
}

export async function getProfile(token: string) {
    const response = await apiContext.get(`${baseUrl}/users/profile`, {
      headers: {
        'x-auth-token': token
      }
    });
    return response;
}

export async function createNote(token: string) {
    const response = await apiContext.post(`${baseUrl}/notes`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-auth-token': token
      },
      form: {
        title: data.NOTE_TITLE,
        description: data.NOTE_DESCRIPTION,
        category: data.NOTE_CATEGORY
      }
    });
    return response;
}

export async function updateNote(noteId: string, token: string) {
    const response = await apiContext.put(`${baseUrl}/notes/${noteId}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-auth-token': token
      },
      form: {
        title: data.NOTE_TITLE,
        description: data.NOTE_DESCRIPTION,
        completed: false,
        category: data.NOTE_CATEGORY
      }
    });
    return response;
}

export async function getNoteById(noteId: string, token: string) {
    const response = await apiContext.get(`${baseUrl}/notes/${noteId}`, {
      headers: {
        'x-auth-token': token
      }
    });
    return response;
}