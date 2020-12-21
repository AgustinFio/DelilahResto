const express = require('express');
const server = express();
const db = require('./db.js')
const jwt = require('jsonwebtoken');
const secret = "SandwichDeMilanesa";
 const utils = require("./utils.js"); 
server.use(express.json());
server.use(express.urlencoded({ extended: false }));


function authMiddleware(req, res, next) {
    try {

        const authToken = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(authToken, secret)
        console.log(decodedToken);
        req.authInfo = decodedToken
        next();

    } catch (err) {
        res.status(401);
        res.send("Error de autenticacion")
    }
}
function isAdmin(req, res, next) {
   
        if(req.authInfo.admin === 1) {
            next ()
        }

        else {
            res.status(401)
            res.send("No es admin, acceso denegado")
        }
    }

    server.post('/registro', async (req, res) => {
        const { username, password, fullName, email, deliveryAddress, phone } = req.body
        if (username.length <= 4) {
            res.status(400);
            res.json("username invalido");
            return
        }
        try {
            if (username && password && fullName && email && deliveryAddress && phone) {
            var respuesta = await db.sequelize.query('INSERT INTO `users` (username, password, full_name, email, phone, delivery_address) VALUES (:username, :password, :full_name, :email, :phone, :delivery_address)', {
                replacements: {
                    username: username,
                    password: password,
                    full_name: fullName,
                    email: email,
                    phone: phone,
                    delivery_address: deliveryAddress
                }
            });
            res.status(200)
        res.json(respuesta);
        }
        else {
            res.status(400)
            res.send("Debe proporcionar todos los campos correspondientes")
        }
    }
        catch (err) {
            console.log(err);
            res.status(500)
            res.send("Algo salio mal..")
            
        }
    });

    server.post('/login', async (req, res) => {
        const { username, password } = req.body;

        try{
        const identificarUsuario = await db.sequelize.query('SELECT username, user_id, admin FROM `users` WHERE username = :username AND password = :password ', {
            type: db.sequelize.QueryTypes.SELECT,
            replacements: {
                username: username,
                password: password
            }
    
        })
        if (identificarUsuario.length === 0) {
            res.status(404)
            res.send("No se encontro el usuario");
            return
        }
        else {
            const token = jwt.sign(identificarUsuario[0], secret)
            res.json(token);
        }
    }
    catch (err) {
        console.log(err);
        res.status(500)
        res.send("Algo salio mal..")
        
    }
    });

let selectAllProducts = async () => {
    const products = await db.sequelize.query("SELECT * FROM products", {
      type: db.sequelize.QueryTypes.SELECT,
    });
    return products;
  };

server.get('/productos', authMiddleware,  async (req, res) => {
    console.log(req.authInfo)
    try{
    const prod = await selectAllProducts();
    res.status(200);
    res.send(prod);
    }
    catch (err) {
        console.log(err);
        res.status(500)
        res.send("Algo salio mal..")
    }

})
async function createProduct(req) {
    await db.sequelize.query(
      "INSERT INTO products (`name`, `price`, `img_url`, `description`) VALUES (:name, :price, :img_url, :description)",
      {
        replacements: {
            product_id: req.body.product_id,
          name: req.body.name,
          price: req.body.price,
          img_url: req.body.img_url,
          description: req.body.description
        },
        type: db.sequelize.QueryTypes.INSERT,
      }
    );
  }
server.post('/productos', authMiddleware, isAdmin, async (req, res) => {
    try {
        await createProduct(req);
        res.send("Producto creado");
        res.status(200);
    }
    catch (err) {
        res.status(500)
        res.send("Algo salio mal..");
    }
});

let selectProduct = async (product_id) => {
    const idProduct = await db.sequelize.query(
        
    "SELECT products.name, products.price, products.description, products.img_url FROM products WHERE products.product_id = :product_id", {
        type: db.sequelize.QueryTypes.SELECT,
        replacements: { product_id: product_id },
      }
    );
    return idProduct;
}

server.get('/productos/:id', authMiddleware, async (req, res) => {

    const product_id = req.params.id;
    try{
        const productTraidoPorId = await selectProduct(product_id);
        if(productTraidoPorId.length) {
            res.status(200)
            res.send(productTraidoPorId)
        }
        else {
            res.status(404)
            res.send("La busqueda no trajo resultados")
        }
    }
    catch (err) {
        console.log(err);
        res.status(500)
        res.send("Algo salio mal..")
        
    }
    // res.send(`producto:${req.params.id}`);
});


async function updateProduct(id, NuevoProducto) {
    await db.sequelize.query(
        "UPDATE products SET name = :name, price = :price, img_url = :img_url, description = :description WHERE product_id = :id", {
            replacements: {
                id: id,
                name: NuevoProducto.name,
                price: NuevoProducto.price,
                img_url: NuevoProducto.img_url,
                description: NuevoProducto.description,

            },
            type: db.sequelize.QueryTypes.UPDATE,
        }
    );
}
server.put('/productos/:id', authMiddleware, isAdmin, async (req, res) => {
    const productoId = req.params.id;
    const NuevoProducto = {
        name: req.body.name,
        price: req.body.price,
        img_url: req.body.img_url,
        description: req.body.description,
    };
    try {
        updateProduct(productoId, NuevoProducto);
        res.status(201);
        res.send("Producto modificado correctamente");
      } catch (error) {
        console.log(error);
        res.status(500);
        res.send("Lo sentimos, hubo un error inesperado");
      }
       
      });
async function deleteProduct(id,) {
    await db.sequelize.query("DELETE FROM products WHERE product_id = :id", {
      replacements: { id: id },
      type: db.sequelize.QueryTypes.DELETE,
    });
  }
