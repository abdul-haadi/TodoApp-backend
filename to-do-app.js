const { createClient } = require('@supabase/supabase-js');
const express = require('express');
const app = express();
app.use(express.json())
const PORT  =  3001;
const cors = require("cors");

app.use(cors());


const supabase = createClient('https://ueitqibzfnopxcfhoise.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlaXRxaWJ6Zm5vcHhjZmhvaXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM1NzU4OTYsImV4cCI6MjAyOTE1MTg5Nn0.FYtXNaSrDJCKdO_brk55J1Q2Vw3SJIpEYk7kNDMf-uc')    

app.get('/', async (req,res) => {
    const {authorization} = req.headers;
    // console.log(req.headers);
    // console.log(authorization);
    const {data: {user} }= await supabase.auth.getUser(authorization)
    const {data, error} = await supabase
    .from('Task')
    .select()
    .eq('created_by', user.id)
    res.send(data)
    //   const d = data.body
    
})

app.get('/id/', async (req,res) => {
    const {id} = req.query
    const {data, error} = await supabase
    .from('Task')
    .select()
    .eq('id', id)
    console.log(req.headers);
    if(error)
    {
        console.log(error)
    }
    res.send(data)
})

app.post('/', async (req, res) => {
    const {authorization} = req.headers;
    const { task } = req.body;
    // console.log(req)
    const {data: {user} }= await supabase.auth.getUser(authorization)
    const {data,error} = await supabase
        .from('Task')
        .insert({
        task: task,
        created_by: user.id
    })
if (error) {
    console.log(error)
}
res.send({
    data: data
});
})

app.delete('/', async (req, res) => {
    const {authorization} = req.headers;
    const {id} = req.body
    console.log(id)

    const {data: {user} }= await supabase.auth.getUser(authorization)
    const {error} = await supabase 
    .from('Task')
    .delete()
    .eq('id', parseInt(id))
    .eq('created_by', user.id)
    if(error)
    {
        console.log(error)
    }
    res.send({
        data: id
    })
})

app.listen(
    PORT, () => {
        console.log(`app listening on port ${PORT}`)
    } 
)