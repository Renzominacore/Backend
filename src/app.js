const fs=require('fs');
const http=require('http');
const port=8080;
const express=require('express');
const { error } = require('console');
const app=express;
app.use(express.urlencoded({extended:true}))
const productManager=require('./productManager')

const server=http.createServer((req,res)=>{
  res.writeHead(200,{'content-type':'text/plain'});
  res.end ('Hola mundo!');
})
server.listen(8080,()=>{
  console.log("Listen on port 8080")
})


app.get ('/productos',(req,res)=>{
    fs.readFile('Productos.JSON','utf-8',(err,data)=>{
        if(err){
            res.status(500).send('Error al leer el archivo')
            return;
        }
        const allProducts = productManager.obtenerProductos();
          res.json(allProducts);
    })
})

app.get ('/productos/:productoId',(req,res)=>{
  fs.readFile('Productos.JSON','utf-8',(err,data)=>{
      if(err){
          res.status(500).send('Error al leer archivo productos')
          return;
      }
      const productId = productManager.obtenerPorId(id);
      if(productId){
        res.JSON(productId)
      }else{
        res.status(404).send('Producto no encontrado');
      }
  })
})
app.get ('/productos',(req,res)=>{
  fs.readFile('Productos.JSON','utf-8',(err,data)=>{
      if(err){
          res.status(500).send('Error al leer el archivo')
          return;
      }
      const idQuery= req.query.id;
      if(idQuery){
        const productosFiltrados=allProducts.filter(producto=>producto.id===idQuery);
        res.JSON(productosFiltrados)
      }else{
        res.json(allProducts)
      }
  })
})