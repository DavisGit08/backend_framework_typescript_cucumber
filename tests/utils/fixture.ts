import { APIRequestContext, Page } from '@playwright/test';
import { Logger } from "winston";

export const fixture = {
    logger: undefined as unknown as Logger,
    api: undefined as unknown as APIRequestContext,
    page: undefined as unknown as Page,
}