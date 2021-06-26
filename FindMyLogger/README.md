# iCloud FindMy API

FindMy device location logging.

Required directory structure:
```

├── package.json 
├── package-lock.json
├── runner_findmy.js
|
├── node_modules/
│   └── ...
|
├── iCloud-API/
│   └── ...
|
└── README.md
```

Create a credentials.json file at root with the required information:
```json
{
	"username": "user@icloud.com",
	"password": "password123",
	"findMyDeviceId": "..."
}
```

Run using: 
```bash
node runner_findmy.js
```

