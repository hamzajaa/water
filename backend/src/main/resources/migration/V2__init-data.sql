-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- HÃ´te : 127.0.0.1
-- GÃ©nÃ©rÃ© le : mer. 07 dÃ©c. 2022 Ã  12:12
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
--
-- DÃƒÂ©chargement des donnÃƒÂ©es de la table `ordre_kosc_seq`
--

INSERT INTO `chercheur` (`id`, `account_non_expired`, `account_non_locked`, `created_at`, `credentials_non_expired`, `email`, `enabled`, `nom`, `password`, `password_changed`, `prenom`, `updated_at`, `username`, `numero_matricule`, `telephone`) VALUES
    (129, b'1', b'1', '2022-09-25 15:54:47', b'1', 'chercheur', b'1', NULL, '$2a$10$aEQ79HUMED.kUn0rkTUbsOdy/1qubJ9D5KinthQRqyw/3wX5lmnha', b'0', NULL, NULL, NULL, NULL, NULL);

--
-- DÃ©chargement des donnÃ©es de la table `default_template_configuration`
--

--

INSERT INTO `hibernate_sequence` (`next_val`) VALUES
    (130);

--
-- DÃ©chargement des donnÃ©es de la table `jour_ferie`
--

INSERT INTO `permission` (`id`, `name`) VALUES
                                            (1, 'CauseKoOk.edit'),
                                            (2, 'CauseKoOk.list'),
                                            (3, 'CauseKoOk.view'),
                                            (4, 'CauseKoOk.add'),
                                            (5, 'CauseKoOk.delete'),
                                            (6, 'TemplateEmailFtl.edit'),
                                            (7, 'TemplateEmailFtl.list'),
                                            (8, 'TemplateEmailFtl.view'),
                                            (9, 'TemplateEmailFtl.add'),
                                            (10, 'TemplateEmailFtl.delete'),
                                            (11, 'EtatDemandeKosc.edit'),
                                            (12, 'EtatDemandeKosc.list'),
                                            (13, 'EtatDemandeKosc.view'),
                                            (14, 'EtatDemandeKosc.add'),
                                            (15, 'EtatDemandeKosc.delete'),
                                            (16, 'TemplateEmailMauvaisContact.edit'),
                                            (17, 'TemplateEmailMauvaisContact.list'),
                                            (18, 'TemplateEmailMauvaisContact.view'),
                                            (19, 'TemplateEmailMauvaisContact.add'),
                                            (20, 'TemplateEmailMauvaisContact.delete'),
                                            (21, 'Chercheur.edit'),
                                            (22, 'Chercheur.list'),
                                            (23, 'Chercheur.view'),
                                            (24, 'Chercheur.add'),
                                            (25, 'Chercheur.delete'),
                                            (26, 'TemplateEmailRefus.edit'),
                                            (27, 'TemplateEmailRefus.list'),
                                            (28, 'TemplateEmailRefus.view'),
                                            (29, 'TemplateEmailRefus.add'),
                                            (30, 'TemplateEmailRefus.delete'),
                                            (31, 'Technicien.edit'),
                                            (32, 'Technicien.list'),
                                            (33, 'Technicien.view'),
                                            (34, 'Technicien.add'),
                                            (35, 'Technicien.delete'),
                                            (36, 'SourceReplanification.edit'),
                                            (37, 'SourceReplanification.list'),
                                            (38, 'SourceReplanification.view'),
                                            (39, 'SourceReplanification.add'),
                                            (40, 'SourceReplanification.delete'),
                                            (41, 'TemplateEmailConfirmationClient.edit'),
                                            (42, 'TemplateEmailConfirmationClient.list'),
                                            (43, 'TemplateEmailConfirmationClient.view'),
                                            (44, 'TemplateEmailConfirmationClient.add'),
                                            (45, 'TemplateEmailConfirmationClient.delete'),
                                            (46, 'TemplateEmailReplanification.edit'),
                                            (47, 'TemplateEmailReplanification.list'),
                                            (48, 'TemplateEmailReplanification.view'),
                                            (49, 'TemplateEmailReplanification.add'),
                                            (50, 'TemplateEmailReplanification.delete'),
                                            (51, 'TemplateEmailCloture.edit'),
                                            (52, 'TemplateEmailCloture.list'),
                                            (53, 'TemplateEmailCloture.view'),
                                            (54, 'TemplateEmailCloture.add'),
                                            (55, 'TemplateEmailCloture.delete'),
                                            (56, 'TemplateEmailClientInjoinableKosc.edit'),
                                            (57, 'TemplateEmailClientInjoinableKosc.list'),
                                            (58, 'TemplateEmailClientInjoinableKosc.view'),
                                            (59, 'TemplateEmailClientInjoinableKosc.add'),
                                            (60, 'TemplateEmailClientInjoinableKosc.delete'),
                                            (61, 'TemplateEmailPlanification.edit'),
                                            (62, 'TemplateEmailPlanification.list'),
                                            (63, 'TemplateEmailPlanification.view'),
                                            (64, 'TemplateEmailPlanification.add'),
                                            (65, 'TemplateEmailPlanification.delete'),
                                            (66, 'ArretTravail.edit'),
                                            (67, 'ArretTravail.list'),
                                            (68, 'ArretTravail.view'),
                                            (69, 'ArretTravail.add'),
                                            (70, 'ArretTravail.delete'),
                                            (71, 'Departement.edit'),
                                            (72, 'Departement.list'),
                                            (73, 'Departement.view'),
                                            (74, 'Departement.add'),
                                            (75, 'Departement.delete'),
                                            (76, 'RaisonArretTravail.edit'),
                                            (77, 'RaisonArretTravail.list'),
                                            (78, 'RaisonArretTravail.view'),
                                            (79, 'RaisonArretTravail.add'),
                                            (80, 'RaisonArretTravail.delete'),
                                            (81, 'TemplateEmailReport.edit'),
                                            (82, 'TemplateEmailReport.list'),
                                            (83, 'TemplateEmailReport.view'),
                                            (84, 'TemplateEmailReport.add'),
                                            (85, 'TemplateEmailReport.delete'),
                                            (86, 'TemplateSuivi.edit'),
                                            (87, 'TemplateSuivi.list'),
                                            (88, 'TemplateSuivi.view'),
                                            (89, 'TemplateSuivi.add'),
                                            (90, 'TemplateSuivi.delete'),
                                            (91, 'DepartementTechnicien.edit'),
                                            (92, 'DepartementTechnicien.list'),
                                            (93, 'DepartementTechnicien.view'),
                                            (94, 'DepartementTechnicien.add'),
                                            (95, 'DepartementTechnicien.delete'),
                                            (96, 'TemplateEmailClientInjoinable.edit'),
                                            (97, 'TemplateEmailClientInjoinable.list'),
                                            (98, 'TemplateEmailClientInjoinable.view'),
                                            (99, 'TemplateEmailClientInjoinable.add'),
                                            (100, 'TemplateEmailClientInjoinable.delete'),
                                            (101, 'Region.edit'),
                                            (102, 'Region.list'),
                                            (103, 'Region.view'),
                                            (104, 'Region.add'),
                                            (105, 'Region.delete'),
                                            (106, 'Operator.edit'),
                                            (107, 'Operator.list'),
                                            (108, 'Operator.view'),
                                            (109, 'Operator.add'),
                                            (110, 'Operator.delete'),
                                            (111, 'TemplateEmailCri.edit'),
                                            (112, 'TemplateEmailCri.list'),
                                            (113, 'TemplateEmailCri.view'),
                                            (114, 'TemplateEmailCri.add'),
                                            (115, 'TemplateEmailCri.delete'),
                                            (116, 'Entreprise.edit'),
                                            (117, 'Entreprise.list'),
                                            (118, 'Entreprise.view'),
                                            (119, 'Entreprise.add'),
                                            (120, 'Entreprise.delete'),
                                            (121, 'OrdreKosc.edit'),
                                            (122, 'OrdreKosc.list'),
                                            (123, 'OrdreKosc.view'),
                                            (124, 'OrdreKosc.add'),
                                            (125, 'OrdreKosc.delete');

