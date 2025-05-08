-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 08, 2025 at 02:44 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

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
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `address_line1` varchar(255) NOT NULL,
  `address_line2` varchar(255) DEFAULT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `postal_code` varchar(20) NOT NULL,
  `country` varchar(100) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `addresses`
--

INSERT INTO `addresses` (`id`, `user_id`, `address_line1`, `address_line2`, `city`, `state`, `postal_code`, `country`, `phone_number`) VALUES
(2, 10, '112', '12', 'chon', 'chon', '1112', 'chon', '0123456789'),
(3, 13, '12', '34', '56', '48', '2222', 'thai', '191');

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `password`, `token`) VALUES
(3, 'admin', '$2b$10$PNuDxVyvljZIAi6vMbPkQOxlVw.LNNyPM06M3GvCT8rImyd9p5xgm', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyNTU0NzEyOCwiZXhwIjoxNzI1NTUwNzI4fQ.Thq0qTJBtQcPGe0UFv6xJIOezQme9_bFCzUw5FBkKUI');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `user_id` int(11) NOT NULL,
  `productId` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`user_id`, `productId`, `quantity`) VALUES
(9, '14', 1),
(10, '12', 1),
(10, '15', 1),
(10, '16', 1),
(10, '19', 1),
(13, '19', 2),
(14, '14', 1);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(6) UNSIGNED ZEROFILL NOT NULL COMMENT 'รหัสสินค้า',
  `pro_name` varchar(100) NOT NULL COMMENT 'ชื่อสินค้า',
  `type_id` varchar(3) NOT NULL COMMENT 'รหัสประเภทสินค้า',
  `price` float NOT NULL COMMENT 'ราคา',
  `amount` int(11) NOT NULL COMMENT 'จำนวนสินค้า',
  `image` varchar(100) NOT NULL COMMENT 'รูปภาพ',
  `pro_description` varchar(255) NOT NULL COMMENT 'Subtitle'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `pro_name`, `type_id`, `price`, `amount`, `image`, `pro_description`) VALUES
(000014, 'NewBalance 530', '4', 3500, 5, '1722220210427-Screenshot 2024-07-29 092901.png', 'รองเท้าดีที่คุณควรมี'),
(000015, 'Nilke Dunk low Panda', '4', 3700, 3, '1722223835894-Screenshot 2024-07-29 102925.png', 'เน้นใส่สบายเหมือนไม่ได้ใส่'),
(000016, 'Nike Men\'s Wearallday Shoes - White ไนกี้ รองเท้าผู้ชาย แวร์ออลเดย์ - สีขาว', '4', 2600, 7, '1722223886477-Screenshot 2024-07-29 103050.png', 'เน้นใส่ไม่เน้นสวย'),
(000017, 'โทรศัพท์เด็กเล่น', '1', 150, 8, '1722223990945-Screenshot 2024-07-29 103234.png', 'เน้นเล่นไม่เน้นโทร'),
(000018, 'OPPO A78 ', '2', 8900, 3, '1722224049898-Screenshot 2024-07-29 103339.png', 'สวยงามน่าใช้มากกกกกก'),
(000019, 'หมอนกอด', '3', 190, 5, '1722224148761-Screenshot 2024-07-29 103507.png', 'กอดหมอนนอนสบาย กอดคนขายสบายกว่า'),
(000020, 'ที่นอน รุ่นเออร์โกแพรคทิค - สีขาว/เทาเข้ม', '3', 5800, 1, '1722224204427-Screenshot 2024-07-29 103613.png', 'นอนสบายไม่อยากตื่น'),
(000021, 'เก้าอี้ขาว', '3', 199, 4, '1722309826750-Screenshot 2024-07-30 102307.png', 'เก้าอี้สีขาวตกแต่งห้องสวย'),
(000022, 'เก้าอี้สุดคลีน', '3', 299, 5, '1722310043383-Screenshot 2024-07-30 102653.png', 'สีครีมสุดสวย'),
(000023, 'เก้าอี้ทั่วไป', '1', 199, 8, '1722310613623-527C921A-07EA-4D8D-A230-DD12352A.jpg', 'นั่งสบายมากก'),
(000024, 'NewBalance 540', '3', 12000, 2, '1725029380727-8BBEBD5D-8B71-4F39-8767-4E3C2F116E1D.jpg', 'dffdf');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `date` datetime DEFAULT current_timestamp(),
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `user_id`, `amount`, `date`, `status`) VALUES
(5, 10, 272.00, '2024-07-28 18:05:27', 'ส่งสิ้นค้าสำเร็จ'),
(6, 10, 150.00, '2024-07-29 21:09:17', 'กำลังจัดเตรียมสินค้า'),
(7, 10, 3850.00, '2024-07-29 21:09:42', 'กำลังจัดเตรียมสินค้า'),
(8, 10, 199.00, '2024-07-30 14:47:28', 'pending'),
(9, 10, 5800.00, '2024-07-30 14:51:53', 'ส่งสิ้นค้าสำเร็จ'),
(10, 10, 199.00, '2024-07-30 18:25:27', 'ส่งสิ้นค้าสำเร็จ'),
(11, 10, 597.00, '2024-07-31 10:08:10', 'pending'),
(12, 13, 3700.00, '2024-07-31 11:46:57', 'จัดส่งสินค้า'),
(13, 10, 2600.00, '2024-08-01 12:34:58', 'กำลังจัดเตรียมสินค้า'),
(14, 13, 190.00, '2024-09-05 21:30:23', 'จัดส่งสินค้า'),
(15, 13, 380.00, '2024-09-05 21:31:04', 'จัดส่งสินค้า');

