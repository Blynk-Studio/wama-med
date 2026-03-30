import { Locale } from "@/lib/i18n";

const dictionaries = {
  fr: {
    skipToContent: "Aller au contenu principal",
    schemaDescription:
      "Coordination médicale nationale et internationale — Casablanca, Maroc",
    header: {
      homeAria: "Wama Med — Accueil",
      desktopNavAria: "Navigation principale",
      mobileNavAria: "Navigation mobile",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      submitCase: "Soumettre un dossier",
      languageLabel: "Langue",
      nav: [
        { href: "/services", label: "Nos Services" },
        { href: "/comment-ca-marche", label: "Notre Approche" },
        { href: "/about", label: "À Propos" },
        { href: "/contact", label: "Contact" },
      ],
    },
    footer: {
      brandDescription:
        "Coordination médicale nationale et internationale — de Casablanca, pour le monde.",
      servicesTitle: "Services",
      navigationTitle: "Navigation",
      contactTitle: "Contact",
      serviceLinks: [
        { href: "/services", label: "Coordination nationale" },
        { href: "/services", label: "Patients internationaux" },
        { href: "/services", label: "Diaspora marocaine" },
        { href: "/services", label: "Évacuation sanitaire" },
      ],
      navLinks: [
        { href: "/comment-ca-marche", label: "Notre Approche" },
        { href: "/about", label: "À Propos" },
        { href: "/contact", label: "Contact" },
      ],
      whatsapp: "WhatsApp",
      copyright: "Tous droits réservés.",
      availability: "Disponible 24h/24, 7j/7",
      addressLines: ["5 Rue Molière", "Quartier Racine", "Casablanca, Maroc"],
    },
    assistant: {
      headerTitle: "Assistant Wama Med",
      availability: "Disponible 24h/24",
      openAria: "Ouvrir l'assistant Wama Med",
      closeAria: "Fermer l'assistant",
      label: "Discutez maintenant",
      tabAria: "Mode de contact",
      tabs: { voice: "Voix", chat: "Chat" },
      greeting:
        "Bonjour ! Je suis l'assistant Wama Med. Comment puis-je vous aider avec votre coordination médicale aujourd'hui ?",
      unavailable:
        "Je ne peux pas me connecter pour le moment. Appelez-nous au +212 522 000 000.",
      responseError:
        "Je n'ai pas pu répondre. Veuillez réessayer.",
      sendError:
        "Une erreur est survenue. Contactez-nous au +212 522 000 000.",
      emptyChat:
        "Posez votre question sur la coordination médicale.",
      linkLabel: "Voir le lien →",
      inputPlaceholder: "Votre question...",
      sendAria: "Envoyer",
      voice: {
        idleTitle: "Parlez à notre assistant",
        connectingTitle: "Connexion en cours...",
        activeTitle: "En communication",
        endingTitle: "Fin d'appel...",
        idleDescription:
          "Notre assistant répond en français 24h/24",
        activeDescription:
          "Parlez normalement — l'assistant vous écoute",
        startCall: "Démarrer l'appel",
        endCall: "Terminer l'appel",
        waiting: "Veuillez patienter...",
      },
    },
    shared: {
      countries: [
        "Maroc",
        "France",
        "Belgique",
        "Pays-Bas",
        "Sénégal",
        "Côte d'Ivoire",
        "Mali",
        "Cameroun",
        "Gabon",
        "Congo",
        "Autre pays africain",
        "Autre pays européen",
        "Autre",
      ],
      whatsappAria: "Contacter via WhatsApp",
      aiSection: {
        badge: "En ligne · Répond immédiatement",
        heading: "Parlez à notre assistant maintenant",
        description:
          "Disponible 24h/24 · Répond immédiatement · Français, Arabe, Anglais",
      },
      closingCta: {
        backgroundWord: "ENSEMBLE",
        eyebrow: "Première étape",
        titleStart: "Votre dossier mérite",
        titleHighlight: "un expert à vos côtés.",
        body:
          "Soumettez votre situation. Notre équipe vous répond sous 2 heures. Disponible 24h/24, 7j/7, pour la France, la Belgique, l'Afrique subsaharienne, et partout dans le monde.",
        primary: "Soumettre votre dossier",
        secondary: "WhatsApp direct",
        availability: "Disponible 24h/24",
      },
      contactForm: {
        successTitle: "Dossier reçu.",
        successDescription:
          "Notre équipe vous contactera dans les 2 heures. Disponible 24h/24.",
        fields: {
          name: "Nom complet",
          email: "Email",
          phone: "Téléphone",
          country: "Pays de résidence",
          message: "Votre situation médicale",
          files: "Joindre des documents",
          optional: "(optionnel)",
        },
        placeholders: {
          name: "Votre nom",
          email: "votre@email.com",
          phone: "+33 6 XX XX XX XX",
          country: "Sélectionner...",
          message:
            "Décrivez brièvement votre situation médicale, la ou les pathologies concernées, et ce dont vous avez besoin...",
        },
        filesEmpty: "PDF, JPG, PNG, DOC — max. 10 Mo",
        filesSelectedSingle: "{count} fichier sélectionné",
        filesSelectedPlural: "{count} fichiers sélectionnés",
        error:
          "Une erreur est survenue. Veuillez nous contacter directement au +212 522 000 000.",
        sending: "Envoi en cours...",
        submit: "Soumettre mon dossier",
        footer:
          "Réponse garantie sous 2 heures · Disponible 24h/24 · Données confidentielles",
      },
    },
    home: {
      metadata: {
        title: "Wama Med — Coordination Médicale Nationale et Internationale",
        description:
          "Wama Med coordonne votre parcours médical au Maroc, de la consultation spécialisée à la prise en charge complète. Un interlocuteur unique pour les familles, la diaspora, et les patients internationaux.",
      },
      hero: {
        ariaLabel: "Wama Med — Coordination médicale au Maroc",
        eyebrow: "Coordination Médicale · Maroc",
        headline: "Votre santé mérite une expertise sans frontières",
        arabic: "واما ميد — شريككم الطبي في المغرب",
        cta: "Soumettre votre dossier",
      },
      trustStrip: {
        pillars: [
          { label: "Coordination rigoureuse", ar: "تنسيق دقيق" },
          { label: "Normes internationales", ar: "معايير دولية" },
          { label: "Confidentialité absolue", ar: "سرية مطلقة" },
          { label: "Disponibilité 24h/24", ar: "متاح على مدار الساعة" },
        ],
      },
      scrollJourney: {
        ariaLabel: "Notre approche",
        cta: "Soumettre votre dossier →",
        acts: [
          {
            id: 1,
            label: "Le Problème",
            bg: "#1A2E40",
            headline:
              "Naviguer seul dans un système médical étranger est épuisant.",
            subtext:
              "Des rendez-vous manqués. Des barrières linguistiques. De l'incertitude.",
            textColor: "#F5F0E8",
          },
          {
            id: 2,
            label: "Le Maroc",
            bg: "#1A3E48",
            headline: "Le Maroc possède une médecine d'excellence.",
            subtext: "L'accès, c'est ce qui manquait.",
            textColor: "#F5F0E8",
          },
          {
            id: 3,
            label: "La Solution",
            bg: "#1A3440",
            headline: "Un seul interlocuteur. Tout pris en charge.",
            steps: ["Appel", "Dossier", "Clinique", "Suivi", "Retour"],
            textColor: "#F5F0E8",
          },
          {
            id: 4,
            label: "Les Engagements",
            bg: "#1A2E40",
            headline: "Ce qui définit notre coordination",
            commitments: [
              {
                title: "Rigueur méthodologique",
                desc:
                  "Chaque dossier suit un protocole structuré, sans improvisation.",
              },
              {
                title: "Réseau médical vérifié",
                desc:
                  "Collaboration avec des spécialistes et établissements accrédités.",
              },
              {
                title: "Conformité internationale",
                desc:
                  "Normes de confidentialité et de coordination transfrontalière.",
              },
            ],
            textColor: "#F5F0E8",
          },
          {
            id: 5,
            label: "L'Invitation",
            bg: "#1A2E40",
            headline: "Votre santé mérite mieux.",
            subtext: "Nous sommes prêts.",
            textColor: "#C9A84C",
          },
        ],
      },
      servicesOverview: {
        eyebrow: "Ce que nous faisons",
        title: "Nos Services",
        arabic: "خدماتنا",
        cta: "Voir tous nos services →",
        services: [
          {
            ar: "تنسيق جراحي",
            title: "Coordination chirurgicale",
            desc:
              "Orthopédie, cardiologie, oncologie et plus encore — avec les meilleurs spécialistes du Maroc.",
            href: "/services",
          },
          {
            ar: "مرافقة لغوية",
            title: "Accompagnement linguistique",
            desc:
              "Un interlocuteur francophone dédié à chaque étape de votre parcours médical.",
            href: "/services",
          },
          {
            ar: "لوجستيك متكامل",
            title: "Logistique complète",
            desc:
              "Visa médical, hébergement, transport — logistique complète pour votre séjour.",
            href: "/services",
          },
          {
            ar: "متابعة ما بعد العملية",
            title: "Suivi post-opératoire",
            desc:
              "Continuité des soins et communication avec vos médecins après votre retour.",
            href: "/services",
          },
          {
            ar: "شبكة شركاء",
            title: "Réseau de cliniques partenaires",
            desc:
              "Établissements accrédités sélectionnés selon des critères de qualité rigoureux.",
            href: "/services",
          },
          {
            ar: "استشارات عن بُعد",
            title: "Consultations à distance",
            desc:
              "Obtenez un avis médical expert avant même de quitter votre pays.",
            href: "/services",
          },
        ],
      },
      founderSection: {
        alt: "Driss Benwahoud, fondateur de Wama Med",
        badge: "Fondateur & Directeur",
        eyebrow: "La promesse",
        heading:
          "Construit pour ne plus jamais laisser une famille seule face au système.",
        quote:
          "\"Votre dossier médical mérite mieux qu'un agenda et un stylo rouge.\"",
        cite: "— Driss Benwahoud, Fondateur",
        body:
          "Driss Benwahoud n'a pas fondé Wama Med pour saisir une opportunité de marché. Il l'a fondé après avoir vécu personnellement le chaos de la coordination médicale fragmentée — un proche, plusieurs spécialistes qui ne se parlent pas, des mois perdus dans des files d'attente administratives. Fort de dix ans d'expérience dans le secteur de l'assurance, il avait les outils pour comprendre le problème. Il a choisi de le résoudre.",
        cta: "Découvrir notre histoire",
      },
      processPreview: {
        eyebrow: "Notre Approche",
        titleStart: "Un protocole structuré,",
        titleHighlight: "en 4 étapes.",
        steps: [
          {
            number: "01",
            title: "Soumettez votre dossier",
            desc:
              "Partagez votre situation médicale via notre formulaire sécurisé ou par WhatsApp. Premier retour sous 2 heures.",
          },
          {
            number: "02",
            title: "Analyse médicale",
            desc:
              "Notre médecin coordinateur examine votre dossier et établit un plan d'orientation personnalisé.",
          },
          {
            number: "03",
            title: "Coordination complète",
            desc:
              "Prise de rendez-vous, communication entre spécialistes, logistique — nous gérons tout. Vous n'avez qu'à vous présenter.",
          },
          {
            number: "04",
            title: "Accompagnement post-consultation",
            desc:
              "Suivi des résultats, coordination post-opératoire, documentation pour votre retour. Nous restons jusqu'à la fin.",
          },
        ],
        cta: "Découvrir notre protocole complet",
      },
      testimonials: {
        eyebrow: "Nos engagements",
        title: "Un cadre de coordination",
        titleHighlight: " rigoureux.",
        principles: [
          {
            ar: "المنهجية",
            title: "Méthodologie structurée",
            desc:
              "Chaque dossier suit un protocole de coordination précis — analyse, orientation, suivi — sans improvisation, sans intermédiaire non qualifié.",
            icon: "01",
          },
          {
            ar: "الشراكات",
            title: "Réseau médical établi",
            desc:
              "Collaboration directe avec des médecins référents et des établissements accrédités à Casablanca et à l'échelle nationale.",
            icon: "02",
          },
          {
            ar: "الامتثال",
            title: "Conformité internationale",
            desc:
              "Traitement des dossiers conforme aux normes internationales de confidentialité et de coordination médicale transfrontalière.",
            icon: "03",
          },
        ],
      },
      contactSection: {
        eyebrow: "Prenons contact",
        heading: "Votre dossier mérite d'être entre de bonnes mains.",
        arabic: "تواصلوا معنا",
        successTitle: "Dossier reçu.",
        successDescription:
          "Notre équipe vous contactera dans les 2 heures.",
        fields: {
          name: "Nom complet",
          email: "Email",
          phone: "Téléphone",
          country: "Pays de résidence",
          message: "Votre situation médicale",
          files: "Joindre des documents",
          optional: "(optionnel)",
        },
        placeholders: {
          name: "Votre nom",
          email: "votre@email.com",
          phone: "+33 6 XX XX XX XX",
          country: "Sélectionner...",
          message: "Décrivez brièvement votre situation...",
        },
        filesEmpty: "PDF, JPG, PNG, DOC — max. 10 Mo",
        filesSelectedSingle: "{count} fichier sélectionné",
        filesSelectedPlural: "{count} fichiers sélectionnés",
        error:
          "Une erreur est survenue. Écrivez-nous à contact@wamamed.com",
        sending: "Envoi en cours...",
        submit: "Soumettre mon dossier",
        footer:
          "Réponse garantie sous 2 heures · Disponible 24h/24 · Données confidentielles",
      },
    },
    about: {
      metadata: {
        title:
          "À Propos — Driss Benwahoud & Wama Med | Coordination Médicale Casablanca",
        description:
          "L'histoire de Wama Med : fondée par Driss Benwahoud après avoir vécu personnellement le chaos de la coordination médicale fragmentée. Une mission, une promesse.",
      },
      hero: {
        eyebrow: "Notre histoire",
        title: "Construit pour ne plus jamais laisser une famille seule.",
      },
      founder: {
        alt: "Driss Benwahoud, fondateur et directeur de Wama Med",
        name: "Driss Benwahoud",
        role: "Fondateur & Directeur — Wama Med",
        eyebrow: "Le fondateur",
        quote:
          "Votre dossier médical mérite mieux qu'un agenda et un stylo rouge.",
        cite: "Driss Benwahoud, Fondateur",
        paragraphs: [
          "Driss Benwahoud n'a pas fondé Wama Med pour saisir une opportunité de marché. Il l'a fondé après avoir vécu personnellement le chaos de la coordination médicale fragmentée — un proche, plusieurs spécialistes qui ne se parlent pas, des semaines perdues dans des files d'attente administratives, des résultats qui n'arrivent jamais au bon bureau.",
          "Fort de plus de dix ans d'expérience dans le secteur de l'assurance, Benwahoud comprenait les systèmes, les processus, la gestion du risque. Ce qu'il ne pouvait pas accepter, c'est que le mécanisme pour naviguer ces systèmes n'existait pas comme service professionnel structuré. Alors il l'a créé.",
          "Wama Med est aujourd'hui la promesse mise en pratique : un coordinateur médical dédié qui prend en charge votre dossier de bout en bout. Une seule voix qui parle à tous les spécialistes. Un seul interlocuteur qui connaît votre dossier aussi bien que votre famille.",
        ],
        experience:
          "10+ ans dans le secteur de la santé et de l'assurance",
      },
      credentials: [
        {
          title: "Secteur assurance & santé",
          desc: "Plus de dix ans d'expérience",
        },
        {
          title: "Dossiers complexes",
          desc: "Traités avec méthode et rigueur",
        },
        {
          title: "Portée internationale",
          desc: "France, Belgique, Afrique subsaharienne",
        },
      ],
      mission: {
        eyebrow: "Notre mission",
        title:
          "La coordination médicale comme service professionnel structuré — enfin.",
        paragraphs: [
          "Le système de santé marocain dispose d'excellents spécialistes et d'établissements de qualité. Ce qui lui manque, c'est l'articulation entre ces acteurs — quelqu'un qui prend en charge la navigation opérationnelle pour que le patient n'ait plus à gérer la bureaucratie en même temps qu'une maladie.",
          "Wama Med est cette articulation. Nous ne guérissons pas. Nous coordonnons — et dans ce contexte, la coordination, c'est la sécurité.",
        ],
        alt: "Coordination médicale structurée — Wama Med, Casablanca",
      },
      values: {
        eyebrow: "Nos valeurs",
        title: "Ce qui nous définit.",
        items: [
          {
            ar: "محاور واحد",
            title: "Interlocuteur unique",
            desc:
              "Un seul coordinateur par dossier, de l'analyse jusqu'à la sortie. Pas de transfert entre départements. Pas de répétition.",
          },
          {
            ar: "سرية مطلقة",
            title: "Confidentialité absolue",
            desc:
              "Vos données médicales sont traitées avec les normes les plus strictes. Jamais partagées sans votre consentement explicite.",
          },
          {
            ar: "استجابة فورية",
            title: "Réactivité 24h/24",
            desc:
              "Les situations médicales ne respectent pas les horaires de bureau. Notre disponibilité totale n'est pas un argument commercial — c'est notre contrat avec vous.",
          },
          {
            ar: "نطاق دولي",
            title: "Portée internationale",
            desc:
              "Que vous soyez à Casablanca, Paris, Dakar ou Amsterdam, Wama Med adapte chaque intervention à votre contexte géographique et linguistique.",
          },
        ],
      },
    },
    servicesPage: {
      metadata: {
        title: "Nos Services — Coordination Médicale | Wama Med",
        description:
          "Analyse de dossier, orientation spécialisée, coordination de rendez-vous, logistique internationale, accompagnement post-consultation et évacuation sanitaire.",
      },
      hero: {
        eyebrow: "Nos Services",
        titleStart: "Coordination complète.",
        titleHighlight: "Un seul interlocuteur.",
        body:
          "De l'analyse de votre dossier jusqu'au suivi post-opératoire — Wama Med gère chaque dimension de votre parcours médical au Maroc.",
      },
      servicesAria: "Aperçu des services",
      detailsAria: "Services en détail",
      services: [
        {
          number: "01",
          ar: "تحليل الملف",
          title: "Analyse de dossier médical",
          desc:
            "Votre dossier est examiné par notre médecin coordinateur qui établit un plan d'orientation précis.",
          details: [
            "Lecture complète du dossier existant",
            "Identification des spécialistes requis",
            "Plan d'orientation personnalisé",
            "Premier retour sous 2 heures",
          ],
        },
        {
          number: "02",
          ar: "التوجيه المتخصص",
          title: "Orientation spécialisée",
          desc:
            "Nous vous orientons vers les spécialistes les plus adaptés à votre situation clinique.",
          details: [
            "Réseau de spécialistes vérifiés",
            "Sélection basée sur votre pathologie",
            "Meilleurs établissements du Maroc",
            "Prise de rendez-vous prioritaire",
          ],
        },
        {
          number: "03",
          ar: "تنسيق المواعيد",
          title: "Coordination des rendez-vous",
          desc:
            "Wama Med gère la communication entre tous les spécialistes impliqués dans votre cas.",
          details: [
            "Coordination inter-spécialistes",
            "Partage sécurisé des résultats",
            "Gestion des délais et priorités",
            "Rappels et confirmations",
          ],
        },
        {
          number: "04",
          ar: "اللوجستيك الدولي",
          title: "Logistique internationale",
          desc:
            "Transfert, hébergement, assistance linguistique et documentation médicale internationale.",
          details: [
            "Transfert aéroport — hôpital",
            "Hébergement à proximité des cliniques",
            "Traduction et interprétariat médical",
            "Documents médicaux pour le retour",
          ],
        },
        {
          number: "05",
          ar: "المرافقة المستمرة",
          title: "Accompagnement continu",
          desc:
            "Votre coordinateur est présent à chaque étape — de la consultation jusqu'à la sortie.",
          details: [
            "Présence à toutes les consultations",
            "Suivi post-opératoire",
            "Communication avec la famille",
            "Dossier de sortie complet",
          ],
        },
        {
          number: "06",
          ar: "الإخلاء الطبي",
          title: "Évacuation sanitaire",
          desc:
            "Organisation complète des évacuations médicales d'urgence, nationales et internationales.",
          details: [
            "Coordination d'urgence 24h/24",
            "Transport médicalisé national",
            "Évacuations internationales",
            "Liaison avec les assureurs",
          ],
        },
      ],
      featured: [
        {
          title: "Analyse de dossier médical",
          desc:
            "Votre dossier est examiné par notre médecin coordinateur qui établit un plan d'orientation précis. Ce n'est pas une hotline — c'est une évaluation médicale sérieuse par un professionnel qualifié.",
          details: [
            "Lecture complète du dossier existant",
            "Identification des spécialistes requis",
            "Plan d'orientation personnalisé",
            "Premier retour sous 2 heures",
          ],
          image: "/images/wama-coordination-medecin.jpg",
          alt: "Médecin coordinateur Wama Med analysant un dossier médical",
        },
        {
          title: "Orientation spécialisée",
          desc:
            "Grâce à notre réseau de partenaires établis dans les meilleurs établissements du Maroc, nous vous orientons vers les spécialistes les plus adaptés à votre situation clinique.",
          details: [
            "Réseau de spécialistes vérifiés",
            "Sélection basée sur votre pathologie",
            "Meilleurs établissements de Casablanca et du Maroc",
            "Prise de rendez-vous prioritaire",
          ],
          image: "/images/wama-orientation-specialisee.jpg",
          alt: "Coordination et orientation médicale spécialisée — Wama Med",
        },
        {
          title: "Logistique internationale",
          desc:
            "Pour les patients venant de l'étranger : transfert depuis l'aéroport, hébergement médicalisé, assistance linguistique et gestion de la documentation médicale internationale.",
          details: [
            "Transfert aéroport — hôpital",
            "Hébergement à proximité des cliniques",
            "Traduction et interprétariat médical",
            "Documents médicaux pour le retour",
          ],
          image: "/images/wama-patient-international.jpg",
          alt: "Accueil de patients internationaux par l'équipe Wama Med",
        },
      ],
    },
    approach: {
      metadata: {
        title: "Notre Approche — Protocole de coordination | Wama Med",
        description:
          "Le protocole de coordination médicale Wama Med : de la soumission du dossier à l'accompagnement post-consultation, structuré en 4 étapes.",
      },
      hero: {
        eyebrow: "Notre Approche",
        titleStart: "Un protocole structuré,",
        titleHighlight: "en 4 étapes.",
        body:
          "Le protocole Wama Med est conçu pour éliminer toute incertitude. Chaque étape a un objectif défini, un délai réaliste et un responsable identifié.",
      },
      stepsAria: "Étapes du processus",
      faq: {
        eyebrow: "Questions fréquentes",
        title: "Ce que vous voulez savoir.",
        prompt: "Vous avez une question non listée ci-dessus ?",
        cta: "Posez votre question",
      },
      steps: [
        {
          number: "01",
          title: "Vous soumettez votre dossier",
          duration: "2 heures",
          durationLabel: "Délai de réponse",
          desc:
            "Partagez votre situation médicale via notre formulaire sécurisé, par email ou par WhatsApp. Incluez tout document médical disponible : résultats d’analyses, comptes-rendus, ordonnances.",
          details: [
            "Formulaire en ligne simple et sécurisé",
            "WhatsApp ou email pour les urgences",
            "Premier retour dans les 2 heures",
            "Pas de pré-paiement à cette étape",
          ],
          callout:
            "Votre situation est unique. Nous ne fonctionnons pas avec des formulaires standardisés — chaque échange commence par écouter.",
        },
        {
          number: "02",
          title: "Analyse médicale par votre coordinateur",
          duration: "24h",
          durationLabel: "Plan d’orientation",
          desc:
            "Notre médecin coordinateur examine votre dossier en profondeur et établit un plan d’orientation personnalisé : quels spécialistes consulter en priorité, dans quel établissement, dans quel ordre.",
          details: [
            "Lecture par un médecin coordinateur qualifié",
            "Identification des spécialistes requis",
            "Sélection des meilleurs établissements",
            "Plan d’action avec délais estimés",
          ],
          callout:
            "Ce n’est pas une plateforme algorithmique. Un médecin lit votre dossier et réfléchit à votre cas.",
        },
        {
          number: "03",
          title: "Coordination complète — vous n’avez qu’à vous présenter",
          duration: "Continu",
          durationLabel: "Accompagnement",
          desc:
            "Wama Med prend en charge toute la coordination opérationnelle : prise de rendez-vous, communication entre spécialistes, partage des résultats, organisation logistique pour les patients venant de l’étranger.",
          details: [
            "Rendez-vous pris en votre nom",
            "Communication directe entre spécialistes",
            "Logistique internationale (transport, hébergement)",
            "Présence physique ou à distance selon votre situation",
          ],
          callout:
            "Vous vous concentrez sur votre santé. Nous gérons tout le reste.",
        },
        {
          number: "04",
          title: "Accompagnement jusqu’au bout",
          duration: "Sortie + suivi",
          durationLabel: "Clôture de dossier",
          desc:
            "Notre mission ne s’arrête pas à la consultation. Suivi post-opératoire, coordination du retour à domicile ou du rapatriement, dossier de sortie complet pour votre médecin référent.",
          details: [
            "Suivi post-consultation et post-opératoire",
            "Coordination du retour ou du rapatriement",
            "Dossier de sortie complet",
            "Liaison avec votre médecin traitant",
          ],
          callout:
            "La fin du parcours à Casablanca n’est pas la fin de notre accompagnement.",
        },
      ],
      faqs: [
        {
          q: "Combien coûte le service ?",
          a: "Nos tarifs dépendent de la complexité du dossier et des services requis. Contactez-nous pour un devis personnalisé — la consultation initiale d’analyse est sans engagement.",
        },
        {
          q: "Wama Med est-il un cabinet médical ?",
          a: "Non. Nous sommes un service de coordination médicale — nous organisons, orientons et accompagnons, mais nous ne prodiguons pas de soins. Votre traitement reste entre les mains des spécialistes que nous coordonnons.",
        },
        {
          q: "Puis-je faire appel à Wama Med pour un proche au Maroc alors que je suis à l’étranger ?",
          a: "Absolument. C’est précisément l’un de nos services principaux. Nous agissons comme votre représentant sur place — avec les compétences médicales et administratives pour gérer tout votre dossier.",
        },
        {
          q: "Quels pays d’origine accueillez-vous ?",
          a: "Nous travaillons avec des patients venant de France, Belgique, Pays-Bas, d’Afrique subsaharienne (Sénégal, Côte d’Ivoire, Mali, Cameroun, et plus), et d’Europe. Notre équipe parle français et arabe.",
        },
        {
          q: "Combien de temps dure une prise en charge type ?",
          a: "Cela dépend de la situation. Une consultation unique peut être coordonnée en 48-72 heures. Un parcours multi-spécialiste complexe peut s’étendre sur plusieurs semaines. Nous vous donnons une estimation dès l’analyse initiale.",
        },
      ],
    },
    contactPage: {
      metadata: {
        title: "Contact — Soumettre votre dossier médical | Wama Med",
        description:
          "Soumettez votre dossier médical à Wama Med. Disponibles 24h/24, 7j/7 pour les familles marocaines, la diaspora et les patients internationaux.",
      },
      hero: {
        badge: "Disponible maintenant · Répond en < 2h",
        eyebrow: "Contact",
        titleStart: "Votre dossier mérite",
        titleHighlight: "d'être entre de bonnes mains.",
        body:
          "Partagez votre situation. Notre équipe vous répond sous 2 heures. Disponible 24h/24, 7j/7.",
      },
      formSection: {
        eyebrow: "Formulaire de contact",
        title: "Soumettez votre dossier.",
        body: "Notre équipe vous répond sous 2 heures.",
        whatsappAvailability: "WhatsApp — disponible 24h/24",
        assistantAria: "Assistant IA immédiat",
        formAria: "Formulaire de contact et informations",
      },
    },
  },
  en: {
    skipToContent: "Skip to content",
    schemaDescription:
      "National and international medical coordination — Casablanca, Morocco",
    header: {
      homeAria: "Wama Med — Home",
      desktopNavAria: "Primary navigation",
      mobileNavAria: "Mobile navigation",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      submitCase: "Submit your case",
      languageLabel: "Language",
      nav: [
        { href: "/services", label: "Services" },
        { href: "/comment-ca-marche", label: "Our Process" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
      ],
    },
    footer: {
      brandDescription:
        "National and international medical coordination — from Casablanca, for the world.",
      servicesTitle: "Services",
      navigationTitle: "Navigation",
      contactTitle: "Contact",
      serviceLinks: [
        { href: "/services", label: "National coordination" },
        { href: "/services", label: "International patients" },
        { href: "/services", label: "Moroccan diaspora" },
        { href: "/services", label: "Medical evacuation" },
      ],
      navLinks: [
        { href: "/comment-ca-marche", label: "Our Process" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
      ],
      whatsapp: "WhatsApp",
      copyright: "All rights reserved.",
      availability: "Available 24/7",
      addressLines: ["5 Rue Molière", "Racine District", "Casablanca, Morocco"],
    },
    assistant: {
      headerTitle: "Wama Med Assistant",
      availability: "Available 24/7",
      openAria: "Open the Wama Med assistant",
      closeAria: "Close the assistant",
      label: "Talk now",
      tabAria: "Contact mode",
      tabs: { voice: "Voice", chat: "Chat" },
      greeting:
        "Hello! I'm the Wama Med assistant. How can I help with your medical coordination today?",
      unavailable:
        "I can't connect right now. Please call us at +212 522 000 000.",
      responseError:
        "I couldn't respond. Please try again.",
      sendError:
        "An error occurred. Please contact us at +212 522 000 000.",
      emptyChat:
        "Ask your question about medical coordination.",
      linkLabel: "Open link →",
      inputPlaceholder: "Your question...",
      sendAria: "Send",
      voice: {
        idleTitle: "Speak with our assistant",
        connectingTitle: "Connecting...",
        activeTitle: "On the call",
        endingTitle: "Ending the call...",
        idleDescription:
          "Our assistant answers in English 24/7",
        activeDescription:
          "Speak normally — the assistant is listening",
        startCall: "Start the call",
        endCall: "End the call",
        waiting: "Please wait...",
      },
    },
    shared: {
      countries: [
        "Morocco",
        "France",
        "Belgium",
        "Netherlands",
        "Senegal",
        "Ivory Coast",
        "Mali",
        "Cameroon",
        "Gabon",
        "Congo",
        "Other African country",
        "Other European country",
        "Other",
      ],
      whatsappAria: "Contact us on WhatsApp",
      aiSection: {
        badge: "Online · Replies instantly",
        heading: "Talk to our assistant now",
        description:
          "Available 24/7 · Replies instantly · French, Arabic, English",
      },
      closingCta: {
        backgroundWord: "TOGETHER",
        eyebrow: "First step",
        titleStart: "Your case deserves",
        titleHighlight: "an expert by your side.",
        body:
          "Share your situation. Our team replies within 2 hours. Available 24/7 for France, Belgium, Sub-Saharan Africa, and patients worldwide.",
        primary: "Submit your case",
        secondary: "Direct WhatsApp",
        availability: "Available 24/7",
      },
      contactForm: {
        successTitle: "Case received.",
        successDescription:
          "Our team will contact you within 2 hours. Available 24/7.",
        fields: {
          name: "Full name",
          email: "Email",
          phone: "Phone",
          country: "Country of residence",
          message: "Your medical situation",
          files: "Attach documents",
          optional: "(optional)",
        },
        placeholders: {
          name: "Your name",
          email: "your@email.com",
          phone: "+33 6 XX XX XX XX",
          country: "Select...",
          message:
            "Briefly describe your medical situation, the condition(s) involved, and the support you need...",
        },
        filesEmpty: "PDF, JPG, PNG, DOC — max. 10 MB",
        filesSelectedSingle: "{count} file selected",
        filesSelectedPlural: "{count} files selected",
        error:
          "An error occurred. Please contact us directly at +212 522 000 000.",
        sending: "Sending...",
        submit: "Submit my case",
        footer:
          "Reply guaranteed within 2 hours · Available 24/7 · Confidential data",
      },
    },
    home: {
      metadata: {
        title: "Wama Med — National and International Medical Coordination",
        description:
          "Wama Med coordinates your medical journey in Morocco, from specialist consultations to end-to-end care management. One point of contact for families, diaspora communities, and international patients.",
      },
      hero: {
        ariaLabel: "Wama Med — Medical coordination in Morocco",
        eyebrow: "Medical Coordination · Morocco",
        headline: "Your health deserves expertise without borders",
        arabic: "واما ميد — شريككم الطبي في المغرب",
        cta: "Submit your case",
      },
      trustStrip: {
        pillars: [
          { label: "Rigorous coordination", ar: "تنسيق دقيق" },
          { label: "International standards", ar: "معايير دولية" },
          { label: "Absolute confidentiality", ar: "سرية مطلقة" },
          { label: "24/7 availability", ar: "متاح على مدار الساعة" },
        ],
      },
      scrollJourney: {
        ariaLabel: "Our approach",
        cta: "Submit your case →",
        acts: [
          {
            id: 1,
            label: "The Problem",
            bg: "#1A2E40",
            headline:
              "Facing a foreign medical system alone is exhausting.",
            subtext:
              "Missed appointments. Language barriers. Constant uncertainty.",
            textColor: "#F5F0E8",
          },
          {
            id: 2,
            label: "Morocco",
            bg: "#1A3E48",
            headline: "Morocco offers world-class medicine.",
            subtext: "Access is what was missing.",
            textColor: "#F5F0E8",
          },
          {
            id: 3,
            label: "The Solution",
            bg: "#1A3440",
            headline: "One point of contact. Everything handled.",
            steps: ["Call", "File", "Clinic", "Follow-up", "Return"],
            textColor: "#F5F0E8",
          },
          {
            id: 4,
            label: "Our Commitments",
            bg: "#1A2E40",
            headline: "What defines our coordination",
            commitments: [
              {
                title: "Methodical rigor",
                desc:
                  "Every case follows a structured protocol, without improvisation.",
              },
              {
                title: "Verified medical network",
                desc:
                  "We work with accredited specialists and healthcare institutions.",
              },
              {
                title: "International compliance",
                desc:
                  "Confidentiality and cross-border coordination standards built in.",
              },
            ],
            textColor: "#F5F0E8",
          },
          {
            id: 5,
            label: "The Invitation",
            bg: "#1A2E40",
            headline: "Your health deserves better.",
            subtext: "We are ready.",
            textColor: "#C9A84C",
          },
        ],
      },
      servicesOverview: {
        eyebrow: "What we do",
        title: "Our Services",
        arabic: "خدماتنا",
        cta: "See all our services →",
        services: [
          {
            ar: "تنسيق جراحي",
            title: "Surgical coordination",
            desc:
              "Orthopedics, cardiology, oncology and more — with leading specialists across Morocco.",
            href: "/services",
          },
          {
            ar: "مرافقة لغوية",
            title: "Language support",
            desc:
              "A dedicated French-speaking point of contact at every step of your medical journey.",
            href: "/services",
          },
          {
            ar: "لوجستيك متكامل",
            title: "Complete logistics",
            desc:
              "Medical visa, accommodation, transport — full logistics for your stay.",
            href: "/services",
          },
          {
            ar: "متابعة ما بعد العملية",
            title: "Post-operative follow-up",
            desc:
              "Continuity of care and communication with your doctors after you return home.",
            href: "/services",
          },
          {
            ar: "شبكة شركاء",
            title: "Partner clinic network",
            desc:
              "Accredited institutions selected against rigorous quality criteria.",
            href: "/services",
          },
          {
            ar: "استشارات عن بُعد",
            title: "Remote consultations",
            desc:
              "Get expert medical guidance before you even leave your country.",
            href: "/services",
          },
        ],
      },
      founderSection: {
        alt: "Driss Benwahoud, founder of Wama Med",
        badge: "Founder & Director",
        eyebrow: "The promise",
        heading:
          "Built so no family is ever left alone in the system again.",
        quote:
          "\"Your medical file deserves better than a diary and a red pen.\"",
        cite: "— Driss Benwahoud, Founder",
        body:
          "Driss Benwahoud did not found Wama Med to seize a market opportunity. He built it after experiencing the chaos of fragmented medical coordination firsthand — a loved one, several specialists who never spoke to one another, and months lost in administrative queues. With ten years of experience in insurance, he had the tools to understand the problem. He chose to solve it.",
        cta: "Discover our story",
      },
      processPreview: {
        eyebrow: "Our Process",
        titleStart: "A structured protocol,",
        titleHighlight: "in 4 steps.",
        steps: [
          {
            number: "01",
            title: "Submit your case",
            desc:
              "Share your medical situation through our secure form or via WhatsApp. First response within 2 hours.",
          },
          {
            number: "02",
            title: "Medical review",
            desc:
              "Our coordinating physician reviews your file and designs a personalized orientation plan.",
          },
          {
            number: "03",
            title: "Complete coordination",
            desc:
              "Appointments, specialist communication, logistics — we handle everything. You only need to show up.",
          },
          {
            number: "04",
            title: "Post-consultation follow-up",
            desc:
              "Results follow-up, post-operative coordination, documentation for your return. We stay with you until the end.",
          },
        ],
        cta: "Discover the full protocol",
      },
      testimonials: {
        eyebrow: "Our commitments",
        title: "A rigorous coordination",
        titleHighlight: " framework.",
        principles: [
          {
            ar: "المنهجية",
            title: "Structured methodology",
            desc:
              "Every case follows a precise coordination protocol — review, orientation, follow-up — without improvisation or unqualified intermediaries.",
            icon: "01",
          },
          {
            ar: "الشراكات",
            title: "Established medical network",
            desc:
              "Direct collaboration with referring physicians and accredited facilities in Casablanca and across the country.",
            icon: "02",
          },
          {
            ar: "الامتثال",
            title: "International compliance",
            desc:
              "Case management aligned with international confidentiality and cross-border medical coordination standards.",
            icon: "03",
          },
        ],
      },
      contactSection: {
        eyebrow: "Let's connect",
        heading: "Your case deserves expert hands.",
        arabic: "تواصلوا معنا",
        successTitle: "Case received.",
        successDescription:
          "Our team will contact you within 2 hours.",
        fields: {
          name: "Full name",
          email: "Email",
          phone: "Phone",
          country: "Country of residence",
          message: "Your medical situation",
          files: "Attach documents",
          optional: "(optional)",
        },
        placeholders: {
          name: "Your name",
          email: "your@email.com",
          phone: "+33 6 XX XX XX XX",
          country: "Select...",
          message: "Briefly describe your situation...",
        },
        filesEmpty: "PDF, JPG, PNG, DOC — max. 10 MB",
        filesSelectedSingle: "{count} file selected",
        filesSelectedPlural: "{count} files selected",
        error:
          "An error occurred. Please email us at contact@wamamed.com",
        sending: "Sending...",
        submit: "Submit my case",
        footer:
          "Reply guaranteed within 2 hours · Available 24/7 · Confidential data",
      },
    },
    about: {
      metadata: {
        title:
          "About — Driss Benwahoud & Wama Med | Medical Coordination Casablanca",
        description:
          "The story behind Wama Med: founded by Driss Benwahoud after personally experiencing the chaos of fragmented medical coordination. One mission, one promise.",
      },
      hero: {
        eyebrow: "Our story",
        title: "Built so no family is ever left alone.",
      },
      founder: {
        alt: "Driss Benwahoud, founder and director of Wama Med",
        name: "Driss Benwahoud",
        role: "Founder & Director — Wama Med",
        eyebrow: "The founder",
        quote:
          "Your medical file deserves better than a diary and a red pen.",
        cite: "Driss Benwahoud, Founder",
        paragraphs: [
          "Driss Benwahoud did not found Wama Med to capture a market opportunity. He built it after personally living through the chaos of fragmented medical coordination — a loved one, several specialists who never spoke to each other, weeks lost in administrative queues, and results that never reached the right desk.",
          "With more than ten years of experience in insurance, Benwahoud understood systems, processes, and risk management. What he could not accept was that no structured professional service existed to navigate those systems on behalf of patients. So he created one.",
          "Today, Wama Med is that promise in practice: a dedicated medical coordinator handling your case end to end. One voice speaking to every specialist. One point of contact who knows your file as well as your family does.",
        ],
        experience:
          "10+ years in healthcare and insurance",
      },
      credentials: [
        {
          title: "Insurance & healthcare sector",
          desc: "More than ten years of experience",
        },
        {
          title: "Complex cases",
          desc: "Handled with method and rigor",
        },
        {
          title: "International reach",
          desc: "France, Belgium, Sub-Saharan Africa",
        },
      ],
      mission: {
        eyebrow: "Our mission",
        title:
          "Medical coordination as a structured professional service — at last.",
        paragraphs: [
          "The Moroccan healthcare system has excellent specialists and high-quality institutions. What it often lacks is coordination between those actors — someone who takes operational navigation off the patient's shoulders so they no longer have to manage bureaucracy while facing illness.",
          "Wama Med is that missing link. We do not heal. We coordinate — and in this context, coordination means safety.",
        ],
        alt: "Structured medical coordination — Wama Med, Casablanca",
      },
      values: {
        eyebrow: "Our values",
        title: "What defines us.",
        items: [
          {
            ar: "محاور واحد",
            title: "Single point of contact",
            desc:
              "One coordinator per case, from assessment to discharge. No handoffs between departments. No repetition.",
          },
          {
            ar: "سرية مطلقة",
            title: "Absolute confidentiality",
            desc:
              "Your medical data is handled under the strictest standards. Never shared without your explicit consent.",
          },
          {
            ar: "استجابة فورية",
            title: "24/7 responsiveness",
            desc:
              "Medical situations do not follow office hours. Our constant availability is not a marketing claim — it is our promise to you.",
          },
          {
            ar: "نطاق دولي",
            title: "International reach",
            desc:
              "Whether you are in Casablanca, Paris, Dakar or Amsterdam, Wama Med adapts every intervention to your geographic and linguistic context.",
          },
        ],
      },
    },
    servicesPage: {
      metadata: {
        title: "Services — Medical Coordination | Wama Med",
        description:
          "Case review, specialist orientation, appointment coordination, international logistics, post-consultation follow-up, and medical evacuation.",
      },
      hero: {
        eyebrow: "Our Services",
        titleStart: "Complete coordination.",
        titleHighlight: "One point of contact.",
        body:
          "From case review to post-operative follow-up — Wama Med manages every dimension of your medical journey in Morocco.",
      },
      servicesAria: "Services overview",
      detailsAria: "Service details",
      services: [
        {
          number: "01",
          ar: "تحليل الملف",
          title: "Medical file review",
          desc:
            "Your file is reviewed by our coordinating physician, who builds a precise orientation plan.",
          details: [
            "Complete review of the existing file",
            "Identification of the required specialists",
            "Personalized orientation plan",
            "First response within 2 hours",
          ],
        },
        {
          number: "02",
          ar: "التوجيه المتخصص",
          title: "Specialist orientation",
          desc:
            "We direct you to the specialists best suited to your clinical situation.",
          details: [
            "Verified specialist network",
            "Selection based on your pathology",
            "Leading institutions in Morocco",
            "Priority appointment booking",
          ],
        },
        {
          number: "03",
          ar: "تنسيق المواعيد",
          title: "Appointment coordination",
          desc:
            "Wama Med manages communication between all specialists involved in your case.",
          details: [
            "Cross-specialty coordination",
            "Secure sharing of results",
            "Timeline and priority management",
            "Reminders and confirmations",
          ],
        },
        {
          number: "04",
          ar: "اللوجستيك الدولي",
          title: "International logistics",
          desc:
            "Transfers, accommodation, language assistance and international medical documentation.",
          details: [
            "Airport-to-hospital transfers",
            "Accommodation near clinics",
            "Medical translation and interpretation",
            "Documents for your return home",
          ],
        },
        {
          number: "05",
          ar: "المرافقة المستمرة",
          title: "Continuous support",
          desc:
            "Your coordinator stays with you at every stage — from consultation through discharge.",
          details: [
            "Presence at every consultation",
            "Post-operative follow-up",
            "Family communication",
            "Complete discharge file",
          ],
        },
        {
          number: "06",
          ar: "الإخلاء الطبي",
          title: "Medical evacuation",
          desc:
            "Full organization of urgent medical evacuations, both national and international.",
          details: [
            "24/7 emergency coordination",
            "National medical transport",
            "International evacuations",
            "Insurer coordination",
          ],
        },
      ],
      featured: [
        {
          title: "Medical file review",
          desc:
            "Your file is reviewed by our coordinating physician, who builds a precise orientation plan. This is not a hotline — it is a serious medical assessment by a qualified professional.",
          details: [
            "Complete review of the existing file",
            "Identification of the required specialists",
            "Personalized orientation plan",
            "First response within 2 hours",
          ],
          image: "/images/wama-coordination-medecin.jpg",
          alt: "Wama Med coordinating physician reviewing a medical file",
        },
        {
          title: "Specialist orientation",
          desc:
            "Through our established network inside Morocco's leading medical institutions, we guide you to the specialists most appropriate for your clinical situation.",
          details: [
            "Verified specialist network",
            "Selection based on your pathology",
            "Leading institutions in Casablanca and across Morocco",
            "Priority appointment booking",
          ],
          image: "/images/wama-orientation-specialisee.jpg",
          alt: "Specialized medical coordination and orientation — Wama Med",
        },
        {
          title: "International logistics",
          desc:
            "For patients traveling from abroad: airport transfer, medical accommodation, language support, and management of international medical documentation.",
          details: [
            "Airport-to-hospital transfers",
            "Accommodation near clinics",
            "Medical translation and interpretation",
            "Documents for your return home",
          ],
          image: "/images/wama-patient-international.jpg",
          alt: "International patient support from the Wama Med team",
        },
      ],
    },
    approach: {
      metadata: {
        title: "Our Process — Coordination Protocol | Wama Med",
        description:
          "The Wama Med medical coordination protocol: from case submission to post-consultation follow-up, structured in 4 steps.",
      },
      hero: {
        eyebrow: "Our Process",
        titleStart: "A structured protocol,",
        titleHighlight: "in 4 steps.",
        body:
          "The Wama Med protocol is designed to remove uncertainty. Every step has a defined objective, a realistic timeline, and a clearly identified owner.",
      },
      stepsAria: "Process steps",
      faq: {
        eyebrow: "Frequently asked questions",
        title: "What you want to know.",
        prompt: "Do you have a question that is not listed above?",
        cta: "Ask your question",
      },
      steps: [
        {
          number: "01",
          title: "You submit your case",
          duration: "2 hours",
          durationLabel: "Response time",
          desc:
            "Share your medical situation through our secure form, by email, or via WhatsApp. Include every medical document you have available: test results, reports, prescriptions.",
          details: [
            "Simple and secure online form",
            "WhatsApp or email for urgent situations",
            "First reply within 2 hours",
            "No prepayment at this stage",
          ],
          callout:
            "Your situation is unique. We do not work from standardized templates — every exchange begins by listening.",
        },
        {
          number: "02",
          title: "Medical review by your coordinator",
          duration: "24h",
          durationLabel: "Orientation plan",
          desc:
            "Our coordinating physician reviews your file in depth and prepares a personalized orientation plan: which specialists to consult first, in which institution, and in what order.",
          details: [
            "Review by a qualified coordinating physician",
            "Identification of required specialists",
            "Selection of the best institutions",
            "Action plan with estimated timelines",
          ],
          callout:
            "This is not an algorithmic platform. A physician reads your file and thinks through your case.",
        },
        {
          number: "03",
          title: "Complete coordination — you only need to show up",
          duration: "Ongoing",
          durationLabel: "Support",
          desc:
            "Wama Med handles the full operational coordination: appointment booking, specialist communication, result sharing, and logistical organization for patients traveling from abroad.",
          details: [
            "Appointments booked on your behalf",
            "Direct communication between specialists",
            "International logistics (transport, accommodation)",
            "In-person or remote support depending on your case",
          ],
          callout:
            "You focus on your health. We handle everything else.",
        },
        {
          number: "04",
          title: "Support all the way through",
          duration: "Discharge + follow-up",
          durationLabel: "Case closure",
          desc:
            "Our mission does not stop at the consultation. Post-operative follow-up, coordination of your return home or medical repatriation, and a complete discharge file for your referring doctor.",
          details: [
            "Post-consultation and post-operative follow-up",
            "Return-home or repatriation coordination",
            "Complete discharge file",
            "Liaison with your treating physician",
          ],
          callout:
            "The end of the journey in Casablanca is not the end of our support.",
        },
      ],
      faqs: [
        {
          q: "How much does the service cost?",
          a: "Our fees depend on the complexity of the case and the services required. Contact us for a personalized quote — the initial review consultation is non-binding.",
        },
        {
          q: "Is Wama Med a medical practice?",
          a: "No. We are a medical coordination service — we organize, orient, and support, but we do not deliver medical treatment. Your care remains in the hands of the specialists we coordinate.",
        },
        {
          q: "Can I use Wama Med for a loved one in Morocco while I am abroad?",
          a: "Absolutely. That is one of our core services. We act as your representative on the ground — with the medical and administrative expertise to manage the entire case.",
        },
        {
          q: "Which countries do you support patients from?",
          a: "We work with patients from France, Belgium, the Netherlands, Sub-Saharan Africa (Senegal, Ivory Coast, Mali, Cameroon, and more), and Europe. Our team speaks French and Arabic.",
        },
        {
          q: "How long does a typical case take?",
          a: "It depends on the situation. A single consultation can often be coordinated within 48-72 hours. A complex multi-specialist pathway can extend over several weeks. We provide an estimate from the initial review stage.",
        },
      ],
    },
    contactPage: {
      metadata: {
        title: "Contact — Submit your medical file | Wama Med",
        description:
          "Submit your medical file to Wama Med. Available 24/7 for Moroccan families, diaspora communities, and international patients.",
      },
      hero: {
        badge: "Available now · Replies in < 2h",
        eyebrow: "Contact",
        titleStart: "Your case deserves",
        titleHighlight: "expert hands.",
        body:
          "Share your situation. Our team replies within 2 hours. Available 24/7.",
      },
      formSection: {
        eyebrow: "Contact form",
        title: "Submit your case.",
        body: "Our team replies within 2 hours.",
        whatsappAvailability: "WhatsApp — available 24/7",
        assistantAria: "Instant AI assistant",
        formAria: "Contact form and information",
      },
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
