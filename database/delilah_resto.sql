-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-12-2020 a las 20:38:07
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `delilah_resto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` varchar(60) NOT NULL,
  `date` datetime NOT NULL,
  `description` varchar(150) NOT NULL,
  `payment_method` varchar(60) NOT NULL,
  `total` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `status`, `date`, `description`, `payment_method`, `total`) VALUES
(7, 1, 'new', '2020-12-09 11:06:30', '2x Filette de merluza, 5x Sandwich de milanesa, 5x Sanguche de Palta, ', 'cash', 7650),
(8, 2, 'new', '2020-12-15 14:00:08', '4x Sanguche de Palta, 2x Parrillada para 5 personas, 1x Docena de empanadas, ', 'Credit Card', 5952),
(9, 2, 'new', '2020-12-16 17:34:55', '4x Sandwich de jamon y queso, 3x Filette de merluza, 1x Docena de empanadas, ', 'Credit Card', 3640),
(10, 2, 'new', '2020-12-16 17:35:33', '4x Sandwich de jamon y queso, 3x Filette de merluza, 1x Docena de empanadas, ', 'Credit Card', 3640),
(11, 1, 'new', '2020-12-18 04:13:01', '2x Docena de empanadas, 3x Parrillada para 5 personas, 3x Sandwich de milanesa, ', 'cash', 6250),
(12, 1, 'new', '2020-12-18 04:14:51', '2x Risotto a los cuatro quesos, 3x Sandwich de jamon y queso, 3x Sandwich de milanesa, ', 'cash', 4276),
(13, 5, 'new', '2020-12-18 04:16:05', '2x Filette de merluza, 3x Sandwich de jamon y queso, 3x Sandwich de palta, ', 'cash', 4239);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders_products`
--

CREATE TABLE `orders_products` (
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `product_amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `orders_products`
--

INSERT INTO `orders_products` (`order_id`, `product_id`, `product_amount`) VALUES
(10, 2, 4),
(10, 8, 3),
(10, 7, 1),
(11, 7, 2),
(11, 6, 3),
(11, 1, 3),
(12, 3, 2),
(12, 1, 3),
(12, 2, 3),
(13, 8, 2),
(13, 2, 3),
(13, 9, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `price` float NOT NULL,
  `img_url` varchar(200) NOT NULL,
  `description` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`product_id`, `name`, `price`, `img_url`, `description`) VALUES
(1, 'Sandwich de milanesa', 550, 'https://via.placeholder.com/150', 'Sandwich de milanesa de ternera o de pollo'),
(2, 'Sandwich de jamon y queso', 350, 'https://via.placeholder.com/155', 'Sandwich de jamon y queso con pan arabe o pan frances'),
(3, 'Risotto a los cuatro quesos', 788, 'https://via.placeholder.com/341', 'Risotto a los cuatro quesos.'),
(4, 'Hamburguesa de soja', 400, 'https://via.placeholder.com/157', 'Hamburguesa de soja al plato o en sandwich'),
(5, 'Pizza Napolitana', 400, 'https://via.placeholder.com/183', 'Pizza napolitana'),
(6, 'Parrillada para 5 personas', 1000, 'https://via.placeholder.com/199', 'Parrillada para 5 personas, cortes de carne a eleccion'),
(7, 'Docena de empanadas', 800, 'https://via.placeholder.com/201', 'Docena de empanadas a eleccion'),
(8, 'Filette de merluza', 480, 'https://via.placeholder.com/309', 'Filette de merluza a la plancha'),
(9, 'Sandwich de palta', 743, 'https://via.placeholder.com/444', 'Sandwich de palta'),
(10, 'Hamburguesa con queso cheddar y panceta', 480, 'https://via.placeholder.com/401', 'Hamburguesa casera con queso cheddar y panceta'),
(12, 'Ensalada de Frutas', 600, 'https://via.placeholder.com/878', 'Ensalada de frutas. Nutritiva y sana.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `full_name` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `phone` bigint(11) NOT NULL,
  `delivery_address` varchar(60) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `full_name`, `email`, `phone`, `delivery_address`, `admin`) VALUES
(1, 'agusfio', '1234', 'Agustin Fiorini', 'agustinfiorini@hotmail.com', 54911620897, 'Las heras 2000', 1),
(2, 'rolandoF', 'manzana', 'Rolando Fernandez', 'rolandofernandez@gmail.com', 5491187983459, 'Coronel Diaz 3000', 0),
(3, 'TitoG', 'durazno', 'Tito Gabriel Gonzalez', 'titog@gmail.com', 5491162039876, 'Reconquista 789', 0),
(4, 'Ferrod', 'perro', 'Fernando Rodriguez', 'ferrod@gmail.com', 54911819345, 'Suipacha 122', 0),
(5, 'Titofg', 'pokemon', 'Pikachu', 'pikachupoke@gmail.com', 54911098493, 'Suipacha 567', 0),
(6, 'MarceloF', 'marce003', 'Marcelo Figuerero', 'marcfig@gmail.com', 549110592821, 'Larrea 343 ', 0),
(7, 'Jimmy', 'mozzarella', 'Jim Mirc', 'jimmirc@gmail.com', 54908729341, 'Juncal 98 ', 0),
(8, 'Sargen99', 'cereza', 'Sargento Garcia', 'sargengarcia@gmail.com', 549110937492, 'Fenoglio 757 ', 0),
(9, 'HoracioL', 'milanesa', 'Horacio Lima', 'horaciolima@gmail.com', 549110839282, 'Tagle 898', 0),
(10, 'NorbertoS', 'asado', 'Norberto Sanchez', 'norbertos@gmail.com', 5491108392871, 'Pacheco 442', 0),
(11, 'PabloG', 'cerveza', 'Pablo Gabrielle', 'pablog@gmail.com', 54911083924, 'Pacheco 462', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indices de la tabla `orders_products`
--
ALTER TABLE `orders_products`
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `orders_products`
--
ALTER TABLE `orders_products`
  ADD CONSTRAINT `orders_products_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `orders_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
