//Require packages
const express = require('express');
const bodyParser = require('body-parser');


//Require local files
const usersCtrl = require('./usersCtrl');
// const users = require('./userData.json');


//Initalized and config
const app = express();
const port = 3000;


//Middleware
app.use(bodyParser.json());


//Endpoints
app.get('/api/users', usersCtrl.users);
app.get('/api/users/:id', usersCtrl.userId);
app.get('/api/admins', usersCtrl.admins);
app.get('/api/nonadmins', usersCtrl.nonAdmins);
app.get('/api/user_type/:type', usersCtrl.userType);

app.put('/api/users/:id', usersCtrl.updateUser);

app.post('/api/users', usersCtrl.addUser);

app.delete('/api/users/:id', usersCtrl.deleteUser);


//Listening
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})