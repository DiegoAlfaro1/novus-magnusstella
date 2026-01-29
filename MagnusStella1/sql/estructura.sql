CREATE DATABASE  IF NOT EXISTS `magnusstella` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `magnusstella`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: magnusstella
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `idCliente` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `nombre` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `Correo` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  PRIMARY KEY (`idCliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES ('123789','Carlos López','carlospez@gmail.com'),('187654','Ana García','anagara@gmail.com'),('2023JL30','Nicanor Chávez Goyeneche','nichgo@gmail.com'),('22f34grds','Andrés Manuel López Obrador','amlo@gmail.com'),('25498','Sofía Rodríguez','sofirodri34@outlook.com'),('321456','Pedro Martínez','pedrote@gmail.com'),('37274','Elena García','elenagarc@outlook.com'),('456123','María Rodríguez','mariarodri@gmail.com'),('547623','Ricardo Ortiz Días','RicarditoOrtiz@hotmail.com'),('562323','Juan Pablo Chávez Leal','a01705408@tec.mx'),('60764','Andrés Martínez','andymarti@outlook.com'),('654321','Juan Pérez','juanper@gmail.com'),('666','Samuel','samuelinpinguin@gmail.com'),('7289','Lucía Hernández','luciahrdz4567@outlook.com'),('76363','Diego Pérez','diegope324@outlook.com'),('789321','Laura Hernández','lauraherdez@gmail.com'),('90234','Ana Zúñiga Chávez','anazzzz@gmail.com,'),('90235','Pablo','samuelinpinguin@gmail.com'),('91171','Luz Andrea Vázquez Alderete','Lavameikup@hotmail.com'),('92341','Diego Isaac Fuentes Juvera','diegolin@outlook.com'),('92971','Lucero Vázquez Martinez','Luvama@hotmail.com'),('93247','Angélica Ríos Cuentas','angie83@outlook.com'),('974858','Diego Ricardo Alfaro Pinto','diegorap2003@outlook.com'),('987412','Pablo Hazael Hurtado Mireles','pablinqueclavounclavin@outlook.com'),('987654','Miguel Sánchez','miguelsnchez@outlook.com');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historialusuarios`
--

DROP TABLE IF EXISTS `historialusuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historialusuarios` (
  `idhistorial` int NOT NULL AUTO_INCREMENT,
  `Usuario` varchar(45) DEFAULT NULL,
  `Accion` varchar(45) DEFAULT NULL,
  `Fecha` datetime DEFAULT NULL,
  PRIMARY KEY (`idhistorial`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historialusuarios`
--

LOCK TABLES `historialusuarios` WRITE;
/*!40000 ALTER TABLE `historialusuarios` DISABLE KEYS */;
INSERT INTO `historialusuarios` VALUES (1,'Alejandro López Martín','Modificó Usuario','2024-05-01 18:58:43'),(2,'Julia Martinez Norris','Modificó Usuario','2024-05-01 18:58:43'),(3,'Elena García Pérez','Modificó Usuario','2024-05-01 18:58:43'),(4,'Ana García López','Modificó Usuario','2024-05-01 18:58:43'),(5,'Juan Pérez Martínez','Modificó Usuario','2024-05-01 18:58:43'),(6,'Francisco Pérez Martínez','Modificó Usuario','2024-05-01 18:58:43'),(7,'María González Fernández','Modificó Usuario','2024-05-01 18:58:43'),(8,'Sandra González Fernández','Modificó Usuario','2024-05-01 18:58:43'),(9,'Daniel Rodríguez Díaz','Modificó Usuario','2024-05-01 18:58:43'),(10,'Pedro Rodríguez Díaz','Modificó Usuario','2024-05-01 18:58:43'),(11,'Isabel López Martín','Modificó Usuario','2024-05-01 18:58:43'),(12,'David García Pérez','Modificó Usuario','2024-05-01 18:58:43'),(13,'Jorge García Pérez','Modificó Usuario','2024-05-01 18:58:43'),(14,'Clara Pérez Martínez','Modificó Usuario','2024-05-01 18:58:43'),(15,'Cristina López Martín','Modificó Usuario','2024-05-01 18:58:43'),(16,'Laura Pérez Martínez','Modificó Usuario','2024-05-01 18:58:43'),(17,'Alberto González Fernández','Modificó Usuario','2024-05-01 18:58:43'),(18,'Miguel González Fernández','Modificó Usuario','2024-05-01 18:58:43'),(19,'Marta Rodríguez Díaz','Modificó Usuario','2024-05-01 18:58:43'),(20,'Diego Fuentes Juvera','Modificó Usuario','2024-05-01 18:58:43'),(21,'Juan Pablo Chávez Leal','Modificó Usuario','2024-05-01 18:58:43');
/*!40000 ALTER TABLE `historialusuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marca`
--

DROP TABLE IF EXISTS `marca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marca` (
  `idMarca` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `Nombre` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `Logo` varchar(250) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `Dias` int NOT NULL,
  PRIMARY KEY (`idMarca`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marca`
--

LOCK TABLES `marca` WRITE;
/*!40000 ALTER TABLE `marca` DISABLE KEYS */;
INSERT INTO `marca` VALUES ('LU1','LUUNAA','https://zeb-main-bucket.b-cdn.net/catalog-website/luuna.mx/group-186ad7c.svg?width=1600',0),('MA1','MAPPA','https://zeb-main-bucket.b-cdn.net/catalog-website/mappa.mx/mappa-logotipo_mesa-de-trabajo-1-4-.png?width=1600',0),('NO1','NOOZ','https://zeb-main-bucket.b-cdn.net/catalog-website/nooz.mx/nooz-header-logo.png?width=1600',0),('NULL1','NONE','None',0);
/*!40000 ALTER TABLE `marca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `opciones`
--

DROP TABLE IF EXISTS `opciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opciones` (
  `idopciones` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `fk_opciones_pregunta` int NOT NULL,
  PRIMARY KEY (`idopciones`),
  KEY `Fk_Pregunta_Opciones_idx` (`fk_opciones_pregunta`),
  CONSTRAINT `Fk_Pregunta_Opciones` FOREIGN KEY (`fk_opciones_pregunta`) REFERENCES `pregunta` (`idPregunta`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `opciones`
--

LOCK TABLES `opciones` WRITE;
/*!40000 ALTER TABLE `opciones` DISABLE KEYS */;
INSERT INTO `opciones` VALUES (1,'Solo',1),(2,'Con mi pareja',1),(3,'Con mi mascota',1),(4,'Con más individuos',1),(14,'Escriba su respuesta',2),(15,'Es perfecto',3),(16,'Es muy bueno',3),(17,'Cumple con mis expectativas',3),(18,'Podría mejorar',3),(19,'Insuficiente',3),(20,'15 a 24 años',4),(21,'25 a 34 años',4),(22,'35 a 44 años',4),(23,'44 o mayor',4),(24,'Menos de 4 horas',5),(25,'Entre 4 y 6 horas',5),(26,'Entre 6 y 7 horas',5),(27,'Entre 7 y 8 horas',5),(28,'Más de 8 horas',5),(29,'Es mucho mejor',6),(30,'Es ligeramente mejor',6),(31,'Es igual',6),(32,'Es ligeramente peor',6),(33,'Es mucho peor',6),(34,'Precio',7),(35,'Calidad',7),(36,'Diseño',7),(37,'Colores',7),(38,'Peso',7),(39,'Escribe tu respuesta',8),(40,'Sí',9),(41,'No',9);
/*!40000 ALTER TABLE `opciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permiso`
--

DROP TABLE IF EXISTS `permiso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permiso` (
  `idPermiso` int NOT NULL,
  `funcion` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  PRIMARY KEY (`idPermiso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permiso`
--

LOCK TABLES `permiso` WRITE;
/*!40000 ALTER TABLE `permiso` DISABLE KEYS */;
INSERT INTO `permiso` VALUES (0,'contestarReview'),(1,'ver'),(2,'editar'),(3,'administracion');
/*!40000 ALTER TABLE `permiso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posee`
--

DROP TABLE IF EXISTS `posee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posee` (
  `idrol` int NOT NULL,
  `idpermiso` int NOT NULL,
  `pk` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`pk`),
  KEY `fk_idrol_posee_idx` (`idrol`),
  KEY `fk_idpermiso_posee_idx` (`idpermiso`),
  CONSTRAINT `fk_idpermiso_posee` FOREIGN KEY (`idpermiso`) REFERENCES `permiso` (`idPermiso`),
  CONSTRAINT `fk_idrol_posee` FOREIGN KEY (`idrol`) REFERENCES `rol` (`IDRol`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posee`
--

LOCK TABLES `posee` WRITE;
/*!40000 ALTER TABLE `posee` DISABLE KEYS */;
INSERT INTO `posee` VALUES (0,0,1),(2,1,2),(1,1,3),(1,3,4),(3,1,5),(3,2,6),(1,2,7);
/*!40000 ALTER TABLE `posee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pregunta`
--

DROP TABLE IF EXISTS `pregunta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pregunta` (
  `idPregunta` int NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `Tipo` int NOT NULL,
  `fk_pregunta_idmarca` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  PRIMARY KEY (`idPregunta`),
  KEY `fk_idmarca_pregunta_idx` (`fk_pregunta_idmarca`),
  CONSTRAINT `fk_idmarca_pregunta` FOREIGN KEY (`fk_pregunta_idmarca`) REFERENCES `marca` (`idMarca`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pregunta`
--

LOCK TABLES `pregunta` WRITE;
/*!40000 ALTER TABLE `pregunta` DISABLE KEYS */;
INSERT INTO `pregunta` VALUES (1,'¿Con cuántas personas duermes?',3,'LU1'),(2,'En general, ¿Cuál es el peor aspecto del producto?',2,'LU1'),(3,'¿Cuál es su grado de satisfacción con el producto?',1,'NO1'),(4,'¿Qué edad tienes?',1,'NO1'),(5,'¿En promedio, cuántas horas duermes cada noche?',1,'NO1'),(6,'¿Cómo se compara su nuevo colchón al anterior?',1,'LU1'),(7,'¿Por qué elegiste Mappa vs otras marcas?',3,'MA1'),(8,'¿Qué mejoras le haría al producto?',2,'MA1'),(9,'¿Estaba en par con sus espectativas?',1,'MA1');
/*!40000 ALTER TABLE `pregunta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `idProducto` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `FK_idMarca_Producto` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `Nombre` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `Imagen` varchar(400) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `Descripcion` varchar(400) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `Categoria` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  PRIMARY KEY (`idProducto`),
  KEY `idMarca_idx` (`FK_idMarca_Producto`),
  CONSTRAINT `fk_marca_producto` FOREIGN KEY (`FK_idMarca_Producto`) REFERENCES `marca` (`idMarca`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES ('AN1133V','NO1','2 Pack Almohada Essential Regular','','Para descansar como rey basta con un par de almohadas rellenas de microfibra cepillada que asemeja a la sensación de las plumas naturales. ¡Créenos, sostendrán tu cabeza como a su majestad!','Almohadas'),('AN1133VCH','NO1','2 Pack Almohada Essential Regular','','Para descansar como rey basta con un par de almohadas rellenas de microfibra cepillada que asemeja a la sensación de las plumas naturales. ¡Créenos, sostendrán tu cabeza como a su majestad!','Almohadas'),('LB2231','LU1','Cama Anzures Individual','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/cama-anzures-indi/base-anzures8b4bc3.jpg','Cama individual de madera sustentable de abedul y nogal negro, con cabecera capitonada gris grafito. Un complemento de lujo y comodidad para tu descanso. ¡Tenemos 4 tamaños disponibles!','Cama'),('LB3231','LU1','Cama Condesa Individual','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/cama-condesa-indi/cama-condesa.jpg','Resistencia, elegancia y sustentabilidad fueron las tres ideas que teníamos en la cabeza al crear esta cama individual de madera certificada con cabecera capitonada gris claro.','Cama'),('LU1001B2','LU1','Colchón Luuna Basics 2 Individual','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/luuna-colchÃ³n-basic-2-indi/basics-2.png','Luuna Basics 2 Individual es ideal para tener un descanso profundo. Sus dos capas de espumas certificadas garantizan una combinación de soporte y frescura que perduran con el paso de los años. ¡Compruébalo tú mismo!','Colchón'),('LU1002B2','LU1','Colchón Luuna Basics 2 Matrimonial','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/luuna-colchÃ³n-basic-2-matri/basics-2.png','Luuna Basics 2 Matrimonial es ideal para tener un descanso profundo. Sus dos capas de espumas certificadas garantizan una combinación de soporte y frescura que perduran con el paso de los años. ¡Compruébalo tú mismo!','Colchón'),('LU2002B2','LU1','Colchón Luuna Hotel Collection','imagen.png','El mejor colchón para descansar de verdad','Colchón'),('MA1201','MA1','Transportadora Para Mascotas Mappa','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/pet-carrier-mappa-char/pet-carrier.webp','La transportadora Mappa es ideal para viajar con tu mejor amigo. Su diseño está creado para brindar comodidad tanto a tu mascota como a ti','Accesorios'),('MA1301','MA1','Portalaptop Mappa','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/porta-laptop-mappa-char/portalaptop.webp','El portalaptop Mappa es perfecto para transportar tu computadora o tableta.','Accesorios'),('MA1401','MA1','Organizadores Mappa','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/organizadores-mappa-char/organizador.webp','Los organizadores Mappa son el accesorio ideal para empacar tus pertenencias de la manera más eficiente. Comprime y organiza tu ropa para que puedas guardar mucho más en tu maleta.','Accesorios'),('MA4003','MA1','Maleta Mappa Grande Color Arena','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/master-maleta-mappa-hard-shell-lote-san-gra/sand-s-01.jpeg','El tamaño que necesitas para lanzarte a la aventura más duradera. Su gran capacidad hará que puedas viajar con todo lo necesario.','Maletas'),('MA4012','MA1','Set Maleta Cabina + Grande Arena','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/kit-cabina-grande-san-lote/1.-sets-monocromaticos20.png','Este set de dos piezas es ideal para que encuentres el equilibrio entre lo que necesitas tener a la mano y la capacidad óptima para lo que documentarás.','Maletas'),('MX-MAP-MAL-KIT2-SAN','MA1','SET MALETA CABINA + GRANDE ARENA','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/kit-cabina-grande-san/1.-sets-monocromaticos20.png','Este set de dos piezas es ideal para que encuentres el equilibrio entre lo que necesitas tener a la mano y la capacidad óptima para lo que documentarás.','Maletas'),('NB7224','NO1','Cama Natural Tejida King','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/cama-natural-tejida-king/tejida-fondo-blanco.jpg','Creamos esta cama para los amantes de lo natural y artesanal. Está hecha de madera certificada y tejido artesanal, lo que la hace resistente y amigable con el medio ambiente.','Cama'),('NP6321','NO1','Protector de Colchón Essential Individual','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/protector-de-colchÃ³n-essential-bamboo-indi/protector_essential.png','El Protector Essential Individual te será muy útil si estás buscando algo suave, impermeable y transpirable que se asegure de que ese colchón que tanto trabajo te costó tener dure mucho más tiempo y de que tú pases una buena noche.','Blancos'),('NP6323','NO1','Protector de Colchón Essential Queen','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/protector-de-colchÃ³n-essential-bamboo-queen/protector_essentialc05dcc.png','El Protector Essential Queen te será muy útil si estás buscando algo suave, impermeable y transpirable que se asegure de que ese colchón que tanto trabajo te costó tener dure mucho más tiempo y de que tú pases una buena noche','Blancos'),('NP6324','NO1','Protector de Colchón Essential King','https://zeb-main-bucket.s3.us-west-2.amazonaws.com/public/web-item/protector-de-colchÃ³n-essential-bamboo-king/protector_essentialc05dcc.png','El Protector Essential King te será muy útil si estás buscando algo suave, impermeable y transpirable que se asegure de que ese colchón que tanto trabajo te costó tener dure mucho más tiempo y de que tú pases una buena noche.','Blancos'),('SH7003','LU1','Juego de Sábanas Satinadas Queen Size Blanco Rayas','','No existe mejor sensación que el rose del satin en la piel. Y tampoco existe mejor calidad en telas que las que son elaboradas con textiles certificados. ¡Compruébalo con estas sábanas!','Sábanas'),('SI1004','LU1','Colchón Luuna Signature King','','8 opciones de confort. Un colchón. Conoce la máxima expresión de tecnologí­a y total personalización con Luuna.','Colchón');
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `respuestas`
--

DROP TABLE IF EXISTS `respuestas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `respuestas` (
  `idrespuestas` int NOT NULL AUTO_INCREMENT,
  `fk_respuestas_review` int NOT NULL,
  `Descripción` varchar(400) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `fk_respuestas_pregunta` int NOT NULL,
  PRIMARY KEY (`idrespuestas`),
  UNIQUE KEY `idrespuestas_UNIQUE` (`idrespuestas`),
  KEY `fk_review_respuestas_idx` (`fk_respuestas_review`),
  KEY `fk_pregunta_respuestas_idx` (`fk_respuestas_pregunta`),
  CONSTRAINT `fk_pregunta_respuestas` FOREIGN KEY (`fk_respuestas_pregunta`) REFERENCES `pregunta` (`idPregunta`),
  CONSTRAINT `fk_review_respuestas` FOREIGN KEY (`fk_respuestas_review`) REFERENCES `review` (`idReview`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `respuestas`
--

LOCK TABLES `respuestas` WRITE;
/*!40000 ALTER TABLE `respuestas` DISABLE KEYS */;
INSERT INTO `respuestas` VALUES (1,1,'Solo',1),(2,2,'No me encanta el precio, es muy elevado',2),(3,3,'Es perfecto',2),(4,4,'15 a 24 años',4),(5,5,'Más de 8 horas',5),(6,6,'Es ligeramente mejor',6),(7,7,'Precio',7),(8,8,'El precio es muy elevado y hay demasiada personalización',2),(9,9,'Sí',9),(10,7,'Calidad',7),(11,7,'Diseño',7),(27,11,'Precio',7),(28,11,'sí',8),(29,11,'Diseño',7),(30,10,'Es perfecto',3),(31,10,'15 - 24 años',4),(32,12,'No me encanta el material que se utiliza',2),(33,12,'Es mucho mejor',6),(34,13,'El look and feel es peor que el que tenía',2),(35,14,'Es igual',6),(36,15,'Solo',1),(37,16,'La calidad del material',8),(38,17,'Entre 4 y 6 horas',5),(39,18,'Cumple con mis expectativas',3),(40,19,'Con mi pareja',1),(41,20,'Peso',7);
/*!40000 ALTER TABLE `respuestas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `idReview` int NOT NULL AUTO_INCREMENT,
  `Fk_Review_Venta` int NOT NULL,
  `Descripcion` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `Titulo` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `Fecha` datetime NOT NULL,
  `Puntaje` int NOT NULL,
  `Visibilidad` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`idReview`),
  UNIQUE KEY `Fk_Review_Venta_UNIQUE` (`Fk_Review_Venta`),
  KEY `fk_venta_review_idx` (`Fk_Review_Venta`),
  CONSTRAINT `fk_venta_review` FOREIGN KEY (`Fk_Review_Venta`) REFERENCES `venta` (`idVenta`)
) ENGINE=InnoDB AUTO_INCREMENT=147 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,1,'Excelente producto. Lo uso todos los días y no puedo estar más satisfecho con su rendimiento y durabilidad','Se me cayó del 5to piso','2023-03-07 00:00:00',5,1),(2,2,'¡Increíble! No puedo imaginar mi vida sin este producto. Realmente hace todo más fácil y eficiente','Muy buen producto','2024-01-21 00:00:00',4,1),(3,3,'Buen producto, me sorprendió','Es un producto de alta calidad y muy duradero','2024-01-16 00:00:00',2,1),(4,4,'Me encanta este producto. Es versátil, fácil de usar y muy útil en mi día a día','Útil','2024-01-23 00:00:00',4,1),(5,21,'Lo compré hace unas semanas y ya no puedo vivir sin él. Definitivamente vale la pena cada centavo, es lo que me gustaría decir, pero es muy pequeño','Pensé que era más grande','2024-01-21 00:00:00',1,1),(6,6,'He probado muchos productos similares, pero este se destaca por su calidad y funcionalidad. Lo recomiendo ampliamente','Lo mejor que existe!!!','2024-01-14 00:00:00',4,1),(7,7,'Qué gran compra! Este producto ha mejorado significativamente mi rutina diaria. Lo recomendaría a cualquiera','Producto recibido bien','2024-01-14 00:00:00',5,1),(8,8,'Gran producto, alta calidad y durabilidad, materiales pesados y lujosos, definitivamente arte','Es arte','2024-02-18 00:00:00',5,1),(9,22,'Funciona como se describe. Es robusto y confiable. No puedo pedir más de este producto','Satisfecho','2024-02-12 00:00:00',4,1),(10,10,'Este producto ha hecho una gran diferencia en mi vida. Es práctico, eficiente y fácil de usar','Impactante ','2024-02-27 00:00:00',4,1),(11,11,'Lo compré como regalo y resultó ser un gran acierto. La persona que lo recibió está encantada con el','Gran regalo','2024-02-29 00:00:00',5,1),(12,12,'\"He probado muchos productos similares, pero ninguno se compara a este. Su calidad es insuperable','Buenisismos materiales','2023-12-11 00:00:00',4,1),(13,13,'Es justo lo que necesitaba. Este producto ha simplificado muchas tareas para mí. ¡Totalmente recomendado! aunq ya la perdí D:','Buena compra','2023-12-23 00:00:00',4,1),(14,23,'Un producto imprescindible en mi hogar. Su diseño y durabilidad lo convierten en una excelente elección.','Amo aqui','2023-12-19 00:00:00',4,1),(15,15,'Utiliza materiales premium, además de cumplir perfectamente con su función','Alta calidad del material','2023-12-27 00:00:00',1,1),(16,16,'Estoy sorprendido por lo bien que funciona este producto. Sin duda alguna, es una compra que no me arrepiento','Gran usabilidad','2023-12-31 00:00:00',4,1),(17,17,'Sí cumplen con lo que piden pero esperaba más','Bueno pero....','2023-11-16 00:00:00',3,1),(18,18,'Me impresiona la calidad y la atención al detalle de este producto. Sin duda, una excelente adquisición','MUUUY buen producto','2023-11-01 00:00:00',4,1),(19,19,'Es increíble cómo un producto tan simple puede hacer tanto. Definitivamente recomendaría este producto a cualquiera','Increible lo útil y bonito q es','2023-11-18 00:00:00',5,1),(20,20,'Este producto superó mis expectativas. Es de alta calidad y cumple con su propósito. Lo recomiendo sin dudarlo ','La mayor calidad que existe','2024-01-12 00:00:00',5,1);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `IDRol` int NOT NULL,
  `Nombre` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  PRIMARY KEY (`IDRol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (0,'Cliente'),(1,'Admin'),(2,'Analítica'),(3,'CRM');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `IDRol` int NOT NULL,
  `Nombre` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `Password` varchar(400) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `Correo` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `Imagen` varchar(400) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `Estado` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`idUsuario`),
  KEY `IDRol_idx` (`IDRol`),
  CONSTRAINT `IDRol` FOREIGN KEY (`IDRol`) REFERENCES `rol` (`IDRol`)
) ENGINE=InnoDB AUTO_INCREMENT=901943 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (-98402,1,'Super Admin','$2a$12$z2jtH70Di4rUHLVB9iW7uewOX7kWqrQLGJPzxJons0IRZXuxtdYXe','SuperAdmin@MagnusStella.com','superadmin.png',1),(1,1,'Alejandro López Martín','contraseña231','alelo@gmail.com','default.png',1),(2,1,'Julia Martinez Norris','contraseñajajajaj','july@gmail.com','default.png',1),(3,2,'Elena García Pérez','contraseña342','elegarpe@gmail.com','default.png',1),(4,2,'Ana García López','contraseña123','anygar@hotmail.com','default.png',1),(5,2,'Juan Pérez Martínez','contraseña456','juanpema@outlook.com','default.png',1),(6,3,'Francisco Pérez Martínez','contraseña4568','franpe@gmail.com','default.png',1),(7,1,'María González Fernández','contraseña789','mago@gmail.com','default.png',1),(8,3,'Sandra González Fernández','contraseña7891','sandygo@gmail.com','default.png',1),(9,3,'Daniel Rodríguez Díaz','contraseña0124','danro@gmail.com','default.png',1),(10,3,'Pedro Rodríguez Díaz','contraseña012','pedrodriguez@outlook.com','default.png',1),(11,3,'Isabel López Martín','contraseña321','isalop@gmail.com','default.png',1),(12,3,'David García Pérez','contraseña1234','davigar@yahoo.com','default.png',1),(13,3,'Jorge García Pérez','contraseña243','jorgar@gmail.com','default.png',1),(729012,3,'Clara Pérez Martínez','contraseña354','clap@gmail.com','default.png',1),(767890,3,'Cristina López Martín','contraseña132','crslop@gmail.com','default.png',1),(789012,2,'Laura Pérez Martínez','contraseña4567','laupe1@gmail.com','default.png',1),(880123,2,'Alberto González Fernández','contraseña465','algo@gmail.com','default.png',1),(890123,2,'Miguel González Fernández','contraseña7890','migonz@outlook.com','default.png',1),(901234,2,'Marta Rodríguez Díaz','contraseña0123','marodri@gmail.com','default.png',1),(901935,3,'Diego Fuentes Juvera','$2a$12$6aZ8H8DVt2a83HC6JFc5SO9xUXpiYZU0fQ.5FXX0goWQvA/HPYZtS','diegofuentes@gmail.com','default.png',0),(901936,1,'admin','$2a$12$0U9UbyQe/RUJOwAjlElk9OX8E8RQCDABTgP0HF6qX.tASeG8a3u4a','admin@gmail.com','admin logo.png',1),(901937,3,'CRM','$2a$12$C6Cg9bmpFXauH7gmBq/gKO/8PIB1SL8t5/F.OQ3ziuezdBztIX2QC','crm@gmail.com','CRM logo.png',1),(901938,2,'Analitic','$2a$12$XP5H3ZkzGzyVLjcGiMtXLOAPO.DDMdCsxDmxG1wnwrxCdkUVZxKGG','analitic@gmail.com','analitic logo.png',1),(901940,3,'Juan Pablo Chávez Leal','$2a$12$T1emmWLj4EoAEyBe7aBivu2/O/MjsbSja38WHyCjuce8toEuNV7RC','a01705408@tec.mx','default.png',1);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `regustraUsuario` AFTER INSERT ON `usuario` FOR EACH ROW BEGIN
	INSERT INTO historialusuarios VALUES (DEFAULT, New.Nombre, 'Alta Usuario', NOW());
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `modificaUsuario` AFTER UPDATE ON `usuario` FOR EACH ROW BEGIN
	INSERT INTO historialusuarios VALUES (DEFAULT, New.Nombre, 'Modificó Usuario', NOW());
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `eliminaUsuario` AFTER DELETE ON `usuario` FOR EACH ROW BEGIN
INSERT INTO historialusuarios VALUES (DEFAULT, OLD.Nombre, 'Baja Usuario', NOW());
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `venta`
--

DROP TABLE IF EXISTS `venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venta` (
  `idVenta` int NOT NULL AUTO_INCREMENT,
  `Fk_Venta_Cliente` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `Fk_Venta_Producto` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `Fecha` datetime NOT NULL,
  `SalesOrderNum` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`idVenta`),
  KEY `Fk_Producto_Venta_idx` (`Fk_Venta_Producto`),
  KEY `Fk_Cliente_Venta` (`Fk_Venta_Cliente`),
  CONSTRAINT `Fk_Cliente_Venta` FOREIGN KEY (`Fk_Venta_Cliente`) REFERENCES `cliente` (`idCliente`),
  CONSTRAINT `Fk_Producto_Venta` FOREIGN KEY (`Fk_Venta_Producto`) REFERENCES `producto` (`idProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venta`
--

LOCK TABLES `venta` WRITE;
/*!40000 ALTER TABLE `venta` DISABLE KEYS */;
INSERT INTO `venta` VALUES (1,'7289','AN1133V','2023-03-07 00:00:00',NULL),(2,'7289','AN1133VCH','2023-03-07 00:00:00',NULL),(3,'7289','MA4012','2023-02-02 00:00:00',NULL),(4,'25498','SH7003','2023-03-03 00:00:00',NULL),(5,'92341','MX-MAP-MAL-KIT2-SAN','2024-04-30 00:00:00','2143'),(6,'25498','MA1301','2023-05-05 00:00:00',NULL),(7,'37274','MA1301','2023-06-06 00:00:00',NULL),(8,'37274','SH7003','2023-07-07 00:00:00',NULL),(9,'92341','NP6323','2024-04-30 00:00:00','2345'),(10,'37274','NP6323','2023-09-09 00:00:00',NULL),(11,'321456','MX-MAP-MAL-KIT2-SAN','2023-10-10 00:00:00',NULL),(12,'321456','SH7003','2023-11-11 00:00:00',NULL),(13,'321456','LU1002B2','2023-12-12 00:00:00',NULL),(14,'92341','AN1133VCH','2024-04-30 00:00:00','23456'),(15,'91171','LU1002B2','2023-12-14 00:00:00',NULL),(16,'91171','MA1301','2023-12-23 00:00:00',NULL),(17,'123789','NP6323','2023-01-12 00:00:00',NULL),(18,'123789','AN1133VCH','2023-01-15 00:00:00',NULL),(19,'123789','LB3231','2023-01-16 00:00:00',NULL),(20,'123789','MX-MAP-MAL-KIT2-SAN','2023-01-23 00:00:00',NULL),(21,'562323','MA4003','2023-01-25 00:00:00',NULL),(22,'562323','LB3231','2023-03-17 00:00:00',NULL),(23,'562323','NP6323','2023-03-12 00:00:00',NULL),(24,'987412','SH7003','2023-03-23 00:00:00',NULL),(25,'987412','MX-MAP-MAL-KIT2-SAN','2023-03-21 00:00:00',NULL),(26,'987412','LU1001B2','2023-06-30 00:00:00',NULL),(27,'974858','MA1301','2023-03-19 00:00:00',NULL),(28,'974858','MA4003','2023-03-17 00:00:00',NULL),(29,'92341','MA1301','2024-04-30 00:00:00','2346'),(30,'974858','MA1301','2023-05-27 00:00:00',NULL),(31,'60764','LB3231','2023-05-02 00:00:00',NULL),(32,'60764','MX-MAP-MAL-KIT2-SAN','2023-05-17 00:00:00',NULL),(33,'90234','LB3231','2023-07-17 00:00:00',NULL),(34,'90234','MA1301','2023-07-11 00:00:00',NULL),(35,'90234','LU1002B2','2023-07-21 00:00:00',NULL),(36,'92341','SI1004','2024-02-23 00:00:00','2842'),(37,'321456','LU1002B2','2023-07-12 00:00:00',NULL),(38,'321456','MA1301','2023-08-07 00:00:00',NULL),(39,'321456','MX-MAP-MAL-KIT2-SAN','2023-08-21 00:00:00',NULL),(40,'92971','LB3231','2023-08-12 00:00:00',NULL),(41,'92971','NP6323','2023-09-07 00:00:00',NULL),(42,'92971','AN1133VCH','2023-09-12 00:00:00',NULL),(43,'92971','LU1002B2','2023-09-27 00:00:00',NULL),(44,'37274','MA1301','2023-09-17 00:00:00',NULL),(45,'37274','NP6323','2023-09-13 00:00:00',NULL),(46,'37274','MA1301','2023-10-05 00:00:00',NULL),(47,'37274','AN1133VCH','2023-10-30 00:00:00',NULL),(48,'987654','NP6323','2023-10-12 00:00:00',NULL),(49,'987654','AN1133VCH','2023-10-09 00:00:00',NULL),(50,'987654','LU1002B2','2023-12-24 00:00:00',NULL),(51,'987654','NB7224','2021-12-24 00:00:00',NULL),(52,'7289','SI1004','2023-03-07 00:00:00','1234'),(53,'7289','SI1004','2023-03-07 00:00:00','1234'),(54,'7289','SI1004','2023-03-07 00:00:00','1235'),(55,'7289','SI1004','2023-03-07 00:00:00','1235'),(56,'7289','SI1004','2023-03-07 00:00:00','1235'),(57,'7289','SI1004','2023-03-07 00:00:00','1235'),(58,'7289','SI1004','2023-03-07 00:00:00','1235'),(59,'7289','NB7224','2024-04-18 00:00:00','1236'),(60,'7289','NB7224','2024-04-18 00:00:00','1237'),(61,'91171','NP6321','2024-04-18 00:00:00','5000'),(62,'90234','SI1004','2023-03-07 00:00:00','1235'),(63,'76363','MA1301','2024-04-10 00:00:00',NULL),(64,'987412','MA1301','2023-02-02 00:00:00',NULL),(65,'91171','MA1301','2023-03-03 00:00:00',NULL),(66,'76363','MA1301','2024-01-28 00:00:00',NULL),(68,'90234','SI1004','2023-03-07 00:00:00','1235'),(69,'90234','SI1004','2023-03-07 00:00:00','1235'),(70,'90234','SI1004','2024-03-07 00:00:00','1235'),(71,'90234','SI1004','2024-03-07 00:00:00','1235'),(79,'90234','LU1002B2','2024-05-02 00:00:00','9874'),(80,'987412','NP6321','2024-04-17 00:00:00','2394'),(81,'90234','LU1002B2','2024-05-02 00:00:00','9874'),(82,'90234','LU1002B2','2024-05-02 00:00:00','9874'),(83,'90235','LU1002B2','2024-05-02 00:00:00','9875'),(84,'90235','LU1002B2','2024-05-02 00:00:00','9875'),(85,'90235','LU1002B2','2024-05-02 00:00:00','9875'),(97,'2023JL30','LU1001B2','2024-01-23 00:00:00','EJ_DE_SALESORDERNUMBER');
/*!40000 ALTER TABLE `venta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'magnusstella'
--
/*!50003 DROP FUNCTION IF EXISTS `PuntajeItemM` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `PuntajeItemM`(diff_marca varchar(25)) RETURNS float
    DETERMINISTIC
BEGIN
declare promedio float;

select avg(Puntaje) into promedio
from review r, venta v, producto p
where r.fk_review_venta = v.idventa 
and v.fk_venta_producto = p.idproducto
and (fk_idmarca_producto = diff_marca);
return promedio; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `PuntajeItemMC` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `PuntajeItemMC`(Umarca varchar(25), Ucategoria varchar(45)) RETURNS float
    DETERMINISTIC
BEGIN
declare promedio float;

select avg(Puntaje) into promedio
from review r, venta v, producto p
where r.fk_review_venta = v.idventa 
and v.fk_venta_producto = p.idproducto
and (fk_idmarca_producto = Umarca)
and p.categoria = Ucategoria;
return promedio;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `PuntajeItemP` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `PuntajeItemP`(diff_idproducto varchar(25)) RETURNS int
    DETERMINISTIC
BEGIN
declare promedio float;

select avg(Puntaje) into promedio
from review r, venta v, producto p
where r.fk_review_venta = v.idventa 
and v.fk_venta_producto = p.idproducto
and (idproducto = diff_idproducto);

RETURN promedio;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `ReviewsContestadasM` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `ReviewsContestadasM`(Umarca varchar(25)) RETURNS int
    DETERMINISTIC
BEGIN

declare contestadas int;

SELECT COUNT(*) INTO contestadas
    FROM review r, venta v, producto p
    where r.fk_review_venta = v.idVenta
    and v.fk_venta_producto = p.idproducto
    and p.fk_idMarca_producto = Umarca;

RETURN contestadas;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `ReviewsContestadasMC` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `ReviewsContestadasMC`(diff_marca varchar(25), diff_categoria varchar(45)) RETURNS int
    DETERMINISTIC
BEGIN
declare contestadas int;

SELECT COUNT(*) INTO contestadas
    FROM review r, venta v, producto p
    where r.fk_review_venta = v.idVenta
    and v.fk_venta_producto = p.idproducto
    and p.fk_idMarca_producto = diff_marca
    and p.categoria = diff_categoria;

RETURN contestadas;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `ReviewsContestadasP` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `ReviewsContestadasP`(diff_producto varchar(25)) RETURNS int
    DETERMINISTIC
BEGIN
declare contestadas int;

SELECT COUNT(*) INTO contestadas
    FROM review r, venta v, producto p
    where r.fk_review_venta = v.idVenta
    and v.fk_venta_producto = p.idproducto
    and p.idProducto = diff_producto;
    
RETURN contestadas;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `ReviewsEnviadasM` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `ReviewsEnviadasM`(diff_marca varchar(25)) RETURNS int
    DETERMINISTIC
BEGIN
declare enviadas int;

SELECT COUNT(*) INTO enviadas
    FROM venta v, producto p
    where v.fk_venta_producto = p.idproducto
    and p.fk_idmarca_producto = diff_marca;

RETURN enviadas;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `ReviewsEnviadasMC` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `ReviewsEnviadasMC`(diff_marca varchar(25), diff_categoria varchar(45)) RETURNS int
    DETERMINISTIC
BEGIN
declare enviadas int;

SELECT COUNT(*) INTO enviadas
    FROM venta v, producto p
    where v.fk_venta_producto = p.idproducto
    and p.fk_idmarca_producto = diff_marca
    and p.categoria = diff_categoria;

RETURN enviadas;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `ReviewsEnviadasP` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `ReviewsEnviadasP`(diff_producto varchar(25)) RETURNS int
    DETERMINISTIC
BEGIN
declare enviadas int;

SELECT COUNT(*) INTO enviadas
    FROM venta v, producto p
    where v.fk_venta_producto = p.idproducto
    and p.idProducto = diff_producto;
return enviadas;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-02 23:36:07
