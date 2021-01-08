-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.6.50 - MySQL Community Server (GPL)
-- 服务器操作系统:                      Linux
-- HeidiSQL 版本:                  11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- 导出 mini_blog 的数据库结构
CREATE DATABASE IF NOT EXISTS `mini_blog` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `mini_blog`;

-- 导出  表 mini_blog.Comment 结构
CREATE TABLE IF NOT EXISTS `Comment` (
  `id` int(11) NOT NULL,
  `content` mediumtext NOT NULL,
  `to` int(11) NOT NULL,
  `parent` int(11) DEFAULT NULL,
  `author` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 正在导出表  mini_blog.Comment 的数据：~7 rows (大约)
/*!40000 ALTER TABLE `Comment` DISABLE KEYS */;

/*!40000 ALTER TABLE `Comment` ENABLE KEYS */;

-- 导出  表 mini_blog.Post 结构
CREATE TABLE IF NOT EXISTS `Post` (
  `id` int(11) NOT NULL,
  `content` longtext NOT NULL,
  `password` varchar(50) NOT NULL DEFAULT '',
  `title` varchar(50) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 正在导出表  mini_blog.Post 的数据：~2 rows (大约)
/*!40000 ALTER TABLE `Post` DISABLE KEYS */;
INSERT INTO `Post` (`id`, `content`, `password`, `title`, `date`) VALUES
	(1, '编辑AboutMe作为第一篇文章和ABOUT界面的内容把\n', '', 'AboutMe', '2021-01-02');
/*!40000 ALTER TABLE `Post` ENABLE KEYS */;

-- 导出  表 mini_blog.Tag 结构
CREATE TABLE IF NOT EXISTS `Tag` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `postId` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


/*!40000 ALTER TABLE `Tag` DISABLE KEYS */;

/*!40000 ALTER TABLE `Tag` ENABLE KEYS */;

-- 导出  表 mini_blog.User 结构
CREATE TABLE IF NOT EXISTS `User` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `isAdmin` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


/*!40000 ALTER TABLE `User` DISABLE KEYS */;

/*!40000 ALTER TABLE `User` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
