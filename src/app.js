const express=require('express');
var bodyParser = require("body-parser");
const cors=require('cors');
var morgan = require('morgan')
const UserController=require('./controllers/UserController');
const GithubController=require('./controllers/GithubController');
const app = express();
const port = process.env.PORT || 8080;
app.use(cors());
app.use(morgan('dev'))
app.use(bodyParser.json());
app.post("/api/createaccesscode",UserController.CreateNewAccessCode);
app.post("/api/validateaccessescode",UserController.ValidateAccessCode);
app.get("/api/searchgithubusers", GithubController.searchUsers);
app.get("/api/getgithubprofile/:userid", GithubController.getGitubUserProfile);
app.post('/api/likegithubuser',GithubController.likeGithubUser);
app.get("/api/getuserprofile", GithubController.getUserProfile);
app.get("/api/getuserprofile", GithubController.getUserProfile);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
