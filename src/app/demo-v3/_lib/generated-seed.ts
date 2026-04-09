import type {
  CommissionsConfig,
  DemoV3Partners,
  JournalTypes,
  MedicalDocument,
  Medecin,
  Patient,
  ServiceItem,
  TemplateItem,
  CalendarEventItem,
  CommissionItem,
  FacturePatient,
  AccountingEntry,
} from "./types";

export const generatedPatients = [
  {
    "id": "WM-2025-001",
    "nom": "Hassan",
    "prenom": "Ibrahim",
    "civilite": "M.",
    "dateNaissance": "1968-03-15",
    "pays": "Mali",
    "ville": "Bamako",
    "telephone": "+223 76 12 34 56",
    "email": "hassan.ibrahim@email.com",
    "pathologie": "Pontage Coronarien",
    "specialite": "Cardiologie",
    "statut": 9,
    "phase": "validation",
    "urgence": "semi-urgent",
    "dateCreation": "2025-01-05",
    "medecinReferent": "Pr. Mehdi Karoui",
    "clinique": "Clinique Internationale Hannibal",
    "dateConsultation": "2025-01-20",
    "montantDevis": 12500,
    "assurance": "Allianz Care International",
    "pecValidee": true,
    "notes": "Patient stable, angiographie récente fournie"
  },
  {
    "id": "WM-2025-002",
    "nom": "Diop",
    "prenom": "Aïcha",
    "civilite": "Mme",
    "dateNaissance": "1992-07-22",
    "pays": "Sénégal",
    "ville": "Dakar",
    "telephone": "+221 77 123 45 67",
    "email": "aicha.diop@email.com",
    "pathologie": "FIV (Fécondation In Vitro)",
    "specialite": "Fertilité/PMA",
    "statut": 6,
    "phase": "evaluation",
    "urgence": "programme",
    "dateCreation": "2025-01-08",
    "medecinReferent": "Dr. Yasmine El Amrani",
    "clinique": "Centre FIV Tunis",
    "dateConsultation": "2025-01-25",
    "montantDevis": 5800,
    "assurance": "Aucune",
    "pecValidee": false,
    "notes": "Première tentative FIV, couple motivé"
  },
  {
    "id": "WM-2025-003",
    "nom": "Chen",
    "prenom": "Wei",
    "civilite": "M.",
    "dateNaissance": "1985-11-30",
    "pays": "Chine",
    "ville": "Shanghai",
    "telephone": "+86 138 1234 5678",
    "email": "wei.chen@email.com",
    "pathologie": "Prothèse Totale Genou",
    "specialite": "Orthopédie",
    "statut": 12,
    "phase": "operationnel",
    "urgence": "programme",
    "dateCreation": "2024-12-15",
    "medecinReferent": "Dr. Rachid Bennani",
    "clinique": "Clinique Internationale Avicenne",
    "dateConsultation": "2025-01-10",
    "dateIntervention": "2025-01-15",
    "dateArrivee": "2025-01-09",
    "montantDevis": 9200,
    "assurance": "China Life",
    "pecValidee": true,
    "hebergement": "Ibis Styles Dakar Plateau",
    "chauffeur": "Abdou Seck",
    "notes": "Patient arrivé, hospitalisé depuis 5 jours"
  },
  {
    "id": "WM-2025-004",
    "nom": "Kouadio",
    "prenom": "Marie-Claire",
    "civilite": "Mme",
    "dateNaissance": "1975-04-18",
    "pays": "Côte d'Ivoire",
    "ville": "Abidjan",
    "telephone": "+225 07 12 34 56 78",
    "email": "mc.kouadio@email.com",
    "pathologie": "Cancer du Sein - Chimiothérapie",
    "specialite": "Oncologie",
    "statut": 17,
    "phase": "cloture",
    "urgence": "semi-urgent",
    "dateCreation": "2024-11-20",
    "medecinReferent": "Dr. Fatima Zahra Alaoui",
    "clinique": "Institut National d'Oncologie",
    "dateConsultation": "2024-12-05",
    "dateIntervention": "2024-12-10",
    "dateArrivee": "2024-12-04",
    "dateDepart": "2025-01-05",
    "montantDevis": 15600,
    "assurance": "MUGEFCI",
    "pecValidee": true,
    "hebergement": "Résidence Médicalisée Carthage",
    "chauffeur": "Moussa Traoré",
    "notes": "Traitement terminé, suivi post-op en cours"
  },
  {
    "id": "WM-2025-005",
    "nom": "Al-Mansour",
    "prenom": "Fatima",
    "civilite": "Mme",
    "dateNaissance": "1990-09-12",
    "pays": "Arabie Saoudite",
    "ville": "Jeddah",
    "telephone": "+966 50 123 4567",
    "email": "fatima.almansour@email.com",
    "pathologie": "Chirurgie Bariatrique (Sleeve)",
    "specialite": "Chirurgie Digestive",
    "statut": 3,
    "phase": "admission",
    "urgence": "programme",
    "dateCreation": "2025-01-12",
    "notes": "Dossier médical en cours de constitution"
  }
] as Patient[];

export const generatedMedecins = [
  {
    "id": "MED-001",
    "nom": "Karoui",
    "prenom": "Mehdi",
    "civilite": "Pr.",
    "specialite": "Cardiologie",
    "sousSpecialite": "Chirurgie Cardiaque",
    "pays": "Tunisie",
    "ville": "Tunis",
    "clinique": "Clinique Internationale Hannibal",
    "telephone": "+216 71 123 456",
    "email": "pr.karoui@hannibal.tn",
    "experience": 22,
    "diplomes": "Pr. Agrégé Chirurgie Cardio-Vasculaire, CHU La Rabta",
    "langues": [
      "Français",
      "Arabe",
      "Anglais"
    ],
    "tarifConsultation": 80,
    "disponibilite": "immediate",
    "urgences": true,
    "conventionWama": true,
    "evaluation": 4.9
  },
  {
    "id": "MED-002",
    "nom": "Ben Ali",
    "prenom": "Ahmed",
    "civilite": "Dr.",
    "specialite": "Cardiologie",
    "sousSpecialite": "Cardiologie Interventionnelle",
    "pays": "Maroc",
    "ville": "Casablanca",
    "clinique": "Clinique Internationale Avicenne",
    "telephone": "+212 522 123 456",
    "email": "dr.benali@avicenne.ma",
    "experience": 18,
    "diplomes": "CHU Ibn Rochd, Formation Paris",
    "langues": [
      "Français",
      "Arabe"
    ],
    "tarifConsultation": 70,
    "disponibilite": "1-2sem",
    "urgences": true,
    "conventionWama": true,
    "evaluation": 4.8
  },
  {
    "id": "MED-003",
    "nom": "Bennani",
    "prenom": "Rachid",
    "civilite": "Dr.",
    "specialite": "Orthopédie",
    "sousSpecialite": "Chirurgie Prothétique",
    "pays": "Maroc",
    "ville": "Rabat",
    "clinique": "Clinique Internationale Avicenne",
    "telephone": "+212 537 123 456",
    "email": "dr.bennani@avicenne.ma",
    "experience": 15,
    "diplomes": "CHU Rabat, DU Toulouse",
    "langues": [
      "Français",
      "Arabe",
      "Anglais"
    ],
    "tarifConsultation": 75,
    "disponibilite": "immediate",
    "urgences": false,
    "conventionWama": true,
    "evaluation": 4.7
  },
  {
    "id": "MED-004",
    "nom": "El Amrani",
    "prenom": "Yasmine",
    "civilite": "Dr.",
    "specialite": "Fertilité/PMA",
    "sousSpecialite": "Assistance Médicale à la Procréation",
    "pays": "Tunisie",
    "ville": "Tunis",
    "clinique": "Centre FIV Tunis",
    "telephone": "+216 71 234 567",
    "email": "dr.elamrani@fivtunis.tn",
    "experience": 12,
    "diplomes": "Gynécologue-Obstétricien, DU PMA Paris",
    "langues": [
      "Français",
      "Arabe",
      "Anglais"
    ],
    "tarifConsultation": 90,
    "disponibilite": "1-2sem",
    "urgences": false,
    "conventionWama": true,
    "evaluation": 4.9
  },
  {
    "id": "MED-005",
    "nom": "Alaoui",
    "prenom": "Fatima Zahra",
    "civilite": "Dr.",
    "specialite": "Oncologie",
    "sousSpecialite": "Oncologie Médicale",
    "pays": "Maroc",
    "ville": "Rabat",
    "clinique": "Institut National d'Oncologie",
    "telephone": "+212 537 234 567",
    "email": "dr.alaoui@ino.ma",
    "experience": 14,
    "diplomes": "Oncologue Médical, CHU Rabat",
    "langues": [
      "Français",
      "Arabe"
    ],
    "tarifConsultation": 85,
    "disponibilite": "1mois",
    "urgences": true,
    "conventionWama": true,
    "evaluation": 4.8
  },
  {
    "id": "MED-006",
    "nom": "Ndiaye",
    "prenom": "Cheikh",
    "civilite": "Pr.",
    "specialite": "Neurochirurgie",
    "sousSpecialite": "Neurochirurgie Spinale",
    "pays": "Sénégal",
    "ville": "Dakar",
    "clinique": "Hôpital Principal de Dakar",
    "telephone": "+221 33 839 50 50",
    "email": "pr.ndiaye@hpd.sn",
    "experience": 20,
    "diplomes": "Pr. Agrégé Neurochirurgie, CHU Fann",
    "langues": [
      "Français",
      "Wolof",
      "Anglais"
    ],
    "tarifConsultation": 100,
    "disponibilite": "immediate",
    "urgences": true,
    "conventionWama": false,
    "evaluation": 4.7
  }
] as Medecin[];

