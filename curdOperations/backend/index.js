const express=require('express')
const mysql=require('mysql')
const app=express()
const cors=require('cors')
app.use(express.json())
app.use(cors())
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"thimothi",
    database:"thimothi",
    insecureAuth : true
})
db.connect((error)=>{
    if(error) 
        {
            console.log(error)
        }
        else{
            console.log("the database connection connected")
        }
})

app.get('/getData',(req,res)=>{
    
    const query="select * from mytable";
    db.query(query,(err,result)=>{
        if(err){
            res.send({message:"error"})
        }
        else{
            res.json(result)
        }
    })
})
app.post('/postData',(req,res)=>{
    const data = req.body;
   
    const query='insert into mytable set (?)';
    db.query(query,data,(err)=>{
        if(err) throw err;
        return res.status(201).json({ success: true, message: 'User registered successfully' });
            }
        );
    // }
}
)


app.delete('/delete/:id',(req,res)=>{
    const query='delete from mytable where id='+req.params.id;
    db.query(query,(err)=>{
        if(err){
            res.send({message:'error'})
        }
        else{
            res.send({message:"success"})
        }
    })
})

app.put('/update/:id',(req,res)=>{
    const query='update mytable set name='+req.body.name+" "+"email="+req.body.email+" "+"password="+req.body.password;
    db.query(query,(err)=>{
        if(err)
            {
                res.send({message:err})
            }
            else{
                res.send({
                    message:"the updation done"
                })
            }
    })
})

app.listen(1000,()=>{
    console.log("server running at 1000 port")
})