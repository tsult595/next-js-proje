# Authentication Setup

## Environment Variables

Add these to your `.env.local` file:

```env
# MongoDB Connection (you already have this)
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/next?retryWrites=true&w=majority&appName=BookStore

# JWT Secret (generate a random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

## Features Added

✅ **Authentication Context**: Centralized auth state management
✅ **Login Page**: `/login` - User login with email/password
✅ **Register Page**: `/register` - User registration with validation
✅ **Header Component**: Shows login/register buttons when not authenticated, user name and logout when authenticated
✅ **API Routes**: 
   - `/api/auth/login` - Handles user login
   - `/api/auth/register` - Handles user registration
✅ **Password Security**: Passwords are hashed with bcryptjs
✅ **JWT Tokens**: Secure token-based authentication
✅ **MongoDB Integration**: User data stored in MongoDB

## How to Use

1. **Register**: Go to `/register` to create a new account
2. **Login**: Go to `/login` to sign in
3. **Header**: The header will show appropriate buttons based on auth state
4. **Logout**: Click the logout button to sign out

## Security Features

- Passwords are hashed with bcryptjs
- JWT tokens expire after 7 days
- Input validation on both frontend and backend
- Error handling for duplicate emails
- Secure token storage in localStorage

