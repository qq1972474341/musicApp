-- phpMyAdmin SQL Dump
-- version 4.4.15.10
-- https://www.phpmyadmin.net
--
-- Host: 127.0.0.1:3306
-- Generation Time: 2020-03-23 12:19:57
-- 服务器版本： 5.7.27
-- PHP Version: 5.4.45

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `qm_music`
--

-- --------------------------------------------------------

--
-- 表的结构 `qm_user`
--

CREATE TABLE IF NOT EXISTS `qm_user` (
  `id` int(11) unsigned NOT NULL,
  `nickName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户昵称',
  `openid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatarUrl` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `playNum` int(11) NOT NULL COMMENT '播放点数',
  `create_time` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 转存表中的数据 `qm_user`
--

INSERT INTO `qm_user` (`id`, `nickName`, `openid`, `avatarUrl`, `playNum`, `create_time`) VALUES
(1, '', 'oRrdQtyRb_pW50wZFSUnN6h4DFls', 'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqDXeiceHaqAMbtWT1G3POibJ51sXQRGxebOIuYP2bg6hia5SfqT9lTVZuBXY8DUr8ua5rfib2Mf7FeOQ/132', 15, 1584936710);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `qm_user`
--
ALTER TABLE `qm_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `qm_user`
--
ALTER TABLE `qm_user`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
