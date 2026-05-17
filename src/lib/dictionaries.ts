import { Locale } from "@/lib/i18n";

const dictionaries = {
  fr: {
    skipToContent: "Aller au contenu principal",
    schemaDescription:
      "Coordination médicale, basée à Casablanca, pour des parcours de soins fluides — au Maroc comme à l'international.",
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
        "Coordination médicale internationale. Une équipe basée à Casablanca, au service de parcours de soins clairs, exigeants et continus.",
      servicesTitle: "Services",
      navigationTitle: "Navigation",
      contactTitle: "Contact",
      serviceLinks: [
        { href: "/services", label: "Coordination de parcours" },
        { href: "/services", label: "Bilans et prévention" },
        { href: "/services", label: "Conseil en prises en charge" },
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
        "Bonjour. Je suis l'assistant WaMa Med — en quoi puis-je vous être utile aujourd'hui pour votre coordination médicale ?",
      unavailable:
        "La connexion est indisponible pour le moment. Écrivez-nous à contact@wamamed.com.",
      responseError:
        "La réponse n'a pas pu aboutir. Réessayez dans un instant.",
      sendError:
        "Un incident technique est survenu. Écrivez-nous à contact@wamamed.com.",
      emptyChat:
        "Posez votre question sur la coordination médicale — nous vous répondons.",
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
          "Partagez-nous votre situation. Nous revenons vers vous rapidement avec une étape suivante claire, une première analyse structurée de votre dossier et une coordination construite autour du patient.",
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
          "Réponse rapide · Confidentialité préservée · Coordination humaine",
      },
    },
    home: {
      metadata: {
        title: "WaMa Med — Coordination médicale nationale et internationale",
        description:
          "WaMa Med orchestre vos parcours de soins, au Maroc comme à l'international, avec une coordination claire, humaine et rigoureuse — de la première analyse au suivi.",
      },
      hero: {
        ariaLabel: "WaMa Med — Coordination médicale internationale",
        eyebrow: "WaMa Med · Coordination médicale",
        headline: "WaMa Med — la coordination médicale qui vous accompagne",
        headlineLines: ["WaMa Med —", "la coordination médicale", "qui vous accompagne"],
        supportingLine:
          "Que vous soyez en parcours de soins, que vous accompagniez un proche ou que vous prépariez un bilan de santé, nous orchestrons chaque étape — médicale, logistique et humaine.",
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
      scrollJourney: {
        ariaLabel: "Notre approche",
        cta: "Confier votre dossier →",
        acts: [
          {
            id: 1,
            label: "L'orientation",
            bg: "#1A2E40",
            headline:
              "Chaque parcours commence par une compréhension précise de votre situation.",
            subtext:
              "Vos priorités cliniques, votre calendrier et votre contexte sont posés clairement dès le premier échange.",
            textColor: "#F5F0E8",
          },
          {
            id: 2,
            label: "Le réseau",
            bg: "#1A3E48",
            headline: "Les bons spécialistes. Les bons établissements. Au bon moment.",
            subtext: "Un réseau de partenaires sélectionnés selon votre besoin médical et le rythme du parcours.",
            textColor: "#F5F0E8",
          },
          {
            id: 3,
            label: "La coordination",
            bg: "#173540",
            headline: "Un parcours fluide, du premier échange jusqu'au retour.",
            steps: ["Analyse", "Orientation", "Rendez-vous", "Séjour", "Suivi"],
            textColor: "#F5F0E8",
          },
          {
            id: 4,
            label: "Nos engagements",
            bg: "#1A2E40",
            headline: "Ce qui vous accompagne à chaque étape",
            commitments: [
              {
                title: "Méthode clinique",
                desc:
                  "Chaque dossier suit une séquence claire, avec des décisions documentées et un cap qui ne se perd pas.",
              },
              {
                title: "Communication continue",
                desc:
                  "Un interlocuteur unique fait le lien entre la famille, les médecins et les établissements.",
              },
              {
                title: "Confidentialité internationale",
                desc:
                  "Vos informations médicales sont traitées au niveau d'exigence requis pour un parcours transfrontalier.",
              },
            ],
            textColor: "#F5F0E8",
          },
          {
            id: 5,
            label: "Le départ",
            bg: "#1A2E40",
            headline: "Prêt à démarrer un parcours plus clair ?",
            subtext: "Nous sommes là pour vous accompagner.",
            textColor: "#C9A84C",
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
              "Des établissements choisis pour la qualité médicale, l'organisation et la fiabilité des équipes.",
            href: "/services",
          },
          {
            title: "Conseil en prises en charge",
            desc:
              "Un appui clair dans vos échanges avec les assureurs, les entreprises et les organismes de couverture.",
            href: "/services",
          },
          {
            title: "Organisation du séjour médical",
            desc:
              "Transport, hébergement, calendrier médical et documents sont préparés autour de votre parcours de soins.",
            href: "/services",
          },
          {
            title: "Accompagnement multilingue",
            desc:
              "Des échanges facilités en français, en anglais et en arabe ; interprétariat possible selon la situation.",
            href: "/services",
          },
          {
            title: "Parcours chirurgical",
            desc:
              "Une préparation rigoureuse pour les interventions et les prises en charge spécialisées les plus exigeantes.",
            href: "/services",
          },
          {
            title: "Suivi post-opératoire",
            desc:
              "Un suivi lisible après l'intervention, de la récupération jusqu'au retour à la maison.",
            href: "/services",
          },
        ],
      },
      founderSection: {
        alt: "L'équipe fondatrice de WaMa Med",
        badge: "Notre histoire",
        intro:
          "Une structure de coordination pensée pour les patients, leurs proches et leurs familles, lorsqu'ils ont besoin d'un repère fiable.",
        eyebrow: "La promesse",
        heading:
          "Pensé pour rendre chaque parcours plus lisible, plus humain et mieux coordonné.",
        quote:
          "\"Une bonne coordination apporte de la clarté avant même le premier rendez-vous.\"",
        cite: "— WaMa Med",
        body:
          "WaMa Med est né d'expériences personnelles : la maladie d'un proche, des rendez-vous éparpillés, des décisions à prendre vite et bien. Cette histoire a donné naissance à une méthode simple : écouter la personne, clarifier les priorités médicales, et coordonner chaque étape avec attention.",
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
              "Un médecin coordinateur établit un plan d'orientation personnalisé, immédiatement exploitable.",
          },
          {
            number: "03",
            title: "Coordination complète",
            desc:
              "Rendez-vous, échanges entre spécialistes, logistique et suivi avancent dans le même sens, autour d'un même plan.",
          },
          {
            number: "04",
            title: "Accompagnement post-consultation",
            desc:
              "Résultats, suites de soins et documentation continuent d'être coordonnés jusqu'à la fin du parcours.",
          },
        ],
        cta: "Découvrir notre protocole complet",
      },
      testimonials: {
        eyebrow: "Nos engagements",
        title: "Un cadre de coordination",
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
              "Un traitement des dossiers aligné sur les exigences de confidentialité et de coordination des parcours internationaux.",
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
          "Réponse rapide · Confidentialité préservée · Coordination humaine",
      },
    },
    about: {
      metadata: {
        title:
          "À propos — WaMa Med | Coordination médicale internationale",
        description:
          "L'histoire de WaMa Med : une entreprise pensée pour apporter clarté, continuité et coordination experte à chaque parcours médical, au Maroc comme à l'international.",
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
          "Une bonne coordination se mesure à la sérénité qu'elle installe autour du patient.",
        cite: "WaMa Med",
        paragraphs: [
          "WaMa Med est né de deux histoires personnelles, l'une comme l'autre marquées par la maladie d'un proche. Elles ont mis au jour le même besoin : une coordination claire, humaine et fiable, lorsque les décisions médicales deviennent complexes.",
          "L'équipe fondatrice combine plusieurs expertises : organisation de parcours et relation directe avec les établissements de santé, conseil en prises en charge, accompagnement de terrain auprès des patients et des familles.",
          "Aujourd'hui, WaMa Med met cette méthode au service des patients et de leurs proches : un interlocuteur unique, des décisions structurées et un suivi continu à chaque étape.",
        ],
        experience:
          "Conseil en prises en charge, accompagnement des familles et coordination de parcours",
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
          "Rendre la coordination médicale lisible, humaine et résolument professionnelle.",
        paragraphs: [
          "WaMa Med relie les spécialistes, les établissements, la logistique et les familles dans un même cadre de travail. Cette cohérence permet au patient d'avancer avec visibilité et confiance.",
          "Basée à Casablanca, notre équipe coordonne les parcours locaux comme internationaux avec la même exigence : clarté, réactivité et continuité, à chaque étape.",
        ],
        alt: "Coordination médicale structurée par WaMa Med",
      },
      values: {
        eyebrow: "Nos valeurs",
        title: "Ce qui nous définit.",
        items: [
          {
            title: "Un interlocuteur unique",
            desc:
              "Un coordinateur dédié porte le dossier de bout en bout — pour garantir la cohérence, la fluidité et une responsabilité claire.",
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
              "Chaque coordination s'adapte à votre localisation, à votre calendrier et à la réalité d'un parcours de soins transfrontalier.",
          },
        ],
      },
    },
    servicesPage: {
      metadata: {
        title: "Nos services — Coordination médicale | WaMa Med",
        description:
          "Analyse médicale, orientation spécialisée, bilans de santé, coordination des rendez-vous, logistique, conseil en prises en charge, accompagnement post-consultation et évacuation sanitaire.",
      },
      hero: {
        eyebrow: "Nos services",
        titleStart: "Une coordination complète.",
        titleHighlight: "Une même trajectoire.",
        body:
          "De la première analyse au suivi post-consultation, WaMa Med aligne chaque étape du parcours avec méthode, rythme et attention personnalisée.",
      },
      servicesAria: "Aperçu des services",
      detailsAria: "Services en détail",
      services: [
        {
          number: "01",
          title: "Analyse du dossier médical",
          desc:
            "Nous étudions votre dossier en détail pour vous orienter vers les bons spécialistes et clarifier les étapes à venir.",
          details: [
            "Lecture complète du dossier existant",
            "Identification des spécialistes nécessaires",
            "Plan d'orientation personnalisé",
            "Premier retour rapide et exploitable",
          ],
        },
        {
          number: "02",
          title: "Orientation spécialisée",
          desc:
            "Nous vous orientons vers les spécialistes et les établissements les plus pertinents pour votre situation clinique.",
          details: [
            "Réseau de spécialistes vérifiés",
            "Sélection adaptée à votre pathologie",
            "Établissements de référence à Casablanca, au Maroc et à l'international",
            "Prise de rendez-vous prioritaire",
          ],
        },
        {
          number: "03",
          title: "Coordination des rendez-vous",
          desc:
            "WaMa Med synchronise les rendez-vous, les échanges entre praticiens et le partage d'informations autour d'un même plan de prise en charge.",
          details: [
            "Coordination entre les spécialistes",
            "Partage sécurisé des résultats",
            "Gestion des délais et des priorités",
            "Rappels et confirmations",
          ],
        },
        {
          number: "04",
          title: "Logistique médicale",
          desc:
            "Déplacements, hébergement, accompagnement linguistique et documents s'organisent autour du parcours de soins.",
          details: [
            "Transport local : clinique, laboratoire, hôtel, rendez-vous",
            "Hébergement du patient et des accompagnants",
            "Traduction et interprétariat médical",
            "Documents médicaux pour le retour à la maison",
          ],
        },
        {
          number: "05",
          title: "Accompagnement dans la durée",
          desc:
            "Votre coordinateur suit le parcours sur le temps long — de la préparation à la sortie, puis au suivi.",
          details: [
            "Présence à chaque consultation",
            "Suivi post-opératoire",
            "Communication régulière avec la famille",
            "Dossier de sortie complet",
          ],
        },
        {
          number: "06",
          title: "Conseil en prises en charge et évacuation sanitaire",
          desc:
            "Une organisation structurée pour les prises en charge, les échanges avec les assureurs et les transferts médicaux lorsqu'ils sont nécessaires.",
          details: [
            "Coordination d'urgence 24h/24",
            "Transport médicalisé sur le territoire national",
            "Évacuations internationales",
            "Liaison avec les assureurs et les organismes de couverture",
          ],
        },
      ],
      featured: [
        {
          title: "Analyse du dossier médical",
          desc:
            "Votre situation est étudiée en profondeur par un médecin coordinateur, qui définit les priorités, les expertises à mobiliser et la trajectoire la plus pertinente.",
          details: [
            "Lecture complète du dossier existant",
            "Identification des spécialistes nécessaires",
            "Plan d'orientation personnalisé",
            "Premier retour rapide et exploitable",
          ],
          image: "/images/wama-coordination-medecin.jpg",
          alt: "Médecin coordinateur WaMa Med analysant un dossier médical",
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
          alt: "Coordination et orientation médicale spécialisée — WaMa Med",
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
        title: "Notre approche — Protocole de coordination | WaMa Med",
        description:
          "Le protocole de coordination médicale WaMa Med : de la première analyse de votre dossier au suivi post-consultation, structuré en 4 étapes.",
      },
      hero: {
        eyebrow: "Notre approche",
        titleStart: "Un protocole structuré,",
        titleHighlight: "en 4 étapes.",
        body:
          "Chaque étape apporte de la visibilité, un responsable clairement identifié et une coordination continue autour de votre dossier.",
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
          title: "Analyse médicale par votre coordinateur",
          duration: "Structuré",
          durationLabel: "Plan d'orientation",
          desc:
            "Un médecin coordinateur étudie votre dossier en profondeur et établit un plan d'orientation personnalisé : quels spécialistes consulter en priorité, dans quel établissement, dans quel ordre.",
          details: [
            "Lecture par un médecin coordinateur qualifié",
            "Identification des spécialistes nécessaires",
            "Sélection des établissements les mieux adaptés",
            "Plan d'action clair et hiérarchisé",
          ],
          callout:
            "Votre plan d'orientation est pensé pour être immédiatement utile, lisible et exploitable.",
        },
        {
          number: "03",
          title: "Coordination complète — tout avance dans le même sens",
          duration: "Continu",
          durationLabel: "Accompagnement",
          desc:
            "WaMa Med prend en charge toute la coordination opérationnelle : prise de rendez-vous, communication entre spécialistes, partage des résultats, transport local et hébergement si nécessaire.",
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
            "Notre mission ne s'arrête pas à la consultation. Suivi post-opératoire, coordination du retour à domicile ou du rapatriement, dossier de sortie complet pour votre médecin référent.",
          details: [
            "Suivi post-consultation et post-opératoire",
            "Coordination du retour à la maison ou du rapatriement",
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
          a: "Non. WaMa Med est un service de coordination médicale : nous organisons, nous orientons, nous accompagnons, mais nous ne prodiguons pas de soins. Votre traitement reste entre les mains des spécialistes que nous coordonnons.",
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
          a: "Cela dépend de la situation. Une consultation isolée peut souvent être coordonnée en quelques jours. Un parcours pluridisciplinaire plus complexe peut s'étendre sur plusieurs semaines. Nous vous donnons une estimation dès la première analyse.",
        },
      ],
    },
    contactPage: {
      metadata: {
        title: "Contact — Confier votre dossier médical | WaMa Med",
        description:
          "Confiez-nous votre dossier médical. Réponse rapide et coordination humaine pour des parcours de soins, au Maroc comme à l'international.",
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
      scrollJourney: {
        ariaLabel: "Our approach",
        cta: "Submit your case →",
        acts: [
          {
            id: 1,
            label: "Orientation",
            bg: "#1A2E40",
            headline:
              "Every care journey starts with a clear reading of your situation.",
            subtext:
              "Clinical priorities, timeline, and family context are structured from the very beginning.",
            textColor: "#F5F0E8",
          },
          {
            id: 2,
            label: "Network",
            bg: "#1A3E48",
            headline: "The right specialists. The right institutions. At the right moment.",
            subtext: "A qualified network selected around your medical need and pace of care.",
            textColor: "#F5F0E8",
          },
          {
            id: 3,
            label: "Coordination",
            bg: "#173540",
            headline: "A seamless pathway from first contact to return.",
            steps: ["Review", "Orientation", "Appointments", "Stay", "Follow-up"],
            textColor: "#F5F0E8",
          },
          {
            id: 4,
            label: "Standards",
            bg: "#1A2E40",
            headline: "What stays with you at every stage",
            commitments: [
              {
                title: "Clinical method",
                desc:
                  "Every case follows a documented sequence with a clear direction and accountable decisions.",
              },
              {
                title: "Continuous communication",
                desc:
                  "One point of contact keeps patients, families, physicians, and facilities aligned.",
              },
              {
                title: "International confidentiality",
                desc:
                  "Your medical information is handled to the level expected for cross-border care coordination.",
              },
            ],
            textColor: "#F5F0E8",
          },
          {
            id: 5,
            label: "Start",
            bg: "#1A2E40",
            headline: "Ready to begin with more clarity?",
            subtext: "We are ready to guide the next step.",
            textColor: "#C9A84C",
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