export const generatedPartners = {
  "cliniques": [
    {
      "id": "CLI-001",
      "nom": "Clinique Internationale Avicenne",
      "type": "Privée",
      "pays": "Maroc",
      "ville": "Casablanca",
      "adresse": "Boulevard Zerktouni, Casablanca",
      "telephone": "+212 522 123 456",
      "email": "contact@avicenne.ma",
      "specialites": [
        "Cardiologie",
        "Neurologie",
        "Orthopédie",
        "Fertilité"
      ],
      "accreditations": [
        "JCI",
        "ISO 9001"
      ],
      "litCapacite": 150,
      "conventionWama": true,
      "tarifMoyenJour": 200,
      "services": [
        "Bloc opératoire",
        "Réanimation",
        "IRM",
        "Scanner"
      ],
      "evaluation": 4.9
    },
    {
      "id": "CLI-002",
      "nom": "Clinique Al Madina",
      "type": "Privée",
      "pays": "Maroc",
      "ville": "Casablanca",
      "adresse": "Boulevard Moulay Youssef, Casablanca",
      "telephone": "+212 522 987 654",
      "email": "contact@almadina.ma",
      "specialites": [
        "Chirurgie Générale",
        "Gynécologie",
        "Pédiatrie",
        "Ophtalmologie"
      ],
      "accreditations": [
        "ISO 9001"
      ],
      "litCapacite": 80,
      "conventionWama": true,
      "tarifMoyenJour": 180,
      "services": [
        "Bloc opératoire",
        "Urgences",
        "Laboratoire",
        "Radiologie"
      ],
      "evaluation": 4.6
    },
    {
      "id": "CLI-003",
      "nom": "Clinique Badr",
      "type": "Privée",
      "pays": "Maroc",
      "ville": "Rabat",
      "adresse": "Avenue Allal Ben Abdellah, Rabat",
      "telephone": "+212 537 654 321",
      "email": "contact@cliniquebadr.ma",
      "specialites": [
        "Cardiologie",
        "Oncologie",
        "Radiothérapie",
        "Hématologie"
      ],
      "accreditations": [
        "JCI",
        "ISO 9001"
      ],
      "litCapacite": 120,
      "conventionWama": true,
      "tarifMoyenJour": 220,
      "services": [
        "Bloc opératoire",
        "Réanimation",
        "IRM",
        "Scanner",
        "PET Scan"
      ],
      "evaluation": 4.8
    },
    {
      "id": "CLI-004",
      "nom": "Hôpital Cheikh Zaid",
      "type": "Public",
      "pays": "Maroc",
      "ville": "Rabat",
      "adresse": "Avenue Allal El Fassi, Rabat",
      "telephone": "+212 537 777 777",
      "email": "contact@cheikhzaid.ma",
      "specialites": [
        "Neurochirurgie",
        "Cardiochirurgie",
        "Transplantation",
        "Urgences"
      ],
      "accreditations": [
        "CHU",
        "ISO 9001"
      ],
      "litCapacite": 280,
      "conventionWama": true,
      "tarifMoyenJour": 150,
      "services": [
        "Toutes spécialités",
        "Urgences 24/7",
        "Héliport",
        "Enseignement"
      ],
      "evaluation": 4.7
    },
    {
      "id": "CLI-005",
      "nom": "Clinique Ain Chock",
      "type": "Privée",
      "pays": "Maroc",
      "ville": "Casablanca",
      "adresse": "Rue Ain Chock, Casablanca",
      "telephone": "+212 522 456 789",
      "email": "contact@ainchock.ma",
      "specialites": [
        "Orthopédie",
        "Traumatologie",
        "Rhumatologie",
        "Médecine Sportive"
      ],
      "accreditations": [
        "ISO 9001"
      ],
      "litCapacite": 60,
      "conventionWama": true,
      "tarifMoyenJour": 170,
      "services": [
        "Bloc opératoire",
        "Kinésithérapie",
        "Radiologie",
        "IRM"
      ],
      "evaluation": 4.5
    },
    {
      "id": "CLI-006",
      "nom": "Centre Hospitalier Universitaire Ibn Rochd",
      "type": "Public",
      "pays": "Maroc",
      "ville": "Casablanca",
      "adresse": "Rue des Hôpitaux, Casablanca",
      "telephone": "+212 522 222 222",
      "email": "contact@ibnrochd.ma",
      "specialites": [
        "Cardiologie",
        "Oncologie",
        "Neurologie",
        "Néphrologie",
        "Urgences"
      ],
      "accreditations": [
        "CHU"
      ],
      "litCapacite": 350,
      "conventionWama": false,
      "tarifMoyenJour": 100,
      "services": [
        "Toutes spécialités",
        "Urgences 24/7",
        "Recherche",
        "Enseignement"
      ],
      "evaluation": 4.4
    },
    {
      "id": "CLI-007",
      "nom": "Clinique Dar Al Hanaa",
      "type": "Spécialisée",
      "pays": "Maroc",
      "ville": "Marrakech",
      "adresse": "Route de Casablanca, Marrakech",
      "telephone": "+212 524 333 444",
      "email": "contact@daralhanaa.ma",
      "specialites": [
        "Fertilité/PMA",
        "Gynécologie"
      ],
      "accreditations": [
        "ISO 15189",
        "ESHRE"
      ],
      "litCapacite": 25,
      "conventionWama": true,
      "tarifMoyenJour": 190,
      "services": [
        "FIV",
        "ICSI",
        "PGT",
        "Congélation",
        "Don d'ovocytes"
      ],
      "evaluation": 4.9
    },
    {
      "id": "CLI-008",
      "nom": "Clinique Al Amal",
      "type": "Privée",
      "pays": "Maroc",
      "ville": "Fès",
      "adresse": "Avenue Hassan II, Fès",
      "telephone": "+212 535 666 777",
      "email": "contact@alamal.ma",
      "specialites": [
        "Cardiologie",
        "Chirurgie Digestive",
        "Urologie",
        "ORL"
      ],
      "accreditations": [
        "ISO 9001"
      ],
      "litCapacite": 90,
      "conventionWama": true,
      "tarifMoyenJour": 160,
      "services": [
        "Bloc opératoire",
        "Réanimation",
        "Laboratoire",
        "Scanner"
      ],
      "evaluation": 4.6
    }
  ],
  "hebergements": [
    {
      "id": "HEB-001",
      "nom": "Kenzi Tower Hotel",
      "type": "Hôtel 5 étoiles",
      "pays": "Maroc",
      "ville": "Casablanca",
      "quartier": "Twin Center",
      "adresse": "Boulevard Zerktouni, Casablanca",
      "telephone": "+212 522 978 000",
      "email": "reservation@kenzitower.ma",
      "tarifNuitSimple": 180,
      "tarifNuitDouble": 240,
      "petitDejeuner": true,
      "services": [
        "WiFi",
        "Piscine",
        "Spa",
        "Restaurant",
        "Salle fitness",
        "Centre affaires"
      ],
      "distanceCliníque": "500m Clinique Avicenne",
      "conventionWama": true,
      "capacite": 237,
      "evaluation": 4.7
    },
    {
      "id": "HEB-002",
      "nom": "Sofitel Casablanca Tour Blanche",
      "type": "Hôtel 5 étoiles",
      "pays": "Maroc",
      "ville": "Casablanca",
      "quartier": "Centre-ville",
      "adresse": "Rue Sidi Belyout, Casablanca",
      "telephone": "+212 522 439 999",
      "email": "h3405@sofitel.com",
      "tarifNuitSimple": 220,
      "tarifNuitDouble": 280,
      "petitDejeuner": true,
      "services": [
        "WiFi",
        "Piscine",
        "Spa",
        "Multiple restaurants",
        "Bar",
        "Service chambre 24/7"
      ],
      "distanceCliníque": "2 km Clinique Avicenne",
      "conventionWama": false,
      "capacite": 138,
      "evaluation": 4.8
    },
    {
      "id": "HEB-003",
      "nom": "Résidence Médicalisée Atlas",
      "type": "Résidence Médicalisée",
      "pays": "Maroc",
      "ville": "Casablanca",
      "quartier": "Maarif",
      "adresse": "Boulevard Emile Zola, Casablanca",
      "telephone": "+212 522 333 444",
      "email": "contact@residence-atlas.ma",
      "tarifNuitSimple": 50,
      "tarifNuitDouble": 70,
      "petitDejeuner": true,
      "services": [
        "WiFi",
        "Assistance médicale 24/7",
        "Repas adaptés",
        "Transfert clinique",
        "Infirmier sur place"
      ],
      "distanceCliníque": "1 km Clinique Avicenne",
      "conventionWama": true,
      "capacite": 45,
      "evaluation": 4.6
    },
    {
      "id": "HEB-004",
      "nom": "Hyatt Regency Casablanca",
      "type": "Hôtel 5 étoiles",
      "pays": "Maroc",
      "ville": "Casablanca",
      "quartier": "Corniche",
      "adresse": "Place des Nations Unies, Casablanca",
      "telephone": "+212 520 123 456",
      "email": "casablanca.regency@hyatt.com",
      "tarifNuitSimple": 260,
      "tarifNuitDouble": 330,
      "petitDejeuner": true,
      "services": [
        "WiFi",
        "Piscine",
        "Spa",
        "Golf",
        "Multiple restaurants",
        "Salle de conférence"
      ],
      "distanceCliníque": "3 km Clinique Avicenne",
      "conventionWama": false,
      "capacite": 255,
      "evaluation": 4.9
    },
    {
      "id": "HEB-005",
      "nom": "Ibis Casa-Voyageurs",
      "type": "Hôtel 3 étoiles",
      "pays": "Maroc",
      "ville": "Casablanca",
      "quartier": "Gare",
      "adresse": "Boulevard Bahmad, Casablanca",
      "telephone": "+212 522 400 404",
      "email": "h3566@accor.com",
      "tarifNuitSimple": 60,
      "tarifNuitDouble": 80,
      "petitDejeuner": true,
      "services": [
        "WiFi",
        "Restaurant",
        "Bar",
        "Parking"
      ],
      "distanceCliníque": "4 km Clinique Avicenne",
      "conventionWama": true,
      "capacite": 104,
      "evaluation": 4.1
    },
    {
      "id": "HEB-006",
      "nom": "Farah Rabat",
      "type": "Hôtel 5 étoiles",
      "pays": "Maroc",
      "ville": "Rabat",
      "quartier": "Centre-ville",
      "adresse": "Place de l'Unité Africaine, Rabat",
      "telephone": "+212 537 233 333",
      "email": "reservation@farahrabat.ma",
      "tarifNuitSimple": 190,
      "tarifNuitDouble": 250,
      "petitDejeuner": true,
      "services": [
        "WiFi",
        "Piscine",
        "Spa",
        "Restaurant",
        "Salle fitness",
        "Centre affaires"
      ],
      "distanceCliníque": "2 km Clinique Badr",
      "conventionWama": true,
      "capacite": 182,
      "evaluation": 4.6
    },
    {
      "id": "HEB-007",
      "nom": "Villa Médicale Souissi",
      "type": "Résidence Médicalisée",
      "pays": "Maroc",
      "ville": "Rabat",
      "quartier": "Souissi",
      "adresse": "Avenue Mehdi Ben Barka, Rabat",
      "telephone": "+212 537 555 666",
      "email": "contact@villa-souissi.ma",
      "tarifNuitSimple": 55,
      "tarifNuitDouble": 75,
      "petitDejeuner": true,
      "services": [
        "WiFi",
        "Assistance médicale",
        "Repas adaptés",
        "Transfert clinique",
        "Kinésithérapie"
      ],
      "distanceCliníque": "500m Hôpital Cheikh Zaid",
      "conventionWama": true,
      "capacite": 35,
      "evaluation": 4.7
    },
    {
      "id": "HEB-008",
      "nom": "La Mamounia",
      "type": "Hôtel 5 étoiles Palace",
      "pays": "Maroc",
      "ville": "Marrakech",
      "quartier": "Médina",
      "adresse": "Avenue Bab Jdid, Marrakech",
      "telephone": "+212 524 388 600",
      "email": "resa@mamounia.com",
      "tarifNuitSimple": 400,
      "tarifNuitDouble": 550,
      "petitDejeuner": true,
      "services": [
        "WiFi",
        "Piscine",
        "Spa luxe",
        "Multiple restaurants",
        "Golf",
        "Jardin botanique",
        "Service majordome"
      ],
      "distanceCliníque": "5 km Clinique Dar Al Hanaa",
      "conventionWama": false,
      "capacite": 209,
      "evaluation": 5
    },
    {
      "id": "HEB-009",
      "nom": "Novotel Casablanca City Center",
      "type": "Hôtel 4 étoiles",
      "pays": "Maroc",
      "ville": "Casablanca",
      "quartier": "Maarif",
      "adresse": "Rue Ait Melloul, Casablanca",
      "telephone": "+212 522 464 646",
      "email": "h3546@accor.com",
      "tarifNuitSimple": 120,
      "tarifNuitDouble": 160,
      "petitDejeuner": true,
      "services": [
        "WiFi",
        "Piscine",
        "Restaurant",
        "Salle fitness",
        "Bar"
      ],
      "distanceCliníque": "2 km Clinique Al Madina",
      "conventionWama": true,
      "capacite": 281,
      "evaluation": 4.4
    },
    {
      "id": "HEB-010",
      "nom": "Appartements Médicaux Agdal",
      "type": "Résidence Médicalisée",
      "pays": "Maroc",
      "ville": "Rabat",
      "quartier": "Agdal",
      "adresse": "Avenue de France, Rabat",
      "telephone": "+212 537 777 888",
      "email": "contact@agdal-medical.ma",
      "tarifNuitSimple": 45,
      "tarifNuitDouble": 65,
      "petitDejeuner": true,
      "services": [
        "WiFi",
        "Assistance médicale",
        "Cuisine équipée",
        "Transfert clinique",
        "Blanchisserie"
      ],
      "distanceCliníque": "1.5 km Clinique Badr",
      "conventionWama": true,
      "capacite": 50,
      "evaluation": 4.5
    }
  ],
  "chauffeurs": [
    {
      "id": "CHA-001",
      "nom": "Seck",
      "prenom": "Abdou",
      "civilite": "M.",
      "pays": "Sénégal",
      "ville": "Dakar",
      "telephone": "+221 77 123 45 67",
      "email": "abdou.seck@transport.sn",
      "typeVehicule": "Berline",
      "marqueModele": "Toyota Camry 2022",
      "capacite": 4,
      "climatisation": true,
      "langues": [
        "Français",
        "Wolof",
        "Anglais"
      ],
      "experience": 8,
      "disponibilite24": true,
      "formationMedicale": true,
      "conventionWama": true,
      "tarifAeroport": 25,
      "tarifHeure": 15,
      "evaluation": 4.8
    },
    {
      "id": "CHA-002",
      "nom": "Traoré",
      "prenom": "Moussa",
      "civilite": "M.",
      "pays": "Côte d'Ivoire",
      "ville": "Abidjan",
      "telephone": "+225 07 12 34 56",
      "email": "moussa.traore@viptransport.ci",
      "typeVehicule": "Van",
      "marqueModele": "Mercedes Vito 2023",
      "capacite": 7,
      "climatisation": true,
      "langues": [
        "Français"
      ],
      "experience": 12,
      "disponibilite24": true,
      "formationMedicale": false,
      "conventionWama": true,
      "tarifAeroport": 30,
      "tarifHeure": 18,
      "evaluation": 4.6
    },
    {
      "id": "CHA-003",
      "nom": "Ben Salem",
      "prenom": "Karim",
      "civilite": "M.",
      "pays": "Tunisie",
      "ville": "Tunis",
      "telephone": "+216 98 123 456",
      "email": "karim.bensalem@medicaltransport.tn",
      "typeVehicule": "Ambulance",
      "marqueModele": "Renault Master Ambulance 2021",
      "capacite": 2,
      "climatisation": true,
      "langues": [
        "Français",
        "Arabe"
      ],
      "experience": 15,
      "disponibilite24": true,
      "formationMedicale": true,
      "conventionWama": true,
      "tarifAeroport": 50,
      "tarifHeure": 35,
      "evaluation": 4.9
    },
    {
      "id": "CHA-004",
      "nom": "Idrissi",
      "prenom": "Hassan",
      "civilite": "M.",
      "pays": "Maroc",
      "ville": "Casablanca",
      "telephone": "+212 661 123 456",
      "email": "hassan.idrissi@transfer.ma",
      "typeVehicule": "Berline",
      "marqueModele": "Mercedes Classe E 2023",
      "capacite": 4,
      "climatisation": true,
      "langues": [
        "Français",
        "Arabe",
        "Anglais"
      ],
      "experience": 10,
      "disponibilite24": false,
      "formationMedicale": false,
      "conventionWama": true,
      "tarifAeroport": 28,
      "tarifHeure": 16,
      "evaluation": 4.7
    }
  ],
  "assurances": [
    {
      "id": "ASS-001",
      "nom": "Allianz Care International",
      "type": "Internationale",
      "pays": "International",
      "telephone": "+33 1 40 75 10 10",
      "email": "care@allianz.com",
      "couverture": [
        "Hospitalisation",
        "Chirurgie",
        "Consultations",
        "Médicaments"
      ],
      "plafondAnnuel": 500000,
      "franchise": 500,
      "delaiPEC": "48-72h",
      "contactUrgence": "+33 1 40 75 10 00",
      "conventionWama": true,
      "evaluation": 4.7
    },
    {
      "id": "ASS-002",
      "nom": "MUGEFCI",
      "type": "Gouvernementale",
      "pays": "Côte d'Ivoire",
      "telephone": "+225 27 20 25 25 25",
      "email": "info@mugefci.ci",
      "couverture": [
        "Hospitalisation",
        "Évacuation sanitaire",
        "Rapatriement"
      ],
      "plafondAnnuel": 100000,
      "franchise": 0,
      "delaiPEC": "1 semaine",
      "contactUrgence": "+225 27 20 25 25 00",
      "conventionWama": true,
      "evaluation": 4.2
    },
    {
      "id": "ASS-003",
      "nom": "IPM (Assurances Internationales)",
      "type": "Locale",
      "pays": "Sénégal",
      "telephone": "+221 33 869 76 00",
      "email": "contact@ipm.sn",
      "couverture": [
        "Hospitalisation",
        "Consultations",
        "Analyses"
      ],
      "plafondAnnuel": 50000,
      "franchise": 200,
      "delaiPEC": "5-7 jours",
      "contactUrgence": "+221 33 869 76 10",
      "conventionWama": true,
      "evaluation": 4
    },
    {
      "id": "ASS-004",
      "nom": "SAHAM Assurance",
      "type": "Locale",
      "pays": "Maroc",
      "telephone": "+212 522 439 999",
      "email": "contact@sahamassurance.ma",
      "couverture": [
        "Hospitalisation",
        "Chirurgie",
        "Soins dentaires"
      ],
      "plafondAnnuel": 200000,
      "franchise": 300,
      "delaiPEC": "3-5 jours",
      "contactUrgence": "+212 522 439 900",
      "conventionWama": true,
      "evaluation": 4.5
    },
    {
      "id": "ASS-005",
      "nom": "China Life",
      "type": "Internationale",
      "pays": "Chine",
      "telephone": "+86 10 6363 7777",
      "email": "international@chinalife.com",
      "couverture": [
        "Hospitalisation internationale",
        "Chirurgie",
        "Rapatriement"
      ],
      "plafondAnnuel": 1000000,
      "franchise": 1000,
      "delaiPEC": "72h",
      "contactUrgence": "+86 400 669 5588",
      "conventionWama": false,
      "evaluation": 4.6
    }
  ]
} as DemoV3Partners;

