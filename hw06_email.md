# Contacts Management REST API: Email Verification Implementation

[back](./README.md)

## Overview

This update builds on our existing authentication system by adding email verification functionality. These enhancements provide a crucial layer of security, ensuring that user email addresses are validated before allowing full access to the system.

## New Email Verification Features

### User Registration Flow

- When a user registers, they no longer get immediate access to the system
- A verification token is generated using `nanoid` and stored with the user record
- An email containing a verification link is automatically sent to the user's provided email
- The system prevents login attempts from unverified accounts

### Email Verification Process

- Users can verify their email by clicking the link sent to their email
- The verification link follows the pattern: `/api/auth/verify/:verificationToken`
- Upon successful verification, the user's account is marked as verified, and the verification token is cleared
- Users can now log in and access the system

### Resend Verification Email

- Users can request a new verification email if they didn't receive the original
- The system validates that the requested email exists and is not already verified
- A new verification token is generated if necessary
- A fresh verification email is sent to the user

## Technical Implementation

### New API Endpoints

#### GET /api/auth/verify/:verificationToken

- **Purpose:** Verify a user's email using the verification token
- **Response on Success:** `{ "message": "Verification successful" }` with status `200`
- **Error Cases:**
  - Token not found: `404 Not Found`
  - Already verified: `400 Bad Request`

#### POST /api/auth/verify

- **Purpose:** Resend verification email to a user
- **Request Body:** `{ "email": "user@example.com" }`
- **Response on Success:** `{ "message": "Verification email sent" }` with status `200`
- **Error Cases:**
  - Missing email: `400 Bad Request` with message `"missing required field email"`
  - Email not found: `404 Not Found`
  - Already verified: `400 Bad Request` with message `"Verification has already been passed"`

### User Model Updates

- Added `verify` boolean field (default: `false`)
- Added `verificationToken` string field to store the unique token

### Email Configuration

- Implemented secure email sending using nodemailer
- Created email templates with verification links
- Set up proper error handling for email delivery issues

## Security Considerations

- Verification tokens are unique and randomly generated
- Users cannot access protected routes until verification is complete
- The system properly handles edge cases like:
  - Attempting to verify with an invalid token
  - Requesting verification for already verified accounts
  - Requesting verification for non-existent accounts

## Environment Configuration

Added new environment variables:

- `APP_DOMAIN`: The base URL for verification links
- `UKR_NET_EMAIL`: Email account for sending verification messages
- `UKR_NET_PASSWORD`: Password for the email account

## Testing the Email Verification System

1. Register a new user
2. Check that the system responds with a message about verification email being sent
3. Try to log in before verification (should be rejected)
4. Use the verification link or request a new one with the `/api/auth/verify` endpoint
5. After verification, log in successfully
