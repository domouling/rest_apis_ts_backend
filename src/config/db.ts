import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';

dotenv.config();

//Opcion 1
// const db = new Sequelize('postgres://rest_api_node_ts_bg9h_user:lAno1gUqmo72Pfj4Chj1HsNcIhpZzi26@dpg-cppj5208fa8c739h7rjg-a.oregon-postgres.render.com/rest_api_node_ts_bg9h', {
//     dialectOptions: {
//         ssl: {
//             require: false,
//         }
//     }
// });

// Opcion 2
const db = new Sequelize(process.env.DATABASE_URL!, {
    models: [__dirname + '/../models/**/*'],
    logging: false,
});

export default db;