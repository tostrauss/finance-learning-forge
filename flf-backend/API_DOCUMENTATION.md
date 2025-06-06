# Finance Learning Forge API Documentation

This document outlines the available endpoints for the FLF API.

## Authentication Endpoints

Base Path: `/api/auth`

### `POST /register`

Register a new user.

**Body**: `{ "email", "password", "firstName"?, "lastName"? }`
**Returns**: `{ "user": { "id", "email", "firstName", "lastName" }, "accessToken" }`. A `refreshToken` is sent in an httpOnly cookie.

### `POST /login`

Login an existing user.

**Body**: `{ "email", "password" }`
**Returns**: `{ "user": { "id", "email", "firstName", "lastName" }, "accessToken" }`. A `refreshToken` is sent in an httpOnly cookie.

### `POST /logout`

Logs the user out and invalidates their refresh token.

**Requires Cookie**: `refreshToken`
**Returns**: `204 No Content`

### `GET /me`

Get the currently authenticated user's profile.

**Requires Auth**: `Authorization: Bearer {accessToken}`
**Returns**: User object `{ "id", "email", "firstName", "lastName" }`

## Learning Endpoints

Base Path: `/api/learning`

### `GET /courses`

Get all available courses with a summary of their modules.

 **Returns**: Array of course objects.

### `GET /courses/:courseId`

Get the full details for a specific course, including all module content.

**Returns**: A single course object with modules.

### `GET /progress`

Get the authenticated user's learning progress and total completed credits.

**Requires Auth**: `Authorization: Bearer {accessToken}`
**Returns**: `{ "progress": [...], "completedCredits": number }`

### `POST /progress`

Update a user's learning progress for a specific module.

**Requires Auth**: `Authorization: Bearer {accessToken}`
**Body**: `{ "courseId", "moduleId", "score"? }`
**Returns**: The created or updated progress object.

## Health Check

### `GET /api/health`

Check the operational status of the API.

**Returns**: `{ "status": "OK", "timestamp" }`