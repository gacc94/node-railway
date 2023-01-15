const express = require('express');

//Crear el servidor / aplicacion de express
const app = express();
// Rutas
app.use( '/api/auth',require('./routes/auth' ));

app.listen(3900, ()=>{
    console.log(`${ 3900}`)
})
