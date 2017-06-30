var users = require('./userData.json');

module.exports = {
    users: (req, res) => {
        req.query.age 
        ? 
            res.status(200).send(users.filter(user => user.age < req.query.age))
        :
            (req.query.lastname
            ?
                res.status(200).send(users.filter(user => user.last_name === req.query.lastname))
            :
                (req.query.email
                ?
                    res.status(200).send(users.filter(user => user.email === req.query.email))
                :
                    (req.query.favorites
                    ?
                        res.status(200).send(users.filter(user => {
                            let answer = user.favorites.findIndex(favoriteItem => favoriteItem == req.query.favorites)
                            if (answer !== -1) {return user}}))
                    :
                        res.status(200).send(users)
                    )
                )
            )
    },
    userId: (req, res) => {
        let answer = users.findIndex(user => user.id == req.params.id);
        answer !== -1
        ?
            res.status(200).send(users[answer])
        :
            res.status(404).json(null);
    },
    admins: (req, res) => {
        res.status(200).send(users.filter(user => user.type === 'admin'))
    },
    nonAdmins: (req, res) => {
        res.status(200).send(users.filter(user => user.type !== 'admin'))
    },
    userType: (req, res) => {
        res.status(200).send(users.filter(user => user.type === req.params.type))
    },
    updateUser: (req, res) => {
        let index = users.findIndex(user => user.id == req.params.id);
        users.splice(index, 1, req.body);
        res.status(200).send(users);
    },
    addUser: (req, res) => {
        let lastId = users[users.length - 1].id;
        req.body.id = lastId + 1;
        users.push(req.body);
        res.status(200).send(users);
    },
    deleteUser: (req, res) => {
        let index = users.findIndex(user => user.id == req.params.id);
        users.splice(index, 1);
        res.status(200).send(users);
    }
}