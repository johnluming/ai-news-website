# AI News Website

A full-stack application that displays AI-related news articles. Built with React, Express, and MongoDB.

## Features

- Real-time AI news updates from NewsAPI
- Responsive grid layout with Tailwind CSS
- MongoDB for data persistence
- China-accessible with proxy support
- Production-ready with PM2

## Prerequisites

1. Required Software:
   - Node.js: Download and install from https://nodejs.org/
   - MongoDB: Download and install from https://www.mongodb.com/try/download/community
   - Git (optional): Download from https://git-scm.com/
   - A proxy if you're in China (e.g., Clash)
     - Enable TUN mode in Clash settings
     - Make sure Clash is running before starting the application

2. NewsAPI Key:
   - Sign up at https://newsapi.org/
   - Copy your API key

## Step-by-Step Setup Guide (Windows)

1. Download and Install:
   ```bash
   # Clone or download the repository
   git clone https://github.com/YOUR_USERNAME/ai-news-website.git
   cd ai-news-website
   ```

2. Install Dependencies:
   ```bash
   # Install frontend dependencies (in root directory)
   npm install

   # Install backend dependencies
   cd backend
   npm install
   ```

3. Configure MongoDB:
   - Press `Windows + R`
   - Type `services.msc` and press Enter
   - Find "MongoDB"
   - Right-click and select "Start"

4. Set Up Environment:
   - Create a file named `.env` in the backend folder
   - Add these lines:
   ```plaintext
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/ai-news
   NEWS_API_KEY=your_api_key_here
   # If in China, add these:
   HTTP_PROXY=http://127.0.0.1:7890
   HTTPS_PROXY=http://127.0.0.1:7890
   ```

## Running the Application

### Development Mode:
1. Start backend:
   ```bash
   # In backend directory
   cd backend
   npm run dev   # Runs on port 3000
   ```

2. Start frontend:
   ```bash
   # In root directory
   cd ..
   npm run dev   # Runs on port 5173
   ```

### Production Mode:
1. Build frontend:
   ```bash
   # In root directory
   npm run build
   ```

2. Install PM2:
   ```bash
   npm install -g pm2
   ```

3. Start server:
   ```bash
   # In backend directory
   npm run build
   pm2 start dist/server.js --name "ai-news"
   ```

## Accessing the Website

1. Local Access:
   - Open browser
   - Go to http://localhost:5173

2. Access from Other Computers:
   - Find your IP:
     ```bash
     ipconfig
     ```
   - Look for "IPv4 Address" (e.g., 192.168.1.100)
   - Other computers can access: http://your-ip:5173

## Public Access with Ngrok

To make your website accessible from anywhere without port forwarding:

1. Install Ngrok:
   ```bash
   # Using npm
   npm install -g ngrok

   # Or download from https://ngrok.com/download
   ```

2. Sign up for free account:
   - Go to https://ngrok.com/signup
   - Copy your authtoken

3. Configure Ngrok:
   ```bash
   # Add your authtoken
   ngrok config add-authtoken your_auth_token_here
   ```

4. Start the application:
   ```bash
   # Terminal 1: Start MongoDB
   # Open services.msc and start MongoDB

   # Terminal 2: Start backend
   cd backend
   npm run dev

   # Terminal 3: Start frontend (optional for development)
   cd ..
   npm run dev
   ```

5. Start Ngrok tunnel:
   ```bash
   # Terminal 4: Start Ngrok (point to backend)
   # If in China, first set proxy:
   set HTTPS_PROXY=http://127.0.0.1:7890
   
   # Then start Ngrok
   ngrok http 3000
   ```

5. Access your website:
   - Ngrok will provide a URL like: https://abc123.ngrok.io
   - Share this URL to access your site from anywhere
   - The site will work from any network as all API calls go through Ngrok

Note: Free Ngrok limitations:
- URL changes each time you restart Ngrok
- 8-hour session limit
- Limited bandwidth

### Using Ngrok in China:
1. If using Clash:
   ```bash
   # Set proxy for Ngrok
   set HTTPS_PROXY=http://127.0.0.1:7890
   ngrok http 3000
   ```

2. Make sure:
   - Clash is running
   - TUN mode is enabled
   - Backend is running on port 3000
   - Proxy is set before starting Ngrok

### Troubleshooting Ngrok:
1. Connection issues:
   - Make sure backend is running (http://localhost:3000)
   - Check if you can access backend locally:
   ```bash
   curl http://localhost:3000/news
   ```
   - Verify proxy is working (if in China):
   ```bash
   curl -x http://127.0.0.1:7890 https://google.com
   ```

2. ERR_NGROK_8012 error:
   - Stop all terminals (Ctrl+C)
   - Start MongoDB
   - Start backend (npm run dev)
   - Verify backend is running
   - Then start Ngrok

## Common Issues & Solutions

1. "Port in use" error:
   ```bash
   # Stop all PM2 processes
   pm2 stop all
   pm2 delete all
   ```

2. MongoDB not connecting:
   - Check Services (services.msc)
   - Restart MongoDB service

3. News not loading in China:
   - Start your VPN/Proxy (e.g., Clash)
   - Enable TUN mode in Clash settings
   - Verify proxy port in .env (usually 7890)
   - Restart the server
   - Test connection:
     ```bash
     # Test if proxy is working
     curl -x http://127.0.0.1:7890 https://google.com
     ```

4. GitHub access in China:
   - Ensure Clash is running with TUN mode enabled
   - Configure git to use proxy:
     ```bash
     git config --global http.proxy http://127.0.0.1:7890
     git config --global https.proxy http://127.0.0.1:7890
     ```
   - Test GitHub connection:
     ```bash
     # Should return quickly if proxy is working
     ping github.com
     ```

## Managing the Server

1. View status:
   ```bash
   pm2 status
   ```

2. View logs:
   ```bash
   pm2 logs ai-news
   ```

3. Restart server:
   ```bash
   pm2 restart ai-news
   ```

4. Stop server:
   ```bash
   pm2 stop ai-news
   ```

5. Auto-start on boot:
   ```bash
   pm2 startup
   pm2 save
   ```

## Using the Website

1. View News:
   - Open browser to http://localhost:5173
   - News articles appear in a grid layout

2. Refresh News:
   - Click "Refresh News" button
   - Wait for new articles to load

3. Read Articles:
   - Click article title to open in new tab
   - Images expand on hover

## Maintenance

1. Regular Updates:
   - Click "Refresh News" for latest articles
   - News is stored in MongoDB

2. Monitoring:
   ```bash
   pm2 monit  # Resource usage
   pm2 logs ai-news  # Live logs
   ```

## Support

For issues and questions:
1. Check the logs: `pm2 logs ai-news`
2. Verify MongoDB is running
3. Check NewsAPI key is valid
4. Ensure proxy is running (if in China)

## License

MIT