--
-- DÃ©chargement des donnÃ©es de la table `raison_arret_travail`
--

INSERT INTO `roles_permissions` (`role_id`, `permission_id`) VALUES
                                                                 (126, 1),
                                                                 (126, 2),
                                                                 (126, 3),
                                                                 (126, 4),
                                                                 (126, 5),
                                                                 (126, 6),
                                                                 (126, 7),
                                                                 (126, 8),
                                                                 (126, 9),
                                                                 (126, 10),
                                                                 (126, 11),
                                                                 (126, 12),
                                                                 (126, 13),
                                                                 (126, 14),
                                                                 (126, 15),
                                                                 (126, 16),
                                                                 (126, 17),
                                                                 (126, 18),
                                                                 (126, 19),
                                                                 (126, 20),
                                                                 (126, 21),
                                                                 (126, 22),
                                                                 (126, 23),
                                                                 (126, 24),
                                                                 (126, 25),
                                                                 (126, 26),
                                                                 (126, 27),
                                                                 (126, 28),
                                                                 (126, 29),
                                                                 (126, 30),
                                                                 (126, 31),
                                                                 (126, 32),
                                                                 (126, 33),
                                                                 (126, 34),
                                                                 (126, 35),
                                                                 (126, 36),
                                                                 (126, 37),
                                                                 (126, 38),
                                                                 (126, 39),
                                                                 (126, 40),
                                                                 (126, 41),
                                                                 (126, 42),
                                                                 (126, 43),
                                                                 (126, 44),
                                                                 (126, 45),
                                                                 (126, 46),
                                                                 (126, 47),
                                                                 (126, 48),
                                                                 (126, 49),
                                                                 (126, 50),
                                                                 (126, 51),
                                                                 (126, 52),
                                                                 (126, 53),
                                                                 (126, 54),
                                                                 (126, 55),
                                                                 (126, 56),
                                                                 (126, 57),
                                                                 (126, 58),
                                                                 (126, 59),
                                                                 (126, 60),
                                                                 (126, 61),
                                                                 (126, 62),
                                                                 (126, 63),
                                                                 (126, 64),
                                                                 (126, 65),
                                                                 (126, 66),
                                                                 (126, 67),
                                                                 (126, 68),
                                                                 (126, 69),
                                                                 (126, 70),
                                                                 (126, 71),
                                                                 (126, 72),
                                                                 (126, 73),
                                                                 (126, 74),
                                                                 (126, 75),
                                                                 (126, 76),
                                                                 (126, 77),
                                                                 (126, 78),
                                                                 (126, 79),
                                                                 (126, 80),
                                                                 (126, 81),
                                                                 (126, 82),
                                                                 (126, 83),
                                                                 (126, 84),
                                                                 (126, 85),
                                                                 (126, 86),
                                                                 (126, 87),
                                                                 (126, 88),
                                                                 (126, 89),
                                                                 (126, 90),
                                                                 (126, 91),
                                                                 (126, 92),
                                                                 (126, 93),
                                                                 (126, 94),
                                                                 (126, 95),
                                                                 (126, 96),
                                                                 (126, 97),
                                                                 (126, 98),
                                                                 (126, 99),
                                                                 (126, 100),
                                                                 (126, 101),
                                                                 (126, 102),
                                                                 (126, 103),
                                                                 (126, 104),
                                                                 (126, 105),
                                                                 (126, 106),
                                                                 (126, 107),
                                                                 (126, 108),
                                                                 (126, 109),
                                                                 (126, 110),
                                                                 (126, 111),
                                                                 (126, 112),
                                                                 (126, 113),
                                                                 (126, 114),
                                                                 (126, 115),
                                                                 (126, 116),
                                                                 (126, 117),
                                                                 (126, 118),
                                                                 (126, 119),
                                                                 (126, 120),
                                                                 (126, 121),
                                                                 (126, 122),
                                                                 (126, 123),
                                                                 (126, 124),
                                                                 (126, 125),
                                                                 (128, 1),
                                                                 (128, 2),
                                                                 (128, 3),
                                                                 (128, 4),
                                                                 (128, 5),
                                                                 (128, 6),
                                                                 (128, 7),
                                                                 (128, 8),
                                                                 (128, 9),
                                                                 (128, 10),
                                                                 (128, 11),
                                                                 (128, 12),
                                                                 (128, 13),
                                                                 (128, 14),
                                                                 (128, 15),
                                                                 (128, 16),
                                                                 (128, 17),
                                                                 (128, 18),
                                                                 (128, 19),
                                                                 (128, 20),
                                                                 (128, 21),
                                                                 (128, 22),
                                                                 (128, 23),
                                                                 (128, 24),
                                                                 (128, 25),
                                                                 (128, 26),
                                                                 (128, 27),
                                                                 (128, 28),
                                                                 (128, 29),
                                                                 (128, 30),
                                                                 (128, 31),
                                                                 (128, 32),
                                                                 (128, 33),
                                                                 (128, 34),
                                                                 (128, 35),
                                                                 (128, 36),
                                                                 (128, 37),
                                                                 (128, 38),
                                                                 (128, 39),
                                                                 (128, 40),
                                                                 (128, 41),
                                                                 (128, 42),
                                                                 (128, 43),
                                                                 (128, 44),
                                                                 (128, 45),
                                                                 (128, 46),
                                                                 (128, 47),
                                                                 (128, 48),
                                                                 (128, 49),
                                                                 (128, 50),
                                                                 (128, 51),
                                                                 (128, 52),
                                                                 (128, 53),
                                                                 (128, 54),
                                                                 (128, 55),
                                                                 (128, 56),
                                                                 (128, 57),
                                                                 (128, 58),
                                                                 (128, 59),
                                                                 (128, 60),
                                                                 (128, 61),
                                                                 (128, 62),
                                                                 (128, 63),
                                                                 (128, 64),
                                                                 (128, 65),
                                                                 (128, 66),
                                                                 (128, 67),
                                                                 (128, 68),
                                                                 (128, 69),
                                                                 (128, 70),
                                                                 (128, 71),
                                                                 (128, 72),
                                                                 (128, 73),
                                                                 (128, 74),
                                                                 (128, 75),
                                                                 (128, 76),
                                                                 (128, 77),
                                                                 (128, 78),
                                                                 (128, 79),
                                                                 (128, 80),
                                                                 (128, 81),
                                                                 (128, 82),
                                                                 (128, 83),
                                                                 (128, 84),
                                                                 (128, 85),
                                                                 (128, 86),
                                                                 (128, 87),
                                                                 (128, 88),
                                                                 (128, 89),
                                                                 (128, 90),
                                                                 (128, 91),
                                                                 (128, 92),
                                                                 (128, 93),
                                                                 (128, 94),
                                                                 (128, 95),
                                                                 (128, 96),
                                                                 (128, 97),
                                                                 (128, 98),
                                                                 (128, 99),
                                                                 (128, 100),
                                                                 (128, 101),
                                                                 (128, 102),
                                                                 (128, 103),
                                                                 (128, 104),
                                                                 (128, 105),
                                                                 (128, 106),
                                                                 (128, 107),
                                                                 (128, 108),
                                                                 (128, 109),
                                                                 (128, 110),
                                                                 (128, 111),
                                                                 (128, 112),
                                                                 (128, 113),
                                                                 (128, 114),
                                                                 (128, 115),
                                                                 (128, 116),
                                                                 (128, 117),
                                                                 (128, 118),
                                                                 (128, 119),
                                                                 (128, 120),
                                                                 (128, 121),
                                                                 (128, 122),
                                                                 (128, 123),
                                                                 (128, 124),
                                                                 (128, 125);

