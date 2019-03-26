import 'dotenv/config';
import App from './app';
//import * as mongoose from 'mongoose';

/* const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_PATH,
  } = process.env;
   
  mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
 */
import PostsController from './posts/posts.controller';
 
const app = new App(
  [
    new PostsController(),
  ],
  3000,
);
 
app.listen();