-- --------------------------------------------------------

--
-- Table structure for table `transaction_items`
--

CREATE TABLE `transaction_items` (
  `id` int(11) NOT NULL,
  `transaction_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `pro_name` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaction_items`
--

INSERT INTO `transaction_items` (`id`, `transaction_id`, `product_id`, `pro_name`, `quantity`, `price`, `image`) VALUES
(7, 9, 20, 'ที่นอน รุ่นเออร์โกแพรคทิค - สีขาว/เทาเข้ม', 1, 5800.00, '1722224204427-Screenshot 2024-07-29 103613.png'),
(8, 10, 23, 'เก้าอี้ทั่วไป', 1, 199.00, '1722310613623-527C921A-07EA-4D8D-A230-DD12352A.jpg'),
(9, 11, 23, 'เก้าอี้ทั่วไป', 3, 199.00, '1722310613623-527C921A-07EA-4D8D-A230-DD12352A.jpg'),
(10, 12, 15, 'Nilke Dunk low Panda', 1, 3700.00, '1722223835894-Screenshot 2024-07-29 102925.png'),
(11, 13, 16, 'Nike Men\'s Wearallday Shoes - White ไนกี้ รองเท้าผู้ชาย แวร์ออลเดย์ - สีขาว', 1, 2600.00, '1722223886477-Screenshot 2024-07-29 103050.png'),
(12, 14, 19, 'หมอนกอด', 1, 190.00, '1722224148761-Screenshot 2024-07-29 103507.png'),
(13, 15, 19, 'หมอนกอด', 2, 190.00, '1722224148761-Screenshot 2024-07-29 103507.png');

-- --------------------------------------------------------

--
-- Table structure for table `type`
--

CREATE TABLE `type` (
  `type_id` int(3) UNSIGNED ZEROFILL NOT NULL COMMENT 'รหัสประเภทสินค้า',
  `type_name` varchar(50) NOT NULL COMMENT 'ชื่อประเภทสินค้า'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `type`
--

INSERT INTO `type` (`type_id`, `type_name`) VALUES
(001, 'สินค้าทั่วไป'),
(002, 'Electronic'),
(003, 'ตกแต่งห้อง'),
(004, 'สวมใส่');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
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

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `verified`, `verification_token`, `reset_token`, `created_at`) VALUES
(8, '0', 'testuser@example.com', '$2b$10$D0SvknWY9OhL/dUlGvB/3.Pt7kHpAWBYUXN4qoo4TC70wMeQjoaD.', 'member', 1, NULL, NULL, '2024-06-23 08:09:13'),
(9, '0', 'wave@gmail.com', '$2b$10$cM.96luUqYbPH6J0QO0Aue0HYcyVYa17VQhb1SrdLw5SEMMWg46qq', 'member', 1, NULL, NULL, '2024-06-23 08:11:02'),
(10, 'fern', 'fern@gmail.com', '$2b$10$rI25agA0RkjDXw0/Tv.9mOVFmlsaVQdXoxsf.fTolz1JcXjUtOFo2', 'member', 1, NULL, NULL, '2024-06-23 08:12:41'),
(11, '0', '65160143@gmail.com', '$2b$10$teTuf1CpU26W.YI42qDjLe6J/0TukOuuvm4dRF47Z.gs1rdFXXgo6', 'member', 1, NULL, NULL, '2024-07-24 09:14:13'),
(12, 'JIK', 'JIK@gmail.com', '$2b$10$5ozqAEAj3D5TbuiVDd8g7OzM2HWS7RYafP7yvYMppB10UM3FVCoa6', 'member', 1, NULL, NULL, '2024-07-30 07:06:06'),
(13, 'zinevabe', 'wavexomox@gmail.com', '$2b$10$tdY951WYXmX9jzd9Opzi3.p8f4vDtsHxmMCsPWhfi2yzxIwu8xS72', 'member', 1, NULL, NULL, '2024-07-31 04:45:30'),
(14, 'view2250', 'view2250@gmail.com', '$2b$10$ipWvT1dSaawYME8a47/jSO3vPsRc7C1yQWExD4kLmcPCmAIXP/X8G', 'member', 1, NULL, NULL, '2024-09-08 10:58:55');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`user_id`,`productId`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `transaction_items`
--
ALTER TABLE `transaction_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transaction_id` (`transaction_id`);

--
-- Indexes for table `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`type_id`);

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
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(6) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT COMMENT 'รหัสสินค้า', AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `transaction_items`
--
ALTER TABLE `transaction_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `type`
--
ALTER TABLE `type`
  MODIFY `type_id` int(3) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT COMMENT 'รหัสประเภทสินค้า', AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `transaction_items`
--
ALTER TABLE `transaction_items`
  ADD CONSTRAINT `transaction_items_ibfk_1` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
