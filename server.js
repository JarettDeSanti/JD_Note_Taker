const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(require('./routes'))
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})