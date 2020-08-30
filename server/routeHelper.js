const MongoClient = require('mongodb').MongoClient;
const URL = "mongodb://localhost:27017/";
const databaseName = "authentication_setup";
const collectionName = "authentication_user";

function Login(queryUser, res) {
    console.log('login is accssesd');

    MongoClient.connect(URL, function (err, db) {
        if (err) {
            return res.status(500).send({ err: 'err@' });
        }
        const dbo = db.db(databaseName);
        // expecting to get email and password from user (req.body from client)
        dbo.collection(collectionName).findOne(queryUser, function (err, user) {
            if (err) {
                return res.status(500).send({ err: 'err@' });
            } if (user) {
                // email found and match to user password (this is post but ther is no document created so i will return 200 ans not 201)
                return res.status(200).send(user);
            }
            // user is NOT found
            return res.status(403).send({ err: 'wrong password, user might try to connect as another user' });
        });
    });
}


function Register(req, res) {
    console.log('register is accssesd');

    MongoClient.connect(URL, function (err, db) {
        if (err) {
            return res.status(500).send({ err: 'err@' });
        }
        const dbo = db.db(databaseName);
        // expecting to get email and password from user (req.body from client)
        const queryUser = req.body;
        dbo.collection(collectionName).findOne({ email: queryUser.email }, function (err, userFound) {
            if (err) {
                return res.status(500).send({ err: 'err@' });
            } if (userFound) {
                //email found
                console.log(queryUser);
                return res.status(400).send({ err: 'user already exists' });
            }
            // no email match therfor insert user
            dbo.collection(collectionName).insertOne(queryUser, function (err, result) {
                if (err) {
                    console.log(err);
                    return res.status(500).send({ err });
                }
                return res.status(201).send(result);
            });
        });
    });
}

module.exports.Login = Login;
module.exports.Register = Register;