// Dependencies
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const app = express();
const upload = multer({dest: 'files/'});

// Calling Json bodyParser
app.use(bodyParser.json());

// bypass cors
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*"); // "*" for public access and www.example.com for specific uses
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
		);
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});
app.all('*', function(req, res, next) {
	var origin = req.get('origin'); 
	res.header('Access-Control-Allow-Origin', origin);
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

// calling index.html
app.use(express.static(__dirname + '/index.html'));

// post file on api
app.post('/upload', upload.single('file'), function(req, res, next){
	console.log(req.file);
	return res.json(req.file);
})

// define Port
const PORT = process.env.PORT || 3000;

// Listening from port
app.listen(PORT, () => {
	console.log(`App is listening on port ${PORT}`);
})