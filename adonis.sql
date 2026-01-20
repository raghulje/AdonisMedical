-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: adonis_production
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `about_page_content`
--

DROP TABLE IF EXISTS `about_page_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `about_page_content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hero_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hero_subtitle` text COLLATE utf8mb4_unicode_ci,
  `hero_image_id` int DEFAULT NULL,
  `overview_heading` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `overview_content` text COLLATE utf8mb4_unicode_ci,
  `overview_image_id` int DEFAULT NULL,
  `safety_heading` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `safety_content` text COLLATE utf8mb4_unicode_ci,
  `safety_image_id` int DEFAULT NULL,
  `excellence_heading` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `excellence_content` text COLLATE utf8mb4_unicode_ci,
  `excellence_image_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `background_image_id` int DEFAULT NULL,
  `overview_image_overlay_text` text COLLATE utf8mb4_unicode_ci,
  `global_reach_heading` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `hero_image_id` (`hero_image_id`),
  KEY `overview_image_id` (`overview_image_id`),
  KEY `safety_image_id` (`safety_image_id`),
  KEY `excellence_image_id` (`excellence_image_id`),
  KEY `about_page_content_background_image_id_foreign_idx` (`background_image_id`),
  CONSTRAINT `about_page_content_background_image_id_foreign_idx` FOREIGN KEY (`background_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `about_page_content_ibfk_1` FOREIGN KEY (`hero_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `about_page_content_ibfk_2` FOREIGN KEY (`overview_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `about_page_content_ibfk_3` FOREIGN KEY (`safety_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `about_page_content_ibfk_4` FOREIGN KEY (`excellence_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `about_page_content`
--

LOCK TABLES `about_page_content` WRITE;
/*!40000 ALTER TABLE `about_page_content` DISABLE KEYS */;
INSERT INTO `about_page_content` VALUES (1,'About Us','Delivering advanced, affordable medical imaging solutions for more than 30 years.',NULL,NULL,'Adonis Medical Systems, a professionally managed private limited company based in Mohali, India, has been delivering quality medical imaging solutions since 1998. We specialize in a range of advanced imaging technologies, including line-frequency X-rays, high-frequency X-rays, and surgical C-ARMs, all designed with a focus on affordability and precision.',967,'Our Commitment to Safety and Innovation','At Adonis, safety is our top priority. We ensure the well-being of our customers, their patients, and our dedicated team members through rigorous quality control measures. Our products are certified by AERB, BIS, and ISO, CDSCO 13485  reflecting our adherence to the highest standards in the industry. With a relentless focus on modern image processing techniques and ergonomic designs, we continuously innovate to meet the evolving needs of the medical community.',965,'Excellence in Technology, Dedication in Service','Our motto, \"Excellence in Technology, Dedication in Service,\" is brought to life by our highly motivated service personnel and around-the-clock support staff. We believe that our success is measured not by sales figures, but by the positive impact we make on the lives of our customers and their patients.\n\nFor over 30 years, we have been building a market share founded on trust, quality, and well-being.',NULL,'2026-01-07 13:45:29','2026-01-17 07:21:25',955,NULL,NULL);
/*!40000 ALTER TABLE `about_page_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `about_page_global_reach_cards`
--

DROP TABLE IF EXISTS `about_page_global_reach_cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `about_page_global_reach_cards` (
  `id` int NOT NULL AUTO_INCREMENT,
  `icon_class` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_index` int DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `icon_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `about_page_global_reach_cards_icon_id_foreign_idx` (`icon_id`),
  CONSTRAINT `about_page_global_reach_cards_icon_id_foreign_idx` FOREIGN KEY (`icon_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `about_page_global_reach_cards`
--

LOCK TABLES `about_page_global_reach_cards` WRITE;
/*!40000 ALTER TABLE `about_page_global_reach_cards` DISABLE KEYS */;
INSERT INTO `about_page_global_reach_cards` VALUES (1,'ri-global-line','Adonis Medical Systems is driven by the mission to provide state-of-the-art radiology products worldwide.',0,'2026-01-17 07:37:17','2026-01-17 07:57:55',975),(2,'ri-global-line','We empower medical practitioners with the tools and technologies they need to diagnose and treat patients quickly, effectively, and effortlessly.',0,'2026-01-17 07:37:33','2026-01-17 07:47:26',973),(3,'ri-global-line','Our commitment to quality and customer satisfaction continues to fuel our growth and strengthen our presence in the global healthcare market.',0,'2026-01-17 07:37:48','2026-01-17 07:47:42',974);
/*!40000 ALTER TABLE `about_page_global_reach_cards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `about_page_highlights`
--

DROP TABLE IF EXISTS `about_page_highlights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `about_page_highlights` (
  `id` int NOT NULL AUTO_INCREMENT,
  `icon_class` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `text` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `section_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `icon_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `about_page_highlights_icon_id_foreign_idx` (`icon_id`),
  CONSTRAINT `about_page_highlights_icon_id_foreign_idx` FOREIGN KEY (`icon_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `about_page_highlights`
--

LOCK TABLES `about_page_highlights` WRITE;
/*!40000 ALTER TABLE `about_page_highlights` DISABLE KEYS */;
INSERT INTO `about_page_highlights` VALUES (1,'ri-checkbox-circle-fill','Unmatched product reliability',1,'overview','2026-01-07 13:45:29',968),(2,'ri-checkbox-circle-fill','Continuous innovation in radiology',2,'overview','2026-01-07 13:45:29',969),(3,'ri-checkbox-circle-fill','A growing global network of satisfied clients',3,'overview','2026-01-07 13:45:29',970);
/*!40000 ALTER TABLE `about_page_highlights` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `about_page_overview_paragraphs`
--

DROP TABLE IF EXISTS `about_page_overview_paragraphs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `about_page_overview_paragraphs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_index` int DEFAULT '0',
  `position` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `about_page_overview_paragraphs`
--

LOCK TABLES `about_page_overview_paragraphs` WRITE;
/*!40000 ALTER TABLE `about_page_overview_paragraphs` DISABLE KEYS */;
INSERT INTO `about_page_overview_paragraphs` VALUES (1,'Our motivation comes from empowering healthcare providers with the tools they need to make a difference.',0,'after','2026-01-17 07:29:58','2026-01-17 07:29:58'),(2,'We don’t just build equipment; we build trust. Our production facility reflects our commitment to delivering exceptional value through state-of-the-art technology and customer-centric service.',0,'before','2026-01-17 07:30:15','2026-01-17 07:30:15');
/*!40000 ALTER TABLE `about_page_overview_paragraphs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `activity_logs`
--

DROP TABLE IF EXISTS `activity_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `action` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `entity_type` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `entity_id` int DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_entity` (`entity_type`,`entity_id`),
  KEY `idx_created_at` (`created_at`),
  CONSTRAINT `activity_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_logs`
--

LOCK TABLES `activity_logs` WRITE;
/*!40000 ALTER TABLE `activity_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `activity_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `awards`
--

DROP TABLE IF EXISTS `awards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `awards` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `image_id` int DEFAULT NULL,
  `award_date` date DEFAULT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `awards_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `awards`
--

LOCK TABLES `awards` WRITE;
/*!40000 ALTER TABLE `awards` DISABLE KEYS */;
INSERT INTO `awards` VALUES (1,'Partner of the Year 2013 - Asia SonoScape Award','Recognition for outstanding partnership and sales performance',765,'2013-01-01',0,1,'2026-01-07 13:45:32','2026-01-08 11:39:24'),(2,'CURA Certificate of Excellence','Excellence in medical equipment manufacturing',771,NULL,1,1,'2026-01-07 13:45:32','2026-01-08 11:39:24'),(3,'FICCI TANCARE Award','Innovation and quality in healthcare technology',774,NULL,2,1,'2026-01-07 13:45:32','2026-01-08 11:39:24'),(4,'Sunbhakam Communi Ltd Award','Outstanding contribution to medical imaging',777,NULL,3,1,'2026-01-07 13:45:32','2026-01-08 11:39:24'),(5,'Excellence Award','Overall excellence in medical device manufacturing',780,NULL,4,1,'2026-01-07 13:45:32','2026-01-08 11:39:24'),(6,'Medical Equipment Award','Best medical equipment supplier',783,NULL,5,1,'2026-01-07 13:45:32','2026-01-08 11:39:24'),(7,'Quality Recognition Award','Outstanding quality management systems',786,NULL,6,1,'2026-01-07 13:45:32','2026-01-08 11:39:24'),(8,'Industry Excellence Certificate','Industry leadership and innovation',789,NULL,7,1,'2026-01-07 13:45:32','2026-01-08 11:39:24'),(9,'Healthcare Innovation Award','Innovation in healthcare solutions',792,NULL,8,1,'2026-01-07 13:45:32','2026-01-08 11:39:24'),(10,'Medical Technology Award','Advanced medical technology development',795,NULL,9,1,'2026-01-07 13:45:32','2026-01-08 11:39:24');
/*!40000 ALTER TABLE `awards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `awards_page_content`
--

DROP TABLE IF EXISTS `awards_page_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `awards_page_content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hero_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hero_subtitle` text COLLATE utf8mb4_unicode_ci,
  `hero_image_id` int DEFAULT NULL,
  `intro_text` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `hero_image_id` (`hero_image_id`),
  CONSTRAINT `awards_page_content_ibfk_1` FOREIGN KEY (`hero_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `awards_page_content`
--

LOCK TABLES `awards_page_content` WRITE;
/*!40000 ALTER TABLE `awards_page_content` DISABLE KEYS */;
INSERT INTO `awards_page_content` VALUES (1,'Awards & Recognition','Excellence and Innovation Recognized Globally',NULL,'Adonis Medical Systems has been honored with numerous awards and certifications, recognizing our commitment to quality, innovation, and excellence in medical imaging technology.','2026-01-07 13:45:32','2026-01-08 11:41:31');
/*!40000 ALTER TABLE `awards_page_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `careers_page_content`
--

DROP TABLE IF EXISTS `careers_page_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `careers_page_content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hero_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hero_subtitle` text COLLATE utf8mb4_unicode_ci,
  `hero_image_id` int DEFAULT NULL,
  `intro_text` text COLLATE utf8mb4_unicode_ci,
  `intro_image_id` int DEFAULT NULL,
  `life_at_adonis_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `life_at_adonis_background_image_id` int DEFAULT NULL,
  `life_at_adonis_image_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `hero_image_id` (`hero_image_id`),
  KEY `intro_image_id` (`intro_image_id`),
  KEY `life_at_adonis_image_id` (`life_at_adonis_image_id`),
  KEY `fk_careers_life_at_adonis_bg_image` (`life_at_adonis_background_image_id`),
  CONSTRAINT `careers_page_content_ibfk_1` FOREIGN KEY (`hero_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `careers_page_content_ibfk_2` FOREIGN KEY (`intro_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `careers_page_content_ibfk_3` FOREIGN KEY (`life_at_adonis_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_careers_life_at_adonis_bg_image` FOREIGN KEY (`life_at_adonis_background_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `careers_page_content`
--

LOCK TABLES `careers_page_content` WRITE;
/*!40000 ALTER TABLE `careers_page_content` DISABLE KEYS */;
INSERT INTO `careers_page_content` VALUES (1,'Careers','Unlock Your Potential',884,'Join a vibrant team where your skills matter. Unlock your potential at Adonis, where innovation thrives, and every contribution makes a meaningful impact.',899,'Life at Adonis Medical Section',NULL,887,'2026-01-07 13:45:32','2026-01-09 12:25:35');
/*!40000 ALTER TABLE `careers_page_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `certifications`
--

DROP TABLE IF EXISTS `certifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abbreviation` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo_id` int DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `order_index` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `logo_id` (`logo_id`),
  CONSTRAINT `certifications_ibfk_1` FOREIGN KEY (`logo_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certifications`
--

LOCK TABLES `certifications` WRITE;
/*!40000 ALTER TABLE `certifications` DISABLE KEYS */;
INSERT INTO `certifications` VALUES (1,'ISO 13485:2016','ISO',951,'International Organization of Standards',1,1,'2026-01-07 13:45:35'),(2,'Bureau of Indian Standards','BIS',950,'National standards body of India',2,1,'2026-01-07 13:45:35'),(3,'Atomic Energy Regulatory Board','AERB',949,'Indian regulatory authority for radiation safety',3,1,'2026-01-07 13:45:35'),(4,'Make in India','MII',948,'Indian government initiative',4,1,'2026-01-07 13:45:35'),(5,'Central Drugs Standard Control Organisation','CDSCO',947,'Medical device regulatory authority',5,1,'2026-01-07 13:45:35');
/*!40000 ALTER TABLE `certifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo_id` int DEFAULT NULL,
  `website_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `logo_id` (`logo_id`),
  CONSTRAINT `clients_ibfk_1` FOREIGN KEY (`logo_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (25,'Client 06',877,NULL,0,1,'2026-01-08 10:55:24','2026-01-08 11:12:14'),(26,'Client 03',691,NULL,1,1,'2026-01-08 10:55:24','2026-01-08 11:10:55'),(27,'Client 14',713,NULL,2,1,'2026-01-08 10:55:24','2026-01-08 11:10:44'),(28,'Client 11',707,NULL,3,1,'2026-01-08 10:55:24','2026-01-08 11:10:44'),(29,'Client 02',689,NULL,4,1,'2026-01-08 10:55:24','2026-01-08 11:10:44'),(30,'Client 16',717,NULL,5,1,'2026-01-08 10:55:24','2026-01-08 11:10:44'),(31,'Client 18',721,NULL,6,1,'2026-01-08 10:55:24','2026-01-08 11:10:44'),(32,'Client 01',687,NULL,7,1,'2026-01-08 10:55:24','2026-01-08 11:10:44'),(33,'Client 22',729,NULL,8,1,'2026-01-08 10:55:24','2026-01-08 11:10:44'),(34,'Client 13',711,NULL,9,1,'2026-01-08 10:55:24','2026-01-08 11:10:44'),(35,'Client 09',703,NULL,10,1,'2026-01-08 10:55:24','2026-01-08 11:10:44'),(36,'Client 17',719,NULL,11,1,'2026-01-08 10:55:24','2026-01-08 11:10:44'),(37,'Client 23',731,NULL,12,1,'2026-01-08 10:55:24','2026-01-08 11:10:44'),(38,'Client 15',715,NULL,13,1,'2026-01-08 10:55:24','2026-01-08 11:10:44'),(39,'Client 08',701,NULL,14,1,'2026-01-08 10:55:24','2026-01-08 11:10:44'),(40,'Client 10',705,NULL,15,1,'2026-01-08 10:55:24','2026-01-08 11:10:44'),(41,'Client 12',709,NULL,16,1,'2026-01-08 10:55:25','2026-01-08 11:10:44'),(42,'Client 21',727,NULL,17,1,'2026-01-08 10:55:25','2026-01-08 11:10:44'),(43,'Client 04',693,NULL,18,1,'2026-01-08 10:55:25','2026-01-08 11:10:44'),(44,'Client 05',695,NULL,19,1,'2026-01-08 10:55:25','2026-01-08 11:10:44'),(45,'Client 24',733,NULL,20,1,'2026-01-08 10:55:25','2026-01-08 11:10:44'),(46,'Client 19',723,NULL,21,1,'2026-01-08 10:55:25','2026-01-08 11:10:44'),(47,'Client 07',699,NULL,22,1,'2026-01-08 10:55:25','2026-01-08 11:10:45'),(48,'Client 20',725,NULL,23,1,'2026-01-08 10:55:25','2026-01-08 11:10:45');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients_page_content`
--

DROP TABLE IF EXISTS `clients_page_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients_page_content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hero_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hero_subtitle` text COLLATE utf8mb4_unicode_ci,
  `hero_image_id` int DEFAULT NULL,
  `intro_text` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `hero_image_id` (`hero_image_id`),
  CONSTRAINT `clients_page_content_ibfk_1` FOREIGN KEY (`hero_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients_page_content`
--

LOCK TABLES `clients_page_content` WRITE;
/*!40000 ALTER TABLE `clients_page_content` DISABLE KEYS */;
INSERT INTO `clients_page_content` VALUES (1,'Our Clients','Trusted by Healthcare Leaders Worldwide',NULL,'We are proud to serve leading healthcare institutions across the globe with our state-of-the-art medical imaging solutions.','2026-01-07 13:45:35','2026-01-08 10:45:37');
/*!40000 ALTER TABLE `clients_page_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_info`
--

DROP TABLE IF EXISTS `contact_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_line1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_line2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postal_code` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `support_email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `google_maps_embed_url` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_info`
--

LOCK TABLES `contact_info` WRITE;
/*!40000 ALTER TABLE `contact_info` DISABLE KEYS */;
INSERT INTO `contact_info` VALUES (1,'ADONIS MEDICAL SYSTEMS PVT LTD','E-70, PHASE- VIII','INDUSTRIAL AREA','MOHALI','Punjab','160071','India','9872003273','info@adonismedical.com','support@adonismedical.com','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8662069534!2d80.2707!3d13.0827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDA0JzU3LjciTiA4MMKwMTYnMTQuNSJF!5e0!3m2!1sen!2sin!4v1234567890','2026-01-07 13:44:48','2026-01-12 06:31:51');
/*!40000 ALTER TABLE `contact_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_submissions`
--

DROP TABLE IF EXISTS `contact_submissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_submissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci,
  `source` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT 'contact-us',
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `status` enum('new','read','replied','archived') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'new',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_submissions`
--

LOCK TABLES `contact_submissions` WRITE;
/*!40000 ALTER TABLE `contact_submissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `contact_submissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_us_page_content`
--

DROP TABLE IF EXISTS `contact_us_page_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_us_page_content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hero_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hero_subtitle` text COLLATE utf8mb4_unicode_ci,
  `intro_text` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_us_page_content`
--

LOCK TABLES `contact_us_page_content` WRITE;
/*!40000 ALTER TABLE `contact_us_page_content` DISABLE KEYS */;
INSERT INTO `contact_us_page_content` VALUES (1,'Contact Us','Have a question or need more information? Submit your enquiry and our team will get back to you with the details you need.','hii','2026-01-07 13:45:35','2026-01-12 06:11:50');
/*!40000 ALTER TABLE `contact_us_page_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `content_versions`
--

DROP TABLE IF EXISTS `content_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `content_versions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `entity_type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `entity_id` int NOT NULL,
  `content_snapshot` json NOT NULL,
  `version_number` int NOT NULL,
  `changed_by` int DEFAULT NULL,
  `change_description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `changed_by` (`changed_by`),
  KEY `idx_entity` (`entity_type`,`entity_id`),
  KEY `idx_created_at` (`created_at`),
  CONSTRAINT `content_versions_ibfk_1` FOREIGN KEY (`changed_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content_versions`
--

LOCK TABLES `content_versions` WRITE;
/*!40000 ALTER TABLE `content_versions` DISABLE KEYS */;
/*!40000 ALTER TABLE `content_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `demo_requests`
--

DROP TABLE IF EXISTS `demo_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `demo_requests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hospital_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `preferred_date` date NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `status` enum('pending','scheduled','completed','cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `demo_requests`
--

LOCK TABLES `demo_requests` WRITE;
/*!40000 ALTER TABLE `demo_requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `demo_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `digital_radiography_features`
--

DROP TABLE IF EXISTS `digital_radiography_features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `digital_radiography_features` (
  `id` int NOT NULL AUTO_INCREMENT,
  `feature_text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `digital_radiography_features`
--

LOCK TABLES `digital_radiography_features` WRITE;
/*!40000 ALTER TABLE `digital_radiography_features` DISABLE KEYS */;
INSERT INTO `digital_radiography_features` VALUES (5,'High Frequency X-Ray Machines are powered to meet all Radiological needs at an affordable price. APR (Anatomical Program Register) based High Frequency makes System precise and complete.',NULL,5,'2026-01-07 13:45:38'),(6,'Soft Touch Key Pad with Auto Programmable Features with option to Reprogram the settings.',NULL,6,'2026-01-07 13:45:38'),(7,'Microprocessor Based System with Digital Display of Applied Factors on LCD.',NULL,7,'2026-01-07 13:45:38'),(8,'14\" x 17\" portable Wi-Fi FPD',NULL,8,'2026-01-07 13:45:38'),(9,'Reconstruction of images <2 seconds',NULL,9,'2026-01-07 13:45:38'),(10,'Mobile patient table',NULL,10,'2026-01-07 13:45:38'),(11,'Dicom compatibility',NULL,11,'2026-01-07 13:45:38'),(12,'Dual Battery: Hot Swap ÔÇô 60s, Image Never Loss, Always Watching.',NULL,12,'2026-01-07 13:45:38');
/*!40000 ALTER TABLE `digital_radiography_features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `digital_radiography_highlights`
--

DROP TABLE IF EXISTS `digital_radiography_highlights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `digital_radiography_highlights` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subtitle` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `digital_radiography_highlights`
--

LOCK TABLES `digital_radiography_highlights` WRITE;
/*!40000 ALTER TABLE `digital_radiography_highlights` DISABLE KEYS */;
INSERT INTO `digital_radiography_highlights` VALUES (1,'TRANSFER IN A FLASH','With specialized antenna design, our product can achieve fast transfer and receive strong signal at anytime and anywhere. Full image can be received within 2 seconds, achieving one of the fastest in the world.',1,'2026-01-20 06:36:29','2026-01-20 06:36:29'),(2,'FEATHERWEIGHT DESIGN','In order to enhance the mobility, the Panel weight only 2.7kg Including battery, making it effortless to carry around.',2,'2026-01-20 06:36:29','2026-01-20 06:36:29'),(3,'EASY CLEANING','The detector is IPX6-rated for water resistant, allowing user to clean it easily.',3,'2026-01-20 06:36:29','2026-01-20 06:36:29'),(4,'AWARDS','1) Excellence awards by MSMECCII 2) Silver award in the Micro & Small Enterprise category in the First CII-AMTZ MedTech Quality Champion Award, 2024.',4,'2026-01-20 06:36:29','2026-01-20 06:36:29');
/*!40000 ALTER TABLE `digital_radiography_highlights` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `digital_radiography_hospitals`
--

DROP TABLE IF EXISTS `digital_radiography_hospitals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `digital_radiography_hospitals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hospital_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hospital_logo_id` int DEFAULT NULL,
  `order_index` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `hospital_logo_id` (`hospital_logo_id`),
  CONSTRAINT `digital_radiography_hospitals_ibfk_1` FOREIGN KEY (`hospital_logo_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `digital_radiography_hospitals`
--

LOCK TABLES `digital_radiography_hospitals` WRITE;
/*!40000 ALTER TABLE `digital_radiography_hospitals` DISABLE KEYS */;
/*!40000 ALTER TABLE `digital_radiography_hospitals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `digital_radiography_images`
--

DROP TABLE IF EXISTS `digital_radiography_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `digital_radiography_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_id` int NOT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `is_primary` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `digital_radiography_images_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `media` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `digital_radiography_images`
--

LOCK TABLES `digital_radiography_images` WRITE;
/*!40000 ALTER TABLE `digital_radiography_images` DISABLE KEYS */;
INSERT INTO `digital_radiography_images` VALUES (1,993,0,0),(2,994,1,0),(3,995,2,0),(4,996,3,0),(5,997,4,0);
/*!40000 ALTER TABLE `digital_radiography_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `digital_radiography_page_content`
--

DROP TABLE IF EXISTS `digital_radiography_page_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `digital_radiography_page_content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `main_image_id` int DEFAULT NULL,
  `deployment_info` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `short_description` text COLLATE utf8mb4_unicode_ci,
  `full_description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `product_gallery_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'Product Gallery',
  `our_products_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'Our Products',
  `hospitals_served_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'Hospitals Served',
  `enquire_button_text` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT 'Enquire Now',
  `hospitals_background_image_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `main_image_id` (`main_image_id`),
  KEY `hospitals_background_image_id` (`hospitals_background_image_id`),
  CONSTRAINT `digital_radiography_page_content_ibfk_1` FOREIGN KEY (`main_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `digital_radiography_page_content_ibfk_2` FOREIGN KEY (`hospitals_background_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `digital_radiography_page_content`
--

LOCK TABLES `digital_radiography_page_content` WRITE;
/*!40000 ALTER TABLE `digital_radiography_page_content` DISABLE KEYS */;
INSERT INTO `digital_radiography_page_content` VALUES (1,'Digital Radiography',NULL,'Deployed Across 25+ Bases',NULL,'High-speed digital radiography with wireless FPD','2026-01-07 13:45:38','2026-01-19 10:38:50','Product Gallery','Our Products','Hospitals Served','Enquire Now',NULL);
/*!40000 ALTER TABLE `digital_radiography_page_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `digital_radiography_variants`
--

DROP TABLE IF EXISTS `digital_radiography_variants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `digital_radiography_variants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `variant_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `digital_radiography_variants`
--

LOCK TABLES `digital_radiography_variants` WRITE;
/*!40000 ALTER TABLE `digital_radiography_variants` DISABLE KEYS */;
INSERT INTO `digital_radiography_variants` VALUES (1,'Standard Model',1,1,'2026-01-07 13:45:38');
/*!40000 ALTER TABLE `digital_radiography_variants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dream_series_features`
--

DROP TABLE IF EXISTS `dream_series_features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dream_series_features` (
  `id` int NOT NULL AUTO_INCREMENT,
  `feature_text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dream_series_features`
--

LOCK TABLES `dream_series_features` WRITE;
/*!40000 ALTER TABLE `dream_series_features` DISABLE KEYS */;
INSERT INTO `dream_series_features` VALUES (1,'Single detector',1,'2026-01-07 13:45:38'),(2,'Tube mounted on a 3D ceiling Mount for vertical Auto Tracking and Auto positioning',2,'2026-01-07 13:45:38'),(3,'Superior image quality through high-spatial resolution',3,'2026-01-07 13:45:38'),(4,'Auto exposure settings and reset programs for faster patient throughput',4,'2026-01-07 13:45:38'),(5,'Vertical movement (motorized and manual) for ease of positioning',5,'2026-01-07 13:45:38'),(6,'Wired/wireless detectors',6,'2026-01-07 13:45:38'),(7,'Auto-stitching option available',7,'2026-01-07 13:45:38');
/*!40000 ALTER TABLE `dream_series_features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dream_series_hospitals`
--

DROP TABLE IF EXISTS `dream_series_hospitals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dream_series_hospitals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hospital_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hospital_logo_id` int DEFAULT NULL,
  `order_index` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `hospital_logo_id` (`hospital_logo_id`),
  CONSTRAINT `dream_series_hospitals_ibfk_1` FOREIGN KEY (`hospital_logo_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dream_series_hospitals`
--

LOCK TABLES `dream_series_hospitals` WRITE;
/*!40000 ALTER TABLE `dream_series_hospitals` DISABLE KEYS */;
/*!40000 ALTER TABLE `dream_series_hospitals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dream_series_images`
--

DROP TABLE IF EXISTS `dream_series_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dream_series_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_id` int NOT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `is_primary` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `dream_series_images_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `media` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dream_series_images`
--

LOCK TABLES `dream_series_images` WRITE;
/*!40000 ALTER TABLE `dream_series_images` DISABLE KEYS */;
INSERT INTO `dream_series_images` VALUES (1,998,0,0);
/*!40000 ALTER TABLE `dream_series_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dream_series_page_content`
--

DROP TABLE IF EXISTS `dream_series_page_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dream_series_page_content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `main_image_id` int DEFAULT NULL,
  `deployment_info` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `short_description` text COLLATE utf8mb4_unicode_ci,
  `full_description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `product_gallery_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'Product Gallery',
  `our_products_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'Our Products',
  `hospitals_served_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'Hospitals Served',
  `enquire_button_text` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT 'Enquire Now',
  `hospitals_background_image_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `main_image_id` (`main_image_id`),
  KEY `hospitals_background_image_id` (`hospitals_background_image_id`),
  CONSTRAINT `dream_series_page_content_ibfk_1` FOREIGN KEY (`main_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `dream_series_page_content_ibfk_2` FOREIGN KEY (`hospitals_background_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dream_series_page_content`
--

LOCK TABLES `dream_series_page_content` WRITE;
/*!40000 ALTER TABLE `dream_series_page_content` DISABLE KEYS */;
INSERT INTO `dream_series_page_content` VALUES (1,'Dream Series-Ceiling Suspended',NULL,NULL,NULL,'Single detector tube mounted on a 3D ceiling Mount for vertical Auto Tracking and Auto positioning','2026-01-07 13:45:38','2026-01-19 10:39:01','Product Gallery','Our Products','Hospitals Served','Enquire Now',NULL);
/*!40000 ALTER TABLE `dream_series_page_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dream_series_variants`
--

DROP TABLE IF EXISTS `dream_series_variants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dream_series_variants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `variant_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dream_series_variants`
--

LOCK TABLES `dream_series_variants` WRITE;
/*!40000 ALTER TABLE `dream_series_variants` DISABLE KEYS */;
INSERT INTO `dream_series_variants` VALUES (1,'6KW single phase',1,1,'2026-01-07 13:45:38'),(2,'10 KW single phase',2,1,'2026-01-07 13:45:38'),(3,'30KW single phase',3,1,'2026-01-07 13:45:38');
/*!40000 ALTER TABLE `dream_series_variants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email_settings`
--

DROP TABLE IF EXISTS `email_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `smtp_host` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `smtp_port` int NOT NULL,
  `smtp_username` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `smtp_password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `smtp_encryption` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `from_email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `from_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_settings`
--

LOCK TABLES `email_settings` WRITE;
/*!40000 ALTER TABLE `email_settings` DISABLE KEYS */;
/*!40000 ALTER TABLE `email_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faqs_items`
--

DROP TABLE IF EXISTS `faqs_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faqs_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `answer` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_id` int DEFAULT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `faqs_items_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faqs_items`
--

LOCK TABLES `faqs_items` WRITE;
/*!40000 ALTER TABLE `faqs_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `faqs_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faqs_page`
--

DROP TABLE IF EXISTS `faqs_page`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faqs_page` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hero_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hero_subtitle` text COLLATE utf8mb4_unicode_ci,
  `background_image_id` int DEFAULT NULL,
  `section_background_image_id` int DEFAULT NULL,
  `title_color` varchar(7) COLLATE utf8mb4_unicode_ci DEFAULT '#FFFFFF',
  `subtitle_color` varchar(7) COLLATE utf8mb4_unicode_ci DEFAULT '#FFFFFF',
  `overlay_opacity` int DEFAULT '40',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `background_image_id` (`background_image_id`),
  KEY `fk_faqs_section_bg_image` (`section_background_image_id`),
  CONSTRAINT `faqs_page_ibfk_1` FOREIGN KEY (`background_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_faqs_section_bg_image` FOREIGN KEY (`section_background_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faqs_page`
--

LOCK TABLES `faqs_page` WRITE;
/*!40000 ALTER TABLE `faqs_page` DISABLE KEYS */;
INSERT INTO `faqs_page` VALUES (1,'Frequently Asked Questions','Find answers to common questions about our products and services.',NULL,NULL,'#FFFFFF','#FFFFFF',40,'2026-01-13 06:12:00','2026-01-13 06:12:00');
/*!40000 ALTER TABLE `faqs_page` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `footer_links`
--

DROP TABLE IF EXISTS `footer_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `footer_links` (
  `id` int NOT NULL AUTO_INCREMENT,
  `footer_section_id` int NOT NULL,
  `label` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon_svg` text COLLATE utf8mb4_unicode_ci COMMENT 'SVG icon code or path for the link',
  `icon_image_id` int DEFAULT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `idx_section` (`footer_section_id`),
  KEY `idx_order` (`order_index`),
  KEY `fk_footer_links_icon_image` (`icon_image_id`),
  CONSTRAINT `fk_footer_links_icon_image` FOREIGN KEY (`icon_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `footer_links_ibfk_1` FOREIGN KEY (`footer_section_id`) REFERENCES `footer_sections` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `footer_links`
--

LOCK TABLES `footer_links` WRITE;
/*!40000 ALTER TABLE `footer_links` DISABLE KEYS */;
INSERT INTO `footer_links` VALUES (1,1,'Home','/',NULL,NULL,1),(2,1,'About Us','/about',NULL,NULL,2),(3,1,'Management','/management',NULL,NULL,3),(4,1,'Our Presence','/our-presence',NULL,NULL,4),(5,1,'Quality Assurance','/quality-assurance',NULL,NULL,5),(6,1,'Careers','/careers',NULL,NULL,6),(7,1,'Our Specialties','/specialties',NULL,NULL,7),(8,1,'FAQ','/faqs','',NULL,8),(9,2,'HF Mobile','/products/hf-mobile',NULL,NULL,1),(10,2,'HF Fixed','/products/hf-fixed',NULL,NULL,2),(11,2,'1K*1K High End HF C-ARM','/products/1k1k-high-end-hf-c-arm',NULL,NULL,3),(12,2,'Line Frequency X-Ray Systems','/products/line-frequency-x-ray-systems',NULL,NULL,4),(13,2,'Digital Radiography','/products/digital-radiography',NULL,NULL,5),(14,2,'Dream Series-Ceiling Suspended','/products/dream-series-ceiling-suspended',NULL,NULL,6),(15,2,'FPD-C-Arm','/products/fpd-c-arm',NULL,NULL,7),(16,3,' Phone','9872003273',NULL,901,0),(17,3,'Email','info@adonismedical.com',NULL,902,1),(18,3,'Location','E-70, PHASE- VIII, INDUSTRIAL AREA, MOHALI, 160071.',NULL,903,2),(19,1,'Request a Demo','/request-demo',NULL,NULL,8),(20,1,'Terms and Conditions','/terms-and-conditions',NULL,NULL,9),(21,1,'Privacy Policy','/privacy-policy',NULL,NULL,10);
/*!40000 ALTER TABLE `footer_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `footer_logos`
--

DROP TABLE IF EXISTS `footer_logos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `footer_logos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'refex or adonis',
  `logo_image_id` int DEFAULT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `logo_image_id` (`logo_image_id`),
  CONSTRAINT `footer_logos_ibfk_1` FOREIGN KEY (`logo_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `footer_logos`
--

LOCK TABLES `footer_logos` WRITE;
/*!40000 ALTER TABLE `footer_logos` DISABLE KEYS */;
INSERT INTO `footer_logos` VALUES (1,'refex',900,0,1,'2026-01-09 12:27:40','2026-01-09 12:27:40');
/*!40000 ALTER TABLE `footer_logos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `footer_sections`
--

DROP TABLE IF EXISTS `footer_sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `footer_sections` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_order` (`order_index`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `footer_sections`
--

LOCK TABLES `footer_sections` WRITE;
/*!40000 ALTER TABLE `footer_sections` DISABLE KEYS */;
INSERT INTO `footer_sections` VALUES (1,'Quick Links',1,'2026-01-07 13:44:48','2026-01-08 06:00:18'),(2,'Our Products',2,'2026-01-07 13:44:48','2026-01-08 06:00:18'),(3,'Contact Information',3,'2026-01-07 13:44:48','2026-01-08 06:00:18');
/*!40000 ALTER TABLE `footer_sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `form_submissions_contact`
--

DROP TABLE IF EXISTS `form_submissions_contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `form_submissions_contact` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `page_source` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `status` enum('new','read','replied','archived') COLLATE utf8mb4_unicode_ci DEFAULT 'new',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_status` (`status`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `form_submissions_contact`
--

LOCK TABLES `form_submissions_contact` WRITE;
/*!40000 ALTER TABLE `form_submissions_contact` DISABLE KEYS */;
/*!40000 ALTER TABLE `form_submissions_contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `form_submissions_demo`
--

DROP TABLE IF EXISTS `form_submissions_demo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `form_submissions_demo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hospital_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `preferred_date` date NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('new','scheduled','completed','cancelled') COLLATE utf8mb4_unicode_ci DEFAULT 'new',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_status` (`status`),
  KEY `idx_preferred_date` (`preferred_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `form_submissions_demo`
--

LOCK TABLES `form_submissions_demo` WRITE;
/*!40000 ALTER TABLE `form_submissions_demo` DISABLE KEYS */;
/*!40000 ALTER TABLE `form_submissions_demo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fpd_c_arm_features`
--

DROP TABLE IF EXISTS `fpd_c_arm_features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fpd_c_arm_features` (
  `id` int NOT NULL AUTO_INCREMENT,
  `feature_text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fpd_c_arm_features`
--

LOCK TABLES `fpd_c_arm_features` WRITE;
/*!40000 ALTER TABLE `fpd_c_arm_features` DISABLE KEYS */;
INSERT INTO `fpd_c_arm_features` VALUES (1,'Applications in Orthopedics, Urology, Neurology, Gastrointestinal and in Pain management.',1,'2026-01-07 13:45:38'),(2,'Cesium iodide based Flat Panel Detector (FPD) provides high resolution and contrast imaging.',2,'2026-01-07 13:45:38'),(3,'Large Field of View (FOV): Captures more anatomical details in a single image.',3,'2026-01-07 13:45:38'),(4,'Reduced radiation dose for high quality images.',4,'2026-01-07 13:45:38'),(5,'Advanced dose management settings to optimize radiation exposure.',5,'2026-01-07 13:45:38'),(6,'More efficient workflow with ADONIS TIALIC technology (Time-Independent Adaptive Low-dose Image Correction) to optimize radiation exposure.',6,'2026-01-07 13:45:38'),(7,'Low signal to noise ratio, provides uniform image clarity.',7,'2026-01-07 13:45:38'),(8,'Wireless and digital storage for easy integration with PACs and hospital networks.',8,'2026-01-07 13:45:38'),(9,'Compact design enables flexibility of use in small spaces and integration with other hospital systems.',9,'2026-01-07 13:45:38');
/*!40000 ALTER TABLE `fpd_c_arm_features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fpd_c_arm_hospitals`
--

DROP TABLE IF EXISTS `fpd_c_arm_hospitals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fpd_c_arm_hospitals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hospital_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hospital_logo_id` int DEFAULT NULL,
  `order_index` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `hospital_logo_id` (`hospital_logo_id`),
  CONSTRAINT `fpd_c_arm_hospitals_ibfk_1` FOREIGN KEY (`hospital_logo_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fpd_c_arm_hospitals`
--

LOCK TABLES `fpd_c_arm_hospitals` WRITE;
/*!40000 ALTER TABLE `fpd_c_arm_hospitals` DISABLE KEYS */;
/*!40000 ALTER TABLE `fpd_c_arm_hospitals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fpd_c_arm_images`
--

DROP TABLE IF EXISTS `fpd_c_arm_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fpd_c_arm_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_id` int NOT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `is_primary` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `fpd_c_arm_images_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `media` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fpd_c_arm_images`
--

LOCK TABLES `fpd_c_arm_images` WRITE;
/*!40000 ALTER TABLE `fpd_c_arm_images` DISABLE KEYS */;
INSERT INTO `fpd_c_arm_images` VALUES (1,984,0,0),(2,985,1,0),(3,986,2,0);
/*!40000 ALTER TABLE `fpd_c_arm_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fpd_c_arm_page_content`
--

DROP TABLE IF EXISTS `fpd_c_arm_page_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fpd_c_arm_page_content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `main_image_id` int DEFAULT NULL,
  `deployment_info` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `short_description` text COLLATE utf8mb4_unicode_ci,
  `full_description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `product_gallery_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'Product Gallery',
  `our_products_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'Our Products',
  `hospitals_served_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'Hospitals Served',
  `enquire_button_text` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT 'Enquire Now',
  `hospitals_background_image_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `main_image_id` (`main_image_id`),
  KEY `hospitals_background_image_id` (`hospitals_background_image_id`),
  CONSTRAINT `fpd_c_arm_page_content_ibfk_1` FOREIGN KEY (`main_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fpd_c_arm_page_content_ibfk_2` FOREIGN KEY (`hospitals_background_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fpd_c_arm_page_content`
--

LOCK TABLES `fpd_c_arm_page_content` WRITE;
/*!40000 ALTER TABLE `fpd_c_arm_page_content` DISABLE KEYS */;
INSERT INTO `fpd_c_arm_page_content` VALUES (1,'FPD-C-Arm',987,'Deployed Across 30+ Bases',NULL,'The in-house designed and developed, made-in-India, the FPD C-Arm is an advanced solution to perform high end surgeries.','2026-01-07 13:45:38','2026-01-20 05:20:32','Product Gallery','Our Products','Hospitals Served','Enquire Now',NULL);
/*!40000 ALTER TABLE `fpd_c_arm_page_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fpd_c_arm_variants`
--

DROP TABLE IF EXISTS `fpd_c_arm_variants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fpd_c_arm_variants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `variant_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fpd_c_arm_variants`
--

LOCK TABLES `fpd_c_arm_variants` WRITE;
/*!40000 ALTER TABLE `fpd_c_arm_variants` DISABLE KEYS */;
INSERT INTO `fpd_c_arm_variants` VALUES (1,'3.5 KW single phase',1,1,'2026-01-07 13:45:38'),(2,'6 KW single phase',2,1,'2026-01-07 13:45:38');
/*!40000 ALTER TABLE `fpd_c_arm_variants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `global_settings`
--

DROP TABLE IF EXISTS `global_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `global_settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `setting_key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `setting_value` text COLLATE utf8mb4_unicode_ci,
  `setting_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT 'text',
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `setting_key` (`setting_key`),
  KEY `idx_key` (`setting_key`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `global_settings`
--

LOCK TABLES `global_settings` WRITE;
/*!40000 ALTER TABLE `global_settings` DISABLE KEYS */;
INSERT INTO `global_settings` VALUES (1,'site_name','Adonis Medical Systems','text','Site name','2026-01-07 13:44:48','2026-01-07 13:44:48'),(2,'site_tagline','Excellence In Technology, Dedication in Service','text','Site tagline','2026-01-07 13:44:48','2026-01-07 13:44:48'),(3,'meta_title','Adonis Medical Systems - Excellence In Technology, Dedication in Service','text','Default meta title','2026-01-07 13:44:48','2026-01-07 13:44:48'),(4,'meta_description','Adonis Medical Systems - Leader in medical imaging with 30+ years of experience in X-ray solutions.','textarea','Default meta description','2026-01-07 13:44:48','2026-01-07 13:44:48'),(5,'meta_keywords','medical imaging, x-ray systems, digital radiography, c-arm, medical equipment, healthcare technology','textarea','Default meta keywords','2026-01-07 13:44:48','2026-01-07 13:44:48'),(6,'primary_color','#7DC244','color','Primary brand color','2026-01-07 13:44:48','2026-01-07 13:44:48'),(7,'secondary_color','#FF6B35','color','Secondary brand color','2026-01-07 13:44:48','2026-01-07 13:44:48'),(8,'logo_url','https://www.adonismedical.com/wp-content/uploads/2024/09/logo_adonis_4x-1.svg','text','Main logo URL','2026-01-07 13:44:48','2026-01-07 13:44:48'),(9,'logo_height','48','number','Logo height in pixels','2026-01-07 13:44:48','2026-01-07 13:44:48'),(10,'favicon_url','https://www.adonismedical.com/wp-content/uploads/2025/11/cropped-adoinis-favicon-270x270.jpg','text','Favicon URL','2026-01-07 13:44:48','2026-01-07 13:44:48'),(11,'footer_logo_url','https://www.adonismedical.com/wp-content/uploads/2024/09/logo_adonis_4x-1-1.svg','text','Footer logo URL','2026-01-07 13:44:48','2026-01-07 13:44:48'),(12,'copyright_text','┬® Worldwide Copyright Reserved. ADONIS MEDICAL SYSTEMS PVT LTD','text','Copyright text','2026-01-07 13:44:48','2026-01-07 13:44:48');
/*!40000 ALTER TABLE `global_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hf_c_arm_1k_features`
--

DROP TABLE IF EXISTS `hf_c_arm_1k_features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hf_c_arm_1k_features` (
  `id` int NOT NULL AUTO_INCREMENT,
  `feature_text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hf_c_arm_1k_features`
--

LOCK TABLES `hf_c_arm_1k_features` WRITE;
/*!40000 ALTER TABLE `hf_c_arm_1k_features` DISABLE KEYS */;
INSERT INTO `hf_c_arm_1k_features` VALUES (1,'High resolution images with the 1kx1K camera technology',1,'2026-01-07 13:45:38'),(2,'Smooth and ergonomically compact design',2,'2026-01-07 13:45:38'),(3,'High definition 1K x 1K CCD camera',3,'2026-01-07 13:45:38'),(4,'Accurate and silent vertical actuator movement',4,'2026-01-07 13:45:38'),(5,'Easy user adjustable handle locks',5,'2026-01-07 13:45:38'),(6,'Soft and effortless horizontal slider movement',6,'2026-01-07 13:45:38'),(7,'Rigid design to withstand environmental conditions',7,'2026-01-07 13:45:38'),(8,'In-built rubber buffers and limiters for moving parts',8,'2026-01-07 13:45:38'),(9,'Applications in Orthopedics, Urology, Gastrointestinal and in Pain management.',9,'2026-01-07 13:45:38');
/*!40000 ALTER TABLE `hf_c_arm_1k_features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hf_c_arm_1k_hospitals`
--

DROP TABLE IF EXISTS `hf_c_arm_1k_hospitals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hf_c_arm_1k_hospitals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hospital_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hospital_logo_id` int DEFAULT NULL,
  `order_index` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `hospital_logo_id` (`hospital_logo_id`),
  CONSTRAINT `hf_c_arm_1k_hospitals_ibfk_1` FOREIGN KEY (`hospital_logo_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hf_c_arm_1k_hospitals`
--

LOCK TABLES `hf_c_arm_1k_hospitals` WRITE;
/*!40000 ALTER TABLE `hf_c_arm_1k_hospitals` DISABLE KEYS */;
/*!40000 ALTER TABLE `hf_c_arm_1k_hospitals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hf_c_arm_1k_images`
--

DROP TABLE IF EXISTS `hf_c_arm_1k_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hf_c_arm_1k_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_id` int NOT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `is_primary` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `hf_c_arm_1k_images_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `media` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hf_c_arm_1k_images`
--

LOCK TABLES `hf_c_arm_1k_images` WRITE;
/*!40000 ALTER TABLE `hf_c_arm_1k_images` DISABLE KEYS */;
INSERT INTO `hf_c_arm_1k_images` VALUES (1,988,0,1),(2,989,1,0),(3,990,2,0);
/*!40000 ALTER TABLE `hf_c_arm_1k_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hf_c_arm_1k_page_content`
--

DROP TABLE IF EXISTS `hf_c_arm_1k_page_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hf_c_arm_1k_page_content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `main_image_id` int DEFAULT NULL,
  `deployment_info` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `short_description` text COLLATE utf8mb4_unicode_ci,
  `full_description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `product_gallery_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'Product Gallery',
  `our_products_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'Our Products',
  `hospitals_served_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'Hospitals Served',
  `enquire_button_text` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT 'Enquire Now',
  PRIMARY KEY (`id`),
  KEY `main_image_id` (`main_image_id`),
  CONSTRAINT `hf_c_arm_1k_page_content_ibfk_1` FOREIGN KEY (`main_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hf_c_arm_1k_page_content`
--

LOCK TABLES `hf_c_arm_1k_page_content` WRITE;
/*!40000 ALTER TABLE `hf_c_arm_1k_page_content` DISABLE KEYS */;
INSERT INTO `hf_c_arm_1k_page_content` VALUES (1,'1K*1K High End HF C-ARM/0.5K High End HF C-ARM',NULL,'Deployed Across 40+ Bases',NULL,'High resolution images with the 1kx1K camera technology','2026-01-07 13:45:38','2026-01-20 05:21:37','Product Gallery','Our Products','Hospitals Served','Enquire Now');
/*!40000 ALTER TABLE `hf_c_arm_1k_page_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hf_c_arm_1k_variants`
--

DROP TABLE IF EXISTS `hf_c_arm_1k_variants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hf_c_arm_1k_variants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `variant_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hf_c_arm_1k_variants`
--

LOCK TABLES `hf_c_arm_1k_variants` WRITE;
/*!40000 ALTER TABLE `hf_c_arm_1k_variants` DISABLE KEYS */;
INSERT INTO `hf_c_arm_1k_variants` VALUES (1,'6KW single phase',1,1,'2026-01-07 13:45:38'),(2,'10 KW single phase',2,1,'2026-01-07 13:45:38'),(3,'30KW single phase',3,1,'2026-01-07 13:45:38');
/*!40000 ALTER TABLE `hf_c_arm_1k_variants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hf_fixed_features`
--

DROP TABLE IF EXISTS `hf_fixed_features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hf_fixed_features` (
  `id` int NOT NULL AUTO_INCREMENT,
  `feature_text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hf_fixed_features`
--

LOCK TABLES `hf_fixed_features` WRITE;
/*!40000 ALTER TABLE `hf_fixed_features` DISABLE KEYS */;
INSERT INTO `hf_fixed_features` VALUES (1,'200 pre-programmed APR (Anatomical Program Register) function keys with pre-defined KVp and mAs values.',1,'2026-01-07 13:45:38'),(2,'Separate control panel stand with sleek and light weight design.',2,'2026-01-07 13:45:38'),(3,'Special function settings for various anatomical framework.',3,'2026-01-07 13:45:38'),(4,'12 blank keys for user based programming and factory recall.',4,'2026-01-07 13:45:38'),(5,'Microprocessor based protection with machine self diagnostic check.',5,'2026-01-07 13:45:38'),(6,'Automatic Bucky stand / table selection.',6,'2026-01-07 13:45:38'),(7,'Excellent image quality in Lumbar spine and for specialised applications for obese patients.',7,'2026-01-07 13:45:38'),(8,'Short time exposure allows for easy acquisition of instantaneous images. Reduced breathing artifacts.',8,'2026-01-07 13:45:38'),(9,'Available in conventional and digital X-ray configurations.',9,'2026-01-07 13:45:38');
/*!40000 ALTER TABLE `hf_fixed_features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hf_fixed_hospitals`
--

DROP TABLE IF EXISTS `hf_fixed_hospitals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hf_fixed_hospitals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hospital_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hospital_logo_id` int DEFAULT NULL,
  `order_index` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `hospital_logo_id` (`hospital_logo_id`),
  CONSTRAINT `hf_fixed_hospitals_ibfk_1` FOREIGN KEY (`hospital_logo_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hf_fixed_hospitals`
--

LOCK TABLES `hf_fixed_hospitals` WRITE;
/*!40000 ALTER TABLE `hf_fixed_hospitals` DISABLE KEYS */;
/*!40000 ALTER TABLE `hf_fixed_hospitals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hf_fixed_images`
--

DROP TABLE IF EXISTS `hf_fixed_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hf_fixed_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_id` int NOT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `is_primary` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `hf_fixed_images_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `media` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hf_fixed_images`
--

LOCK TABLES `hf_fixed_images` WRITE;
/*!40000 ALTER TABLE `hf_fixed_images` DISABLE KEYS */;
INSERT INTO `hf_fixed_images` VALUES (2,925,0,0),(3,980,1,0),(4,981,2,0),(5,982,3,0),(6,983,4,0);
/*!40000 ALTER TABLE `hf_fixed_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hf_fixed_page_content`
--

DROP TABLE IF EXISTS `hf_fixed_page_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hf_fixed_page_content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `main_image_id` int DEFAULT NULL,
  `deployment_info` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `short_description` text COLLATE utf8mb4_unicode_ci,
  `full_description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `product_gallery_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'Product Gallery',
  `our_products_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'Our Products',
  `hospitals_served_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'Hospitals Served',
  `enquire_button_text` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT 'Enquire Now',
  `hospitals_background_image_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `main_image_id` (`main_image_id`),
  KEY `hospitals_background_image_id` (`hospitals_background_image_id`),
  CONSTRAINT `hf_fixed_page_content_ibfk_1` FOREIGN KEY (`main_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `hf_fixed_page_content_ibfk_2` FOREIGN KEY (`hospitals_background_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hf_fixed_page_content`
--

LOCK TABLES `hf_fixed_page_content` WRITE;
/*!40000 ALTER TABLE `hf_fixed_page_content` DISABLE KEYS */;
INSERT INTO `hf_fixed_page_content` VALUES (1,'HF Fixed',979,'Deployed Across 35+ Bases',NULL,'The classic HF fixed X-ray unit, equipped with a robust power supply produces high contrast images.','2026-01-07 13:45:38','2026-01-20 05:13:17','Product Gallery','Our Products','Hospitals Served','Enquire Now',NULL);
/*!40000 ALTER TABLE `hf_fixed_page_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hf_fixed_variants`
--

DROP TABLE IF EXISTS `hf_fixed_variants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hf_fixed_variants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `variant_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hf_fixed_variants`
--

LOCK TABLES `hf_fixed_variants` WRITE;
/*!40000 ALTER TABLE `hf_fixed_variants` DISABLE KEYS */;
INSERT INTO `hf_fixed_variants` VALUES (1,'15KW three phase',1,1,'2026-01-07 13:45:38'),(2,'30KW three phase',2,1,'2026-01-07 13:45:38'),(3,'40KW three phase',3,1,'2026-01-07 13:45:38'),(4,'50KW three phase',4,1,'2026-01-07 13:45:38');
/*!40000 ALTER TABLE `hf_fixed_variants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hf_mobile_features`
--

DROP TABLE IF EXISTS `hf_mobile_features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hf_mobile_features` (
  `id` int NOT NULL AUTO_INCREMENT,
  `feature_text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hf_mobile_features`
--

LOCK TABLES `hf_mobile_features` WRITE;
/*!40000 ALTER TABLE `hf_mobile_features` DISABLE KEYS */;
INSERT INTO `hf_mobile_features` VALUES (1,'Easy to manoeuvre and handle High Frequency X-ray system on wheels',1,'2026-01-07 13:45:38'),(2,'Compact design with actuator based smooth arm movements',2,'2026-01-07 13:45:38'),(3,'200 pre-programmed APR function keys with predefined KVp and mAs values',3,'2026-01-07 13:45:38'),(4,'User selectable kVp in steps of 2 kV and single-step increase for mAs',4,'2026-01-07 13:45:38'),(5,'Operates in single phase in 15 A sockets',5,'2026-01-07 13:45:38'),(6,'12 blank keys for user-based programming and factory recall',6,'2026-01-07 13:45:38'),(7,'Microprocessor-based protection and machine self-diagnostics check',7,'2026-01-07 13:45:38'),(8,'Special function settings based on specific body part positioning',8,'2026-01-07 13:45:38'),(9,'Options available as a fixed X-ray system for outpatient/department applications',9,'2026-01-07 13:45:38');
/*!40000 ALTER TABLE `hf_mobile_features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hf_mobile_hospitals`
--

DROP TABLE IF EXISTS `hf_mobile_hospitals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hf_mobile_hospitals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hospital_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hospital_logo_id` int DEFAULT NULL,
  `order_index` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `hospital_logo_id` (`hospital_logo_id`),
  CONSTRAINT `hf_mobile_hospitals_ibfk_1` FOREIGN KEY (`hospital_logo_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hf_mobile_hospitals`
--

LOCK TABLES `hf_mobile_hospitals` WRITE;
/*!40000 ALTER TABLE `hf_mobile_hospitals` DISABLE KEYS */;
/*!40000 ALTER TABLE `hf_mobile_hospitals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hf_mobile_images`
--

DROP TABLE IF EXISTS `hf_mobile_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hf_mobile_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_id` int NOT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `is_primary` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `hf_mobile_images_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `media` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hf_mobile_images`
--

LOCK TABLES `hf_mobile_images` WRITE;
/*!40000 ALTER TABLE `hf_mobile_images` DISABLE KEYS */;
INSERT INTO `hf_mobile_images` VALUES (1,978,0,0);
/*!40000 ALTER TABLE `hf_mobile_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hf_mobile_page_content`
--

DROP TABLE IF EXISTS `hf_mobile_page_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hf_mobile_page_content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `main_image_id` int DEFAULT NULL,
  `deployment_info` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `short_description` text COLLATE utf8mb4_unicode_ci,
  `full_description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `product_gallery_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'Product Gallery',
  `our_products_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'Our Products',
  `hospitals_served_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'Hospitals Served',
  `enquire_button_text` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT 'Enquire Now',
  `hospitals_background_image_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `main_image_id` (`main_image_id`),
  KEY `hospitals_background_image_id` (`hospitals_background_image_id`),
  CONSTRAINT `hf_mobile_page_content_ibfk_1` FOREIGN KEY (`main_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `hf_mobile_page_content_ibfk_2` FOREIGN KEY (`hospitals_background_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hf_mobile_page_content`
--

LOCK TABLES `hf_mobile_page_content` WRITE;
/*!40000 ALTER TABLE `hf_mobile_page_content` DISABLE KEYS */;
INSERT INTO `hf_mobile_page_content` VALUES (1,'HF Mobile',977,'Deployed Across 35+ Bases',NULL,'Adonis HF X-ray systems are suitable for emergency care in ICU and hospital wards with minimal radiation.','2026-01-07 13:45:38','2026-01-20 05:11:18','Product Gallery','Our Products','Hospitals Served','Enquire Now',NULL);
/*!40000 ALTER TABLE `hf_mobile_page_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hf_mobile_variants`
--

DROP TABLE IF EXISTS `hf_mobile_variants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hf_mobile_variants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `variant_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hf_mobile_variants`
--

LOCK TABLES `hf_mobile_variants` WRITE;
/*!40000 ALTER TABLE `hf_mobile_variants` DISABLE KEYS */;
INSERT INTO `hf_mobile_variants` VALUES (1,'4 KW single phase',1,1,'2026-01-07 13:45:38'),(2,'6 KW single phase',2,1,'2026-01-07 13:45:38'),(3,'8 KW single phase',3,1,'2026-01-07 13:45:38');
/*!40000 ALTER TABLE `hf_mobile_variants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_about_paragraphs`
--

DROP TABLE IF EXISTS `home_about_paragraphs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `home_about_paragraphs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_about_paragraphs`
--

LOCK TABLES `home_about_paragraphs` WRITE;
/*!40000 ALTER TABLE `home_about_paragraphs` DISABLE KEYS */;
/*!40000 ALTER TABLE `home_about_paragraphs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_about_section`
--

DROP TABLE IF EXISTS `home_about_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `home_about_section` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subtitle` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `intro_text` text COLLATE utf8mb4_unicode_ci,
  `main_image_id` int DEFAULT NULL,
  `cta_text` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cta_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `background_image_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `main_image_id` (`main_image_id`),
  KEY `home_about_section_background_image_id_foreign_idx` (`background_image_id`),
  CONSTRAINT `home_about_section_background_image_id_foreign_idx` FOREIGN KEY (`background_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `home_about_section_ibfk_1` FOREIGN KEY (`main_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_about_section`
--

LOCK TABLES `home_about_section` WRITE;
/*!40000 ALTER TABLE `home_about_section` DISABLE KEYS */;
INSERT INTO `home_about_section` VALUES (1,NULL,NULL,'Adonis Medical Systems, a leader in medical imaging has more than 30 years of experience in delivering advanced, ergonomically designed X-ray solutions with a strong commitment to safety, innovation, and exceptional customer service.',1004,'More About Us','/about','2026-01-07 13:45:27','2026-01-20 06:37:12',955);
/*!40000 ALTER TABLE `home_about_section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_contact_section`
--

DROP TABLE IF EXISTS `home_contact_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `home_contact_section` (
  `id` int NOT NULL AUTO_INCREMENT,
  `heading` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `home_contact_section_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_contact_section`
--

LOCK TABLES `home_contact_section` WRITE;
/*!40000 ALTER TABLE `home_contact_section` DISABLE KEYS */;
INSERT INTO `home_contact_section` VALUES (1,'Contact Us','ADONIS MEDICAL SYSTEMS PVT LTD','E-70, PHASE- VIII, INDUSTRIAL AREA,\nMOHALI, 160071.','9872003273','support@adonismedical.com',NULL,'2026-01-09 10:11:25','2026-01-09 10:11:25');
/*!40000 ALTER TABLE `home_contact_section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_hero_section`
--

DROP TABLE IF EXISTS `home_hero_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `home_hero_section` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle` text COLLATE utf8mb4_unicode_ci,
  `background_image_id` int DEFAULT NULL,
  `title_color` varchar(7) COLLATE utf8mb4_unicode_ci DEFAULT '#FFFFFF',
  `subtitle_color` varchar(7) COLLATE utf8mb4_unicode_ci DEFAULT '#FFFFFF',
  `overlay_opacity` int DEFAULT '40',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `background_image_id` (`background_image_id`),
  CONSTRAINT `home_hero_section_ibfk_1` FOREIGN KEY (`background_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_hero_section`
--

LOCK TABLES `home_hero_section` WRITE;
/*!40000 ALTER TABLE `home_hero_section` DISABLE KEYS */;
INSERT INTO `home_hero_section` VALUES (1,'Adonis Medical Systems','Excellence In Technology, Dedication in Service',1003,'#7dc244','#FFFFFF',NULL,1,'2026-01-07 13:45:27','2026-01-20 06:36:13');
/*!40000 ALTER TABLE `home_hero_section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_products_cards`
--

DROP TABLE IF EXISTS `home_products_cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `home_products_cards` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `background_image_id` int DEFAULT NULL,
  `card_image_id` int DEFAULT NULL,
  `internal_link` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `background_image_id` (`background_image_id`),
  KEY `card_image_id` (`card_image_id`),
  CONSTRAINT `home_products_cards_ibfk_1` FOREIGN KEY (`background_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `home_products_cards_ibfk_2` FOREIGN KEY (`card_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_products_cards`
--

LOCK TABLES `home_products_cards` WRITE;
/*!40000 ALTER TABLE `home_products_cards` DISABLE KEYS */;
INSERT INTO `home_products_cards` VALUES (1,'HF Mobile',913,914,'/products/hf-mobile',0,1,'2026-01-12 06:39:16','2026-01-12 06:49:53'),(2,'HF Fixed',913,916,'/products/hf-fixed',1,1,'2026-01-12 06:39:39','2026-01-12 06:50:57'),(3,'FPD-C-Arm',913,917,'/products/fpd-c-arm',2,1,'2026-01-12 06:39:53','2026-01-12 06:51:10'),(4,'Line Frequency X-Ray Systems',913,918,'/products/line-frequency-x-ray-systems',3,1,'2026-01-12 06:40:13','2026-01-12 06:51:52'),(5,'Digital Radiography',908,919,'/products/digital-radiography',4,1,'2026-01-12 06:40:28','2026-01-12 06:52:23'),(6,'Dream Series-Ceiling Suspended',908,920,'/products/dream-series-ceiling-suspended',5,1,'2026-01-12 06:40:43','2026-01-12 06:52:40'),(7,'0.5K High End HF C-ARM',913,915,'/products/1k1k-high-end-hf-c-arm',6,1,'2026-01-12 06:40:54','2026-01-12 06:53:19');
/*!40000 ALTER TABLE `home_products_cards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_products_section`
--

DROP TABLE IF EXISTS `home_products_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `home_products_section` (
  `id` int NOT NULL AUTO_INCREMENT,
  `heading` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `cta_text` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cta_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `background_image_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_home_products_section_background_image` (`background_image_id`),
  CONSTRAINT `fk_home_products_section_background_image` FOREIGN KEY (`background_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_products_section`
--

LOCK TABLES `home_products_section` WRITE;
/*!40000 ALTER TABLE `home_products_section` DISABLE KEYS */;
INSERT INTO `home_products_section` VALUES (1,'Our Products','We offer a full suite of X-Ray Systems, ranging from portable & fixed X-Ray machines, Digital Surgical C-arm & Digital Radiography systems with advanced cutting edge technology and provide industry’s best after sales service & clinical applications.','View All Products','/products',NULL,'2026-01-07 13:45:27','2026-01-12 06:38:54');
/*!40000 ALTER TABLE `home_products_section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_quality_section`
--

DROP TABLE IF EXISTS `home_quality_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `home_quality_section` (
  `id` int NOT NULL AUTO_INCREMENT,
  `heading` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `background_image_id` int DEFAULT NULL,
  `cta_text` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cta_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `background_image_id` (`background_image_id`),
  CONSTRAINT `home_quality_section_ibfk_1` FOREIGN KEY (`background_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_quality_section`
--

LOCK TABLES `home_quality_section` WRITE;
/*!40000 ALTER TABLE `home_quality_section` DISABLE KEYS */;
INSERT INTO `home_quality_section` VALUES (1,'Quality Assurance','Certified to the highest national and international standards, our equipment delivers flawless performance backed by rigorous in-house testing.',964,'Explore our quality assurance solutions','/quality-assurance','2026-01-07 13:45:27','2026-01-17 06:23:04');
/*!40000 ALTER TABLE `home_quality_section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_specialties_section`
--

DROP TABLE IF EXISTS `home_specialties_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `home_specialties_section` (
  `id` int NOT NULL AUTO_INCREMENT,
  `heading` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `image_id` int DEFAULT NULL,
  `cta_text` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cta_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `home_specialties_section_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_specialties_section`
--

LOCK TABLES `home_specialties_section` WRITE;
/*!40000 ALTER TABLE `home_specialties_section` DISABLE KEYS */;
INSERT INTO `home_specialties_section` VALUES (1,'Our Specialties','',1005,'Explore our full suite of','/products','2026-01-09 10:11:25','2026-01-20 07:11:02');
/*!40000 ALTER TABLE `home_specialties_section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_stats`
--

DROP TABLE IF EXISTS `home_stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `home_stats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `icon_class` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_id` int DEFAULT NULL,
  `number` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `label` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_home_stats_image` (`image_id`),
  CONSTRAINT `fk_home_stats_image` FOREIGN KEY (`image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_stats`
--

LOCK TABLES `home_stats` WRITE;
/*!40000 ALTER TABLE `home_stats` DISABLE KEYS */;
INSERT INTO `home_stats` VALUES (1,'ri-building-line',878,'8000+','Installations',1,'2026-01-07 13:45:27'),(2,'ri-time-line',880,'30+','Years of Experience',2,'2026-01-07 13:45:27'),(3,'ri-factory-line',879,'2','Manufacturing and R&D facilities',3,'2026-01-07 13:45:27'),(4,'ri-hospital-line',881,'150,000+','X-Rays Everyday',4,'2026-01-07 13:45:27');
/*!40000 ALTER TABLE `home_stats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_testimonials_section`
--

DROP TABLE IF EXISTS `home_testimonials_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `home_testimonials_section` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subtitle` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `heading` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_testimonials_section`
--

LOCK TABLES `home_testimonials_section` WRITE;
/*!40000 ALTER TABLE `home_testimonials_section` DISABLE KEYS */;
INSERT INTO `home_testimonials_section` VALUES (1,'Testimonial','Client Stories & Experiences','2026-01-09 10:11:25','2026-01-09 10:11:25');
/*!40000 ALTER TABLE `home_testimonials_section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `investor_documents`
--

DROP TABLE IF EXISTS `investor_documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `investor_documents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `file_id` int DEFAULT NULL,
  `document_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `publish_date` date DEFAULT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `file_id` (`file_id`),
  CONSTRAINT `investor_documents_ibfk_1` FOREIGN KEY (`file_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `investor_documents`
--

LOCK TABLES `investor_documents` WRITE;
/*!40000 ALTER TABLE `investor_documents` DISABLE KEYS */;
INSERT INTO `investor_documents` VALUES (1,'Newspaper Advertisement for meeting of the unsecured creditors',NULL,870,'notice','2025-05-01',0,1,'2026-01-07 13:45:35','2026-01-08 08:32:08'),(2,'Notice of the Meeting of unsecured Creditors',NULL,871,'notice','2025-05-01',2,1,'2026-01-07 13:45:35','2026-01-08 08:32:08');
/*!40000 ALTER TABLE `investor_documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `investor_relations_page_content`
--

DROP TABLE IF EXISTS `investor_relations_page_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `investor_relations_page_content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hero_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hero_subtitle` text COLLATE utf8mb4_unicode_ci,
  `hero_image_id` int DEFAULT NULL,
  `intro_text` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `hero_image_id` (`hero_image_id`),
  CONSTRAINT `investor_relations_page_content_ibfk_1` FOREIGN KEY (`hero_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `investor_relations_page_content`
--

LOCK TABLES `investor_relations_page_content` WRITE;
/*!40000 ALTER TABLE `investor_relations_page_content` DISABLE KEYS */;
INSERT INTO `investor_relations_page_content` VALUES (1,'Investor Relations','Building Trust Through Transparency',872,'Welcome to Adonis Medical Systems Investor Relations. We are committed to transparent communication with our stakeholders.','2026-01-07 13:45:35','2026-01-08 08:33:35');
/*!40000 ALTER TABLE `investor_relations_page_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `department` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `employment_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `requirements` text COLLATE utf8mb4_unicode_ci,
  `responsibilities` text COLLATE utf8mb4_unicode_ci,
  `salary_range` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `posted_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leaders`
--

DROP TABLE IF EXISTS `leaders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leaders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `position` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `department` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bio` text COLLATE utf8mb4_unicode_ci,
  `image_id` int DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `linkedin_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `leaders_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leaders`
--

LOCK TABLES `leaders` WRITE;
/*!40000 ALTER TABLE `leaders` DISABLE KEYS */;
INSERT INTO `leaders` VALUES (1,'ARUN KAUL','Director','Refex Adonis','Arun has over 30 years of rich experience in the medical instrumentation and equipment manufacturing industry especially in the radiographic field. He is one of the founding leaders of Adonis Medical Systems. Arun started his career with Toshiba overlooking sales of ultrasound and CT machines in India. An industry stalwart with immense knowledge of CT machines right from the nascent stages when this technology was new to India.\n\nArun was part of Adonis Medical Equipment during the late 90s which solemnly manufactured multi-format cameras for ultrasound machines and distributed them to all major hospitals across the country. He is one of the founders of Adonis Medical Systems dedicated to manufacturing state-of-the-art X-ray machines with many novel technologies like mobile units, and high-frequency units and diversified into manufacturing BIS and AERB-certified high-frequency C-arm X-ray machines. Adonis X-ray machines are exported to several countries such as Bangladesh, Nigeria, Guinea, and Nepal. Under Arun\'s imminent leadership, the company grew to partner with governmental organizations like the Indian Army for their medical equipment needs.\n\nAcademically, Arun has completed his Electronics and Electrical Engineering from Birla Institute of University of Technology and Science (BITS).',910,NULL,NULL,0,1,'2026-01-07 13:45:35','2026-01-16 11:33:58'),(2,'VIRENDER SINGH BEDI','Director','Refex Adonis','Bedi brings over 30 years of experience in the medical instrumentation and equipment manufacturing industry, with deep expertise in radiographic technology. As one of the founding leaders of Adonis Medical Systems, he has played a pivotal role in shaping the company\'s direction, innovation, and growth.\n\nBedi began his career with Toshiba, where he oversaw the sales of ultrasound and CT machines across India. His extensive knowledge and hands-on experience in radiography helped accelerate Adonis Medical Systems\' growth at a time when advanced imaging technology was still emerging in the country.\n\nIn the late 1990s, Bedi was associated with Adonis Medical Equipment, which specialized in manufacturing multi-format cameras for ultrasound machinesÔÇöa product widely supplied to major hospitals nationwide. As a founder of Adonis Medical Systems, he expanded the company\'s vision toward developing state-of-the-art X-ray systems, including mobile X-ray units, high-frequency X-ray systems, and BIS & AERB-certified high-frequency C-Arm machines.\n\nUnder his leadership, Adonis has grown into a global supplier, exporting X-ray systems to Bangladesh, Nigeria, Guinea, Nepal, and more. His guidance also enabled the company to partner with major government organizations, including the Indian Army, for their specialized medical equipment requirements.\n\nBedi holds a degree in Electrical Engineering from Punjab Engineering College, grounding his leadership in strong technical expertise and a commitment to advancing radiology solutions.',911,NULL,NULL,1,1,'2026-01-07 13:45:35','2026-01-16 11:33:58'),(3,'MANMOHAN SINGH','Sales Director North','Refex Adonis','Manmohan Singh is a distinguished leader within our organization, bringing over 25 years of invaluable experience to the company. With a strong foundation in finance, backed by a post-graduate degree in the field, he has consistently demonstrated strategic insight and leadership excellence. His dedication and expertise have played a pivotal role in shaping the company\'s financial strategies and fostering growth. Manmohan\'s vision and guidance continue to inspire both his team and the organization as a whole.',912,NULL,NULL,2,1,'2026-01-07 13:45:35','2026-01-16 11:33:41'),(4,'SANJEEV KAUL','Sales Director – South','Refex Adonis','Sanjeev Kaul is a seasoned leader with over 20 years of dedicated experience in our company. His journey has been marked by consistent excellence, strategic vision, and a deep commitment to driving growth and innovation.\n\nHolding a Bachelor of Technology (B.Tech) degree, Sanjeev combines technical expertise with strong leadership skills, playing a pivotal role in shaping the organization\'s success. His ability to inspire teams and implement forward-thinking solutions has made him a cornerstone of our leadership team.\n\nWe are proud to have Sanjeev Kaul leading the way as we continue to strive for excellence and innovation in all that we do.',909,NULL,NULL,3,1,'2026-01-07 13:45:35','2026-01-16 11:33:41');
/*!40000 ALTER TABLE `leaders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `line_frequency_features`
--

DROP TABLE IF EXISTS `line_frequency_features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `line_frequency_features` (
  `id` int NOT NULL AUTO_INCREMENT,
  `feature_text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `line_frequency_features`
--

LOCK TABLES `line_frequency_features` WRITE;
/*!40000 ALTER TABLE `line_frequency_features` DISABLE KEYS */;
INSERT INTO `line_frequency_features` VALUES (1,'Line frequency-based technology for optimum exposure',1,'2026-01-07 13:45:38'),(2,'In case the main control panel fails',2,'2026-01-07 13:45:38'),(3,'Exposures counter to keep track of all the exposures taken',3,'2026-01-07 13:45:38'),(4,'CR/DR compatible',4,'2026-01-07 13:45:38'),(5,'Automatic bucky selection',5,'2026-01-07 13:45:38'),(6,'Mobile Carriage optional selection',6,'2026-01-07 13:45:38');
/*!40000 ALTER TABLE `line_frequency_features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `line_frequency_hospitals`
--

DROP TABLE IF EXISTS `line_frequency_hospitals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `line_frequency_hospitals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hospital_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hospital_logo_id` int DEFAULT NULL,
  `order_index` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `hospital_logo_id` (`hospital_logo_id`),
  CONSTRAINT `line_frequency_hospitals_ibfk_1` FOREIGN KEY (`hospital_logo_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `line_frequency_hospitals`
--

LOCK TABLES `line_frequency_hospitals` WRITE;
/*!40000 ALTER TABLE `line_frequency_hospitals` DISABLE KEYS */;
/*!40000 ALTER TABLE `line_frequency_hospitals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `line_frequency_images`
--

DROP TABLE IF EXISTS `line_frequency_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `line_frequency_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_id` int NOT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `is_primary` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `line_frequency_images_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `media` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `line_frequency_images`
--

LOCK TABLES `line_frequency_images` WRITE;
/*!40000 ALTER TABLE `line_frequency_images` DISABLE KEYS */;
INSERT INTO `line_frequency_images` VALUES (1,991,0,0),(2,992,1,0);
/*!40000 ALTER TABLE `line_frequency_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `line_frequency_page_content`
--

DROP TABLE IF EXISTS `line_frequency_page_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `line_frequency_page_content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `main_image_id` int DEFAULT NULL,
  `deployment_info` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `short_description` text COLLATE utf8mb4_unicode_ci,
  `full_description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `product_gallery_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'Product Gallery',
  `our_products_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'Our Products',
  `hospitals_served_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'Hospitals Served',
  `enquire_button_text` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT 'Enquire Now',
  `hospitals_background_image_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `main_image_id` (`main_image_id`),
  KEY `hospitals_background_image_id` (`hospitals_background_image_id`),
  CONSTRAINT `line_frequency_page_content_ibfk_1` FOREIGN KEY (`main_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `line_frequency_page_content_ibfk_2` FOREIGN KEY (`hospitals_background_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `line_frequency_page_content`
--

LOCK TABLES `line_frequency_page_content` WRITE;
/*!40000 ALTER TABLE `line_frequency_page_content` DISABLE KEYS */;
INSERT INTO `line_frequency_page_content` VALUES (1,'Line Frequency X-Ray Systems',NULL,'Deployed Across 34+ Bases',NULL,'Experience the ruggedness of line frequency technology X-ray system','2026-01-07 13:45:38','2026-01-19 10:38:39','Product Gallery','Our Products','Hospitals Served','Enquire Now',NULL);
/*!40000 ALTER TABLE `line_frequency_page_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `line_frequency_variants`
--

DROP TABLE IF EXISTS `line_frequency_variants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `line_frequency_variants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `variant_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `line_frequency_variants`
--

LOCK TABLES `line_frequency_variants` WRITE;
/*!40000 ALTER TABLE `line_frequency_variants` DISABLE KEYS */;
INSERT INTO `line_frequency_variants` VALUES (1,'100mA',1,1,'2026-01-07 13:45:38'),(2,'150mA',2,1,'2026-01-07 13:45:38'),(3,'300mA',3,1,'2026-01-07 13:45:38'),(4,'500mA',4,1,'2026-01-07 13:45:38');
/*!40000 ALTER TABLE `line_frequency_variants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login_history`
--

DROP TABLE IF EXISTS `login_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `login_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_login_at` (`login_at`),
  CONSTRAINT `login_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_history`
--

LOCK TABLES `login_history` WRITE;
/*!40000 ALTER TABLE `login_history` DISABLE KEYS */;
INSERT INTO `login_history` VALUES (1,1,'::1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-IN) WindowsPowerShell/5.1.26100.7462','2026-01-07 13:53:59'),(2,1,'::1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-IN) WindowsPowerShell/5.1.26100.7462','2026-01-07 13:54:06'),(3,1,'::1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-IN) WindowsPowerShell/5.1.26100.7462','2026-01-07 14:06:46'),(4,1,'::1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-IN) WindowsPowerShell/5.1.26100.7462','2026-01-07 17:35:28'),(5,1,'::1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-IN) WindowsPowerShell/5.1.26100.7462','2026-01-07 17:36:54'),(6,1,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36','2026-01-07 17:37:42'),(7,1,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36','2026-01-08 04:49:41'),(8,2,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36','2026-01-08 09:10:20'),(9,1,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36','2026-01-08 09:15:52'),(10,1,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36','2026-01-08 11:09:43'),(11,1,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36','2026-01-09 06:29:12'),(12,1,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36','2026-01-09 10:14:59'),(13,1,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36','2026-01-12 05:45:40'),(14,1,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36','2026-01-12 07:14:07'),(15,1,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36','2026-01-14 04:54:46'),(16,1,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36','2026-01-16 04:55:05'),(17,1,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36','2026-01-16 05:13:57'),(18,1,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36','2026-01-16 05:24:10'),(19,1,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36','2026-01-16 05:51:22'),(20,1,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36','2026-01-16 09:01:05'),(21,1,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-01-17 06:07:46'),(22,1,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-01-19 05:37:18'),(23,1,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-01-19 10:19:55'),(24,1,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','2026-01-20 05:06:32');
/*!40000 ALTER TABLE `login_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `management_page_content`
--

DROP TABLE IF EXISTS `management_page_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `management_page_content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hero_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hero_subtitle` text COLLATE utf8mb4_unicode_ci,
  `hero_image_id` int DEFAULT NULL,
  `intro_text` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `hero_image_id` (`hero_image_id`),
  CONSTRAINT `management_page_content_ibfk_1` FOREIGN KEY (`hero_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `management_page_content`
--

LOCK TABLES `management_page_content` WRITE;
/*!40000 ALTER TABLE `management_page_content` DISABLE KEYS */;
INSERT INTO `management_page_content` VALUES (1,'Leadership Team','Meet Our Visionary Leaders',NULL,'Our leadership team brings together decades of experience in medical technology and healthcare innovation.','2026-01-07 13:45:35','2026-01-07 13:45:35');
/*!40000 ALTER TABLE `management_page_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media` (
  `id` int NOT NULL AUTO_INCREMENT,
  `file_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_path` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_type` enum('image','document','svg','video') COLLATE utf8mb4_unicode_ci DEFAULT 'image',
  `mime_type` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file_size` bigint DEFAULT NULL,
  `alt_text` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `page_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `section_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `uploaded_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `uploaded_by` (`uploaded_by`),
  KEY `idx_file_type` (`file_type`),
  KEY `idx_created_at` (`created_at`),
  CONSTRAINT `media_ibfk_1` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=1006 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
INSERT INTO `media` VALUES (1,'Container-1.svg','/uploads/2024/09/Container-1.svg','svg','image/svg+xml',4406,'Container 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(2,'Container-2.svg','/uploads/2024/09/Container-2.svg','svg','image/svg+xml',3537,'Container 2',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(3,'Container-3.svg','/uploads/2024/09/Container-3.svg','svg','image/svg+xml',4169,'Container 3',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(4,'eu-corporate-business-office-street-background-1-1024x507.jpg','/uploads/2024/09/eu-corporate-business-office-street-background-1-1024x507.jpg','image','image/jpeg',139361,'eu corporate business office street background 1 1024x507',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(5,'eu-corporate-business-office-street-background-1-150x150.jpg','/uploads/2024/09/eu-corporate-business-office-street-background-1-150x150.jpg','image','image/jpeg',9393,'eu corporate business office street background 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(6,'eu-corporate-business-office-street-background-1-300x148.jpg','/uploads/2024/09/eu-corporate-business-office-street-background-1-300x148.jpg','image','image/jpeg',15082,'eu corporate business office street background 1 300x148',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(7,'eu-corporate-business-office-street-background-1-768x380.jpg','/uploads/2024/09/eu-corporate-business-office-street-background-1-768x380.jpg','image','image/jpeg',82427,'eu corporate business office street background 1 768x380',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(8,'eu-corporate-business-office-street-background-1.jpg','/uploads/2024/09/eu-corporate-business-office-street-background-1.jpg','image','image/jpeg',265514,'eu corporate business office street background 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(9,'Frame-100-1.svg','/uploads/2024/09/Frame-100-1.svg','svg','image/svg+xml',11407,'Frame 100 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(10,'Frame-100.svg','/uploads/2024/09/Frame-100.svg','svg','image/svg+xml',11407,'Frame 100',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(11,'Frame-118-150x150.jpg','/uploads/2024/09/Frame-118-150x150.jpg','image','image/jpeg',5120,'Frame 118 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(12,'Frame-118-300x171.jpg','/uploads/2024/09/Frame-118-300x171.jpg','image','image/jpeg',8822,'Frame 118 300x171',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(13,'Frame-118.jpg','/uploads/2024/09/Frame-118.jpg','image','image/jpeg',131966,'Frame 118',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(14,'Frame-18-1-150x150.jpg','/uploads/2024/09/Frame-18-1-150x150.jpg','image','image/jpeg',2826,'Frame 18 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(15,'Frame-18-1-300x204.jpg','/uploads/2024/09/Frame-18-1-300x204.jpg','image','image/jpeg',4339,'Frame 18 1 300x204',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(16,'Frame-18-1.jpg','/uploads/2024/09/Frame-18-1.jpg','image','image/jpeg',23841,'Frame 18 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(17,'Frame-18-150x150.jpg','/uploads/2024/09/Frame-18-150x150.jpg','image','image/jpeg',3721,'Frame 18 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(18,'Frame-18-2-150x150.jpg','/uploads/2024/09/Frame-18-2-150x150.jpg','image','image/jpeg',4309,'Frame 18 2 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(19,'Frame-18-2-300x204.jpg','/uploads/2024/09/Frame-18-2-300x204.jpg','image','image/jpeg',7018,'Frame 18 2 300x204',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(20,'Frame-18-2.jpg','/uploads/2024/09/Frame-18-2.jpg','image','image/jpeg',40829,'Frame 18 2',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(21,'Frame-18-3-150x150.jpg','/uploads/2024/09/Frame-18-3-150x150.jpg','image','image/jpeg',2029,'Frame 18 3 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(22,'Frame-18-3-300x204.jpg','/uploads/2024/09/Frame-18-3-300x204.jpg','image','image/jpeg',3412,'Frame 18 3 300x204',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(23,'Frame-18-3.jpg','/uploads/2024/09/Frame-18-3.jpg','image','image/jpeg',18187,'Frame 18 3',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(24,'Frame-18-300x204.jpg','/uploads/2024/09/Frame-18-300x204.jpg','image','image/jpeg',5850,'Frame 18 300x204',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(25,'Frame-18-4-150x150.jpg','/uploads/2024/09/Frame-18-4-150x150.jpg','image','image/jpeg',3467,'Frame 18 4 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(26,'Frame-18-4-300x204.jpg','/uploads/2024/09/Frame-18-4-300x204.jpg','image','image/jpeg',5328,'Frame 18 4 300x204',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(27,'Frame-18-4.jpg','/uploads/2024/09/Frame-18-4.jpg','image','image/jpeg',27615,'Frame 18 4',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(28,'Frame-18-5-150x150.jpg','/uploads/2024/09/Frame-18-5-150x150.jpg','image','image/jpeg',2832,'Frame 18 5 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(29,'Frame-18-5-300x204.jpg','/uploads/2024/09/Frame-18-5-300x204.jpg','image','image/jpeg',4593,'Frame 18 5 300x204',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(30,'Frame-18-5.jpg','/uploads/2024/09/Frame-18-5.jpg','image','image/jpeg',26902,'Frame 18 5',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(31,'Frame-18-6-150x150.jpg','/uploads/2024/09/Frame-18-6-150x150.jpg','image','image/jpeg',3908,'Frame 18 6 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(32,'Frame-18-6-300x204.jpg','/uploads/2024/09/Frame-18-6-300x204.jpg','image','image/jpeg',6531,'Frame 18 6 300x204',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(33,'Frame-18-6.jpg','/uploads/2024/09/Frame-18-6.jpg','image','image/jpeg',46280,'Frame 18 6',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(34,'Frame-18.jpg','/uploads/2024/09/Frame-18.jpg','image','image/jpeg',32591,'Frame 18',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(35,'Frame-25-1-1-150x150.png','/uploads/2024/09/Frame-25-1-1-150x150.png','image','image/png',11948,'Frame 25 1 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(36,'Frame-25-1-1-300x292.png','/uploads/2024/09/Frame-25-1-1-300x292.png','image','image/png',45382,'Frame 25 1 1 300x292',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(37,'Frame-25-1-1.png','/uploads/2024/09/Frame-25-1-1.png','image','image/png',10667,'Frame 25 1 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(38,'Frame-299-1-150x150.png','/uploads/2024/09/Frame-299-1-150x150.png','image','image/png',30522,'Frame 299 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(39,'Frame-299-1.png','/uploads/2024/09/Frame-299-1.png','image','image/png',121578,'Frame 299 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(40,'Frame-299-150x150.png','/uploads/2024/09/Frame-299-150x150.png','image','image/png',25576,'Frame 299 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(41,'Frame-299.png','/uploads/2024/09/Frame-299.png','image','image/png',84913,'Frame 299',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(42,'Frame-32-1-150x150.jpg','/uploads/2024/09/Frame-32-1-150x150.jpg','image','image/jpeg',6523,'Frame 32 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(43,'Frame-32-1-200x300.jpg','/uploads/2024/09/Frame-32-1-200x300.jpg','image','image/jpeg',12214,'Frame 32 1 200x300',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(44,'Frame-32-1.jpg','/uploads/2024/09/Frame-32-1.jpg','image','image/jpeg',55368,'Frame 32 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(45,'Frame-32-2-1-150x150.jpg','/uploads/2024/09/Frame-32-2-1-150x150.jpg','image','image/jpeg',6851,'Frame 32 2 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(46,'Frame-32-2-1-298x300.jpg','/uploads/2024/09/Frame-32-2-1-298x300.jpg','image','image/jpeg',18939,'Frame 32 2 1 298x300',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(47,'Frame-32-2-1.jpg','/uploads/2024/09/Frame-32-2-1.jpg','image','image/jpeg',47035,'Frame 32 2 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(48,'Frame-39-1024x340.jpg','/uploads/2024/09/Frame-39-1024x340.jpg','image','image/jpeg',22665,'Frame 39 1024x340',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(49,'Frame-39-150x150.jpg','/uploads/2024/09/Frame-39-150x150.jpg','image','image/jpeg',3163,'Frame 39 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(50,'Frame-39-300x100.jpg','/uploads/2024/09/Frame-39-300x100.jpg','image','image/jpeg',3814,'Frame 39 300x100',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(51,'Frame-39-768x255.jpg','/uploads/2024/09/Frame-39-768x255.jpg','image','image/jpeg',14756,'Frame 39 768x255',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(52,'Frame-39.jpg','/uploads/2024/09/Frame-39.jpg','image','image/jpeg',111988,'Frame 39',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(53,'Frame-41-150x150.jpg','/uploads/2024/09/Frame-41-150x150.jpg','image','image/jpeg',2560,'Frame 41 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(54,'Frame-41-300x288.jpg','/uploads/2024/09/Frame-41-300x288.jpg','image','image/jpeg',6626,'Frame 41 300x288',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(55,'Frame-41.jpg','/uploads/2024/09/Frame-41.jpg','image','image/jpeg',29266,'Frame 41',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(56,'Frame-42-150x150.jpg','/uploads/2024/09/Frame-42-150x150.jpg','image','image/jpeg',2088,'Frame 42 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(57,'Frame-42-300x288.jpg','/uploads/2024/09/Frame-42-300x288.jpg','image','image/jpeg',5397,'Frame 42 300x288',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(58,'Frame-42.jpg','/uploads/2024/09/Frame-42.jpg','image','image/jpeg',24358,'Frame 42',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(59,'Frame-44-150x150.jpg','/uploads/2024/09/Frame-44-150x150.jpg','image','image/jpeg',4500,'Frame 44 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(60,'Frame-44-300x288.jpg','/uploads/2024/09/Frame-44-300x288.jpg','image','image/jpeg',12452,'Frame 44 300x288',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(61,'Frame-44.jpg','/uploads/2024/09/Frame-44.jpg','image','image/jpeg',53978,'Frame 44',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(62,'Frame-59-1.svg','/uploads/2024/09/Frame-59-1.svg','svg','image/svg+xml',1868,'Frame 59 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(63,'Frame-59-2.svg','/uploads/2024/09/Frame-59-2.svg','svg','image/svg+xml',2783,'Frame 59 2',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(64,'Frame-59-3.svg','/uploads/2024/09/Frame-59-3.svg','svg','image/svg+xml',1715,'Frame 59 3',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(65,'Frame-59-4.svg','/uploads/2024/09/Frame-59-4.svg','svg','image/svg+xml',2413,'Frame 59 4',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(66,'Frame-59.svg','/uploads/2024/09/Frame-59.svg','svg','image/svg+xml',1628,'Frame 59',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(67,'Frame-75-1-1024x517.png','/uploads/2024/09/Frame-75-1-1024x517.png','image','image/png',207741,'Frame 75 1 1024x517',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(68,'Frame-75-1-150x150.png','/uploads/2024/09/Frame-75-1-150x150.png','image','image/png',8110,'Frame 75 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(69,'Frame-75-1-300x152.png','/uploads/2024/09/Frame-75-1-300x152.png','image','image/png',15662,'Frame 75 1 300x152',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(70,'Frame-75-1-768x388.png','/uploads/2024/09/Frame-75-1-768x388.png','image','image/png',114976,'Frame 75 1 768x388',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(71,'Frame-75-1.png','/uploads/2024/09/Frame-75-1.png','image','image/png',58224,'Frame 75 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(72,'Frame-97-3-1-150x150.jpg','/uploads/2024/09/Frame-97-3-1-150x150.jpg','image','image/jpeg',5261,'Frame 97 3 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(73,'Frame-97-3-1-300x229.jpg','/uploads/2024/09/Frame-97-3-1-300x229.jpg','image','image/jpeg',10969,'Frame 97 3 1 300x229',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(74,'Frame-97-3-1.jpg','/uploads/2024/09/Frame-97-3-1.jpg','image','image/jpeg',18579,'Frame 97 3 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(75,'Group-4-1024x585.jpg','/uploads/2024/09/Group-4-1024x585.jpg','image','image/jpeg',9264,'Group 4 1024x585',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(76,'Group-4-150x150.jpg','/uploads/2024/09/Group-4-150x150.jpg','image','image/jpeg',766,'Group 4 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(77,'Group-4-300x171.jpg','/uploads/2024/09/Group-4-300x171.jpg','image','image/jpeg',1405,'Group 4 300x171',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(78,'Group-4-768x439.jpg','/uploads/2024/09/Group-4-768x439.jpg','image','image/jpeg',5559,'Group 4 768x439',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(79,'Group-4.jpg','/uploads/2024/09/Group-4.jpg','image','image/jpeg',70712,'Group 4',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(80,'Group-9-1326x1536.png','/uploads/2024/09/Group-9-1326x1536.png','image','image/png',161832,'Group 9 1326x1536',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(81,'Group-9-150x150.png','/uploads/2024/09/Group-9-150x150.png','image','image/png',12911,'Group 9 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(82,'Group-9-1769x2048.png','/uploads/2024/09/Group-9-1769x2048.png','image','image/png',173004,'Group 9 1769x2048',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(83,'Group-9-259x300.png','/uploads/2024/09/Group-9-259x300.png','image','image/png',29065,'Group 9 259x300',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(84,'Group-9-768x889.png','/uploads/2024/09/Group-9-768x889.png','image','image/png',113157,'Group 9 768x889',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(85,'Group-9-884x1024.png','/uploads/2024/09/Group-9-884x1024.png','image','image/png',123480,'Group 9 884x1024',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(86,'Group-9.png','/uploads/2024/09/Group-9.png','image','image/png',74578,'Group 9',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(87,'hospital-hallway-with-people-walking-down-it-1-1-1024x474.jpg','/uploads/2024/09/hospital-hallway-with-people-walking-down-it-1-1-1024x474.jpg','image','image/jpeg',56456,'hospital hallway with people walking down it 1 1 1024x474',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(88,'hospital-hallway-with-people-walking-down-it-1-1-150x150.jpg','/uploads/2024/09/hospital-hallway-with-people-walking-down-it-1-1-150x150.jpg','image','image/jpeg',4202,'hospital hallway with people walking down it 1 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(89,'hospital-hallway-with-people-walking-down-it-1-1-300x139.jpg','/uploads/2024/09/hospital-hallway-with-people-walking-down-it-1-1-300x139.jpg','image','image/jpeg',8395,'hospital hallway with people walking down it 1 1 300x139',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(90,'hospital-hallway-with-people-walking-down-it-1-1-768x356.jpg','/uploads/2024/09/hospital-hallway-with-people-walking-down-it-1-1-768x356.jpg','image','image/jpeg',35876,'hospital hallway with people walking down it 1 1 768x356',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(91,'hospital-hallway-with-people-walking-down-it-1-1.jpg','/uploads/2024/09/hospital-hallway-with-people-walking-down-it-1-1.jpg','image','image/jpeg',107891,'hospital hallway with people walking down it 1 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(92,'image-17-1024x339.jpg','/uploads/2024/09/image-17-1024x339.jpg','image','image/jpeg',17971,'image 17 1024x339',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(93,'image-17-150x150.jpg','/uploads/2024/09/image-17-150x150.jpg','image','image/jpeg',2482,'image 17 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(94,'image-17-300x99.jpg','/uploads/2024/09/image-17-300x99.jpg','image','image/jpeg',3251,'image 17 300x99',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(95,'image-17-768x254.jpg','/uploads/2024/09/image-17-768x254.jpg','image','image/jpeg',11474,'image 17 768x254',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(96,'image-17.jpg','/uploads/2024/09/image-17.jpg','image','image/jpeg',66436,'image 17',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(97,'image-48-1-1024x475.jpg','/uploads/2024/09/image-48-1-1024x475.jpg','image','image/jpeg',39716,'image 48 1 1024x475',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(98,'image-48-1-150x150.jpg','/uploads/2024/09/image-48-1-150x150.jpg','image','image/jpeg',3828,'image 48 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(99,'image-48-1-300x139.jpg','/uploads/2024/09/image-48-1-300x139.jpg','image','image/jpeg',7140,'image 48 1 300x139',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(100,'image-48-1-768x356.jpg','/uploads/2024/09/image-48-1-768x356.jpg','image','image/jpeg',26632,'image 48 1 768x356',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(101,'image-48-1.jpg','/uploads/2024/09/image-48-1.jpg','image','image/jpeg',66499,'image 48 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(102,'image-53-1-1024x475.jpg','/uploads/2024/09/image-53-1-1024x475.jpg','image','image/jpeg',63895,'image 53 1 1024x475',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(103,'image-53-1-150x150.jpg','/uploads/2024/09/image-53-1-150x150.jpg','image','image/jpeg',4606,'image 53 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(104,'image-53-1-300x139.jpg','/uploads/2024/09/image-53-1-300x139.jpg','image','image/jpeg',8674,'image 53 1 300x139',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(105,'image-53-1-768x356.jpg','/uploads/2024/09/image-53-1-768x356.jpg','image','image/jpeg',40559,'image 53 1 768x356',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(106,'image-53-1.jpg','/uploads/2024/09/image-53-1.jpg','image','image/jpeg',118065,'image 53 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(107,'Link-3.svg','/uploads/2024/09/Link-3.svg','svg','image/svg+xml',646,'Link 3',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(108,'Link-4.svg','/uploads/2024/09/Link-4.svg','svg','image/svg+xml',1175,'Link 4',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(109,'Link-5.svg','/uploads/2024/09/Link-5.svg','svg','image/svg+xml',1983,'Link 5',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(110,'Link-6.svg','/uploads/2024/09/Link-6.svg','svg','image/svg+xml',974,'Link 6',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(111,'logo_adonis_4x-1-1.svg','/uploads/2024/09/logo_adonis_4x-1-1.svg','svg','image/svg+xml',141334,'logo adonis 4x 1 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(112,'logo_adonis_4x-1.svg','/uploads/2024/09/logo_adonis_4x-1.svg','svg','image/svg+xml',141330,'logo adonis 4x 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(113,'Mask-group-41.svg','/uploads/2024/09/Mask-group-41.svg','svg','image/svg+xml',11357,'Mask group 41',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(114,'Mask-group-42.svg','/uploads/2024/09/Mask-group-42.svg','svg','image/svg+xml',33604,'Mask group 42',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(115,'Mask-group-43.svg','/uploads/2024/09/Mask-group-43.svg','svg','image/svg+xml',22972,'Mask group 43',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(116,'Mask-group-44.svg','/uploads/2024/09/Mask-group-44.svg','svg','image/svg+xml',22610,'Mask group 44',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(117,'Mask-group-45.svg','/uploads/2024/09/Mask-group-45.svg','svg','image/svg+xml',23658,'Mask group 45',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(118,'Mask-group-46.svg','/uploads/2024/09/Mask-group-46.svg','svg','image/svg+xml',18394,'Mask group 46',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(119,'Mask-group-47.svg','/uploads/2024/09/Mask-group-47.svg','svg','image/svg+xml',14094,'Mask group 47',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(120,'Mask-group-48.svg','/uploads/2024/09/Mask-group-48.svg','svg','image/svg+xml',25622,'Mask group 48',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(121,'Mask-group-49.svg','/uploads/2024/09/Mask-group-49.svg','svg','image/svg+xml',18356,'Mask group 49',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(122,'Mask-group-50.svg','/uploads/2024/09/Mask-group-50.svg','svg','image/svg+xml',18092,'Mask group 50',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(123,'Mask-group-51.svg','/uploads/2024/09/Mask-group-51.svg','svg','image/svg+xml',30368,'Mask group 51',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(124,'Mask-group-52.svg','/uploads/2024/09/Mask-group-52.svg','svg','image/svg+xml',19068,'Mask group 52',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(125,'Mask-group-53.svg','/uploads/2024/09/Mask-group-53.svg','svg','image/svg+xml',19768,'Mask group 53',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(126,'placeholder-661-1-1024x683.png','/uploads/2024/09/placeholder-661-1-1024x683.png','image','image/png',7510,'placeholder 661 1 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(127,'placeholder-661-1-150x150.png','/uploads/2024/09/placeholder-661-1-150x150.png','image','image/png',1207,'placeholder 661 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(128,'placeholder-661-1-300x200.png','/uploads/2024/09/placeholder-661-1-300x200.png','image','image/png',2008,'placeholder 661 1 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(129,'placeholder-661-1-768x512.png','/uploads/2024/09/placeholder-661-1-768x512.png','image','image/png',5345,'placeholder 661 1 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(130,'placeholder-661-1.png','/uploads/2024/09/placeholder-661-1.png','image','image/png',6146,'placeholder 661 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(131,'1k-high-end-01-140x80.png','/uploads/2024/10/1k-high-end-01-140x80.png','image','image/png',8778,'1k high end 01 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(132,'1k-high-end-01-150x150.png','/uploads/2024/10/1k-high-end-01-150x150.png','image','image/png',16546,'1k high end 01 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(133,'1k-high-end-01-300x238.png','/uploads/2024/10/1k-high-end-01-300x238.png','image','image/png',36203,'1k high end 01 300x238',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(134,'1k-high-end-01.png','/uploads/2024/10/1k-high-end-01.png','image','image/png',37584,'1k high end 01',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(135,'1k-high-end-02-140x80.png','/uploads/2024/10/1k-high-end-02-140x80.png','image','image/png',8409,'1k high end 02 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(136,'1k-high-end-02-150x150.png','/uploads/2024/10/1k-high-end-02-150x150.png','image','image/png',16001,'1k high end 02 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(137,'1k-high-end-02-300x238.png','/uploads/2024/10/1k-high-end-02-300x238.png','image','image/png',35881,'1k high end 02 300x238',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(138,'1k-high-end-02-768x609.png','/uploads/2024/10/1k-high-end-02-768x609.png','image','image/png',172165,'1k high end 02 768x609',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(139,'1k-high-end-02.png','/uploads/2024/10/1k-high-end-02.png','image','image/png',74023,'1k high end 02',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(140,'424x293-Digital-Radiography-150x150.png','/uploads/2024/10/424x293-Digital-Radiography-150x150.png','image','image/png',11433,'424x293 Digital Radiography 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(141,'424x293-Digital-Radiography-300x207.png','/uploads/2024/10/424x293-Digital-Radiography-300x207.png','image','image/png',19961,'424x293 Digital Radiography 300x207',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(142,'424x293-Digital-Radiography.png','/uploads/2024/10/424x293-Digital-Radiography.png','image','image/png',37666,'424x293 Digital Radiography',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(143,'424x423-1k1k-High-end-H-FC-Arm-150x150.png','/uploads/2024/10/424x423-1k1k-High-end-H-FC-Arm-150x150.png','image','image/png',15943,'424x423 1k1k High end H FC Arm 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(144,'424x423-1k1k-High-end-H-FC-Arm-300x207.png','/uploads/2024/10/424x423-1k1k-High-end-H-FC-Arm-300x207.png','image','image/png',27625,'424x423 1k1k High end H FC Arm 300x207',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(145,'424x423-1k1k-High-end-H-FC-Arm.png','/uploads/2024/10/424x423-1k1k-High-end-H-FC-Arm.png','image','image/png',53606,'424x423 1k1k High end H FC Arm',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(146,'c-arm-op-150x150.png','/uploads/2024/10/c-arm-op-150x150.png','image','image/png',17305,'c arm op 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(147,'c-arm-op-300x204.png','/uploads/2024/10/c-arm-op-300x204.png','image','image/png',29268,'c arm op 300x204',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(148,'c-arm-op.png','/uploads/2024/10/c-arm-op.png','image','image/png',101733,'c arm op',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(149,'Careers-1024x429.jpg','/uploads/2024/10/Careers-1024x429.jpg','image','image/jpeg',6866,'Careers 1024x429',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(150,'Careers-150x150.jpg','/uploads/2024/10/Careers-150x150.jpg','image','image/jpeg',727,'Careers 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(151,'Careers-300x126.jpg','/uploads/2024/10/Careers-300x126.jpg','image','image/jpeg',1103,'Careers 300x126',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(152,'Careers-768x322.jpg','/uploads/2024/10/Careers-768x322.jpg','image','image/jpeg',4245,'Careers 768x322',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(153,'Careers.jpg','/uploads/2024/10/Careers.jpg','image','image/jpeg',53831,'Careers',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(154,'Clients-1-1024x247.jpg','/uploads/2024/10/Clients-1-1024x247.jpg','image','image/jpeg',4967,'Clients 1 1024x247',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(155,'Clients-1-150x150.jpg','/uploads/2024/10/Clients-1-150x150.jpg','image','image/jpeg',751,'Clients 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(156,'Clients-1-300x72.jpg','/uploads/2024/10/Clients-1-300x72.jpg','image','image/jpeg',760,'Clients 1 300x72',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(157,'Clients-1-768x185.jpg','/uploads/2024/10/Clients-1-768x185.jpg','image','image/jpeg',2733,'Clients 1 768x185',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(158,'Clients-1.jpg','/uploads/2024/10/Clients-1.jpg','image','image/jpeg',21631,'Clients 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(159,'contact-us-bg-150x150.png','/uploads/2024/10/contact-us-bg-150x150.png','image','image/png',8929,'contact us bg 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(160,'contact-us-bg-300x273.png','/uploads/2024/10/contact-us-bg-300x273.png','image','image/png',31177,'contact us bg 300x273',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(161,'contact-us-bg-768x699.png','/uploads/2024/10/contact-us-bg-768x699.png','image','image/png',210928,'contact us bg 768x699',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(162,'contact-us-bg.png','/uploads/2024/10/contact-us-bg.png','image','image/png',39112,'contact us bg',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(163,'date.svg','/uploads/2024/10/date.svg','svg','image/svg+xml',24286,'date',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(164,'digital-radiography-01-140x80.png','/uploads/2024/10/digital-radiography-01-140x80.png','image','image/png',6799,'digital radiography 01 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(165,'digital-radiography-01-150x150.png','/uploads/2024/10/digital-radiography-01-150x150.png','image','image/png',13645,'digital radiography 01 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(166,'digital-radiography-01-300x238.png','/uploads/2024/10/digital-radiography-01-300x238.png','image','image/png',28455,'digital radiography 01 300x238',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(167,'digital-radiography-01-768x609.png','/uploads/2024/10/digital-radiography-01-768x609.png','image','image/png',113957,'digital radiography 01 768x609',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(168,'digital-radiography-01.png','/uploads/2024/10/digital-radiography-01.png','image','image/png',50488,'digital radiography 01',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(169,'digital-radiography-02-140x80.png','/uploads/2024/10/digital-radiography-02-140x80.png','image','image/png',6611,'digital radiography 02 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(170,'digital-radiography-02-150x150.png','/uploads/2024/10/digital-radiography-02-150x150.png','image','image/png',13192,'digital radiography 02 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(171,'digital-radiography-02-300x238.png','/uploads/2024/10/digital-radiography-02-300x238.png','image','image/png',28001,'digital radiography 02 300x238',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(172,'digital-radiography-02-768x609.png','/uploads/2024/10/digital-radiography-02-768x609.png','image','image/png',113769,'digital radiography 02 768x609',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(173,'digital-radiography-02.png','/uploads/2024/10/digital-radiography-02.png','image','image/png',50554,'digital radiography 02',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(174,'digital-radiography-03-140x80.png','/uploads/2024/10/digital-radiography-03-140x80.png','image','image/png',7908,'digital radiography 03 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(175,'digital-radiography-03-150x150.png','/uploads/2024/10/digital-radiography-03-150x150.png','image','image/png',9911,'digital radiography 03 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(176,'digital-radiography-03-300x238.png','/uploads/2024/10/digital-radiography-03-300x238.png','image','image/png',26576,'digital radiography 03 300x238',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(177,'digital-radiography-03-768x609.png','/uploads/2024/10/digital-radiography-03-768x609.png','image','image/png',120948,'digital radiography 03 768x609',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(178,'digital-radiography-03.png','/uploads/2024/10/digital-radiography-03.png','image','image/png',50409,'digital radiography 03',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(179,'digital-radiography-150x150.png','/uploads/2024/10/digital-radiography-150x150.png','image','image/png',12419,'digital radiography 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(180,'digital-radiography-300x204.png','/uploads/2024/10/digital-radiography-300x204.png','image','image/png',20995,'digital radiography 300x204',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(181,'digital-radiography.png','/uploads/2024/10/digital-radiography.png','image','image/png',73605,'digital radiography',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(182,'dream-series-ceiling-suspended-140x80.png','/uploads/2024/10/dream-series-ceiling-suspended-140x80.png','image','image/png',4100,'dream series ceiling suspended 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(183,'dream-series-ceiling-suspended-150x150.png','/uploads/2024/10/dream-series-ceiling-suspended-150x150.png','image','image/png',8205,'dream series ceiling suspended 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(184,'dream-series-ceiling-suspended-300x238.png','/uploads/2024/10/dream-series-ceiling-suspended-300x238.png','image','image/png',19404,'dream series ceiling suspended 300x238',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(185,'dream-series-ceiling-suspended-768x609.png','/uploads/2024/10/dream-series-ceiling-suspended-768x609.png','image','image/png',88581,'dream series ceiling suspended 768x609',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(186,'dream-series-ceiling-suspended.png','/uploads/2024/10/dream-series-ceiling-suspended.png','image','image/png',43374,'dream series ceiling suspended',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(187,'drop-arrow.svg','/uploads/2024/10/drop-arrow.svg','svg','image/svg+xml',10890,'drop arrow',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(188,'fixed-dk-img-1024x340.png','/uploads/2024/10/fixed-dk-img-1024x340.png','image','image/png',92592,'fixed dk img 1024x340',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(189,'fixed-dk-img-150x150.png','/uploads/2024/10/fixed-dk-img-150x150.png','image','image/png',11670,'fixed dk img 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(190,'fixed-dk-img-1536x511.png','/uploads/2024/10/fixed-dk-img-1536x511.png','image','image/png',173069,'fixed dk img 1536x511',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(191,'fixed-dk-img-2048x681.png','/uploads/2024/10/fixed-dk-img-2048x681.png','image','image/png',245755,'fixed dk img 2048x681',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(192,'fixed-dk-img-300x100.png','/uploads/2024/10/fixed-dk-img-300x100.png','image','image/png',12350,'fixed dk img 300x100',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(193,'fixed-dk-img-768x255.png','/uploads/2024/10/fixed-dk-img-768x255.png','image','image/png',58679,'fixed dk img 768x255',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(194,'fixed-dk-img.png','/uploads/2024/10/fixed-dk-img.png','image','image/png',82568,'fixed dk img',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(195,'fi_10690924.svg','/uploads/2024/10/fi_10690924.svg','svg','image/svg+xml',1556,'fi 10690924',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(196,'fpd-01-140x80.png','/uploads/2024/10/fpd-01-140x80.png','image','image/png',8533,'fpd 01 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(197,'fpd-01-150x150.png','/uploads/2024/10/fpd-01-150x150.png','image','image/png',18190,'fpd 01 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(198,'fpd-01-300x238.png','/uploads/2024/10/fpd-01-300x238.png','image','image/png',37839,'fpd 01 300x238',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(199,'fpd-01-768x609.png','/uploads/2024/10/fpd-01-768x609.png','image','image/png',173788,'fpd 01 768x609',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(200,'fpd-01.png','/uploads/2024/10/fpd-01.png','image','image/png',77244,'fpd 01',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(201,'fpd-02-140x80.png','/uploads/2024/10/fpd-02-140x80.png','image','image/png',18328,'fpd 02 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(202,'fpd-02-150x150.png','/uploads/2024/10/fpd-02-150x150.png','image','image/png',29544,'fpd 02 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(203,'fpd-02-300x238.png','/uploads/2024/10/fpd-02-300x238.png','image','image/png',71213,'fpd 02 300x238',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(204,'fpd-02-768x609.png','/uploads/2024/10/fpd-02-768x609.png','image','image/png',420173,'fpd 02 768x609',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(205,'fpd-02.png','/uploads/2024/10/fpd-02.png','image','image/png',129789,'fpd 02',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(206,'fpd-03-140x80.png','/uploads/2024/10/fpd-03-140x80.png','image','image/png',5532,'fpd 03 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(207,'fpd-03-150x150.png','/uploads/2024/10/fpd-03-150x150.png','image','image/png',11600,'fpd 03 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(208,'fpd-03-300x238.png','/uploads/2024/10/fpd-03-300x238.png','image','image/png',24900,'fpd 03 300x238',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(209,'fpd-03-768x609.png','/uploads/2024/10/fpd-03-768x609.png','image','image/png',115398,'fpd 03 768x609',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(210,'fpd-03.png','/uploads/2024/10/fpd-03.png','image','image/png',53554,'fpd 03',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(211,'fpd-04-140x80.png','/uploads/2024/10/fpd-04-140x80.png','image','image/png',13285,'fpd 04 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(212,'fpd-04-150x150.png','/uploads/2024/10/fpd-04-150x150.png','image','image/png',23707,'fpd 04 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(213,'fpd-04-300x238.png','/uploads/2024/10/fpd-04-300x238.png','image','image/png',50042,'fpd 04 300x238',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(214,'fpd-04-768x609.png','/uploads/2024/10/fpd-04-768x609.png','image','image/png',245459,'fpd 04 768x609',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(215,'fpd-04.png','/uploads/2024/10/fpd-04.png','image','image/png',95222,'fpd 04',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(216,'fpd-05-140x80.png','/uploads/2024/10/fpd-05-140x80.png','image','image/png',7636,'fpd 05 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(217,'fpd-05-150x150.png','/uploads/2024/10/fpd-05-150x150.png','image','image/png',15208,'fpd 05 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(218,'fpd-05-300x238.png','/uploads/2024/10/fpd-05-300x238.png','image','image/png',31566,'fpd 05 300x238',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(219,'fpd-05-768x609.png','/uploads/2024/10/fpd-05-768x609.png','image','image/png',141059,'fpd 05 768x609',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(220,'fpd-05.png','/uploads/2024/10/fpd-05.png','image','image/png',67093,'fpd 05',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(221,'Frame-260-1024x432.jpg','/uploads/2024/10/Frame-260-1024x432.jpg','image','image/jpeg',7059,'Frame 260 1024x432',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(222,'Frame-260-150x150.jpg','/uploads/2024/10/Frame-260-150x150.jpg','image','image/jpeg',730,'Frame 260 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(223,'Frame-260-300x127.jpg','/uploads/2024/10/Frame-260-300x127.jpg','image','image/jpeg',1125,'Frame 260 300x127',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(224,'Frame-260-768x324.jpg','/uploads/2024/10/Frame-260-768x324.jpg','image','image/jpeg',4358,'Frame 260 768x324',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(225,'Frame-260.jpg','/uploads/2024/10/Frame-260.jpg','image','image/jpeg',54379,'Frame 260',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(226,'Frame-273-1-1-150x150.png','/uploads/2024/10/Frame-273-1-1-150x150.png','image','image/png',11038,'Frame 273 1 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(227,'Frame-273-1-1-300x161.png','/uploads/2024/10/Frame-273-1-1-300x161.png','image','image/png',21851,'Frame 273 1 1 300x161',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(228,'Frame-273-1-1.png','/uploads/2024/10/Frame-273-1-1.png','image','image/png',5249,'Frame 273 1 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(229,'Frame-32-3-1-1-150x150.jpg','/uploads/2024/10/Frame-32-3-1-1-150x150.jpg','image','image/jpeg',6491,'Frame 32 3 1 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(230,'Frame-32-3-1-1-300x300.jpg','/uploads/2024/10/Frame-32-3-1-1-300x300.jpg','image','image/jpeg',19225,'Frame 32 3 1 1 300x300',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(231,'Frame-32-3-1-1.jpg','/uploads/2024/10/Frame-32-3-1-1.jpg','image','image/jpeg',40448,'Frame 32 3 1 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(232,'Frame-32-3-1-150x150.jpg','/uploads/2024/10/Frame-32-3-1-150x150.jpg','image','image/jpeg',6323,'Frame 32 3 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(233,'Frame-32-3-1-300x227.jpg','/uploads/2024/10/Frame-32-3-1-300x227.jpg','image','image/jpeg',15868,'Frame 32 3 1 300x227',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(234,'Frame-32-3-1.jpg','/uploads/2024/10/Frame-32-3-1.jpg','image','image/jpeg',35792,'Frame 32 3 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(235,'Frame-32-4-1-1-150x150.jpg','/uploads/2024/10/Frame-32-4-1-1-150x150.jpg','image','image/jpeg',7292,'Frame 32 4 1 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(236,'Frame-32-4-1-1-300x256.jpg','/uploads/2024/10/Frame-32-4-1-1-300x256.jpg','image','image/jpeg',17357,'Frame 32 4 1 1 300x256',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(237,'Frame-32-4-1-1.jpg','/uploads/2024/10/Frame-32-4-1-1.jpg','image','image/jpeg',28454,'Frame 32 4 1 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(238,'Frame-32-4-1-150x150.jpg','/uploads/2024/10/Frame-32-4-1-150x150.jpg','image','image/jpeg',7634,'Frame 32 4 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(239,'Frame-32-4-1-300x209.jpg','/uploads/2024/10/Frame-32-4-1-300x209.jpg','image','image/jpeg',16814,'Frame 32 4 1 300x209',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(240,'Frame-32-4-1.jpg','/uploads/2024/10/Frame-32-4-1.jpg','image','image/jpeg',26944,'Frame 32 4 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(241,'Frame-32-5-1-150x150.jpg','/uploads/2024/10/Frame-32-5-1-150x150.jpg','image','image/jpeg',6589,'Frame 32 5 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(242,'Frame-32-5-1-300x228.jpg','/uploads/2024/10/Frame-32-5-1-300x228.jpg','image','image/jpeg',14626,'Frame 32 5 1 300x228',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(243,'Frame-32-5-1.jpg','/uploads/2024/10/Frame-32-5-1.jpg','image','image/jpeg',27387,'Frame 32 5 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(244,'Frame-32-6-1-150x150.jpg','/uploads/2024/10/Frame-32-6-1-150x150.jpg','image','image/jpeg',6251,'Frame 32 6 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(245,'Frame-32-6-1-280x300.jpg','/uploads/2024/10/Frame-32-6-1-280x300.jpg','image','image/jpeg',16054,'Frame 32 6 1 280x300',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(246,'Frame-32-6-1.jpg','/uploads/2024/10/Frame-32-6-1.jpg','image','image/jpeg',32094,'Frame 32 6 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(247,'Frame-322.svg','/uploads/2024/10/Frame-322.svg','svg','image/svg+xml',15180,'Frame 322',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(248,'Frame-32@2x-1-150x150.jpg','/uploads/2024/10/Frame-32@2x-1-150x150.jpg','image','image/jpeg',7760,'Frame 32@2x 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(249,'Frame-32@2x-1-254x300.jpg','/uploads/2024/10/Frame-32@2x-1-254x300.jpg','image','image/jpeg',20214,'Frame 32@2x 1 254x300',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(250,'Frame-32@2x-1.jpg','/uploads/2024/10/Frame-32@2x-1.jpg','image','image/jpeg',45210,'Frame 32@2x 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(251,'Frame-337-1-140x80.jpg','/uploads/2024/10/Frame-337-1-140x80.jpg','image','image/jpeg',4429,'Frame 337 1 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(252,'Frame-337-1-150x150.jpg','/uploads/2024/10/Frame-337-1-150x150.jpg','image','image/jpeg',2535,'Frame 337 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(253,'Frame-337-1-300x238.jpg','/uploads/2024/10/Frame-337-1-300x238.jpg','image','image/jpeg',4942,'Frame 337 1 300x238',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(254,'Frame-337-1.jpg','/uploads/2024/10/Frame-337-1.jpg','image','image/jpeg',45377,'Frame 337 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(255,'Frame-337-140x80.jpg','/uploads/2024/10/Frame-337-140x80.jpg','image','image/jpeg',6743,'Frame 337 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(256,'Frame-337-150x150.jpg','/uploads/2024/10/Frame-337-150x150.jpg','image','image/jpeg',3426,'Frame 337 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(257,'Frame-337-300x238.jpg','/uploads/2024/10/Frame-337-300x238.jpg','image','image/jpeg',6810,'Frame 337 300x238',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(258,'Frame-337.jpg','/uploads/2024/10/Frame-337.jpg','image','image/jpeg',60673,'Frame 337',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(259,'Frame-338-140x80.jpg','/uploads/2024/10/Frame-338-140x80.jpg','image','image/jpeg',4641,'Frame 338 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(260,'Frame-338-150x150.jpg','/uploads/2024/10/Frame-338-150x150.jpg','image','image/jpeg',2748,'Frame 338 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(261,'Frame-338-300x238.jpg','/uploads/2024/10/Frame-338-300x238.jpg','image','image/jpeg',5379,'Frame 338 300x238',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(262,'Frame-338.jpg','/uploads/2024/10/Frame-338.jpg','image','image/jpeg',38175,'Frame 338',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(263,'Frame-339-140x80.jpg','/uploads/2024/10/Frame-339-140x80.jpg','image','image/jpeg',14512,'Frame 339 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(264,'Frame-339-150x150.jpg','/uploads/2024/10/Frame-339-150x150.jpg','image','image/jpeg',5685,'Frame 339 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(265,'Frame-339-300x238.jpg','/uploads/2024/10/Frame-339-300x238.jpg','image','image/jpeg',12906,'Frame 339 300x238',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(266,'Frame-339.jpg','/uploads/2024/10/Frame-339.jpg','image','image/jpeg',123609,'Frame 339',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(267,'Frame-360-1-1024x848.png','/uploads/2024/10/Frame-360-1-1024x848.png','image','image/png',1384598,'Frame 360 1 1024x848',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(268,'Frame-360-1-150x150.png','/uploads/2024/10/Frame-360-1-150x150.png','image','image/png',49492,'Frame 360 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(269,'Frame-360-1-300x249.png','/uploads/2024/10/Frame-360-1-300x249.png','image','image/png',144432,'Frame 360 1 300x249',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(270,'Frame-360-1-768x636.png','/uploads/2024/10/Frame-360-1-768x636.png','image','image/png',796846,'Frame 360 1 768x636',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(271,'Frame-360-1.png','/uploads/2024/10/Frame-360-1.png','image','image/png',544339,'Frame 360 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(272,'Frame-361-1024x915.jpg','/uploads/2024/10/Frame-361-1024x915.jpg','image','image/jpeg',12785,'Frame 361 1024x915',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(273,'Frame-361-150x150.jpg','/uploads/2024/10/Frame-361-150x150.jpg','image','image/jpeg',730,'Frame 361 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(274,'Frame-361-300x268.jpg','/uploads/2024/10/Frame-361-300x268.jpg','image','image/jpeg',1614,'Frame 361 300x268',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(275,'Frame-361-768x686.jpg','/uploads/2024/10/Frame-361-768x686.jpg','image','image/jpeg',7524,'Frame 361 768x686',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(276,'Frame-361.jpg','/uploads/2024/10/Frame-361.jpg','image','image/jpeg',82091,'Frame 361',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(277,'Frame-390-1.svg','/uploads/2024/10/Frame-390-1.svg','svg','image/svg+xml',20927,'Frame 390 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(278,'Frame-390.svg','/uploads/2024/10/Frame-390.svg','svg','image/svg+xml',20927,'Frame 390',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(279,'Frame-396.png','/uploads/2024/10/Frame-396.png','image','image/png',13790,'Frame 396',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(280,'Frame-397.png','/uploads/2024/10/Frame-397.png','image','image/png',9125,'Frame 397',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(281,'Frame-398.png','/uploads/2024/10/Frame-398.png','image','image/png',5808,'Frame 398',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(282,'Frame-399.png','/uploads/2024/10/Frame-399.png','image','image/png',13316,'Frame 399',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(283,'Frame-400.png','/uploads/2024/10/Frame-400.png','image','image/png',10204,'Frame 400',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(284,'Frame-401.png','/uploads/2024/10/Frame-401.png','image','image/png',11283,'Frame 401',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(285,'Frame-56-1-1024x481.jpg','/uploads/2024/10/Frame-56-1-1024x481.jpg','image','image/jpeg',7802,'Frame 56 1 1024x481',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(286,'Frame-56-1-150x150.jpg','/uploads/2024/10/Frame-56-1-150x150.jpg','image','image/jpeg',648,'Frame 56 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(287,'Frame-56-1-300x141.jpg','/uploads/2024/10/Frame-56-1-300x141.jpg','image','image/jpeg',955,'Frame 56 1 300x141',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(288,'Frame-56-1-768x361.jpg','/uploads/2024/10/Frame-56-1-768x361.jpg','image','image/jpeg',4552,'Frame 56 1 768x361',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(289,'Frame-56-1.jpg','/uploads/2024/10/Frame-56-1.jpg','image','image/jpeg',7327,'Frame 56 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(290,'Frame-9-1-1-1024x474.jpg','/uploads/2024/10/Frame-9-1-1-1024x474.jpg','image','image/jpeg',40560,'Frame 9 1 1 1024x474',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(291,'Frame-9-1-1-150x150.jpg','/uploads/2024/10/Frame-9-1-1-150x150.jpg','image','image/jpeg',4611,'Frame 9 1 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(292,'Frame-9-1-1-300x139.jpg','/uploads/2024/10/Frame-9-1-1-300x139.jpg','image','image/jpeg',6766,'Frame 9 1 1 300x139',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(293,'Frame-9-1-1-768x356.jpg','/uploads/2024/10/Frame-9-1-1-768x356.jpg','image','image/jpeg',26699,'Frame 9 1 1 768x356',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(294,'Frame-9-1-1.jpg','/uploads/2024/10/Frame-9-1-1.jpg','image','image/jpeg',63838,'Frame 9 1 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(295,'Frame-9-1-1024x474.jpg','/uploads/2024/10/Frame-9-1-1024x474.jpg','image','image/jpeg',52943,'Frame 9 1 1024x474',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(296,'Frame-9-1-150x150.jpg','/uploads/2024/10/Frame-9-1-150x150.jpg','image','image/jpeg',4912,'Frame 9 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(297,'Frame-9-1-300x139.jpg','/uploads/2024/10/Frame-9-1-300x139.jpg','image','image/jpeg',8415,'Frame 9 1 300x139',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(298,'Frame-9-1-768x356.jpg','/uploads/2024/10/Frame-9-1-768x356.jpg','image','image/jpeg',34805,'Frame 9 1 768x356',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(299,'Frame-9-1.jpg','/uploads/2024/10/Frame-9-1.jpg','image','image/jpeg',102116,'Frame 9 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(300,'Frame-96-1-1024x856.jpg','/uploads/2024/10/Frame-96-1-1024x856.jpg','image','image/jpeg',13896,'Frame 96 1 1024x856',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(301,'Frame-96-1-150x150.jpg','/uploads/2024/10/Frame-96-1-150x150.jpg','image','image/jpeg',872,'Frame 96 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(302,'Frame-96-1-300x251.jpg','/uploads/2024/10/Frame-96-1-300x251.jpg','image','image/jpeg',1951,'Frame 96 1 300x251',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(303,'Frame-96-1-768x642.jpg','/uploads/2024/10/Frame-96-1-768x642.jpg','image','image/jpeg',8282,'Frame 96 1 768x642',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(304,'Frame-96-1.jpg','/uploads/2024/10/Frame-96-1.jpg','image','image/jpeg',13210,'Frame 96 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(305,'Frame-96-2-1-1024x679.jpg','/uploads/2024/10/Frame-96-2-1-1024x679.jpg','image','image/jpeg',11787,'Frame 96 2 1 1024x679',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(306,'Frame-96-2-1-150x150.jpg','/uploads/2024/10/Frame-96-2-1-150x150.jpg','image','image/jpeg',866,'Frame 96 2 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(307,'Frame-96-2-1-300x199.jpg','/uploads/2024/10/Frame-96-2-1-300x199.jpg','image','image/jpeg',1739,'Frame 96 2 1 300x199',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(308,'Frame-96-2-1-768x509.jpg','/uploads/2024/10/Frame-96-2-1-768x509.jpg','image','image/jpeg',7143,'Frame 96 2 1 768x509',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(309,'Frame-96-2-1.jpg','/uploads/2024/10/Frame-96-2-1.jpg','image','image/jpeg',10967,'Frame 96 2 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(310,'Frame-97-4-1-150x150.jpg','/uploads/2024/10/Frame-97-4-1-150x150.jpg','image','image/jpeg',5680,'Frame 97 4 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(311,'Frame-97-4-1-300x198.jpg','/uploads/2024/10/Frame-97-4-1-300x198.jpg','image','image/jpeg',13456,'Frame 97 4 1 300x198',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(312,'Frame-97-4-1.jpg','/uploads/2024/10/Frame-97-4-1.jpg','image','image/jpeg',45774,'Frame 97 4 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(313,'gastroenterology-150x150.png','/uploads/2024/10/gastroenterology-150x150.png','image','image/png',31629,'gastroenterology 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(314,'gastroenterology-300x224.png','/uploads/2024/10/gastroenterology-300x224.png','image','image/png',86008,'gastroenterology 300x224',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(315,'gastroenterology.png','/uploads/2024/10/gastroenterology.png','image','image/png',105991,'gastroenterology',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(316,'hf-fixed-01-1-150x150.png','/uploads/2024/10/hf-fixed-01-1-150x150.png','image','image/png',16568,'hf fixed 01 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(317,'hf-fixed-01-1-300x238.png','/uploads/2024/10/hf-fixed-01-1-300x238.png','image','image/png',35080,'hf fixed 01 1 300x238',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(318,'hf-fixed-01-1-768x609.png','/uploads/2024/10/hf-fixed-01-1-768x609.png','image','image/png',157859,'hf fixed 01 1 768x609',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(319,'hf-fixed-01-1.png','/uploads/2024/10/hf-fixed-01-1.png','image','image/png',71293,'hf fixed 01 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(320,'hf-fixed-01-140x80.png','/uploads/2024/10/hf-fixed-01-140x80.png','image','image/png',8637,'hf fixed 01 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(321,'hf-fixed-01-150x150.png','/uploads/2024/10/hf-fixed-01-150x150.png','image','image/png',16568,'hf fixed 01 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(322,'hf-fixed-01-300x238.png','/uploads/2024/10/hf-fixed-01-300x238.png','image','image/png',35080,'hf fixed 01 300x238',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(323,'hf-fixed-01-768x609.png','/uploads/2024/10/hf-fixed-01-768x609.png','image','image/png',157859,'hf fixed 01 768x609',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(324,'hf-fixed-01.png','/uploads/2024/10/hf-fixed-01.png','image','image/png',71293,'hf fixed 01',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(325,'hf-fixed-02-140x80.png','/uploads/2024/10/hf-fixed-02-140x80.png','image','image/png',5155,'hf fixed 02 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(326,'hf-fixed-02-150x150.png','/uploads/2024/10/hf-fixed-02-150x150.png','image','image/png',9478,'hf fixed 02 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(327,'hf-fixed-02-300x238.png','/uploads/2024/10/hf-fixed-02-300x238.png','image','image/png',19363,'hf fixed 02 300x238',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(328,'hf-fixed-02-768x609.png','/uploads/2024/10/hf-fixed-02-768x609.png','image','image/png',84408,'hf fixed 02 768x609',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(329,'hf-fixed-02.png','/uploads/2024/10/hf-fixed-02.png','image','image/png',40946,'hf fixed 02',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(330,'hf-fixed-03-140x80.png','/uploads/2024/10/hf-fixed-03-140x80.png','image','image/png',4291,'hf fixed 03 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(331,'hf-fixed-03-150x150.png','/uploads/2024/10/hf-fixed-03-150x150.png','image','image/png',10335,'hf fixed 03 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(332,'hf-fixed-03-300x238.png','/uploads/2024/10/hf-fixed-03-300x238.png','image','image/png',22475,'hf fixed 03 300x238',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(333,'hf-fixed-03-768x609.png','/uploads/2024/10/hf-fixed-03-768x609.png','image','image/png',106308,'hf fixed 03 768x609',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(334,'hf-fixed-03.png','/uploads/2024/10/hf-fixed-03.png','image','image/png',50078,'hf fixed 03',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(335,'hf-fixed-04-140x80.png','/uploads/2024/10/hf-fixed-04-140x80.png','image','image/png',8926,'hf fixed 04 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(336,'hf-fixed-04-150x150.png','/uploads/2024/10/hf-fixed-04-150x150.png','image','image/png',12138,'hf fixed 04 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(337,'hf-fixed-04-300x238.png','/uploads/2024/10/hf-fixed-04-300x238.png','image','image/png',30078,'hf fixed 04 300x238',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(338,'hf-fixed-04-768x609.png','/uploads/2024/10/hf-fixed-04-768x609.png','image','image/png',132602,'hf fixed 04 768x609',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(339,'hf-fixed-04.png','/uploads/2024/10/hf-fixed-04.png','image','image/png',60377,'hf fixed 04',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(340,'hf-mobile-mac-1024x984.png','/uploads/2024/10/hf-mobile-mac-1024x984.png','image','image/png',208694,'hf mobile mac 1024x984',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(341,'hf-mobile-mac-150x150.png','/uploads/2024/10/hf-mobile-mac-150x150.png','image','image/png',11709,'hf mobile mac 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(342,'hf-mobile-mac-300x288.png','/uploads/2024/10/hf-mobile-mac-300x288.png','image','image/png',35588,'hf mobile mac 300x288',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(343,'hf-mobile-mac-768x738.png','/uploads/2024/10/hf-mobile-mac-768x738.png','image','image/png',145823,'hf mobile mac 768x738',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(344,'hf-mobile-mac.png','/uploads/2024/10/hf-mobile-mac.png','image','image/png',66024,'hf mobile mac',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(345,'icon-01.svg','/uploads/2024/10/icon-01.svg','svg','image/svg+xml',21786,'icon 01',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(346,'icon-02.svg','/uploads/2024/10/icon-02.svg','svg','image/svg+xml',26162,'icon 02',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(347,'icon-03.svg','/uploads/2024/10/icon-03.svg','svg','image/svg+xml',20298,'icon 03',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(348,'icon-04.svg','/uploads/2024/10/icon-04.svg','svg','image/svg+xml',27398,'icon 04',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(349,'icon-05.svg','/uploads/2024/10/icon-05.svg','svg','image/svg+xml',26406,'icon 05',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(350,'image-1-1-1024x474.jpg','/uploads/2024/10/image-1-1-1024x474.jpg','image','image/jpeg',43672,'image 1 1 1024x474',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(351,'image-1-1-150x150.jpg','/uploads/2024/10/image-1-1-150x150.jpg','image','image/jpeg',4591,'image 1 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(352,'image-1-1-300x139.jpg','/uploads/2024/10/image-1-1-300x139.jpg','image','image/jpeg',7157,'image 1 1 300x139',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(353,'image-1-1-768x356.jpg','/uploads/2024/10/image-1-1-768x356.jpg','image','image/jpeg',28945,'image 1 1 768x356',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(354,'image-1-1.jpg','/uploads/2024/10/image-1-1.jpg','image','image/jpeg',77513,'image 1 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(355,'image-51-2-1-1024x475.jpg','/uploads/2024/10/image-51-2-1-1024x475.jpg','image','image/jpeg',46215,'image 51 2 1 1024x475',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(356,'image-51-2-1-150x150.jpg','/uploads/2024/10/image-51-2-1-150x150.jpg','image','image/jpeg',4571,'image 51 2 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(357,'image-51-2-1-300x139.jpg','/uploads/2024/10/image-51-2-1-300x139.jpg','image','image/jpeg',7560,'image 51 2 1 300x139',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(358,'image-51-2-1-768x356.jpg','/uploads/2024/10/image-51-2-1-768x356.jpg','image','image/jpeg',30098,'image 51 2 1 768x356',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(359,'image-51-2-1.jpg','/uploads/2024/10/image-51-2-1.jpg','image','image/jpeg',88189,'image 51 2 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(360,'image-54-1-1024x475.jpg','/uploads/2024/10/image-54-1-1024x475.jpg','image','image/jpeg',52575,'image 54 1 1024x475',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(361,'image-54-1-150x150.jpg','/uploads/2024/10/image-54-1-150x150.jpg','image','image/jpeg',3727,'image 54 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(362,'image-54-1-300x139.jpg','/uploads/2024/10/image-54-1-300x139.jpg','image','image/jpeg',7046,'image 54 1 300x139',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(363,'image-54-1-768x356.jpg','/uploads/2024/10/image-54-1-768x356.jpg','image','image/jpeg',32865,'image 54 1 768x356',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(364,'image-54-1.jpg','/uploads/2024/10/image-54-1.jpg','image','image/jpeg',120269,'image 54 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(365,'image-56.svg','/uploads/2024/10/image-56.svg','svg','image/svg+xml',29420,'image 56',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(366,'image-57.svg','/uploads/2024/10/image-57.svg','svg','image/svg+xml',1695596,'image 57',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(367,'image-58.svg','/uploads/2024/10/image-58.svg','svg','image/svg+xml',25607,'image 58',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(368,'line-frequency-x-ray-img-01-140x80.png','/uploads/2024/10/line-frequency-x-ray-img-01-140x80.png','image','image/png',4237,'line frequency x ray img 01 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(369,'line-frequency-x-ray-img-01-150x150.png','/uploads/2024/10/line-frequency-x-ray-img-01-150x150.png','image','image/png',9484,'line frequency x ray img 01 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(370,'line-frequency-x-ray-img-01-300x238.png','/uploads/2024/10/line-frequency-x-ray-img-01-300x238.png','image','image/png',19616,'line frequency x ray img 01 300x238',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(371,'line-frequency-x-ray-img-01-768x609.png','/uploads/2024/10/line-frequency-x-ray-img-01-768x609.png','image','image/png',87441,'line frequency x ray img 01 768x609',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(372,'line-frequency-x-ray-img-01.png','/uploads/2024/10/line-frequency-x-ray-img-01.png','image','image/png',37713,'line frequency x ray img 01',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(373,'line-frequency-x-ray-img-02-140x80.png','/uploads/2024/10/line-frequency-x-ray-img-02-140x80.png','image','image/png',3397,'line frequency x ray img 02 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(374,'line-frequency-x-ray-img-02-150x150.png','/uploads/2024/10/line-frequency-x-ray-img-02-150x150.png','image','image/png',7672,'line frequency x ray img 02 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(375,'line-frequency-x-ray-img-02-300x238.png','/uploads/2024/10/line-frequency-x-ray-img-02-300x238.png','image','image/png',15704,'line frequency x ray img 02 300x238',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(376,'line-frequency-x-ray-img-02-768x609.png','/uploads/2024/10/line-frequency-x-ray-img-02-768x609.png','image','image/png',67269,'line frequency x ray img 02 768x609',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(377,'line-frequency-x-ray-img-02.png','/uploads/2024/10/line-frequency-x-ray-img-02.png','image','image/png',30465,'line frequency x ray img 02',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(378,'Mask-group-55-1.svg','/uploads/2024/10/Mask-group-55-1.svg','svg','image/svg+xml',11378,'Mask group 55 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(379,'Mask-group-55.svg','/uploads/2024/10/Mask-group-55.svg','svg','image/svg+xml',28940,'Mask group 55',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(380,'Mask-group-56.svg','/uploads/2024/10/Mask-group-56.svg','svg','image/svg+xml',25828,'Mask group 56',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(381,'Mask-group-57.svg','/uploads/2024/10/Mask-group-57.svg','svg','image/svg+xml',28352,'Mask group 57',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(382,'Mask-group-58.svg','/uploads/2024/10/Mask-group-58.svg','svg','image/svg+xml',34048,'Mask group 58',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(383,'Mask-group-59.svg','/uploads/2024/10/Mask-group-59.svg','svg','image/svg+xml',26656,'Mask group 59',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(384,'Mask-group-60.svg','/uploads/2024/10/Mask-group-60.svg','svg','image/svg+xml',19244,'Mask group 60',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(385,'Mask-group-61.svg','/uploads/2024/10/Mask-group-61.svg','svg','image/svg+xml',22320,'Mask group 61',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(386,'Mask-group-62.svg','/uploads/2024/10/Mask-group-62.svg','svg','image/svg+xml',25696,'Mask group 62',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(387,'Mask-group-63.svg','/uploads/2024/10/Mask-group-63.svg','svg','image/svg+xml',25776,'Mask group 63',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(388,'neurology-150x150.png','/uploads/2024/10/neurology-150x150.png','image','image/png',29196,'neurology 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(389,'neurology-300x224.png','/uploads/2024/10/neurology-300x224.png','image','image/png',76519,'neurology 300x224',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(390,'neurology.png','/uploads/2024/10/neurology.png','image','image/png',86819,'neurology',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(391,'new-icon.svg','/uploads/2024/10/new-icon.svg','svg','image/svg+xml',20356,'new icon',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(392,'orthopedic-150x150.png','/uploads/2024/10/orthopedic-150x150.png','image','image/png',40118,'orthopedic 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(393,'orthopedic-300x224.png','/uploads/2024/10/orthopedic-300x224.png','image','image/png',104698,'orthopedic 300x224',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(394,'orthopedic.png','/uploads/2024/10/orthopedic.png','image','image/png',141495,'orthopedic',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(395,'our-products-banner-1024x474.png','/uploads/2024/10/our-products-banner-1024x474.png','image','image/png',263113,'our products banner 1024x474',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(396,'our-products-banner-150x150.png','/uploads/2024/10/our-products-banner-150x150.png','image','image/png',19095,'our products banner 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(397,'our-products-banner-1536x711.png','/uploads/2024/10/our-products-banner-1536x711.png','image','image/png',518541,'our products banner 1536x711',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(398,'our-products-banner-2048x948.png','/uploads/2024/10/our-products-banner-2048x948.png','image','image/png',827308,'our products banner 2048x948',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(399,'our-products-banner-300x139.png','/uploads/2024/10/our-products-banner-300x139.png','image','image/png',36324,'our products banner 300x139',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(400,'our-products-banner-768x356.png','/uploads/2024/10/our-products-banner-768x356.png','image','image/png',163568,'our products banner 768x356',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(401,'our-products-banner.png','/uploads/2024/10/our-products-banner.png','image','image/png',504807,'our products banner',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(402,'our-spec-1024x703.png','/uploads/2024/10/our-spec-1024x703.png','image','image/png',62397,'our spec 1024x703',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(403,'our-spec-150x150.png','/uploads/2024/10/our-spec-150x150.png','image','image/png',3534,'our spec 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(404,'our-spec-1536x1054.png','/uploads/2024/10/our-spec-1536x1054.png','image','image/png',203565,'our spec 1536x1054',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(405,'our-spec-2048x1406.png','/uploads/2024/10/our-spec-2048x1406.png','image','image/png',394621,'our spec 2048x1406',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(406,'our-spec-300x206.png','/uploads/2024/10/our-spec-300x206.png','image','image/png',6634,'our spec 300x206',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(407,'our-spec-768x527.png','/uploads/2024/10/our-spec-768x527.png','image','image/png',25382,'our spec 768x527',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(408,'our-spec.png','/uploads/2024/10/our-spec.png','image','image/png',39287,'our spec',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(409,'our-specialties-1024x474.png','/uploads/2024/10/our-specialties-1024x474.png','image','image/png',272973,'our specialties 1024x474',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(410,'our-specialties-150x150.png','/uploads/2024/10/our-specialties-150x150.png','image','image/png',19279,'our specialties 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(411,'our-specialties-300x139.png','/uploads/2024/10/our-specialties-300x139.png','image','image/png',36418,'our specialties 300x139',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(412,'our-specialties-768x356.png','/uploads/2024/10/our-specialties-768x356.png','image','image/png',167974,'our specialties 768x356',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(413,'our-specialties.png','/uploads/2024/10/our-specialties.png','image','image/png',272468,'our specialties',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(414,'product.svg','/uploads/2024/10/product.svg','svg','image/svg+xml',19224,'product',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(415,'rad-icon-1.svg','/uploads/2024/10/rad-icon-1.svg','svg','image/svg+xml',21786,'rad icon 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(416,'rad-icon-2.svg','/uploads/2024/10/rad-icon-2.svg','svg','image/svg+xml',26162,'rad icon 2',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(417,'rad-icon-3.svg','/uploads/2024/10/rad-icon-3.svg','svg','image/svg+xml',20298,'rad icon 3',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(418,'rad-icon-4.svg','/uploads/2024/10/rad-icon-4.svg','svg','image/svg+xml',27398,'rad icon 4',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(419,'rad-icon-5-final.svg','/uploads/2024/10/rad-icon-5-final.svg','svg','image/svg+xml',26406,'rad icon 5 final',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(420,'rad-icon-5.svg','/uploads/2024/10/rad-icon-5.svg','svg','image/svg+xml',26406,'rad icon 5',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(421,'radiology-150x150.png','/uploads/2024/10/radiology-150x150.png','image','image/png',39520,'radiology 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(422,'radiology-300x224.png','/uploads/2024/10/radiology-300x224.png','image','image/png',101823,'radiology 300x224',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(423,'radiology.png','/uploads/2024/10/radiology.png','image','image/png',130940,'radiology',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(424,'RS3-removebg-preview-1.svg','/uploads/2024/10/RS3-removebg-preview-1.svg','svg','image/svg+xml',84644,'RS3 removebg preview 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(425,'urology-150x150.png','/uploads/2024/10/urology-150x150.png','image','image/png',31025,'urology 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(426,'urology-300x224.png','/uploads/2024/10/urology-300x224.png','image','image/png',80126,'urology 300x224',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(427,'urology.png','/uploads/2024/10/urology.png','image','image/png',85623,'urology',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(428,'Container-4.png','/uploads/2024/11/Container-4.png','image','image/png',217,'Container 4',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(429,'Container-5.png','/uploads/2024/11/Container-5.png','image','image/png',2163,'Container 5',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(430,'Figure-→-Testimonial-Image-1.jpg.png','/uploads/2024/11/Figure-→-Testimonial-Image-1.jpg.png','image','image/png',23573,'Figure → Testimonial Image 1.jpg',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(431,'Figure-→-Testimonial-Image-2.jpg.png','/uploads/2024/11/Figure-→-Testimonial-Image-2.jpg.png','image','image/png',20679,'Figure → Testimonial Image 2.jpg',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(432,'Frame-350-1-150x150.jpg','/uploads/2024/11/Frame-350-1-150x150.jpg','image','image/jpeg',2560,'Frame 350 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(433,'Frame-350-1-300x288.jpg','/uploads/2024/11/Frame-350-1-300x288.jpg','image','image/jpeg',6626,'Frame 350 1 300x288',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(434,'Frame-350-1.jpg','/uploads/2024/11/Frame-350-1.jpg','image','image/jpeg',29266,'Frame 350 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(435,'Frame-350-150x150.jpg','/uploads/2024/11/Frame-350-150x150.jpg','image','image/jpeg',2560,'Frame 350 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(436,'Frame-350-2-150x150.jpg','/uploads/2024/11/Frame-350-2-150x150.jpg','image','image/jpeg',2560,'Frame 350 2 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(437,'Frame-350-2-300x288.jpg','/uploads/2024/11/Frame-350-2-300x288.jpg','image','image/jpeg',6626,'Frame 350 2 300x288',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(438,'Frame-350-2.jpg','/uploads/2024/11/Frame-350-2.jpg','image','image/jpeg',29266,'Frame 350 2',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(439,'Frame-350-300x288.jpg','/uploads/2024/11/Frame-350-300x288.jpg','image','image/jpeg',6626,'Frame 350 300x288',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(440,'Frame-350.jpg','/uploads/2024/11/Frame-350.jpg','image','image/jpeg',29266,'Frame 350',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(441,'Frame-352-1-150x150.jpg','/uploads/2024/11/Frame-352-1-150x150.jpg','image','image/jpeg',2088,'Frame 352 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(442,'Frame-352-1-300x288.jpg','/uploads/2024/11/Frame-352-1-300x288.jpg','image','image/jpeg',5405,'Frame 352 1 300x288',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(443,'Frame-352-1.jpg','/uploads/2024/11/Frame-352-1.jpg','image','image/jpeg',24375,'Frame 352 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(444,'Frame-352-150x150.jpg','/uploads/2024/11/Frame-352-150x150.jpg','image','image/jpeg',2088,'Frame 352 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(445,'Frame-352-2-150x150.jpg','/uploads/2024/11/Frame-352-2-150x150.jpg','image','image/jpeg',2088,'Frame 352 2 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(446,'Frame-352-2-300x288.jpg','/uploads/2024/11/Frame-352-2-300x288.jpg','image','image/jpeg',5405,'Frame 352 2 300x288',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(447,'Frame-352-2.jpg','/uploads/2024/11/Frame-352-2.jpg','image','image/jpeg',24375,'Frame 352 2',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(448,'Frame-352-300x288.jpg','/uploads/2024/11/Frame-352-300x288.jpg','image','image/jpeg',5405,'Frame 352 300x288',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(449,'Frame-352.jpg','/uploads/2024/11/Frame-352.jpg','image','image/jpeg',24375,'Frame 352',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(450,'Frame-353-1-150x150.jpg','/uploads/2024/11/Frame-353-1-150x150.jpg','image','image/jpeg',4497,'Frame 353 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(451,'Frame-353-1-300x288.jpg','/uploads/2024/11/Frame-353-1-300x288.jpg','image','image/jpeg',12454,'Frame 353 1 300x288',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(452,'Frame-353-1.jpg','/uploads/2024/11/Frame-353-1.jpg','image','image/jpeg',53956,'Frame 353 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(453,'Frame-353-150x150.jpg','/uploads/2024/11/Frame-353-150x150.jpg','image','image/jpeg',4497,'Frame 353 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(454,'Frame-353-2-150x150.jpg','/uploads/2024/11/Frame-353-2-150x150.jpg','image','image/jpeg',4497,'Frame 353 2 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(455,'Frame-353-2-300x288.jpg','/uploads/2024/11/Frame-353-2-300x288.jpg','image','image/jpeg',12454,'Frame 353 2 300x288',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(456,'Frame-353-2.jpg','/uploads/2024/11/Frame-353-2.jpg','image','image/jpeg',53956,'Frame 353 2',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(457,'Frame-353-300x288.jpg','/uploads/2024/11/Frame-353-300x288.jpg','image','image/jpeg',12454,'Frame 353 300x288',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(458,'Frame-353.jpg','/uploads/2024/11/Frame-353.jpg','image','image/jpeg',53956,'Frame 353',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(459,'Frame-96-1-1024x809.jpg','/uploads/2024/11/Frame-96-1-1024x809.jpg','image','image/jpeg',11870,'Frame 96 1 1024x809',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(460,'Frame-96-1-150x150.jpg','/uploads/2024/11/Frame-96-1-150x150.jpg','image','image/jpeg',611,'Frame 96 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(461,'Frame-96-1-300x237.jpg','/uploads/2024/11/Frame-96-1-300x237.jpg','image','image/jpeg',1298,'Frame 96 1 300x237',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(462,'Frame-96-1-768x607.jpg','/uploads/2024/11/Frame-96-1-768x607.jpg','image','image/jpeg',6877,'Frame 96 1 768x607',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(463,'Frame-96-1.jpg','/uploads/2024/11/Frame-96-1.jpg','image','image/jpeg',11982,'Frame 96 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(464,'image-90-1-1024x475.jpg','/uploads/2024/11/image-90-1-1024x475.jpg','image','image/jpeg',41734,'image 90 1 1024x475',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(465,'image-90-1-150x150.jpg','/uploads/2024/11/image-90-1-150x150.jpg','image','image/jpeg',3221,'image 90 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(466,'image-90-1-300x139.jpg','/uploads/2024/11/image-90-1-300x139.jpg','image','image/jpeg',6670,'image 90 1 300x139',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(467,'image-90-1-768x356.jpg','/uploads/2024/11/image-90-1-768x356.jpg','image','image/jpeg',26910,'image 90 1 768x356',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(468,'image-90-1.jpg','/uploads/2024/11/image-90-1.jpg','image','image/jpeg',78235,'image 90 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(469,'Figure-→-Testimonial-Image-1.jpg-1-150x150.png','/uploads/2024/12/Figure-→-Testimonial-Image-1.jpg-1-150x150.png','image','image/png',23631,'Figure → Testimonial Image 1.jpg 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(470,'Figure-→-Testimonial-Image-1.jpg-1.png','/uploads/2024/12/Figure-→-Testimonial-Image-1.jpg-1.png','image','image/png',17924,'Figure → Testimonial Image 1.jpg 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(471,'Figure-→-Testimonial-Image-1.jpg-2-150x150.png','/uploads/2024/12/Figure-→-Testimonial-Image-1.jpg-2-150x150.png','image','image/png',18966,'Figure → Testimonial Image 1.jpg 2 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(472,'Figure-→-Testimonial-Image-1.jpg-2.png','/uploads/2024/12/Figure-→-Testimonial-Image-1.jpg-2.png','image','image/png',25268,'Figure → Testimonial Image 1.jpg 2',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(473,'Figure-→-Testimonial-Image-1.jpg-3-150x150.png','/uploads/2024/12/Figure-→-Testimonial-Image-1.jpg-3-150x150.png','image','image/png',31604,'Figure → Testimonial Image 1.jpg 3 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(474,'Figure-→-Testimonial-Image-1.jpg-3.png','/uploads/2024/12/Figure-→-Testimonial-Image-1.jpg-3.png','image','image/png',42723,'Figure → Testimonial Image 1.jpg 3',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(475,'Frame-387-150x150.png','/uploads/2024/12/Frame-387-150x150.png','image','image/png',22855,'Frame 387 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(476,'Frame-387.png','/uploads/2024/12/Frame-387.png','image','image/png',31910,'Frame 387',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(477,'Mask-group-77.svg','/uploads/2024/12/Mask-group-77.svg','svg','image/svg+xml',26926,'Mask group 77',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(478,'Mask-group-78.svg','/uploads/2024/12/Mask-group-78.svg','svg','image/svg+xml',26958,'Mask group 78',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(479,'Screenshot-21-150x150.png','/uploads/2024/12/Screenshot-21-150x150.png','image','image/png',24291,'Screenshot 21 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(480,'Screenshot-21.png','/uploads/2024/12/Screenshot-21.png','image','image/png',34090,'Screenshot 21',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(481,'01-1-1024x683.jpg','/uploads/2025/02/01-1-1024x683.jpg','image','image/jpeg',21984,'01 1 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(482,'01-1-140x80.jpg','/uploads/2025/02/01-1-140x80.jpg','image','image/jpeg',3480,'01 1 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(483,'01-1-150x150.jpg','/uploads/2025/02/01-1-150x150.jpg','image','image/jpeg',2939,'01 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(484,'01-1-300x200.jpg','/uploads/2025/02/01-1-300x200.jpg','image','image/jpeg',4180,'01 1 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(485,'01-1-768x512.jpg','/uploads/2025/02/01-1-768x512.jpg','image','image/jpeg',14509,'01 1 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(486,'01-1.jpg','/uploads/2025/02/01-1.jpg','image','image/jpeg',23362,'01 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(487,'01-1024x683.jpg','/uploads/2025/02/01-1024x683.jpg','image','image/jpeg',53943,'01 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(488,'01-140x80.jpg','/uploads/2025/02/01-140x80.jpg','image','image/jpeg',8417,'01 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(489,'01-150x150.jpg','/uploads/2025/02/01-150x150.jpg','image','image/jpeg',4804,'01 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(490,'01-300x200.jpg','/uploads/2025/02/01-300x200.jpg','image','image/jpeg',8732,'01 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(491,'01-768x512.jpg','/uploads/2025/02/01-768x512.jpg','image','image/jpeg',34730,'01 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(492,'01.jpg','/uploads/2025/02/01.jpg','image','image/jpeg',54075,'01',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(493,'02-1-1024x683.jpg','/uploads/2025/02/02-1-1024x683.jpg','image','image/jpeg',29362,'02 1 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(494,'02-1-140x80.jpg','/uploads/2025/02/02-1-140x80.jpg','image','image/jpeg',4625,'02 1 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(495,'02-1-150x150.jpg','/uploads/2025/02/02-1-150x150.jpg','image','image/jpeg',3701,'02 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(496,'02-1-300x200.jpg','/uploads/2025/02/02-1-300x200.jpg','image','image/jpeg',5408,'02 1 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(497,'02-1-768x512.jpg','/uploads/2025/02/02-1-768x512.jpg','image','image/jpeg',19222,'02 1 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(498,'02-1.jpg','/uploads/2025/02/02-1.jpg','image','image/jpeg',31194,'02 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(499,'02-1024x683.jpg','/uploads/2025/02/02-1024x683.jpg','image','image/jpeg',16484,'02 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(500,'02-140x80.jpg','/uploads/2025/02/02-140x80.jpg','image','image/jpeg',1970,'02 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(501,'02-150x150.jpg','/uploads/2025/02/02-150x150.jpg','image','image/jpeg',1958,'02 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(502,'02-300x200.jpg','/uploads/2025/02/02-300x200.jpg','image','image/jpeg',2795,'02 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(503,'02-768x512.jpg','/uploads/2025/02/02-768x512.jpg','image','image/jpeg',10849,'02 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(504,'02.jpg','/uploads/2025/02/02.jpg','image','image/jpeg',18809,'02',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(505,'03-1-1-140x80.jpg','/uploads/2025/02/03-1-1-140x80.jpg','image','image/jpeg',3665,'03 1 1 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(506,'03-1-140x80.jpg','/uploads/2025/02/03-1-140x80.jpg','image','image/jpeg',4236,'03 1 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(507,'03-1-2-1024x683.jpg','/uploads/2025/02/03-1-2-1024x683.jpg','image','image/jpeg',20120,'03 1 2 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(508,'03-1-2-140x80.jpg','/uploads/2025/02/03-1-2-140x80.jpg','image','image/jpeg',3665,'03 1 2 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(509,'03-1-2-150x150.jpg','/uploads/2025/02/03-1-2-150x150.jpg','image','image/jpeg',2207,'03 1 2 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(510,'03-1-2-300x200.jpg','/uploads/2025/02/03-1-2-300x200.jpg','image','image/jpeg',4066,'03 1 2 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(511,'03-1-2-768x512.jpg','/uploads/2025/02/03-1-2-768x512.jpg','image','image/jpeg',13435,'03 1 2 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(512,'03-1-2.jpg','/uploads/2025/02/03-1-2.jpg','image','image/jpeg',20900,'03 1 2',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(513,'03-1024x681.png','/uploads/2025/02/03-1024x681.png','image','image/png',97250,'03 1024x681',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(514,'03-140x80.jpg','/uploads/2025/02/03-140x80.jpg','image','image/jpeg',4206,'03 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(515,'03-140x80.png','/uploads/2025/02/03-140x80.png','image','image/png',4105,'03 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(516,'03-150x150.png','/uploads/2025/02/03-150x150.png','image','image/png',4959,'03 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(517,'03-1536x1022.png','/uploads/2025/02/03-1536x1022.png','image','image/png',208636,'03 1536x1022',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(518,'03-2-1024x683.jpg','/uploads/2025/02/03-2-1024x683.jpg','image','image/jpeg',44531,'03 2 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(519,'03-2-140x80.jpg','/uploads/2025/02/03-2-140x80.jpg','image','image/jpeg',7949,'03 2 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(520,'03-2-150x150.jpg','/uploads/2025/02/03-2-150x150.jpg','image','image/jpeg',4248,'03 2 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(521,'03-2-300x200.jpg','/uploads/2025/02/03-2-300x200.jpg','image','image/jpeg',7958,'03 2 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(522,'03-2-768x512.jpg','/uploads/2025/02/03-2-768x512.jpg','image','image/jpeg',28609,'03 2 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(523,'03-2.jpg','/uploads/2025/02/03-2.jpg','image','image/jpeg',45305,'03 2',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(524,'03-2048x1363.png','/uploads/2025/02/03-2048x1363.png','image','image/png',365442,'03 2048x1363',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(525,'03-300x200.png','/uploads/2025/02/03-300x200.png','image','image/png',12484,'03 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(526,'03-768x511.png','/uploads/2025/02/03-768x511.png','image','image/png',57194,'03 768x511',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(527,'03.png','/uploads/2025/02/03.png','image','image/png',1222594,'03',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(528,'030-1024x683.jpg','/uploads/2025/02/030-1024x683.jpg','image','image/jpeg',18916,'030 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(529,'030-140x80.jpg','/uploads/2025/02/030-140x80.jpg','image','image/jpeg',3144,'030 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(530,'030-150x150.jpg','/uploads/2025/02/030-150x150.jpg','image','image/jpeg',1726,'030 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(531,'030-300x200.jpg','/uploads/2025/02/030-300x200.jpg','image','image/jpeg',3544,'030 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(532,'030-768x512.jpg','/uploads/2025/02/030-768x512.jpg','image','image/jpeg',12637,'030 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(533,'030.jpg','/uploads/2025/02/030.jpg','image','image/jpeg',19410,'030',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(534,'04-1024x683.jpg','/uploads/2025/02/04-1024x683.jpg','image','image/jpeg',24038,'04 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(535,'04-140x80.jpg','/uploads/2025/02/04-140x80.jpg','image','image/jpeg',4389,'04 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(536,'04-150x150.jpg','/uploads/2025/02/04-150x150.jpg','image','image/jpeg',3248,'04 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(537,'04-300x200.jpg','/uploads/2025/02/04-300x200.jpg','image','image/jpeg',4785,'04 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(538,'04-768x512.jpg','/uploads/2025/02/04-768x512.jpg','image','image/jpeg',16048,'04 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(539,'04.jpg','/uploads/2025/02/04.jpg','image','image/jpeg',24109,'04',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(540,'05-1024x683.jpg','/uploads/2025/02/05-1024x683.jpg','image','image/jpeg',19972,'05 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(541,'05-140x80.jpg','/uploads/2025/02/05-140x80.jpg','image','image/jpeg',3319,'05 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(542,'05-150x150.jpg','/uploads/2025/02/05-150x150.jpg','image','image/jpeg',2659,'05 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(543,'05-300x200.jpg','/uploads/2025/02/05-300x200.jpg','image','image/jpeg',3903,'05 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(544,'05-768x512.jpg','/uploads/2025/02/05-768x512.jpg','image','image/jpeg',13269,'05 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(545,'05.jpg','/uploads/2025/02/05.jpg','image','image/jpeg',20768,'05',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(546,'ADN0321-copy-1-1024x683.jpg','/uploads/2025/02/ADN0321-copy-1-1024x683.jpg','image','image/jpeg',34857,'ADN0321 copy 1 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(547,'ADN0321-copy-1-150x150.jpg','/uploads/2025/02/ADN0321-copy-1-150x150.jpg','image','image/jpeg',3835,'ADN0321 copy 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(548,'ADN0321-copy-1-300x200.jpg','/uploads/2025/02/ADN0321-copy-1-300x200.jpg','image','image/jpeg',6081,'ADN0321 copy 1 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(549,'ADN0321-copy-1-768x512.jpg','/uploads/2025/02/ADN0321-copy-1-768x512.jpg','image','image/jpeg',22981,'ADN0321 copy 1 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(550,'ADN0321-copy-1.jpg','/uploads/2025/02/ADN0321-copy-1.jpg','image','image/jpeg',28161,'ADN0321 copy 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(551,'ADN0321-copy-1024x683.jpg','/uploads/2025/02/ADN0321-copy-1024x683.jpg','image','image/jpeg',34857,'ADN0321 copy 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(552,'ADN0321-copy-140x80.jpg','/uploads/2025/02/ADN0321-copy-140x80.jpg','image','image/jpeg',6110,'ADN0321 copy 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(553,'ADN0321-copy-150x150.jpg','/uploads/2025/02/ADN0321-copy-150x150.jpg','image','image/jpeg',3835,'ADN0321 copy 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(554,'ADN0321-copy-2-1024x683.jpg','/uploads/2025/02/ADN0321-copy-2-1024x683.jpg','image','image/jpeg',34857,'ADN0321 copy 2 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(555,'ADN0321-copy-2-140x80.jpg','/uploads/2025/02/ADN0321-copy-2-140x80.jpg','image','image/jpeg',6110,'ADN0321 copy 2 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(556,'ADN0321-copy-2-150x150.jpg','/uploads/2025/02/ADN0321-copy-2-150x150.jpg','image','image/jpeg',3835,'ADN0321 copy 2 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(557,'ADN0321-copy-2-300x200.jpg','/uploads/2025/02/ADN0321-copy-2-300x200.jpg','image','image/jpeg',6081,'ADN0321 copy 2 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(558,'ADN0321-copy-2-768x512.jpg','/uploads/2025/02/ADN0321-copy-2-768x512.jpg','image','image/jpeg',22981,'ADN0321 copy 2 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(559,'ADN0321-copy-2.jpg','/uploads/2025/02/ADN0321-copy-2.jpg','image','image/jpeg',28161,'ADN0321 copy 2',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(560,'ADN0321-copy-300x200.jpg','/uploads/2025/02/ADN0321-copy-300x200.jpg','image','image/jpeg',6081,'ADN0321 copy 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(561,'ADN0321-copy-768x512.jpg','/uploads/2025/02/ADN0321-copy-768x512.jpg','image','image/jpeg',22981,'ADN0321 copy 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(562,'ADN0321-copy.jpg','/uploads/2025/02/ADN0321-copy.jpg','image','image/jpeg',28161,'ADN0321 copy',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(563,'ADN0346-copy-1-1024x683.jpg','/uploads/2025/02/ADN0346-copy-1-1024x683.jpg','image','image/jpeg',36240,'ADN0346 copy 1 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(564,'ADN0346-copy-1-150x150.jpg','/uploads/2025/02/ADN0346-copy-1-150x150.jpg','image','image/jpeg',4113,'ADN0346 copy 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(565,'ADN0346-copy-1-300x200.jpg','/uploads/2025/02/ADN0346-copy-1-300x200.jpg','image','image/jpeg',6354,'ADN0346 copy 1 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(566,'ADN0346-copy-1-768x512.jpg','/uploads/2025/02/ADN0346-copy-1-768x512.jpg','image','image/jpeg',23891,'ADN0346 copy 1 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(567,'ADN0346-copy-1.jpg','/uploads/2025/02/ADN0346-copy-1.jpg','image','image/jpeg',28876,'ADN0346 copy 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(568,'ADN0346-copy-1024x683.jpg','/uploads/2025/02/ADN0346-copy-1024x683.jpg','image','image/jpeg',36240,'ADN0346 copy 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(569,'ADN0346-copy-140x80.jpg','/uploads/2025/02/ADN0346-copy-140x80.jpg','image','image/jpeg',6323,'ADN0346 copy 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(570,'ADN0346-copy-150x150.jpg','/uploads/2025/02/ADN0346-copy-150x150.jpg','image','image/jpeg',4113,'ADN0346 copy 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(571,'ADN0346-copy-300x200.jpg','/uploads/2025/02/ADN0346-copy-300x200.jpg','image','image/jpeg',6354,'ADN0346 copy 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(572,'ADN0346-copy-768x512.jpg','/uploads/2025/02/ADN0346-copy-768x512.jpg','image','image/jpeg',23891,'ADN0346 copy 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(573,'ADN0346-copy.jpg','/uploads/2025/02/ADN0346-copy.jpg','image','image/jpeg',28876,'ADN0346 copy',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(574,'ADN0352-copy-1-1024x683.jpg','/uploads/2025/02/ADN0352-copy-1-1024x683.jpg','image','image/jpeg',37312,'ADN0352 copy 1 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(575,'ADN0352-copy-1-140x80.jpg','/uploads/2025/02/ADN0352-copy-1-140x80.jpg','image','image/jpeg',6460,'ADN0352 copy 1 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(576,'ADN0352-copy-1-150x150.jpg','/uploads/2025/02/ADN0352-copy-1-150x150.jpg','image','image/jpeg',3955,'ADN0352 copy 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(577,'ADN0352-copy-1-300x200.jpg','/uploads/2025/02/ADN0352-copy-1-300x200.jpg','image','image/jpeg',6268,'ADN0352 copy 1 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(578,'ADN0352-copy-1-768x512.jpg','/uploads/2025/02/ADN0352-copy-1-768x512.jpg','image','image/jpeg',24032,'ADN0352 copy 1 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(579,'ADN0352-copy-1.jpg','/uploads/2025/02/ADN0352-copy-1.jpg','image','image/jpeg',30636,'ADN0352 copy 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(580,'ADN0352-copy-1024x683.jpg','/uploads/2025/02/ADN0352-copy-1024x683.jpg','image','image/jpeg',37312,'ADN0352 copy 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(581,'ADN0352-copy-140x80.jpg','/uploads/2025/02/ADN0352-copy-140x80.jpg','image','image/jpeg',6460,'ADN0352 copy 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(582,'ADN0352-copy-150x150.jpg','/uploads/2025/02/ADN0352-copy-150x150.jpg','image','image/jpeg',3955,'ADN0352 copy 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(583,'ADN0352-copy-300x200.jpg','/uploads/2025/02/ADN0352-copy-300x200.jpg','image','image/jpeg',6268,'ADN0352 copy 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(584,'ADN0352-copy-768x512.jpg','/uploads/2025/02/ADN0352-copy-768x512.jpg','image','image/jpeg',24032,'ADN0352 copy 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(585,'ADN0352-copy.jpg','/uploads/2025/02/ADN0352-copy.jpg','image','image/jpeg',30636,'ADN0352 copy',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(586,'ADN0369-copy-1024x683.jpg','/uploads/2025/02/ADN0369-copy-1024x683.jpg','image','image/jpeg',52128,'ADN0369 copy 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(587,'ADN0369-copy-140x80.jpg','/uploads/2025/02/ADN0369-copy-140x80.jpg','image','image/jpeg',9009,'ADN0369 copy 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(588,'ADN0369-copy-150x150.jpg','/uploads/2025/02/ADN0369-copy-150x150.jpg','image','image/jpeg',5101,'ADN0369 copy 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(589,'ADN0369-copy-300x200.jpg','/uploads/2025/02/ADN0369-copy-300x200.jpg','image','image/jpeg',8813,'ADN0369 copy 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(590,'ADN0369-copy-768x512.jpg','/uploads/2025/02/ADN0369-copy-768x512.jpg','image','image/jpeg',33766,'ADN0369 copy 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(591,'ADN0369-copy.jpg','/uploads/2025/02/ADN0369-copy.jpg','image','image/jpeg',44551,'ADN0369 copy',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(592,'ADN0391-copy-1-1024x683.jpg','/uploads/2025/02/ADN0391-copy-1-1024x683.jpg','image','image/jpeg',28403,'ADN0391 copy 1 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(593,'ADN0391-copy-1-140x80.jpg','/uploads/2025/02/ADN0391-copy-1-140x80.jpg','image','image/jpeg',3752,'ADN0391 copy 1 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(594,'ADN0391-copy-1-150x150.jpg','/uploads/2025/02/ADN0391-copy-1-150x150.jpg','image','image/jpeg',2712,'ADN0391 copy 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(595,'ADN0391-copy-1-300x200.jpg','/uploads/2025/02/ADN0391-copy-1-300x200.jpg','image','image/jpeg',4243,'ADN0391 copy 1 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(596,'ADN0391-copy-1-768x512.jpg','/uploads/2025/02/ADN0391-copy-1-768x512.jpg','image','image/jpeg',17823,'ADN0391 copy 1 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(597,'ADN0391-copy-1.jpg','/uploads/2025/02/ADN0391-copy-1.jpg','image','image/jpeg',23380,'ADN0391 copy 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(598,'ADN0391-copy-1024x683.jpg','/uploads/2025/02/ADN0391-copy-1024x683.jpg','image','image/jpeg',28403,'ADN0391 copy 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(599,'ADN0391-copy-140x80.jpg','/uploads/2025/02/ADN0391-copy-140x80.jpg','image','image/jpeg',3752,'ADN0391 copy 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(600,'ADN0391-copy-150x150.jpg','/uploads/2025/02/ADN0391-copy-150x150.jpg','image','image/jpeg',2712,'ADN0391 copy 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(601,'ADN0391-copy-300x200.jpg','/uploads/2025/02/ADN0391-copy-300x200.jpg','image','image/jpeg',4243,'ADN0391 copy 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(602,'ADN0391-copy-768x512.jpg','/uploads/2025/02/ADN0391-copy-768x512.jpg','image','image/jpeg',17823,'ADN0391 copy 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(603,'ADN0391-copy.jpg','/uploads/2025/02/ADN0391-copy.jpg','image','image/jpeg',23380,'ADN0391 copy',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(604,'cdsco-logo-150x150.png','/uploads/2025/02/cdsco-logo-150x150.png','image','image/png',33296,'cdsco logo 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(605,'cdsco-logo.png','/uploads/2025/02/cdsco-logo.png','image','image/png',134980,'cdsco logo',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(606,'download.png','/uploads/2025/02/download.png','image','image/png',2130,'download',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(607,'Frame-59-11.svg','/uploads/2025/02/Frame-59-11.svg','svg','image/svg+xml',1095,'Frame 59 11',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(608,'manmohan-singh-150x150.png','/uploads/2025/02/manmohan-singh-150x150.png','image','image/png',23706,'manmohan singh 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(609,'manmohan-singh.png','/uploads/2025/02/manmohan-singh.png','image','image/png',73985,'manmohan singh',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(610,'New-Project-1-1024x683.jpg','/uploads/2025/02/New-Project-1-1024x683.jpg','image','image/jpeg',28527,'New Project 1 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(611,'New-Project-1-140x80.jpg','/uploads/2025/02/New-Project-1-140x80.jpg','image','image/jpeg',4720,'New Project 1 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(612,'New-Project-1-150x150.jpg','/uploads/2025/02/New-Project-1-150x150.jpg','image','image/jpeg',3415,'New Project 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(613,'New-Project-1-300x200.jpg','/uploads/2025/02/New-Project-1-300x200.jpg','image','image/jpeg',5127,'New Project 1 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(614,'New-Project-1-768x512.jpg','/uploads/2025/02/New-Project-1-768x512.jpg','image','image/jpeg',18385,'New Project 1 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(615,'New-Project-1.jpg','/uploads/2025/02/New-Project-1.jpg','image','image/jpeg',30427,'New Project 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(616,'New-Project-1024x683.jpg','/uploads/2025/02/New-Project-1024x683.jpg','image','image/jpeg',33907,'New Project 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(617,'New-Project-140x80.jpg','/uploads/2025/02/New-Project-140x80.jpg','image','image/jpeg',6006,'New Project 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(618,'New-Project-150x150.jpg','/uploads/2025/02/New-Project-150x150.jpg','image','image/jpeg',3229,'New Project 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(619,'New-Project-2-1024x683.jpg','/uploads/2025/02/New-Project-2-1024x683.jpg','image','image/jpeg',22344,'New Project 2 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(620,'New-Project-2-140x80.jpg','/uploads/2025/02/New-Project-2-140x80.jpg','image','image/jpeg',4095,'New Project 2 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(621,'New-Project-2-150x150.jpg','/uploads/2025/02/New-Project-2-150x150.jpg','image','image/jpeg',3176,'New Project 2 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(622,'New-Project-2-300x200.jpg','/uploads/2025/02/New-Project-2-300x200.jpg','image','image/jpeg',4600,'New Project 2 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(623,'New-Project-2-768x512.jpg','/uploads/2025/02/New-Project-2-768x512.jpg','image','image/jpeg',14789,'New Project 2 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(624,'New-Project-2.jpg','/uploads/2025/02/New-Project-2.jpg','image','image/jpeg',23506,'New Project 2',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(625,'New-Project-300x200.jpg','/uploads/2025/02/New-Project-300x200.jpg','image','image/jpeg',6393,'New Project 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(626,'New-Project-768x512.jpg','/uploads/2025/02/New-Project-768x512.jpg','image','image/jpeg',22406,'New Project 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(627,'New-Project.jpg','/uploads/2025/02/New-Project.jpg','image','image/jpeg',36690,'New Project',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(628,'sanjeev-150x150.png','/uploads/2025/02/sanjeev-150x150.png','image','image/png',20836,'sanjeev 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(629,'sanjeev.png','/uploads/2025/02/sanjeev.png','image','image/png',66751,'sanjeev',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(630,'untitled-33-1024x683.jpg','/uploads/2025/02/untitled-33-1024x683.jpg','image','image/jpeg',30084,'untitled 33 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(631,'untitled-33-140x80.jpg','/uploads/2025/02/untitled-33-140x80.jpg','image','image/jpeg',5338,'untitled 33 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(632,'untitled-33-150x150.jpg','/uploads/2025/02/untitled-33-150x150.jpg','image','image/jpeg',4355,'untitled 33 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(633,'untitled-33-300x200.jpg','/uploads/2025/02/untitled-33-300x200.jpg','image','image/jpeg',6292,'untitled 33 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(634,'untitled-33-768x512.jpg','/uploads/2025/02/untitled-33-768x512.jpg','image','image/jpeg',20641,'untitled 33 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(635,'untitled-33.jpg','/uploads/2025/02/untitled-33.jpg','image','image/jpeg',30336,'untitled 33',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(636,'untitled-44-1024x683.jpg','/uploads/2025/02/untitled-44-1024x683.jpg','image','image/jpeg',24223,'untitled 44 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(637,'untitled-44-140x80.jpg','/uploads/2025/02/untitled-44-140x80.jpg','image','image/jpeg',3758,'untitled 44 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(638,'untitled-44-150x150.jpg','/uploads/2025/02/untitled-44-150x150.jpg','image','image/jpeg',3169,'untitled 44 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(639,'untitled-44-300x200.jpg','/uploads/2025/02/untitled-44-300x200.jpg','image','image/jpeg',4595,'untitled 44 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(640,'untitled-44-768x512.jpg','/uploads/2025/02/untitled-44-768x512.jpg','image','image/jpeg',15800,'untitled 44 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(641,'untitled-44.jpg','/uploads/2025/02/untitled-44.jpg','image','image/jpeg',25854,'untitled 44',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(642,'untitled-76-1024x683.jpg','/uploads/2025/02/untitled-76-1024x683.jpg','image','image/jpeg',20792,'untitled 76 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(643,'untitled-76-140x80.jpg','/uploads/2025/02/untitled-76-140x80.jpg','image','image/jpeg',4096,'untitled 76 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(644,'untitled-76-150x150.jpg','/uploads/2025/02/untitled-76-150x150.jpg','image','image/jpeg',2080,'untitled 76 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(645,'untitled-76-300x200.jpg','/uploads/2025/02/untitled-76-300x200.jpg','image','image/jpeg',4416,'untitled 76 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(646,'untitled-76-768x512.jpg','/uploads/2025/02/untitled-76-768x512.jpg','image','image/jpeg',14329,'untitled 76 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(647,'untitled-76.jpg','/uploads/2025/02/untitled-76.jpg','image','image/jpeg',21120,'untitled 76',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(648,'02-1024x683.jpg','/uploads/2025/03/02-1024x683.jpg','image','image/jpeg',16484,'02 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(649,'02-150x150.jpg','/uploads/2025/03/02-150x150.jpg','image','image/jpeg',1958,'02 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(650,'02-300x200.jpg','/uploads/2025/03/02-300x200.jpg','image','image/jpeg',2795,'02 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(651,'02-768x512.jpg','/uploads/2025/03/02-768x512.jpg','image','image/jpeg',10849,'02 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(652,'02.jpg','/uploads/2025/03/02.jpg','image','image/jpeg',18809,'02',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(653,'04-1024x683.jpg','/uploads/2025/03/04-1024x683.jpg','image','image/jpeg',24038,'04 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(654,'04-150x150.jpg','/uploads/2025/03/04-150x150.jpg','image','image/jpeg',3248,'04 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(655,'04-300x200.jpg','/uploads/2025/03/04-300x200.jpg','image','image/jpeg',4785,'04 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(656,'04-768x512.jpg','/uploads/2025/03/04-768x512.jpg','image','image/jpeg',16048,'04 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(657,'04.jpg','/uploads/2025/03/04.jpg','image','image/jpeg',24109,'04',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(658,'05-1024x683.jpg','/uploads/2025/03/05-1024x683.jpg','image','image/jpeg',19972,'05 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(659,'05-150x150.jpg','/uploads/2025/03/05-150x150.jpg','image','image/jpeg',2659,'05 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(660,'05-300x200.jpg','/uploads/2025/03/05-300x200.jpg','image','image/jpeg',3903,'05 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(661,'05-768x512.jpg','/uploads/2025/03/05-768x512.jpg','image','image/jpeg',13269,'05 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(662,'05.jpg','/uploads/2025/03/05.jpg','image','image/jpeg',20768,'05',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(663,'2nd-1024x683.jpg','/uploads/2025/03/2nd-1024x683.jpg','image','image/jpeg',16950,'2nd 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(664,'2nd-140x80.jpg','/uploads/2025/03/2nd-140x80.jpg','image','image/jpeg',2830,'2nd 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(665,'2nd-150x150.jpg','/uploads/2025/03/2nd-150x150.jpg','image','image/jpeg',2214,'2nd 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(666,'2nd-300x200.jpg','/uploads/2025/03/2nd-300x200.jpg','image','image/jpeg',3307,'2nd 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(667,'2nd-768x512.jpg','/uploads/2025/03/2nd-768x512.jpg','image','image/jpeg',11453,'2nd 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(668,'2nd.jpg','/uploads/2025/03/2nd.jpg','image','image/jpeg',17445,'2nd',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(669,'3rd-1024x683.jpg','/uploads/2025/03/3rd-1024x683.jpg','image','image/jpeg',51435,'3rd 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(670,'3rd-140x80.jpg','/uploads/2025/03/3rd-140x80.jpg','image','image/jpeg',7590,'3rd 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(671,'3rd-150x150.jpg','/uploads/2025/03/3rd-150x150.jpg','image','image/jpeg',4652,'3rd 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(672,'3rd-300x200.jpg','/uploads/2025/03/3rd-300x200.jpg','image','image/jpeg',8160,'3rd 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(673,'3rd-768x512.jpg','/uploads/2025/03/3rd-768x512.jpg','image','image/jpeg',32817,'3rd 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(674,'3rd.jpg','/uploads/2025/03/3rd.jpg','image','image/jpeg',53502,'3rd',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(675,'carrer-img-1024x1024.jpeg','/uploads/2025/03/carrer-img-1024x1024.jpeg','image','image/jpeg',344453,'carrer img 1024x1024',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(676,'carrer-img-150x150.jpeg','/uploads/2025/03/carrer-img-150x150.jpeg','image','image/jpeg',8869,'carrer img 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(677,'carrer-img-300x300.jpeg','/uploads/2025/03/carrer-img-300x300.jpeg','image','image/jpeg',32476,'carrer img 300x300',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(678,'carrer-img-768x768.jpeg','/uploads/2025/03/carrer-img-768x768.jpeg','image','image/jpeg',202563,'carrer img 768x768',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(679,'carrer-img.jpeg','/uploads/2025/03/carrer-img.jpeg','image','image/jpeg',488992,'carrer img',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(680,'Dream_series-1024x683.jpg','/uploads/2025/03/Dream_series-1024x683.jpg','image','image/jpeg',31117,'Dream series 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(681,'Dream_series-140x80.jpg','/uploads/2025/03/Dream_series-140x80.jpg','image','image/jpeg',4754,'Dream series 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(682,'Dream_series-150x150.jpg','/uploads/2025/03/Dream_series-150x150.jpg','image','image/jpeg',3483,'Dream series 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(683,'Dream_series-300x200.jpg','/uploads/2025/03/Dream_series-300x200.jpg','image','image/jpeg',5887,'Dream series 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(684,'Dream_series-768x512.jpg','/uploads/2025/03/Dream_series-768x512.jpg','image','image/jpeg',20672,'Dream series 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(685,'Dream_series.jpg','/uploads/2025/03/Dream_series.jpg','image','image/jpeg',32884,'Dream series',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(686,'logo01-150x150.jpg','/uploads/2025/03/logo01-150x150.jpg','image','image/jpeg',14275,'logo01 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(687,'logo01.jpg','/uploads/2025/03/logo01.jpg','image','image/jpeg',20659,'logo01',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(688,'logo02-150x150.jpg','/uploads/2025/03/logo02-150x150.jpg','image','image/jpeg',9855,'logo02 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(689,'logo02.jpg','/uploads/2025/03/logo02.jpg','image','image/jpeg',14329,'logo02',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(690,'logo03-150x150.jpg','/uploads/2025/03/logo03-150x150.jpg','image','image/jpeg',7443,'logo03 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(691,'logo03.jpg','/uploads/2025/03/logo03.jpg','image','image/jpeg',9508,'logo03',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(692,'logo04-150x150.jpg','/uploads/2025/03/logo04-150x150.jpg','image','image/jpeg',10545,'logo04 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(693,'logo04.jpg','/uploads/2025/03/logo04.jpg','image','image/jpeg',15720,'logo04',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(694,'logo05-150x150.jpg','/uploads/2025/03/logo05-150x150.jpg','image','image/jpeg',10410,'logo05 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(695,'logo05.jpg','/uploads/2025/03/logo05.jpg','image','image/jpeg',14829,'logo05',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(696,'logo06-150x150.jpg','/uploads/2025/03/logo06-150x150.jpg','image','image/jpeg',10639,'logo06 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(697,'logo06.jpg','/uploads/2025/03/logo06.jpg','image','image/jpeg',14725,'logo06',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(698,'logo07-150x150.jpg','/uploads/2025/03/logo07-150x150.jpg','image','image/jpeg',7580,'logo07 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(699,'logo07.jpg','/uploads/2025/03/logo07.jpg','image','image/jpeg',12297,'logo07',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(700,'logo08-150x150.jpg','/uploads/2025/03/logo08-150x150.jpg','image','image/jpeg',8039,'logo08 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(701,'logo08.jpg','/uploads/2025/03/logo08.jpg','image','image/jpeg',12250,'logo08',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(702,'logo09-150x150.jpg','/uploads/2025/03/logo09-150x150.jpg','image','image/jpeg',8639,'logo09 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(703,'logo09.jpg','/uploads/2025/03/logo09.jpg','image','image/jpeg',11784,'logo09',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(704,'logo10-150x150.jpg','/uploads/2025/03/logo10-150x150.jpg','image','image/jpeg',8923,'logo10 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(705,'logo10.jpg','/uploads/2025/03/logo10.jpg','image','image/jpeg',12200,'logo10',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(706,'logo11-150x150.jpg','/uploads/2025/03/logo11-150x150.jpg','image','image/jpeg',8599,'logo11 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(707,'logo11.jpg','/uploads/2025/03/logo11.jpg','image','image/jpeg',11499,'logo11',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(708,'logo12-150x150.jpg','/uploads/2025/03/logo12-150x150.jpg','image','image/jpeg',7797,'logo12 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(709,'logo12.jpg','/uploads/2025/03/logo12.jpg','image','image/jpeg',9734,'logo12',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(710,'logo13-150x150.jpg','/uploads/2025/03/logo13-150x150.jpg','image','image/jpeg',7076,'logo13 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(711,'logo13.jpg','/uploads/2025/03/logo13.jpg','image','image/jpeg',10571,'logo13',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(712,'logo14-150x150.jpg','/uploads/2025/03/logo14-150x150.jpg','image','image/jpeg',7665,'logo14 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(713,'logo14.jpg','/uploads/2025/03/logo14.jpg','image','image/jpeg',9812,'logo14',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(714,'logo15-150x150.jpg','/uploads/2025/03/logo15-150x150.jpg','image','image/jpeg',8975,'logo15 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(715,'logo15.jpg','/uploads/2025/03/logo15.jpg','image','image/jpeg',15394,'logo15',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(716,'logo16-150x150.jpg','/uploads/2025/03/logo16-150x150.jpg','image','image/jpeg',9945,'logo16 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(717,'logo16.jpg','/uploads/2025/03/logo16.jpg','image','image/jpeg',13325,'logo16',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(718,'logo17-150x150.jpg','/uploads/2025/03/logo17-150x150.jpg','image','image/jpeg',8125,'logo17 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(719,'logo17.jpg','/uploads/2025/03/logo17.jpg','image','image/jpeg',15433,'logo17',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(720,'logo18-150x150.jpg','/uploads/2025/03/logo18-150x150.jpg','image','image/jpeg',6427,'logo18 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(721,'logo18.jpg','/uploads/2025/03/logo18.jpg','image','image/jpeg',10061,'logo18',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(722,'logo19-150x150.jpg','/uploads/2025/03/logo19-150x150.jpg','image','image/jpeg',8276,'logo19 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(723,'logo19.jpg','/uploads/2025/03/logo19.jpg','image','image/jpeg',15125,'logo19',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(724,'logo20-150x150.jpg','/uploads/2025/03/logo20-150x150.jpg','image','image/jpeg',6278,'logo20 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(725,'logo20.jpg','/uploads/2025/03/logo20.jpg','image','image/jpeg',10924,'logo20',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(726,'logo21-150x150.jpg','/uploads/2025/03/logo21-150x150.jpg','image','image/jpeg',10083,'logo21 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(727,'logo21.jpg','/uploads/2025/03/logo21.jpg','image','image/jpeg',13256,'logo21',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(728,'logo22-150x150.jpg','/uploads/2025/03/logo22-150x150.jpg','image','image/jpeg',6796,'logo22 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(729,'logo22.jpg','/uploads/2025/03/logo22.jpg','image','image/jpeg',10334,'logo22',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(730,'logo23-150x150.jpg','/uploads/2025/03/logo23-150x150.jpg','image','image/jpeg',11168,'logo23 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(731,'logo23.jpg','/uploads/2025/03/logo23.jpg','image','image/jpeg',16448,'logo23',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(732,'logo24-150x150.jpg','/uploads/2025/03/logo24-150x150.jpg','image','image/jpeg',9528,'logo24 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(733,'logo24.jpg','/uploads/2025/03/logo24.jpg','image','image/jpeg',12401,'logo24',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(734,'New-Project-1024x683.jpg','/uploads/2025/03/New-Project-1024x683.jpg','image','image/jpeg',33907,'New Project 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(735,'New-Project-150x150.jpg','/uploads/2025/03/New-Project-150x150.jpg','image','image/jpeg',3229,'New Project 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(736,'New-Project-300x200.jpg','/uploads/2025/03/New-Project-300x200.jpg','image','image/jpeg',6393,'New Project 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(737,'New-Project-768x512.jpg','/uploads/2025/03/New-Project-768x512.jpg','image','image/jpeg',22406,'New Project 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(738,'New-Project.jpg','/uploads/2025/03/New-Project.jpg','image','image/jpeg',36690,'New Project',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(739,'team-collage01-1024x848.png','/uploads/2025/03/team-collage01-1024x848.png','image','image/png',1544190,'team collage01 1024x848',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(740,'team-collage01-150x150.png','/uploads/2025/03/team-collage01-150x150.png','image','image/png',51343,'team collage01 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(741,'team-collage01-300x249.png','/uploads/2025/03/team-collage01-300x249.png','image','image/png',159162,'team collage01 300x249',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(742,'team-collage01-768x636.png','/uploads/2025/03/team-collage01-768x636.png','image','image/png',906129,'team collage01 768x636',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(743,'team-collage01.png','/uploads/2025/03/team-collage01.png','image','image/png',2610191,'team collage01',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(744,'team-collage02-1024x848.png','/uploads/2025/03/team-collage02-1024x848.png','image','image/png',1603575,'team collage02 1024x848',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(745,'team-collage02-150x150.png','/uploads/2025/03/team-collage02-150x150.png','image','image/png',55180,'team collage02 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(746,'team-collage02-300x249.png','/uploads/2025/03/team-collage02-300x249.png','image','image/png',167920,'team collage02 300x249',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(747,'team-collage02-768x636.png','/uploads/2025/03/team-collage02-768x636.png','image','image/png',943848,'team collage02 768x636',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(748,'team-collage02.png','/uploads/2025/03/team-collage02.png','image','image/png',2703261,'team collage02',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(749,'untitled-33-1024x683.jpg','/uploads/2025/03/untitled-33-1024x683.jpg','image','image/jpeg',30084,'untitled 33 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(750,'untitled-33-150x150.jpg','/uploads/2025/03/untitled-33-150x150.jpg','image','image/jpeg',4355,'untitled 33 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(751,'untitled-33-300x200.jpg','/uploads/2025/03/untitled-33-300x200.jpg','image','image/jpeg',6292,'untitled 33 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(752,'untitled-33-768x512.jpg','/uploads/2025/03/untitled-33-768x512.jpg','image','image/jpeg',20641,'untitled 33 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(753,'untitled-33.jpg','/uploads/2025/03/untitled-33.jpg','image','image/jpeg',30336,'untitled 33',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(754,'0.5k-img2-1024x683.jpg','/uploads/2025/04/0.5k-img2-1024x683.jpg','image','image/jpeg',34163,'0.5k img2 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(755,'0.5k-img2-140x80.jpg','/uploads/2025/04/0.5k-img2-140x80.jpg','image','image/jpeg',5747,'0.5k img2 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(756,'0.5k-img2-150x150.jpg','/uploads/2025/04/0.5k-img2-150x150.jpg','image','image/jpeg',3996,'0.5k img2 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(757,'0.5k-img2-300x200.jpg','/uploads/2025/04/0.5k-img2-300x200.jpg','image','image/jpeg',5922,'0.5k img2 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(758,'0.5k-img2-768x512.jpg','/uploads/2025/04/0.5k-img2-768x512.jpg','image','image/jpeg',22216,'0.5k img2 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(759,'0.5k-img2.jpg','/uploads/2025/04/0.5k-img2.jpg','image','image/jpeg',203223,'0.5k img2',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(760,'award-150x150.png','/uploads/2025/04/award-150x150.png','image','image/png',38078,'award 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(761,'award-300x213.png','/uploads/2025/04/award-300x213.png','image','image/png',112962,'award 300x213',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(762,'award.png','/uploads/2025/04/award.png','image','image/png',230159,'award',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(763,'Award01-1-150x150.jpg','/uploads/2025/04/Award01-1-150x150.jpg','image','image/jpeg',5254,'Award01 1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(764,'Award01-1-300x213.jpg','/uploads/2025/04/Award01-1-300x213.jpg','image','image/jpeg',14471,'Award01 1 300x213',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(765,'Award01-1.jpg','/uploads/2025/04/Award01-1.jpg','image','image/jpeg',136517,'Award01 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(766,'award01-150x150.jpg','/uploads/2025/04/award01-150x150.jpg','image','image/jpeg',3363,'award01 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(767,'award01-300x300.jpg','/uploads/2025/04/award01-300x300.jpg','image','image/jpeg',10389,'award01 300x300',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(768,'award01.jpg','/uploads/2025/04/award01.jpg','image','image/jpeg',140050,'award01',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(769,'Award02-150x150.jpg','/uploads/2025/04/Award02-150x150.jpg','image','image/jpeg',6648,'Award02 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(770,'Award02-300x213.jpg','/uploads/2025/04/Award02-300x213.jpg','image','image/jpeg',16397,'Award02 300x213',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(771,'Award02.jpg','/uploads/2025/04/Award02.jpg','image','image/jpeg',110651,'Award02',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(772,'Award03-150x150.jpg','/uploads/2025/04/Award03-150x150.jpg','image','image/jpeg',5404,'Award03 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(773,'Award03-300x213.jpg','/uploads/2025/04/Award03-300x213.jpg','image','image/jpeg',12374,'Award03 300x213',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(774,'Award03.jpg','/uploads/2025/04/Award03.jpg','image','image/jpeg',76096,'Award03',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(775,'Award04-150x150.jpg','/uploads/2025/04/Award04-150x150.jpg','image','image/jpeg',5927,'Award04 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(776,'Award04-300x213.jpg','/uploads/2025/04/Award04-300x213.jpg','image','image/jpeg',14878,'Award04 300x213',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(777,'Award04.jpg','/uploads/2025/04/Award04.jpg','image','image/jpeg',104838,'Award04',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(778,'Award05-150x150.jpg','/uploads/2025/04/Award05-150x150.jpg','image','image/jpeg',6118,'Award05 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(779,'Award05-300x213.jpg','/uploads/2025/04/Award05-300x213.jpg','image','image/jpeg',12378,'Award05 300x213',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(780,'Award05.jpg','/uploads/2025/04/Award05.jpg','image','image/jpeg',81778,'Award05',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(781,'Award06-150x150.jpg','/uploads/2025/04/Award06-150x150.jpg','image','image/jpeg',5194,'Award06 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(782,'Award06-300x213.jpg','/uploads/2025/04/Award06-300x213.jpg','image','image/jpeg',9563,'Award06 300x213',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(783,'Award06.jpg','/uploads/2025/04/Award06.jpg','image','image/jpeg',67165,'Award06',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(784,'Award07-150x150.jpg','/uploads/2025/04/Award07-150x150.jpg','image','image/jpeg',4245,'Award07 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(785,'Award07-300x213.jpg','/uploads/2025/04/Award07-300x213.jpg','image','image/jpeg',7232,'Award07 300x213',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(786,'Award07.jpg','/uploads/2025/04/Award07.jpg','image','image/jpeg',39528,'Award07',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(787,'Award08-150x150.jpg','/uploads/2025/04/Award08-150x150.jpg','image','image/jpeg',4406,'Award08 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(788,'Award08-300x213.jpg','/uploads/2025/04/Award08-300x213.jpg','image','image/jpeg',7817,'Award08 300x213',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(789,'Award08.jpg','/uploads/2025/04/Award08.jpg','image','image/jpeg',49100,'Award08',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(790,'Award09-150x150.jpg','/uploads/2025/04/Award09-150x150.jpg','image','image/jpeg',5491,'Award09 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(791,'Award09-300x213.jpg','/uploads/2025/04/Award09-300x213.jpg','image','image/jpeg',10403,'Award09 300x213',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(792,'Award09.jpg','/uploads/2025/04/Award09.jpg','image','image/jpeg',58972,'Award09',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(793,'Award10-150x150.jpg','/uploads/2025/04/Award10-150x150.jpg','image','image/jpeg',5546,'Award10 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(794,'Award10-300x213.jpg','/uploads/2025/04/Award10-300x213.jpg','image','image/jpeg',9781,'Award10 300x213',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(795,'Award10.jpg','/uploads/2025/04/Award10.jpg','image','image/jpeg',65326,'Award10',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(796,'digital-r-new-1024x683.jpg','/uploads/2025/04/digital-r-new-1024x683.jpg','image','image/jpeg',31243,'digital r new 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(797,'digital-r-new-150x150.jpg','/uploads/2025/04/digital-r-new-150x150.jpg','image','image/jpeg',3183,'digital r new 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(798,'digital-r-new-300x200.jpg','/uploads/2025/04/digital-r-new-300x200.jpg','image','image/jpeg',6011,'digital r new 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(799,'digital-r-new-768x512.jpg','/uploads/2025/04/digital-r-new-768x512.jpg','image','image/jpeg',21040,'digital r new 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(800,'digital-r-new.jpg','/uploads/2025/04/digital-r-new.jpg','image','image/jpeg',138950,'digital r new',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(801,'hf-fixed-new-1024x683.jpg','/uploads/2025/04/hf-fixed-new-1024x683.jpg','image','image/jpeg',33251,'hf fixed new 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(802,'hf-fixed-new-140x80.jpg','/uploads/2025/04/hf-fixed-new-140x80.jpg','image','image/jpeg',6303,'hf fixed new 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(803,'hf-fixed-new-150x150.jpg','/uploads/2025/04/hf-fixed-new-150x150.jpg','image','image/jpeg',3120,'hf fixed new 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(804,'hf-fixed-new-300x200.jpg','/uploads/2025/04/hf-fixed-new-300x200.jpg','image','image/jpeg',5679,'hf fixed new 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(805,'hf-fixed-new-768x512.jpg','/uploads/2025/04/hf-fixed-new-768x512.jpg','image','image/jpeg',21476,'hf fixed new 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(806,'hf-fixed-new.jpg','/uploads/2025/04/hf-fixed-new.jpg','image','image/jpeg',170602,'hf fixed new',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(807,'HF-Mobile-1022x1536.png','/uploads/2025/04/HF-Mobile-1022x1536.png','image','image/png',288849,'HF Mobile 1022x1536',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(808,'HF-Mobile-150x150.png','/uploads/2025/04/HF-Mobile-150x150.png','image','image/png',13945,'HF Mobile 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(809,'HF-Mobile-200x300.png','/uploads/2025/04/HF-Mobile-200x300.png','image','image/png',21895,'HF Mobile 200x300',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(810,'HF-Mobile-682x1024.png','/uploads/2025/04/HF-Mobile-682x1024.png','image','image/png',148039,'HF Mobile 682x1024',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(811,'HF-Mobile-768x1154.png','/uploads/2025/04/HF-Mobile-768x1154.png','image','image/png',179975,'HF Mobile 768x1154',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(812,'hf-mobile-new-1024x683.jpg','/uploads/2025/04/hf-mobile-new-1024x683.jpg','image','image/jpeg',32996,'hf mobile new 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(813,'hf-mobile-new-140x80.jpg','/uploads/2025/04/hf-mobile-new-140x80.jpg','image','image/jpeg',5378,'hf mobile new 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(814,'hf-mobile-new-150x150.jpg','/uploads/2025/04/hf-mobile-new-150x150.jpg','image','image/jpeg',4024,'hf mobile new 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(815,'hf-mobile-new-300x200.jpg','/uploads/2025/04/hf-mobile-new-300x200.jpg','image','image/jpeg',6056,'hf mobile new 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(816,'hf-mobile-new-768x512.jpg','/uploads/2025/04/hf-mobile-new-768x512.jpg','image','image/jpeg',21952,'hf mobile new 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(817,'hf-mobile-new.jpg','/uploads/2025/04/hf-mobile-new.jpg','image','image/jpeg',152403,'hf mobile new',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(818,'HF-Mobile.png','/uploads/2025/04/HF-Mobile.png','image','image/png',419512,'HF Mobile',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(819,'o.5k-img1-1024x683.jpg','/uploads/2025/04/o.5k-img1-1024x683.jpg','image','image/jpeg',24959,'o.5k img1 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(820,'o.5k-img1-140x80.jpg','/uploads/2025/04/o.5k-img1-140x80.jpg','image','image/jpeg',4465,'o.5k img1 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(821,'o.5k-img1-150x150.jpg','/uploads/2025/04/o.5k-img1-150x150.jpg','image','image/jpeg',2962,'o.5k img1 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(822,'o.5k-img1-300x200.jpg','/uploads/2025/04/o.5k-img1-300x200.jpg','image','image/jpeg',4337,'o.5k img1 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(823,'o.5k-img1-768x512.jpg','/uploads/2025/04/o.5k-img1-768x512.jpg','image','image/jpeg',15635,'o.5k img1 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(824,'o.5k-img1.jpg','/uploads/2025/04/o.5k-img1.jpg','image','image/jpeg',168758,'o.5k img1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(825,'Digital-Radiography-New-1024x683.jpg','/uploads/2025/05/Digital-Radiography-New-1024x683.jpg','image','image/jpeg',27098,'Digital Radiography New 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(826,'Digital-Radiography-New-140x80.jpg','/uploads/2025/05/Digital-Radiography-New-140x80.jpg','image','image/jpeg',5474,'Digital Radiography New 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(827,'Digital-Radiography-New-150x150.jpg','/uploads/2025/05/Digital-Radiography-New-150x150.jpg','image','image/jpeg',2941,'Digital Radiography New 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(828,'Digital-Radiography-New-300x200.jpg','/uploads/2025/05/Digital-Radiography-New-300x200.jpg','image','image/jpeg',5431,'Digital Radiography New 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(829,'Digital-Radiography-New-768x512.jpg','/uploads/2025/05/Digital-Radiography-New-768x512.jpg','image','image/jpeg',18570,'Digital Radiography New 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(830,'Digital-Radiography-New.jpg','/uploads/2025/05/Digital-Radiography-New.jpg','image','image/jpeg',27538,'Digital Radiography New',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(831,'HF-Mobile-New-1024x683.jpg','/uploads/2025/05/HF-Mobile-New-1024x683.jpg','image','image/jpeg',28281,'HF Mobile New 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(832,'HF-Mobile-New-140x80.jpg','/uploads/2025/05/HF-Mobile-New-140x80.jpg','image','image/jpeg',4550,'HF Mobile New 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(833,'HF-Mobile-New-150x150.jpg','/uploads/2025/05/HF-Mobile-New-150x150.jpg','image','image/jpeg',3688,'HF Mobile New 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(834,'HF-Mobile-New-300x200.jpg','/uploads/2025/05/HF-Mobile-New-300x200.jpg','image','image/jpeg',5497,'HF Mobile New 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(835,'HF-Mobile-New-768x512.jpg','/uploads/2025/05/HF-Mobile-New-768x512.jpg','image','image/jpeg',18939,'HF Mobile New 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(836,'HF-Mobile-New.jpg','/uploads/2025/05/HF-Mobile-New.jpg','image','image/jpeg',29673,'HF Mobile New',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(837,'Line-Frequency-New-1024x683.jpg','/uploads/2025/05/Line-Frequency-New-1024x683.jpg','image','image/jpeg',17720,'Line Frequency New 1024x683',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(838,'Line-Frequency-New-140x80.jpg','/uploads/2025/05/Line-Frequency-New-140x80.jpg','image','image/jpeg',2594,'Line Frequency New 140x80',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(839,'Line-Frequency-New-150x150.jpg','/uploads/2025/05/Line-Frequency-New-150x150.jpg','image','image/jpeg',2062,'Line Frequency New 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(840,'Line-Frequency-New-300x200.jpg','/uploads/2025/05/Line-Frequency-New-300x200.jpg','image','image/jpeg',3279,'Line Frequency New 300x200',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(841,'Line-Frequency-New-768x512.jpg','/uploads/2025/05/Line-Frequency-New-768x512.jpg','image','image/jpeg',11619,'Line Frequency New 768x512',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(842,'Line-Frequency-New.jpg','/uploads/2025/05/Line-Frequency-New.jpg','image','image/jpeg',19010,'Line Frequency New',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(843,'Newspaper-Advertisement-Business-Standard-and-Makkal_compressed.pdf','/uploads/2025/05/Newspaper-Advertisement-Business-Standard-and-Makkal_compressed.pdf','document','application/pdf',2232572,'Newspaper Advertisement Business Standard and Makkal compressed',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(844,'Notice-and-explanatory-statement-along-with-Annexure-Adonis_compressed.pdf','/uploads/2025/05/Notice-and-explanatory-statement-along-with-Annexure-Adonis_compressed.pdf','document','application/pdf',15715657,'Notice and explanatory statement along with Annexure Adonis compressed',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(845,'adoinis-favicon-150x150.jpg','/uploads/2025/11/adoinis-favicon-150x150.jpg','image','image/jpeg',9076,'adoinis favicon 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(846,'adoinis-favicon-300x300.jpg','/uploads/2025/11/adoinis-favicon-300x300.jpg','image','image/jpeg',17898,'adoinis favicon 300x300',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(847,'adoinis-favicon.jpg','/uploads/2025/11/adoinis-favicon.jpg','image','image/jpeg',44269,'adoinis favicon',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(848,'cropped-adoinis-favicon-150x150.jpg','/uploads/2025/11/cropped-adoinis-favicon-150x150.jpg','image','image/jpeg',9109,'cropped adoinis favicon 150x150',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(849,'cropped-adoinis-favicon-180x180.jpg','/uploads/2025/11/cropped-adoinis-favicon-180x180.jpg','image','image/jpeg',10944,'cropped adoinis favicon 180x180',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(850,'cropped-adoinis-favicon-192x192.jpg','/uploads/2025/11/cropped-adoinis-favicon-192x192.jpg','image','image/jpeg',11281,'cropped adoinis favicon 192x192',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(851,'cropped-adoinis-favicon-270x270.jpg','/uploads/2025/11/cropped-adoinis-favicon-270x270.jpg','image','image/jpeg',15829,'cropped adoinis favicon 270x270',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(852,'cropped-adoinis-favicon-300x300.jpg','/uploads/2025/11/cropped-adoinis-favicon-300x300.jpg','image','image/jpeg',17981,'cropped adoinis favicon 300x300',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(853,'cropped-adoinis-favicon-32x32.jpg','/uploads/2025/11/cropped-adoinis-favicon-32x32.jpg','image','image/jpeg',4075,'cropped adoinis favicon 32x32',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(854,'cropped-adoinis-favicon.jpg','/uploads/2025/11/cropped-adoinis-favicon.jpg','image','image/jpeg',33627,'cropped adoinis favicon',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(855,'carrer-img-r2avejplb0p0fr4n76ku58q4trikhm9oeltrnz2drs.jpeg','/uploads/elementor/thumbs/carrer-img-r2avejplb0p0fr4n76ku58q4trikhm9oeltrnz2drs.jpeg','image','image/jpeg',62995,'carrer img r2avejplb0p0fr4n76ku58q4trikhm9oeltrnz2drs',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(856,'carrer-img-r2avejplb0pkwcgxj99aock57lyrri8v03bloxlctc.jpeg','/uploads/elementor/thumbs/carrer-img-r2avejplb0pkwcgxj99aock57lyrri8v03bloxlctc.jpeg','image','image/jpeg',84544,'carrer img r2avejplb0pkwcgxj99aock57lyrri8v03bloxlctc',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(857,'3794_3c93ee-My-CV-1.pdf','/uploads/jobpost/2025/3794_3c93ee-My-CV-1.pdf','document','application/pdf',232189,'3794 3c93ee My CV 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(858,'3795_13a01f-Vijaykumar.M.pdf','/uploads/jobpost/2025/3795_13a01f-Vijaykumar.M.pdf','document','application/pdf',199427,'3795 13a01f Vijaykumar.M',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(859,'3796_ef14fd-Vinod-Kumar-Srivastava-1.docx','/uploads/jobpost/2025/3796_ef14fd-Vinod-Kumar-Srivastava-1.docx','document','application/vnd.openxmlformats-officedocument.wordprocessingml.document',12649,'3796 ef14fd Vinod Kumar Srivastava 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(860,'3797_0b2478-RAJAN-PAHWA-RESUME-2025-1.pdf','/uploads/jobpost/2025/3797_0b2478-RAJAN-PAHWA-RESUME-2025-1.pdf','document','application/pdf',520419,'3797 0b2478 RAJAN PAHWA RESUME 2025 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(861,'3798_3b8fe8-Resume___Pawar__1_.pdf','/uploads/jobpost/2025/3798_3b8fe8-Resume___Pawar__1_.pdf','document','application/pdf',200896,'3798 3b8fe8 Resume   Pawar  1 ',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(862,'3799_bc5178-7607718444.pdf','/uploads/jobpost/2025/3799_bc5178-7607718444.pdf','document','application/pdf',54765,'3799 bc5178 7607718444',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(863,'3800_36bc45-CV-Kirti-azad-with-amsl.docx','/uploads/jobpost/2025/3800_36bc45-CV-Kirti-azad-with-amsl.docx','document','application/vnd.openxmlformats-officedocument.wordprocessingml.document',20088,'3800 36bc45 CV Kirti azad with amsl',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(864,'3801_3a0f24-KULDEEP-SHARMA.pdf','/uploads/jobpost/2025/3801_3a0f24-KULDEEP-SHARMA.pdf','document','application/pdf',104321,'3801 3a0f24 KULDEEP SHARMA',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(865,'3802_8bc850-DEEPAK-KUMAR-CV.pdf','/uploads/jobpost/2025/3802_8bc850-DEEPAK-KUMAR-CV.pdf','document','application/pdf',245385,'3802 8bc850 DEEPAK KUMAR CV',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(866,'3803_7381e1-HARIBHAJANCHAUDHARYcvv1-1.docx','/uploads/jobpost/2025/3803_7381e1-HARIBHAJANCHAUDHARYcvv1-1.docx','document','application/vnd.openxmlformats-officedocument.wordprocessingml.document',14535,'3803 7381e1 HARIBHAJANCHAUDHARYcvv1 1',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(867,'3804_42bd98-Amarjeet-CV.pdf','/uploads/jobpost/2025/3804_42bd98-Amarjeet-CV.pdf','document','application/pdf',153703,'3804 42bd98 Amarjeet CV',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(868,'3805_16bff7-Sumit-Kumar-Mishra-Resume-.pdf','/uploads/jobpost/2025/3805_16bff7-Sumit-Kumar-Mishra-Resume-.pdf','document','application/pdf',370964,'3805 16bff7 Sumit Kumar Mishra Resume ',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(869,'3806_638ef5-SUJITHA-RESUME-2024.pdf','/uploads/jobpost/2025/3806_638ef5-SUJITHA-RESUME-2024.pdf','document','application/pdf',242374,'3806 638ef5 SUJITHA RESUME 2024',NULL,NULL,NULL,'2026-01-08 08:10:02','2026-01-08 08:10:02'),(870,'Newspaper-Advertisement-Business-Standard-and-Makkal_compressed.pdf','/uploads/2026/01/newspaper-advertisement-business-standard-and-makkal_compressed.pdf','document','application/pdf',2232572,'Newspaper Advertisement Business Standard and Makkal compressed',NULL,NULL,NULL,'2026-01-08 08:31:19','2026-01-08 08:31:19'),(871,'Notice-and-explanatory-statement-along-with-Annexure-Adonis_compressed.pdf','/uploads/2026/01/notice-and-explanatory-statement-along-with-annexure-adonis_compressed.pdf','document','application/pdf',15715657,'Notice and explanatory statement along with Annexure Adonis compressed',NULL,NULL,NULL,'2026-01-08 08:31:33','2026-01-08 08:31:33'),(872,'investors_hero.jpg','/uploads/2026/01/investors_hero.jpg','image','image/jpeg',729603,'investors hero',NULL,NULL,NULL,'2026-01-08 08:33:20','2026-01-08 08:33:20'),(873,'consumertech.svg','/uploads/2026/01/consumertech.svg','svg','image/svg+xml',223,'consumertech',NULL,NULL,NULL,'2026-01-08 10:14:14','2026-01-08 10:14:14'),(874,'investors_hero.jpg','/uploads/2026/01/investors_hero.jpg','image','image/jpeg',729603,'investors hero',NULL,NULL,NULL,'2026-01-08 10:23:57','2026-01-08 10:23:57'),(875,'logo03.jpg','/uploads/2026/01/logo03.jpg','image','image/jpeg',9508,'logo03',NULL,NULL,NULL,'2026-01-08 10:31:20','2026-01-08 10:31:20'),(876,'logo03.jpg','/uploads/2026/01/logo03.jpg','image','image/jpeg',9508,'logo03',NULL,NULL,NULL,'2026-01-08 11:11:33','2026-01-08 11:11:33'),(877,'logo06.jpg','/uploads/2026/01/logo06.jpg','image','image/jpeg',14725,'logo06',NULL,NULL,NULL,'2026-01-08 11:12:13','2026-01-08 11:12:13'),(878,'8000.svg','/uploads/2026/01/8000.svg','svg','image/svg+xml',33604,'8000',NULL,NULL,NULL,'2026-01-09 10:29:05','2026-01-09 10:29:05'),(879,'manufacturing.svg','/uploads/2026/01/manufacturing.svg','svg','image/svg+xml',22610,'manufacturing',NULL,NULL,NULL,'2026-01-09 10:30:02','2026-01-09 10:30:02'),(880,'yearsofexperience.svg','/uploads/2026/01/yearsofexperience.svg','svg','image/svg+xml',22972,'yearsofexperience',NULL,NULL,NULL,'2026-01-09 10:30:22','2026-01-09 10:30:22'),(881,'x-rays.svg','/uploads/2026/01/x-rays.svg','svg','image/svg+xml',23658,'x rays',NULL,NULL,NULL,'2026-01-09 10:30:47','2026-01-09 10:30:47'),(882,'team-collage02.png','/uploads/2026/01/team-collage02.png','image','image/png',2703261,'team collage02',NULL,NULL,NULL,'2026-01-09 10:52:44','2026-01-09 10:52:44'),(883,'team-collage02.png','/uploads/2026/01/team-collage02.png','image','image/png',2703261,'team collage02',NULL,NULL,NULL,'2026-01-09 11:21:20','2026-01-09 11:21:20'),(884,'image-51-2-1.jpg','/uploads/2026/01/image-51-2-1.jpg','image','image/jpeg',88189,'image 51 2 1',NULL,NULL,NULL,'2026-01-09 11:22:56','2026-01-09 11:22:56'),(885,'Frame-361.jpg','/uploads/2026/01/frame-361.jpg','image','image/jpeg',82091,'Frame 361',NULL,NULL,NULL,'2026-01-09 11:25:27','2026-01-09 11:25:27'),(886,'Frame-361.jpg','/uploads/2026/01/frame-361.jpg','image','image/jpeg',82091,'Frame 361',NULL,NULL,NULL,'2026-01-09 11:26:39','2026-01-09 11:26:39'),(887,'team-collage02.png','/uploads/2026/01/team-collage02.png','image','image/png',2703261,'team collage02',NULL,NULL,NULL,'2026-01-09 11:27:17','2026-01-09 11:27:17'),(888,'Frame-25-1-1.png','/uploads/2026/01/frame-25-1-1.png','image','image/png',10667,'Frame 25 1 1',NULL,NULL,NULL,'2026-01-09 11:47:18','2026-01-09 11:47:18'),(889,'radiology.png','/uploads/2026/01/radiology.png','image','image/png',130940,'radiology',NULL,NULL,NULL,'2026-01-09 11:47:40','2026-01-09 11:47:40'),(890,'our-specialties.png','/uploads/2026/01/our-specialties.png','image','image/png',272468,'our specialties',NULL,NULL,NULL,'2026-01-09 11:49:28','2026-01-09 11:49:28'),(891,'Frame-25-1-1.png','/uploads/2026/01/frame-25-1-1.png','image','image/png',10667,'Frame 25 1 1',NULL,NULL,NULL,'2026-01-09 11:51:11','2026-01-09 11:51:11'),(892,'Frame-25-1-1.png','/uploads/2026/01/frame-25-1-1.png','image','image/png',10667,'Frame 25 1 1',NULL,NULL,NULL,'2026-01-09 11:52:26','2026-01-09 11:52:26'),(893,'Frame-25-1-1.png','/uploads/2026/01/frame-25-1-1.png','image','image/png',10667,'Frame 25 1 1',NULL,NULL,NULL,'2026-01-09 11:52:43','2026-01-09 11:52:43'),(894,'Frame-25-1-1.png','/uploads/2026/01/frame-25-1-1.png','image','image/png',10667,'Frame 25 1 1',NULL,NULL,NULL,'2026-01-09 11:53:13','2026-01-09 11:53:13'),(895,'gastroenterology.png','/uploads/2026/01/gastroenterology.png','image','image/png',105991,'gastroenterology',NULL,NULL,NULL,'2026-01-09 11:54:41','2026-01-09 11:54:41'),(896,'orthopedic.png','/uploads/2026/01/orthopedic.png','image','image/png',141495,'orthopedic',NULL,NULL,NULL,'2026-01-09 11:55:22','2026-01-09 11:55:22'),(897,'neurology.png','/uploads/2026/01/neurology.png','image','image/png',86819,'neurology',NULL,NULL,NULL,'2026-01-09 11:55:40','2026-01-09 11:55:40'),(898,'urology.png','/uploads/2026/01/urology.png','image','image/png',85623,'urology',NULL,NULL,NULL,'2026-01-09 11:56:20','2026-01-09 11:56:20'),(899,'carrer-img-r2avejplb0pkwcgxj99aock57lyrri8v03bloxlctc.jpeg','/uploads/2026/01/carrer-img-r2avejplb0pkwcgxj99aock57lyrri8v03bloxlctc.jpeg','image','image/jpeg',84544,'carrer img r2avejplb0pkwcgxj99aock57lyrri8v03bloxlctc',NULL,NULL,NULL,'2026-01-09 12:25:29','2026-01-09 12:25:29'),(900,'logo_adonis_4x-1.svg','/uploads/2026/01/logo_adonis_4x-1.svg','svg','image/svg+xml',141330,'logo adonis 4x 1',NULL,NULL,NULL,'2026-01-09 12:27:37','2026-01-09 12:27:37'),(901,'phonefooter.svg','/uploads/2026/01/phonefooter.svg','svg','image/svg+xml',4406,'phonefooter',NULL,NULL,NULL,'2026-01-09 12:33:02','2026-01-09 12:33:02'),(902,'emailfooter.svg','/uploads/2026/01/emailfooter.svg','svg','image/svg+xml',3537,'emailfooter',NULL,NULL,NULL,'2026-01-09 12:33:31','2026-01-09 12:33:31'),(903,'locationfooter.svg','/uploads/2026/01/locationfooter.svg','svg','image/svg+xml',4169,'locationfooter',NULL,NULL,NULL,'2026-01-09 12:34:24','2026-01-09 12:34:24'),(904,'systemvariety.svg','/uploads/2026/01/systemvariety.svg','svg','image/svg+xml',20298,'systemvariety',NULL,NULL,NULL,'2026-01-12 05:49:35','2026-01-12 05:49:35'),(905,'customersatisfaction.svg','/uploads/2026/01/customersatisfaction.svg','svg','image/svg+xml',26162,'customersatisfaction',NULL,NULL,NULL,'2026-01-12 05:50:23','2026-01-12 05:50:23'),(906,'usagestats.svg','/uploads/2026/01/usagestats.svg','svg','image/svg+xml',27398,'usagestats',NULL,NULL,NULL,'2026-01-12 05:51:00','2026-01-12 05:51:00'),(907,'trainingsupport.svg','/uploads/2026/01/trainingsupport.svg','svg','image/svg+xml',1556,'trainingsupport',NULL,NULL,NULL,'2026-01-12 05:51:41','2026-01-12 05:51:41'),(908,'Frame-75-1.png','/uploads/2026/01/frame-75-1.png','image','image/png',58224,'Frame 75 1',NULL,NULL,NULL,'2026-01-12 05:53:14','2026-01-12 05:53:14'),(909,'sanjeev.png','/uploads/2026/01/sanjeev.png','image','image/png',66751,'sanjeev',NULL,NULL,NULL,'2026-01-12 06:20:09','2026-01-12 06:20:09'),(910,'Frame-299.png','/uploads/2026/01/frame-299.png','image','image/png',84913,'Frame 299',NULL,NULL,NULL,'2026-01-12 06:24:38','2026-01-12 06:24:38'),(911,'Frame-299-1.png','/uploads/2026/01/frame-299-1.png','image','image/png',121578,'Frame 299 1',NULL,NULL,NULL,'2026-01-12 06:25:12','2026-01-12 06:25:12'),(912,'manmohan-singh.png','/uploads/2026/01/manmohan-singh.png','image','image/png',73985,'manmohan singh',NULL,NULL,NULL,'2026-01-12 06:25:40','2026-01-12 06:25:40'),(913,'Frame-25-1-1.png','/uploads/2026/01/frame-25-1-1.png','image','image/png',10667,'Frame 25 1 1',NULL,NULL,NULL,'2026-01-12 06:41:44','2026-01-12 06:41:44'),(914,'HF-Mobile-New.jpg','/uploads/2026/01/hf-mobile-new.jpg','image','image/jpeg',29673,'HF Mobile New',NULL,NULL,NULL,'2026-01-12 06:44:35','2026-01-12 06:44:35'),(915,'02-1-1024x683.jpg','/uploads/2026/01/02-1-1024x683.jpg','image','image/jpeg',29362,'02 1 1024x683',NULL,NULL,NULL,'2026-01-12 06:45:25','2026-01-12 06:45:25'),(916,'hf-fixed-new-1024x683.jpg','/uploads/2026/01/hf-fixed-new-1024x683.jpg','image','image/jpeg',33251,'hf fixed new 1024x683',NULL,NULL,NULL,'2026-01-12 06:46:27','2026-01-12 06:46:27'),(917,'ADN0321-copy-2-1024x683.jpg','/uploads/2026/01/adn0321-copy-2-1024x683.jpg','image','image/jpeg',34857,'ADN0321 copy 2 1024x683',NULL,NULL,NULL,'2026-01-12 06:46:59','2026-01-12 06:46:59'),(918,'Line-Frequency-New-1024x683.jpg','/uploads/2026/01/line-frequency-new-1024x683.jpg','image','image/jpeg',17720,'Line Frequency New 1024x683',NULL,NULL,NULL,'2026-01-12 06:47:35','2026-01-12 06:47:35'),(919,'Digital-Radiography-New-1024x683.jpg','/uploads/2026/01/digital-radiography-new-1024x683.jpg','image','image/jpeg',27098,'Digital Radiography New 1024x683',NULL,NULL,NULL,'2026-01-12 06:47:57','2026-01-12 06:47:57'),(920,'Dream_series-1024x683.jpg','/uploads/2026/01/dream_series-1024x683.jpg','image','image/jpeg',31117,'Dream series 1024x683',NULL,NULL,NULL,'2026-01-12 06:48:22','2026-01-12 06:48:22'),(921,'Frame-118.jpg','/uploads/2026/01/frame-118.jpg','image','image/jpeg',131966,'Frame 118',NULL,NULL,NULL,'2026-01-12 07:01:01','2026-01-12 07:01:01'),(922,'Frame-75-1.png','/uploads/2026/01/frame-75-1.png','image','image/png',58224,'Frame 75 1',NULL,NULL,NULL,'2026-01-12 07:15:14','2026-01-12 07:15:14'),(923,'our-products-banner.png','/uploads/2026/01/our-products-banner.png','image','image/png',504807,'our products banner',NULL,NULL,NULL,'2026-01-12 08:49:57','2026-01-12 08:49:57'),(924,'Frame-350-300x288.jpg','/uploads/2026/01/frame-350-300x288.jpg','image','image/jpeg',6626,'Frame 350 300x288',NULL,NULL,NULL,'2026-01-14 07:55:29','2026-01-14 07:55:29'),(925,'hf-fixed-new.jpg','/uploads/2026/01/hf-fixed-new.jpg','image','image/jpeg',170602,'hf fixed new',NULL,NULL,NULL,'2026-01-14 07:55:58','2026-01-14 07:55:58'),(926,'testimonial-dr-u-sai-kiran.png','/uploads/testimonials/testimonial-dr-u-sai-kiran.png','image','image/png',NULL,'Dr. U. Sai Kiran',NULL,'Testimonials',NULL,'2026-01-14 10:00:06','2026-01-14 10:00:06'),(927,'testimonial-dr-rakesh-lamba.png','/uploads/testimonials/testimonial-dr-rakesh-lamba.png','image','image/png',NULL,'Dr. Rakesh Lamba',NULL,'Testimonials',NULL,'2026-01-14 10:00:06','2026-01-14 10:00:06'),(928,'testimonial-sarah-jackson.png','/uploads/testimonials/testimonial-sarah-jackson.png','image','image/png',NULL,'Sarah Jackson',NULL,'Testimonials',NULL,'2026-01-14 10:00:06','2026-01-14 10:00:06'),(929,'testimonial-sai-speciality.png','/uploads/testimonials/testimonial-sai-speciality.png','image','image/png',NULL,'Sai Speciality Hospital',NULL,'Testimonials',NULL,'2026-01-14 10:00:06','2026-01-14 10:00:06'),(930,'testimonial-dr-s-karthik.png','/uploads/testimonials/testimonial-dr-s-karthik.png','image','image/png',NULL,'Dr. S. Karthik',NULL,'Testimonials',NULL,'2026-01-14 10:00:06','2026-01-14 10:00:06'),(931,'Screenshot-21.png','/uploads/2026/01/screenshot-21.png','image','image/png',34090,'Screenshot 21',NULL,NULL,NULL,'2026-01-14 10:05:15','2026-01-14 10:05:15'),(932,'Frame-387.png','/uploads/2026/01/frame-387.png','image','image/png',31910,'Frame 387',NULL,NULL,NULL,'2026-01-14 10:06:20','2026-01-14 10:06:20'),(933,'Figure-â-Testimonial-Image-1.jpg-1.png','/uploads/2026/01/figure-testimonial-image-1-jpg-1.png','image','image/png',17924,'Figure â Testimonial Image 1.jpg 1',NULL,NULL,NULL,'2026-01-14 10:08:29','2026-01-14 10:08:29'),(934,'Figure-â-Testimonial-Image-1.jpg-2.png','/uploads/2026/01/figure-testimonial-image-1-jpg-2.png','image','image/png',25268,'Figure â Testimonial Image 1.jpg 2',NULL,NULL,NULL,'2026-01-14 10:09:04','2026-01-14 10:09:04'),(935,'Figure-â-Testimonial-Image-1.jpg-3.png','/uploads/2026/01/figure-testimonial-image-1-jpg-3.png','image','image/png',42723,'Figure â Testimonial Image 1.jpg 3',NULL,NULL,NULL,'2026-01-14 10:09:29','2026-01-14 10:09:29'),(936,'phonecontact.svg','/uploads/2026/01/phonecontact.svg','svg','image/svg+xml',0,'phonecontact',NULL,NULL,NULL,'2026-01-14 10:27:15','2026-01-14 10:27:15'),(937,'emailcontact.svg','/uploads/2026/01/emailcontact.svg','svg','image/svg+xml',14094,'emailcontact',NULL,NULL,NULL,'2026-01-16 05:52:46','2026-01-16 05:52:46'),(938,'phonecontact.svg','/uploads/2026/01/phonecontact.svg','svg','image/svg+xml',18394,'phonecontact',NULL,NULL,NULL,'2026-01-16 05:52:58','2026-01-16 05:52:58'),(939,'emailcontact.svg','/uploads/2026/01/emailcontact.svg','svg','image/svg+xml',14094,'emailcontact',NULL,NULL,NULL,'2026-01-16 06:18:13','2026-01-16 06:18:13'),(940,'phonecontact.svg','/uploads/2026/01/phonecontact.svg','svg','image/svg+xml',18394,'phonecontact',NULL,NULL,NULL,'2026-01-16 06:24:10','2026-01-16 06:24:10'),(941,'phonecontact.svg','/uploads/2026/01/phonecontact.svg','svg','image/svg+xml',18394,'phonecontact',NULL,NULL,NULL,'2026-01-16 06:24:29','2026-01-16 06:24:29'),(942,'phonecontact.svg','/uploads/2026/01/phonecontact.svg','svg','image/svg+xml',18394,'phonecontact',NULL,NULL,NULL,'2026-01-16 06:24:43','2026-01-16 06:24:43'),(943,'8000.svg','/uploads/2026/01/8000.svg','svg','image/svg+xml',33604,'8000',NULL,NULL,NULL,'2026-01-16 06:27:04','2026-01-16 06:27:04'),(944,'phonecontact.svg','/uploads/2026/01/phonecontact.svg','svg','image/svg+xml',18394,'phonecontact',NULL,NULL,NULL,'2026-01-16 06:28:59','2026-01-16 06:28:59'),(945,'phonecontact.svg','/uploads/2026/01/phonecontact.svg','svg','image/svg+xml',18394,'phonecontact',NULL,NULL,NULL,'2026-01-16 06:30:18','2026-01-16 06:30:18'),(946,'reusablephone.svg','/uploads/2026/01/reusablephone.svg','svg','image/svg+xml',18394,'reusablephone',NULL,NULL,NULL,'2026-01-16 06:39:45','2026-01-16 06:39:45'),(947,'cdsco-logo.png','/uploads/2026/01/cdsco-logo.png','image','image/png',134980,'cdsco logo',NULL,NULL,NULL,'2026-01-16 09:02:31','2026-01-16 09:02:31'),(948,'image-58.svg','/uploads/2026/01/image-58.svg','svg','image/svg+xml',25607,'image 58',NULL,NULL,NULL,'2026-01-16 09:03:45','2026-01-16 09:03:45'),(949,'RS3-removebg-preview-1.svg','/uploads/2026/01/rs3-removebg-preview-1.svg','svg','image/svg+xml',84644,'RS3 removebg preview 1',NULL,NULL,NULL,'2026-01-16 09:04:16','2026-01-16 09:04:16'),(950,'image-57.svg','/uploads/2026/01/image-57.svg','svg','image/svg+xml',1695596,'image 57',NULL,NULL,NULL,'2026-01-16 09:04:42','2026-01-16 09:04:42'),(951,'image-56.svg','/uploads/2026/01/image-56.svg','svg','image/svg+xml',29420,'image 56',NULL,NULL,NULL,'2026-01-16 09:05:10','2026-01-16 09:05:10'),(952,'Frame-9-1-1.jpg','/uploads/2026/01/frame-9-1-1.jpg','image','image/jpeg',63838,'Frame 9 1 1',NULL,NULL,NULL,'2026-01-16 09:16:24','2026-01-16 09:16:24'),(953,'Frame-96-2-1.jpg','/uploads/2026/01/frame-96-2-1.jpg','image','image/jpeg',10967,'Frame 96 2 1',NULL,NULL,NULL,'2026-01-16 09:17:13','2026-01-16 09:17:13'),(954,'fpd-04.png','/uploads/2026/01/fpd-04.png','image','image/png',95222,'fpd 04',NULL,NULL,NULL,'2026-01-16 09:18:02','2026-01-16 09:18:02'),(955,'Frame-96-2-1.jpg','/uploads/2026/01/frame-96-2-1.jpg','image','image/jpeg',10967,'Frame 96 2 1',NULL,NULL,NULL,'2026-01-16 09:22:08','2026-01-16 09:22:08'),(956,'Frame-32-3-1-1.jpg','/uploads/2026/01/frame-32-3-1-1.jpg','image','image/jpeg',40448,'Frame 32 3 1 1',NULL,NULL,NULL,'2026-01-16 09:23:35','2026-01-16 09:23:35'),(957,'full_vertical_integration.svg','/uploads/2026/01/full_vertical_integration.svg','svg','image/svg+xml',22320,'full vertical integration',NULL,NULL,NULL,'2026-01-16 10:58:51','2026-01-16 10:58:51'),(958,'streamlined_processes.svg','/uploads/2026/01/streamlined_processes.svg','svg','image/svg+xml',25696,'streamlined processes',NULL,NULL,NULL,'2026-01-16 10:59:09','2026-01-16 10:59:09'),(959,'quality_controll.svg','/uploads/2026/01/quality_controll.svg','svg','image/svg+xml',25776,'quality controll',NULL,NULL,NULL,'2026-01-16 10:59:33','2026-01-16 10:59:33'),(960,'Frame-9-1.jpg','/uploads/2026/01/frame-9-1.jpg','image','image/jpeg',102116,'Frame 9 1',NULL,NULL,NULL,'2026-01-16 11:27:48','2026-01-16 11:27:48'),(961,'Frame-32-5-1.jpg','/uploads/2026/01/frame-32-5-1.jpg','image','image/jpeg',27387,'Frame 32 5 1',NULL,NULL,NULL,'2026-01-16 11:29:12','2026-01-16 11:29:12'),(962,'Frame-32-6-1.jpg','/uploads/2026/01/frame-32-6-1.jpg','image','image/jpeg',32094,'Frame 32 6 1',NULL,NULL,NULL,'2026-01-16 11:30:46','2026-01-16 11:30:46'),(963,'Frame-32-6-1.jpg','/uploads/2026/01/frame-32-6-1.jpg','image','image/jpeg',32094,'Frame 32 6 1',NULL,NULL,NULL,'2026-01-16 11:31:09','2026-01-16 11:31:09'),(964,'eu-corporate-business-office-street-background-1.jpg','/uploads/2026/01/eu-corporate-business-office-street-background-1.jpg','image','image/jpeg',265514,'eu corporate business office street background 1',NULL,NULL,NULL,'2026-01-17 06:10:19','2026-01-17 06:10:19'),(965,'Frame-32-3-1.jpg','/uploads/2026/01/frame-32-3-1.jpg','image','image/jpeg',35792,'Frame 32 3 1',NULL,NULL,NULL,'2026-01-17 07:04:58','2026-01-17 07:04:58'),(966,'424x293-Digital-Radiography.png','/uploads/2026/01/424x293-digital-radiography.png','image','image/png',37666,'424x293 Digital Radiography',NULL,NULL,NULL,'2026-01-17 07:06:06','2026-01-17 07:06:06'),(967,'Frame-97-4-1.jpg','/uploads/2026/01/frame-97-4-1.jpg','image','image/jpeg',45774,'Frame 97 4 1',NULL,NULL,NULL,'2026-01-17 07:06:40','2026-01-17 07:06:40'),(968,'unmatched_pr.svg','/uploads/2026/01/unmatched_pr.svg','svg','image/svg+xml',28940,'unmatched pr',NULL,NULL,NULL,'2026-01-17 07:33:59','2026-01-17 07:33:59'),(969,'continuousinno.svg','/uploads/2026/01/continuousinno.svg','svg','image/svg+xml',25828,'continuousinno',NULL,NULL,NULL,'2026-01-17 07:34:15','2026-01-17 07:34:15'),(970,'growingglobaln.svg','/uploads/2026/01/growingglobaln.svg','svg','image/svg+xml',28352,'growingglobaln',NULL,NULL,NULL,'2026-01-17 07:34:28','2026-01-17 07:34:28'),(971,'global.svg','/uploads/2026/01/global.svg','svg','image/svg+xml',34048,'global',NULL,NULL,NULL,'2026-01-17 07:45:49','2026-01-17 07:45:49'),(972,'global.svg','/uploads/2026/01/global.svg','svg','image/svg+xml',34048,'global',NULL,NULL,NULL,'2026-01-17 07:46:05','2026-01-17 07:46:05'),(973,'hearty.svg','/uploads/2026/01/hearty.svg','svg','image/svg+xml',26656,'hearty',NULL,NULL,NULL,'2026-01-17 07:47:24','2026-01-17 07:47:24'),(974,'commitment.svg','/uploads/2026/01/commitment.svg','svg','image/svg+xml',19244,'commitment',NULL,NULL,NULL,'2026-01-17 07:47:41','2026-01-17 07:47:41'),(975,'global.svg','/uploads/2026/01/global.svg','svg','image/svg+xml',34048,'global',NULL,NULL,NULL,'2026-01-17 07:57:53','2026-01-17 07:57:53'),(976,'HF-Mobile-New.jpg','/uploads/2026/01/hf-mobile-new.jpg','image','image/jpeg',29673,'HF Mobile New',NULL,NULL,NULL,'2026-01-20 05:10:57','2026-01-20 05:10:57'),(977,'HF-Mobile-New.jpg','/uploads/2026/01/hf-mobile-new.jpg','image','image/jpeg',29673,'HF Mobile New',NULL,NULL,NULL,'2026-01-20 05:11:16','2026-01-20 05:11:16'),(978,'HF-Mobile-New.jpg','/uploads/2026/01/hf-mobile-new.jpg','image','image/jpeg',29673,'HF Mobile New',NULL,NULL,NULL,'2026-01-20 05:12:01','2026-01-20 05:12:01'),(979,'hf-fixed-new.jpg','/uploads/2026/01/hf-fixed-new.jpg','image','image/jpeg',170602,'hf fixed new',NULL,NULL,NULL,'2026-01-20 05:13:14','2026-01-20 05:13:14'),(980,'02.jpg','/uploads/2026/01/02.jpg','image','image/jpeg',18809,'02',NULL,NULL,NULL,'2026-01-20 05:14:22','2026-01-20 05:14:22'),(981,'01.jpg','/uploads/2026/01/01.jpg','image','image/jpeg',54075,'01',NULL,NULL,NULL,'2026-01-20 05:15:18','2026-01-20 05:15:18'),(982,'05.jpg','/uploads/2026/01/05.jpg','image','image/jpeg',20768,'05',NULL,NULL,NULL,'2026-01-20 05:15:38','2026-01-20 05:15:38'),(983,'03-1-2.jpg','/uploads/2026/01/03-1-2.jpg','image','image/jpeg',20900,'03 1 2',NULL,NULL,NULL,'2026-01-20 05:15:56','2026-01-20 05:15:56'),(984,'ADN0321-copy-2.jpg','/uploads/2026/01/adn0321-copy-2.jpg','image','image/jpeg',28161,'ADN0321 copy 2',NULL,NULL,NULL,'2026-01-20 05:18:49','2026-01-20 05:18:49'),(985,'ADN0352-copy-1.jpg','/uploads/2026/01/adn0352-copy-1.jpg','image','image/jpeg',30636,'ADN0352 copy 1',NULL,NULL,NULL,'2026-01-20 05:19:12','2026-01-20 05:19:12'),(986,'ADN0391-copy-1.jpg','/uploads/2026/01/adn0391-copy-1.jpg','image','image/jpeg',23380,'ADN0391 copy 1',NULL,NULL,NULL,'2026-01-20 05:19:30','2026-01-20 05:19:30'),(987,'ADN0321-copy-2.jpg','/uploads/2026/01/adn0321-copy-2.jpg','image','image/jpeg',28161,'ADN0321 copy 2',NULL,NULL,NULL,'2026-01-20 05:20:29','2026-01-20 05:20:29'),(988,'02-1.jpg','/uploads/2026/01/02-1.jpg','image','image/jpeg',31194,'02 1',NULL,NULL,NULL,'2026-01-20 05:22:08','2026-01-20 05:22:08'),(989,'0.5k-img2.jpg','/uploads/2026/01/0-5k-img2.jpg','image','image/jpeg',203223,'0.5k img2',NULL,NULL,NULL,'2026-01-20 05:22:41','2026-01-20 05:22:41'),(990,'o.5k-img1.jpg','/uploads/2026/01/o-5k-img1.jpg','image','image/jpeg',168758,'o.5k img1',NULL,NULL,NULL,'2026-01-20 05:22:57','2026-01-20 05:22:57'),(991,'Line-Frequency-New.jpg','/uploads/2026/01/line-frequency-new.jpg','image','image/jpeg',19010,'Line Frequency New',NULL,NULL,NULL,'2026-01-20 05:24:21','2026-01-20 05:24:21'),(992,'3rd.jpg','/uploads/2026/01/3rd.jpg','image','image/jpeg',53502,'3rd',NULL,NULL,NULL,'2026-01-20 05:24:50','2026-01-20 05:24:50'),(993,'Digital-Radiography-New.jpg','/uploads/2026/01/digital-radiography-new.jpg','image','image/jpeg',27538,'Digital Radiography New',NULL,NULL,NULL,'2026-01-20 05:28:41','2026-01-20 05:28:41'),(994,'untitled-76.jpg','/uploads/2026/01/untitled-76.jpg','image','image/jpeg',21120,'untitled 76',NULL,NULL,NULL,'2026-01-20 05:29:02','2026-01-20 05:29:02'),(995,'New-Project.jpg','/uploads/2026/01/new-project.jpg','image','image/jpeg',36690,'New Project',NULL,NULL,NULL,'2026-01-20 05:29:19','2026-01-20 05:29:19'),(996,'New-Project-1.jpg','/uploads/2026/01/new-project-1.jpg','image','image/jpeg',30427,'New Project 1',NULL,NULL,NULL,'2026-01-20 05:29:38','2026-01-20 05:29:38'),(997,'New-Project-2.jpg','/uploads/2026/01/new-project-2.jpg','image','image/jpeg',23506,'New Project 2',NULL,NULL,NULL,'2026-01-20 05:29:54','2026-01-20 05:29:54'),(998,'Dream_series.jpg','/uploads/2026/01/dream_series.jpg','image','image/jpeg',32884,'Dream series',NULL,NULL,NULL,'2026-01-20 05:30:36','2026-01-20 05:30:36'),(999,'image-48-1.jpg','/uploads/2026/01/image-48-1.jpg','image','image/jpeg',66499,'image 48 1',NULL,NULL,NULL,'2026-01-20 06:24:39','2026-01-20 06:24:39'),(1000,'Group-9-768x889.png','/uploads/2026/01/group-9-768x889.png','image','image/png',113157,'Group 9 768x889',NULL,NULL,NULL,'2026-01-20 06:25:04','2026-01-20 06:25:04'),(1001,'Frame-32-2-1-298x300.jpg','/uploads/2026/01/frame-32-2-1-298x300.jpg','image','image/jpeg',18939,'Frame 32 2 1 298x300',NULL,NULL,NULL,'2026-01-20 06:25:22','2026-01-20 06:25:22'),(1002,'Frame-32-2-1.jpg','/uploads/2026/01/frame-32-2-1.jpg','image','image/jpeg',47035,'Frame 32 2 1',NULL,NULL,NULL,'2026-01-20 06:27:14','2026-01-20 06:27:14'),(1003,'hospital-hallway-with-people-walking-down-it-1-1.jpg','/uploads/2026/01/hospital-hallway-with-people-walking-down-it-1-1.jpg','image','image/jpeg',107891,'hospital hallway with people walking down it 1 1',NULL,NULL,NULL,'2026-01-20 06:36:09','2026-01-20 06:36:09'),(1004,'Frame-97-3-1.jpg','/uploads/2026/01/frame-97-3-1.jpg','image','image/jpeg',18579,'Frame 97 3 1',NULL,NULL,NULL,'2026-01-20 06:37:05','2026-01-20 06:37:05'),(1005,'Frame-32-1.jpg','/uploads/2026/01/frame-32-1.jpg','image','image/jpeg',55368,'Frame 32 1',NULL,NULL,NULL,'2026-01-20 07:10:40','2026-01-20 07:10:40');
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `navigation_items`
--

DROP TABLE IF EXISTS `navigation_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `navigation_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parent_id` int DEFAULT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `open_in_new_tab` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_parent` (`parent_id`),
  KEY `idx_order` (`order_index`),
  CONSTRAINT `navigation_items_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `navigation_items` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `navigation_items`
--

LOCK TABLES `navigation_items` WRITE;
/*!40000 ALTER TABLE `navigation_items` DISABLE KEYS */;
INSERT INTO `navigation_items` VALUES (1,'Home','/',NULL,1,1,0,'2026-01-07 13:44:48','2026-01-07 13:44:48'),(2,'About Us','/about',1,1,1,0,'2026-01-07 13:44:48','2026-01-07 13:44:48'),(3,'Leadership','/management',1,2,1,0,'2026-01-07 13:44:48','2026-01-07 13:44:48'),(4,'Our Presence','/our-presence',1,3,1,0,'2026-01-07 13:44:48','2026-01-07 13:44:48'),(5,'Production Facility','/production-facility',1,4,1,0,'2026-01-07 13:44:48','2026-01-07 13:44:48'),(6,'Quality Assurance & Regulatory','/quality-assurance',1,5,1,0,'2026-01-07 13:44:48','2026-01-07 13:44:48'),(7,'Specialties','/specialties',NULL,2,1,0,'2026-01-07 13:44:48','2026-01-07 13:44:48'),(8,'Our Products','/our-products',NULL,3,1,0,'2026-01-07 13:44:48','2026-01-12 07:49:04'),(9,'HF Mobile','/products/hf-mobile',8,1,1,0,'2026-01-07 13:44:48','2026-01-07 13:44:48'),(10,'HF Fixed','/products/hf-fixed',8,2,1,0,'2026-01-07 13:44:48','2026-01-07 13:44:48'),(11,'FPD-C-Arm','/products/fpd-c-arm',8,3,1,0,'2026-01-07 13:44:48','2026-01-07 13:44:48'),(12,'1K*1K High End HF C-ARM','/products/1k1k-high-end-hf-c-arm',8,4,1,0,'2026-01-07 13:44:48','2026-01-07 13:44:48'),(13,'Line Frequency X-Ray Systems','/products/line-frequency-x-ray-systems',8,5,1,0,'2026-01-07 13:44:48','2026-01-07 13:44:48'),(14,'Digital Radiography','/products/digital-radiography',8,6,1,0,'2026-01-07 13:44:48','2026-01-07 13:44:48'),(15,'Dream Series-Ceiling Suspended','/products/dream-series-ceiling-suspended',8,7,1,0,'2026-01-07 13:44:48','2026-01-07 13:44:48'),(16,'Careers','/careers',NULL,4,1,0,'2026-01-07 13:44:48','2026-01-07 13:44:48'),(17,'Investor Relations','/investor-relations',NULL,5,1,0,'2026-01-07 13:44:48','2026-01-07 13:44:48'),(18,'Awards','/awards',NULL,6,1,0,'2026-01-07 13:44:48','2026-01-07 13:44:48'),(19,'Clients','/clients',NULL,7,1,0,'2026-01-07 13:44:48','2026-01-07 13:44:48');
/*!40000 ALTER TABLE `navigation_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `office_locations`
--

DROP TABLE IF EXISTS `office_locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `office_locations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `office_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `office_locations`
--

LOCK TABLES `office_locations` WRITE;
/*!40000 ALTER TABLE `office_locations` DISABLE KEYS */;
INSERT INTO `office_locations` VALUES (1,'headquarters','Mohali','Punjab','India','E-70, PHASE- VIII, INDUSTRIAL AREA, MOHALI, 160071','9872003273','support@adonismedical.com',30.70460000,76.71790000,1,'2026-01-07 13:45:35');
/*!40000 ALTER TABLE `office_locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `our_presence_page_content`
--

DROP TABLE IF EXISTS `our_presence_page_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `our_presence_page_content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hero_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hero_subtitle` text COLLATE utf8mb4_unicode_ci,
  `hero_image_id` int DEFAULT NULL,
  `intro_text` text COLLATE utf8mb4_unicode_ci,
  `map_image_id` int DEFAULT NULL,
  `sales_service_heading` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sales_service_content` text COLLATE utf8mb4_unicode_ci,
  `sales_service_image_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `map_background_image_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `hero_image_id` (`hero_image_id`),
  KEY `map_image_id` (`map_image_id`),
  KEY `sales_service_image_id` (`sales_service_image_id`),
  KEY `map_background_image_id` (`map_background_image_id`),
  CONSTRAINT `our_presence_page_content_ibfk_1` FOREIGN KEY (`hero_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `our_presence_page_content_ibfk_2` FOREIGN KEY (`map_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `our_presence_page_content_ibfk_3` FOREIGN KEY (`sales_service_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `our_presence_page_content_ibfk_4` FOREIGN KEY (`map_background_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `our_presence_page_content`
--

LOCK TABLES `our_presence_page_content` WRITE;
/*!40000 ALTER TABLE `our_presence_page_content` DISABLE KEYS */;
INSERT INTO `our_presence_page_content` VALUES (1,'Our Global Presence','Serving Healthcare Worldwide',999,'Adonis Medical Systems, a leader in medical imaging since 1998, delivers advanced, ergonomically designed X-ray solutions with a strong commitment to safety, innovation, and exceptional customer service.',1000,'Well-connected sales and service teams','At the heart of our regional offices are our proficient sales and service teams. Positioned strategically, these teams ensure that our clientele receives the support they need promptly. Whether it\'s addressing current customers\' inquiries or extending a helping hand to those considering our services, Adonis ensures a consistent and reliable experience throughout.\n\nThis robust infrastructure not only enhances our operational efficiency but also reflects our dedication to being accessible and responsive in every market we serve. By strategically placing our regional offices, we aim to create a synergy that fosters lasting relationships with our customers, making Adonis a trusted partner in their journey towards success.',1002,'2026-01-07 13:45:35','2026-01-20 06:27:17',NULL);
/*!40000 ALTER TABLE `our_presence_page_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `our_products_page_content`
--

DROP TABLE IF EXISTS `our_products_page_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `our_products_page_content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hero_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hero_subtitle` text COLLATE utf8mb4_unicode_ci,
  `hero_image_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `hero_image_id` (`hero_image_id`),
  CONSTRAINT `our_products_page_content_ibfk_1` FOREIGN KEY (`hero_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `our_products_page_content`
--

LOCK TABLES `our_products_page_content` WRITE;
/*!40000 ALTER TABLE `our_products_page_content` DISABLE KEYS */;
INSERT INTO `our_products_page_content` VALUES (1,'Our Products',NULL,923,'2026-01-12 07:38:36','2026-01-12 08:50:01');
/*!40000 ALTER TABLE `our_products_page_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `privacy_policy_page`
--

DROP TABLE IF EXISTS `privacy_policy_page`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `privacy_policy_page` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'Privacy Policy',
  `subtitle` text COLLATE utf8mb4_unicode_ci,
  `rich_text_content` longtext COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privacy_policy_page`
--

LOCK TABLES `privacy_policy_page` WRITE;
/*!40000 ALTER TABLE `privacy_policy_page` DISABLE KEYS */;
INSERT INTO `privacy_policy_page` VALUES (1,'Privacy Policy','Your privacy is important to us. Learn how we protect your information.','<div class=\"elementor-element elementor-element-85b1011 elementor-widget elementor-widget-heading animated fadeInUp\" style=\"box-sizing: border-box; --flex-direction: initial; --flex-wrap: initial; --justify-content: initial; --align-items: initial; --align-content: initial; --gap: initial; --flex-basis: initial; --flex-grow: initial; --flex-shrink: initial; --order: initial; --align-self: initial; flex: 0 1 auto; order: 0; align-self: auto; flex-flow: row; place-content: normal; align-items: normal; gap: normal; position: relative; animation-duration: 1.25s; --swiper-theme-color: #000; --swiper-navigation-size: 44px; --swiper-pagination-bullet-size: 6px; --swiper-pagination-bullet-horizontal-gap: 6px; --widgets-spacing: 20px 20px; animation-name: fadeInUp; margin-bottom: 20px; min-width: 0px; margin-block-end: 0px; max-width: 100%; color: #334155; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen-Sans, Ubuntu, Cantarell, \'Helvetica Neue\', sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\" data-id=\"85b1011\" data-element_type=\"widget\" data-settings=\"{&quot;_animation&quot;:&quot;fadeInUp&quot;}\" data-widget_type=\"heading.default\">\n<div class=\"elementor-widget-container\" style=\"box-sizing: border-box; transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s, transform 0.4s; height: 56.0062px;\">\n<h1 class=\"elementor-heading-title elementor-size-default\" style=\"box-sizing: border-box; border: 0px; font-size: 40px; font-style: inherit; font-weight: bold; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: #7dc244; line-height: 56px; font-family: Roboto, sans-serif;\">Privacy Policy</h1>\n</div>\n</div>\n<div class=\"elementor-element elementor-element-739063b9 elementor-widget elementor-widget-text-editor animated fadeInUp\" style=\"box-sizing: border-box; --flex-direction: initial; --flex-wrap: initial; --justify-content: initial; --align-items: initial; --align-content: initial; --gap: initial; --flex-basis: initial; --flex-grow: initial; --flex-shrink: initial; --order: initial; --align-self: initial; flex: 0 1 auto; order: 0; align-self: auto; flex-flow: row; place-content: normal; align-items: normal; gap: normal; position: relative; animation-duration: 1.25s; --swiper-theme-color: #000; --swiper-navigation-size: 44px; --swiper-pagination-bullet-size: 6px; --swiper-pagination-bullet-horizontal-gap: 6px; --widgets-spacing: 20px 20px; color: #58595b; font-family: Montserrat, sans-serif; font-weight: 500; animation-name: fadeInUp; margin-bottom: 20px; min-width: 0px; margin-block-end: 0px; font-size: 18px; line-height: 27px; max-width: 100%; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\" data-id=\"739063b9\" data-element_type=\"widget\" data-settings=\"{&quot;_animation&quot;:&quot;fadeInUp&quot;,&quot;_animation_delay&quot;:100}\" data-widget_type=\"text-editor.default\">\n<div class=\"elementor-widget-container\" style=\"box-sizing: border-box; transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s, transform 0.4s; height: 553.5px; margin: 0px 0px -10px;\">\n<p style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: inherit; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline;\"><span style=\"box-sizing: border-box; font-weight: 400;\">Adonis Medical Systems Private Limited, which shall mean and include its parent company, holding company, subsidiaries, affiliates, associate companies and Refex Group of Companies&nbsp;(&ldquo;we&rdquo;, &ldquo;our&rdquo;, and &ldquo;Adonis&rdquo;)&nbsp;is fully committed to protecting your personal information. The protection of your privacy and personal data is an important concern to which we pay special attention in our business processes. We process your personal data, provided by you voluntarily during visits to our Website, as defined below, in accordance with the applicable laws, rules &amp; regulations of India. .</span></p>\n<p style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: inherit; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline;\"><span style=\"box-sizing: border-box; font-weight: 400;\">This Privacy Policy (&ldquo;Policy&rdquo;) applies to the main Website&nbsp;</span><a style=\"box-sizing: border-box; background-color: transparent; text-decoration: none; color: #046bd2; transition: 0.2s linear; box-shadow: none;\" href=\"https://www.adonismedical.com/\"><span style=\"box-sizing: border-box; font-weight: 400;\">&ldquo;www.adonismedical.com&rdquo;</span></a><span style=\"box-sizing: border-box; font-weight: 400;\">. Please note that this Website may include links to the ancillary websites of Adonis and shall include its subsidiaries, affiliates, associate, parent, holding and group companies. Further, this Website may lead/ include links of third parties whose privacy practices differ from those of Adonis. If you provide your personal data to any of those websites, then your data is governed by their privacy policy/statements and not by this Policy. Your privacy is important to us.&nbsp; We take the privacy of your information seriously. This Policy only applies to information collected through this Website and not to any information collected offline.</span></p>\n<p style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: inherit; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline;\"><span style=\"box-sizing: border-box; font-weight: 400;\">The core objective of this Policy is to bring to your knowledge the nature of your personal data collected by us, the purpose of collecting such data and its use, the subsequent processing of such data and your rights pertaining to such personal data shared with us. This Policy further sets out your rights pertaining to the protection of your personal data. This Policy describes the information that Adonis collects through this Website, how that information is used, maintained, shared, protected and how you can update it.</span></p>\n<p style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: inherit; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline;\"><span style=\"box-sizing: border-box; font-weight: 400;\">We encourage you to read and understand this Policy in connection with the use of our Website.</span></p>\n</div>\n</div>\n<div class=\"elementor-element elementor-element-8bac481 elementor-widget elementor-widget-heading animated fadeInUp\" style=\"box-sizing: border-box; --flex-direction: initial; --flex-wrap: initial; --justify-content: initial; --align-items: initial; --align-content: initial; --gap: initial; --flex-basis: initial; --flex-grow: initial; --flex-shrink: initial; --order: initial; --align-self: initial; flex: 0 1 auto; order: 0; align-self: auto; flex-flow: row; place-content: normal; align-items: normal; gap: normal; position: relative; animation-duration: 1.25s; --swiper-theme-color: #000; --swiper-navigation-size: 44px; --swiper-pagination-bullet-size: 6px; --swiper-pagination-bullet-horizontal-gap: 6px; --widgets-spacing: 20px 20px; animation-name: fadeInUp; margin-bottom: 20px; min-width: 0px; margin-block-end: 0px; max-width: 100%; color: #334155; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen-Sans, Ubuntu, Cantarell, \'Helvetica Neue\', sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\" data-id=\"8bac481\" data-element_type=\"widget\" data-settings=\"{&quot;_animation&quot;:&quot;fadeInUp&quot;}\" data-widget_type=\"heading.default\">\n<div class=\"elementor-widget-container\" style=\"box-sizing: border-box; transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s, transform 0.4s; height: 27.9937px;\">\n<h2 class=\"elementor-heading-title elementor-size-default\" style=\"box-sizing: border-box; border: 0px; font-size: 24px; font-style: inherit; font-weight: bold; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: #333842; line-height: 28px; font-family: Roboto, sans-serif;\">1. DEFINITIONS</h2>\n</div>\n</div>\n<div class=\"elementor-element elementor-element-4c9d49c elementor-widget elementor-widget-text-editor animated fadeInUp\" style=\"box-sizing: border-box; --flex-direction: initial; --flex-wrap: initial; --justify-content: initial; --align-items: initial; --align-content: initial; --gap: initial; --flex-basis: initial; --flex-grow: initial; --flex-shrink: initial; --order: initial; --align-self: initial; flex: 0 1 auto; order: 0; align-self: auto; flex-flow: row; place-content: normal; align-items: normal; gap: normal; position: relative; animation-duration: 1.25s; --swiper-theme-color: #000; --swiper-navigation-size: 44px; --swiper-pagination-bullet-size: 6px; --swiper-pagination-bullet-horizontal-gap: 6px; --widgets-spacing: 20px 20px; color: #58595b; font-family: Montserrat, sans-serif; font-weight: 500; animation-name: fadeInUp; margin-bottom: 20px; min-width: 0px; margin-block-end: 0px; font-size: 18px; line-height: 27px; max-width: 100%; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\" data-id=\"4c9d49c\" data-element_type=\"widget\" data-settings=\"{&quot;_animation&quot;:&quot;fadeInUp&quot;,&quot;_animation_delay&quot;:100}\" data-widget_type=\"text-editor.default\">\n<div class=\"elementor-widget-container\" style=\"box-sizing: border-box; transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s, transform 0.4s; height: 277.481px; margin: 0px 0px -15px;\">\n<p style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: inherit; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline;\"><span style=\"box-sizing: border-box; font-weight: 400;\">In this Policy the following definitions are used:</span></p>\n<ol style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: inherit; margin: 0px 0px 1.5em 3em; outline: 0px; padding: 0px; vertical-align: baseline; list-style: lower-alpha;\">\n<li style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: inherit; margin: 0px 0px 10px; outline: 0px; padding: 0px; vertical-align: baseline;\"><span style=\"box-sizing: border-box; font-weight: 400;\">&ldquo;Data&rdquo;&nbsp;includes information including your personal information that you submit to via the Website and information that is accessed by Adonis pursuant to your visit to the Website except for your information that is or will be in the public domain.</span></li>\n<li style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: inherit; margin: 0px 0px 10px; outline: 0px; padding: 0px; vertical-align: baseline;\"><span style=\"box-sizing: border-box; font-weight: 400;\">&ldquo;Data Protection Laws&rdquo;&nbsp;any applicable law relating to the processing of personal Data, including the Information Technology Act, 2000, as amended or substituted;</span></li>\n<li style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: inherit; margin: 0px 0px 10px; outline: 0px; padding: 0px; vertical-align: baseline;\"><span style=\"box-sizing: border-box; font-weight: 400;\">&ldquo;User or you&rdquo; the natural person who accesses the Website</span></li>\n<li style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: inherit; margin: 0px 0px 10px; outline: 0px; padding: 0px; vertical-align: baseline;\">&ldquo;Website&rdquo; is the website that you are currently using,&nbsp;<a style=\"box-sizing: border-box; background-color: #ffffff; text-decoration: none; color: #046bd2; transition: 0.2s linear; box-shadow: none; font-size: 16px;\" href=\"https://www.adonismedical.com/\"><span style=\"box-sizing: border-box; font-weight: 400;\">www.adonismedical.com</span></a><span style=\"box-sizing: border-box; font-weight: 400;\">, and any sub-domains of this site, unless excluded by their own terms.</span></li>\n</ol>\n</div>\n</div>\n<div class=\"elementor-element elementor-element-5ddd2b2 elementor-widget elementor-widget-heading animated fadeInUp\" style=\"box-sizing: border-box; --flex-direction: initial; --flex-wrap: initial; --justify-content: initial; --align-items: initial; --align-content: initial; --gap: initial; --flex-basis: initial; --flex-grow: initial; --flex-shrink: initial; --order: initial; --align-self: initial; flex: 0 1 auto; order: 0; align-self: auto; flex-flow: row; place-content: normal; align-items: normal; gap: normal; position: relative; animation-duration: 1.25s; --swiper-theme-color: #000; --swiper-navigation-size: 44px; --swiper-pagination-bullet-size: 6px; --swiper-pagination-bullet-horizontal-gap: 6px; --widgets-spacing: 20px 20px; animation-name: fadeInUp; margin-bottom: 20px; min-width: 0px; margin-block-end: 0px; max-width: 100%; color: #334155; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen-Sans, Ubuntu, Cantarell, \'Helvetica Neue\', sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\" data-id=\"5ddd2b2\" data-element_type=\"widget\" data-settings=\"{&quot;_animation&quot;:&quot;fadeInUp&quot;}\" data-widget_type=\"heading.default\">\n<div class=\"elementor-widget-container\" style=\"box-sizing: border-box; transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s, transform 0.4s; height: 27.9937px;\">\n<h2 class=\"elementor-heading-title elementor-size-default\" style=\"box-sizing: border-box; border: 0px; font-size: 24px; font-style: inherit; font-weight: bold; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: #333842; line-height: 28px; font-family: Roboto, sans-serif;\">2. SCOPE</h2>\n</div>\n</div>\n<div class=\"elementor-element elementor-element-cf9afee elementor-widget elementor-widget-text-editor animated fadeInUp\" style=\"box-sizing: border-box; --flex-direction: initial; --flex-wrap: initial; --justify-content: initial; --align-items: initial; --align-content: initial; --gap: initial; --flex-basis: initial; --flex-grow: initial; --flex-shrink: initial; --order: initial; --align-self: initial; flex: 0 1 auto; order: 0; align-self: auto; flex-flow: row; place-content: normal; align-items: normal; gap: normal; position: relative; animation-duration: 1.25s; --swiper-theme-color: #000; --swiper-navigation-size: 44px; --swiper-pagination-bullet-size: 6px; --swiper-pagination-bullet-horizontal-gap: 6px; --widgets-spacing: 20px 20px; color: #58595b; font-family: Montserrat, sans-serif; font-weight: 500; animation-name: fadeInUp; margin-bottom: 20px; min-width: 0px; margin-block-end: 0px; font-size: 18px; line-height: 27px; max-width: 100%; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\" data-id=\"cf9afee\" data-element_type=\"widget\" data-settings=\"{&quot;_animation&quot;:&quot;fadeInUp&quot;,&quot;_animation_delay&quot;:100}\" data-widget_type=\"text-editor.default\">\n<div class=\"elementor-widget-container\" style=\"box-sizing: border-box; transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s, transform 0.4s; height: 54px;\"><span style=\"box-sizing: border-box; font-weight: 400;\">Adonis collects some of the Data directly from the Website, such as when you submit an entry (through the general query, or submission of a proposal). You can visit</span><a style=\"box-sizing: border-box; background-color: transparent; text-decoration: none; color: #046bd2; transition: 0.2s linear; box-shadow: none;\" href=\"https://www.adonismedical.com/\"><span style=\"box-sizing: border-box; font-weight: 400;\">&nbsp;www.adonismedical.com</span></a><span style=\"box-sizing: border-box; font-weight: 400;\">&nbsp;without telling Adonis who you are.</span></div>\n</div>\n<div class=\"elementor-element elementor-element-d51e4bf elementor-widget elementor-widget-heading animated fadeInUp\" style=\"box-sizing: border-box; --flex-direction: initial; --flex-wrap: initial; --justify-content: initial; --align-items: initial; --align-content: initial; --gap: initial; --flex-basis: initial; --flex-grow: initial; --flex-shrink: initial; --order: initial; --align-self: initial; flex: 0 1 auto; order: 0; align-self: auto; flex-flow: row; place-content: normal; align-items: normal; gap: normal; position: relative; animation-duration: 1.25s; --swiper-theme-color: #000; --swiper-navigation-size: 44px; --swiper-pagination-bullet-size: 6px; --swiper-pagination-bullet-horizontal-gap: 6px; --widgets-spacing: 20px 20px; animation-name: fadeInUp; margin-bottom: 20px; min-width: 0px; margin-block-end: 0px; max-width: 100%; color: #334155; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen-Sans, Ubuntu, Cantarell, \'Helvetica Neue\', sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\" data-id=\"d51e4bf\" data-element_type=\"widget\" data-settings=\"{&quot;_animation&quot;:&quot;fadeInUp&quot;}\" data-widget_type=\"heading.default\">\n<div class=\"elementor-widget-container\" style=\"box-sizing: border-box; transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s, transform 0.4s; height: 27.9937px;\">\n<h2 class=\"elementor-heading-title elementor-size-default\" style=\"box-sizing: border-box; border: 0px; font-size: 24px; font-style: inherit; font-weight: bold; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: #333842; line-height: 28px; font-family: Roboto, sans-serif;\">3. APPLICABILITY</h2>\n</div>\n</div>\n<div class=\"elementor-element elementor-element-ce50cc4 elementor-widget elementor-widget-text-editor animated fadeInUp\" style=\"box-sizing: border-box; --flex-direction: initial; --flex-wrap: initial; --justify-content: initial; --align-items: initial; --align-content: initial; --gap: initial; --flex-basis: initial; --flex-grow: initial; --flex-shrink: initial; --order: initial; --align-self: initial; flex: 0 1 auto; order: 0; align-self: auto; flex-flow: row; place-content: normal; align-items: normal; gap: normal; position: relative; animation-duration: 1.25s; --swiper-theme-color: #000; --swiper-navigation-size: 44px; --swiper-pagination-bullet-size: 6px; --swiper-pagination-bullet-horizontal-gap: 6px; --widgets-spacing: 20px 20px; color: #58595b; font-family: Montserrat, sans-serif; font-weight: 500; animation-name: fadeInUp; margin-bottom: 20px; min-width: 0px; margin-block-end: 0px; font-size: 18px; line-height: 27px; max-width: 100%; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\" data-id=\"ce50cc4\" data-element_type=\"widget\" data-settings=\"{&quot;_animation&quot;:&quot;fadeInUp&quot;,&quot;_animation_delay&quot;:100}\" data-widget_type=\"text-editor.default\">\n<div class=\"elementor-widget-container\" style=\"box-sizing: border-box; transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s, transform 0.4s; height: 54px;\"><span style=\"box-sizing: border-box; font-weight: 400;\">Adonis collects some of the Data directly from the Website, such as when you submit an entry (through the general query, or submission of a proposal). You can visit</span><a style=\"box-sizing: border-box; background-color: transparent; text-decoration: none; color: #046bd2; transition: 0.2s linear; box-shadow: none;\" href=\"https://www.adonismedical.com/\"><span style=\"box-sizing: border-box; font-weight: 400;\">&nbsp;www.adonismedical.com</span></a><span style=\"box-sizing: border-box; font-weight: 400;\">&nbsp;without telling Adonis who you are.</span></div>\n</div>\n<div class=\"elementor-element elementor-element-73fa5a6 elementor-widget elementor-widget-heading animated fadeInUp\" style=\"box-sizing: border-box; --flex-direction: initial; --flex-wrap: initial; --justify-content: initial; --align-items: initial; --align-content: initial; --gap: initial; --flex-basis: initial; --flex-grow: initial; --flex-shrink: initial; --order: initial; --align-self: initial; flex: 0 1 auto; order: 0; align-self: auto; flex-flow: row; place-content: normal; align-items: normal; gap: normal; position: relative; animation-duration: 1.25s; --swiper-theme-color: #000; --swiper-navigation-size: 44px; --swiper-pagination-bullet-size: 6px; --swiper-pagination-bullet-horizontal-gap: 6px; --widgets-spacing: 20px 20px; animation-name: fadeInUp; margin-bottom: 20px; min-width: 0px; margin-block-end: 0px; max-width: 100%; color: #334155; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen-Sans, Ubuntu, Cantarell, \'Helvetica Neue\', sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\" data-id=\"73fa5a6\" data-element_type=\"widget\" data-settings=\"{&quot;_animation&quot;:&quot;fadeInUp&quot;}\" data-widget_type=\"heading.default\">\n<div class=\"elementor-widget-container\" style=\"box-sizing: border-box; transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s, transform 0.4s; height: 27.9937px;\">\n<h2 class=\"elementor-heading-title elementor-size-default\" style=\"box-sizing: border-box; border: 0px; font-size: 24px; font-style: inherit; font-weight: bold; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: #333842; line-height: 28px; font-family: Roboto, sans-serif;\">4. DATA COLLECTION</h2>\n</div>\n</div>\n<div class=\"elementor-element elementor-element-42cd115 elementor-widget elementor-widget-text-editor animated fadeInUp\" style=\"box-sizing: border-box; --flex-direction: initial; --flex-wrap: initial; --justify-content: initial; --align-items: initial; --align-content: initial; --gap: initial; --flex-basis: initial; --flex-grow: initial; --flex-shrink: initial; --order: initial; --align-self: initial; flex: 0 1 auto; order: 0; align-self: auto; flex-flow: row; place-content: normal; align-items: normal; gap: normal; position: relative; animation-duration: 1.25s; --swiper-theme-color: #000; --swiper-navigation-size: 44px; --swiper-pagination-bullet-size: 6px; --swiper-pagination-bullet-horizontal-gap: 6px; --widgets-spacing: 20px 20px; color: #58595b; font-family: Montserrat, sans-serif; font-weight: 500; animation-name: fadeInUp; margin-bottom: 20px; min-width: 0px; margin-block-end: 0px; font-size: 18px; line-height: 27px; max-width: 100%; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\" data-id=\"42cd115\" data-element_type=\"widget\" data-settings=\"{&quot;_animation&quot;:&quot;fadeInUp&quot;,&quot;_animation_delay&quot;:100}\" data-widget_type=\"text-editor.default\">\n<div class=\"elementor-widget-container\" style=\"box-sizing: border-box; transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s, transform 0.4s; height: 893.981px; margin: 0px 0px -15px;\">\n<p style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: inherit; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline;\"><span style=\"box-sizing: border-box; font-weight: 400;\">I. We collect Data which you provide us, inter alia, in scenarios such as-</span></p>\n<ol style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: inherit; margin: 0px 0px 1.5em 3em; outline: 0px; padding: 0px; vertical-align: baseline; list-style: lower-alpha;\">\n<li style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: inherit; margin: 0px 0px 10px; outline: 0px; padding: 0px; vertical-align: baseline;\"><span style=\"box-sizing: border-box; font-weight: 400;\">You voluntarily provide to Adonis when you express an interest in our services by submitting any information as may be requested on the Website.</span></li>\n<li style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: inherit; margin: 0px 0px 10px; outline: 0px; padding: 0px; vertical-align: baseline;\"><span style=\"box-sizing: border-box; font-weight: 400;\">Responding to a survey, conducted by us.</span></li>\n<li style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: inherit; margin: 0px 0px 10px; outline: 0px; padding: 0px; vertical-align: baseline;\"><span style=\"box-sizing: border-box; font-weight: 400;\">Registering for any events displayed on our Website.</span></li>\n<li style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: inherit; margin: 0px 0px 10px; outline: 0px; padding: 0px; vertical-align: baseline;\"><span style=\"box-sizing: border-box; font-weight: 400;\">Requesting information about our product or use of our services or request for customer support etc.</span></li>\n</ol>\n<p style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: inherit; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline;\"><span style=\"box-sizing: border-box; font-weight: 400;\">II. We do not track, collect or store any information automatically which includes IP address, browser type, browser cookies, location and device information.</span></p>\n<p style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: inherit; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline;\"><span style=\"box-sizing: border-box; font-weight: 400;\">III. We may ask you to provide your Data relevant to the scenarios such as your name, address, zip code, phone number, and email address, and collect your IP address, location data, information about your device, etc. Not all of the Data holds about you, will always come directly from you. It may, for example, come from your employer or other organizations to which you belong or through our retail network and preferred partners. However, Adonis collects Data about you when you interact with this Website and/or utilize products or services offered on this Website. iii) We keep your Data/information for as long as necessary to fulfill the purposes outlined in this Policy unless otherwise required by law.</span></p>\n<p style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: inherit; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline;\"><span style=\"box-sizing: border-box; font-size: 16px; font-weight: 400;\">IV. We collect Data when the Data is given to us by you.</span></p>\n<p style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: inherit; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline;\"><span style=\"box-sizing: border-box; font-size: 16px; font-weight: 400;\">V. We do not automatically capture any specific personal information from you, (like your name, phone number or e-mail address), that allows us to identify you individually. If the Website requests you to provide personal information, you will be informed of the particular purposes for which the information is gathered and adequate security measures will be taken to protect your personal information.</span></p>\n<p style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: inherit; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline;\"><span style=\"box-sizing: border-box; font-weight: 400;\">VI. Any of your information/data available in the public domain shall not be protected under the purview of this Policy and Adonis shall not be held liable for any such disclosures.</span></p>\n<p style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: inherit; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline;\"><span style=\"box-sizing: border-box; font-weight: 400;\">VII. By providing us with your Data or the Data pertaining to your relatives, friends or any other third parties, you give us your voluntary and unambiguous consent and also confirm and guarantee that you have received a similar voluntary and unambiguous consent from such of your relatives, friends or third parties for the processing of such Data by Adonis , as per the terms set out in this Policy.</span></p>\n</div>\n</div>\n<div class=\"elementor-element elementor-element-5f383d0 elementor-widget elementor-widget-heading animated fadeInUp\" style=\"box-sizing: border-box; --flex-direction: initial; --flex-wrap: initial; --justify-content: initial; --align-items: initial; --align-content: initial; --gap: initial; --flex-basis: initial; --flex-grow: initial; --flex-shrink: initial; --order: initial; --align-self: initial; flex: 0 1 auto; order: 0; align-self: auto; flex-flow: row; place-content: normal; align-items: normal; gap: normal; position: relative; animation-duration: 1.25s; --swiper-theme-color: #000; --swiper-navigation-size: 44px; --swiper-pagination-bullet-size: 6px; --swiper-pagination-bullet-horizontal-gap: 6px; --widgets-spacing: 20px 20px; animation-name: fadeInUp; margin-bottom: 20px; min-width: 0px; margin-block-end: 0px; max-width: 100%; color: #334155; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen-Sans, Ubuntu, Cantarell, \'Helvetica Neue\', sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\" data-id=\"5f383d0\" data-element_type=\"widget\" data-settings=\"{&quot;_animation&quot;:&quot;fadeInUp&quot;}\" data-widget_type=\"heading.default\">\n<div class=\"elementor-widget-container\" style=\"box-sizing: border-box; transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s, transform 0.4s; height: 27.9937px;\">\n<h2 class=\"elementor-heading-title elementor-size-default\" style=\"box-sizing: border-box; border: 0px; font-size: 24px; font-style: inherit; font-weight: bold; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: #333842; line-height: 28px; font-family: Roboto, sans-serif;\">5. DATA USAGE</h2>\n</div>\n</div>\n<div class=\"elementor-element elementor-element-3be9c00 elementor-widget elementor-widget-text-editor animated fadeInUp\" style=\"box-sizing: border-box; --flex-direction: initial; --flex-wrap: initial; --justify-content: initial; --align-items: initial; --align-content: initial; --gap: initial; --flex-basis: initial; --flex-grow: initial; --flex-shrink: initial; --order: initial; --align-self: initial; flex: 0 1 auto; order: 0; align-self: auto; flex-flow: row; place-content: normal; align-items: normal; gap: normal; position: relative; animation-duration: 1.25s; --swiper-theme-color: #000; --swiper-navigation-size: 44px; --swiper-pagination-bullet-size: 6px; --swiper-pagination-bullet-horizontal-gap: 6px; --widgets-spacing: 20px 20px; color: #58595b; font-family: Montserrat, sans-serif; font-weight: 500; animation-name: fadeInUp; margin-bottom: 20px; min-width: 0px; margin-block-end: 0px; font-size: 18px; line-height: 27px; max-width: 100%; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\" data-id=\"3be9c00\" data-element_type=\"widget\" data-settings=\"{&quot;_animation&quot;:&quot;fadeInUp&quot;,&quot;_animation_delay&quot;:100}\" data-widget_type=\"text-editor.default\">\n<div class=\"elementor-widget-container\" style=\"box-sizing: border-box; transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s, transform 0.4s; height: 341.475px; margin: 0px 0px -15px;\">\n<p style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: inherit; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline;\"><span style=\"box-sizing: border-box; font-weight: 400;\">By entering your User Information, you accept that Adonis may retain your Data and that it may be held by Adonis. We, shall be entitled to use your Data/ personal Information for the following purposes:</span></p>\n<ol style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: inherit; margin: 0px 0px 1.5em 3em; outline: 0px; padding: 0px; vertical-align: baseline; list-style: lower-alpha;\">\n<li style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: 400; margin: 0px 0px 10px; outline: 0px; padding: 0px; vertical-align: baseline;\" aria-level=\"1\"><span style=\"box-sizing: border-box; font-weight: 400;\">Provide and communicate with you about feedback and follow up on queries submitted to us.</span></li>\n<li style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: 400; margin: 0px 0px 10px; outline: 0px; padding: 0px; vertical-align: baseline;\" aria-level=\"1\"><span style=\"box-sizing: border-box; font-weight: 400;\">Fulfill your requests regarding the services, including without limitation responding to your inquiries, and communicating with you about our products or services that we believe may be of interest to you.</span></li>\n<li style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: 400; margin: 0px 0px 10px; outline: 0px; padding: 0px; vertical-align: baseline;\" aria-level=\"1\"><span style=\"box-sizing: border-box; font-weight: 400;\">Enforce the legal terms (including without limitation our policies and terms of service) that govern your use of our Services, and/or for the purposes for which you provided the Information,</span></li>\n<li style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: 400; margin: 0px 0px 10px; outline: 0px; padding: 0px; vertical-align: baseline;\" aria-level=\"1\"><span style=\"box-sizing: border-box; font-weight: 400;\">Prevent fraud or potentially illegal activities (including, without limitation, copyright infringement) on or through Our Website or Services,</span></li>\n<li style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: 400; margin: 0px 0px 10px; outline: 0px; padding: 0px; vertical-align: baseline;\" aria-level=\"1\"><span style=\"box-sizing: border-box; font-weight: 400;\">In order to enable Adonis to comply with any requirements imposed on Adonis by law.</span></li>\n</ol>\n</div>\n</div>\n<div class=\"elementor-element elementor-element-a124113 elementor-widget elementor-widget-heading animated fadeInUp\" style=\"box-sizing: border-box; --flex-direction: initial; --flex-wrap: initial; --justify-content: initial; --align-items: initial; --align-content: initial; --gap: initial; --flex-basis: initial; --flex-grow: initial; --flex-shrink: initial; --order: initial; --align-self: initial; flex: 0 1 auto; order: 0; align-self: auto; flex-flow: row; place-content: normal; align-items: normal; gap: normal; position: relative; animation-duration: 1.25s; --swiper-theme-color: #000; --swiper-navigation-size: 44px; --swiper-pagination-bullet-size: 6px; --swiper-pagination-bullet-horizontal-gap: 6px; --widgets-spacing: 20px 20px; animation-name: fadeInUp; margin-bottom: 20px; min-width: 0px; margin-block-end: 0px; max-width: 100%; color: #334155; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen-Sans, Ubuntu, Cantarell, \'Helvetica Neue\', sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\" data-id=\"a124113\" data-element_type=\"widget\" data-settings=\"{&quot;_animation&quot;:&quot;fadeInUp&quot;}\" data-widget_type=\"heading.default\">\n<div class=\"elementor-widget-container\" style=\"box-sizing: border-box; transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s, transform 0.4s; height: 27.9937px;\">\n<h2 class=\"elementor-heading-title elementor-size-default\" style=\"box-sizing: border-box; border: 0px; font-size: 24px; font-style: inherit; font-weight: bold; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: #333842; line-height: 28px; font-family: Roboto, sans-serif;\">6. DATA SHARING &amp; DISCLOSURE</h2>\n</div>\n</div>\n<div class=\"elementor-element elementor-element-a80a6ea elementor-widget elementor-widget-text-editor animated fadeInUp\" style=\"box-sizing: border-box; --flex-direction: initial; --flex-wrap: initial; --justify-content: initial; --align-items: initial; --align-content: initial; --gap: initial; --flex-basis: initial; --flex-grow: initial; --flex-shrink: initial; --order: initial; --align-self: initial; flex: 0 1 auto; order: 0; align-self: auto; flex-flow: row; place-content: normal; align-items: normal; gap: normal; position: relative; animation-duration: 1.25s; --swiper-theme-color: #000; --swiper-navigation-size: 44px; --swiper-pagination-bullet-size: 6px; --swiper-pagination-bullet-horizontal-gap: 6px; --widgets-spacing: 20px 20px; color: #58595b; font-family: Montserrat, sans-serif; font-weight: 500; animation-name: fadeInUp; margin-bottom: 20px; min-width: 0px; margin-block-end: 0px; font-size: 18px; line-height: 27px; max-width: 100%; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\" data-id=\"a80a6ea\" data-element_type=\"widget\" data-settings=\"{&quot;_animation&quot;:&quot;fadeInUp&quot;,&quot;_animation_delay&quot;:100}\" data-widget_type=\"text-editor.default\">\n<div class=\"elementor-widget-container\" style=\"box-sizing: border-box; transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s, transform 0.4s; height: 352.987px; margin: 0px 0px -15px;\">\n<p style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: inherit; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline;\"><span style=\"box-sizing: border-box; font-weight: 400;\">We may share your Data with:</span></p>\n<ol style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: inherit; margin: 0px 0px 1.5em 3em; outline: 0px; padding: 0px; vertical-align: baseline; list-style: lower-alpha;\">\n<li style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: 400; margin: 0px 0px 10px; outline: 0px; padding: 0px; vertical-align: baseline;\" aria-level=\"1\"><span style=\"box-sizing: border-box; font-weight: 400;\">Affiliates/associates/subsidiaries/holding and or parent company and other entities within the Refex Group of companies, to assist them in reaching out to you in relation to their programs or campaigns (including marketing and sales) and to process your query / requests;</span></li>\n<li style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: 400; margin: 0px 0px 10px; outline: 0px; padding: 0px; vertical-align: baseline;\" aria-level=\"1\"><span style=\"box-sizing: border-box; font-weight: 400;\">Our employees, service providers, business partners, and subcontractors, consultants/advisors working on our behalf for the purposes described in this Policy; and</span></li>\n</ol>\n<p style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: inherit; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline;\"><span style=\"box-sizing: border-box; font-weight: 400;\">We usually do not share other personal data collected from the Website with other third parties.&nbsp; However, this may happen if:</span></p>\n<ol style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: inherit; margin: 0px 0px 1.5em 3em; outline: 0px; padding: 0px; vertical-align: baseline; list-style: lower-alpha;\">\n<li style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: 400; margin: 0px 0px 10px; outline: 0px; padding: 0px; vertical-align: baseline;\" aria-level=\"1\"><span style=\"box-sizing: border-box; font-weight: 400;\">You request or authorize us to do so;</span></li>\n<li style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: 400; margin: 0px 0px 10px; outline: 0px; padding: 0px; vertical-align: baseline;\" aria-level=\"1\"><span style=\"box-sizing: border-box; font-weight: 400;\">We need to comply with applicable law or respond to valid legal processes.</span></li>\n</ol>\n</div>\n</div>\n<div class=\"elementor-element elementor-element-761a301 elementor-widget elementor-widget-heading animated fadeInUp\" style=\"box-sizing: border-box; --flex-direction: initial; --flex-wrap: initial; --justify-content: initial; --align-items: initial; --align-content: initial; --gap: initial; --flex-basis: initial; --flex-grow: initial; --flex-shrink: initial; --order: initial; --align-self: initial; flex: 0 1 auto; order: 0; align-self: auto; flex-flow: row; place-content: normal; align-items: normal; gap: normal; position: relative; animation-duration: 1.25s; --swiper-theme-color: #000; --swiper-navigation-size: 44px; --swiper-pagination-bullet-size: 6px; --swiper-pagination-bullet-horizontal-gap: 6px; --widgets-spacing: 20px 20px; animation-name: fadeInUp; margin-bottom: 20px; min-width: 0px; margin-block-end: 0px; max-width: 100%; color: #334155; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen-Sans, Ubuntu, Cantarell, \'Helvetica Neue\', sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\" data-id=\"761a301\" data-element_type=\"widget\" data-settings=\"{&quot;_animation&quot;:&quot;fadeInUp&quot;}\" data-widget_type=\"heading.default\">\n<div class=\"elementor-widget-container\" style=\"box-sizing: border-box; transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s, transform 0.4s; height: 27.9937px;\">\n<h2 class=\"elementor-heading-title elementor-size-default\" style=\"box-sizing: border-box; border: 0px; font-size: 24px; font-style: inherit; font-weight: bold; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: #333842; line-height: 28px; font-family: Roboto, sans-serif;\">7. DATA SAFETY</h2>\n</div>\n</div>\n<div class=\"elementor-element elementor-element-6a44cf6 elementor-widget elementor-widget-text-editor animated fadeInUp\" style=\"box-sizing: border-box; --flex-direction: initial; --flex-wrap: initial; --justify-content: initial; --align-items: initial; --align-content: initial; --gap: initial; --flex-basis: initial; --flex-grow: initial; --flex-shrink: initial; --order: initial; --align-self: initial; flex: 0 1 auto; order: 0; align-self: auto; flex-flow: row; place-content: normal; align-items: normal; gap: normal; position: relative; animation-duration: 1.25s; --swiper-theme-color: #000; --swiper-navigation-size: 44px; --swiper-pagination-bullet-size: 6px; --swiper-pagination-bullet-horizontal-gap: 6px; --widgets-spacing: 20px 20px; color: #58595b; font-family: Montserrat, sans-serif; font-weight: 500; animation-name: fadeInUp; margin-bottom: 20px; min-width: 0px; margin-block-end: 0px; font-size: 18px; line-height: 27px; max-width: 100%; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\" data-id=\"6a44cf6\" data-element_type=\"widget\" data-settings=\"{&quot;_animation&quot;:&quot;fadeInUp&quot;,&quot;_animation_delay&quot;:100}\" data-widget_type=\"text-editor.default\">\n<div class=\"elementor-widget-container\" style=\"box-sizing: border-box; transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s, transform 0.4s; height: 135px;\"><span style=\"box-sizing: border-box; font-weight: 400;\">We are committed to your privacy and security, we have implemented appropriate technical and organizational security measures to attempt to safeguard and help prevent unauthorized access, maintain data security and correctly use the information we collect online through the Website. You agree that no security measures are perfect or impenetrable and we cannot ensure or warrant the security of any information you transmit or provide to us through the Website and we shall not be held liable for any unveiling or disclosure of Data.</span></div>\n</div>\n<div class=\"elementor-element elementor-element-42021d6 elementor-widget elementor-widget-heading animated fadeInUp\" style=\"box-sizing: border-box; --flex-direction: initial; --flex-wrap: initial; --justify-content: initial; --align-items: initial; --align-content: initial; --gap: initial; --flex-basis: initial; --flex-grow: initial; --flex-shrink: initial; --order: initial; --align-self: initial; flex: 0 1 auto; order: 0; align-self: auto; flex-flow: row; place-content: normal; align-items: normal; gap: normal; position: relative; animation-duration: 1.25s; --swiper-theme-color: #000; --swiper-navigation-size: 44px; --swiper-pagination-bullet-size: 6px; --swiper-pagination-bullet-horizontal-gap: 6px; --widgets-spacing: 20px 20px; animation-name: fadeInUp; margin-bottom: 20px; min-width: 0px; margin-block-end: 0px; max-width: 100%; color: #334155; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen-Sans, Ubuntu, Cantarell, \'Helvetica Neue\', sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\" data-id=\"42021d6\" data-element_type=\"widget\" data-settings=\"{&quot;_animation&quot;:&quot;fadeInUp&quot;}\" data-widget_type=\"heading.default\">\n<div class=\"elementor-widget-container\" style=\"box-sizing: border-box; transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s, transform 0.4s; height: 27.9937px;\">\n<h2 class=\"elementor-heading-title elementor-size-default\" style=\"box-sizing: border-box; border: 0px; font-size: 24px; font-style: inherit; font-weight: bold; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: #333842; line-height: 28px; font-family: Roboto, sans-serif;\">8. INTELLECTUAL PROPERTY RIGHTS</h2>\n</div>\n</div>\n<div class=\"elementor-element elementor-element-cccca72 elementor-widget elementor-widget-text-editor animated fadeInUp\" style=\"box-sizing: border-box; --flex-direction: initial; --flex-wrap: initial; --justify-content: initial; --align-items: initial; --align-content: initial; --gap: initial; --flex-basis: initial; --flex-grow: initial; --flex-shrink: initial; --order: initial; --align-self: initial; flex: 0 1 auto; order: 0; align-self: auto; flex-flow: row; place-content: normal; align-items: normal; gap: normal; position: relative; animation-duration: 1.25s; --swiper-theme-color: #000; --swiper-navigation-size: 44px; --swiper-pagination-bullet-size: 6px; --swiper-pagination-bullet-horizontal-gap: 6px; --widgets-spacing: 20px 20px; color: #58595b; font-family: Montserrat, sans-serif; font-weight: 500; animation-name: fadeInUp; margin-bottom: 20px; min-width: 0px; margin-block-end: 0px; font-size: 18px; line-height: 27px; max-width: 100%; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\" data-id=\"cccca72\" data-element_type=\"widget\" data-settings=\"{&quot;_animation&quot;:&quot;fadeInUp&quot;,&quot;_animation_delay&quot;:100}\" data-widget_type=\"text-editor.default\">\n<div class=\"elementor-widget-container\" style=\"box-sizing: border-box; transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s, transform 0.4s; height: 135px;\"><span style=\"box-sizing: border-box; font-weight: 400;\">This Policy does not transfer from Adonis to you any of Adonis&rsquo;s or any third-party intellectual property, and all rights, title, and interest in and to such property will remain (as between the parties) solely with Adonis. All trademarks, service marks, graphics and logos used in connection with our Website or services, are trademarks or registered trademarks of Adonis. Other trademarks, service marks, graphics and logos used in connection with our Website may be the trademarks of other third parties. Your use of our Website grants you no right or license to reproduce or otherwise use any Adonis&rsquo;s or third-party trademarks.</span></div>\n</div>\n<div class=\"elementor-element elementor-element-a6d05f0 elementor-widget elementor-widget-heading animated fadeInUp\" style=\"box-sizing: border-box; --flex-direction: initial; --flex-wrap: initial; --justify-content: initial; --align-items: initial; --align-content: initial; --gap: initial; --flex-basis: initial; --flex-grow: initial; --flex-shrink: initial; --order: initial; --align-self: initial; flex: 0 1 auto; order: 0; align-self: auto; flex-flow: row; place-content: normal; align-items: normal; gap: normal; position: relative; animation-duration: 1.25s; --swiper-theme-color: #000; --swiper-navigation-size: 44px; --swiper-pagination-bullet-size: 6px; --swiper-pagination-bullet-horizontal-gap: 6px; --widgets-spacing: 20px 20px; animation-name: fadeInUp; margin-bottom: 20px; min-width: 0px; margin-block-end: 0px; max-width: 100%; color: #334155; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen-Sans, Ubuntu, Cantarell, \'Helvetica Neue\', sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\" data-id=\"a6d05f0\" data-element_type=\"widget\" data-settings=\"{&quot;_animation&quot;:&quot;fadeInUp&quot;}\" data-widget_type=\"heading.default\">\n<div class=\"elementor-widget-container\" style=\"box-sizing: border-box; transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s, transform 0.4s; height: 27.9937px;\">\n<h2 class=\"elementor-heading-title elementor-size-default\" style=\"box-sizing: border-box; border: 0px; font-size: 24px; font-style: inherit; font-weight: bold; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: #333842; line-height: 28px; font-family: Roboto, sans-serif;\">9. POLICY CHANGES</h2>\n</div>\n</div>\n<div class=\"elementor-element elementor-element-7e8da4f elementor-widget elementor-widget-text-editor animated fadeInUp\" style=\"box-sizing: border-box; --flex-direction: initial; --flex-wrap: initial; --justify-content: initial; --align-items: initial; --align-content: initial; --gap: initial; --flex-basis: initial; --flex-grow: initial; --flex-shrink: initial; --order: initial; --align-self: initial; flex: 0 1 auto; order: 0; align-self: auto; flex-flow: row; place-content: normal; align-items: normal; gap: normal; position: relative; animation-duration: 1.25s; --swiper-theme-color: #000; --swiper-navigation-size: 44px; --swiper-pagination-bullet-size: 6px; --swiper-pagination-bullet-horizontal-gap: 6px; --widgets-spacing: 20px 20px; color: #58595b; font-family: Montserrat, sans-serif; font-weight: 500; animation-name: fadeInUp; margin-bottom: 20px; min-width: 0px; margin-block-end: 0px; font-size: 18px; line-height: 27px; max-width: 100%; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\" data-id=\"7e8da4f\" data-element_type=\"widget\" data-settings=\"{&quot;_animation&quot;:&quot;fadeInUp&quot;,&quot;_animation_delay&quot;:100}\" data-widget_type=\"text-editor.default\">\n<div class=\"elementor-widget-container\" style=\"box-sizing: border-box; transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s, transform 0.4s; height: 225px; margin: 0px 0px -15px;\">\n<p style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: inherit; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline;\"><span style=\"box-sizing: border-box; font-weight: 400;\">Adonis reserves the right to change this policy. When any changes are made to the Policy, we will post the current version on our Website. We encourage you to periodically review this Policy so that you will be aware of our updated privacy practices.</span></p>\n<p style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: inherit; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline;\"><span style=\"box-sizing: border-box; font-weight: 400;\">Your continued use of the Website after these modifications will constitute your:<br style=\"box-sizing: border-box;\"><br style=\"box-sizing: border-box;\">(a) acknowledgment of the modified Policy; and</span></p>\n<p style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: inherit; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline;\"><span style=\"box-sizing: border-box; font-weight: 400;\">(b) agreement to abide and be bound by the Policy.</span></p>\n</div>\n</div>\n<div class=\"elementor-element elementor-element-644a5a0 elementor-widget elementor-widget-heading animated fadeInUp\" style=\"box-sizing: border-box; --flex-direction: initial; --flex-wrap: initial; --justify-content: initial; --align-items: initial; --align-content: initial; --gap: initial; --flex-basis: initial; --flex-grow: initial; --flex-shrink: initial; --order: initial; --align-self: initial; flex: 0 1 auto; order: 0; align-self: auto; flex-flow: row; place-content: normal; align-items: normal; gap: normal; position: relative; animation-duration: 1.25s; --swiper-theme-color: #000; --swiper-navigation-size: 44px; --swiper-pagination-bullet-size: 6px; --swiper-pagination-bullet-horizontal-gap: 6px; --widgets-spacing: 20px 20px; animation-name: fadeInUp; margin-bottom: 20px; min-width: 0px; margin-block-end: 0px; max-width: 100%; color: #334155; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen-Sans, Ubuntu, Cantarell, \'Helvetica Neue\', sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\" data-id=\"644a5a0\" data-element_type=\"widget\" data-settings=\"{&quot;_animation&quot;:&quot;fadeInUp&quot;}\" data-widget_type=\"heading.default\">\n<div class=\"elementor-widget-container\" style=\"box-sizing: border-box; transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s, transform 0.4s; height: 27.9937px;\">\n<h2 class=\"elementor-heading-title elementor-size-default\" style=\"box-sizing: border-box; border: 0px; font-size: 24px; font-style: inherit; font-weight: bold; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: #333842; line-height: 28px; font-family: Roboto, sans-serif;\">10. ACCEPTANCE OF THE POLICY</h2>\n</div>\n</div>\n<div class=\"elementor-element elementor-element-e986012 elementor-widget elementor-widget-text-editor animated fadeInUp\" style=\"box-sizing: border-box; --flex-direction: initial; --flex-wrap: initial; --justify-content: initial; --align-items: initial; --align-content: initial; --gap: initial; --flex-basis: initial; --flex-grow: initial; --flex-shrink: initial; --order: initial; --align-self: initial; flex: 0 1 auto; order: 0; align-self: auto; flex-flow: row; place-content: normal; align-items: normal; gap: normal; position: relative; animation-duration: 1.25s; --swiper-theme-color: #000; --swiper-navigation-size: 44px; --swiper-pagination-bullet-size: 6px; --swiper-pagination-bullet-horizontal-gap: 6px; --widgets-spacing: 20px 20px; color: #58595b; font-family: Montserrat, sans-serif; font-weight: 500; animation-name: fadeInUp; margin-bottom: 20px; min-width: 0px; margin-block-end: 0px; font-size: 18px; line-height: 27px; max-width: 100%; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\" data-id=\"e986012\" data-element_type=\"widget\" data-settings=\"{&quot;_animation&quot;:&quot;fadeInUp&quot;,&quot;_animation_delay&quot;:100}\" data-widget_type=\"text-editor.default\">\n<div class=\"elementor-widget-container\" style=\"box-sizing: border-box; transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s, transform 0.4s; height: 81px;\"><span style=\"box-sizing: border-box; font-weight: 400;\">By visiting our Website, signing up or logging into the Website, and uploading information on our Website; you acknowledge and unconditionally accept the Policy. If you do not agree with this Policy, do not use our Website and services or provide here any of your personal data.</span></div>\n</div>\n<div class=\"elementor-element elementor-element-66492cd elementor-widget elementor-widget-heading animated fadeInUp\" style=\"box-sizing: border-box; --flex-direction: initial; --flex-wrap: initial; --justify-content: initial; --align-items: initial; --align-content: initial; --gap: initial; --flex-basis: initial; --flex-grow: initial; --flex-shrink: initial; --order: initial; --align-self: initial; flex: 0 1 auto; order: 0; align-self: auto; flex-flow: row; place-content: normal; align-items: normal; gap: normal; position: relative; animation-duration: 1.25s; --swiper-theme-color: #000; --swiper-navigation-size: 44px; --swiper-pagination-bullet-size: 6px; --swiper-pagination-bullet-horizontal-gap: 6px; --widgets-spacing: 20px 20px; animation-name: fadeInUp; margin-bottom: 20px; min-width: 0px; margin-block-end: 0px; max-width: 100%; color: #334155; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen-Sans, Ubuntu, Cantarell, \'Helvetica Neue\', sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\" data-id=\"66492cd\" data-element_type=\"widget\" data-settings=\"{&quot;_animation&quot;:&quot;fadeInUp&quot;}\" data-widget_type=\"heading.default\">\n<div class=\"elementor-widget-container\" style=\"box-sizing: border-box; transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s, transform 0.4s; height: 27.9937px;\">\n<h2 class=\"elementor-heading-title elementor-size-default\" style=\"box-sizing: border-box; border: 0px; font-size: 24px; font-style: inherit; font-weight: bold; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: #333842; line-height: 28px; font-family: Roboto, sans-serif;\">11. RETENTION OF DATA</h2>\n</div>\n</div>\n<div class=\"elementor-element elementor-element-8de926a elementor-widget elementor-widget-text-editor animated fadeInUp\" style=\"box-sizing: border-box; --flex-direction: initial; --flex-wrap: initial; --justify-content: initial; --align-items: initial; --align-content: initial; --gap: initial; --flex-basis: initial; --flex-grow: initial; --flex-shrink: initial; --order: initial; --align-self: initial; flex: 0 1 auto; order: 0; align-self: auto; flex-flow: row; place-content: normal; align-items: normal; gap: normal; position: relative; animation-duration: 1.25s; --swiper-theme-color: #000; --swiper-navigation-size: 44px; --swiper-pagination-bullet-size: 6px; --swiper-pagination-bullet-horizontal-gap: 6px; --widgets-spacing: 20px 20px; color: #58595b; font-family: Montserrat, sans-serif; font-weight: 500; animation-name: fadeInUp; margin-bottom: 20px; min-width: 0px; margin-block-end: 0px; font-size: 18px; line-height: 27px; max-width: 100%; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\" data-id=\"8de926a\" data-element_type=\"widget\" data-settings=\"{&quot;_animation&quot;:&quot;fadeInUp&quot;,&quot;_animation_delay&quot;:100}\" data-widget_type=\"text-editor.default\">\n<div class=\"elementor-widget-container\" style=\"box-sizing: border-box; transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s, transform 0.4s; height: 108px;\"><span style=\"box-sizing: border-box; font-weight: 400;\">Adonis retains Data for as long as necessary to provide the access to and use of the Website, or for other essential purposes such as complying with our legal obligations, resolving disputes and enforcing our agreements. Because these needs can vary for different data types and purposes, actual retention periods can vary significantly. Even if we delete your Data, it may persist on backup or archival media for audit, legal, tax or regulatory purposes.</span></div>\n</div>\n<div class=\"elementor-element elementor-element-4072ac7 elementor-widget elementor-widget-heading animated fadeInUp\" style=\"box-sizing: border-box; --flex-direction: initial; --flex-wrap: initial; --justify-content: initial; --align-items: initial; --align-content: initial; --gap: initial; --flex-basis: initial; --flex-grow: initial; --flex-shrink: initial; --order: initial; --align-self: initial; flex: 0 1 auto; order: 0; align-self: auto; flex-flow: row; place-content: normal; align-items: normal; gap: normal; position: relative; animation-duration: 1.25s; --swiper-theme-color: #000; --swiper-navigation-size: 44px; --swiper-pagination-bullet-size: 6px; --swiper-pagination-bullet-horizontal-gap: 6px; --widgets-spacing: 20px 20px; animation-name: fadeInUp; margin-bottom: 20px; min-width: 0px; margin-block-end: 0px; max-width: 100%; color: #334155; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen-Sans, Ubuntu, Cantarell, \'Helvetica Neue\', sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\" data-id=\"4072ac7\" data-element_type=\"widget\" data-settings=\"{&quot;_animation&quot;:&quot;fadeInUp&quot;}\" data-widget_type=\"heading.default\">\n<div class=\"elementor-widget-container\" style=\"box-sizing: border-box; transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s, transform 0.4s; height: 27.9937px;\">\n<h2 class=\"elementor-heading-title elementor-size-default\" style=\"box-sizing: border-box; border: 0px; font-size: 24px; font-style: inherit; font-weight: bold; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: #333842; line-height: 28px; font-family: Roboto, sans-serif;\">12. LINKS TO OTHER WEBSITES</h2>\n</div>\n</div>\n<div class=\"elementor-element elementor-element-a7dca9f elementor-widget elementor-widget-text-editor animated fadeInUp\" style=\"box-sizing: border-box; --flex-direction: initial; --flex-wrap: initial; --justify-content: initial; --align-items: initial; --align-content: initial; --gap: initial; --flex-basis: initial; --flex-grow: initial; --flex-shrink: initial; --order: initial; --align-self: initial; flex: 0 1 auto; order: 0; align-self: auto; flex-flow: row; place-content: normal; align-items: normal; gap: normal; position: relative; animation-duration: 1.25s; --swiper-theme-color: #000; --swiper-navigation-size: 44px; --swiper-pagination-bullet-size: 6px; --swiper-pagination-bullet-horizontal-gap: 6px; --widgets-spacing: 20px 20px; color: #58595b; font-family: Montserrat, sans-serif; font-weight: 500; animation-name: fadeInUp; margin-bottom: 20px; min-width: 0px; margin-block-end: 0px; font-size: 18px; line-height: 27px; max-width: 100%; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\" data-id=\"a7dca9f\" data-element_type=\"widget\" data-settings=\"{&quot;_animation&quot;:&quot;fadeInUp&quot;,&quot;_animation_delay&quot;:100}\" data-widget_type=\"text-editor.default\">\n<div class=\"elementor-widget-container\" style=\"box-sizing: border-box; transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s, transform 0.4s; height: 81px;\"><span style=\"box-sizing: border-box; font-weight: 400;\">This Website may, from time to time, provide links to other websites. We have no control over such websites and are not responsible for the content of these websites. This Policy does not extend to your use of such websites. You are advised to read the privacy policy or statements of other websites prior to using them.</span></div>\n</div>\n<div class=\"elementor-element elementor-element-4522a58 elementor-widget elementor-widget-heading animated fadeInUp\" style=\"box-sizing: border-box; --flex-direction: initial; --flex-wrap: initial; --justify-content: initial; --align-items: initial; --align-content: initial; --gap: initial; --flex-basis: initial; --flex-grow: initial; --flex-shrink: initial; --order: initial; --align-self: initial; flex: 0 1 auto; order: 0; align-self: auto; flex-flow: row; place-content: normal; align-items: normal; gap: normal; position: relative; animation-duration: 1.25s; --swiper-theme-color: #000; --swiper-navigation-size: 44px; --swiper-pagination-bullet-size: 6px; --swiper-pagination-bullet-horizontal-gap: 6px; --widgets-spacing: 20px 20px; animation-name: fadeInUp; margin-bottom: 20px; min-width: 0px; margin-block-end: 0px; max-width: 100%; color: #334155; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen-Sans, Ubuntu, Cantarell, \'Helvetica Neue\', sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\" data-id=\"4522a58\" data-element_type=\"widget\" data-settings=\"{&quot;_animation&quot;:&quot;fadeInUp&quot;}\" data-widget_type=\"heading.default\">\n<div class=\"elementor-widget-container\" style=\"box-sizing: border-box; transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s, transform 0.4s; height: 27.9937px;\">\n<h2 class=\"elementor-heading-title elementor-size-default\" style=\"box-sizing: border-box; border: 0px; font-size: 24px; font-style: inherit; font-weight: bold; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: #333842; line-height: 28px; font-family: Roboto, sans-serif;\">13. GENERAL</h2>\n</div>\n</div>\n<div class=\"elementor-element elementor-element-942ba49 elementor-widget elementor-widget-text-editor animated fadeInUp\" style=\"box-sizing: border-box; --flex-direction: initial; --flex-wrap: initial; --justify-content: initial; --align-items: initial; --align-content: initial; --gap: initial; --flex-basis: initial; --flex-grow: initial; --flex-shrink: initial; --order: initial; --align-self: initial; flex: 0 1 auto; order: 0; align-self: auto; flex-flow: row; place-content: normal; align-items: normal; gap: normal; position: relative; animation-duration: 1.25s; --swiper-theme-color: #000; --swiper-navigation-size: 44px; --swiper-pagination-bullet-size: 6px; --swiper-pagination-bullet-horizontal-gap: 6px; --widgets-spacing: 20px 20px; color: #58595b; font-family: Montserrat, sans-serif; font-weight: 500; animation-name: fadeInUp; margin-bottom: 20px; min-width: 0px; margin-block-end: 0px; font-size: 18px; line-height: 27px; max-width: 100%; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\" data-id=\"942ba49\" data-element_type=\"widget\" data-settings=\"{&quot;_animation&quot;:&quot;fadeInUp&quot;,&quot;_animation_delay&quot;:100}\" data-widget_type=\"text-editor.default\">\n<div class=\"elementor-widget-container\" style=\"box-sizing: border-box; transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s, transform 0.4s; height: 81px;\"><span style=\"box-sizing: border-box; font-weight: 400;\">If any court or competent authority finds that any provision of this Policy (or part of any provision) is invalid, illegal or unenforceable, that provision or part-provision will, to the extent required, be deemed to be deleted, and the validity and enforceability of the other provisions of this Policy will not be affected.</span></div>\n</div>\n<div class=\"elementor-element elementor-element-5ee4c9d elementor-widget elementor-widget-heading animated fadeInUp\" style=\"box-sizing: border-box; --flex-direction: initial; --flex-wrap: initial; --justify-content: initial; --align-items: initial; --align-content: initial; --gap: initial; --flex-basis: initial; --flex-grow: initial; --flex-shrink: initial; --order: initial; --align-self: initial; flex: 0 1 auto; order: 0; align-self: auto; flex-flow: row; place-content: normal; align-items: normal; gap: normal; position: relative; animation-duration: 1.25s; --swiper-theme-color: #000; --swiper-navigation-size: 44px; --swiper-pagination-bullet-size: 6px; --swiper-pagination-bullet-horizontal-gap: 6px; --widgets-spacing: 20px 20px; animation-name: fadeInUp; margin-bottom: 20px; min-width: 0px; margin-block-end: 0px; max-width: 100%; color: #334155; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen-Sans, Ubuntu, Cantarell, \'Helvetica Neue\', sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\" data-id=\"5ee4c9d\" data-element_type=\"widget\" data-settings=\"{&quot;_animation&quot;:&quot;fadeInUp&quot;}\" data-widget_type=\"heading.default\">\n<div class=\"elementor-widget-container\" style=\"box-sizing: border-box; transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s, transform 0.4s; height: 27.9937px;\">\n<h2 class=\"elementor-heading-title elementor-size-default\" style=\"box-sizing: border-box; border: 0px; font-size: 24px; font-style: inherit; font-weight: bold; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: #333842; line-height: 28px; font-family: Roboto, sans-serif;\">14. GOVERNING LAW AND JURISDICTION</h2>\n</div>\n</div>\n<div class=\"elementor-element elementor-element-2283cf6 elementor-widget elementor-widget-text-editor animated fadeInUp\" style=\"box-sizing: border-box; --flex-direction: initial; --flex-wrap: initial; --justify-content: initial; --align-items: initial; --align-content: initial; --gap: initial; --flex-basis: initial; --flex-grow: initial; --flex-shrink: initial; --order: initial; --align-self: initial; flex: 0 1 auto; order: 0; align-self: auto; flex-flow: row; place-content: normal; align-items: normal; gap: normal; position: relative; animation-duration: 1.25s; --swiper-theme-color: #000; --swiper-navigation-size: 44px; --swiper-pagination-bullet-size: 6px; --swiper-pagination-bullet-horizontal-gap: 6px; --widgets-spacing: 20px 20px; color: #58595b; font-family: Montserrat, sans-serif; font-weight: 500; animation-name: fadeInUp; margin-bottom: 20px; min-width: 0px; margin-block-end: 0px; font-size: 18px; line-height: 27px; max-width: 100%; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\" data-id=\"2283cf6\" data-element_type=\"widget\" data-settings=\"{&quot;_animation&quot;:&quot;fadeInUp&quot;,&quot;_animation_delay&quot;:100}\" data-widget_type=\"text-editor.default\">\n<div class=\"elementor-widget-container\" style=\"box-sizing: border-box; transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s, transform 0.4s; height: 54px;\"><span style=\"box-sizing: border-box; font-weight: 400;\">The Policy shall be governed by the laws of India and the Courts in Chennai shall have the exclusive jurisdiction to try any dispute arising thereof.</span></div>\n</div>\n<div class=\"elementor-element elementor-element-9993c9f elementor-widget elementor-widget-heading animated fadeInUp\" style=\"box-sizing: border-box; --flex-direction: initial; --flex-wrap: initial; --justify-content: initial; --align-items: initial; --align-content: initial; --gap: initial; --flex-basis: initial; --flex-grow: initial; --flex-shrink: initial; --order: initial; --align-self: initial; flex: 0 1 auto; order: 0; align-self: auto; flex-flow: row; place-content: normal; align-items: normal; gap: normal; position: relative; animation-duration: 1.25s; --swiper-theme-color: #000; --swiper-navigation-size: 44px; --swiper-pagination-bullet-size: 6px; --swiper-pagination-bullet-horizontal-gap: 6px; --widgets-spacing: 20px 20px; animation-name: fadeInUp; margin-bottom: 20px; min-width: 0px; margin-block-end: 0px; max-width: 100%; color: #334155; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen-Sans, Ubuntu, Cantarell, \'Helvetica Neue\', sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\" data-id=\"9993c9f\" data-element_type=\"widget\" data-settings=\"{&quot;_animation&quot;:&quot;fadeInUp&quot;}\" data-widget_type=\"heading.default\">\n<div class=\"elementor-widget-container\" style=\"box-sizing: border-box; transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s, transform 0.4s; height: 27.9937px;\">\n<h2 class=\"elementor-heading-title elementor-size-default\" style=\"box-sizing: border-box; border: 0px; font-size: 24px; font-style: inherit; font-weight: bold; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: #333842; line-height: 28px; font-family: Roboto, sans-serif;\">15. QUESTIONS/ CONTACT INFORMATION</h2>\n</div>\n</div>\n<div class=\"elementor-element elementor-element-9cd6d0f elementor-widget elementor-widget-text-editor animated fadeInUp\" style=\"box-sizing: border-box; --flex-direction: initial; --flex-wrap: initial; --justify-content: initial; --align-items: initial; --align-content: initial; --gap: initial; --flex-basis: initial; --flex-grow: initial; --flex-shrink: initial; --order: initial; --align-self: initial; flex: 0 1 auto; order: 0; align-self: auto; flex-flow: row; place-content: normal; align-items: normal; gap: normal; position: relative; animation-duration: 1.25s; --swiper-theme-color: #000; --swiper-navigation-size: 44px; --swiper-pagination-bullet-size: 6px; --swiper-pagination-bullet-horizontal-gap: 6px; --widgets-spacing: 20px 20px; color: #58595b; font-family: Montserrat, sans-serif; font-weight: 500; animation-name: fadeInUp; min-width: 0px; margin-block-end: 0px; font-size: 18px; line-height: 27px; max-width: 100%; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\" data-id=\"9cd6d0f\" data-element_type=\"widget\" data-settings=\"{&quot;_animation&quot;:&quot;fadeInUp&quot;,&quot;_animation_delay&quot;:100}\" data-widget_type=\"text-editor.default\">\n<div class=\"elementor-widget-container\" style=\"box-sizing: border-box; transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s, transform 0.4s; height: 27px;\">\n<p style=\"box-sizing: border-box; border: 0px; font-size: 18px; font-style: inherit; font-weight: inherit; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline;\"><span style=\"box-sizing: border-box; font-weight: 400;\">If you have questions or comments regarding this Policy, please contact us at:&nbsp;</span><a style=\"box-sizing: border-box; background-color: transparent; text-decoration: none; color: #046bd2; transition: 0.2s linear; box-shadow: none;\" href=\"mailto:info@adonismedical.com\"><span style=\"box-sizing: border-box; font-weight: 400;\">info@adonismedical.com</span></a></p>\n</div>\n</div>','2026-01-12 09:10:08','2026-01-16 05:33:29');
/*!40000 ALTER TABLE `privacy_policy_page` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `privacy_policy_paragraphs`
--

DROP TABLE IF EXISTS `privacy_policy_paragraphs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `privacy_policy_paragraphs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `privacy_policy_page_id` int NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_page_order` (`privacy_policy_page_id`,`order_index`),
  CONSTRAINT `privacy_policy_paragraphs_ibfk_1` FOREIGN KEY (`privacy_policy_page_id`) REFERENCES `privacy_policy_page` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privacy_policy_paragraphs`
--

LOCK TABLES `privacy_policy_paragraphs` WRITE;
/*!40000 ALTER TABLE `privacy_policy_paragraphs` DISABLE KEYS */;
INSERT INTO `privacy_policy_paragraphs` VALUES (1,1,'Adonis Medical Systems Private Limited, which shall mean and include its parent company, holding company, subsidiaries, affiliates, associate companies and Refex Group of Companies (\"we\", \"our\", and \"Adonis\") is fully committed to protecting your personal information. The protection of your privacy and personal data is an important concern to which we pay special attention in our business processes. We process your personal data, provided by you voluntarily during visits to our Website, as defined below, in accordance with the applicable laws, rules & regulations of India.',0,'2026-01-12 13:07:10','2026-01-12 13:07:10'),(2,1,'This Privacy Policy (\"Policy\") applies to the main Website \"www.adonismedical.com\". Please note that this Website may include links to the ancillary websites of Adonis and shall include its subsidiaries, affiliates, associate, parent, holding and group companies. Further, this Website may lead/ include links of third parties whose privacy practices differ from those of Adonis. If you provide your personal data to any of those websites, then your data is governed by their privacy policy/statements and not by this Policy. Your privacy is important to us. We take the privacy of your information seriously. This Policy only applies to information collected through this Website and not to any information collected offline.',1,'2026-01-12 13:07:10','2026-01-12 13:07:10'),(3,1,'The core objective of this Policy is to bring to your knowledge the nature of your personal data collected by us, the purpose of collecting such data and its use, the subsequent processing of such data and your rights pertaining to such personal data shared with us. This Policy further sets out your rights pertaining to the protection of your personal data. This Policy describes the information that Adonis collects through this Website, how that information is used, maintained, shared, protected and how you can update it.',2,'2026-01-12 13:07:10','2026-01-12 13:07:10'),(4,1,'We encourage you to read and understand this Policy in connection with the use of our Website.',3,'2026-01-12 13:07:10','2026-01-12 13:07:10'),(5,1,'1. DEFINITIONS\n\nIn this Policy the following definitions are used:\n\n\"Data\" includes information including your personal information that you submit to via the Website and information that is accessed by Adonis pursuant to your visit to the Website except for your information that is or will be in the public domain.\n\n\"Data Protection Laws\" any applicable law relating to the processing of personal Data, including the Information Technology Act, 2000, as amended or substituted;\n\n\"User or you\" the natural person who accesses the Website\n\n\"Website\" is the website that you are currently using, www.adonismedical.com, and any sub-domains of this site, unless excluded by their own terms.',4,'2026-01-12 13:07:10','2026-01-12 13:07:10'),(6,1,'2. SCOPE\n\nAdonis collects some of the Data directly from the Website, such as when you submit an entry (through the general query, or submission of a proposal). You can visit www.adonismedical.com without telling Adonis who you are.',5,'2026-01-12 13:07:10','2026-01-12 13:07:10'),(7,1,'3. APPLICABILITY\n\nAdonis collects some of the Data directly from the Website, such as when you submit an entry (through the general query, or submission of a proposal). You can visit www.adonismedical.com without telling Adonis who you are.',6,'2026-01-12 13:07:10','2026-01-12 13:07:10'),(8,1,'4. DATA COLLECTION\n\nI. We collect Data which you provide us, inter alia, in scenarios such as-\n\na. You voluntarily provide to Adonis when you express an interest in our services by submitting any information as may be requested on the Website.\n\nb. Responding to a survey, conducted by us.\n\nc. Registering for any events displayed on our Website.\n\nd. Requesting information about our product or use of our services or request for customer support etc.\n\nII. We do not track, collect or store any information automatically which includes IP address, browser type, browser cookies, location and device information.\n\nIII. We may ask you to provide your Data relevant to the scenarios such as your name, address, zip code, phone number, and email address, and collect your IP address, location data, information about your device, etc. Not all of the Data holds about you, will always come directly from you. It may, for example, come from your employer or other organizations to which you belong or through our retail network and preferred partners. However, Adonis collects Data about you when you interact with this Website and/or utilize products or services offered on this Website. iii) We keep your Data/information for as long as necessary to fulfill the purposes outlined in this Policy unless otherwise required by law.\n\nIV. We collect Data when the Data is given to us by you.\n\nV. We do not automatically capture any specific personal information from you, (like your name, phone number or e-mail address), that allows us to identify you individually. If the Website requests you to provide personal information, you will be informed of the particular purposes for which the information is gathered and adequate security measures will be taken to protect your personal information.\n\nVI. Any of your information/data available in the public domain shall not be protected under the purview of this Policy and Adonis shall not be held liable for any such disclosures.\n\nVII. By providing us with your Data or the Data pertaining to your relatives, friends or any other third parties, you give us your voluntary and unambiguous consent and also confirm and guarantee that you have received a similar voluntary and unambiguous consent from such of your relatives, friends or third parties for the processing of such Data by Adonis, as per the terms set out in this Policy.',7,'2026-01-12 13:07:10','2026-01-12 13:07:10'),(9,1,'5. DATA USAGE\n\nBy entering your User Information, you accept that Adonis may retain your Data and that it may be held by Adonis. We, shall be entitled to use your Data/ personal Information for the following purposes:\n\na. Provide and communicate with you about feedback and follow up on queries submitted to us.\n\nb. Fulfill your requests regarding the services, including without limitation responding to your inquiries, and communicating with you about our products or services that we believe may be of interest to you.\n\nc. Enforce the legal terms (including without limitation our policies and terms of service) that govern your use of our Services, and/or for the purposes for which you provided the Information,\n\nd. Prevent fraud or potentially illegal activities (including, without limitation, copyright infringement) on or through Our Website or Services,\n\ne. In order to enable Adonis to comply with any requirements imposed on Adonis by law.',8,'2026-01-12 13:07:10','2026-01-12 13:07:10'),(10,1,'6. DATA SHARING & DISCLOSURE\n\nWe may share your Data with:\n\na. Affiliates/associates/subsidiaries/holding and or parent company and other entities within the Refex Group of companies, to assist them in reaching out to you in relation to their programs or campaigns (including marketing and sales) and to process your query / requests;\n\nb. Our employees, service providers, business partners, and subcontractors, consultants/advisors working on our behalf for the purposes described in this Policy; and\n\nWe usually do not share other personal data collected from the Website with other third parties. However, this may happen if:\n\na. You request or authorize us to do so;\n\nb. We need to comply with applicable law or respond to valid legal processes.',9,'2026-01-12 13:07:10','2026-01-12 13:07:10'),(11,1,'7. DATA SAFETY\n\nWe are committed to your privacy and security, we have implemented appropriate technical and organizational security measures to attempt to safeguard and help prevent unauthorized access, maintain data security and correctly use the information we collect online through the Website. You agree that no security measures are perfect or impenetrable and we cannot ensure or warrant the security of any information you transmit or provide to us through the Website and we shall not be held liable for any unveiling or disclosure of Data.',10,'2026-01-12 13:07:10','2026-01-12 13:07:10'),(12,1,'8. INTELLECTUAL PROPERTY RIGHTS\n\nThis Policy does not transfer from Adonis to you any of Adonis\'s or any third-party intellectual property, and all rights, title, and interest in and to such property will remain (as between the parties) solely with Adonis. All trademarks, service marks, graphics and logos used in connection with our Website or services, are trademarks or registered trademarks of Adonis. Other trademarks, service marks, graphics and logos used in connection with our Website may be the trademarks of other third parties. Your use of our Website grants you no right or license to reproduce or otherwise use any Adonis\'s or third-party trademarks.',11,'2026-01-12 13:07:10','2026-01-12 13:07:10'),(13,1,'9. POLICY CHANGES\n\nAdonis reserves the right to change this policy. When any changes are made to the Policy, we will post the current version on our Website. We encourage you to periodically review this Policy so that you will be aware of our updated privacy practices.\n\nYour continued use of the Website after these modifications will constitute your:\n\n(a) acknowledgment of the modified Policy; and\n\n(b) agreement to abide and be bound by the Policy.',12,'2026-01-12 13:07:10','2026-01-12 13:07:10'),(14,1,'10. ACCEPTANCE OF THE POLICY\n\nBy visiting our Website, signing up or logging into the Website, and uploading information on our Website; you acknowledge and unconditionally accept the Policy. If you do not agree with this Policy, do not use our Website and services or provide here any of your personal data.',13,'2026-01-12 13:07:10','2026-01-12 13:07:10'),(15,1,'11. RETENTION OF DATA\n\nAdonis retains Data for as long as necessary to provide the access to and use of the Website, or for other essential purposes such as complying with our legal obligations, resolving disputes and enforcing our agreements. Because these needs can vary for different data types and purposes, actual retention periods can vary significantly. Even if we delete your Data, it may persist on backup or archival media for audit, legal, tax or regulatory purposes.',14,'2026-01-12 13:07:10','2026-01-12 13:07:10'),(16,1,'12. LINKS TO OTHER WEBSITES\n\nThis Website may, from time to time, provide links to other websites. We have no control over such websites and are not responsible for the content of these websites. This Policy does not extend to your use of such websites. You are advised to read the privacy policy or statements of other websites prior to using them.',15,'2026-01-12 13:07:11','2026-01-12 13:07:11'),(17,1,'13. GENERAL\n\nIf any court or competent authority finds that any provision of this Policy (or part of any provision) is invalid, illegal or unenforceable, that provision or part-provision will, to the extent required, be deemed to be deleted, and the validity and enforceability of the other provisions of this Policy will not be affected.',16,'2026-01-12 13:07:11','2026-01-12 13:07:11'),(18,1,'14. GOVERNING LAW AND JURISDICTION\n\nThe Policy shall be governed by the laws of India and the Courts in Chennai shall have the exclusive jurisdiction to try any dispute arising thereof.',17,'2026-01-12 13:07:11','2026-01-12 13:07:11'),(19,1,'15. QUESTIONS/ CONTACT INFORMATION\n\nIf you have questions or comments regarding this Policy, please contact us at: info@adonismedical.com',18,'2026-01-12 13:07:11','2026-01-12 13:07:11');
/*!40000 ALTER TABLE `privacy_policy_paragraphs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `production_facility_features`
--

DROP TABLE IF EXISTS `production_facility_features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `production_facility_features` (
  `id` int NOT NULL AUTO_INCREMENT,
  `icon_class` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `heading` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `order_index` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `icon_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `production_facility_features_icon_id_foreign_idx` (`icon_id`),
  CONSTRAINT `production_facility_features_icon_id_foreign_idx` FOREIGN KEY (`icon_id`) REFERENCES `media` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `production_facility_features`
--

LOCK TABLES `production_facility_features` WRITE;
/*!40000 ALTER TABLE `production_facility_features` DISABLE KEYS */;
INSERT INTO `production_facility_features` VALUES (1,'ri-settings-3-line','Full vertical integration',NULL,1,'2026-01-07 13:45:35',957),(2,'ri-flow-chart','Streamlined processes',NULL,2,'2026-01-07 13:45:35',958),(3,'ri-shield-check-line','Controlled quality from start to finish',NULL,3,'2026-01-07 13:45:35',959),(4,NULL,'Initial Material Inspection:','Every raw material undergoes a thorough inspection.',3,'2026-01-16 11:21:45',NULL),(5,NULL,'In-Process Quality Checks:','Multiple checkpoints during production.',4,'2026-01-16 11:21:45',NULL),(6,NULL,'Final Testing:','Comprehensive testing in our in-house quality lab.',5,'2026-01-16 11:21:45',NULL);
/*!40000 ALTER TABLE `production_facility_features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `production_facility_page_content`
--

DROP TABLE IF EXISTS `production_facility_page_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `production_facility_page_content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hero_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hero_subtitle` text COLLATE utf8mb4_unicode_ci,
  `hero_image_id` int DEFAULT NULL,
  `intro_text` text COLLATE utf8mb4_unicode_ci,
  `flexibility_heading` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `flexibility_content` text COLLATE utf8mb4_unicode_ci,
  `flexibility_image_id` int DEFAULT NULL,
  `quality_heading` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quality_content` text COLLATE utf8mb4_unicode_ci,
  `quality_image_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `intro_background_image_id` int DEFAULT NULL,
  `quality_background_image_id` int DEFAULT NULL,
  `highlighted_box_text` text COLLATE utf8mb4_unicode_ci,
  `flexibility_additional_text` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `hero_image_id` (`hero_image_id`),
  KEY `flexibility_image_id` (`flexibility_image_id`),
  KEY `quality_image_id` (`quality_image_id`),
  KEY `fk_prod_fac_intro_bg_img` (`intro_background_image_id`),
  KEY `fk_prod_fac_quality_bg_img` (`quality_background_image_id`),
  CONSTRAINT `fk_prod_fac_intro_bg_img` FOREIGN KEY (`intro_background_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_prod_fac_quality_bg_img` FOREIGN KEY (`quality_background_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `production_facility_page_content_ibfk_1` FOREIGN KEY (`hero_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `production_facility_page_content_ibfk_2` FOREIGN KEY (`flexibility_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `production_facility_page_content_ibfk_3` FOREIGN KEY (`quality_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `production_facility_page_content`
--

LOCK TABLES `production_facility_page_content` WRITE;
/*!40000 ALTER TABLE `production_facility_page_content` DISABLE KEYS */;
INSERT INTO `production_facility_page_content` VALUES (1,'Production Facility',NULL,960,'Our Mohali facility is more than just a production site—it’s a fully integrated manufacturing hub. From initial design to final assembly, every step is managed in-house, ensuring complete quality control and operational efficiency.','Flexibility in Manufacturing','Adonis Medical Systems thrives on adaptability. Whether fulfilling routine orders or responding to urgent demands, our facility is designed to manage all production scenarios with ease.',961,'Rigorous Quality Assurance','Our quality assurance protocols are meticulously designed to ensure that every\nproduct meets both national and international standards.',963,'2026-01-07 13:45:35','2026-01-16 11:31:13',955,NULL,'Our facility can switch between scheduled orders and emergency short-call orders without compromising on quality.','Our agile approach ensures that we meet your needs promptly, regardless of the complexity or volume of the order.');
/*!40000 ALTER TABLE `production_facility_page_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quality_assurance_page_content`
--

DROP TABLE IF EXISTS `quality_assurance_page_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quality_assurance_page_content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hero_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hero_subtitle` text COLLATE utf8mb4_unicode_ci,
  `hero_image_id` int DEFAULT NULL,
  `intro_text` text COLLATE utf8mb4_unicode_ci,
  `main_heading` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `main_content` text COLLATE utf8mb4_unicode_ci,
  `main_image_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `background_image_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `hero_image_id` (`hero_image_id`),
  KEY `main_image_id` (`main_image_id`),
  KEY `quality_assurance_page_content_background_image_id_foreign_idx` (`background_image_id`),
  CONSTRAINT `quality_assurance_page_content_background_image_id_foreign_idx` FOREIGN KEY (`background_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `quality_assurance_page_content_ibfk_1` FOREIGN KEY (`hero_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `quality_assurance_page_content_ibfk_2` FOREIGN KEY (`main_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quality_assurance_page_content`
--

LOCK TABLES `quality_assurance_page_content` WRITE;
/*!40000 ALTER TABLE `quality_assurance_page_content` DISABLE KEYS */;
INSERT INTO `quality_assurance_page_content` VALUES (1,'Quality Assurance & Regulatory',NULL,952,'At Adonis Medical Systems, we are dedicated to delivering the very best in technology, application, support, and service. Our products are designed for unbeatable, trouble-free performance, offering exceptional value and reliability for years to come.','All ADONIS products are certified to meet national and international quality standards.','Each equipment manufactured at ADONIS is carefully designed and tested in our own Quality Lab to ensure the utmost accuracy and reliability. Much of the equipment incorporates ADONIS\'s own indigenous development. The Precision and Image Quality are constantly being improved and incorporated into the new system.',956,'2026-01-07 13:45:35','2026-01-16 09:25:03',955);
/*!40000 ALTER TABLE `quality_assurance_page_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request_demo_features`
--

DROP TABLE IF EXISTS `request_demo_features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request_demo_features` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon_image_id` int DEFAULT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `page_content_id` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `page_content_id` (`page_content_id`),
  KEY `icon_image_id` (`icon_image_id`),
  CONSTRAINT `request_demo_features_ibfk_1` FOREIGN KEY (`page_content_id`) REFERENCES `request_demo_page_content` (`id`) ON DELETE CASCADE,
  CONSTRAINT `request_demo_features_ibfk_2` FOREIGN KEY (`icon_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request_demo_features`
--

LOCK TABLES `request_demo_features` WRITE;
/*!40000 ALTER TABLE `request_demo_features` DISABLE KEYS */;
INSERT INTO `request_demo_features` VALUES (1,'System Variety','We offer 15+ models ranging from portable to high-powered fixed machines, ensuring solutions for every need.',904,0,1,'2026-01-12 05:49:37','2026-01-12 05:49:37'),(2,'System Variety','95% of our customers report improved diagnostic accuracy after using our systems.',905,1,1,'2026-01-12 05:50:30','2026-01-12 05:50:30'),(3,'Usage Stats','Our systems have been installed in over 1,000 hospitals and clinics across the country, enhancing patient care and diagnostic capabilities.',906,2,1,'2026-01-12 05:51:04','2026-01-12 05:51:04'),(4,'Training & Support','100+ hours of training provided annually to ensure optimal system utilization and staff proficiency.',907,3,1,'2026-01-12 05:51:43','2026-01-12 05:51:43');
/*!40000 ALTER TABLE `request_demo_features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request_demo_page_content`
--

DROP TABLE IF EXISTS `request_demo_page_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request_demo_page_content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hero_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `intro_text` text COLLATE utf8mb4_unicode_ci,
  `feature1_icon` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `feature1_text` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `feature2_icon` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `feature2_text` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `feature3_icon` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `feature3_text` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `background_image_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_request_demo_background_image` (`background_image_id`),
  CONSTRAINT `fk_request_demo_background_image` FOREIGN KEY (`background_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request_demo_page_content`
--

LOCK TABLES `request_demo_page_content` WRITE;
/*!40000 ALTER TABLE `request_demo_page_content` DISABLE KEYS */;
INSERT INTO `request_demo_page_content` VALUES (1,'Request a Demo','Adonis Medical develops cutting-edge products and devices, driven by our commitment to elevate patient care. Our diverse range of offerings addresses the unique needs of both caregivers and patients. Feel free to register here to request a demo of our product line.','ri-calendar-check-line','Schedule at your convenience how','ri-user-heart-line','Personalized demonstration are','ri-service-line','Expert product guidance you',908,'2026-01-07 13:45:35','2026-01-12 05:53:18');
/*!40000 ALTER TABLE `request_demo_page_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request_demo_paragraphs`
--

DROP TABLE IF EXISTS `request_demo_paragraphs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request_demo_paragraphs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `page_content_id` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `page_content_id` (`page_content_id`),
  CONSTRAINT `request_demo_paragraphs_ibfk_1` FOREIGN KEY (`page_content_id`) REFERENCES `request_demo_page_content` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request_demo_paragraphs`
--

LOCK TABLES `request_demo_paragraphs` WRITE;
/*!40000 ALTER TABLE `request_demo_paragraphs` DISABLE KEYS */;
/*!40000 ALTER TABLE `request_demo_paragraphs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reusable_contact_section`
--

DROP TABLE IF EXISTS `reusable_contact_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reusable_contact_section` (
  `id` int NOT NULL AUTO_INCREMENT,
  `heading` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_id` int DEFAULT NULL,
  `background_image_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `phone_icon_id` int DEFAULT NULL,
  `email_icon_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `image_id` (`image_id`),
  KEY `fk_reusable_contact_background_image` (`background_image_id`),
  KEY `reusable_contact_section_phone_icon_id_foreign_idx` (`phone_icon_id`),
  KEY `reusable_contact_section_email_icon_id_foreign_idx` (`email_icon_id`),
  CONSTRAINT `fk_reusable_contact_background_image` FOREIGN KEY (`background_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `reusable_contact_section_email_icon_id_foreign_idx` FOREIGN KEY (`email_icon_id`) REFERENCES `media` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `reusable_contact_section_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `reusable_contact_section_phone_icon_id_foreign_idx` FOREIGN KEY (`phone_icon_id`) REFERENCES `media` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reusable_contact_section`
--

LOCK TABLES `reusable_contact_section` WRITE;
/*!40000 ALTER TABLE `reusable_contact_section` DISABLE KEYS */;
INSERT INTO `reusable_contact_section` VALUES (1,'Contact Us','ADONIS MEDICAL SYSTEMS PVT LTD','E-70, PHASE- VIII, INDUSTRIAL AREA, MOHALI, 160071.','9872003273','support@adonismedical.com',921,922,'2026-01-12 06:36:50','2026-01-16 06:39:49',946,937);
/*!40000 ALTER TABLE `reusable_contact_section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social_links`
--

DROP TABLE IF EXISTS `social_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `social_links` (
  `id` int NOT NULL AUTO_INCREMENT,
  `platform` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon_class` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `icon_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_social_link_icon` (`icon_id`),
  CONSTRAINT `fk_social_link_icon` FOREIGN KEY (`icon_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social_links`
--

LOCK TABLES `social_links` WRITE;
/*!40000 ALTER TABLE `social_links` DISABLE KEYS */;
INSERT INTO `social_links` VALUES (1,'Facebook',NULL,'ri-facebook-fill',1,1,'2026-01-07 13:44:48','2026-01-19 06:58:11',NULL),(2,'Twitter',NULL,'ri-twitter-fill',2,1,'2026-01-07 13:44:48','2026-01-19 06:58:19',NULL),(3,'LinkedIn',NULL,'ri-linkedin-fill',3,1,'2026-01-07 13:44:48','2026-01-19 06:58:27',NULL),(4,'Instagram',NULL,'ri-instagram-line',4,1,'2026-01-07 13:44:48','2026-01-19 06:58:34',NULL);
/*!40000 ALTER TABLE `social_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specialties`
--

DROP TABLE IF EXISTS `specialties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specialties` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `image_id` int DEFAULT NULL,
  `icon_class` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `specialties_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specialties`
--

LOCK TABLES `specialties` WRITE;
/*!40000 ALTER TABLE `specialties` DISABLE KEYS */;
/*!40000 ALTER TABLE `specialties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specialties_page_cards`
--

DROP TABLE IF EXISTS `specialties_page_cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specialties_page_cards` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `background_image_id` int DEFAULT NULL,
  `card_image_id` int DEFAULT NULL,
  `internal_link` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `background_image_id` (`background_image_id`),
  KEY `card_image_id` (`card_image_id`),
  CONSTRAINT `specialties_page_cards_ibfk_1` FOREIGN KEY (`background_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL,
  CONSTRAINT `specialties_page_cards_ibfk_2` FOREIGN KEY (`card_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specialties_page_cards`
--

LOCK TABLES `specialties_page_cards` WRITE;
/*!40000 ALTER TABLE `specialties_page_cards` DISABLE KEYS */;
INSERT INTO `specialties_page_cards` VALUES (1,'Radiology',888,889,'/our-products',0,1,'2026-01-09 11:47:46','2026-01-12 08:58:33'),(2,'Urology',891,898,'/our-products',1,1,'2026-01-09 11:49:55','2026-01-12 08:58:44'),(3,'Neurology',892,897,'/our-products',2,1,'2026-01-09 11:52:28','2026-01-12 08:58:55'),(4,'Orthopedic',893,896,'/our-products',3,1,'2026-01-09 11:52:52','2026-01-12 08:59:17'),(5,'Gastroenterology',894,895,'/our-products',4,1,'2026-01-09 11:53:15','2026-01-12 08:59:06');
/*!40000 ALTER TABLE `specialties_page_cards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specialties_page_content`
--

DROP TABLE IF EXISTS `specialties_page_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specialties_page_content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hero_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hero_subtitle` text COLLATE utf8mb4_unicode_ci,
  `hero_image_id` int DEFAULT NULL,
  `intro_text` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `hero_image_id` (`hero_image_id`),
  CONSTRAINT `specialties_page_content_ibfk_1` FOREIGN KEY (`hero_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specialties_page_content`
--

LOCK TABLES `specialties_page_content` WRITE;
/*!40000 ALTER TABLE `specialties_page_content` DISABLE KEYS */;
INSERT INTO `specialties_page_content` VALUES (1,'Our Specialties ','Comprehensive Healthcare Solutions',890,NULL,'2026-01-07 13:45:35','2026-01-09 11:49:32');
/*!40000 ALTER TABLE `specialties_page_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `terms_and_conditions_page`
--

DROP TABLE IF EXISTS `terms_and_conditions_page`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `terms_and_conditions_page` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'Terms and Conditions',
  `subtitle` text COLLATE utf8mb4_unicode_ci,
  `rich_text_content` longtext COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `terms_and_conditions_page`
--

LOCK TABLES `terms_and_conditions_page` WRITE;
/*!40000 ALTER TABLE `terms_and_conditions_page` DISABLE KEYS */;
INSERT INTO `terms_and_conditions_page` VALUES (1,'Terms and Conditions',NULL,'<h1 style=\"box-sizing: border-box; border: 0px; font-size: 2.25rem; font-style: normal; font-weight: 600; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: #1e293b; line-height: 1.4em; font-family: \'Century Gothic\' !important; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"><strong style=\"box-sizing: border-box; font-weight: bold;\">Terms And Condition :</strong></h1>\n<p style=\"box-sizing: border-box; border: 0px; font-size: 16px; font-style: normal; font-weight: 400; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline; color: #7a7a7a; font-family: Roboto, sans-serif; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"><strong style=\"box-sizing: border-box; font-weight: bold;\"><br style=\"box-sizing: border-box;\"></strong><span style=\"box-sizing: border-box; font-weight: 400;\">This terms and condition (&ldquo;</span><strong style=\"box-sizing: border-box; font-weight: bold;\">Terms</strong><span style=\"box-sizing: border-box; font-weight: 400;\">&rdquo;/ &ldquo;</span><strong style=\"box-sizing: border-box; font-weight: bold;\">Agreement</strong><span style=\"box-sizing: border-box; font-weight: 400;\">&rdquo;)&nbsp;is an agreement between Adonis Medical Systems Private Limited which shall mean and include its parent company/holding company, subsidiaries, affiliates, associate companies and Refex Group of Companies (&ldquo;Adonis&rdquo;, &ldquo;us&rdquo;, &ldquo;we&rdquo; or &ldquo;our&rdquo;) and you (&ldquo;User&rdquo;, &ldquo;you&rdquo; or &ldquo;your&rdquo;). This Agreement sets forth the general terms and conditions of your use of our main website &ldquo;</span><a style=\"box-sizing: border-box; background-color: transparent; text-decoration: none; color: #046bd2; transition: 0.2s linear; box-shadow: none;\" href=\"https://www.adonismedical.com/\"><span style=\"box-sizing: border-box; font-weight: 400;\">www.adonismedical.com</span></a><span style=\"box-sizing: border-box; font-weight: 400;\">&rdquo; including any sub-domains of this website, unless excluded by their own terms (collectively referred to as&nbsp;</span><strong style=\"box-sizing: border-box; font-weight: bold;\">&ldquo;Website&rdquo;).</strong></p>\n<p style=\"box-sizing: border-box; border: 0px; font-size: 16px; font-style: normal; font-weight: 400; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline; color: #7a7a7a; font-family: Roboto, sans-serif; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"><strong style=\"box-sizing: border-box; font-weight: bold;\">ACCURACY OF INFORMATION</strong></p>\n<p style=\"box-sizing: border-box; border: 0px; font-size: 16px; font-style: normal; font-weight: 400; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline; color: #7a7a7a; font-family: Roboto, sans-serif; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"><span style=\"box-sizing: border-box; font-weight: 400;\">Occasionally there may be information on the Website that contains typographical errors, inaccuracies or omissions that may relate to promotions and offers. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information on the Website is inaccurate at any time without prior notice (including after you have submitted your order) to you. We undertake no obligation to update, amend or clarify information on the Website including, without limitation, pricing information, except as required by law. No specified update or fresh date applied on the Website should be taken to indicate that all information on the Website has been modified or updated.</span></p>\n<p style=\"box-sizing: border-box; border: 0px; font-size: 16px; font-style: normal; font-weight: 400; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline; color: #7a7a7a; font-family: Roboto, sans-serif; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"><strong style=\"box-sizing: border-box; font-weight: bold;\">LINKS TO OTHER WEBSITES</strong></p>\n<p style=\"box-sizing: border-box; border: 0px; font-size: 16px; font-style: normal; font-weight: 400; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline; color: #7a7a7a; font-family: Roboto, sans-serif; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"><span style=\"box-sizing: border-box; font-weight: 400;\">Although this Website may be linked to other websites, we are not, directly or indirectly, implying any approval, association, sponsorship, endorsement, or affiliation with any linked website, unless specifically stated herein. We are not responsible for examining or evaluating, and we do not warrant the offerings of any businesses or individuals or the content of their websites. We do not assume any responsibility or liability for the actions, products, services and content of any other third parties. You should carefully review the legal statements and other conditions of use of any website that you access through a link from our Website. Your linking to any other off-site websites is at your own risk.</span></p>\n<p style=\"box-sizing: border-box; border: 0px; font-size: 16px; font-style: normal; font-weight: 400; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline; color: #7a7a7a; font-family: Roboto, sans-serif; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"><strong style=\"box-sizing: border-box; font-weight: bold;\">PROHIBITED USES</strong></p>\n<p style=\"box-sizing: border-box; border: 0px; font-size: 16px; font-style: normal; font-weight: 400; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline; color: #7a7a7a; font-family: Roboto, sans-serif; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"><span style=\"box-sizing: border-box; font-weight: 400;\">In addition to other terms as set forth in the Agreement, you are prohibited from using&nbsp; our Website or its content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Website&nbsp; or of any related website, other websites, or the Internet; (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the Website or any related website, other websites, or the Internet. We reserve the right to terminate your use of the Website or any related website for violating any of the prohibited uses.</span></p>\n<p style=\"box-sizing: border-box; border: 0px; font-size: 16px; font-style: normal; font-weight: 400; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline; color: #7a7a7a; font-family: Roboto, sans-serif; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"><strong style=\"box-sizing: border-box; font-weight: bold;\">INTELLECTUAL PROPERTY RIGHTS</strong></p>\n<p style=\"box-sizing: border-box; border: 0px; font-size: 16px; font-style: normal; font-weight: 400; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline; color: #7a7a7a; font-family: Roboto, sans-serif; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"><span style=\"box-sizing: border-box; font-weight: 400;\">This Agreement does not transfer from Adonis to you, any of Adonis&rsquo;s or third-party intellectual property, and all right, title, and interest in and to such property will remain (as between the parties) solely with Adonis. All trademarks, service marks, graphics and logos used in connection with our Website, are trademarks or registered trademarks of Adonis. Other trademarks, service marks, graphics and logos used in connection with our Website may be the trademarks of other third parties. Your use of our Website grants you no right or license to reproduce or otherwise use any of Adonis&rsquo;s or third-party trademarks.</span></p>\n<p style=\"box-sizing: border-box; border: 0px; font-size: 16px; font-style: normal; font-weight: 400; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline; color: #7a7a7a; font-family: Roboto, sans-serif; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"><strong style=\"box-sizing: border-box; font-weight: bold;\">DISCLAIMER OF WARRANTY</strong></p>\n<p style=\"box-sizing: border-box; border: 0px; font-size: 16px; font-style: normal; font-weight: 400; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline; color: #7a7a7a; font-family: Roboto, sans-serif; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"><span style=\"box-sizing: border-box; font-weight: 400;\">You agree that your use of our Website is solely at your own risk. You agree that such Website is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. We expressly disclaim all warranties of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose and non-infringement. We make no warranty that &nbsp; our Website will meet your requirements, or that&nbsp; our Website will be uninterrupted, timely, secure, or error free; nor do we make any warranty as to the results that may be obtained from the use of our Website or as to the accuracy or reliability of any information obtained through our Website or that defects in the our Website will be corrected. You understand and agree that any material and/or data downloaded or otherwise obtained through the use of our Website is done at your own discretion and risk and that you will be solely responsible for any damage to your computer system or loss of data that results from the download of such material and/or data. We make no warranty regarding any goods or services purchased or obtained through our Website or any transactions entered into through the Service. No advice or information, whether oral or written, obtained by you from us or through our Website shall create any warranty not expressly made herein.</span></p>\n<p style=\"box-sizing: border-box; border: 0px; font-size: 16px; font-style: normal; font-weight: 400; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline; color: #7a7a7a; font-family: Roboto, sans-serif; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"><strong style=\"box-sizing: border-box; font-weight: bold;\">LIMITATION OF LIABILITY</strong></p>\n<p style=\"box-sizing: border-box; border: 0px; font-size: 16px; font-style: normal; font-weight: 400; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline; color: #7a7a7a; font-family: Roboto, sans-serif; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"><span style=\"box-sizing: border-box; font-weight: 400;\">To the fullest extent permitted by applicable law, in no event will Adonis, its affiliates,&nbsp; officers, directors, employees, agents, suppliers or licensors be liable to any person for (a): any indirect, incidental, special, punitive, cover or consequential damages (including, without limitation, damages for lost profits, revenue, sales, goodwill, use or content, impact on business, business interruption, loss of anticipated savings, loss of business opportunity) however caused, under any theory of liability, including, without limitation, contract, tort, warranty, breach of statutory duty, negligence or otherwise, even if Adonis has been advised as to the possibility of such damages or could have foreseen such damages.</span></p>\n<p style=\"box-sizing: border-box; border: 0px; font-size: 16px; font-style: normal; font-weight: 400; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline; color: #7a7a7a; font-family: Roboto, sans-serif; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"><strong style=\"box-sizing: border-box; font-weight: bold;\">INDEMNIFICATION</strong></p>\n<p style=\"box-sizing: border-box; border: 0px; font-size: 16px; font-style: normal; font-weight: 400; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline; color: #7a7a7a; font-family: Roboto, sans-serif; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"><span style=\"box-sizing: border-box; font-weight: 400;\">You agree to indemnify and hold Adonis and its affiliates, directors, officers, employees, and agents including its parent company/holding company, subsidiaries, affiliates, associate companies and Refex Group of Companies harmless from and against any liabilities, losses, damages or costs, including reasonable attorneys&rsquo; fees, incurred in connection with or arising from any third-party allegations, claims, actions, disputes, or demands asserted against any of them as a result of or relating to your content, your use of&nbsp; our Website or any willful misconduct on your part.</span></p>\n<p style=\"box-sizing: border-box; border: 0px; font-size: 16px; font-style: normal; font-weight: 400; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline; color: #7a7a7a; font-family: Roboto, sans-serif; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"><strong style=\"box-sizing: border-box; font-weight: bold;\">SEVERABILITY</strong></p>\n<p style=\"box-sizing: border-box; border: 0px; font-size: 16px; font-style: normal; font-weight: 400; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline; color: #7a7a7a; font-family: Roboto, sans-serif; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"><span style=\"box-sizing: border-box; font-weight: 400;\">All rights and restrictions contained in this Agreement may be exercised and shall apply and binding only to the extent that they do not violate any applicable laws and are intended to be limited to the extent necessary so that they will not render this Agreement illegal, invalid or unenforceable. If any provision or portion of any provision of this Agreement shall be held to be illegal, invalid or unenforceable by a court of competent jurisdiction, it is the intention of the parties that the remaining provisions or portions thereof shall constitute their agreement with respect to the subject matter hereof, and all such remaining provisions or portions thereof shall remain in full force and effect.</span></p>\n<p style=\"box-sizing: border-box; border: 0px; font-size: 16px; font-style: normal; font-weight: 400; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline; color: #7a7a7a; font-family: Roboto, sans-serif; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"><strong style=\"box-sizing: border-box; font-weight: bold;\">DISPUTE RESOLUTION</strong></p>\n<p style=\"box-sizing: border-box; border: 0px; font-size: 16px; font-style: normal; font-weight: 400; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline; color: #7a7a7a; font-family: Roboto, sans-serif; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"><span style=\"box-sizing: border-box; font-weight: 400;\">The Policy shall be governed by the laws of India and the Courts in Chennai shall have the exclusive jurisdiction to try any dispute arising thereof</span><strong style=\"box-sizing: border-box; font-weight: bold;\">.</strong></p>\n<p style=\"box-sizing: border-box; border: 0px; font-size: 16px; font-style: normal; font-weight: 400; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline; color: #7a7a7a; font-family: Roboto, sans-serif; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"><strong style=\"box-sizing: border-box; font-weight: bold;\">CHANGES AND AMENDMENTS</strong></p>\n<p style=\"box-sizing: border-box; border: 0px; font-size: 16px; font-style: normal; font-weight: 400; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline; color: #7a7a7a; font-family: Roboto, sans-serif; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"><span style=\"box-sizing: border-box; font-weight: 400;\">We reserve the right to modify this Agreement or its policies relating to our Website at any time, effective upon posting of an updated version of this Agreement on the Website. When we do we will post a notification on the main page of our Website. Continued use of the Website after any such changes shall constitute your consent to such changes.</span></p>\n<p style=\"box-sizing: border-box; border: 0px; font-size: 16px; font-style: normal; font-weight: 400; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline; color: #7a7a7a; font-family: Roboto, sans-serif; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"><strong style=\"box-sizing: border-box; font-weight: bold;\">ACCEPTANCE OF THESE TERMS</strong></p>\n<p style=\"box-sizing: border-box; border: 0px; font-size: 16px; font-style: normal; font-weight: 400; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline; color: #7a7a7a; font-family: Roboto, sans-serif; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"><span style=\"box-sizing: border-box; font-weight: 400;\">You acknowledge that you have read this Agreement and agree to all its terms and conditions. By using our Website you agree to be bound by this Agreement. If you do not agree to abide by the terms of this Agreement, you are not authorized to use or access our Website.</span></p>\n<p style=\"box-sizing: border-box; border: 0px; font-size: 16px; font-style: normal; font-weight: 400; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline; color: #7a7a7a; font-family: Roboto, sans-serif; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"><strong style=\"box-sizing: border-box; font-weight: bold;\">CONTACTING US</strong></p>\n<p style=\"box-sizing: border-box; border: 0px; font-size: 16px; font-style: normal; font-weight: 400; margin: 0px 0px 1.75em; outline: 0px; padding: 0px; vertical-align: baseline; color: #7a7a7a; font-family: Roboto, sans-serif; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"><span style=\"box-sizing: border-box; font-weight: 400;\">If you have any questions about this Agreement, please contact us at&nbsp;</span><a style=\"box-sizing: border-box; background-color: transparent; text-decoration: none; color: #046bd2; transition: 0.2s linear; box-shadow: none;\" href=\"mailto:info@adonismedical.com\"><span style=\"box-sizing: border-box; font-weight: 400;\">info@adonismedical.com</span></a><span style=\"box-sizing: border-box; font-weight: 400;\">. This document was last updated on 16</span><span style=\"box-sizing: border-box; font-weight: 400;\">th</span><span style=\"box-sizing: border-box; font-weight: 400;\">&nbsp; January, 2026.</span></p>','2026-01-12 09:10:08','2026-01-16 05:32:55');
/*!40000 ALTER TABLE `terms_and_conditions_page` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `terms_and_conditions_paragraphs`
--

DROP TABLE IF EXISTS `terms_and_conditions_paragraphs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `terms_and_conditions_paragraphs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `terms_and_conditions_page_id` int NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_page_order` (`terms_and_conditions_page_id`,`order_index`),
  CONSTRAINT `terms_and_conditions_paragraphs_ibfk_1` FOREIGN KEY (`terms_and_conditions_page_id`) REFERENCES `terms_and_conditions_page` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `terms_and_conditions_paragraphs`
--

LOCK TABLES `terms_and_conditions_paragraphs` WRITE;
/*!40000 ALTER TABLE `terms_and_conditions_paragraphs` DISABLE KEYS */;
INSERT INTO `terms_and_conditions_paragraphs` VALUES (1,1,'This terms and condition (\"Terms\"/ \"Agreement\") is an agreement between Adonis Medical Systems Private Limited which shall mean and include its parent company/holding company, subsidiaries, affiliates, associate companies and Refex Group of Companies (\"Adonis\", \"us\", \"we\" or \"our\") and you (\"User\", \"you\" or \"your\"). This Agreement sets forth the general terms and conditions of your use of our main website \"www.adonismedical.com\" including any sub-domains of this website, unless excluded by their own terms (collectively referred to as \"Website\").',0,'2026-01-12 13:11:02','2026-01-12 13:11:02'),(2,1,'ACCURACY OF INFORMATION\n\nOccasionally there may be information on the Website that contains typographical errors, inaccuracies or omissions that may relate to promotions and offers. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information on the Website is inaccurate at any time without prior notice (including after you have submitted your order) to you. We undertake no obligation to update, amend or clarify information on the Website including, without limitation, pricing information, except as required by law. No specified update or fresh date applied on the Website should be taken to indicate that all information on the Website has been modified or updated.',1,'2026-01-12 13:11:02','2026-01-12 13:11:02'),(3,1,'LINKS TO OTHER WEBSITES\n\nAlthough this Website may be linked to other websites, we are not, directly or indirectly, implying any approval, association, sponsorship, endorsement, or affiliation with any linked website, unless specifically stated herein. We are not responsible for examining or evaluating, and we do not warrant the offerings of any businesses or individuals or the content of their websites. We do not assume any responsibility or liability for the actions, products, services and content of any other third parties. You should carefully review the legal statements and other conditions of use of any website that you access through a link from our Website. Your linking to any other off-site websites is at your own risk.',2,'2026-01-12 13:11:02','2026-01-12 13:11:02'),(4,1,'PROHIBITED USES\n\nIn addition to other terms as set forth in the Agreement, you are prohibited from using our Website or its content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Website or of any related website, other websites, or the Internet; (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the Website or any related website, other websites, or the Internet. We reserve the right to terminate your use of the Website or any related website for violating any of the prohibited uses.',3,'2026-01-12 13:11:02','2026-01-12 13:11:02'),(5,1,'INTELLECTUAL PROPERTY RIGHTS\n\nThis Agreement does not transfer from Adonis to you, any of Adonis\'s or third-party intellectual property, and all right, title, and interest in and to such property will remain (as between the parties) solely with Adonis. All trademarks, service marks, graphics and logos used in connection with our Website, are trademarks or registered trademarks of Adonis. Other trademarks, service marks, graphics and logos used in connection with our Website may be the trademarks of other third parties. Your use of our Website grants you no right or license to reproduce or otherwise use any of Adonis\'s or third-party trademarks.',4,'2026-01-12 13:11:02','2026-01-12 13:11:02'),(6,1,'DISCLAIMER OF WARRANTY\n\nYou agree that your use of our Website is solely at your own risk. You agree that such Website is provided on an \"as is\" and \"as available\" basis. We expressly disclaim all warranties of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose and non-infringement. We make no warranty that our Website will meet your requirements, or that our Website will be uninterrupted, timely, secure, or error free; nor do we make any warranty as to the results that may be obtained from the use of our Website or as to the accuracy or reliability of any information obtained through our Website or that defects in the our Website will be corrected. You understand and agree that any material and/or data downloaded or otherwise obtained through the use of our Website is done at your own discretion and risk and that you will be solely responsible for any damage to your computer system or loss of data that results from the download of such material and/or data. We make no warranty regarding any goods or services purchased or obtained through our Website or any transactions entered into through the Service. No advice or information, whether oral or written, obtained by you from us or through our Website shall create any warranty not expressly made herein.',5,'2026-01-12 13:11:02','2026-01-12 13:11:02'),(7,1,'LIMITATION OF LIABILITY\n\nTo the fullest extent permitted by applicable law, in no event will Adonis, its affiliates, officers, directors, employees, agents, suppliers or licensors be liable to any person for (a): any indirect, incidental, special, punitive, cover or consequential damages (including, without limitation, damages for lost profits, revenue, sales, goodwill, use or content, impact on business, business interruption, loss of anticipated savings, loss of business opportunity) however caused, under any theory of liability, including, without limitation, contract, tort, warranty, breach of statutory duty, negligence or otherwise, even if Adonis has been advised as to the possibility of such damages or could have foreseen such damages.',6,'2026-01-12 13:11:02','2026-01-12 13:11:02'),(8,1,'INDEMNIFICATION\n\nYou agree to indemnify and hold Adonis and its affiliates, directors, officers, employees, and agents including its parent company/holding company, subsidiaries, affiliates, associate companies and Refex Group of Companies harmless from and against any liabilities, losses, damages or costs, including reasonable attorneys\' fees, incurred in connection with or arising from any third-party allegations, claims, actions, disputes, or demands asserted against any of them as a result of or relating to your content, your use of our Website or any willful misconduct on your part.',7,'2026-01-12 13:11:02','2026-01-12 13:11:02'),(9,1,'SEVERABILITY\n\nAll rights and restrictions contained in this Agreement may be exercised and shall apply and binding only to the extent that they do not violate any applicable laws and are intended to be limited to the extent necessary so that they will not render this Agreement illegal, invalid or unenforceable. If any provision or portion of any provision of this Agreement shall be held to be illegal, invalid or unenforceable by a court of competent jurisdiction, it is the intention of the parties that the remaining provisions or portions thereof shall constitute their agreement with respect to the subject matter hereof, and all such remaining provisions or portions thereof shall remain in full force and effect.',8,'2026-01-12 13:11:02','2026-01-12 13:11:02'),(10,1,'DISPUTE RESOLUTION\n\nThe Policy shall be governed by the laws of India and the Courts in Chennai shall have the exclusive jurisdiction to try any dispute arising thereof.',9,'2026-01-12 13:11:02','2026-01-12 13:11:02'),(11,1,'CHANGES AND AMENDMENTS\n\nWe reserve the right to modify this Agreement or its policies relating to our Website at any time, effective upon posting of an updated version of this Agreement on the Website. When we do we will post a notification on the main page of our Website. Continued use of the Website after any such changes shall constitute your consent to such changes.',10,'2026-01-12 13:11:02','2026-01-12 13:11:02'),(12,1,'ACCEPTANCE OF THESE TERMS\n\nYou acknowledge that you have read this Agreement and agree to all its terms and conditions. By using our Website you agree to be bound by this Agreement. If you do not agree to abide by the terms of this Agreement, you are not authorized to use or access our Website.',11,'2026-01-12 13:11:02','2026-01-12 13:11:02'),(13,1,'CONTACTING US\n\nIf you have any questions about this Agreement, please contact us at info@adonismedical.com. This document was last updated on 12th January, 2026.',12,'2026-01-12 13:11:02','2026-01-12 13:11:02');
/*!40000 ALTER TABLE `terms_and_conditions_paragraphs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testimonials`
--

DROP TABLE IF EXISTS `testimonials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testimonials` (
  `id` int NOT NULL AUTO_INCREMENT,
  `client_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `client_position` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `client_company` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `client_image_id` int DEFAULT NULL,
  `testimonial_text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `rating` int DEFAULT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `is_featured` tinyint(1) DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `client_image_id` (`client_image_id`),
  CONSTRAINT `testimonials_ibfk_1` FOREIGN KEY (`client_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testimonials`
--

LOCK TABLES `testimonials` WRITE;
/*!40000 ALTER TABLE `testimonials` DISABLE KEYS */;
INSERT INTO `testimonials` VALUES (4,'Dr. U. Sai Kiran',NULL,'Life Care Multi Speciality Hospital',932,'My association with ADONIS has been for ten years. The products I have used till date 26-10-2024 are of superior quality and long term durability. My complete satisfaction with their products compels me to further recommend to others.',5,0,0,1,'2026-01-14 10:00:06','2026-01-14 10:06:24'),(5,'Dr. Rakesh Lamba',NULL,'Matrika Hospital',933,'There is hardly any fault in this machine. In between 6months ago a problem came and within 12 hours machine was serviced. Very satisfied with service and quality and sales / service Engg. Behaviour',5,1,0,1,'2026-01-14 10:00:06','2026-01-14 10:08:32'),(6,'Sarah Jackson',NULL,'Rudransh Multi Speciality Hospital',934,'My C Arm machine is seven years old. ADONIS is a good company and services is also very good. Any time services provided by ADONIS. Iam satisfied.',5,2,0,1,'2026-01-14 10:00:06','2026-01-14 10:09:06'),(7,'Sai Speciality Hospital',NULL,NULL,935,'I have heard positive reviews from my colleagues in the healthcare industry about ADONIS, So I decided to use a few of their equipment’s. Needless to say, I was more than happy with what I received.',5,3,0,1,'2026-01-14 10:00:06','2026-01-14 10:09:30'),(8,'Dr. S. Karthik',NULL,'Global Ortho & Trauma Hospital',931,'What sets ADONIS apart from other medical suppliers is their willingness to go the extra mile. The customer support I got was exemplary and they answered all of my queries patiently just to ensure I was completely satisfied.',5,4,0,1,'2026-01-14 10:00:06','2026-01-14 10:05:21');
/*!40000 ALTER TABLE `testimonials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `full_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('super_admin','admin','editor','viewer') COLLATE utf8mb4_unicode_ci DEFAULT 'editor',
  `is_active` tinyint(1) DEFAULT '1',
  `last_login_at` timestamp NULL DEFAULT NULL,
  `permissions` json DEFAULT NULL COMMENT 'Custom permissions that override role-based defaults. Format: { page: { view: bool, edit: bool, delete: bool } }',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_email` (`email`),
  KEY `idx_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'raghul','raghul.je@refex.co.in','$2b$10$oOLmC7da0LAVCbSCHFGxkekJVo0jtxivdbwhtamRYyDL3ugbSyL3a','Raghul JE','super_admin',1,'2026-01-20 05:06:32',NULL,'2026-01-07 13:53:49','2026-01-20 05:06:32'),(2,'murugesh','murugesh.k@refex.co.in','$2b$10$ZD.slGRTRZDMWn985zVSzeY6wwXC11EQkUq3IamuTBGBuGVUrrgd6','murugesh kumar','super_admin',1,'2026-01-08 09:10:20',NULL,'2026-01-08 06:30:21','2026-01-08 09:10:20');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'adonis_production'
--

--
-- Dumping routines for database 'adonis_production'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-20 13:11:29
