# How to Start the Backend Server

## Quick Start

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies (if not already installed):**
   ```bash
   npm install
   ```

3. **Make sure your `.env` file has:**
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   ```

4. **Start the server:**
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

5. **You should see:**
   ```
   MongoDB connected
   Server running on port 5000
   ```

## Troubleshooting

- If MongoDB connection fails, check your MONGO_URI
- If port 5000 is already in use, change PORT in .env
- Check console for any error messages
