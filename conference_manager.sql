-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 08, 2019 at 06:03 AM
-- Server version: 10.1.35-MariaDB
-- PHP Version: 7.2.9
-- delete all tables
-- DROP TABLE `user_schedule`, `user_conference`, `messages`, `event`, `conference`, `user_accounts`, `admin_accounts`;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `conference_manager`
--

-- --------------------------------------------------------

--
-- Table structure for table `conference`
--

CREATE TABLE `conference` (
  `conference_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `conference_name` varchar(60) NOT NULL,
  `conference_venue` varchar(100) NOT NULL,
  `conference_street` varchar(100) NOT NULL,
  `conference_city` varchar(100) NOT NULL,
  `conference_state` varchar(100) NOT NULL,
  `conference_postalcode` varchar(10) NOT NULL,
  `conference_country` varchar(100) NOT NULL,
  `conference_startdate` date  NOT NULL,
  `conference_enddate` date NOT NULL,
  `conference_amenities` varchar(100) NOT NULL,
  `conference_wheelchair` tinyint(1) NOT NULL,
  `conference_facilitydesc` varchar(1000) NOT NULL,
  `conference_desc` varchar(1000) NOT NULL,
  `conference_contactemail` varchar(60) NOT NULL,
  `conference_contactphone` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `event_id` int(11) NOT NULL,
  `conference_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `event_name` varchar(200) NOT NULL,
  `event_starttime` time NOT NULL,
  `event_endtime` time NOT NULL,
  `event_room` varchar(60) NOT NULL,
  `event_floor` varchar(60) NOT NULL,
  `event_building` varchar(60) NOT NULL,
  `event_speakers` varchar(300) NOT NULL,
  `event_desc` varchar(2000) NOT NULL,
  `event_wheelchair` tinyint(1) NOT NULL,
  `event_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_accounts`
--

CREATE TABLE `user_accounts` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(30) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_email` varchar(60) NOT NULL,
  `user_phone` varchar(10) NOT NULL,
  `user_phoneCarrier` varchar(50) NOT NULL,
  `user_notifyByEmail` tinyint(1) NOT NULL,
  `user_notifyByPhone` tinyint(1) NOT NULL,
  `user_failed_login_count` int(2) DEFAULT 0,
  `user_first_failed_login` int(11) DEFAULT 0,
  `user_forgot_password_token` varchar(255) DEFAULT null,
  `user_forgot_password_experation` int(11) DEFAULT 0,
  `user_created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `admin_accounts`
--

CREATE TABLE `admin_accounts` (
  `admin_id` int(11) NOT NULL,
  `admin_name` varchar(30) NOT NULL,
  `admin_password` varchar(255) NOT NULL,
  `admin_email` varchar(255) NOT NULL,
  `admin_failed_login_count` int(2) DEFAULT 0,
  `admin_first_failed_login` int(11) DEFAULT 0,
  `admin_forgot_password_token` varchar(255) DEFAULT null,
  `admin_forgot_password_experation` int(11) DEFAULT 0,
  `admin_created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `conference_id` int(11) NOT NULL,
  `message_recipients` varchar(255) NOT NULL,
  `message_subject` int(2) DEFAULT 0,
  `message_body` int(11) DEFAULT 0,
  `message_created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_conference`
--

CREATE TABLE `user_conference` (
  `user_id` int(11) NOT NULL,
  `conference_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_schedule`
--

CREATE TABLE `user_schedule` (
  `user_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `conference_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `conference`
--
ALTER TABLE `conference`
  ADD PRIMARY KEY (`conference_id`),
  ADD UNIQUE KEY `conference_name` (`conference_name`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`event_id`);

--
-- Indexes for table `user_accounts`
--
ALTER TABLE `user_accounts`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_name` (`user_name`),
  ADD UNIQUE KEY `user_email` (`user_email`);

--
-- Indexes for table `admin_accounts`
--
ALTER TABLE `admin_accounts`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `admin_name` (`admin_name`),
  ADD UNIQUE KEY `admin_email` (`admin_email`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`message_id`);

--
-- Indexes for table `user_conference`
--
ALTER TABLE `user_conference`
    ADD PRIMARY KEY(`user_id`, `conference_id`);

--
-- Indexes for table `user_schedule`
--
ALTER TABLE `user_schedule`
  ADD PRIMARY KEY(`user_id`, `conference_id`, `event_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `conference`
--
ALTER TABLE `conference`
  MODIFY `conference_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `conference`
  AUTO_INCREMENT=1001;

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `event`
  AUTO_INCREMENT=321;

--
-- AUTO_INCREMENT for table `user_accounts`
--
ALTER TABLE `user_accounts`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `user_accounts`
  AUTO_INCREMENT=1372;

--
-- AUTO_INCREMENT for table `admin_accounts`
--
ALTER TABLE `admin_accounts`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `admin_accounts`
  AUTO_INCREMENT=1108;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `messages`
  AUTO_INCREMENT=3781;
COMMIT;

--
-- foreign keys 
--

-- set table messages foreign keys --
ALTER TABLE `messages`
  ADD FOREIGN KEY (admin_id) REFERENCES admin_accounts(admin_id),
  ADD FOREIGN KEY (conference_id) REFERENCES conference(conference_id);

-- set table conference foreign keys --
ALTER TABLE `conference`
  ADD FOREIGN KEY (admin_id) REFERENCES admin_accounts(admin_id);

-- set table event foreign keys --
ALTER TABLE `event`
  ADD FOREIGN KEY (conference_id) REFERENCES conference(conference_id),
  ADD FOREIGN KEY (admin_id) REFERENCES admin_accounts(admin_id);

-- set table user_conference foreign keys --
ALTER TABLE `user_conference`
  ADD FOREIGN KEY (user_id) REFERENCES user_accounts(user_id),
  ADD FOREIGN KEY (conference_id) REFERENCES conference(conference_id);

-- set table user_schedule foreign keys --
ALTER TABLE `user_schedule`
  ADD FOREIGN KEY (user_id) REFERENCES user_accounts(user_id),
  ADD FOREIGN KEY (event_id) REFERENCES event(event_id),
  ADD FOREIGN KEY (conference_id) REFERENCES conference(conference_id);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
