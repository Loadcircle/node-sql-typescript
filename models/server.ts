import express, {Application, json} from 'express';
import userRouter from '../routes/users'
import cors from 'cors';
import db from '../db/connection';

class Server {

    private app: Application;
    private port: string;
    private paths = {
        users: '/api/users'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.connectDB();
        this.middlewares();
        this.routes();
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Server running in '+ this.port);
        });
    }

    async connectDB(){
        try{

            await db.authenticate();
            console.log('Database connected');

        }catch(error:any){
            throw new Error(error);
        }
    }

    middlewares(){
        //cors
        this.app.use(cors());

        //body react
        this.app.use(json());

        //public folder 
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.paths.users, userRouter);
    }
}

export default Server;