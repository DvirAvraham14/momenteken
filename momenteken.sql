-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: May 07, 2023 at 12:28 PM
-- Server version: 5.7.39
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `momenteken`
--

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `id` int(11) NOT NULL,
  `company_name` varchar(20) NOT NULL,
  `city` varchar(20) NOT NULL,
  `zip_code` varchar(10) NOT NULL,
  `street` varchar(30) NOT NULL,
  `house_number` varchar(3) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `fax` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `company_manager`
--

CREATE TABLE `company_manager` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `manager_id` int(11) NOT NULL,
  `address` varchar(20) NOT NULL,
  `remarks` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `Foremen`
--

CREATE TABLE `Foremen` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `id_number` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `appointment_date` date DEFAULT NULL,
  `termination_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `LiftingMachineOperators`
--

CREATE TABLE `LiftingMachineOperators` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `id_number` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `appointment_date` date DEFAULT NULL,
  `signature` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `LiftTowerOperators`
--

CREATE TABLE `LiftTowerOperators` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `id_number` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `appointment_date` date DEFAULT NULL,
  `signature` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ProfessionalBuilders`
--

CREATE TABLE `ProfessionalBuilders` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `id_number` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `appointment_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `site`
--

CREATE TABLE `site` (
  `id` int(11) NOT NULL,
  `site_name` varchar(255) NOT NULL,
  `promoter_id` int(11) DEFAULT NULL,
  `operator_id` int(11) DEFAULT NULL,
  `operator_stamp` varchar(255) DEFAULT NULL,
  `operator_signature` varchar(255) DEFAULT NULL,
  `max_employees` int(10) NOT NULL,
  `work_type` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `promoter_id` (`promoter_id`),
  KEY `operator_id` (`operator_id`),
  CONSTRAINT `site_ibfk_1` FOREIGN KEY (`promoter_id`) REFERENCES `company` (`id`),
  CONSTRAINT `site_ibfk_2` FOREIGN KEY (`operator_id`) REFERENCES `company` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `Subcontractors`
--

CREATE TABLE `Subcontractors` (
  `id` int(11) NOT NULL,
  `site_id` int(11) NOT NULL,
  `work_type` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `person_in_charge` varchar(255) DEFAULT NULL,
  `start_of_work` date DEFAULT NULL,
  `signature` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `site_id` (`site_id`),
  CONSTRAINT `subcontractors_ibfk_1` FOREIGN KEY (`site_id`) REFERENCES `site` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Auto-generated indexes for dumped tables
--

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `company_manager`
--
ALTER TABLE `company_manager`
  ADD PRIMARY KEY (`id`),
  ADD KEY `company_id` (`company_id`);

--
-- Indexes for table `Foremen`
--
ALTER TABLE `Foremen`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `LiftingMachineOperators`
--
ALTER TABLE `LiftingMachineOperators`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `LiftTowerOperators`
--
ALTER TABLE `LiftTowerOperators`
  ADD PRIMARY KEY (`id`);

 -- Indexes for table `ProfessionalBuilders`
 --
 ALTER TABLE `ProfessionalBuilders`
   ADD PRIMARY KEY (`id`);

 --
 -- Indexes for table `site`
 --
 ALTER TABLE `site`
   ADD PRIMARY KEY (`id`),
   ADD KEY `promoter_id` (`promoter_id`),
   ADD KEY `operator_id` (`operator_id`),
   ADD CONSTRAINT `site_ibfk_1` FOREIGN KEY (`promoter_id`) REFERENCES `company` (`id`),
   ADD CONSTRAINT `site_ibfk_2` FOREIGN KEY (`operator_id`) REFERENCES `company` (`id`);

 --
 -- Indexes for table `Subcontractors`
 --
 ALTER TABLE `Subcontractors`
   ADD PRIMARY KEY (`id`),
   ADD KEY `site_id` (`site_id`),
   ADD CONSTRAINT `subcontractors_ibfk_1` FOREIGN KEY (`site_id`) REFERENCES `site` (`id`);

 --
 -- Auto-increment values for tables
 --

 --
 -- Auto-increment values for table `company`
 --
 ALTER TABLE `company`
   MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

 --
 -- Auto-increment values for table `company_manager`
 --
 ALTER TABLE `company_manager`
   MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

 --
 -- Auto-increment values for table `Foremen`
 --
 ALTER TABLE `Foremen`
   MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

 --
 -- Auto-increment values for table `LiftingMachineOperators`
 --
 ALTER TABLE `LiftingMachineOperators`
   MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

 --
 -- Auto-increment values for table `LiftTowerOperators`
 --
 ALTER TABLE `LiftTowerOperators`
   MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

 --
 -- Auto-increment values for table `ProfessionalBuilders`
 --
 ALTER TABLE `ProfessionalBuilders`
   MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

 --
 -- Auto-increment values for table `site`
 --
 ALTER TABLE `site`
   MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

 --
 -- Auto-increment values for table `Subcontractors`
 --
 ALTER TABLE `Subcontractors`
   MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

