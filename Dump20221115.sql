-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: photo_website
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `photo`
--

DROP TABLE IF EXISTS `photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `photo` (
  `photo_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(256) DEFAULT NULL,
  `description` varchar(1024) DEFAULT NULL,
  `thumbnail_path` varchar(256) DEFAULT NULL,
  `photo_path` varchar(256) DEFAULT NULL,
  `date_created` datetime DEFAULT CURRENT_TIMESTAMP,
  `fk_user_id` int DEFAULT NULL,
  PRIMARY KEY (`photo_id`),
  UNIQUE KEY `photo_id_UNIQUE` (`photo_id`),
  KEY `fk_user_id_idx` (`fk_user_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`fk_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photo`
--

LOCK TABLES `photo` WRITE;
/*!40000 ALTER TABLE `photo` DISABLE KEYS */;
INSERT INTO `photo` VALUES (4,'ocean photo','a nice view of the bay','/images/photos/thumbnails/thumbnail-1665635021748-148193330.jpeg','\\images\\photos\\1665635021748-148193330.jpeg','2022-10-12 21:23:41',4),(5,'seagull','look at this seagull','/images/photos/thumbnails/thumbnail-1665635041406-950580063.jpeg','\\images\\photos\\1665635041406-950580063.jpeg','2022-10-12 21:24:01',4),(6,'Alliot','nice night view of a restaurant','/images/photos/thumbnails/thumbnail-1665635094358-235536089.jpeg','\\images\\photos\\1665635094358-235536089.jpeg','2022-10-12 21:24:54',4),(7,'photos of boats','cool photos of boats at night','/images/photos/thumbnails/thumbnail-1665635115794-55795402.jpeg','\\images\\photos\\1665635115794-55795402.jpeg','2022-10-12 21:25:15',4),(8,'the road at fisherman','fisherman wharf road at night','/images/photos/thumbnails/thumbnail-1665636630932-321328385.jpeg','\\images\\photos\\1665636630932-321328385.jpeg','2022-10-12 21:50:30',4),(9,'lion dance','lion dance in chinatown','/images/photos/thumbnails/thumbnail-1665637899906-248398099.jpeg','\\images\\photos\\1665637899906-248398099.jpeg','2022-10-12 22:11:39',4),(10,'band advertisement','a guy advertising a band','/images/photos/thumbnails/thumbnail-1665638171992-466302044.jpeg','\\images\\photos\\1665638171992-466302044.jpeg','2022-10-12 22:16:12',4),(11,'Firefighting','firefighters fighting fire in west portal','/images/photos/thumbnails/thumbnail-1665723627128-445280076.jpeg','\\images\\photos\\1665723627128-445280076.jpeg','2022-10-13 22:00:27',4);
/*!40000 ALTER TABLE `photo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('-Qq7-eRF2_57_ofgP9luU6IgAdmGKhsU',1667625533,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (4,'damon','$2b$15$WLx3WT9cDxWFc.q3bvNbqOsXHMP4XaLxqA6REYPxi0Z6ZlsF2BIoy'),(5,'bob','$2b$15$gWIuoB.X3fb3lLBQMV6bOuiaphHieUShV0Ytgba4ids4S.Y32NV9y'),(6,'bayonet','$2b$15$Nsl92a8OrVkQaFyWI2csh.Iv4.y1uoDNV3JvLOHgcaih0MdiUbs4W');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-15 22:55:36
