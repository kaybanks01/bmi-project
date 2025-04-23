{
    "version": 2,
    "builds": [
      {
        "src": "server/server.js",
        "use": "@vercel/node"
      },
      {
        "src": "client/package.json",
        "use": "@vercel/static-build",
        "config": {
          "distDir": "build"
        }
      }
    ],
    "routes": [
      {
        "src": "/api/(.*)",
        "dest": "/server/server.js"
      },
      {
        "src": "^/static/(.*)",
        "dest": "/client/static/$1"
      },
      {
         "src": "/(.*)\\.png",
         "dest": "/client/$1.png"
       },
      {
        "src": "/(.*)",
        "dest": "/client/index.html"
      }
    ]
  }