--
-- DÃ©chargement des donnÃ©es de la table `role_app`
--

INSERT INTO `role_app` (`id`, `authority`, `created_at`, `updated_at`) VALUES
                                                                           (126, 'ROLE_ADMIN', NULL, NULL),
                                                                           (128, 'ROLE_CHERCHEUR', NULL, NULL);

--
-- DÃ©chargement des donnÃ©es de la table `source_replanification`
--


INSERT INTO `source_replanification_seq` (`next_val`) VALUES
                                                          (10000),
                                                          (10003);

--
-- DÃ©chargement des donnÃ©es de la table `technicien`
--

INSERT INTO `technicien` (`id`, `account_non_expired`, `account_non_locked`, `created_at`, `credentials_non_expired`, `email`, `enabled`, `nom`, `password`, `password_changed`, `prenom`, `updated_at`, `username`, `adresse_ont`, `cell_phone`, `email_attachement`, `identifiant`, `mot_passe`, `entreprise`, `telephone`) VALUES
                                                                                                                                                                                                                                                                                                                                  (2, b'1', b'1', '1970-01-01 00:00:00', b'1', 'khaoula@gmail.com', b'1', 'ait bel mehdi', NULL, b'1', 'khaoula', '2022-10-30 23:00:00', NULL, NULL, '0627908006', NULL, 'EE1278015', NULL, 10000, NULL),
                                                                                                                                                                                                                                                                                                                                  (3, b'1', b'1', '1970-01-01 00:00:00', b'1', 'omaima.ziat@gmail.com', b'1', 'ziat', NULL, b'1', 'oumaima ', '2022-10-30 23:00:00', NULL, NULL, '0642157894', NULL, 'EE587926', NULL, 10000, NULL),
                                                                                                                                                                                                                                                                                                                                  (4, b'1', b'1', '1970-01-01 00:00:00', b'1', 'zouani@gmail.com', b'1', 'zouani', NULL, b'1', 'younes', '2022-10-30 23:00:00', NULL, NULL, '0645879847', NULL, 'EE854972', NULL, 10001, NULL);

