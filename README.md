# Cron Jobs Server

A lightweight Express.js server designed to make parallel HTTP requests to multiple endpoints. This server is perfect for pinging multiple services simultaneously, monitoring service health, or triggering cron jobs across various services.

## 🌐 Live Demo

**Live Server:** [https://cron-jobs-nd9t.onrender.com/](https://cron-jobs-nd9t.onrender.com/)

The server is actively running and pings multiple services in parallel. Visit the link to see real-time results from all configured endpoints.

## Features

- 🔄 **Parallel Request Execution**: Makes concurrent HTTP requests to multiple URLs
- 🛡️ **Error Handling**: Gracefully handles failures for individual requests without stopping the entire batch
- 📊 **Detailed Response**: Returns comprehensive results for each request, including success/error status
- ⚡ **Fast & Efficient**: Uses Promise.all for parallel execution
- 🌐 **CORS Enabled**: Configured with CORS support for cross-origin requests

## Tech Stack

- **Express.js** - Web server framework
- **TypeScript** - Type-safe JavaScript
- **Axios** - HTTP client for making requests
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing

## Setup

### Prerequisites

- Node.js (v18 or higher recommended)
- pnpm (or npm/yarn)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cron-jobs-server
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
URL=https://example.com,https://another-service.com,https://third-service.com
```

### Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `PORT` | Server port number | Yes | `3000` |
| `URL` | Comma-separated list of URLs to ping | Yes | `https://service1.com,https://service2.com` |

## Running the Server

### Development

Compile TypeScript and run:
```bash
pnpm start
```

Or run the build and start separately:
```bash
tsc -b
node dist/index.js
```

The server will start on the port specified in your `.env` file (default: 3000).

## API Endpoints

### GET `/`

Pings all URLs configured in the `URL` environment variable and returns their responses.

**Response Format:**
```json
{
  "message": "All requests completed",
  "results": [
    {
      "url": "https://example.com",
      "status": "success",
      "data": { /* response data */ }
    },
    {
      "url": "https://another-service.com",
      "status": "error",
      "data": "Request failed with status code 429"
    }
  ]
}
```

**Example Response:**
```json
{
  "message": "All requests completed",
  "results": [
    {
      "url": "https://drawsheet-and-connect-app-http-server.onrender.com/",
      "status": "success",
      "data": {
        "status": "ok",
        "timestamp": "2025-11-24T07:27:07.389Z",
        "service": "http-server"
      }
    },
    {
      "url": "https://drawsheet-and-connect-app-worker.onrender.com",
      "status": "error",
      "data": "Request failed with status code 429"
    }
  ]
}
```

## Deployment

### Render

This server is deployed on Render at: [https://cron-jobs-nd9t.onrender.com/](https://cron-jobs-nd9t.onrender.com/)

To deploy on Render:

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set the following environment variables in Render's dashboard:
   - `PORT`: The port Render assigns (usually 10000)
   - `URL`: Your comma-separated list of URLs
4. Configure a cron job in Render to hit your endpoint periodically:
   - Schedule: e.g., `*/15 * * * *` (every 15 minutes)
   - URL: `https://cron-jobs-nd9t.onrender.com/`

### Environment Variables on Render

Make sure to add your environment variables in the Render dashboard:
- Navigate to your service → Environment
- Add `PORT` and `URL` variables

## Project Structure

```
cron-jobs-server/
├── src/
│   └── index.ts          # Main server file
├── dist/                 # Compiled JavaScript (generated)
├── node_modules/         # Dependencies
├── .env                  # Environment variables (not in git)
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## How It Works

1. The server starts and listens on the configured PORT
2. When a GET request is made to `/`, it:
   - Reads the `URL` environment variable
   - Splits the comma-separated URLs into an array
   - Makes parallel HTTP requests to all URLs using `Promise.all()`
   - Handles errors gracefully for individual requests
   - Returns a consolidated response with results from all requests

## Error Handling

The server is designed to be resilient:
- Individual request failures don't crash the server
- Each failed request is logged and included in the response with an `error` status
- The overall request always succeeds, even if some individual requests fail

## License

ISC

## Author

Created as part of the Harkirat Cohort 3.0 Web Development course.

