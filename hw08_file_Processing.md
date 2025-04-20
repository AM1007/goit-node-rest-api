# Contacts Management REST API with File Processing

[back](./README.md)

An enhanced version of the contacts management REST API with new file processing capabilities, allowing users to upload and manage avatar images.

## New File Processing Features

The API now includes comprehensive file handling functionality:

- Avatar upload during user registration
- Avatar retrieval for authenticated users
- Avatar update for existing users
- Static file serving for user avatars
- Automatic avatar generation with Gravatar for new users

## Technology Additions

- **multer:** Middleware for handling `multipart/form-data` and file uploads
- **gravatar:** Generation of default avatar URLs based on email address
- **fs/promises:** File system operations for avatar management
- **path:** Path manipulation for file storage

## File Storage Structure

- **temp/:** Temporary directory for file uploads
- **public/avatars/:** Permanent storage for user avatars
- Unique filename generation with timestamps and random values

## File Processing API Routes

### PATCH /api/auth/avatars

Update user avatar.

- **Request:** Multipart form with 'avatar' field containing the image file
- **Headers:** Authorization: Bearer token
- **Response:** Updated avatar URL
- **Status:** 200 OK or 401 Unauthorized

## Avatar Handling Process

1. File is uploaded and temporarily stored with multer
2. File is validated (size limit, forbidden extensions)
3. File is renamed with a unique identifier
4. File is moved from temporary to permanent storage
5. Avatar URL is updated in the user's database record
6. Updated avatar URL is returned to the client

## File Validation

- **Size limit:** 5MB maximum file size
- **Extension filtering:** Executable files (.exe) are blocked
- **Error handling:** Appropriate error messages for invalid files

## Default Avatar Generation

- On user registration, a default avatar is generated using Gravatar service
- The avatar is based on the user's email address
- Options: 250px size, PG rating, Identicon style

## Static File Serving

- Public directory configured for serving static files
- Avatar files accessible via direct URL
- Path patterns: `/avatars/{filename}`

## Security Considerations

- Only authorized users can update their own avatars
- File uploads are validated to prevent security issues
- Filenames are randomized to prevent conflicts and predictability

## Technical Implementation

### Upload Middleware

```javascript
// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, callback) => {
    const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniquePrefix}_${file.originalname}`;
    callback(null, filename);
  },
});

// Size limits and file filtering
const limits = {
  fileSize: 1024 * 1024 * 5, // 5MB
};

const fileFilter = (req, file, callback) => {
  const extension = file.originalname.split(".").pop();
  if (extension === "exe") {
    return callback(HttpError(400, "exe is not allowed"));
  }
  callback(null, true);
};
```

### Avatar Update Process

```javascript
// Avatar update logic
const updateAvatarController = async (req, res) => {
  if (!req.file) {
    throw HttpError(400, "Avatar is required");
  }

  const { path: oldPath, filename } = req.file;
  const newPath = path.join(postersDir, filename);
  await fs.rename(oldPath, newPath);
  const avatarURL = path.join("avatars", filename);

  const { id } = req.user;
  const user = await authServices.updateUserAvatar(id, avatarURL);

  res.json({
    avatarURL: user.avatarURL,
  });
};
```

### Default Avatar Generation

```javascript
// Default avatar generation during registration
const avatarURL = gravatar.url(email, { s: "250", r: "pg", d: "identicon" });
```