--
-- DÃ©chargement des donnÃ©es de la table `template_email_client_injoinable`
--

INSERT INTO `template_email_client_injoinable` (`id`, `corps`, `libelle`, `objet`) VALUES
    (10000, '`Bonjour,\\n\\nNous avons tenté de vous joindre à plusieurs reprises mais sans succès au numéro : \'${this.selectedOrdreKosc.endCustumorContactPhone}\'/\'${this.selectedOrdreKosc.endCustumorContactCellPhone}\'\\n\\nMerci de revenir vers nous par mail et de nous recontacter au  ${this.authService.authenticatedUser?.telephone}  pour planifier un rendez-vous.\\n\\nBien Cordialement\\n${this.authService.authenticatedUser?.nom}\\nc.a@maneoreseaux.com\\n${this.authService.authenticatedUser?.telephone}`', 'CLIENT INJOIGNABLE', '`[CLIENT INJOIGNABLE]${this.selectedOrdreKosc.reference}_${this.selectedOrdreKosc.referenceWorkOrder}_${this.selectedOrdreKosc.endCustumorLastName}&${this.selectedOrdreKosc.endCustumorFirstName}`');

--
-- DÃ©chargement des donnÃ©es de la table `template_email_client_injoinable_kosc`
--

INSERT INTO `template_email_client_injoinable_kosc` (`id`, `corps`, `libelle`, `objet`) VALUES
    (10000, '`Bonjour,\\n\\nVotre client final n\'est pas joignable, nous avons tentÃ© de le joindre Ã  plusieurs reprises mais sans succÃ¨s au numÃ©ro :  \'${this.selectedOrdreKosc.endCustumorContactPhone}\'/\'${this.selectedOrdreKosc.endCustumorContactCellPhone}\'\\n\\nUn mail a été envoyé en parallèle, sans retour de leur part, merci de faire le point avec votre client opérateur et revenir vers nous avec de nouvelle coordonnée pour planifier un rendez-vous.\\n\\nBien Cordialement\\n${this.authService.authenticatedUser?.nom}\\nc.a@maneoreseaux.com\\n${this.authService.authenticatedUser?.telephone}}`', 'CLIENT INJOIGNABLE KOSC', '`[CLIENT INJOIGNABLE]${this.selectedOrdreKosc.reference}_${this.selectedOrdreKosc.referenceWorkOrder}_${this.selectedOrdreKosc.endCustumorLastName} ${this.selectedOrdreKosc.endCustumorFirstName}`');

--
-- DÃ©chargement des donnÃ©es de la table `template_email_client_injoinable_kosc_seq`
--

INSERT INTO `template_email_client_injoinable_kosc_seq` (`next_val`) VALUES
(10000),
(10001);

--
-- DÃ©chargement des donnÃ©es de la table `template_email_client_injoinable_seq`
--

INSERT INTO `template_email_client_injoinable_seq` (`next_val`) VALUES
(10000),
(10001);

--
-- DÃ©chargement des donnÃ©es de la table `template_email_cloture_seq`
--

INSERT INTO `template_email_cloture_seq` (`next_val`) VALUES
(10000),
(10000);

--
-- DÃ©chargement des donnÃ©es de la table `template_email_confirmation_client`
--

