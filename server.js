const express = require('express');
const usuarioRoutes = require('./routes/usuarioRoutes');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const loginRoutes = require('./routes/loginRoutes')
const app = express();


app.use(cookieParser());

app.use(session({
    secret: 'segredoParaAlterar',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 2, // 2 horas
        sameSite: 'lax'
    }
}));
// CORS configurado corretamente para uso com credenciais
app.use(cors({
    origin: 'http://127.0.0.1:5500', // origem do seu front-end
    credentials: true,  // permite envio de cookies
    methods: ['GET','POST', 'PUT', 'DELETE']
}));


// Middleware para parsear JSON
app.use(express.json());

// Rotas
app.use('/usuarios', usuarioRoutes);

app.use('/usuarios',loginRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
