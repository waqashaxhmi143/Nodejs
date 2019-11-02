//import underscore from 'underscore'
var express= require('express');
var JOI = require('joi')
const app = express();
app.use(express.json())
app.use((req,res ,next)=>{
    console.log("Authenticating...")
    next();
})
const movies = [
    {id:1, type : "action"},
    {id:2, type : 'comedy'},
    {id:3, type: "funny"}
]
app.get('/api/gener',(req,res)=>{
    res.send(movies)
})

app.get('/api/gener/:id',(req,res)=>{
    //console.log(req);
    const schema = {
        id: JOI.number().required()
    }
    const {error} = JOI.validate(req.params,schema);
    if(error) return res.status(400).send("The genere ID should be a number");
    const movie = movies.find((x)=>x.id == (req.params.id))
    if(!movie) return res.status(400).send("The genere with the given ID not found");
    res.send(movie);
})

app.post('/api/gener/',(req,res)=>{
    //console.log(req);
    console.log(req);
    const schema = {
        name: JOI.string().min(3).required(),
    }
    const {error} = JOI.validate(req.body,schema);
    if(error) return res.status(400).send("Unable to add Movie");
    movies.push({id:movies.length, type: req.body.name});
    res.send(req.body);
})

const port = process.env.PORT || 3000;
app.listen(port,()=> console.log(`Listening on ${port}`));