INSERT INTO `template_email_confirmation_client` (`id`, `corps`, `libelle`, `objet`) VALUES
(10000, '`Bonjour,\\n\\nSuite à votre demande de raccordement fibre pour la commande \"${this.selectedOrdreKosc.reference}\",àl\'intervention de notre technicien est prÃ©vu le :\\n${this.formatDdMmYy(this.selectedOrdreKosc.dateInterventionTechniqueDebut)},${this.selectedOrdreKosc.endCustumorStreetNumber} ${this.selectedOrdreKosc.endCustumorStreetName},${this.selectedOrdreKosc.endCustumorBuilding},${this.selectedOrdreKosc.endCustumorCity}\\n\\nDans cette attente, veuillez agrÃ©er,Â mes plus cordiales salutations.\\n\\nBien Cordialement\\n${this.authService.authenticatedUser?.nom}\\nc.a@maneoreseaux.com\\n${this.authService.authenticatedUser?.telephone}`', 'CONFIRATION CLIENT', '`CONFIRMATION DE RENDEZ-VOUS POUR RACCORDEMENT FTTH`');

--
-- DÃ©chargement des donnÃ©es de la table `template_email_confirmation_client_seq`
--

INSERT INTO `template_email_confirmation_client_seq` (`next_val`) VALUES
(10000),
(10001);

--
-- DÃ©chargement des donnÃ©es de la table `template_email_cri_seq`
--

INSERT INTO `template_email_cri_seq` (`next_val`) VALUES
(10000),
(10000);

--
-- DÃ©chargement des donnÃ©es de la table `template_email_ftl_seq`
--

INSERT INTO `template_email_ftl_seq` (`next_val`) VALUES
(10000),
(10001);

--
-- DÃ©chargement des donnÃ©es de la table `template_email_mauvais_contact`
--

INSERT INTO `template_email_mauvais_contact` (`id`, `corps`, `libelle`, `objet`) VALUES
(10000, '`Bonjour,\\n\\nPour la rÃ©fÃ©rence en objet, le client au \'${this.selectedOrdreKosc.endCustumorContactPhone}\'/\'${this.selectedOrdreKosc.endCustumorContactCellPhone}\' refuse de prendre un rendez-vous parce que c\'est pas le bon contact pour la prise de rendez-vous.\\nMerci de bien vouloir voir de votre cÃ´tÃ©.\\n\\nBien Cordialement\\n${this.authService.authenticatedUser?.nom}\\nc.a@maneoreseaux.com\\n${this.authService.authenticatedUser?.telephone}`', 'MAUVAIS CONTACT', '`${this.selectedOrdreKosc.reference}_${this.selectedOrdreKosc.operatorVo?.libelle}`');

--
-- DÃ©chargement des donnÃ©es de la table `template_email_mauvais_contact_seq`
--

INSERT INTO `template_email_mauvais_contact_seq` (`next_val`) VALUES
                                                                  (10000),
                                                                  (10001);

--
-- DÃ©chargement des donnÃ©es de la table `template_email_planification`
--

INSERT INTO `template_email_planification` (`id`, `corps`, `libelle`, `objet`) VALUES
    (10000, '`Bonjour,\\n\\nVeuillez trouver ci-dessous les éléments  prise de RDV concernant Lâ€™OT en objet\\n\\nREFERENCE DOSSIER : ${this.selectedOrdreKosc.referenceWorkOrder}\\nREFERENCE DE L\'INTERVENTION : ${this.selectedOrdreKosc.reference}\\nOPERATEUR EX : ${this.selectedOrdreKosc.operatorVo?.libelle}\\nSTATUT DE CLOTURE CLIENT : SO\\nSTATUT RDV : RDV RACCO PRIS\\nDATE RDV : ${this.formatDdMmYy(this.selectedOrdreKosc.dateInterventionTechniqueDebut)}\\nHEURE RDV : ${this.formatHhMm(this.selectedOrdreKosc.dateInterventionTechniqueDebut)}\\nPTO EXISTANTE SUR SITE SELON CLIENT :\\nType D \'INTERVENTION PLANIFIEE : ${this.selectedOrdreKosc.supplierServiceCode}\\nREMARQUE DU CONTACT SITE À RACCORDER OU CA :  ${this.selectedOrdreKosc.commentaireClient}\\n\\nBien Cordialement\\n${this.authService.authenticatedUser?.nom}\\nc.a@maneoreseaux.com\\n${this.authService.authenticatedUser?.telephone}`', 'PLANIFICATION', '`${this.selectedOrdreKosc.reference}_${this.selectedOrdreKosc.referenceWorkOrder}_${this.selectedOrdreKosc.operatorVo?.libelle}_${this.selectedOrdreKosc.endCustumorContactLastName}`');

--
-- DÃ©chargement des donnÃ©es de la table `template_email_planification_seq`
--

INSERT INTO `template_email_planification_seq` (`next_val`) VALUES
                                                                (10000),
                                                                (10001);

--
-- DÃ©chargement des donnÃ©es de la table `template_email_refus`
--

INSERT INTO `template_email_refus` (`id`, `corps`, `libelle`, `objet`) VALUES
    (10000, '`Bonjour,\\n\\nPour la rÃ©fÃ©rence en objet, le client au \'${this.selectedOrdreKosc.endCustumorContactPhone}\'/\'${this.selectedOrdreKosc.endCustumorContactCellPhone}\' refuse de prendre un rendez-vous parce que......\\nMerci de bien vouloir voir de votre cÃ´tÃ©.\\n\\nBien Cordialement\\n${this.authService.authenticatedUser?.nom}\\nc.a@maneoreseaux.com\\n${this.authService.authenticatedUser?.telephone}`', 'REFUS CLIENT', '`${this.selectedOrdreKosc.reference}_${this.selectedOrdreKosc.operatorVo?.libelle}`');

