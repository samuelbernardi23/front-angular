const express = require('express');
const app = express();

const PORT = process.env.PORT || 4200;

app.use(express.static(__dirname + '/dist/front-angular'));

app.get('/*', (req, res) => {
   res.sendFile(__dirname + '/dist/front-angular/index.html');
});

app.listen(PORT, () => {
   console.log("Server iniciado na porta " + PORT);
});