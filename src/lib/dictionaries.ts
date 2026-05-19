import { Locale } from "@/lib/i18n";

const dictionaries = {
  fr: {
    skipToContent: "Aller au contenu principal",
    schemaDescription:
      "Accompagnement médical basé à Casablanca pour des parcours de soins clairs, au Maroc comme à l'international.",
    header: {
      homeAria: "WaMa Med — Accueil",
      desktopNavAria: "Navigation principale",
      mobileNavAria: "Navigation mobile",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      submitCase: "Confier un dossier",
      languageLabel: "Langue",
      nav: [
        { href: "/services", label: "Nos services" },
        { href: "/comment-ca-marche", label: "Notre approche" },
        { href: "/about", label: "À propos" },
        { href: "/contact", label: "Contact" },
      ],
    },
    footer: {
      brandDescription:
        "Une équipe basée à Casablanca, au service de parcours de soins clairs, exigeants et continus.",
      servicesTitle: "Services",
      navigationTitle: "Navigation",
      contactTitle: "Contact",
      serviceLinks: [
        { href: "/services", label: "Parcours de soins" },
        { href: "/services", label: "Bilans et prévention" },
        { href: "/services", label: "Conseil en prise en charge" },
        { href: "/services", label: "Accompagnement des familles à distance" },
      ],
      navLinks: [
        { href: "/comment-ca-marche", label: "Notre approche" },
        { href: "/about", label: "À propos" },
        { href: "/contact", label: "Contact" },
      ],
      copyright: "Tous droits réservés.",
      availability: "Joignable 24h/24, 7j/7",
      addressLines: ["5 Rue Molière", "Quartier Racine", "Casablanca, Maroc"],
    },
    assistant: {
      headerTitle: "Assistant WaMa Med",
      availability: "Joignable 24h/24",
      openAria: "Ouvrir l'assistant WaMa Med",
      closeAria: "Fermer l'assistant",
      label: "Discutez maintenant",
      tabAria: "Mode de contact",
      tabs: { voice: "Voix", chat: "Chat" },
      greeting:
        "Bonjour. Je suis l'assistant WaMa Med — en quoi puis-je vous être utile aujourd'hui ?",
      unavailable:
        "La connexion est indisponible pour le moment. Écrivez-nous à contact@wamamed.com.",
      responseError:
        "La réponse n'a pas pu aboutir. Réessayez dans un instant.",
      sendError:
        "Un incident technique est survenu. Écrivez-nous à contact@wamamed.com.",
      emptyChat:
        "Posez votre question — nous vous répondons.",
      linkLabel: "Ouvrir le lien →",
      inputPlaceholder: "Votre question...",
      sendAria: "Envoyer",
      voice: {
        idleTitle: "Échangez avec notre assistant",
        connectingTitle: "Connexion en cours...",
        activeTitle: "En ligne",
        endingTitle: "Fin de l'appel...",
        idleDescription:
          "Notre assistant répond en français et en anglais, 24h/24",
        activeDescription:
          "Parlez naturellement — l'assistant vous écoute",
        startCall: "Démarrer l'appel",
        endCall: "Terminer l'appel",
        waiting: "Un instant...",
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
      aiSection: {
        badge: "En ligne · Répond immédiatement",
        heading: "Échangez avec notre assistant",
        description:
          "Joignable 24h/24 · Réponse immédiate · En français et en anglais",
      },
      closingCta: {
        backgroundWord: "ENSEMBLE",
        eyebrow: "Première étape",
        titleStart: "Vous méritez",
        titleHighlight: "un accompagnement à la hauteur.",
        body:
          "Partagez-nous votre situation. Nous revenons vers vous rapidement avec une première lecture du dossier et une étape suivante claire.",
        primary: "Confier votre dossier",
        secondary: "Nous écrire par email",
        availability: "Contact professionnel : contact@wamamed.com",
      },
      apiErrors: {
        contactMissingFields: "Des champs obligatoires sont manquants.",
        contactServiceUnavailable: "Service de messagerie indisponible.",
        contactSendError: "L'envoi n'a pas pu aboutir.",
        chatMissingParams: "Paramètres manquants.",
        chatFallback: "La réponse n'a pas pu aboutir. Réessayez dans un instant.",
      },
      contactForm: {
        successTitle: "Dossier bien reçu.",
        successDescription:
          "Notre équipe revient vers vous rapidement avec une première orientation claire.",
        fields: {
          name: "Nom complet",
          email: "Email",
          phone: "Téléphone",
          country: "Pays de résidence",
          message: "Votre situation médicale",
          files: "Joindre des documents",
          optional: "(facultatif)",
        },
        placeholders: {
          name: "Votre nom",
          email: "votre@email.com",
          phone: "+33 6 XX XX XX XX",
          country: "Choisir...",
          message:
            "Décrivez en quelques mots votre situation médicale, la pathologie concernée et le type d'accompagnement attendu...",
        },
        filesEmpty: "PDF, JPG, PNG, DOC — 10 Mo maximum",
        filesSelectedSingle: "{count} fichier sélectionné",
        filesSelectedPlural: "{count} fichiers sélectionnés",
        error:
          "Un incident technique est survenu. Écrivez-nous directement à contact@wamamed.com.",
        sending: "Envoi en cours...",
        submit: "Confier mon dossier",
        footer:
          "Réponse rapide · Confidentialité préservée · Accompagnement humain",
      },
    },
    home: {
      metadata: {
        title: "WaMa Med — Parcours de soins au Maroc et à l'international",
        description:
          "WaMa Med aide les patients et les familles à organiser leurs parcours de soins, au Maroc comme à l'international, avec méthode, clarté et présence humaine.",
      },
      hero: {
        ariaLabel: "WaMa Med — Accompagnement médical international",
        eyebrow: "WaMa Med · Parcours de soins",
        headline: "WaMa Med, votre accompagnement médical de confiance",
        headlineLines: ["WaMa Med,", "votre accompagnement médical", "de confiance"],
        supportingLine:
          "Vous êtes malade, vous accompagnez un proche ou vous préparez un check-up : nous organisons les bonnes étapes médicales, logistiques et humaines.",
        cta: "Confier votre dossier",
      },
      trustStrip: {
        pillars: [
          { label: "Orientation experte" },
          { label: "Réseau de référence" },
          { label: "Confidentialité totale" },
          { label: "Disponibilité 24h/24" },
        ],
      },
      carePathway: {
        ariaLabel: "Les étapes du parcours",
        eyebrow: "Comment ça se passe",
        title: "Un parcours lisible, étape par étape.",
        intro:
          "Tout est visible dès le départ : nous partons de votre besoin, nous clarifions les priorités, puis nous organisons les rendez-vous, le séjour et le suivi.",
        cta: "Confier votre dossier →",
        steps: [
          {
            number: "01",
            title: "Comprendre votre situation",
            desc:
              "Vous nous transmettez votre demande et les documents utiles. Nous identifions le contexte, l'urgence, les contraintes et les priorités.",
          },
          {
            number: "02",
            title: "Préparer l'orientation médicale",
            desc:
              "Votre dossier est relu avec méthode pour cibler les bons spécialistes, les établissements adaptés et l'ordre logique des étapes.",
          },
          {
            number: "03",
            title: "Organiser les rendez-vous",
            desc:
              "Nous planifions les consultations, les examens et les échanges nécessaires pour éviter les allers-retours inutiles.",
          },
          {
            number: "04",
            title: "Accompagner le séjour",
            desc:
              "Transport, hébergement, documents, traduction et présence sur place ou à distance sont préparés autour du calendrier médical.",
          },
          {
            number: "05",
            title: "Assurer le suivi",
            desc:
              "Après la consultation ou l'intervention, nous aidons à rassembler les résultats, préparer le retour et garder un dossier clair.",
          },
        ],
        supportTitle: "Ce qui fait la différence WaMa Med",
        supportItems: [
          {
            title: "Une coordination centralisée",
            desc:
              "Toutes les étapes du parcours sont organisées autour d'un interlocuteur unique pour plus de clarté et de fluidité.",
          },
          {
            title: "Un réseau médical sélectionné",
            desc:
              "Nous collaborons avec des spécialistes et établissements choisis pour leur expertise, leur sérieux et leur adéquation avec chaque dossier.",
          },
          {
            title: "Une approche discrète et sécurisée",
            desc:
              "La confidentialité, la précision des échanges et la qualité du suivi restent au centre de chaque accompagnement.",
          },
        ],
      },
      servicesOverview: {
        eyebrow: "Notre accompagnement",
        title: "Les services qui font la différence",
        cta: "Voir tous nos services →",
        services: [
          {
            title: "Bilans de santé et check-ups",
            desc:
              "Des bilans préventifs, de dépistage ou de contrôle organisés avec les bons rendez-vous, au bon rythme.",
            href: "/services",
          },
          {
            title: "Réseau de cliniques partenaires",
            desc:
              "Un accès à des établissements sélectionnés pour leur excellence médicale, leur expertise spécialisée et la qualité de leur prise en charge.",
            href: "/services",
          },
          {
            title: "Conseil en prise en charge",
            desc:
              "Un accompagnement clair et stratégique dans vos échanges avec les assurances, entreprises et organismes de couverture médicale.",
            href: "/services",
          },
          {
            title: "Organisation du séjour médical",
            desc:
              "Transport, hébergement, rendez-vous, coordination médicale et documents : chaque étape est préparée avec rigueur pour un parcours fluide et sécurisé.",
            href: "/services",
          },
          {
            title: "Accompagnement multilingue",
            desc:
              "Des échanges facilités en français, anglais et arabe, avec un accompagnement humain attentif à chaque étape du parcours.",
            href: "/services",
          },
          {
            title: "Parcours chirurgical",
            desc:
              "Une préparation rigoureuse pour les interventions spécialisées, avec coordination médicale complète avant, pendant et après l'intervention.",
            href: "/services",
          },
        ],
      },
      founderSection: {
        alt: "L'équipe fondatrice de WaMa Med",
        badge: "Notre histoire",
        intro:
          "Une structure pensée pour les patients, les proches et les familles qui ont besoin d'un repère fiable.",
        eyebrow: "La promesse",
        heading:
          "Rendre chaque parcours plus lisible, plus humain et mieux organisé.",
        quote:
          "\"Un bon accompagnement apporte de la clarté avant même le premier rendez-vous.\"",
        cite: "— WaMa Med",
        body:
          "WaMa Med est né d'expériences personnelles : la maladie d'un proche, des rendez-vous éparpillés, des décisions à prendre vite et bien. Cette histoire a donné naissance à une méthode simple : écouter la personne, clarifier les priorités médicales et organiser chaque étape avec attention.",
        cta: "Découvrir notre histoire",
      },
      processPreview: {
        eyebrow: "Notre approche",
        titleStart: "Un protocole clair,",
        titleHighlight: "en 4 étapes.",
        steps: [
          {
            number: "01",
            title: "Vous nous confiez votre dossier",
            desc:
              "Partagez votre situation via notre formulaire sécurisé. Nous revenons rapidement vers vous avec une première orientation.",
          },
          {
            number: "02",
            title: "Analyse médicale",
            desc:
              "Un médecin référent relit les éléments clés et prépare une orientation claire.",
          },
          {
            number: "03",
            title: "Organisation du parcours",
            desc:
              "Rendez-vous, échanges entre spécialistes, logistique et suivi avancent dans le même sens, autour d'un même plan.",
          },
          {
            number: "04",
            title: "Accompagnement post-consultation",
            desc:
              "Résultats, suites de soins et documentation restent suivis jusqu'à la fin du parcours.",
          },
        ],
        cta: "Découvrir notre protocole complet",
      },
      testimonials: {
        eyebrow: "Nos engagements",
        title: "Un cadre d'accompagnement",
        titleHighlight: " sur lequel s'appuyer.",
        principles: [
          {
            title: "Méthodologie structurée",
            desc:
              "Chaque dossier suit une trajectoire claire, documentée et pilotée avec exigence, du premier échange jusqu'au suivi.",
            icon: "01",
          },
          {
            title: "Réseau médical établi",
            desc:
              "Une collaboration directe avec des médecins référents et des établissements de confiance, à Casablanca et à l'échelle du pays.",
            icon: "02",
          },
          {
            title: "Conformité internationale",
            desc:
              "Un traitement des dossiers aligné sur les exigences de confidentialité des parcours internationaux.",
            icon: "03",
          },
        ],
      },
      contactSection: {
        eyebrow: "Prenons contact",
        heading: "Parlons de votre situation.",
        supportingLine:
          "Décrivez-nous votre situation. Nous revenons rapidement vers vous avec une étape suivante claire.",
        successTitle: "Dossier bien reçu.",
        successDescription:
          "Notre équipe revient vers vous rapidement.",
        fields: {
          name: "Nom complet",
          email: "Email",
          phone: "Téléphone",
          country: "Pays de résidence",
          message: "Votre situation médicale",
          files: "Joindre des documents",
          optional: "(facultatif)",
        },
        placeholders: {
          name: "Votre nom",
          email: "votre@email.com",
          phone: "+33 6 XX XX XX XX",
          country: "Choisir...",
          message: "Décrivez en quelques mots votre situation...",
        },
        filesEmpty: "PDF, JPG, PNG, DOC — 10 Mo maximum",
        filesSelectedSingle: "{count} fichier sélectionné",
        filesSelectedPlural: "{count} fichiers sélectionnés",
        error:
          "Un incident technique est survenu. Écrivez-nous à contact@wamamed.com",
        sending: "Envoi en cours...",
        submit: "Confier mon dossier",
        footer:
          "Réponse rapide · Confidentialité préservée · Accompagnement humain",
      },
    },
    about: {
      metadata: {
        title:
          "À propos — WaMa Med | Accompagnement médical international",
        description:
          "L'histoire de WaMa Med : une entreprise pensée pour apporter clarté, continuité et présence humaine à chaque parcours médical, au Maroc comme à l'international.",
      },
      hero: {
        eyebrow: "Notre histoire",
        title: "Une entreprise née pour apporter clarté et continuité aux parcours de soins.",
      },
      founder: {
        alt: "L'équipe fondatrice de WaMa Med",
        name: "L'équipe fondatrice",
        role: "Fondateurs de WaMa Med",
        eyebrow: "Les fondateurs",
        storyEyebrow: "Une histoire personnelle",
        quote:
          "Un bon accompagnement se mesure à la sérénité qu'il installe autour du patient.",
        cite: "WaMa Med",
        paragraphs: [
          "WaMa Med est né de deux histoires personnelles, l'une comme l'autre marquées par la maladie d'un proche. Elles ont mis au jour le même besoin : un accompagnement clair, humain et fiable lorsque les décisions médicales deviennent complexes.",
          "L'équipe fondatrice combine plusieurs expertises : organisation de parcours et relation directe avec les établissements de santé, conseil en prise en charge, accompagnement de terrain auprès des patients et des familles.",
          "Aujourd'hui, WaMa Med met cette méthode au service des patients et de leurs proches : un interlocuteur unique, des décisions structurées et un suivi continu à chaque étape.",
        ],
        experience:
          "Conseil en prise en charge, accompagnement des familles et organisation de parcours",
      },
      credentials: [
        {
          title: "Conseil & santé",
          desc: "Plus de dix ans d'expérience sur le terrain",
        },
        {
          title: "Dossiers complexes",
          desc: "Pilotés avec méthode et exigence",
        },
        {
          title: "Portée internationale",
          desc: "Europe, Afrique et parcours transfrontaliers",
        },
      ],
      mission: {
        eyebrow: "Notre mission",
        title:
          "Rendre les parcours médicaux plus lisibles, plus humains et plus professionnels.",
        paragraphs: [
          "WaMa Med relie les spécialistes, les établissements, la logistique et les familles dans un même cadre de travail. Cette cohérence permet au patient d'avancer avec visibilité et confiance.",
          "Basée à Casablanca, notre équipe accompagne les parcours locaux comme internationaux avec la même exigence : clarté, réactivité et continuité, à chaque étape.",
        ],
        alt: "Accompagnement médical structuré par WaMa Med",
      },
      values: {
        eyebrow: "Nos valeurs",
        title: "Ce qui nous définit.",
        items: [
          {
            title: "Un interlocuteur unique",
            desc:
              "Une personne dédiée suit le dossier de bout en bout pour garantir la cohérence, la fluidité et une responsabilité claire.",
          },
          {
            title: "Confidentialité absolue",
            desc:
              "Vos données médicales sont traitées avec le niveau de confidentialité requis pour des parcours sensibles et internationaux.",
          },
          {
            title: "Réactivité 24h/24",
            desc:
              "La disponibilité de l'équipe maintient le rythme du dossier et garantit des étapes suivantes rapides et lisibles.",
          },
          {
            title: "Portée internationale",
            desc:
              "Chaque accompagnement s'adapte à votre localisation, à votre calendrier et à la réalité d'un parcours de soins transfrontalier.",
          },
        ],
      },
    },
    servicesPage: {
      metadata: {
        title: "Nos services — Parcours de soins | WaMa Med",
        description:
          "Bilans de santé, analyse du dossier, réseau de cliniques partenaires, organisation du séjour médical, accompagnement multilingue, conseil en prise en charge, parcours chirurgical et suivi.",
      },
      hero: {
        eyebrow: "Nos services",
        titleStart: "Un parcours clair.",
        titleHighlight: "Une même trajectoire.",
        body:
          "De la première demande au suivi, WaMa Med organise les étapes utiles avec méthode, rythme et attention personnalisée.",
      },
      servicesAria: "Aperçu des services",
      detailsAria: "Services en détail",
      services: [
        {
          number: "01",
          title: "Bilans de santé et check-ups",
          desc:
            "Nous organisons les bilans préventifs, les contrôles et les parcours de dépistage avec les bons rendez-vous, au bon rythme.",
          details: [
            "Bilans préventifs et check-ups programmés",
            "Examens de dépistage ou de contrôle",
            "Calendrier médical clair",
            "Résultats rassemblés dans un dossier lisible",
          ],
        },
        {
          number: "02",
          title: "Analyse du dossier médical",
          desc:
            "Nous étudions votre dossier pour clarifier les priorités médicales et préparer les étapes à venir.",
          details: [
            "Lecture des documents existants",
            "Identification des points à éclaircir",
            "Première orientation exploitable",
            "Priorités classées par ordre logique",
          ],
        },
        {
          number: "03",
          title: "Réseau de cliniques partenaires",
          desc:
            "Un accès à des établissements sélectionnés pour leur excellence médicale, leur expertise spécialisée et la qualité de leur prise en charge.",
          details: [
            "Spécialistes et établissements sélectionnés",
            "Expertise adaptée à chaque dossier",
            "Établissements de référence à Casablanca, au Maroc et à l'international",
            "Orientation selon le besoin médical réel",
          ],
        },
        {
          number: "04",
          title: "Conseil en prise en charge",
          desc:
            "Un accompagnement clair et stratégique dans vos échanges avec les assurances, entreprises et organismes de couverture médicale.",
          details: [
            "Lecture des demandes de prise en charge",
            "Préparation des éléments administratifs",
            "Liaison avec les organismes concernés",
            "Suivi des réponses et documents utiles",
          ],
        },
        {
          number: "05",
          title: "Organisation du séjour médical",
          desc:
            "Transport, hébergement, rendez-vous, coordination médicale et documents : chaque étape est préparée avec rigueur pour un parcours fluide et sécurisé.",
          details: [
            "Transport local : clinique, laboratoire, hôtel, rendez-vous",
            "Hébergement du patient et des accompagnants",
            "Coordination médicale autour du calendrier",
            "Documents préparés pour chaque étape",
          ],
        },
        {
          number: "06",
          title: "Accompagnement multilingue",
          desc:
            "Des échanges facilités en français, anglais et arabe, avec un accompagnement humain attentif à chaque étape du parcours.",
          details: [
            "Échanges facilités en français, anglais et arabe",
            "Interprétariat possible selon la situation",
            "Aide à la compréhension des documents",
            "Présence humaine attentive à chaque étape",
          ],
        },
        {
          number: "07",
          title: "Parcours chirurgical",
          desc:
            "Une préparation rigoureuse pour les interventions spécialisées, avec coordination médicale complète avant, pendant et après l'intervention.",
          details: [
            "Avis spécialisé et faisabilité",
            "Planning pré-opératoire",
            "Lien avec la clinique et les praticiens",
            "Suivi avant, pendant et après l'intervention",
          ],
        },
        {
          number: "08",
          title: "Suivi post-opératoire",
          desc:
            "Après l'intervention ou la consultation, nous aidons à garder une continuité claire jusqu'au retour.",
          details: [
            "Suivi post-consultation et post-opératoire",
            "Résultats et comptes-rendus rassemblés",
            "Dossier de sortie complet",
            "Liaison avec votre médecin traitant",
          ],
        },
      ],
      featured: [
        {
          title: "Analyse du dossier médical",
          desc:
            "Votre situation est étudiée avec méthode pour définir les priorités, les expertises à mobiliser et la trajectoire la plus pertinente.",
          details: [
            "Lecture complète du dossier existant",
            "Identification des spécialistes nécessaires",
            "Plan d'orientation personnalisé",
            "Premier retour rapide et exploitable",
          ],
          image: "/images/wama-coordination-medecin.jpg",
          alt: "Médecin référent WaMa Med analysant un dossier médical",
        },
        {
          title: "Orientation spécialisée",
          desc:
            "Grâce à un réseau de partenaires installés dans des établissements de référence, nous vous orientons vers les spécialistes les plus adaptés à votre situation clinique.",
          details: [
            "Réseau de spécialistes vérifiés",
            "Sélection adaptée à votre pathologie",
            "Établissements de référence à Casablanca, au Maroc et à l'international",
            "Prise de rendez-vous prioritaire",
          ],
          image: "/images/wama-orientation-specialisee.jpg",
          alt: "Orientation médicale spécialisée — WaMa Med",
        },
        {
          title: "Logistique médicale",
          desc:
            "Pour les patients au Maroc, ceux qui viennent de l'étranger ou les familles qui accompagnent à distance, nous organisons la logistique autour du calendrier clinique.",
          details: [
            "Transport local : clinique, laboratoire, hôtel, rendez-vous",
            "Hébergement du patient et des accompagnants",
            "Traduction et interprétariat médical",
            "Documents médicaux pour le retour à la maison",
          ],
          image: "/images/wama-patient-international.jpg",
          alt: "Accueil de patients internationaux par l'équipe WaMa Med",
        },
      ],
    },
    approach: {
      metadata: {
        title: "Notre approche — Parcours en 4 étapes | WaMa Med",
        description:
          "L'approche WaMa Med : de la première analyse de votre dossier au suivi post-consultation, structurée en 4 étapes.",
      },
      hero: {
        eyebrow: "Notre approche",
        titleStart: "Un protocole structuré,",
        titleHighlight: "en 4 étapes.",
        body:
          "Chaque étape apporte de la visibilité, un interlocuteur clairement identifié et une suite logique autour de votre dossier.",
      },
      stepsAria: "Étapes du processus",
      faq: {
        eyebrow: "Questions fréquentes",
        title: "Ce que vous voulez savoir.",
        prompt: "Une question qui n'apparaît pas dans cette liste ?",
        cta: "Posez votre question",
      },
      steps: [
        {
          number: "01",
          title: "Vous nous confiez votre dossier",
          duration: "Rapide",
          durationLabel: "Premier retour",
          desc:
            "Partagez votre situation médicale via notre formulaire sécurisé ou par email. Joignez tout document utile : résultats d'analyses, comptes-rendus, ordonnances.",
          details: [
            "Formulaire en ligne simple et sécurisé",
            "Contact professionnel par email",
            "Premier retour rapide",
            "Aucun paiement à cette étape",
          ],
          callout:
            "Chaque dossier démarre par une lecture attentive de votre contexte, de vos priorités et de votre calendrier.",
        },
        {
          number: "02",
          title: "Analyse médicale par votre référent",
          duration: "Structuré",
          durationLabel: "Plan d'orientation",
          desc:
            "Un médecin référent étudie votre dossier en profondeur et établit un plan d'orientation personnalisé : quels spécialistes consulter en priorité, dans quel établissement, dans quel ordre.",
          details: [
            "Lecture par un médecin référent qualifié",
            "Identification des spécialistes nécessaires",
            "Sélection des établissements les mieux adaptés",
            "Plan d'action clair et hiérarchisé",
          ],
          callout:
            "Votre plan d'orientation est pensé pour être immédiatement utile, lisible et exploitable.",
        },
        {
          number: "03",
          title: "Organisation du parcours — tout avance dans le même sens",
          duration: "Continu",
          durationLabel: "Accompagnement",
          desc:
            "WaMa Med prend en charge l'organisation opérationnelle : prise de rendez-vous, communication entre spécialistes, partage des résultats, transport local et hébergement si nécessaire.",
          details: [
            "Rendez-vous pris en votre nom",
            "Communication directe entre les spécialistes",
            "Logistique adaptée : transport, hébergement",
            "Présence sur place ou à distance, selon votre situation",
          ],
          callout:
            "Vous gardez votre énergie pour la santé. Nous gardons le cap sur l'organisation.",
        },
        {
          number: "04",
          title: "Accompagnement jusqu'au bout du parcours",
          duration: "Sortie + suivi",
          durationLabel: "Clôture du dossier",
          desc:
            "Notre mission ne s'arrête pas à la consultation. Suivi post-opératoire, retour à domicile ou rapatriement, dossier de sortie complet pour votre médecin référent.",
          details: [
            "Suivi post-consultation et post-opératoire",
            "Organisation du retour à la maison ou du rapatriement",
            "Dossier de sortie complet",
            "Liaison avec votre médecin traitant",
          ],
          callout:
            "Le parcours reste cohérent jusqu'à la dernière étape — y compris après la prise en charge principale.",
        },
      ],
      faqs: [
        {
          q: "Combien coûte ce service ?",
          a: "Nos tarifs dépendent de la complexité du dossier et des services demandés. Contactez-nous pour un devis personnalisé : la première consultation d'analyse se fait sans engagement.",
        },
        {
          q: "WaMa Med est-il un cabinet médical ?",
          a: "Non. WaMa Med organise, oriente et accompagne les parcours de soins, mais ne prodigue pas de soins. Votre traitement reste entre les mains des spécialistes qui vous prennent en charge.",
        },
        {
          q: "Puis-je faire appel à WaMa Med pour un proche au Maroc alors que je vis à l'étranger ?",
          a: "Bien sûr — c'est précisément l'un de nos services phares. Nous devenons votre représentant sur place, avec les compétences médicales et administratives nécessaires pour piloter le dossier dans son ensemble.",
        },
        {
          q: "À quels patients vous adressez-vous ?",
          a: "Nous accompagnons des patients au Maroc, en Afrique, en Europe et dans d'autres contextes internationaux. Notre équipe travaille en français, en anglais et en arabe ; un interprète peut être mobilisé pour d'autres langues.",
        },
        {
          q: "Combien de temps dure une prise en charge typique ?",
          a: "Cela dépend de la situation. Une consultation isolée peut souvent être organisée en quelques jours. Un parcours pluridisciplinaire plus complexe peut s'étendre sur plusieurs semaines. Nous vous donnons une estimation dès la première analyse.",
        },
      ],
    },
    contactPage: {
      metadata: {
        title: "Contact — Confier votre dossier médical | WaMa Med",
        description:
          "Confiez-nous votre dossier médical. Réponse rapide et accompagnement humain pour des parcours de soins, au Maroc comme à l'international.",
      },
      hero: {
        badge: "Contact professionnel · Réponse rapide",
        eyebrow: "Contact",
        titleStart: "Parlons de votre",
        titleHighlight: "prochaine étape.",
        body:
          "Décrivez-nous votre situation. Notre équipe revient rapidement vers vous avec un retour clair et une étape suivante concrète.",
      },
      formSection: {
        eyebrow: "Formulaire de contact",
        title: "Confiez-nous votre dossier.",
        body: "Notre équipe revient rapidement vers vous avec un premier cadrage du parcours.",
        whatsappAvailability: "Par email — contact@wamamed.com",
        assistantAria: "Assistant IA en direct",
        formAria: "Formulaire de contact et informations",
      },
    },
  },
  en: {
    skipToContent: "Skip to content",
    schemaDescription:
      "National and international medical coordination, based in Casablanca and designed for seamless cross-border care journeys.",
    header: {
      homeAria: "WaMa Med — Home",
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
        "International medical coordination, based in Casablanca and built for clear, premium care journeys.",
      servicesTitle: "Services",
      navigationTitle: "Navigation",
      contactTitle: "Contact",
      serviceLinks: [
        { href: "/services", label: "Care coordination" },
        { href: "/services", label: "Check-ups and prevention" },
        { href: "/services", label: "Coverage advisory" },
        { href: "/services", label: "Family support abroad" },
      ],
      navLinks: [
        { href: "/comment-ca-marche", label: "Our Process" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
      ],
      copyright: "All rights reserved.",
      availability: "Available 24/7",
      addressLines: ["5 Rue Molière", "Racine District", "Casablanca, Morocco"],
    },
    assistant: {
      headerTitle: "WaMa Med Assistant",
      availability: "Available 24/7",
      openAria: "Open the WaMa Med assistant",
      closeAria: "Close the assistant",
      label: "Talk now",
      tabAria: "Contact mode",
      tabs: { voice: "Voice", chat: "Chat" },
      greeting:
        "Hello! I'm the WaMa Med assistant. How can I help with your medical coordination today?",
      unavailable:
        "I can't connect right now. Please email us at contact@wamamed.com.",
      responseError:
        "I couldn't respond. Please try again.",
      sendError:
        "An error occurred. Please email us at contact@wamamed.com.",
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
          "Our assistant answers in French and English 24/7",
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
      aiSection: {
        badge: "Online · Replies instantly",
        heading: "Talk to our assistant now",
        description:
          "Available 24/7 · Replies instantly · French and English",
      },
      closingCta: {
        backgroundWord: "TOGETHER",
        eyebrow: "First step",
        titleStart: "You deserve",
        titleHighlight: "expert coordination.",
        body:
          "Share your situation. We come back quickly with a clear next step, a structured review, and coordination built around the patient.",
        primary: "Submit your case",
        secondary: "Email us",
        availability: "Professional contact: contact@wamamed.com",
      },
      apiErrors: {
        contactMissingFields: "Missing required fields",
        contactServiceUnavailable: "Email service not configured",
        contactSendError: "Send error",
        chatMissingParams: "Missing parameters",
        chatFallback: "I couldn't respond. Please try again.",
      },
      contactForm: {
        successTitle: "Case received.",
        successDescription:
          "Our team will contact you quickly with a clear first orientation.",
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
          "An error occurred. Please email us directly at contact@wamamed.com.",
        sending: "Sending...",
        submit: "Submit my case",
        footer:
          "Quick response · Confidential data · Human coordination",
      },
    },
    home: {
      metadata: {
        title: "WaMa Med — National and International Medical Coordination",
        description:
          "WaMa Med orchestrates national and international medical journeys with clear, human-centered coordination from first review through follow-up.",
      },
      hero: {
        ariaLabel: "WaMa Med — International medical coordination",
        eyebrow: "WaMa Med · Medical coordination",
        headline: "WaMa Med, medical coordination for patients and families",
        headlineLines: ["WaMa Med,", "medical coordination", "for patients and families"],
        supportingLine:
          "If you are ill, supporting a loved one, or planning prevention and check-ups, we organize the right medical, logistical, and human steps.",
        cta: "Submit your case",
      },
      trustStrip: {
        pillars: [
          { label: "Expert orientation" },
          { label: "Trusted network" },
          { label: "Total confidentiality" },
          { label: "24/7 availability" },
        ],
      },
      carePathway: {
        ariaLabel: "Care journey steps",
        eyebrow: "How it works",
        title: "A clear pathway, step by step.",
        intro:
          "Everything is visible from the start: we begin with your need, clarify priorities, then organize appointments, the stay, and follow-up.",
        cta: "Submit your case →",
        steps: [
          {
            number: "01",
            title: "Understand your situation",
            desc:
              "You share your request and useful documents. We identify the context, urgency, constraints, and priorities.",
          },
          {
            number: "02",
            title: "Prepare medical orientation",
            desc:
              "Your file is reviewed methodically to target the right specialists, suitable institutions, and the logical order of steps.",
          },
          {
            number: "03",
            title: "Organize appointments",
            desc:
              "We schedule consultations, exams, and the necessary medical exchanges to avoid unnecessary back-and-forth.",
          },
          {
            number: "04",
            title: "Support the stay",
            desc:
              "Transport, accommodation, documents, translation, and on-site or remote support are prepared around the medical schedule.",
          },
          {
            number: "05",
            title: "Keep follow-up clear",
            desc:
              "After the consultation or intervention, we help gather results, prepare the return, and keep the file organized.",
          },
        ],
        supportTitle: "What remains with you at every stage",
        supportItems: [
          {
            title: "One point of contact",
            desc:
              "Family, physicians, and institutions have one clear contact throughout the case.",
          },
          {
            title: "A reliable network",
            desc:
              "Specialists and partners are selected around the real medical need.",
          },
          {
            title: "A confidential framework",
            desc:
              "Health information is handled with discretion and care.",
          },
        ],
      },
      servicesOverview: {
        eyebrow: "How we help",
        title: "Essential services",
        cta: "See all our services →",
        services: [
          {
            title: "Surgical coordination",
            desc:
              "A precisely prepared pathway for demanding interventions and specialist-led treatment plans.",
            href: "/services",
          },
          {
            title: "Multilingual coordination",
            desc:
              "Smooth communication in French, English, and Arabic, with interpretation organized when needed.",
            href: "/services",
          },
          {
            title: "Complete logistics",
            desc:
              "Travel, accommodation, scheduling, and documentation aligned around the care plan.",
            href: "/services",
          },
          {
            title: "Post-operative follow-up",
            desc:
              "Clear continuity between treatment, recovery, and the return-home phase.",
            href: "/services",
          },
          {
            title: "Partner clinic network",
            desc:
              "Institutions selected for medical quality, operational reliability, and patient experience.",
            href: "/services",
          },
          {
            title: "Health assessments and check-ups",
            desc:
              "Clear organization for prevention, scheduled assessments, and screening pathways.",
            href: "/services",
          },
          {
            title: "Coverage advisory",
            desc:
              "Administrative support for exchanges with insurers, companies, and coverage organizations.",
            href: "/services",
          },
        ],
      },
      founderSection: {
        alt: "WaMa Med's founding team",
        badge: "Our story",
        intro:
          "A coordination structure for patients, relatives, and families who need one reliable point of reference.",
        eyebrow: "The promise",
        heading:
          "Built to make every care journey clearer, more human, and better coordinated.",
        quote:
          "\"The best coordination brings clarity before the first appointment even begins.\"",
        cite: "— WaMa Med",
        body:
          "WaMa Med was born from strong personal experiences lived by its founders alongside loved ones facing illness. That story became a simple method: listen to the person, clarify medical priorities, and coordinate each step with care.",
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
              "Share your medical situation through our secure form. We come back quickly with a first orientation.",
          },
          {
            number: "02",
            title: "Medical review",
            desc:
              "A coordinating physician reviews your file and designs a personalized orientation plan.",
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
        title: "A coordination framework",
        titleHighlight: " you can trust.",
        principles: [
          {
            title: "Structured methodology",
            desc:
              "Every case follows a clear, documented pathway from first review through follow-up.",
            icon: "01",
          },
          {
            title: "Established medical network",
            desc:
              "Direct collaboration with trusted physicians and facilities in Casablanca and across the country.",
            icon: "02",
          },
          {
            title: "International compliance",
            desc:
              "Case management aligned with the confidentiality and coordination standards expected for cross-border care.",
            icon: "03",
          },
        ],
      },
      contactSection: {
        eyebrow: "Let's connect",
        heading: "Let's talk about your situation.",
        supportingLine:
          "Tell us about your situation. We come back quickly with a clear next step and a structured view of the path ahead.",
        successTitle: "Case received.",
        successDescription:
          "Our team will contact you quickly.",
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
          "Quick response · Confidential data · Human coordination",
      },
    },
    about: {
      metadata: {
        title:
          "About — WaMa Med | International Medical Coordination",
        description:
          "The story behind WaMa Med: a company built to bring clarity, continuity, and expert coordination to national and international care journeys.",
      },
      hero: {
        eyebrow: "Our story",
        title: "Built to bring clarity and continuity to care journeys.",
      },
      founder: {
        alt: "WaMa Med's founding team",
        name: "The founding team",
        role: "WaMa Med founders",
        eyebrow: "The founders",
        storyEyebrow: "A personal story",
        quote:
          "Strong coordination is measured by the calm and clarity it creates around the patient.",
        cite: "WaMa Med",
        paragraphs: [
          "WaMa Med was born from two personal stories shaped by the illness of loved ones. Those experiences revealed the same need: clear, human, reliable coordination when medical decisions become complex.",
          "The founding team combines hands-on experience in care-path organization and relationships with healthcare institutions, long practice in coverage advisory, and on-the-ground support for patients and families.",
          "Today, WaMa Med puts that method into practice through a single point of coordination, structured decisions, and steady follow-through across every stage of care.",
        ],
        experience:
          "Coverage advisory, healthcare, family support, and care-path coordination",
      },
      credentials: [
        {
          title: "Advisory & healthcare",
          desc: "More than a decade of operational experience",
        },
        {
          title: "Complex cases",
          desc: "Handled with method and precision",
        },
        {
          title: "International reach",
          desc: "Europe, Africa, and cross-border pathways",
        },
      ],
      mission: {
        eyebrow: "Our mission",
        title:
          "Making medical coordination readable, human, and truly professional.",
        paragraphs: [
          "WaMa Med connects specialists, institutions, logistics, and families inside one coordinated framework. That consistency lets patients move forward with visibility and confidence.",
          "Based in Casablanca, the team manages local and international care journeys with the same standard: clarity, responsiveness, and continuity at every step.",
        ],
        alt: "Structured medical coordination by WaMa Med",
      },
      values: {
        eyebrow: "Our values",
        title: "What defines us.",
        items: [
          {
            title: "Single point of contact",
            desc:
              "One dedicated coordinator carries the case end to end to preserve consistency, fluency, and clear accountability.",
          },
          {
            title: "Absolute confidentiality",
            desc:
              "Your medical data is handled to the standard expected for sensitive and international care journeys.",
          },
          {
            title: "24/7 responsiveness",
            desc:
              "Availability keeps the case moving and ensures the next step remains fast, clear, and coordinated.",
          },
          {
            title: "International perspective",
            desc:
              "Each coordination adapts to your location, your timeline, and the realities of a cross-border care journey.",
          },
        ],
      },
    },
    servicesPage: {
      metadata: {
        title: "Services — Medical Coordination | WaMa Med",
        description:
          "Medical analysis, specialist orientation, check-ups, appointment coordination, logistics, coverage advisory, post-consultation follow-up, and medical evacuation.",
      },
      hero: {
        eyebrow: "Our Services",
        titleStart: "Complete coordination.",
        titleHighlight: "One coherent pathway.",
        body:
          "From the initial review to post-consultation follow-up, WaMa Med aligns every stage of the journey with structure, pace, and personalized attention.",
      },
      servicesAria: "Services overview",
      detailsAria: "Service details",
      services: [
        {
          number: "01",
          title: "Medical file review",
          desc:
            "We study your file in detail to point you toward the right specialists and clarify your next steps.",
          details: [
            "Complete review of the existing file",
            "Identification of the required specialists",
            "Personalized orientation plan",
            "Quick and actionable first response",
          ],
        },
        {
          number: "02",
          title: "Specialist orientation",
          desc:
            "We direct you to the specialists and institutions best suited to your clinical situation.",
          details: [
            "Verified specialist network",
            "Selection based on your pathology",
            "Reference institutions in Casablanca, Morocco, and internationally",
            "Priority appointment booking",
          ],
        },
        {
          number: "03",
          title: "Appointment coordination",
          desc:
            "WaMa Med synchronizes appointments, medical exchanges, and information flow around one coordinated plan.",
          details: [
            "Cross-specialty coordination",
            "Secure sharing of results",
            "Timeline and priority management",
            "Reminders and confirmations",
          ],
        },
        {
          number: "04",
          title: "Medical logistics",
          desc:
            "Travel, accommodation, language support, and documentation coordinated around the medical schedule.",
          details: [
            "Local transport: clinic, laboratory, hotel, and appointments",
            "Accommodation for the patient and companions",
            "Medical translation and interpretation",
            "Documents for your return home",
          ],
        },
        {
          number: "05",
          title: "Continuous support",
          desc:
            "Your coordinator follows the journey over time, from preparation through discharge and follow-up.",
          details: [
            "Presence at every consultation",
            "Post-operative follow-up",
            "Family communication",
            "Complete discharge file",
          ],
        },
        {
          number: "06",
          title: "Coverage advisory and medical evacuation",
          desc:
            "Structured organization for coverage support, insurer exchanges, and medical transfers when needed.",
          details: [
            "24/7 emergency coordination",
            "National medical transport",
            "International evacuations",
            "Coordination with insurers and coverage organizations",
          ],
        },
      ],
      featured: [
        {
          title: "Medical file review",
          desc:
            "Your situation receives a thorough review from a coordinating physician in order to define the right priorities, required expertise, and the most relevant pathway forward.",
          details: [
            "Complete review of the existing file",
            "Identification of the required specialists",
            "Personalized orientation plan",
            "Quick and actionable first response",
          ],
          image: "/images/wama-coordination-medecin.jpg",
          alt: "WaMa Med coordinating physician reviewing a medical file",
        },
        {
          title: "Specialist orientation",
          desc:
            "Through an established network of trusted institutions, we guide you to the specialists most appropriate for your clinical situation.",
          details: [
            "Verified specialist network",
            "Selection based on your pathology",
            "Reference institutions in Casablanca, Morocco, and internationally",
            "Priority appointment booking",
          ],
          image: "/images/wama-orientation-specialisee.jpg",
          alt: "Specialized medical coordination and orientation — WaMa Med",
        },
        {
          title: "Medical logistics",
          desc:
            "For patients in Morocco, patients traveling from abroad, or families coordinating from a distance, we organize logistics around the clinical schedule.",
          details: [
            "Local transport: clinic, laboratory, hotel, and appointments",
            "Accommodation for the patient and companions",
            "Medical translation and interpretation",
            "Documents for your return home",
          ],
          image: "/images/wama-patient-international.jpg",
          alt: "International patient support from the WaMa Med team",
        },
      ],
    },
    approach: {
      metadata: {
        title: "Our Process — Coordination Protocol | WaMa Med",
        description:
          "The WaMa Med medical coordination protocol: from case submission to post-consultation follow-up, structured in 4 steps.",
      },
      hero: {
        eyebrow: "Our Process",
        titleStart: "A structured protocol,",
        titleHighlight: "in 4 steps.",
        body:
          "Each step provides visibility, a clearly identified owner, and continuous coordination around your case.",
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
          duration: "Quick",
          durationLabel: "First response",
          desc:
            "Share your medical situation through our secure form or by email. Include every medical document you have available: test results, reports, prescriptions.",
          details: [
            "Simple and secure online form",
            "Professional contact by email",
            "Quick first response",
            "No prepayment at this stage",
          ],
          callout:
            "Every case begins with a careful reading of your context, priorities, and timeline.",
        },
        {
          number: "02",
          title: "Medical review by your coordinator",
          duration: "Structured",
          durationLabel: "Orientation plan",
          desc:
            "A coordinating physician reviews your file in depth and prepares a personalized orientation plan: which specialists to consult first, in which institution, and in what order.",
          details: [
            "Review by a qualified coordinating physician",
            "Identification of required specialists",
            "Selection of the best institutions",
            "Clear and prioritized action plan",
          ],
          callout:
            "Your orientation plan is built to be immediately useful, readable, and actionable.",
        },
        {
          number: "03",
          title: "Complete coordination — everything moves in the same direction",
          duration: "Ongoing",
          durationLabel: "Support",
          desc:
            "WaMa Med handles the full operational coordination: appointment booking, specialist communication, result sharing, local transport, and accommodation when needed.",
          details: [
            "Appointments booked on your behalf",
            "Direct communication between specialists",
            "Adapted logistics (transport, accommodation)",
            "In-person or remote support depending on your case",
          ],
          callout:
            "You keep your energy for health. We keep the pathway organized.",
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
            "The pathway remains coherent through the final step, including after the main intervention.",
        },
      ],
      faqs: [
        {
          q: "How much does the service cost?",
          a: "Our fees depend on the complexity of the case and the services required. Contact us for a personalized quote — the initial review consultation is non-binding.",
        },
        {
          q: "Is WaMa Med a medical practice?",
          a: "No. We are a medical coordination service — we organize, orient, and support, but we do not deliver medical treatment. Your care remains in the hands of the specialists we coordinate.",
        },
        {
          q: "Can I use WaMa Med for a loved one in Morocco while I am abroad?",
          a: "Absolutely. That is one of our core services. We act as your representative on the ground — with the medical and administrative expertise to manage the entire case.",
        },
        {
          q: "Which countries do you support patients from?",
          a: "We support patients in Morocco, Africa, Europe, and a range of international contexts. Our team coordinates in French, English, and Arabic; an interpreter can be organized for other languages.",
        },
        {
          q: "How long does a typical case take?",
          a: "It depends on the situation. A single consultation can often be coordinated quickly. A complex multi-specialist pathway can extend over several weeks. We provide an estimate from the initial review stage.",
        },
      ],
    },
    contactPage: {
      metadata: {
        title: "Contact — Submit your medical file | WaMa Med",
        description:
          "Submit your medical file to WaMa Med. Quick response and human coordination for national and international care journeys.",
      },
      hero: {
        badge: "Professional contact · Quick response",
        eyebrow: "Contact",
        titleStart: "Let's define your",
        titleHighlight: "next step.",
        body:
          "Share your situation. Our team replies quickly with a clear response and a concrete next step.",
      },
      formSection: {
        eyebrow: "Contact form",
        title: "Submit your case.",
        body: "Our team replies quickly with an initial view of the path ahead.",
        whatsappAvailability: "Email contact — contact@wamamed.com",
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
