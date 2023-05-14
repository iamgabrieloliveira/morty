import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();

const SECRET_KEY = 'secret123';

app.use(express.json());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
}));

const users = [
    {
        name: 'Gabriel',
        email: 'gabriel@email.com',
        password: 'secret123',
    },
    {
        name: 'kevin',
        email: 'kevin@email.com',
        password: 'secret1010',
    },
];

app.post('/auth', (req, res) => {
    const { email, password } = req.body;

    const user = users.find((user) => (
        (user.password === password && user.email === email)
    ));

    if (user) {
        user.email = email;

        const token = jwt.sign(user, SECRET_KEY, { expiresIn: '30m' })

        res.status(200);
        res.send({ token, user });
    }

    res.status(401);
    res.send('Wrong credentials.');
});

app.get('/auth-verify', (req, res) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.send(401);
    }

    const [_,token] = authorization.split(' ');

    const valid = jwt.verify(token, SECRET_KEY);

    if (!valid) {
        res.send(401)
    }
    
    res.send(200);
});

app.listen(3030, () => {
    console.log('Server running.')
});