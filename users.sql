-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 14, 2024 at 02:57 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `restapi`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'member',
  `verified` tinyint(1) NOT NULL DEFAULT 0,
  `verification_token` varchar(255) DEFAULT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `role`, `verified`, `verification_token`, `reset_token`, `created_at`) VALUES
(1, 'test@example.com', '$2b$10$HOitNMJF1IkojzAQxZLAoOnXu6KivovlB5Yb7aD2vzX1MEzfFnzbi', 'member', 0, 'd4a3f9745ba04990c1068314ec01ca4acf9960b1', 'f1c0a907f1ddb743b7b2773729fb1bdab580914f', '2024-06-14 09:14:50'),
(4, '65160143@go.buu.ac.th', '$2b$10$UHaW0p6WkBucsbFoKMYuDeDOQvJgNasmN.29pAGiHAPvxBt5SbLxq', 'member', 0, 'b66b8aa49bbffa2f16b3d7977bb279cc96431faa', NULL, '2024-06-14 10:03:07'),
(5, 'TestT@gmail.com', '$2b$10$Xi6bKV9ZAZqsl7LsNdH5u.KrzihA6i0icKaAKd16Kb4L.hwoiewkm', 'member', 1, NULL, NULL, '2024-06-14 12:24:00'),
(6, 'Test@gmail.com', '$2b$10$tuhbnXKFdi1p13ACiGCF0u6frGJQLSFguJO2IKWx23Abfc0Cd2lYC', 'member', 1, NULL, NULL, '2024-06-14 12:27:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;