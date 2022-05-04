-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 05, 2021 at 03:08 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `funlearn`
--

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `game_id` int(3) NOT NULL,
  `game_name` varchar(20) COLLATE utf8mb4_unicode_520_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`game_id`, `game_name`) VALUES
(1, 'Animals'),
(2, 'Fruits'),
(3, 'Shapes'),
(4, 'Colors');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(4) NOT NULL,
  `user_name` varchar(15) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `email` varchar(30) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `score` int(4) NOT NULL,
  `games_completed` varchar(200) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `language` varchar(15) COLLATE utf8mb4_unicode_520_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `email`, `password`, `score`, `games_completed`, `language`) VALUES
(3, 'err', 'err@gmail.com', '$2a$08$.pyvV7b9XF8l4RiV5IDdO.2EBcRgBtOc4JH0HkHCf7XIAHhPsaMn.', 0, '', 'English'),
(4, 'err2', 'err2@gmail.com', '$2a$08$AsrBZhmxn/rvOn6roMJus.jtwN3dYwbSiJu6ahQZjDzZm14WSqjz.', 115, '', 'English'),
(5, 'ed', 'ed@ed.com', '$2a$08$4y99oZQlv5yE47eAk2Wg1unM10.TtXdB/mfcrvmgyMCbawiyIdJ32', 40, '', 'English'),
(10, 'nbn2', 'nbn@nbn.com', '$2a$08$mkEMqon4lNHodRXqMIau1uFiTyD8O9wBKO2z0yHYy5Ebv2S..KlE2', 650, '', 'English'),
(11, 'ere', 'rerrr@ffff.com', '$2a$08$988YFeBQLCyNhriVlVNUE.xAYeYzX6uOD/Fuf.h7qXur7/xl/if6i', 0, '', 'English'),
(12, 'nw122', 'erree@gmail.com', '$2a$08$7Xzch9nVIxQ3kFXXXRHha.V42S0BX37FB9kbCtcs11/z0Zcyp8Cxa', 560, '', 'English'),
(13, 'ahmadyounis', 'ere2@gmail.com', '$2a$08$nlG4ak04SVc3cWEiELa3ve8mLLruZmq.jdW1FJttV8gqpxS/rP5Ve', 530, '', 'English');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`game_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `game_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
