const app = require("../app");
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

const dbURL = process.env.MONGODB_URL;

const connection = mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

connection.then(() => {
    app.listen(PORT, () => {
        console.log(`Server running. Use our API on port: ${PORT}`);
    })
}).catch(e => {
    console.log(e);
    process.exit(1);
})