export const generatedTemplates = [
  {
    "id": "TPL-001",
    "titre": "Premier Contact - Accueil",
    "categorie": "admission",
    "type": "email",
    "langue": "fr",
    "statut": 1,
    "sujet": "Bienvenue chez WAMA MED - Votre dossier {numero_dossier}",
    "corps": "Bonjour {civilite} {prenom_patient} {nom_patient},\n\nJe suis {prenom_cm} {nom_cm}, votre Case Manager chez WAMA MED.\n\nJ'ai bien reçu votre demande concernant {pathologie}. J'ai créé votre dossier sous le numéro {numero_dossier}.\n\nPour que nos médecins puissent étudier votre cas, je vais vous envoyer un questionnaire médical sécurisé à compléter.\n\nJe reste à votre disposition pour toute question.\n\nCordialement,\n{prenom_cm} {nom_cm}\nWAMA MED - Coordination Médicale Internationale",
    "variables": [
      "civilite",
      "prenom_patient",
      "nom_patient",
      "pathologie",
      "numero_dossier",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 145,
    "dateCreation": "2024-01-10"
  },
  {
    "id": "TPL-002",
    "titre": "Envoi Questionnaire Médical",
    "categorie": "admission",
    "type": "email",
    "langue": "fr",
    "statut": 2,
    "sujet": "Questionnaire Médical - Dossier {numero_dossier}",
    "corps": "Bonjour {civilite} {nom_patient},\n\nPour avancer sur votre dossier {numero_dossier}, merci de compléter le questionnaire médical en pièce jointe.\n\nDocuments nécessaires :\n- Rapports médicaux récents\n- Résultats d'examens (scanner, IRM, analyses)\n- Ordonnances en cours\n\nMerci de nous retourner ces documents sous 48-72h.\n\nCordialement,\n{prenom_cm} {nom_cm}",
    "variables": [
      "civilite",
      "nom_patient",
      "numero_dossier",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 132,
    "dateCreation": "2024-01-10"
  },
  {
    "id": "TPL-003",
    "titre": "Confirmation Réception Documents",
    "categorie": "admission",
    "type": "email",
    "langue": "fr",
    "statut": 3,
    "sujet": "Documents bien reçus - Dossier {numero_dossier}",
    "corps": "Bonjour {civilite} {nom_patient},\n\nJe vous confirme avoir bien reçu vos documents pour le dossier {numero_dossier}.\n\nDocuments reçus :\n✅ Questionnaire médical complété\n✅ Rapports médicaux\n✅ Résultats examens\n\nJe transmets immédiatement votre dossier à {titre_medecin} {nom_medecin} pour avis médical.\n\nVous aurez un retour sous 48-72h.\n\nCordialement,\n{prenom_cm} {nom_cm}\nWAMA MED",
    "variables": [
      "civilite",
      "nom_patient",
      "numero_dossier",
      "titre_medecin",
      "nom_medecin",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 87,
    "dateCreation": "2024-01-12"
  },
  {
    "id": "TPL-004",
    "titre": "Relance Documents Manquants",
    "categorie": "admission",
    "type": "email",
    "langue": "fr",
    "statut": 2,
    "sujet": "Rappel - Documents manquants pour dossier {numero_dossier}",
    "corps": "Bonjour {civilite} {nom_patient},\n\nJe me permets de vous relancer concernant votre dossier {numero_dossier}.\n\nPour avancer, j'ai besoin des documents suivants :\n📄 {documents_manquants}\n\nSans ces documents, je ne peux malheureusement pas transmettre votre dossier aux médecins.\n\nMerci de me les faire parvenir dans les meilleurs délais.\n\nCordialement,\n{prenom_cm} {nom_cm}",
    "variables": [
      "civilite",
      "nom_patient",
      "numero_dossier",
      "documents_manquants",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 45,
    "dateCreation": "2024-01-14"
  },
  {
    "id": "TPL-005",
    "titre": "Dossier Complet - En Cours d'Étude",
    "categorie": "admission",
    "type": "email",
    "langue": "fr",
    "statut": 4,
    "sujet": "Dossier complet - Transmission aux médecins",
    "corps": "Bonjour {civilite} {nom_patient},\n\nExcellente nouvelle ! Votre dossier {numero_dossier} est maintenant complet.\n\nJe l'ai transmis ce jour à {titre_medecin} {nom_medecin}, spécialiste en {specialite}, pour étude approfondie.\n\nDélai d'avis médical : 72h ouvrables\n\nJe vous tiendrai informé(e) dès réception de l'avis médical.\n\nCordialement,\n{prenom_cm} {nom_cm}\nWAMA MED",
    "variables": [
      "civilite",
      "nom_patient",
      "numero_dossier",
      "titre_medecin",
      "nom_medecin",
      "specialite",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 76,
    "dateCreation": "2024-01-16"
  },
  {
    "id": "TPL-006",
    "titre": "Premier Contact WhatsApp",
    "categorie": "admission",
    "type": "whatsapp",
    "langue": "fr",
    "statut": 1,
    "corps": "Bonjour {prenom_patient} 👋\n\nJe suis {prenom_cm}, votre Case Manager WAMA MED !\n\nJ'ai bien reçu votre demande pour {pathologie}.\n\nDossier créé : {numero_dossier} ✅\n\nJe vous envoie le questionnaire médical par email dans quelques minutes.\n\nN'hésitez pas à me contacter par WhatsApp pour toute question ! 📱\n\nÀ très vite,\n{prenom_cm}",
    "variables": [
      "prenom_patient",
      "prenom_cm",
      "pathologie",
      "numero_dossier"
    ],
    "utilisations": 92,
    "dateCreation": "2024-02-01"
  },
  {
    "id": "TPL-007",
    "titre": "Questionnaire Reçu - Confirmation",
    "categorie": "admission",
    "type": "sms",
    "langue": "fr",
    "statut": 2,
    "corps": "WAMA MED: Questionnaire bien reçu pour dossier {numero_dossier}. Étude en cours par nos médecins. Retour sous 72h. {prenom_cm}",
    "variables": [
      "numero_dossier",
      "prenom_cm"
    ],
    "utilisations": 67,
    "dateCreation": "2024-02-03"
  },
  {
    "id": "TPL-008",
    "titre": "Documents Reçus - Merci",
    "categorie": "admission",
    "type": "sms",
    "langue": "fr",
    "statut": 3,
    "corps": "WAMA MED: Documents bien reçus ! Dossier {numero_dossier} transmis à {titre_medecin} {nom_medecin}. Avis médical sous 48-72h. {prenom_cm}",
    "variables": [
      "numero_dossier",
      "titre_medecin",
      "nom_medecin",
      "prenom_cm"
    ],
    "utilisations": 54,
    "dateCreation": "2024-02-05"
  },
  {
    "id": "TPL-009",
    "titre": "Relance Documents - SMS",
    "categorie": "admission",
    "type": "sms",
    "langue": "fr",
    "statut": 2,
    "corps": "WAMA MED: Rappel dossier {numero_dossier}. Documents manquants : {documents_manquants}. Merci de les envoyer rapidement. {prenom_cm}",
    "variables": [
      "numero_dossier",
      "documents_manquants",
      "prenom_cm"
    ],
    "utilisations": 34,
    "dateCreation": "2024-02-07"
  },
  {
    "id": "TPL-010",
    "titre": "Bienvenue WAMA MED",
    "categorie": "admission",
    "type": "email",
    "langue": "fr",
    "statut": 1,
    "sujet": "Bienvenue chez WAMA MED - Votre coordination médicale",
    "corps": "Bonjour {civilite} {nom_patient},\n\nBienvenue chez WAMA MED ! 🏥\n\nNous sommes spécialisés dans la coordination médicale internationale et nous allons vous accompagner tout au long de votre parcours de soins.\n\nVotre Case Manager dédié(e) : {prenom_cm} {nom_cm}\n📧 Email : {email_cm}\n📱 Téléphone : {telephone_cm}\n💬 WhatsApp : Disponible\n\nNous sommes à votre écoute 7j/7 pour toute question.\n\nÀ très bientôt,\nL'équipe WAMA MED",
    "variables": [
      "civilite",
      "nom_patient",
      "prenom_cm",
      "nom_cm",
      "email_cm",
      "telephone_cm"
    ],
    "utilisations": 112,
    "dateCreation": "2024-02-10"
  },
  {
    "id": "TPL-011",
    "titre": "First Contact - Welcome (EN)",
    "categorie": "admission",
    "type": "email",
    "langue": "en",
    "statut": 1,
    "sujet": "Welcome to WAMA MED - Your file {numero_dossier}",
    "corps": "Dear {civilite} {prenom_patient} {nom_patient},\n\nI am {prenom_cm} {nom_cm}, your dedicated Case Manager at WAMA MED.\n\nI have received your request concerning {pathologie}. I have created your file under number {numero_dossier}.\n\nTo enable our physicians to review your case, I will send you a secure medical questionnaire to complete.\n\nI remain at your disposal for any questions.\n\nBest regards,\n{prenom_cm} {nom_cm}\nWAMA MED - International Medical Coordination",
    "variables": [
      "civilite",
      "prenom_patient",
      "nom_patient",
      "pathologie",
      "numero_dossier",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 78,
    "dateCreation": "2024-02-12"
  },
  {
    "id": "TPL-012",
    "titre": "Medical Questionnaire (EN)",
    "categorie": "admission",
    "type": "email",
    "langue": "en",
    "statut": 2,
    "sujet": "Medical Questionnaire - File {numero_dossier}",
    "corps": "Dear {civilite} {nom_patient},\n\nTo proceed with your file {numero_dossier}, please complete the attached medical questionnaire.\n\nRequired documents:\n- Recent medical reports\n- Examination results (CT scan, MRI, analyses)\n- Current prescriptions\n\nPlease send these documents within 48-72h.\n\nBest regards,\n{prenom_cm} {nom_cm}",
    "variables": [
      "civilite",
      "nom_patient",
      "numero_dossier",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 63,
    "dateCreation": "2024-02-14"
  },
  {
    "id": "TPL-013",
    "titre": "Documents Received (EN)",
    "categorie": "admission",
    "type": "email",
    "langue": "en",
    "statut": 3,
    "sujet": "Documents received - File {numero_dossier}",
    "corps": "Dear {civilite} {nom_patient},\n\nI confirm receipt of your documents for file {numero_dossier}.\n\nDocuments received:\n✅ Completed medical questionnaire\n✅ Medical reports\n✅ Examination results\n\nI am immediately forwarding your file to {titre_medecin} {nom_medecin} for medical opinion.\n\nYou will receive feedback within 48-72h.\n\nBest regards,\n{prenom_cm} {nom_cm}\nWAMA MED",
    "variables": [
      "civilite",
      "nom_patient",
      "numero_dossier",
      "titre_medecin",
      "nom_medecin",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 51,
    "dateCreation": "2024-02-16"
  },
  {
    "id": "TPL-014",
    "titre": "Welcome WhatsApp (EN)",
    "categorie": "admission",
    "type": "whatsapp",
    "langue": "en",
    "statut": 1,
    "corps": "Hello {prenom_patient} 👋\n\nI'm {prenom_cm}, your WAMA MED Case Manager!\n\nI received your request for {pathologie}.\n\nFile created: {numero_dossier} ✅\n\nI'll send you the medical questionnaire by email shortly.\n\nFeel free to contact me via WhatsApp for any questions! 📱\n\nTalk soon,\n{prenom_cm}",
    "variables": [
      "prenom_patient",
      "prenom_cm",
      "pathologie",
      "numero_dossier"
    ],
    "utilisations": 46,
    "dateCreation": "2024-02-18"
  },
  {
    "id": "TPL-015",
    "titre": "Documents Received SMS (EN)",
    "categorie": "admission",
    "type": "sms",
    "langue": "en",
    "statut": 3,
    "corps": "WAMA MED: Documents received! File {numero_dossier} forwarded to {titre_medecin} {nom_medecin}. Medical opinion within 48-72h. {prenom_cm}",
    "variables": [
      "numero_dossier",
      "titre_medecin",
      "nom_medecin",
      "prenom_cm"
    ],
    "utilisations": 39,
    "dateCreation": "2024-02-20"
  },
  {
    "id": "TPL-016",
    "titre": "Welcome WAMA MED (EN)",
    "categorie": "admission",
    "type": "email",
    "langue": "en",
    "statut": 1,
    "sujet": "Welcome to WAMA MED - Your medical coordination",
    "corps": "Dear {civilite} {nom_patient},\n\nWelcome to WAMA MED! 🏥\n\nWe specialize in international medical coordination and will support you throughout your medical journey.\n\nYour dedicated Case Manager: {prenom_cm} {nom_cm}\n📧 Email: {email_cm}\n📱 Phone: {telephone_cm}\n💬 WhatsApp: Available\n\nWe are at your service 7/7 for any questions.\n\nSee you soon,\nThe WAMA MED Team",
    "variables": [
      "civilite",
      "nom_patient",
      "prenom_cm",
      "nom_cm",
      "email_cm",
      "telephone_cm"
    ],
    "utilisations": 68,
    "dateCreation": "2024-02-22"
  },
  {
    "id": "TPL-017",
    "titre": "أول اتصال - ترحيب (AR)",
    "categorie": "admission",
    "type": "email",
    "langue": "ar",
    "statut": 1,
    "sujet": "مرحبا بك في WAMA MED - ملفك {numero_dossier}",
    "corps": "عزيزي {civilite} {prenom_patient} {nom_patient}،\n\nأنا {prenom_cm} {nom_cm}، مدير الحالة المخصص لك في WAMA MED.\n\nلقد تلقيت طلبك بشأن {pathologie}. لقد أنشأت ملفك تحت الرقم {numero_dossier}.\n\nلتمكين أطبائنا من دراسة حالتك، سأرسل لك استبيانًا طبيًا آمنًا لملئه.\n\nأنا تحت تصرفك لأي أسئلة.\n\nمع خالص التحيات،\n{prenom_cm} {nom_cm}\nWAMA MED - التنسيق الطبي الدولي",
    "variables": [
      "civilite",
      "prenom_patient",
      "nom_patient",
      "pathologie",
      "numero_dossier",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 42,
    "dateCreation": "2024-02-24"
  },
  {
    "id": "TPL-018",
    "titre": "استبيان طبي (AR)",
    "categorie": "admission",
    "type": "email",
    "langue": "ar",
    "statut": 2,
    "sujet": "استبيان طبي - ملف {numero_dossier}",
    "corps": "عزيزي {civilite} {nom_patient}،\n\nللمضي قدمًا في ملفك {numero_dossier}، يرجى ملء الاستبيان الطبي المرفق.\n\nالوثائق المطلوبة:\n- التقارير الطبية الحديثة\n- نتائج الفحوصات (الأشعة المقطعية، الرنين المغناطيسي، التحاليل)\n- الوصفات الطبية الحالية\n\nيرجى إرسال هذه الوثائق خلال 48-72 ساعة.\n\nمع خالص التحيات،\n{prenom_cm} {nom_cm}",
    "variables": [
      "civilite",
      "nom_patient",
      "numero_dossier",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 31,
    "dateCreation": "2024-02-26"
  },
  {
    "id": "TPL-019",
    "titre": "تم استلام الوثائق (AR)",
    "categorie": "admission",
    "type": "sms",
    "langue": "ar",
    "statut": 3,
    "corps": "WAMA MED: تم استلام الوثائق! ملف {numero_dossier} تم إرساله إلى {titre_medecin} {nom_medecin}. الرأي الطبي خلال 48-72 ساعة. {prenom_cm}",
    "variables": [
      "numero_dossier",
      "titre_medecin",
      "nom_medecin",
      "prenom_cm"
    ],
    "utilisations": 25,
    "dateCreation": "2024-02-28"
  },
  {
    "id": "TPL-020",
    "titre": "مرحبا واتساب (AR)",
    "categorie": "admission",
    "type": "whatsapp",
    "langue": "ar",
    "statut": 1,
    "corps": "مرحبا {prenom_patient} 👋\n\nأنا {prenom_cm}، مدير الحالة الخاص بك في WAMA MED!\n\nلقد تلقيت طلبك لـ {pathologie}.\n\nتم إنشاء الملف: {numero_dossier} ✅\n\nسأرسل لك الاستبيان الطبي عبر البريد الإلكتروني قريبًا.\n\nلا تتردد في الاتصال بي عبر واتساب لأي أسئلة! 📱\n\nنتحدث قريبًا،\n{prenom_cm}",
    "variables": [
      "prenom_patient",
      "prenom_cm",
      "pathologie",
      "numero_dossier"
    ],
    "utilisations": 28,
    "dateCreation": "2024-03-01"
  },
  {
    "id": "TPL-021",
    "titre": "Transmission Dossier Médecin",
    "categorie": "evaluation",
    "type": "email",
    "langue": "fr",
    "statut": 5,
    "sujet": "Transmission dossier médical - {numero_dossier}",
    "corps": "Bonjour {civilite} {nom_patient},\n\nVotre dossier {numero_dossier} a été transmis ce jour à {titre_medecin} {nom_medecin}, spécialiste en {specialite}.\n\nLe médecin va étudier votre cas et vous donner son avis professionnel sur :\n- La faisabilité de l'intervention\n- Les techniques envisagées\n- Les précautions nécessaires\n\nDélai de réponse : 48-72h ouvrables\n\nJe vous contacterai dès réception de l'avis médical.\n\nCordialement,\n{prenom_cm} {nom_cm}\nWAMA MED",
    "variables": [
      "civilite",
      "nom_patient",
      "numero_dossier",
      "titre_medecin",
      "nom_medecin",
      "specialite",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 85,
    "dateCreation": "2024-03-05"
  },
  {
    "id": "TPL-022",
    "titre": "Avis Médical Favorable",
    "categorie": "evaluation",
    "type": "email",
    "langue": "fr",
    "statut": 6,
    "sujet": "Excellente nouvelle - Avis médical favorable",
    "corps": "Bonjour {civilite} {nom_patient},\n\nJ'ai le plaisir de vous annoncer que {titre_medecin} {nom_medecin} a étudié votre dossier et confirme pouvoir vous prendre en charge pour {pathologie}.\n\nAvis médical : FAVORABLE ✅\n\nProchaines étapes :\n1. Préparation devis détaillé\n2. Validation financière (assurance/paiement)\n3. Proposition de planning\n\nJe reviens vers vous sous 24-48h avec le devis complet.\n\nExcellente nouvelle !\n{prenom_cm} {nom_cm}\nWAMA MED",
    "variables": [
      "civilite",
      "nom_patient",
      "titre_medecin",
      "nom_medecin",
      "pathologie",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 98,
    "dateCreation": "2024-03-07"
  },
  {
    "id": "TPL-023",
    "titre": "Questions Complémentaires Médecin",
    "categorie": "evaluation",
    "type": "email",
    "langue": "fr",
    "statut": 5,
    "sujet": "Questions complémentaires - Dossier {numero_dossier}",
    "corps": "Bonjour {civilite} {nom_patient},\n\n{titre_medecin} {nom_medecin} a étudié votre dossier {numero_dossier} et aurait besoin de quelques précisions :\n\nQuestions du médecin :\n{questions_medecin}\n\nDocuments complémentaires demandés (si nécessaire) :\n{documents_complementaires}\n\nMerci de me transmettre ces éléments rapidement pour que le médecin puisse finaliser son avis.\n\nCordialement,\n{prenom_cm} {nom_cm}",
    "variables": [
      "civilite",
      "nom_patient",
      "numero_dossier",
      "titre_medecin",
      "nom_medecin",
      "questions_medecin",
      "documents_complementaires",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 44,
    "dateCreation": "2024-03-09"
  },
  {
    "id": "TPL-024",
    "titre": "Avis Médical Défavorable",
    "categorie": "evaluation",
    "type": "email",
    "langue": "fr",
    "statut": 6,
    "sujet": "Avis médical - Dossier {numero_dossier}",
    "corps": "Bonjour {civilite} {nom_patient},\n\nJ'ai reçu l'avis de {titre_medecin} {nom_medecin} concernant votre dossier {numero_dossier}.\n\nMalheureusement, le médecin estime que l'intervention pour {pathologie} n'est pas réalisable actuellement pour les raisons suivantes :\n{raisons_refus}\n\nOptions alternatives possibles :\n{alternatives}\n\nJe reste à votre disposition pour en discuter et explorer d'autres solutions.\n\nCordialement,\n{prenom_cm} {nom_cm}\nWAMA MED",
    "variables": [
      "civilite",
      "nom_patient",
      "numero_dossier",
      "titre_medecin",
      "nom_medecin",
      "pathologie",
      "raisons_refus",
      "alternatives",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 19,
    "dateCreation": "2024-03-11"
  },
  {
    "id": "TPL-025",
    "titre": "Avis Médical SMS",
    "categorie": "evaluation",
    "type": "sms",
    "langue": "fr",
    "statut": 6,
    "corps": "WAMA MED: Avis médical reçu pour {numero_dossier}! {titre_medecin} {nom_medecin} confirme la prise en charge. Email détaillé envoyé. {prenom_cm}",
    "variables": [
      "numero_dossier",
      "titre_medecin",
      "nom_medecin",
      "prenom_cm"
    ],
    "utilisations": 72,
    "dateCreation": "2024-03-13"
  },
  {
    "id": "TPL-026",
    "titre": "Étude Dossier en Cours",
    "categorie": "evaluation",
    "type": "email",
    "langue": "fr",
    "statut": 5,
    "sujet": "Étude de votre dossier en cours",
    "corps": "Bonjour {civilite} {nom_patient},\n\nVotre dossier {numero_dossier} est actuellement en cours d'étude par {titre_medecin} {nom_medecin}.\n\nLe médecin prend le temps nécessaire pour analyser attentivement :\n✓ Vos antécédents médicaux\n✓ Vos examens récents\n✓ La complexité de votre cas\n\nRetour prévu : {date_retour_prevu}\n\nJe vous tiendrai informé(e) dès que j'aurai des nouvelles.\n\nPatience et confiance,\n{prenom_cm} {nom_cm}",
    "variables": [
      "civilite",
      "nom_patient",
      "numero_dossier",
      "titre_medecin",
      "nom_medecin",
      "date_retour_prevu",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 53,
    "dateCreation": "2024-03-15"
  },
  {
    "id": "TPL-027",
    "titre": "Medical Opinion Positive (EN)",
    "categorie": "evaluation",
    "type": "email",
    "langue": "en",
    "statut": 6,
    "sujet": "Great news - Positive medical opinion",
    "corps": "Dear {civilite} {nom_patient},\n\nI am pleased to inform you that {titre_medecin} {nom_medecin} has reviewed your file and confirms that he/she can treat you for {pathologie}.\n\nMedical opinion: FAVORABLE ✅\n\nNext steps:\n1. Detailed quotation preparation\n2. Financial validation (insurance/payment)\n3. Schedule proposal\n\nI will contact you within 24-48h with the complete quotation.\n\nExcellent news!\n{prenom_cm} {nom_cm}\nWAMA MED",
    "variables": [
      "civilite",
      "nom_patient",
      "titre_medecin",
      "nom_medecin",
      "pathologie",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 61,
    "dateCreation": "2024-03-17"
  },
  {
    "id": "TPL-028",
    "titre": "File Transmitted to Doctor (EN)",
    "categorie": "evaluation",
    "type": "email",
    "langue": "en",
    "statut": 5,
    "sujet": "File transmitted - {numero_dossier}",
    "corps": "Dear {civilite} {nom_patient},\n\nYour file {numero_dossier} has been transmitted today to {titre_medecin} {nom_medecin}, specialist in {specialite}.\n\nThe physician will review your case and provide professional opinion on:\n- Procedure feasibility\n- Proposed techniques\n- Necessary precautions\n\nResponse time: 48-72h business days\n\nI will contact you upon receipt of the medical opinion.\n\nBest regards,\n{prenom_cm} {nom_cm}\nWAMA MED",
    "variables": [
      "civilite",
      "nom_patient",
      "numero_dossier",
      "titre_medecin",
      "nom_medecin",
      "specialite",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 48,
    "dateCreation": "2024-03-19"
  },
  {
    "id": "TPL-029",
    "titre": "Additional Questions (EN)",
    "categorie": "evaluation",
    "type": "email",
    "langue": "en",
    "statut": 5,
    "sujet": "Additional questions - File {numero_dossier}",
    "corps": "Dear {civilite} {nom_patient},\n\n{titre_medecin} {nom_medecin} has reviewed your file {numero_dossier} and needs some clarifications:\n\nPhysician's questions:\n{questions_medecin}\n\nAdditional documents requested (if necessary):\n{documents_complementaires}\n\nPlease provide this information quickly so the physician can finalize the opinion.\n\nBest regards,\n{prenom_cm} {nom_cm}",
    "variables": [
      "civilite",
      "nom_patient",
      "numero_dossier",
      "titre_medecin",
      "nom_medecin",
      "questions_medecin",
      "documents_complementaires",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 32,
    "dateCreation": "2024-03-21"
  },
  {
    "id": "TPL-030",
    "titre": "Medical Opinion SMS (EN)",
    "categorie": "evaluation",
    "type": "sms",
    "langue": "en",
    "statut": 6,
    "corps": "WAMA MED: Medical opinion received for {numero_dossier}! {titre_medecin} {nom_medecin} confirms treatment. Detailed email sent. {prenom_cm}",
    "variables": [
      "numero_dossier",
      "titre_medecin",
      "nom_medecin",
      "prenom_cm"
    ],
    "utilisations": 45,
    "dateCreation": "2024-03-23"
  },
  {
    "id": "TPL-031",
    "titre": "رأي طبي إيجابي (AR)",
    "categorie": "evaluation",
    "type": "email",
    "langue": "ar",
    "statut": 6,
    "sujet": "أخبار ممتازة - رأي طبي إيجابي",
    "corps": "عزيزي {civilite} {nom_patient}،\n\nيسرني أن أبلغك أن {titre_medecin} {nom_medecin} قد درس ملفك ويؤكد إمكانية علاجك لـ {pathologie}.\n\nالرأي الطبي: إيجابي ✅\n\nالخطوات التالية:\n1. إعداد عرض أسعار مفصل\n2. التحقق المالي (تأمين/دفع)\n3. اقتراح الجدول الزمني\n\nسأتواصل معك خلال 24-48 ساعة مع عرض الأسعار الكامل.\n\nأخبار ممتازة!\n{prenom_cm} {nom_cm}\nWAMA MED",
    "variables": [
      "civilite",
      "nom_patient",
      "titre_medecin",
      "nom_medecin",
      "pathologie",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 35,
    "dateCreation": "2024-03-25"
  },
  {
    "id": "TPL-032",
    "titre": "رأي طبي SMS (AR)",
    "categorie": "evaluation",
    "type": "sms",
    "langue": "ar",
    "statut": 6,
    "corps": "WAMA MED: تم استلام الرأي الطبي لـ {numero_dossier}! {titre_medecin} {nom_medecin} يؤكد العلاج. تم إرسال بريد إلكتروني مفصل. {prenom_cm}",
    "variables": [
      "numero_dossier",
      "titre_medecin",
      "nom_medecin",
      "prenom_cm"
    ],
    "utilisations": 27,
    "dateCreation": "2024-03-27"
  },
  {
    "id": "TPL-033",
    "titre": "Envoi Devis Détaillé",
    "categorie": "validation",
    "type": "email",
    "langue": "fr",
    "statut": 8,
    "sujet": "Devis détaillé - Dossier {numero_dossier}",
    "corps": "Bonjour {civilite} {nom_patient},\n\nSuite à l'avis favorable de {titre_medecin} {nom_medecin}, voici votre devis détaillé.\n\n📋 Intervention : {pathologie}\n🏥 Clinique : {nom_clinique}\n👨‍⚕️ Médecin : {titre_medecin} {nom_medecin}\n💰 Coût total : {montant_devis} MAD\n\nLe devis inclut :\n✅ Intervention chirurgicale\n✅ Hospitalisation ({nombre_nuits} nuits)\n✅ Suivi post-opératoire\n✅ Services de coordination WAMA MED\n\nValable 30 jours.\n\nOptions de paiement et assurance disponibles.\n\nCordialement,\n{prenom_cm} {nom_cm}",
    "variables": [
      "civilite",
      "nom_patient",
      "numero_dossier",
      "titre_medecin",
      "nom_medecin",
      "pathologie",
      "nom_clinique",
      "montant_devis",
      "nombre_nuits",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 89,
    "dateCreation": "2024-04-01"
  },
  {
    "id": "TPL-034",
    "titre": "PEC Assurance Acceptée",
    "categorie": "validation",
    "type": "email",
    "langue": "fr",
    "statut": 8,
    "sujet": "Prise en charge acceptée - {numero_dossier}",
    "corps": "Bonjour {civilite} {nom_patient},\n\nExcellente nouvelle ! Votre assurance {nom_assurance} a accepté la prise en charge de votre intervention.\n\nMontant pris en charge : {montant_pec} MAD\nReste à votre charge : {reste_a_charge} MAD\n\nProchaine étape : Planification des dates de votre séjour médical.\n\nJe vous contacte sous 24h pour vous proposer un planning.\n\nTrès bonne nouvelle !\n{prenom_cm} {nom_cm}\nWAMA MED",
    "variables": [
      "civilite",
      "nom_patient",
      "numero_dossier",
      "nom_assurance",
      "montant_pec",
      "reste_a_charge",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 67,
    "dateCreation": "2024-04-03"
  },
  {
    "id": "TPL-035",
    "titre": "Proposition Planning",
    "categorie": "validation",
    "type": "email",
    "langue": "fr",
    "statut": 9,
    "sujet": "Proposition de planning - Dossier {numero_dossier}",
    "corps": "Bonjour {civilite} {nom_patient},\n\nJe vous propose le planning suivant pour votre séjour médical :\n\n📅 Date arrivée : {date_arrivee}\n🏥 Date consultation : {date_consultation}\n⚕️ Date intervention : {date_intervention}\n✈️ Date retour : {date_retour}\n\nDurée totale séjour : {duree_sejour} jours\n\nMerci de me confirmer ces dates ou de me proposer des alternatives.\n\nCordialement,\n{prenom_cm} {nom_cm}",
    "variables": [
      "civilite",
      "nom_patient",
      "numero_dossier",
      "date_arrivee",
      "date_consultation",
      "date_intervention",
      "date_retour",
      "duree_sejour",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 75,
    "dateCreation": "2024-04-05"
  },
  {
    "id": "TPL-036",
    "titre": "Validation Financement",
    "categorie": "validation",
    "type": "email",
    "langue": "fr",
    "statut": 8,
    "sujet": "Confirmation paiement - {numero_dossier}",
    "corps": "Bonjour {civilite} {nom_patient},\n\nJe confirme la réception de votre paiement pour le dossier {numero_dossier}.\n\nMontant reçu : {montant_paye} MAD ✅\nMode de paiement : {mode_paiement}\n\nNous pouvons maintenant procéder à la réservation définitive :\n✓ Dates avec le médecin\n✓ Chambres à la clinique\n✓ Hébergement accompagnant\n\nJe vous envoie les confirmations sous 48h.\n\nMerci de votre confiance !\n{prenom_cm} {nom_cm}",
    "variables": [
      "civilite",
      "nom_patient",
      "numero_dossier",
      "montant_paye",
      "mode_paiement",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 58,
    "dateCreation": "2024-04-07"
  },
  {
    "id": "TPL-037",
    "titre": "Consentements à Signer",
    "categorie": "validation",
    "type": "email",
    "langue": "fr",
    "statut": 10,
    "sujet": "Consentements éclairés - Dossier {numero_dossier}",
    "corps": "Bonjour {civilite} {nom_patient},\n\nAvant votre intervention, vous devez signer les consentements éclairés suivants :\n\n📄 Documents à signer (en pièce jointe) :\n1. Consentement chirurgical\n2. Consentement anesthésie\n3. Décharge responsabilité\n4. Accord traitement données\n\nMerci de les lire attentivement, les signer et me les retourner par email (scan/photo).\n\nJe reste disponible pour toute question.\n\nCordialement,\n{prenom_cm} {nom_cm}",
    "variables": [
      "civilite",
      "nom_patient",
      "numero_dossier",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 43,
    "dateCreation": "2024-04-09"
  },
  {
    "id": "TPL-038",
    "titre": "Devis Accepté SMS",
    "categorie": "validation",
    "type": "sms",
    "langue": "fr",
    "statut": 8,
    "corps": "WAMA MED: Devis {numero_dossier} accepté! Total {montant_devis} MAD. Planning envoyé par email. {prenom_cm}",
    "variables": [
      "numero_dossier",
      "montant_devis",
      "prenom_cm"
    ],
    "utilisations": 61,
    "dateCreation": "2024-04-11"
  },
  {
    "id": "TPL-039",
    "titre": "Detailed Quotation (EN)",
    "categorie": "validation",
    "type": "email",
    "langue": "en",
    "statut": 8,
    "sujet": "Detailed quotation - File {numero_dossier}",
    "corps": "Dear {civilite} {nom_patient},\n\nFollowing the positive opinion from {titre_medecin} {nom_medecin}, here is your detailed quotation.\n\n📋 Procedure: {pathologie}\n🏥 Hospital: {nom_clinique}\n👨‍⚕️ Physician: {titre_medecin} {nom_medecin}\n💰 Total cost: {montant_devis} MAD\n\nThe quotation includes:\n✅ Surgical procedure\n✅ Hospitalization ({nombre_nuits} nights)\n✅ Post-operative follow-up\n✅ WAMA MED coordination services\n\nValid for 30 days.\n\nPayment and insurance options available.\n\nBest regards,\n{prenom_cm} {nom_cm}",
    "variables": [
      "civilite",
      "nom_patient",
      "numero_dossier",
      "titre_medecin",
      "nom_medecin",
      "pathologie",
      "nom_clinique",
      "montant_devis",
      "nombre_nuits",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 52,
    "dateCreation": "2024-04-13"
  },
  {
    "id": "TPL-040",
    "titre": "Schedule Proposal (EN)",
    "categorie": "validation",
    "type": "email",
    "langue": "en",
    "statut": 9,
    "sujet": "Schedule proposal - File {numero_dossier}",
    "corps": "Dear {civilite} {nom_patient},\n\nI propose the following schedule for your medical stay:\n\n📅 Arrival date: {date_arrivee}\n🏥 Consultation date: {date_consultation}\n⚕️ Procedure date: {date_intervention}\n✈️ Return date: {date_retour}\n\nTotal stay duration: {duree_sejour} days\n\nPlease confirm these dates or suggest alternatives.\n\nBest regards,\n{prenom_cm} {nom_cm}",
    "variables": [
      "civilite",
      "nom_patient",
      "numero_dossier",
      "date_arrivee",
      "date_consultation",
      "date_intervention",
      "date_retour",
      "duree_sejour",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 44,
    "dateCreation": "2024-04-15"
  },
  {
    "id": "TPL-041",
    "titre": "Insurance Approved (EN)",
    "categorie": "validation",
    "type": "email",
    "langue": "en",
    "statut": 8,
    "sujet": "Coverage approved - {numero_dossier}",
    "corps": "Dear {civilite} {nom_patient},\n\nGreat news! Your insurance {nom_assurance} has approved coverage for your procedure.\n\nAmount covered: {montant_pec} MAD\nYour responsibility: {reste_a_charge} MAD\n\nNext step: Scheduling your medical stay dates.\n\nI will contact you within 24h to propose a schedule.\n\nExcellent news!\n{prenom_cm} {nom_cm}\nWAMA MED",
    "variables": [
      "civilite",
      "nom_patient",
      "numero_dossier",
      "nom_assurance",
      "montant_pec",
      "reste_a_charge",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 39,
    "dateCreation": "2024-04-17"
  },
  {
    "id": "TPL-042",
    "titre": "عرض أسعار مفصل (AR)",
    "categorie": "validation",
    "type": "email",
    "langue": "ar",
    "statut": 8,
    "sujet": "عرض أسعار مفصل - ملف {numero_dossier}",
    "corps": "عزيزي {civilite} {nom_patient}،\n\nبعد الرأي الإيجابي من {titre_medecin} {nom_medecin}، إليك عرض الأسعار المفصل.\n\n📋 الإجراء: {pathologie}\n🏥 المستشفى: {nom_clinique}\n👨‍⚕️ الطبيب: {titre_medecin} {nom_medecin}\n💰 التكلفة الإجمالية: {montant_devis} درهم مغربي\n\nيشمل عرض الأسعار:\n✅ العملية الجراحية\n✅ الإقامة في المستشفى ({nombre_nuits} ليال)\n✅ المتابعة بعد العملية\n✅ خدمات التنسيق WAMA MED\n\nصالح لمدة 30 يومًا.\n\nخيارات الدفع والتأمين متاحة.\n\nمع خالص التحيات،\n{prenom_cm} {nom_cm}",
    "variables": [
      "civilite",
      "nom_patient",
      "numero_dossier",
      "titre_medecin",
      "nom_medecin",
      "pathologie",
      "nom_clinique",
      "montant_devis",
      "nombre_nuits",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 31,
    "dateCreation": "2024-04-19"
  },
  {
    "id": "TPL-043",
    "titre": "Confirmation Voyage",
    "categorie": "operationnel",
    "type": "email",
    "langue": "fr",
    "statut": 11,
    "sujet": "Confirmation voyage - Dossier {numero_dossier}",
    "corps": "Bonjour {civilite} {nom_patient},\n\nVotre séjour médical est confirmé ! Voici tous les détails :\n\n✈️ VOL\nDépart : {date_depart} - Vol {numero_vol}\nArrivée : {date_arrivee} - Aéroport {aeroport}\n\n🚗 TRANSFERT\nChauffeur : {nom_chauffeur} ({telephone_chauffeur})\nAccueil avec pancarte WAMA MED\n\n🏨 HÉBERGEMENT\nHôtel : {nom_hotel}\nAdresse : {adresse_hotel}\nCheck-in : {date_checkin}\n\n🏥 RENDEZ-VOUS\nConsultation : {date_consultation} à {heure_consultation}\nClinique : {nom_clinique}\n\nJe reste joignable 24/7 : {telephone_cm}\n\nBon voyage !\n{prenom_cm} {nom_cm}",
    "variables": [
      "civilite",
      "nom_patient",
      "numero_dossier",
      "date_depart",
      "numero_vol",
      "date_arrivee",
      "aeroport",
      "nom_chauffeur",
      "telephone_chauffeur",
      "nom_hotel",
      "adresse_hotel",
      "date_checkin",
      "date_consultation",
      "heure_consultation",
      "nom_clinique",
      "telephone_cm",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 82,
    "dateCreation": "2024-05-01"
  },
  {
    "id": "TPL-044",
    "titre": "Instructions Pré-Opératoires",
    "categorie": "operationnel",
    "type": "email",
    "langue": "fr",
    "statut": 13,
    "sujet": "Instructions importantes avant intervention",
    "corps": "Bonjour {civilite} {nom_patient},\n\nVotre intervention est prévue le {date_intervention} à {heure_intervention}.\n\n⚠️ INSTRUCTIONS IMPORTANTES :\n\nÀ FAIRE :\n✅ Être à jeun depuis minuit (pas de nourriture ni boisson)\n✅ Prendre une douche avec savon antiseptique\n✅ Retirer bijoux, vernis à ongles, maquillage\n✅ Apporter vos examens récents\n\nÀ NE PAS FAIRE :\n❌ Ne pas fumer 12h avant\n❌ Ne pas boire d'alcool 24h avant\n❌ Ne pas prendre d'aspirine 7 jours avant\n\nRendez-vous clinique : {heure_rdv_clinique}\n\nQuestions ? Appelez-moi : {telephone_cm}\n\nCourage !\n{prenom_cm} {nom_cm}",
    "variables": [
      "civilite",
      "nom_patient",
      "date_intervention",
      "heure_intervention",
      "heure_rdv_clinique",
      "telephone_cm",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 71,
    "dateCreation": "2024-05-03"
  },
  {
    "id": "TPL-045",
    "titre": "Arrivée Hôtel WhatsApp",
    "categorie": "operationnel",
    "type": "whatsapp",
    "langue": "fr",
    "statut": 12,
    "corps": "Bonjour {prenom_patient} 👋\n\nBienvenue à {ville} ! ✈️\n\nJ'espère que votre voyage s'est bien passé.\n\n🏨 Votre hébergement :\n{nom_hotel}\n📍 {adresse_hotel}\n📞 {telephone_hotel}\n\n🚗 Votre chauffeur {nom_chauffeur} vous attend à l'aéroport avec une pancarte WAMA MED.\n\n📱 Son numéro : {telephone_chauffeur}\n\nJe vous appelle ce soir pour vérifier que tout va bien.\n\nBon séjour ! 🌟\n{prenom_cm}",
    "variables": [
      "prenom_patient",
      "ville",
      "nom_hotel",
      "adresse_hotel",
      "telephone_hotel",
      "nom_chauffeur",
      "telephone_chauffeur",
      "prenom_cm"
    ],
    "utilisations": 64,
    "dateCreation": "2024-05-05"
  },
  {
    "id": "TPL-046",
    "titre": "Rappel RDV J-1",
    "categorie": "operationnel",
    "type": "sms",
    "langue": "fr",
    "statut": 13,
    "corps": "WAMA MED: RAPPEL RDV demain {date_rdv} à {heure_rdv} avec {titre_medecin} {nom_medecin}. Lieu: {nom_clinique}. À jeun si analyses prévues. {prenom_cm}",
    "variables": [
      "date_rdv",
      "heure_rdv",
      "titre_medecin",
      "nom_medecin",
      "nom_clinique",
      "prenom_cm"
    ],
    "utilisations": 93,
    "dateCreation": "2024-05-07"
  },
  {
    "id": "TPL-047",
    "titre": "Intervention Réussie - Famille",
    "categorie": "operationnel",
    "type": "whatsapp",
    "langue": "fr",
    "statut": 13,
    "corps": "Bonjour 👋\n\nExcellente nouvelle ! ✅\n\nL'intervention de {prenom_patient} s'est très bien passée.\n\n⚕️ {titre_medecin} {nom_medecin} est très satisfait du résultat.\n\n{prenom_patient} est en salle de réveil et se porte bien. Tout s'est déroulé comme prévu.\n\nVous pourrez le/la voir dans quelques heures.\n\nJe vous rappelle dès qu'il/elle est en chambre.\n\nTrès bonne nouvelle ! 🙏\n{prenom_cm}",
    "variables": [
      "prenom_patient",
      "titre_medecin",
      "nom_medecin",
      "prenom_cm"
    ],
    "utilisations": 48,
    "dateCreation": "2024-05-09"
  },
  {
    "id": "TPL-048",
    "titre": "Sortie Clinique",
    "categorie": "operationnel",
    "type": "email",
    "langue": "fr",
    "statut": 14,
    "sujet": "Sortie de clinique - Instructions",
    "corps": "Bonjour {civilite} {nom_patient},\n\nFélicitations ! Vous sortez de la clinique aujourd'hui.\n\n📋 INSTRUCTIONS POST-OPÉRATOIRES :\n\nMédicaments :\n{liste_medicaments}\n\nSoins :\n{instructions_soins}\n\nÀ FAIRE :\n✅ Repos complet pendant {duree_repos} jours\n✅ Prendre médicaments prescrits\n✅ Garder pansements propres et secs\n\nÀ ÉVITER :\n❌ Efforts physiques\n❌ Port de charges lourdes\n❌ Bains (douche OK)\n\n🏨 Retour à l'hôtel : {nom_hotel}\n\nProchaine consultation de contrôle : {date_controle}\n\nUrgence ? Appelez-moi 24/7 : {telephone_cm}\n\nBon rétablissement !\n{prenom_cm} {nom_cm}",
    "variables": [
      "civilite",
      "nom_patient",
      "liste_medicaments",
      "instructions_soins",
      "duree_repos",
      "nom_hotel",
      "date_controle",
      "telephone_cm",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 55,
    "dateCreation": "2024-05-11"
  },
  {
    "id": "TPL-049",
    "titre": "Travel Confirmation (EN)",
    "categorie": "operationnel",
    "type": "email",
    "langue": "en",
    "statut": 11,
    "sujet": "Travel confirmation - File {numero_dossier}",
    "corps": "Dear {civilite} {nom_patient},\n\nYour medical stay is confirmed! Here are all the details:\n\n✈️ FLIGHT\nDeparture: {date_depart} - Flight {numero_vol}\nArrival: {date_arrivee} - Airport {aeroport}\n\n🚗 TRANSFER\nDriver: {nom_chauffeur} ({telephone_chauffeur})\nWelcome with WAMA MED sign\n\n🏨 ACCOMMODATION\nHotel: {nom_hotel}\nAddress: {adresse_hotel}\nCheck-in: {date_checkin}\n\n🏥 APPOINTMENTS\nConsultation: {date_consultation} at {heure_consultation}\nClinic: {nom_clinique}\n\nI'm available 24/7: {telephone_cm}\n\nSafe travels!\n{prenom_cm} {nom_cm}",
    "variables": [
      "civilite",
      "nom_patient",
      "numero_dossier",
      "date_depart",
      "numero_vol",
      "date_arrivee",
      "aeroport",
      "nom_chauffeur",
      "telephone_chauffeur",
      "nom_hotel",
      "adresse_hotel",
      "date_checkin",
      "date_consultation",
      "heure_consultation",
      "nom_clinique",
      "telephone_cm",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 47,
    "dateCreation": "2024-05-13"
  },
  {
    "id": "TPL-050",
    "titre": "Pre-Op Instructions (EN)",
    "categorie": "operationnel",
    "type": "email",
    "langue": "en",
    "statut": 13,
    "sujet": "Important instructions before procedure",
    "corps": "Dear {civilite} {nom_patient},\n\nYour procedure is scheduled for {date_intervention} at {heure_intervention}.\n\n⚠️ IMPORTANT INSTRUCTIONS:\n\nTO DO:\n✅ Fast from midnight (no food or drink)\n✅ Shower with antiseptic soap\n✅ Remove jewelry, nail polish, makeup\n✅ Bring recent exams\n\nDO NOT:\n❌ Do not smoke 12h before\n❌ Do not drink alcohol 24h before\n❌ Do not take aspirin 7 days before\n\nClinic appointment: {heure_rdv_clinique}\n\nQuestions? Call me: {telephone_cm}\n\nGood luck!\n{prenom_cm} {nom_cm}",
    "variables": [
      "civilite",
      "nom_patient",
      "date_intervention",
      "heure_intervention",
      "heure_rdv_clinique",
      "telephone_cm",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 38,
    "dateCreation": "2024-05-15"
  },
  {
    "id": "TPL-051",
    "titre": "Appointment Reminder SMS (EN)",
    "categorie": "operationnel",
    "type": "sms",
    "langue": "en",
    "statut": 13,
    "corps": "WAMA MED: REMINDER appointment tomorrow {date_rdv} at {heure_rdv} with {titre_medecin} {nom_medecin}. Location: {nom_clinique}. Fasting if tests. {prenom_cm}",
    "variables": [
      "date_rdv",
      "heure_rdv",
      "titre_medecin",
      "nom_medecin",
      "nom_clinique",
      "prenom_cm"
    ],
    "utilisations": 41,
    "dateCreation": "2024-05-17"
  },
  {
    "id": "TPL-052",
    "titre": "تأكيد السفر (AR)",
    "categorie": "operationnel",
    "type": "sms",
    "langue": "ar",
    "statut": 11,
    "corps": "WAMA MED: تم تأكيد إقامتك الطبية! الوصول {date_arrivee}. السائق {nom_chauffeur} سيكون في انتظارك. {prenom_cm}",
    "variables": [
      "date_arrivee",
      "nom_chauffeur",
      "prenom_cm"
    ],
    "utilisations": 29,
    "dateCreation": "2024-05-19"
  },
  {
    "id": "TPL-053",
    "titre": "Suivi Post-Op J+7",
    "categorie": "cloture",
    "type": "email",
    "langue": "fr",
    "statut": 17,
    "sujet": "Suivi post-opératoire - Comment allez-vous ?",
    "corps": "Bonjour {civilite} {nom_patient},\n\nJ'espère que vous vous remettez bien de votre intervention du {date_intervention}.\n\nComment vous sentez-vous aujourd'hui ?\n\n✓ Douleur (échelle 1-10) : ?\n✓ Prise des médicaments : ?\n✓ Cicatrisation : ?\n✓ Questions/inquiétudes : ?\n\nMerci de me donner de vos nouvelles et de m'envoyer une photo des cicatrices si possible.\n\nProchain contrôle médical : {date_controle}\n\nJe reste disponible pour toute question.\n\nBon rétablissement !\n{prenom_cm} {nom_cm}",
    "variables": [
      "civilite",
      "nom_patient",
      "date_intervention",
      "date_controle",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 68,
    "dateCreation": "2024-06-01"
  },
  {
    "id": "TPL-054",
    "titre": "Demande Témoignage",
    "categorie": "cloture",
    "type": "email",
    "langue": "fr",
    "statut": 18,
    "sujet": "Votre avis compte pour nous",
    "corps": "Bonjour {civilite} {nom_patient},\n\nVotre dossier {numero_dossier} est maintenant clôturé.\n\nNous espérons que votre expérience avec WAMA MED a été positive.\n\nVotre avis nous est précieux ! Pourriez-vous nous accorder quelques minutes pour :\n\n1️⃣ Laisser un avis Google (lien)\n2️⃣ Noter notre service (1-5 étoiles)\n3️⃣ Partager un témoignage écrit ou vidéo\n\nLes futurs patients apprécieront beaucoup de lire votre expérience.\n\nMerci infiniment pour votre confiance !\n\nL'équipe WAMA MED reste à votre disposition pour tout suivi futur.\n\nCordialement,\n{prenom_cm} {nom_cm}",
    "variables": [
      "civilite",
      "nom_patient",
      "numero_dossier",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 42,
    "dateCreation": "2024-06-05"
  },
  {
    "id": "TPL-055",
    "titre": "Suivi Post-Op SMS",
    "categorie": "cloture",
    "type": "sms",
    "langue": "fr",
    "statut": 17,
    "corps": "WAMA MED: Comment allez-vous 7 jours après l'intervention ? Merci de me donner de vos nouvelles. {prenom_cm} ({telephone_cm})",
    "variables": [
      "prenom_cm",
      "telephone_cm"
    ],
    "utilisations": 51,
    "dateCreation": "2024-06-07"
  },
  {
    "id": "TPL-056",
    "titre": "Post-Op Follow-up D+7 (EN)",
    "categorie": "cloture",
    "type": "email",
    "langue": "en",
    "statut": 17,
    "sujet": "Post-operative follow-up - How are you?",
    "corps": "Dear {civilite} {nom_patient},\n\nI hope you are recovering well from your procedure on {date_intervention}.\n\nHow are you feeling today?\n\n✓ Pain (scale 1-10): ?\n✓ Medication compliance: ?\n✓ Healing: ?\n✓ Questions/concerns: ?\n\nPlease update me and send a photo of the scars if possible.\n\nNext medical check-up: {date_controle}\n\nI remain available for any questions.\n\nGet well soon!\n{prenom_cm} {nom_cm}",
    "variables": [
      "civilite",
      "nom_patient",
      "date_intervention",
      "date_controle",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 37,
    "dateCreation": "2024-06-09"
  },
  {
    "id": "TPL-057",
    "titre": "Testimonial Request (EN)",
    "categorie": "cloture",
    "type": "email",
    "langue": "en",
    "statut": 18,
    "sujet": "Your opinion matters to us",
    "corps": "Dear {civilite} {nom_patient},\n\nYour file {numero_dossier} is now closed.\n\nWe hope your experience with WAMA MED was positive.\n\nYour opinion is precious to us! Could you spare a few minutes to:\n\n1️⃣ Leave a Google review (link)\n2️⃣ Rate our service (1-5 stars)\n3️⃣ Share a written or video testimonial\n\nFuture patients will greatly appreciate reading your experience.\n\nThank you so much for your trust!\n\nThe WAMA MED team remains at your disposal for any future follow-up.\n\nBest regards,\n{prenom_cm} {nom_cm}",
    "variables": [
      "civilite",
      "nom_patient",
      "numero_dossier",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 28,
    "dateCreation": "2024-06-11"
  },
  {
    "id": "TPL-058",
    "titre": "Urgence Médicale",
    "categorie": "special",
    "type": "sms",
    "langue": "fr",
    "corps": "⚠️ URGENCE WAMA MED: {message_urgence}. Appelez IMMÉDIATEMENT {telephone_urgence}. Case Manager {prenom_cm}: {telephone_cm}",
    "variables": [
      "message_urgence",
      "telephone_urgence",
      "prenom_cm",
      "telephone_cm"
    ],
    "utilisations": 8,
    "dateCreation": "2024-06-15"
  },
  {
    "id": "TPL-059",
    "titre": "Changement Planning",
    "categorie": "special",
    "type": "email",
    "langue": "fr",
    "sujet": "⚠️ URGENT - Changement de planning",
    "corps": "Bonjour {civilite} {nom_patient},\n\nCHANGEMENT IMPORTANT concernant votre dossier {numero_dossier}.\n\nAncien planning :\n{ancien_planning}\n\nNouveau planning :\n{nouveau_planning}\n\nRaison du changement :\n{raison_changement}\n\nToutes les réservations (vol, hôtel, clinique) sont mises à jour automatiquement.\n\nMerci de confirmer rapidement que vous prenez note de ce changement.\n\nToutes nos excuses pour ce désagrément.\n\nCordialement,\n{prenom_cm} {nom_cm}\nWAMA MED",
    "variables": [
      "civilite",
      "nom_patient",
      "numero_dossier",
      "ancien_planning",
      "nouveau_planning",
      "raison_changement",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 16,
    "dateCreation": "2024-06-17"
  },
  {
    "id": "TPL-060",
    "titre": "Schedule Change (EN)",
    "categorie": "special",
    "type": "email",
    "langue": "en",
    "sujet": "⚠️ URGENT - Schedule change",
    "corps": "Dear {civilite} {nom_patient},\n\nIMPORTANT CHANGE regarding your file {numero_dossier}.\n\nPrevious schedule:\n{ancien_planning}\n\nNew schedule:\n{nouveau_planning}\n\nReason for change:\n{raison_changement}\n\nAll reservations (flight, hotel, clinic) are automatically updated.\n\nPlease confirm quickly that you acknowledge this change.\n\nOur apologies for this inconvenience.\n\nBest regards,\n{prenom_cm} {nom_cm}\nWAMA MED",
    "variables": [
      "civilite",
      "nom_patient",
      "numero_dossier",
      "ancien_planning",
      "nouveau_planning",
      "raison_changement",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 11,
    "dateCreation": "2024-06-19"
  },
  {
    "id": "TPL-061",
    "titre": "Demande Documents Médicaux PDF (Détaillé)",
    "categorie": "admission",
    "type": "email",
    "langue": "fr",
    "statut": 2,
    "sujet": "Documents médicaux requis - Format PDF haute qualité",
    "corps": "Bonjour {civilite} {nom_patient},\n\nPour faire avancer votre dossier {numero_dossier} concernant {pathologie}, j'ai besoin que vous me transmettiez vos documents médicaux.\n\n📋 **DOCUMENTS À ENVOYER** :\n• Rapports médicaux récents (comptes-rendus, prescriptions)\n• Résultats d'examens d'imagerie (scanner, IRM, radiographies, échographies)\n• Résultats d'analyses sanguines récentes\n• Comptes-rendus d'hospitalisations antérieures (si applicable)\n• Ordonnances de traitements en cours\n\n⚠️ **IMPORTANT - FORMAT ET QUALITÉ** :\n✅ **Format : PDF uniquement** (pas de photos floues, pas de Word/Excel)\n✅ **Qualité : Haute résolution** - Le texte doit être parfaitement lisible\n✅ **Scanner ou application mobile** : Utilisez un scanner ou une application de scan mobile (CamScanner, Adobe Scan, Microsoft Lens)\n✅ **Pas de photos prises avec le téléphone** : Les photos sont souvent floues, mal cadrées ou avec des reflets\n✅ **Couleur ou noir/blanc** : Les deux sont acceptés si la qualité est bonne\n✅ **Documents complets** : N'oubliez aucune page\n\n📧 **COMMENT ENVOYER** :\n1. Scannez chaque document en PDF\n2. Vérifiez que le texte est lisible à 100%\n3. Envoyez-moi les PDFs par email à : {email_cm}\n4. Objet de l'email : \"Documents médicaux - Dossier {numero_dossier}\"\n\n⏱️ **DÉLAI** : 48-72 heures maximum\nSans ces documents de qualité, les médecins ne pourront pas analyser correctement votre cas.\n\n💡 **ASTUCE** : \nSi vous ne savez pas comment scanner en PDF, je peux vous guider ! Appelez-moi au {telephone_cm} ou répondez à cet email.\n\n**Applications de scan recommandées (gratuites)** :\n📱 iPhone : Notes (fonction scanner intégrée)\n📱 Android : Google Drive (fonction scanner), CamScanner, Adobe Scan\n\nJe reste disponible pour toute question.\n\nMerci de votre collaboration !\n\nCordialement,\n{prenom_cm} {nom_cm}\nWAMA MED - Coordination Médicale Internationale\n📧 {email_cm}\n📱 {telephone_cm}",
    "variables": [
      "civilite",
      "nom_patient",
      "numero_dossier",
      "pathologie",
      "email_cm",
      "telephone_cm",
      "prenom_cm",
      "nom_cm"
    ],
    "utilisations": 0,
    "dateCreation": "2025-12-30"
  },
  {
    "id": "TPL-062",
    "titre": "Réponse Automatique - Demande en Ligne Reçue",
    "categorie": "admission",
    "type": "email",
    "langue": "fr",
    "statut": 1,
    "sujet": "✅ Confirmation de réception - Dossier {numero_dossier}",
    "corps": "Bonjour {civilite} {prenom_patient} {nom_patient},\n\nNous avons bien reçu votre demande de prise en charge médicale.\n\n📋 **INFORMATIONS DE VOTRE DOSSIER** :\n• Numéro de dossier : {numero_dossier}\n• Pathologie/Motif : {pathologie}\n• Date de réception : {date_demande}\n\n✅ **PROCHAINES ÉTAPES** :\n\n1️⃣ **Dans les 24-48 heures** : Un Case Manager dédié vous contactera personnellement pour :\n   • Étudier votre demande en détail\n   • Vous poser des questions complémentaires si nécessaire\n   • Vous envoyer le questionnaire médical sécurisé\n\n2️⃣ **Après réception de vos documents** : Nos médecins spécialistes analyseront votre dossier\n\n3️⃣ **Avis médical et devis** : Vous recevrez un plan de soins personnalisé avec estimation des coûts\n\n⏱️ **DÉLAI MOYEN DE TRAITEMENT** : 5-7 jours ouvrables\n\n📞 **BESOIN D'AIDE IMMÉDIATE ?**\n\nSi votre situation est urgente ou si vous avez des questions, n'hésitez pas à nous contacter :\n\n📧 Email : contact@wamamed.ma\n📱 Téléphone : +212 661 23 45 67\n🕐 Horaires : Lundi-Vendredi 9h-18h (GMT+1)\n💬 WhatsApp : +212 661 23 45 67\n\n🌐 **WAMA MED - Coordination Médicale Internationale**\n\nNous vous accompagnons dans toutes les étapes de votre parcours de soins à l'étranger avec professionnalisme et bienveillance.\n\nMerci de votre confiance !\n\nCordialement,\nL'équipe WAMA MED\n\n---\nCe message est envoyé automatiquement. Merci de ne pas y répondre directement.\nPour toute question, utilisez les coordonnées ci-dessus.",
    "variables": [
      "civilite",
      "prenom_patient",
      "nom_patient",
      "numero_dossier",
      "pathologie",
      "date_demande"
    ],
    "utilisations": 0,
    "dateCreation": "2025-12-30"
  }
] as TemplateItem[];

export const generatedDocuments = [
  {
    "id": "DOC-001",
    "patientId": "WM-2025-001",
    "titre": "Angiographie coronaire",
    "categorie": "Imagerie",
    "type": "Scanner",
    "dateDocument": "2024-12-15",
    "dateUpload": "2025-01-05",
    "taille": "2.4 MB",
    "format": "PDF",
    "lienStockage": "https://drive.google.com/file/d/exemple123",
    "uploadePar": "Patient",
    "notes": "Examen récent montrant sténose artère coronaire gauche",
    "statut": "Validé",
    "urgent": false
  },
  {
    "id": "DOC-002",
    "patientId": "WM-2025-001",
    "titre": "Bilan sanguin complet",
    "categorie": "Analyses",
    "type": "Bilan sanguin",
    "dateDocument": "2025-01-03",
    "dateUpload": "2025-01-05",
    "taille": "156 KB",
    "format": "PDF",
    "lienStockage": "https://drive.google.com/file/d/exemple124",
    "uploadePar": "Clinique",
    "notes": "Tous les paramètres normaux sauf cholestérol légèrement élevé",
    "statut": "Validé",
    "urgent": false
  },
  {
    "id": "DOC-003",
    "patientId": "WM-2025-002",
    "titre": "Échographie pelvienne",
    "categorie": "Imagerie",
    "type": "Échographie",
    "dateDocument": "2024-11-20",
    "dateUpload": "2025-01-08",
    "taille": "890 KB",
    "format": "JPG",
    "lienStockage": "https://drive.google.com/file/d/exemple125",
    "uploadePar": "Patient",
    "notes": "Échographie transvaginale - Syndrome SOPK confirmé",
    "statut": "À vérifier",
    "urgent": false
  },
  {
    "id": "DOC-004",
    "patientId": "WM-2025-003",
    "titre": "Radio genou droit",
    "categorie": "Imagerie",
    "type": "Radiographie",
    "dateDocument": "2024-12-10",
    "dateUpload": "2024-12-16",
    "taille": "1.2 MB",
    "format": "JPG",
    "lienStockage": "https://drive.google.com/file/d/exemple126",
    "uploadePar": "Clinique",
    "notes": "Arthrose sévère, indication PTG",
    "statut": "Validé",
    "urgent": false
  },
  {
    "id": "DOC-005",
    "patientId": "WM-2025-003",
    "titre": "Compte-rendu opératoire PTG",
    "categorie": "Compte-Rendu",
    "type": "CR Opératoire",
    "dateDocument": "2025-01-15",
    "dateUpload": "2025-01-15",
    "taille": "245 KB",
    "format": "PDF",
    "lienStockage": "https://drive.google.com/file/d/exemple127",
    "uploadePar": "Dr. Rachid Bennani",
    "notes": "Intervention réussie, prothèse cimentée, aucune complication",
    "statut": "Validé",
    "urgent": false
  }
] as MedicalDocument[];

export const generatedEvenements = [
  {
    "id": "EVT-001",
    "title": "Consultation - M. Hassan Ibrahim",
    "start": "2025-01-20T09:00:00",
    "end": "2025-01-20T10:00:00",
    "patientId": "WM-2025-001",
    "type": "consultation",
    "medecinId": "MED-001",
    "medecin": "Pr. Mehdi Karoui",
    "clinique": "Clinique Internationale Hannibal",
    "lieu": "Tunis",
    "notes": "Première consultation cardiologie",
    "statut": "confirmé",
    "rappelEnvoye": false
  },
  {
    "id": "EVT-002",
    "title": "Intervention - M. Chen Wei",
    "start": "2025-01-15T08:00:00",
    "end": "2025-01-15T11:00:00",
    "patientId": "WM-2025-003",
    "type": "intervention",
    "medecinId": "MED-003",
    "medecin": "Dr. Rachid Bennani",
    "clinique": "Clinique Internationale Avicenne",
    "lieu": "Rabat",
    "notes": "Prothèse totale genou droit",
    "statut": "terminé",
    "rappelEnvoye": true
  },
  {
    "id": "EVT-003",
    "title": "Consultation - Mme Aïcha Diop",
    "start": "2025-01-25T14:00:00",
    "end": "2025-01-25T15:00:00",
    "patientId": "WM-2025-002",
    "type": "consultation",
    "medecinId": "MED-004",
    "medecin": "Dr. Yasmine El Amrani",
    "clinique": "Centre FIV Tunis",
    "lieu": "Tunis",
    "notes": "Bilan fertilité et plan FIV",
    "statut": "confirmé",
    "rappelEnvoye": false
  },
  {
    "id": "EVT-004",
    "title": "Suivi Post-Op - M. Chen Wei",
    "start": "2025-01-22T10:00:00",
    "end": "2025-01-22T10:30:00",
    "patientId": "WM-2025-003",
    "type": "suivi",
    "medecinId": "MED-003",
    "medecin": "Dr. Rachid Bennani",
    "clinique": "Clinique Internationale Avicenne",
    "lieu": "Rabat",
    "notes": "Contrôle J+7 post-op",
    "statut": "confirmé",
    "rappelEnvoye": false
  }
] as CalendarEventItem[];

export const generatedServices = [
  {
    "id": "SRV-001",
    "code": "OUVERTURE_DOSSIER",
    "nom": "Ouverture de dossier",
    "description": "Création et gestion du dossier médical complet",
    "prix_defaut": 1500,
    "devise": "MAD",
    "categorie": "administratif",
    "facturable": true,
    "actif": true
  },
  {
    "id": "SRV-002",
    "code": "INTERPRETE",
    "nom": "Service d'interprétation",
    "description": "Interprète médical (par jour)",
    "prix_defaut": 500,
    "devise": "MAD",
    "categorie": "accompagnement",
    "unite": "jour",
    "facturable": true,
    "actif": true
  },
  {
    "id": "SRV-003",
    "code": "COORDINATION_TRANSPORT",
    "nom": "Coordination transport",
    "description": "Organisation et suivi des déplacements (par trajet)",
    "prix_defaut": 300,
    "devise": "MAD",
    "categorie": "logistique",
    "unite": "trajet",
    "facturable": true,
    "actif": true
  },
  {
    "id": "SRV-004",
    "code": "ASSISTANCE_24_7",
    "nom": "Assistance 24/7",
    "description": "Disponibilité et assistance permanente",
    "prix_defaut": 1000,
    "devise": "MAD",
    "categorie": "accompagnement",
    "unite": "semaine",
    "facturable": true,
    "actif": true
  },
  {
    "id": "SRV-005",
    "code": "GESTION_ADMIN",
    "nom": "Gestion administrative",
    "description": "Coordination PEC, devis, factures, suivi",
    "prix_defaut": 2000,
    "devise": "MAD",
    "categorie": "administratif",
    "facturable": true,
    "actif": true
  },
  {
    "id": "SRV-006",
    "code": "ASSISTANCE_AEROPORT",
    "nom": "Assistance aéroport",
    "description": "Accueil et assistance à l'arrivée/départ",
    "prix_defaut": 750,
    "devise": "MAD",
    "categorie": "logistique",
    "facturable": true,
    "actif": true
  },
  {
    "id": "SRV-007",
    "code": "ACCOMPAGNEMENT_RDV",
    "nom": "Accompagnement rendez-vous",
    "description": "Accompagnement physique aux consultations (par RDV)",
    "prix_defaut": 400,
    "devise": "MAD",
    "categorie": "accompagnement",
    "unite": "rdv",
    "facturable": true,
    "actif": true
  },
  {
    "id": "SRV-008",
    "code": "TRADUCTION_DOCS",
    "nom": "Traduction documents",
    "description": "Traduction documents médicaux (par document)",
    "prix_defaut": 250,
    "devise": "MAD",
    "categorie": "administratif",
    "unite": "document",
    "facturable": true,
    "actif": true
  },
  {
    "id": "SRV-009",
    "code": "COORDINATION_PEC",
    "nom": "Coordination PEC",
    "description": "Négociation et suivi prise en charge assurance",
    "prix_defaut": 1200,
    "devise": "MAD",
    "categorie": "administratif",
    "facturable": true,
    "actif": true
  },
  {
    "id": "SRV-010",
    "code": "SUIVI_POST_OP",
    "nom": "Suivi post-opératoire",
    "description": "Coordination suivi médical après intervention",
    "prix_defaut": 800,
    "devise": "MAD",
    "categorie": "medical",
    "facturable": true,
    "actif": true
  }
] as ServiceItem[];

export const generatedCommissions = [
  {
    "id": "COM-001",
    "date": "2025-01-15",
    "patient_id": "WM-2025-001",
    "patient_nom": "Hassan Ibrahim",
    "partenaire_type": "cliniques",
    "partenaire_id": "CLI-001",
    "partenaire_nom": "Clinique Internationale Hannibal",
    "service": "Pontage coronarien",
    "montant_base": 85000,
    "taux_commission": 10,
    "montant_commission": 8500,
    "devise": "MAD",
    "statut": "due",
    "date_facture": null,
    "date_paiement": null,
    "notes": "Intervention cardiaque réussie"
  },
  {
    "id": "COM-002",
    "date": "2025-01-18",
    "patient_id": "WM-2025-002",
    "patient_nom": "Aïcha Diop",
    "partenaire_type": "hotels",
    "partenaire_id": "HOT-001",
    "partenaire_nom": "Ibis Styles Dakar",
    "service": "Hébergement 7 nuits",
    "montant_base": 5600,
    "taux_commission": 15,
    "montant_commission": 840,
    "devise": "MAD",
    "statut": "payee",
    "date_facture": "2025-01-20",
    "date_paiement": "2025-01-25",
    "notes": "Séjour complet avant FIV"
  },
  {
    "id": "COM-003",
    "date": "2025-01-10",
    "patient_id": "WM-2025-003",
    "patient_nom": "Chen Wei",
    "partenaire_type": "cliniques",
    "partenaire_id": "CLI-002",
    "partenaire_nom": "Clinique Internationale Avicenne",
    "service": "Prothèse totale genou",
    "montant_base": 62000,
    "taux_commission": 10,
    "montant_commission": 6200,
    "devise": "MAD",
    "statut": "facturee",
    "date_facture": "2025-01-12",
    "date_paiement": null,
    "notes": "Paiement prévu dans 30 jours"
  },
  {
    "id": "COM-004",
    "date": "2025-01-20",
    "patient_id": "WM-2025-001",
    "patient_nom": "Hassan Ibrahim",
    "partenaire_type": "chauffeurs",
    "partenaire_id": "CHA-001",
    "partenaire_nom": "Transport Médical Dakar",
    "service": "Transferts aéroport + clinique (4 trajets)",
    "montant_base": 1200,
    "taux_commission": 20,
    "montant_commission": 240,
    "devise": "MAD",
    "statut": "due",
    "date_facture": null,
    "date_paiement": null,
    "notes": ""
  },
  {
    "id": "COM-005",
    "date": "2025-01-05",
    "patient_id": "WM-2025-004",
    "patient_nom": "Sarah Johnson",
    "partenaire_type": "cliniques",
    "partenaire_id": "CLI-003",
    "partenaire_nom": "Clinique de la Madeleine",
    "service": "Chirurgie esthétique",
    "montant_base": 45000,
    "taux_commission": 10,
    "montant_commission": 4500,
    "devise": "MAD",
    "statut": "payee",
    "date_facture": "2025-01-08",
    "date_paiement": "2025-01-15",
    "notes": "Paiement rapide - excellent partenaire"
  }
] as CommissionItem[];

export const generatedFacturesPatients = [
  {
    "id": "FAC-P-001",
    "numero": "WAMA-2025-001",
    "date_emission": "2025-01-05",
    "patient_id": "WM-2025-001",
    "patient_nom": "Hassan Ibrahim",
    "patient_email": "hassan.ibrahim@email.com",
    "lignes": [
      {
        "service_id": "SRV-001",
        "nom": "Ouverture de dossier",
        "quantite": 1,
        "prix_unitaire": 1500,
        "total": 1500
      },
      {
        "service_id": "SRV-005",
        "nom": "Gestion administrative",
        "quantite": 1,
        "prix_unitaire": 2000,
        "total": 2000
      },
      {
        "service_id": "SRV-004",
        "nom": "Assistance 24/7",
        "quantite": 2,
        "prix_unitaire": 1000,
        "total": 2000
      },
      {
        "service_id": "SRV-006",
        "nom": "Assistance aéroport",
        "quantite": 2,
        "prix_unitaire": 750,
        "total": 1500
      },
      {
        "service_id": "SRV-002",
        "nom": "Service interprétation",
        "quantite": 5,
        "prix_unitaire": 500,
        "total": 2500
      }
    ],
    "montant_total": 9500,
    "devise": "MAD",
    "statut": "payee",
    "montant_paye": 9500,
    "date_paiement": "2025-01-08",
    "mode_paiement": "Virement bancaire",
    "notes": "Patient très satisfait du service"
  },
  {
    "id": "FAC-P-002",
    "numero": "WAMA-2025-002",
    "date_emission": "2025-01-12",
    "patient_id": "WM-2025-002",
    "patient_nom": "Aïcha Diop",
    "patient_email": "aicha.diop@email.com",
    "lignes": [
      {
        "service_id": "SRV-001",
        "nom": "Ouverture de dossier",
        "quantite": 1,
        "prix_unitaire": 1500,
        "total": 1500
      },
      {
        "service_id": "SRV-009",
        "nom": "Coordination PEC",
        "quantite": 1,
        "prix_unitaire": 1200,
        "total": 1200
      },
      {
        "service_id": "SRV-003",
        "nom": "Coordination transport",
        "quantite": 4,
        "prix_unitaire": 300,
        "total": 1200
      },
      {
        "service_id": "SRV-007",
        "nom": "Accompagnement RDV",
        "quantite": 3,
        "prix_unitaire": 400,
        "total": 1200
      }
    ],
    "montant_total": 5100,
    "devise": "MAD",
    "statut": "envoyee",
    "montant_paye": 0,
    "date_paiement": null,
    "mode_paiement": null,
    "notes": "En attente de paiement - relance prévue J+15"
  },
  {
    "id": "FAC-P-003",
    "numero": "WAMA-2025-003",
    "date_emission": "2025-01-08",
    "patient_id": "WM-2025-003",
    "patient_nom": "Chen Wei",
    "patient_email": "chen.wei@email.com",
    "lignes": [
      {
        "service_id": "SRV-001",
        "nom": "Ouverture de dossier",
        "quantite": 1,
        "prix_unitaire": 1500,
        "total": 1500
      },
      {
        "service_id": "SRV-005",
        "nom": "Gestion administrative",
        "quantite": 1,
        "prix_unitaire": 2000,
        "total": 2000
      },
      {
        "service_id": "SRV-006",
        "nom": "Assistance aéroport",
        "quantite": 2,
        "prix_unitaire": 750,
        "total": 1500
      },
      {
        "service_id": "SRV-010",
        "nom": "Suivi post-opératoire",
        "quantite": 1,
        "prix_unitaire": 800,
        "total": 800
      }
    ],
    "montant_total": 5800,
    "devise": "MAD",
    "statut": "payee_partielle",
    "montant_paye": 3500,
    "date_paiement": "2025-01-15",
    "mode_paiement": "Carte bancaire",
    "notes": "Paiement partiel 3500 MAD - reliquat 2300 MAD à régler"
  },
  {
    "id": "FAC-P-004",
    "numero": "WAMA-2025-004",
    "date_emission": "2025-01-20",
    "patient_id": "WM-2025-004",
    "patient_nom": "Sarah Johnson",
    "patient_email": "sarah.johnson@email.com",
    "lignes": [
      {
        "service_id": "SRV-001",
        "nom": "Ouverture de dossier",
        "quantite": 1,
        "prix_unitaire": 1500,
        "total": 1500
      },
      {
        "service_id": "SRV-002",
        "nom": "Service interprétation",
        "quantite": 3,
        "prix_unitaire": 500,
        "total": 1500
      },
      {
        "service_id": "SRV-003",
        "nom": "Coordination transport",
        "quantite": 3,
        "prix_unitaire": 300,
        "total": 900
      }
    ],
    "montant_total": 3900,
    "devise": "MAD",
    "statut": "brouillon",
    "montant_paye": 0,
    "date_paiement": null,
    "mode_paiement": null,
    "notes": "Brouillon à valider avant envoi"
  }
] as FacturePatient[];

export const generatedEcritures = [
  {
    "id": "ECR-001",
    "date": "2025-01-05",
    "journal": "VEN",
    "pieceRef": "WAMA-2025-001",
    "libelle": "Vente services Hassan Ibrahim",
    "lignes": [
      {
        "compte": "411",
        "intitule": "Clients",
        "debit": 11400,
        "credit": 0
      },
      {
        "compte": "4455",
        "intitule": "État - TVA facturée",
        "debit": 0,
        "credit": 1900
      },
      {
        "compte": "707",
        "intitule": "Prestations de services",
        "debit": 0,
        "credit": 9500
      }
    ]
  },
  {
    "id": "ECR-002",
    "date": "2025-01-08",
    "journal": "BQ",
    "pieceRef": "VIR-001",
    "libelle": "Encaissement Hassan Ibrahim - Virement",
    "lignes": [
      {
        "compte": "512",
        "intitule": "Banques",
        "debit": 11400,
        "credit": 0
      },
      {
        "compte": "411",
        "intitule": "Clients",
        "debit": 0,
        "credit": 11400
      }
    ]
  },
  {
    "id": "ECR-003",
    "date": "2025-01-15",
    "journal": "VEN",
    "pieceRef": "COM-001",
    "libelle": "Commission Clinique Hannibal - Pontage coronarien",
    "lignes": [
      {
        "compte": "411",
        "intitule": "Clients",
        "debit": 10200,
        "credit": 0
      },
      {
        "compte": "4455",
        "intitule": "État - TVA facturée",
        "debit": 0,
        "credit": 1700
      },
      {
        "compte": "706",
        "intitule": "Commissions reçues",
        "debit": 0,
        "credit": 8500
      }
    ]
  },
  {
    "id": "ECR-004",
    "date": "2025-01-10",
    "journal": "ACH",
    "pieceRef": "FACT-FOUR-001",
    "libelle": "Achat fournitures bureau",
    "lignes": [
      {
        "compte": "6148",
        "intitule": "Autres charges externes",
        "debit": 1200,
        "credit": 0
      },
      {
        "compte": "4456",
        "intitule": "État - TVA récupérable",
        "debit": 240,
        "credit": 0
      },
      {
        "compte": "401",
        "intitule": "Fournisseurs",
        "debit": 0,
        "credit": 1440
      }
    ]
  },
  {
    "id": "ECR-005",
    "date": "2025-01-20",
    "journal": "BQ",
    "pieceRef": "CHQ-001",
    "libelle": "Paiement fournisseur - Chèque",
    "lignes": [
      {
        "compte": "401",
        "intitule": "Fournisseurs",
        "debit": 1440,
        "credit": 0
      },
      {
        "compte": "512",
        "intitule": "Banques",
        "debit": 0,
        "credit": 1440
      }
    ]
  },
  {
    "id": "ECR-006",
    "date": "2025-01-31",
    "journal": "OD",
    "pieceRef": "SAL-JAN-2025",
    "libelle": "Salaires janvier 2025",
    "lignes": [
      {
        "compte": "6171",
        "intitule": "Rémunérations du personnel",
        "debit": 25000,
        "credit": 0
      },
      {
        "compte": "6174",
        "intitule": "Charges sociales",
        "debit": 5000,
        "credit": 0
      },
      {
        "compte": "431",
        "intitule": "Sécurité sociale",
        "debit": 0,
        "credit": 3000
      },
      {
        "compte": "432",
        "intitule": "CIMR",
        "debit": 0,
        "credit": 2000
      },
      {
        "compte": "421",
        "intitule": "Personnel - Rémunérations dues",
        "debit": 0,
        "credit": 25000
      }
    ]
  },
  {
    "id": "ECR-007",
    "date": "2025-02-05",
    "journal": "BQ",
    "pieceRef": "VIR-SAL-001",
    "libelle": "Virement salaires janvier",
    "lignes": [
      {
        "compte": "421",
        "intitule": "Personnel - Rémunérations dues",
        "debit": 25000,
        "credit": 0
      },
      {
        "compte": "512",
        "intitule": "Banques",
        "debit": 0,
        "credit": 25000
      }
    ]
  },
  {
    "id": "ECR-008",
    "date": "2025-01-01",
    "journal": "BQ",
    "pieceRef": "LOC-JAN-2025",
    "libelle": "Loyer janvier 2025",
    "lignes": [
      {
        "compte": "6131",
        "intitule": "Locations et charges locatives",
        "debit": 8000,
        "credit": 0
      },
      {
        "compte": "512",
        "intitule": "Banques",
        "debit": 0,
        "credit": 8000
      }
    ]
  }
] as AccountingEntry[];

export const generatedCommissionsConfig = {
  "cliniques": {
    "type": "pourcentage",
    "taux": 10,
    "description": "Commission sur interventions médicales"
  },
  "hotels": {
    "type": "pourcentage",
    "taux": 15,
    "description": "Commission sur hébergements"
  },
  "chauffeurs": {
    "type": "pourcentage",
    "taux": 20,
    "description": "Commission sur transports"
  },
  "pharmacies": {
    "type": "pourcentage",
    "taux": 5,
    "description": "Commission sur médicaments"
  },
  "laboratoires": {
    "type": "pourcentage",
    "taux": 8,
    "description": "Commission sur examens"
  }
} as CommissionsConfig;

export const generatedJournalTypes = {
  "VEN": {
    "code": "VEN",
    "intitule": "Journal des ventes",
    "type": "vente",
    "icon": "fa-shopping-cart",
    "color": "#10b981"
  },
  "ACH": {
    "code": "ACH",
    "intitule": "Journal des achats",
    "type": "achat",
    "icon": "fa-shopping-bag",
    "color": "#f59e0b"
  },
  "BQ": {
    "code": "BQ",
    "intitule": "Journal de banque",
    "type": "banque",
    "icon": "fa-university",
    "color": "#3b82f6"
  },
  "CA": {
    "code": "CA",
    "intitule": "Journal de caisse",
    "type": "caisse",
    "icon": "fa-cash-register",
    "color": "#8b5cf6"
  },
  "OD": {
    "code": "OD",
    "intitule": "Journal d'opérations diverses",
    "type": "divers",
    "icon": "fa-edit",
    "color": "#6b7280"
  }
} as JournalTypes;
