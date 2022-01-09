-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Jan 09, 2022 at 11:40 PM
-- Server version: 5.7.34
-- PHP Version: 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `temp`
--

-- --------------------------------------------------------

--
-- Table structure for table `auctions`
--

CREATE TABLE `auctions` (
  `contract_address_fk` varchar(255) NOT NULL,
  `token_id_fk` int(11) NOT NULL,
  `price` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `mint-contracts`
--

CREATE TABLE `mint-contracts` (
  `address` varchar(255) NOT NULL,
  `chainId` smallint(6) NOT NULL,
  `name` varchar(255) NOT NULL,
  `symbol` varchar(255) NOT NULL,
  `submit_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `approved` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `mint-contracts`
--

INSERT INTO `mint-contracts` (`address`, `chainId`, `name`, `symbol`, `submit_date`, `approved`) VALUES
('0x89C627dE4643764Ab95bEbB9e6F75876084F1c10', 1337, 'mint', 'NFT-platform', '2022-01-03 00:41:30', 1);

-- --------------------------------------------------------

--
-- Table structure for table `purchases`
--

CREATE TABLE `purchases` (
  `purchase_id` bigint(20) NOT NULL,
  `token_id` bigint(20) NOT NULL,
  `buyer` varchar(255) NOT NULL,
  `seller` varchar(255) NOT NULL,
  `timestamp` varchar(255) NOT NULL,
  `contract_address` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `contract_address_fk` varchar(255) NOT NULL,
  `token_id` int(11) NOT NULL,
  `token_uri` varchar(1000) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `image` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `token_traits`
--

CREATE TABLE `token_traits` (
  `id` bigint(20) NOT NULL,
  `trait_fk` bigint(20) NOT NULL,
  `trait_value` varchar(255) NOT NULL,
  `token_id_fk` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `traits`
--

CREATE TABLE `traits` (
  `contract_address_fk` varchar(255) NOT NULL,
  `trait_type` varchar(255) NOT NULL,
  `trait_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auctions`
--
ALTER TABLE `auctions`
  ADD PRIMARY KEY (`contract_address_fk`,`token_id_fk`);

--
-- Indexes for table `mint-contracts`
--
ALTER TABLE `mint-contracts`
  ADD PRIMARY KEY (`address`);

--
-- Indexes for table `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`purchase_id`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token_id` (`token_id`);

--
-- Indexes for table `token_traits`
--
ALTER TABLE `token_traits`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `traits`
--
ALTER TABLE `traits`
  ADD PRIMARY KEY (`trait_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `purchases`
--
ALTER TABLE `purchases`
  MODIFY `purchase_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `token_traits`
--
ALTER TABLE `token_traits`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `traits`
--
ALTER TABLE `traits`
  MODIFY `trait_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
