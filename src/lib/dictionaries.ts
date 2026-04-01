import { Locale } from "@/lib/i18n";

const dictionaries = {
  fr: {
    skipToContent: "Aller au contenu principal",
    schemaDescription:
      "Coordination médicale nationale et internationale, basée à Casablanca et pensée pour des parcours de soins sans frontières.",
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
        "Coordination médicale internationale, structurée à Casablanca pour des parcours de soins fluides et exigeants.",
      servicesTitle: "Services",
      navigationTitle: "Navigation",
      contactTitle: "Contact",
      serviceLinks: [
        { href: "/services", label: "Coordination de parcours" },
        { href: "/services", label: "Patients internationaux" },
        { href: "/services", label: "Accompagnement familial à distance" },
        { href: "/services", label: "Évacuations médicales" },
      ],
      navLinks: [
        { href: "/comment-ca-marche", label: "Notre Approche" },
        { href: "/about", label: "À Propos" },
        { href: "/contact", label: "Contact" },
      ],
      whatsapp: "WhatsApp",
      demoCtaLabel: "Voir la démo Mission Control",
      demoCtaAria: "Ouvrir la démo Mission Control",
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
          "Notre assistant répond en français et en anglais 24h/24",
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
          "Disponible 24h/24 · Répond immédiatement · Français et anglais",
      },
      closingCta: {
        backgroundWord: "ENSEMBLE",
        eyebrow: "Première étape",
        titleStart: "Votre dossier mérite",
        titleHighlight: "une coordination experte.",
        body:
          "Partagez votre situation. Nous revenons vers vous sous 2 heures avec une prochaine étape claire, une lecture structurée du dossier et une coordination pensée pour les parcours internationaux.",
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
          "Wama Med orchestre des parcours médicaux nationaux et internationaux avec une coordination claire, humaine et rigoureuse, de l'analyse initiale au suivi.",
      },
      hero: {
        ariaLabel: "Wama Med — Coordination médicale internationale",
        eyebrow: "Coordination médicale internationale",
        headline: "Une coordination médicale pensée pour avancer avec confiance",
        supportingLine:
          "Une équipe unique pour organiser spécialistes, logistique et continuité de soins avec méthode et sérénité.",
        cta: "Soumettre votre dossier",
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
        cta: "Soumettre votre dossier →",
        acts: [
          {
            id: 1,
            label: "L'orientation",
            bg: "#1A2E40",
            headline:
              "Chaque parcours commence par une lecture claire de votre situation.",
            subtext:
              "Vos priorités cliniques, votre calendrier et votre contexte sont structurés dès le départ.",
            textColor: "#F5F0E8",
          },
          {
            id: 2,
            label: "Le réseau",
            bg: "#1A3E48",
            headline: "Les bons spécialistes. Les bons établissements. Au bon moment.",
            subtext: "Un réseau qualifié sélectionné selon votre besoin médical et votre rythme.",
            textColor: "#F5F0E8",
          },
          {
            id: 3,
            label: "La coordination",
            bg: "#173540",
            headline: "Un parcours fluide, du premier échange au retour.",
            steps: ["Analyse", "Orientation", "Rendez-vous", "Séjour", "Suivi"],
            textColor: "#F5F0E8",
          },
          {
            id: 4,
            label: "Les standards",
            bg: "#1A2E40",
            headline: "Ce qui vous accompagne à chaque étape",
            commitments: [
              {
                title: "Méthode clinique",
                desc:
                  "Chaque dossier suit une séquence claire, avec des décisions documentées et un cap précis.",
              },
              {
                title: "Communication continue",
                desc:
                  "Un interlocuteur unique coordonne les échanges entre la famille, les médecins et les établissements.",
              },
              {
                title: "Confidentialité internationale",
                desc:
                  "Vos informations médicales sont traitées avec les standards attendus pour un parcours transfrontalier.",
              },
            ],
            textColor: "#F5F0E8",
          },
          {
            id: 5,
            label: "Le départ",
            bg: "#1A2E40",
            headline: "Prêt à lancer un parcours plus clair ?",
            subtext: "Nous sommes prêts à vous guider.",
            textColor: "#C9A84C",
          },
        ],
      },
      servicesOverview: {
        eyebrow: "Notre accompagnement",
        title: "Services essentiels",
        cta: "Voir tous nos services →",
        services: [
          {
            title: "Coordination chirurgicale",
            desc:
              "Un parcours préparé avec précision pour les interventions et prises en charge spécialisées les plus exigeantes.",
            href: "/services",
          },
          {
            title: "Coordination multilingue",
            desc:
              "Des échanges fluides en français et en anglais à chaque étape du parcours.",
            href: "/services",
          },
          {
            title: "Logistique complète",
            desc:
              "Déplacements, hébergement, calendrier médical et documents coordonnés autour de votre prise en charge.",
            href: "/services",
          },
          {
            title: "Suivi post-opératoire",
            desc:
              "Une continuité de soins claire entre l'intervention, la récupération et le retour.",
            href: "/services",
          },
          {
            title: "Réseau de cliniques partenaires",
            desc:
              "Des établissements sélectionnés pour la qualité médicale, l'organisation et la fiabilité des équipes.",
            href: "/services",
          },
          {
            title: "Consultations à distance",
            desc:
              "Un premier cadrage médical et opérationnel avant même le déplacement.",
            href: "/services",
          },
        ],
      },
      founderSection: {
        alt: "Driss Benwahoud, fondateur de Wama Med",
        badge: "Fondateur & Directeur",
        eyebrow: "La promesse",
        heading:
          "Construit pour rendre chaque parcours plus lisible, plus humain et mieux coordonné.",
        quote:
          "\"La bonne coordination apporte de la clarté avant même le premier rendez-vous.\"",
        cite: "— Driss Benwahoud, Fondateur",
        body:
          "Driss Benwahoud a fondé Wama Med pour donner aux patients et à leurs proches un cadre de coordination professionnel, lisible et rassurant. Avec plus de dix ans d'expérience dans l'assurance et la gestion de parcours, il a conçu un service qui relie les bonnes expertises au bon moment, sans friction inutile.",
        cta: "Découvrir notre histoire",
      },
      processPreview: {
        eyebrow: "Notre Approche",
        titleStart: "Un protocole clair,",
        titleHighlight: "en 4 étapes.",
        steps: [
          {
            number: "01",
            title: "Soumettez votre dossier",
            desc:
              "Partagez votre situation via notre formulaire sécurisé ou par WhatsApp. Premier retour sous 2 heures.",
          },
          {
            number: "02",
            title: "Analyse médicale",
            desc:
              "Notre médecin coordinateur construit un plan d'orientation personnalisé et immédiatement exploitable.",
          },
          {
            number: "03",
            title: "Coordination complète",
            desc:
              "Rendez-vous, échanges entre spécialistes, logistique et suivi sont alignés autour d'un même plan.",
          },
          {
            number: "04",
            title: "Accompagnement post-consultation",
            desc:
              "Résultats, suites de soins et documentation sont coordonnés jusqu'à la fin du parcours.",
          },
        ],
        cta: "Découvrir notre protocole complet",
      },
      testimonials: {
        eyebrow: "Nos engagements",
        title: "Un cadre de coordination",
        titleHighlight: " fiable.",
        principles: [
          {
            title: "Méthodologie structurée",
            desc:
              "Chaque dossier suit une trajectoire claire, documentée et pilotée avec exigence du premier échange au suivi.",
            icon: "01",
          },
          {
            title: "Réseau médical établi",
            desc:
              "Collaboration directe avec des médecins référents et des établissements de confiance à Casablanca et à l'échelle nationale.",
            icon: "02",
          },
          {
            title: "Conformité internationale",
            desc:
              "Traitement des dossiers conforme aux exigences de confidentialité et de coordination attendues pour des parcours internationaux.",
            icon: "03",
          },
        ],
      },
      contactSection: {
        eyebrow: "Prenons contact",
        heading: "Parlons de votre dossier.",
        supportingLine:
          "Expliquez-nous votre situation. Nous revenons vers vous rapidement avec une prochaine étape claire.",
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
          "À Propos — Driss Benwahoud & Wama Med | Coordination Médicale Internationale",
        description:
          "L'histoire de Wama Med : une entreprise construite pour apporter clarté, continuité et coordination experte aux parcours médicaux nationaux et internationaux.",
      },
      hero: {
        eyebrow: "Notre histoire",
        title: "Une entreprise née pour apporter clarté et continuité.",
      },
      founder: {
        alt: "Driss Benwahoud, fondateur et directeur de Wama Med",
        name: "Driss Benwahoud",
        role: "Fondateur & Directeur — Wama Med",
        eyebrow: "Le fondateur",
        quote:
          "Une bonne coordination se mesure à la sérénité qu'elle crée autour du patient.",
        cite: "Driss Benwahoud, Fondateur",
        paragraphs: [
          "Driss Benwahoud a imaginé Wama Med comme une structure capable d'apporter une vision d'ensemble à des parcours médicaux souvent complexes, sensibles et internationaux.",
          "Fort de plus de dix ans d'expérience dans l'assurance, l'organisation de parcours et la relation avec les établissements de santé, il a construit une méthode qui combine lecture clinique, coordination opérationnelle et qualité d'exécution.",
          "Aujourd'hui, Wama Med met cette méthode au service des patients et de leurs proches : un interlocuteur unique, des décisions structurées et une continuité de suivi à chaque étape.",
        ],
        experience:
          "10+ ans en assurance, santé et coordination de parcours",
      },
      credentials: [
        {
          title: "Assurance & santé",
          desc: "Plus de dix ans d'expérience opérationnelle",
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
          "Rendre la coordination médicale lisible, humaine et professionnelle.",
        paragraphs: [
          "Wama Med relie les spécialistes, les établissements, la logistique et les familles dans un même cadre de travail. Cette cohérence permet au patient d'avancer avec visibilité et confiance.",
          "Basée à Casablanca, l'équipe coordonne des parcours locaux et internationaux avec la même exigence : clarté, réactivité et continuité à chaque étape.",
        ],
        alt: "Coordination médicale structurée par Wama Med",
      },
      values: {
        eyebrow: "Nos valeurs",
        title: "Ce qui nous définit.",
        items: [
          {
            title: "Interlocuteur unique",
            desc:
              "Un coordinateur dédié porte le dossier de bout en bout pour garantir cohérence, fluidité et responsabilité claire.",
          },
          {
            title: "Confidentialité absolue",
            desc:
              "Vos données médicales sont traitées avec les standards de confidentialité attendus pour des parcours sensibles et internationaux.",
          },
          {
            title: "Réactivité 24h/24",
            desc:
              "La disponibilité de l'équipe permet de garder le rythme du dossier et d'assurer des prochaines étapes rapides et lisibles.",
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
        title: "Nos Services — Coordination Médicale | Wama Med",
        description:
          "Analyse de dossier, orientation spécialisée, coordination de rendez-vous, logistique internationale, accompagnement post-consultation et évacuation sanitaire.",
      },
      hero: {
        eyebrow: "Nos Services",
        titleStart: "Coordination complète.",
        titleHighlight: "Une même trajectoire.",
        body:
          "De l'analyse initiale au suivi post-consultation, Wama Med aligne chaque étape du parcours avec méthode, rythme et continuité.",
      },
      servicesAria: "Aperçu des services",
      detailsAria: "Services en détail",
      services: [
        {
          number: "01",
          title: "Analyse de dossier médical",
          desc:
            "Une revue structurée du dossier pour définir une orientation exploitable, priorisée et cohérente.",
          details: [
            "Lecture complète du dossier existant",
            "Identification des spécialistes requis",
            "Plan d'orientation personnalisé",
            "Premier retour sous 2 heures",
          ],
        },
        {
          number: "02",
          title: "Orientation spécialisée",
          desc:
            "Nous vous orientons vers les spécialistes et établissements les plus pertinents pour votre situation clinique.",
          details: [
            "Réseau de spécialistes vérifiés",
            "Sélection basée sur votre pathologie",
            "Établissements de référence à Casablanca et à l'échelle nationale",
            "Prise de rendez-vous prioritaire",
          ],
        },
        {
          number: "03",
          title: "Coordination des rendez-vous",
          desc:
            "Wama Med synchronise les rendez-vous, les échanges médicaux et le partage d'information autour du même plan.",
          details: [
            "Coordination inter-spécialistes",
            "Partage sécurisé des résultats",
            "Gestion des délais et priorités",
            "Rappels et confirmations",
          ],
        },
        {
          number: "04",
          title: "Logistique internationale",
          desc:
            "Déplacements, hébergement, accompagnement linguistique et documents sont coordonnés autour du parcours de soins.",
          details: [
            "Transfert aéroport — hôpital",
            "Hébergement à proximité des cliniques",
            "Traduction et interprétariat médical",
            "Documents médicaux pour le retour",
          ],
        },
        {
          number: "05",
          title: "Accompagnement continu",
          desc:
            "Votre coordinateur suit le parcours dans la durée, de la préparation à la sortie puis au suivi.",
          details: [
            "Présence à toutes les consultations",
            "Suivi post-opératoire",
            "Communication avec la famille",
            "Dossier de sortie complet",
          ],
        },
        {
          number: "06",
          title: "Évacuation sanitaire",
          desc:
            "Une organisation rapide et structurée pour les transferts médicaux urgents, nationaux ou internationaux.",
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
            "Votre dossier bénéficie d'une revue approfondie par notre médecin coordinateur afin de définir les bonnes priorités, les expertises requises et la trajectoire la plus pertinente.",
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
            "Grâce à un réseau de partenaires établis dans des établissements de référence, nous vous orientons vers les spécialistes les plus adaptés à votre situation clinique.",
          details: [
            "Réseau de spécialistes vérifiés",
            "Sélection basée sur votre pathologie",
            "Établissements de référence à Casablanca et au niveau national",
            "Prise de rendez-vous prioritaire",
          ],
          image: "/images/wama-orientation-specialisee.jpg",
          alt: "Coordination et orientation médicale spécialisée — Wama Med",
        },
        {
          title: "Logistique internationale",
          desc:
            "Pour les patients venant de l'étranger, nous organisons le séjour médical avec une logistique alignée sur le calendrier clinique et les besoins de suivi.",
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
          "Chaque étape donne de la visibilité, un responsable identifié et une coordination continue autour de votre dossier.",
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
            "Chaque dossier démarre par une lecture attentive de votre contexte, de vos priorités et de votre calendrier.",
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
            "Votre plan d'orientation est pensé pour être immédiatement utile, lisible et actionnable.",
        },
        {
          number: "03",
          title: "Coordination complète — tout avance dans le même sens",
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
            "Vous gardez votre énergie pour la santé. Nous gardons le cap sur l'organisation.",
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
            "Le parcours reste cohérent jusqu'à la dernière étape, y compris après la prise en charge principale.",
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
          a: "Nous accompagnons des patients venant d'Europe, d'Afrique et d'autres contextes internationaux. Notre équipe coordonne les échanges en français et en anglais selon les besoins du dossier.",
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
          "Soumettez votre dossier médical à Wama Med. Réponse sous 2 heures, coordination disponible 24h/24 pour des parcours de soins nationaux et internationaux.",
      },
      hero: {
        badge: "Disponible maintenant · Répond en < 2h",
        eyebrow: "Contact",
        titleStart: "Parlons de votre",
        titleHighlight: "prochaine étape.",
        body:
          "Partagez votre situation. Notre équipe vous répond sous 2 heures avec un retour clair et une prochaine étape concrète.",
      },
      formSection: {
        eyebrow: "Formulaire de contact",
        title: "Soumettez votre dossier.",
        body: "Notre équipe vous répond sous 2 heures avec un premier cadrage du parcours.",
        whatsappAvailability: "WhatsApp — disponible 24h/24",
        assistantAria: "Assistant IA immédiat",
        formAria: "Formulaire de contact et informations",
      },
    },
  },
  en: {
    skipToContent: "Skip to content",
    schemaDescription:
      "National and international medical coordination, based in Casablanca and designed for seamless cross-border care journeys.",
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
        "International medical coordination, based in Casablanca and built for clear, premium care journeys.",
      servicesTitle: "Services",
      navigationTitle: "Navigation",
      contactTitle: "Contact",
      serviceLinks: [
        { href: "/services", label: "Care coordination" },
        { href: "/services", label: "International patients" },
        { href: "/services", label: "Family support abroad" },
        { href: "/services", label: "Medical evacuations" },
      ],
      navLinks: [
        { href: "/comment-ca-marche", label: "Our Process" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
      ],
      whatsapp: "WhatsApp",
      demoCtaLabel: "View the Mission Control demo",
      demoCtaAria: "Open the Mission Control demo",
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
      whatsappAria: "Contact us on WhatsApp",
      aiSection: {
        badge: "Online · Replies instantly",
        heading: "Talk to our assistant now",
        description:
          "Available 24/7 · Replies instantly · French and English",
      },
      closingCta: {
        backgroundWord: "TOGETHER",
        eyebrow: "First step",
        titleStart: "Your case deserves",
        titleHighlight: "expert coordination.",
        body:
          "Share your situation. We reply within 2 hours with a clear next step, a structured review, and coordination designed for international care journeys.",
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
          "Wama Med orchestrates national and international medical journeys with clear, human-centered coordination from first review through follow-up.",
      },
      hero: {
        ariaLabel: "Wama Med — International medical coordination",
        eyebrow: "International medical coordination",
        headline: "Medical coordination designed to move forward with confidence",
        supportingLine:
          "One team to align specialists, logistics, and continuity of care with clarity and calm.",
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
              "Smooth communication in French and English at every step of the journey.",
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
            title: "Remote consultations",
            desc:
              "A first clinical and operational framing before any travel begins.",
            href: "/services",
          },
        ],
      },
      founderSection: {
        alt: "Driss Benwahoud, founder of Wama Med",
        badge: "Founder & Director",
        eyebrow: "The promise",
        heading:
          "Built to make every care journey clearer, more human, and better coordinated.",
        quote:
          "\"The best coordination brings clarity before the first appointment even begins.\"",
        cite: "— Driss Benwahoud, Founder",
        body:
          "Driss Benwahoud founded Wama Med to give patients and families a professional, readable, and reassuring coordination framework. With more than ten years of experience in insurance and care-path management, he designed a service that connects the right expertise at the right moment without unnecessary friction.",
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
        heading: "Let's talk about your case.",
        supportingLine:
          "Tell us about your situation. We come back quickly with a clear next step and a structured view of the path ahead.",
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
          "About — Driss Benwahoud & Wama Med | International Medical Coordination",
        description:
          "The story behind Wama Med: a company built to bring clarity, continuity, and expert coordination to national and international care journeys.",
      },
      hero: {
        eyebrow: "Our story",
        title: "Built to bring clarity and continuity to care journeys.",
      },
      founder: {
        alt: "Driss Benwahoud, founder and director of Wama Med",
        name: "Driss Benwahoud",
        role: "Founder & Director — Wama Med",
        eyebrow: "The founder",
        quote:
          "Strong coordination is measured by the calm and clarity it creates around the patient.",
        cite: "Driss Benwahoud, Founder",
        paragraphs: [
          "Driss Benwahoud founded Wama Med to give patients and families a professional, readable, and reassuring coordination framework for complex care journeys.",
          "With more than ten years of experience in insurance, operations, and care-path management, he developed a method that combines clinical reading, operational execution, and continuity of support.",
          "Today, Wama Med puts that method into practice through a single point of coordination, structured decisions, and steady follow-through across every stage of care.",
        ],
        experience:
          "10+ years in insurance, healthcare, and care-path coordination",
      },
      credentials: [
        {
          title: "Insurance & healthcare",
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
          "Wama Med connects specialists, institutions, logistics, and families inside one coordinated framework. That consistency lets patients move forward with visibility and confidence.",
          "Based in Casablanca, the team manages local and international care journeys with the same standard: clarity, responsiveness, and continuity at every step.",
        ],
        alt: "Structured medical coordination by Wama Med",
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
        title: "Services — Medical Coordination | Wama Med",
        description:
          "Case review, specialist orientation, appointment coordination, international logistics, post-consultation follow-up, and medical evacuation.",
      },
      hero: {
        eyebrow: "Our Services",
        titleStart: "Complete coordination.",
        titleHighlight: "One coherent pathway.",
        body:
          "From the initial review to post-consultation follow-up, Wama Med aligns every stage of the journey with structure, pace, and continuity.",
      },
      servicesAria: "Services overview",
      detailsAria: "Service details",
      services: [
        {
          number: "01",
          title: "Medical file review",
          desc:
            "A structured case review designed to produce a clear, prioritized, and actionable orientation plan.",
          details: [
            "Complete review of the existing file",
            "Identification of the required specialists",
            "Personalized orientation plan",
            "First response within 2 hours",
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
            "Reference institutions in Casablanca and across the country",
            "Priority appointment booking",
          ],
        },
        {
          number: "03",
          title: "Appointment coordination",
          desc:
            "Wama Med synchronizes appointments, medical exchanges, and information flow around one coordinated plan.",
          details: [
            "Cross-specialty coordination",
            "Secure sharing of results",
            "Timeline and priority management",
            "Reminders and confirmations",
          ],
        },
        {
          number: "04",
          title: "International logistics",
          desc:
            "Travel, accommodation, language support, and documentation coordinated around the medical schedule.",
          details: [
            "Airport-to-hospital transfers",
            "Accommodation near clinics",
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
          title: "Medical evacuation",
          desc:
            "Fast, structured organization for urgent medical transfers, whether national or international.",
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
            "Your file receives a thorough review from our coordinating physician in order to define the right priorities, required expertise, and the most relevant pathway forward.",
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
            "Through an established network of trusted institutions, we guide you to the specialists most appropriate for your clinical situation.",
          details: [
            "Verified specialist network",
            "Selection based on your pathology",
            "Reference institutions in Casablanca and nationally",
            "Priority appointment booking",
          ],
          image: "/images/wama-orientation-specialisee.jpg",
          alt: "Specialized medical coordination and orientation — Wama Med",
        },
        {
          title: "International logistics",
          desc:
            "For patients traveling from abroad, we organize the medical stay with logistics aligned to the clinical schedule and follow-up requirements.",
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
            "Every case begins with a careful reading of your context, priorities, and timeline.",
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
            "Your orientation plan is built to be immediately useful, readable, and actionable.",
        },
        {
          number: "03",
          title: "Complete coordination — everything moves in the same direction",
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
          q: "Is Wama Med a medical practice?",
          a: "No. We are a medical coordination service — we organize, orient, and support, but we do not deliver medical treatment. Your care remains in the hands of the specialists we coordinate.",
        },
        {
          q: "Can I use Wama Med for a loved one in Morocco while I am abroad?",
          a: "Absolutely. That is one of our core services. We act as your representative on the ground — with the medical and administrative expertise to manage the entire case.",
        },
        {
          q: "Which countries do you support patients from?",
          a: "We support patients from Europe, Africa, and a range of international contexts. Our team coordinates in French and English according to the needs of the case.",
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
          "Submit your medical file to Wama Med. Reply within 2 hours, with coordination available 24/7 for national and international care journeys.",
      },
      hero: {
        badge: "Available now · Replies in < 2h",
        eyebrow: "Contact",
        titleStart: "Let's define your",
        titleHighlight: "next step.",
        body:
          "Share your situation. Our team replies within 2 hours with a clear response and a concrete next step.",
      },
      formSection: {
        eyebrow: "Contact form",
        title: "Submit your case.",
        body: "Our team replies within 2 hours with an initial view of the path ahead.",
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
