-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- HÃ´te : 127.0.0.1
-- GÃ©nÃ©rÃ© le : mer. 25 jan. 2023 Ã  20:52
-- Version du serveur : 10.4.24-MariaDB
-- Version de PHP : 8.1.6

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de donnÃ©es : `kosc`
--

-- --------------------------------------------------------

CREATE TABLE `chercheur` (
                             `id` bigint(20) NOT NULL,
                             `account_non_expired` bit(1) NOT NULL,
                             `account_non_locked` bit(1) NOT NULL,
                             `created_at` date DEFAULT NULL,
                             `credentials_non_expired` bit(1) NOT NULL,
                             `email` varchar(255) DEFAULT NULL,
                             `enabled` bit(1) NOT NULL,
                             `nom` varchar(255) DEFAULT NULL,
                             `password` varchar(255) DEFAULT NULL,
                             `password_changed` bit(1) NOT NULL,
                             `prenom` varchar(255) DEFAULT NULL,
                             `telephone` varchar(255) DEFAULT NULL,
                             `updated_at` date DEFAULT NULL,
                             `username` varchar(255) DEFAULT NULL,
                             `numero_matricule` varchar(500) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

CREATE TABLE `permission` (
                              `id` bigint(20) NOT NULL,
                              `name` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
--
-- Structure de la table `roles_permissions`
--

CREATE TABLE `roles_permissions` (
                                     `role_id` bigint(20) NOT NULL,
                                     `permission_id` bigint(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `role_app`
--

CREATE TABLE `role_app` (
                            `id` bigint(20) NOT NULL,
                            `authority` varchar(255) DEFAULT NULL,
                            `created_at` datetime DEFAULT NULL,
                            `updated_at` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `source_replanification`
--


--
-- Structure de la table `users_roles`
--

CREATE TABLE `users_roles` (
                               `user_id` bigint(20) NOT NULL,
                               `role_id` bigint(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `user_app`
--

CREATE TABLE `user_app` (
                            `id` bigint(20) NOT NULL,
                            `account_non_expired` bit(1) NOT NULL,
                            `account_non_locked` bit(1) NOT NULL,
                            `created_at` date DEFAULT NULL,
                            `credentials_non_expired` bit(1) NOT NULL,
                            `email` varchar(255) DEFAULT NULL,
                            `enabled` bit(1) NOT NULL,
                            `nom` varchar(255) DEFAULT NULL,
                            `password` varchar(255) DEFAULT NULL,
                            `password_changed` bit(1) NOT NULL,
                            `prenom` varchar(255) DEFAULT NULL,
                            `telephone` varchar(255) DEFAULT NULL,
                            `updated_at` date DEFAULT NULL,
                            `username` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Index pour les tables dÃ©chargÃ©es
--
-- Index pour la table `chercheur`
--
ALTER TABLE `chercheur`
    ADD PRIMARY KEY (`id`);

--
-- Index pour la table `default_template_configuration`
--
--
ALTER TABLE `permission`
    ADD PRIMARY KEY (`id`);

--
ALTER TABLE `roles_permissions`
    ADD KEY `FKboeuhl31go7wer3bpy6so7exi` (`permission_id`),
  ADD KEY `FK3q3rt3at2wf4ooe7npa3et6yb` (`role_id`);

--
-- Index pour la table `role_app`
--
ALTER TABLE `role_app`
    ADD PRIMARY KEY (`id`);

--
--
-- Index pour la table `users_roles`
--
ALTER TABLE `users_roles`
    ADD KEY `FK4e8pdqeupv69eukb2bvy2ftbd` (`role_id`);

--
-- Index pour la table `user_app`
--
ALTER TABLE `user_app`
    ADD PRIMARY KEY (`id`);
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