--
-- DÃ©chargement des donnÃ©es de la table `template_email_refus_seq`
--

INSERT INTO `template_email_refus_seq` (`next_val`) VALUES
                                                        (10000),
                                                        (10001);

--
-- DÃ©chargement des donnÃ©es de la table `template_email_replanification`
--

INSERT INTO `template_email_replanification` (`id`, `corps`, `libelle`, `objet`) VALUES
    (10000, '`Bonjour,\\n\\nVeuillez trouver ci-dessous les Ã©lÃ©ments  prise de RDV concernant Lâ€™OT en objet\\n\\nREFERENCE DOSSIER : ${this.selectedOrdreKosc.referenceWorkOrder}\\nREFERENCE DE L\'INTERVENTION : ${this.selectedOrdreKosc.reference}\\nOPERATEUR EX : ${this.selectedOrdreKosc.operatorVo?.libelle}\\nSTATUT DE CLOTURE CLIENT : SO\\nSTATUT RDV : RDV RACCO PRIS\\nDATE RDV : ${this.formatDdMmYy(this.selectedOrdreKosc.dateInterventionTechniqueDebut)}\\nHEURE RDV : ${this.formatHhMm(this.selectedOrdreKosc.dateInterventionTechniqueDebut)}\\nPTO EXISTANTE SUR SITE SELON CLIENT :\\nType D \'INTERVENTION PLANIFIEE : ${this.selectedOrdreKosc.supplierServiceCode}\\nREMARQUE DU CONTACT SITE Ã€ RACCORDER OU CA :  ${this.selectedOrdreKosc.commentaireClient}\\n\\nBien Cordialement\\n${this.authService.authenticatedUser?.nom}\\nc.a@maneoreseaux.com\\n${this.authService.authenticatedUser?.telephone}`', 'REPLANIFICATION', '`${this.selectedOrdreKosc.reference}_${this.selectedOrdreKosc.referenceWorkOrder}_${this.selectedOrdreKosc.operatorVo?.libelle}_${this.selectedOrdreKosc.endCustumorContactLastName}`');

--
-- DÃ©chargement des donnÃ©es de la table `template_email_replanification_seq`
--

INSERT INTO `template_email_replanification_seq` (`next_val`) VALUES
                                                                  (10000),
                                                                  (10001);

--
-- DÃ©chargement des donnÃ©es de la table `template_email_report_demande_client_client_injoignable`
--

INSERT INTO `template_email_report_demande_client_client_injoignable` (`id`, `corps`, `libelle`, `objet`) VALUES
    (10000, '`Bonjour,\\n\\nCi-dessous un cas de report de RDV, voici le dÃ©tail attendu :\\n\\nWO : ${this.selectedOrdreKosc.referenceWorkOrder}\\nOrder : ${this.selectedOrdreKosc.reference}\\nNous avons essayÃ© de vous joindre Ã  plusieurs reprise, concernant  votre demande de report de rendez-vous,\\n\\nNous vous confirmons l\'annulation du rendez-vous du  ${this.formatDdMmYy(this.selectedOrdreKosc.dateInterventionTechniqueDebut)} Ã  ${this.formatHhMm(this.selectedOrdreKosc.dateInterventionTechniqueDebut)}\\n\\nMerci de bien vouloir nous envoyer un retour, ou nous contacter au numÃ©ro : ${this.authService.authenticatedUser?.telephone}\\nafin de programmer un rendez-vous selon vos disponibilitÃ©s.\\n\\nNous vous remercions pour votre comprÃ©hension.\\n\\nBien Cordialement\\n${this.authService.authenticatedUser?.nom}\\nc.a@maneoreseaux.com\\n${this.authService.authenticatedUser?.telephone}`', 'REPORT DEMANDE CLIENT CLIENT INJOIGNABLE', '`[REPORT DE RDV]${this.selectedOrdreKosc.referenceWorkOrder}_${this.selectedOrdreKosc.reference}`');

--
-- DÃ©chargement des donnÃ©es de la table `template_email_report_demande_client_client_injoignable_seq`
--

INSERT INTO `template_email_report_demande_client_client_injoignable_seq` (`next_val`) VALUES
(10000);

--
-- DÃ©chargement des donnÃ©es de la table `template_email_report_demande_client_client_joignable`
--

INSERT INTO `template_email_report_demande_client_client_joignable` (`id`, `corps`, `libelle`, `objet`) VALUES
(10000, '`Bonjour,\\n\\nCi-dessous un cas de report de RDV, voici le dÃ©tail attendu :\\n\\nWO : ${this.selectedOrdreKosc.referenceWorkOrder}\\nOrder : ${this.selectedOrdreKosc.reference}\\n\\nSuite Ã  votre demande de report, nous vous confirmons le dÃ©calage du rendez-vous du ${this.formatDdMmYy(this.selectedOrdreKosc.dateInterventionTechniqueDebut)} Ã  ${this.formatHhMm(this.selectedOrdreKosc.dateInterventionTechniqueDebut)} au ${this.formatDdMmYy(this.selectedOrdreKosc.dateAppelReplanification)} Ã  ${this.formatHhMm(this.selectedOrdreKosc.dateAppelReplanification)}\\n\\nMerci d\'avance pour la prise en compte\\n\\nBien Cordialement\\n${this.authService.authenticatedUser?.nom}\\nc.a@maneoreseaux.com\\n${this.authService.authenticatedUser?.telephone}`', 'REPORT DEMANDE CLIENT CLIENT JOIGNABLE', '`[REPORT DE RDV]${this.selectedOrdreKosc.referenceWorkOrder}_${this.selectedOrdreKosc.reference}`');

