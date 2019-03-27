import * as express from 'express';
import Post from './posts.interface';
import postModel from './posts.model';
import PostNotFoundException from "../exceptions/PostNotFoundException";
 
class PostsController {
  public path = '/posts';
  public router = express.Router();
 
  private posts: Post[] = [
    {
      author: 'Marcin',
      content: 'Dolor sit amet',
      title: 'Lorem Ipsum',
    }
  ];
 
  constructor() {
    this.intializeRoutes();
  }
 
  public intializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.post(this.path, this.createAPost);
    this.router.get(this.path +'/:id', this.getPostById);
    this.router.patch(this.path +'/:id', this.modifyAPost);
    this.router.delete(this.path +'/:id', this.deletePost);
  }
 
  getAllPosts = (request: express.Request, response: express.Response) => {
    postModel.find()
    .then(posts => {
      response.send(posts);
    })
  }

  getPostById(request: express.Request, response: express.Response, next: express.NextFunction) {
    const id = request.params.id;
    postModel.findById(id)
      .then(post => {
        if (post) {
          response.send(post);
        } else {
          next(new PostNotFoundException(id));
        }
      })
  }

  createAPost = (request: express.Request, response: express.Response) => {
    const postData: Post = request.body;
    const createdPost = new postModel(postData);
    createdPost.save()
      .then(savedPost => {
        response.send(savedPost);
      })
  }

  modifyAPost(request: express.Request, response: express.Response) {
    const id = request.params.id;
    const postData: Post = request.body;
    postModel.findByIdAndUpdate(id, postData, { new: true })
      .then(post => {
        response.send(post);
      })
  }

  deletePost(request: express.Request, response: express.Response) {
    const id = request.params.id;
    postModel.findByIdAndDelete(id)
      .then(successResponse => {
        if(successResponse) {
          response.send(200);
        } else {
          response.send(404);
        }
      })
  }

}
 
export default PostsController;