server.delete('/productos/:id', authMiddleware, isAdmin, (req, res) => {
    const idProd = req.params.id;
  try {
    deleteProduct(idProd);
    res.send("Producto eliminado exitosamente");
  } catch (error) {
    console.log(error, "algo salio mal");
    res.status(500);
    res.send("Algo salio mal..");
  }
});
async function obtenerOrdenes () {
    const ordenes = await db.sequelize.query("SELECT * FROM orders INNER JOIN users ON orders.user_id = users.user_id ORDER BY date DESC;", {
        type: db.sequelize.QueryTypes.SELECT,
      });
      return ordenes;
} 

server.get('/ordenes', authMiddleware, isAdmin, async (req, res) => {
    try{
    const sendOrders = await obtenerOrdenes(req)
    res.status(200)
    res.send(sendOrders);
    }
    catch (err) {
        console.log(err);
        res.status(500)
        res.send("Algo salio mal..")
    }
})
async function realizarConsulta(table, productNumber, productInput) {
    const consulta = await db.sequelize.query(`SELECT * FROM ${table} WHERE ${productNumber} = :replacement`,{
        replacements: {  replacement: productInput },
        type: db.sequelize.QueryTypes.SELECT,
    });
    return consulta;

}
server.post('/ordenes', authMiddleware, async (req, res) => {
    const user_id = req.authInfo.user_id
   const payment_method = req.body.payment_method
const data = req.body.data
try{
    const order_details = await Promise.all(
        data.map((product) => realizarConsulta("products", "product_id", product.product_id))
    );
    const orderDetails = async () => {
let total = 0;
let description = "";
order_details.forEach((product, index) => {
    total += product[0].price * data[index].amount;
    description += `${data[index].amount}x ${product[0].name}, `;
    console.log(total)
    console.log(description)
});
return [total, description];
    }
    const [total, description] = await orderDetails();
			const order = await db.sequelize.query(
				"INSERT INTO orders (status, date, description, payment_method, total, user_id) VALUES (:status, :date, :description, :payment_method, :total, :user_id)",
				{
					replacements: {
						status: "new",
						date: new Date(),
						description,
						payment_method: payment_method,
						total,
						user_id,
					},
				}
			);
            data.forEach(async (product) => {
				const order_products = await db.sequelize.query(
					"INSERT INTO orders_products (order_id, product_id, product_amount) VALUES (:order_id, :product_id, :product_amount)",
					{ replacements: { order_id: order[0], product_id: product.product_id, product_amount: product.amount } }
				);
			});
res.send("Su pedido se ha realizado correctamente")
        }
        catch(error) {
            console.log(error, "Se produjo un error")
            res.status(500)
            res.send("Algo salio mal..")
        }
})

server.get('/ordenes/:id', authMiddleware, async (req, res) => {
    order_id = req.params.id;
    try{
            const idOrder = await db.sequelize.query(
                
                "SELECT * FROM orders INNER JOIN users ON orders.user_id = users.user_id WHERE orders.order_id = :order_id", {
                type: db.sequelize.QueryTypes.SELECT,
                replacements: { order_id: order_id },
              }
            );
            if(idOrder.length){

            idOrder[0].productList = await db.sequelize.query(
                "SELECT * FROM orders_products INNER JOIN products WHERE order_id = :order_id AND orders_products.product_id = products.product_id",
				{
                    type: db.sequelize.QueryTypes.SELECT,
					replacements: { order_id: idOrder[0].order_id },
					
				}
            )

            if(idOrder[0].user_id === req.authInfo.user_id || req.authInfo.admin === 1){
                res.status(200)
                res.send(idOrder)
            }
            else{
                res.status(401)
                res.send("No autorizado")
            } 
            }

            else {

                res.status(404)
                res.send("Su busqueda no trajo resultados")
            }
           }
           catch(error) {
               console.log(error, "error")
               res.status(500)
               res.send("Algo salio mal..")
           }
})
server.put('/ordenes/:id', authMiddleware, isAdmin, async (req, res) => {

    const order_id = req.params.id;
    const { status } = req.body
    try {
		const order = await db.sequelize.query("SELECT * FROM orders WHERE order_id = :order_id;", {
			replacements: { order_id: order_id },
			type: db.sequelize.QueryTypes.SELECT,
		});

		if (order != null) {
			if (utils.estadosDePedido.includes(status)) {
				const update = await db.sequelize.query("UPDATE orders SET status = :status WHERE order_id = :order_id", {
					replacements: {
						order_id: order_id,
						status: status,
					},
				});
                res.status(200)
                res.status("Estado de orden numero ${order_id} modificado correctamente ");
                
			} else {
                res.status(403)
                res.send("Estado de orden no valido");
			}
		} else {
            res.status(404)
            res.send("La busqueda no trajo resultados");
		}
	} catch (err) {
        console.log(err, "ocurrio un error con la busqueda")
        res.status(500)
        res.send("Algo salio mal..")
    }
});
async function deleteOrder(id,) {
    await db.sequelize.query("DELETE FROM orders WHERE order_id = :id", {
      replacements: { id: id },
      type: db.sequelize.QueryTypes.DELETE,
    });
  }

server.delete('/ordenes/:id', authMiddleware, isAdmin, async (req, res) => {
    const order_id = req.params.id;
    try{
       const delOrder = await deleteOrder(order_id)
       res.send(`La orden numero ${order_id} fue eliminada correctamente`)
    }
    catch (err) {
        console.log(err);
        res.status(500)
        res.send("Algo salio mal..")
        
    }
})
server.listen(3000, () => {
    console.log("Escuchando en el puerto 3000")
});