--
-- DÃ©chargement des donnÃ©es de la table `template_email_report_demande_client_client_joignable_seq`
--

INSERT INTO `template_email_report_demande_client_client_joignable_seq` (`next_val`) VALUES
    (10000);

--
-- DÃ©chargement des donnÃ©es de la table `template_email_report_demande_maneo_client_injoignable`
--

INSERT INTO `template_email_report_demande_maneo_client_injoignable` (`id`, `corps`, `libelle`, `objet`) VALUES
    (10000, '`Bonjour,\\n\\nCi-dessous un cas de report de RDV, voici le dÃ©tail attendu :\\n\\nWO : ${this.selectedOrdreKosc.referenceWorkOrder}\\nOrder : ${this.selectedOrdreKosc.reference}\\n\\nNous avons essayÃ© de vous joindre Ã  plusieurs reprise, concernant le rendez-vous planifiÃ© pour le ${this.datePipe.transform(this.selectedOrdreKosc.dateInterventionTechniqueDebut)} Ã  {creneau de RDV}\\n\\nSuite Ã  un retard de livraison de matÃ©riel, notre technicien ne pourra pas intervenir Ã  la date prÃ©vu,\\nMerci de bien vouloir nous envoyer un retour, ou nous contacter au numÃ©ro ${this.authService.authenticatedUser?.telephone}\\n\\n\nafin de programmer un rendez-vous selon vos disponibilitÃ©s.\\n\\nBien Cordialement\\n${this.authService.authenticatedUser?.nom}\\nc.a@maneoreseaux.com\\n${this.authService.authenticatedUser?.telephone}`', 'REPORT DEMANDE MANEO CLIENT INJOIGNABLE', '`[REPORT DE RDV]${this.selectedOrdreKosc.referenceWorkOrder}_${this.selectedOrdreKosc.reference}`');

--
-- DÃ©chargement des donnÃ©es de la table `template_email_report_demande_maneo_client_injoignable_seq`
--

INSERT INTO `template_email_report_demande_maneo_client_injoignable_seq` (`next_val`) VALUES
    (10000);

--
-- DÃ©chargement des donnÃ©es de la table `template_email_report_demande_maneo_client_joignable_accepte`
--

INSERT INTO `template_email_report_demande_maneo_client_joignable_accepte` (`id`, `corps`, `libelle`, `objet`) VALUES
    (10000, '`Bonjour,\\n\\nCi-dessous un cas de report de RDV, voici le dÃ©tail attendu :\\n\\nWO : ${this.selectedOrdreKosc.referenceWorkOrder}\\nOrder : ${this.selectedOrdreKosc.reference}\\nSuite Ã  notre entretien tÃ©lÃ©phonique,  nous  vous confirmons le dÃ©calage du rendez-vous du ${this.formatDdMmYy(this.selectedOrdreKosc.dateInterventionTechniqueDebut)} Ã  ${this.formatHhMm(this.selectedOrdreKosc.dateInterventionTechniqueDebut)} au ${this.formatDdMmYy(this.selectedOrdreKosc.dateAppelReplanification)} Ã  ${this.formatHhMm(this.selectedOrdreKosc.dateAppelReplanification)}\\nMerci de bien vouloir nous excuser pour le dÃ©sagrÃ©ment occasionnÃ©.\\n\\nNous vous remercions pour votre comprÃ©hension.\\n\\nBien Cordialement\\n${this.authService.authenticatedUser?.nom}\\nc.a@maneoreseaux.com\\n${this.authService.authenticatedUser?.telephone}`', 'REPORT DEMANDE MANEO CLIENT JOIGNABLE ACCEPTE', '`[REPORT DE RDV]${this.selectedOrdreKosc.referenceWorkOrder}_${this.selectedOrdreKosc.reference}`');

--
-- DÃ©chargement des donnÃ©es de la table `template_email_report_demande_maneo_client_joignable_accepte_seq`
--

INSERT INTO `template_email_report_demande_maneo_client_joignable_accepte_seq` (`next_val`) VALUES
    (10000);

--
-- DÃ©chargement des donnÃ©es de la table `template_email_report_demande_maneo_client_joignable_refus`
--

