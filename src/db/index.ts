import { DB_NAME, MONGO_PORT, MONGO_URL } from "../common/util/secrets";

const mongoose = require('mongoose');
mongoose.set("debug", true);
mongoose.connect(`mongodb://${MONGO_URL}:${MONGO_PORT}/${DB_NAME}`, {
    autoReconnect: true,
    reconnectTries: 10,

});

const db = mongoose.connection;
db.on('error', console.error.bind('console', 'connection error'));
db.once('open', function () {
    console.log('mongodb connected!')
})

export default db
