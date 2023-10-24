const fs=require('fs');
const { json } = require('stream/consumers');

class ProductManager{
    
    constructor(path){
        this.productos=[];
        this.idIncremental=1;
        this.path=path
    }

    agregarProductos(title,description,price,thumbnail,code,stock){
        if (!title || !description || !price || !thumbnail || !code || !stock) {

            console.error('Todos los campos son obligatorios.');
            
            return
            
            }
        const id=this.idIncremental
        const producto={
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        this.idIncremental++
        const productoExistente = this.productos.find((producto) => producto.code === code);

            if(productoExistente){

        console.log(`El producto: ${producto.code} ya existe`);

        }else{
            console.log('El producto fue registrado')
        }
        this.productos.push(producto);
        return fs.promises.writeFile(this.path,JSON.stringify(this.productos));
    }
    obtenerProductos(){
        return fs.promises.readFile(this.path)
        .then((data)=>JSON.parse(data))
    }
    async borrarPorId(id) {
        try {
          const data = await this.obtenerProductos();
          const filteredData = data.filter(
            (producto) => producto.id !== id
          );
    
          if (data.length !== filteredData.length) {
            await fs.promises.writeFile(this.path, JSON.stringify(data));
            return console.log ('El producto fue eliminado: Lista de productos',filteredData)
          } else {
            console.log(`ID ${id} no existe en este archivo`);
            return null;
          }
        } catch (error) {
          console.log(
            `Error Code: ${error.code} | Hubo un error (${id})`
          );
        }
      }
      obtenerPorId(id){
        const productoPorId= this.productos.find((producto)=>producto.id===id);
        if(productoPorId){
          return fs.promises.readFile(this.path,JSON.stringify(this.producto));

        }else{
          console.log('El producto no existe');
        }
      }
      async obtenerPorId(id) {

        try {
        
        const data = await fs.promises.readFile(this.path, 'utf-8');
        
        const productos = JSON.parse(data);
        
        const productId = productos.find(producto => producto.id === id);
        
        productId ? console.log(`Producto con id = ${id}:`, productId) : console.log(`Producto con id ${id} no encontrado`);
        
        await productId || null;
        
        } catch (e) {
        
        console.error('Error al consultar productos por ID', e)
        
        }
        
        }
        
}
      
        


const instancia = new ProductManager('Productos.JSON')

    instancia.agregarProductos(`Estetoscopio`, `Estetoscopio Littman`, 49000, `image`, `cod1`, 7);
    instancia.agregarProductos(`Oximetro`, `Oximetro Beurer`, 20000, `image`, `cod2`, 10);
    instancia.agregarProductos(`Tensiometro`, `Tensiometro Philco`, 18000, `image`, `cod3`, 5);
    instancia.agregarProductos(`Estetoscopio`, `Estetoscopio Beurer`, 37000, `image`, `cod4`, 3);
    instancia.agregarProductos(`Oximetro`, `Oximetro Philco`, 25000, `image`, `cod5`, 6);
    instancia.agregarProductos(`Tensiometro`, `Tensiometro Sanyo`, 14000, `image`, `cod6`, 2);
    instancia.agregarProductos(`Termometro`, `Termometro Beurer`, 10000, `image`, `cod7`, 4);
    instancia.agregarProductos(`Termometro`, `Termometro Philco`, 12000, `image`, `cod8`, 9);
    instancia.agregarProductos(`Oximetro`, `Oximetro Sanyo`, 18000, `image`, `cod9`, 1);
    instancia.agregarProductos(`Termometro`, `Termometro Sanyo`, 14000, `image`, `cod10`, 8);
   
    

instancia.obtenerProductos().then((productos)=>{
    console.log(productos)
})
instancia.borrarPorId(3)

instancia.obtenerPorId(2)

/*async actualizarProducto(productId, actualizarData) {
  try {
    
    const datos = fs.readFileSync(this.path, 'utf8');
    const productos = JSON.parse(datos);

    const productoIndex = productos.findIndex(producto => producto.id === productId);

    if (productoIndex === -1) {
      throw new Error('Producto no encontrado');
    }
    productos[productoIndex] = { ...productos[productoIndex], ...actualizarDataData };

    fs.writeFileSync(this.filePath, JSON.stringify(productos, null, 2));

    return productos[productoIndex];
  } catch (error) {
    throw new Error('Error al actualizar el producto: ' + error.message);
  }
}
//Esto iria luego del New
(async () => {
  try {
    const updatedProduct = await instancia.actualizarProducto(1, { name: 'Nuevo Nombre', price: 15.99 });
    console.log('Producto actualizado:', updatedProduct);
  } catch (error) {
    console.error(error);
  }
})();*/