INSERT INTO `template_email_report_demande_maneo_client_joignable_refus` (`id`, `corps`, `libelle`, `objet`) VALUES
    (10000, '`Bonjour,\\n\\nCi-dessous un cas de report de RDV, voici le dÃ©tail attendu :\\n\\nWO : ${this.selectedOrdreKosc.referenceWorkOrder}\\nOrder : ${this.selectedOrdreKosc.reference}\\nSuite Ã  notre entretien tÃ©lÃ©phonique,  nous  vous confirmons l\'annulation du rendez-vous du ${this.formatDdMmYy(this.selectedOrdreKosc.dateInterventionTechniqueDebut)} Ã  ${this.formatHhMm(this.selectedOrdreKosc.dateInterventionTechniqueDebut)}\\nMerci de bien vouloir nous envoyer un retour, ou nous contacter au numÃ©ro : ${this.authService.authenticatedUser?.telephone}\\nafin de programmer un rendez-vous selon vos disponibilitÃ©s.\\n\\nNous vous remercions pour votre comprÃ©hension.\\n\\nBien Cordialement\\n${this.authService.authenticatedUser?.nom}\\nc.a@maneoreseaux.com\\n${this.authService.authenticatedUser?.telephone}`', 'REPORT DEMANDE MANEO CLIENT JOIGNABLE REFUS', '`[REPORT DE RDV]${this.selectedOrdreKosc.referenceWorkOrder}_${this.selectedOrdreKosc.reference}`');

--
-- DÃ©chargement des donnÃ©es de la table `template_email_report_demande_maneo_client_joignable_refus_seq`
--

INSERT INTO `template_email_report_demande_maneo_client_joignable_refus_seq` (`next_val`) VALUES
(10000);



--
-- DÃ©chargement des donnÃ©es de la table `template_suivi_seq`
--

INSERT INTO `template_suivi_seq` (`next_val`) VALUES
(10000),
(10000);

--
-- DÃ©chargement des donnÃ©es de la table `users_roles`
--

INSERT INTO `users_roles` (`user_id`, `role_id`) VALUES
(127, 126),
(129, 128),
(1, 126),
(2, 126),
(3, 126),
(4, 126);



INSERT INTO `ordre_kosc_seq` (`next_val`) VALUES
                                                 (10000),
                                                 (10001);
--
-- DÃ©chargement des donnÃ©es de la table `user_app`
--

INSERT INTO `user_app` (`id`, `account_non_expired`, `account_non_locked`, `created_at`, `credentials_non_expired`, `email`, `enabled`, `nom`, `password`, `password_changed`, `prenom`, `updated_at`, `username`, `telephone`) VALUES
(1, b'1', b'1', '2022-10-25 14:01:15', b'1', 'admin', b'1', 'admin', '$2a$10$C9vArnf0PhBx9EoV7HlJHeo0xN3dwSmcQadZjpmyJ9F8V6kOlqdBG', b'0', 'admin', NULL, 'admin', NULL),
(2, b'1', b'1', '2022-10-25 14:01:15', b'1', 'zouani@gmail.com', b'1', 'Zouani', '$2a$10$C9vArnf0PhBx9EoV7HlJHeo0xN3dwSmcQadZjpmyJ9F8V6kOlqdBG', b'0', 'Younes', NULL, 'zouani', '625495187'),
(3, b'1', b'1', '2022-10-25 14:01:15', b'1', 'jarane@gmail.com', b'1', 'Jarane', '$2a$10$C9vArnf0PhBx9EoV7HlJHeo0xN3dwSmcQadZjpmyJ9F8V6kOlqdBG', b'0', 'Anas', NULL, 'jarane', '678241249'),
(4, b'1', b'1', '2022-10-25 14:01:15', b'1', 'nadia@gmail.com', b'1', 'Alaoui', '$2a$10$C9vArnf0PhBx9EoV7HlJHeo0xN3dwSmcQadZjpmyJ9F8V6kOlqdBG', b'0', 'Nadia', NULL, 'alaoui', '645697892');
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- HÃ´te : 127.0.0.1
-- GÃ©nÃ©rÃ© le : ven. 09 dÃ©c. 2022 Ã  22:06
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

--
-- DÃ©chargement des donnÃ©es de la table `template_email_cri`
--

INSERT INTO `template_email_cri` (`id`, `corps`, `libelle`, `objet`) VALUES
    (10000, '`Bonjour,\\n\\nREFERENCE DOSSIER : ${this.selectedOrdreKosc.referenceWorkOrder}\\nREFERENCE DE L\'INTERVENTION : ${this.selectedOrdreKosc.reference}\\nOPERATEUR :  ${this.selectedOrdreKosc.operatorVo?.libelle}\\nETAT INTERVENTION : ${this.selectedOrdreKosc.etatDemandeKoscVo?.libelle}\\n\\nDATE RDV : ${this.formatDdMmYy(this.selectedOrdreKosc.dateRdv)}\\nHEURE RDV : ${this.formatHhMm(this.selectedOrdreKosc.dateRdv)}\\n\\nETAT DE CLOTURE CLIENT : ${this.selectedOrdreKosc.codeDecharge}\\nNOMMAGE PTO :  ${this.selectedOrdreKosc.autreInfosPboPto}\\nTYPE RACCORDEMENT PBO-PTO : ${this.selectedOrdreKosc.typeRacordementPboPto}\\nTYPE RACCORDEMENT REALISE :\\n\\nLONGUEUR TOTALE CABLAGE : ml\\nLONGUEUR DOMAINE PUBLIC : ml\\nLONGUEUR DOMAINE PRIVE : ml\\n\\nBien Cordialement\\n${this.authService.authenticatedUser?.nom}\\nc.a@maneoreseaux.com\\n${this.authService.authenticatedUser?.telephone}`', 'CRI', '`${this.selectedOrdreKosc.reference}//${this.selectedOrdreKosc.referenceWorkOrder}//${this.selectedOrdreKosc.operatorVo?.libelle}//${this.selectedOrdreKosc.etatDemandeKoscVo?.libelle}`');
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
