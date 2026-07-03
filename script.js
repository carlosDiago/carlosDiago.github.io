(function () {
  "use strict";

  var supportedLanguages = ["en", "es"];
  var currentLanguage = "en";
  var assignmentMap = null;
  var assignmentMarkers = [];
  var activeAssignmentIndex = 0;
  var activeJourneyIndex = 4;

  var navToggle = document.querySelector("[data-nav-toggle]");
  var navMenu = document.querySelector(".nav-menu");
  var navItems = document.querySelectorAll(".nav-links a");
  var languageButtons = document.querySelectorAll("[data-lang]");

  var assignments = [
    {
      coordinates: [40.4168, -3.7038],
      en: {
        location: "Spain",
        project: "Renfe, Metro Madrid, FGV Valencia, FGC Catalu\u00f1a",
        year: "2008 - Present",
        technology: "Onboard signalling, ATP/ATO, ASFA Digital, ERTMS/ETCS, maintenance engineering and warranty support.",
        role: "National railway and metro assignments involving onboard signalling, maintenance engineering, warranty support and technical coordination."
      },
      es: {
        location: "Espa\u00f1a",
        project: "Renfe, Metro Madrid, FGV Valencia, FGC Catalu\u00f1a",
        year: "2008 - Actualidad",
        technology: "Se\u00f1alizaci\u00f3n embarcada, ATP/ATO, ASFA Digital, ERTMS/ETCS, ingenier\u00eda de mantenimiento y soporte de garant\u00edas.",
        role: "Proyectos nacionales ferroviarios y de metro con se\u00f1alizaci\u00f3n embarcada, ingenier\u00eda de mantenimiento, soporte de garant\u00edas y coordinaci\u00f3n t\u00e9cnica."
      }
    },
    {
      coordinates: [10.4806, -66.9036],
      en: {
        location: "Caracas, Venezuela",
        project: "CAMETRO Line 1",
        year: "2011 - 2012",
        technology: "Metro onboard systems",
        role: "On-site commissioning activities for CAMETRO Line 1 onboard systems."
      },
      es: {
        location: "Caracas, Venezuela",
        project: "CAMETRO L\u00ednea 1",
        year: "2011 - 2012",
        technology: "Sistemas embarcados de metro",
        role: "Actividades in situ de puesta en servicio para los sistemas embarcados de CAMETRO L\u00ednea 1."
      }
    },
    {
      coordinates: [41.0082, 28.9784],
      en: {
        location: "Istanbul, Turkey",
        project: "Marmaray",
        year: "2014",
        technology: "Railway onboard systems",
        role: "On-site commissioning support for Marmaray railway project."
      },
      es: {
        location: "Estambul, Turqu\u00eda",
        project: "Marmaray",
        year: "2014",
        technology: "Sistemas ferroviarios embarcados",
        role: "Soporte in situ de puesta en servicio para el proyecto ferroviario Marmaray."
      }
    },
    {
      coordinates: [24.7136, 46.6753],
      en: {
        location: "Riyadh, Saudi Arabia",
        project: "HSR Push-Pull",
        year: "2015",
        technology: "High-speed railway onboard systems",
        role: "On-site project execution support for HSR Push-Pull railway project."
      },
      es: {
        location: "Riad, Arabia Saud\u00ed",
        project: "HSR Push-Pull",
        year: "2015",
        technology: "Sistemas embarcados de alta velocidad",
        role: "Soporte in situ a la ejecuci\u00f3n del proyecto ferroviario HSR Push-Pull."
      }
    },
    {
      coordinates: [1.3521, 103.8198],
      en: {
        location: "Singapore",
        project: "Downtown Line 1",
        year: "2013",
        technology: "CBTC / onboard signalling",
        role: "On-site testing and commissioning activities for Downtown Line 1."
      },
      es: {
        location: "Singapur",
        project: "Downtown Line 1",
        year: "2013",
        technology: "CBTC / se\u00f1alizaci\u00f3n embarcada",
        role: "Actividades in situ de pruebas y puesta en servicio para Downtown Line 1."
      }
    },
    {
      coordinates: [1.3147, 103.8927],
      en: {
        location: "Singapore",
        project: "Downtown Line 3",
        year: "2017",
        technology: "CBTC / onboard signalling",
        role: "On-site testing and commissioning activities for Downtown Line 3."
      },
      es: {
        location: "Singapur",
        project: "Downtown Line 3",
        year: "2017",
        technology: "CBTC / se\u00f1alizaci\u00f3n embarcada",
        role: "Actividades in situ de pruebas y puesta en servicio para Downtown Line 3."
      }
    },
    {
      coordinates: [28.2282, 112.9388],
      en: {
        location: "Changsha, China",
        project: "Metro Line 2",
        year: "2019",
        technology: "CBTC onboard equipment",
        role: "On-site maintenance engineering support and technical training for CBTC onboard equipment maintainers."
      },
      es: {
        location: "Changsha, China",
        project: "Metro L\u00ednea 2",
        year: "2019",
        technology: "Equipos embarcados CBTC",
        role: "Soporte in situ de ingenier\u00eda de mantenimiento y formaci\u00f3n t\u00e9cnica para mantenedores de equipos embarcados CBTC."
      }
    }
  ];

  var journeyStations = [
    {
      current: false,
      en: {
        period: "2008 - 2015",
        station: "Testing and Commissioning Technician",
        title: "Testing and Commissioning Technician - Project Execution",
        company: "Siemens Mobility \u00b7 Madrid, Spain / International",
        summary: "Onboard signalling systems commissioning in ASFA, ERTMS/ETCS, ATP/ATO and CBTC technologies.",
        bullets: [
          "Executed static and dynamic tests, equipment configuration checks, integration activities and field validation for onboard railway signalling systems.",
          "Supported commissioning, troubleshooting and operational validation of ASFA, ERTMS/ETCS, ATP/ATO and CBTC equipment.",
          "Worked in project environments involving installation, train preparation, functional testing, technical reporting and delivery support.",
          "Built a strong field background in railway safety-critical systems, later applied to maintenance engineering, warranty management and customer-facing technical support."
        ]
      },
      es: {
        period: "2008 - 2015",
        station: "T\u00e9cnico de Pruebas y Puesta en Servicio",
        title: "T\u00e9cnico de Pruebas y Puesta en Servicio - Ejecuci\u00f3n de Proyectos",
        company: "Siemens Mobility \u00b7 Madrid, Espa\u00f1a / Internacional",
        summary: "Puesta en servicio de sistemas de se\u00f1alizaci\u00f3n embarcada en tecnolog\u00edas ASFA, ERTMS/ETCS, ATP/ATO y CBTC.",
        bullets: [
          "Ejecuci\u00f3n de pruebas est\u00e1ticas y din\u00e1micas, verificaci\u00f3n de configuraciones, actividades de integraci\u00f3n y validaci\u00f3n en campo de sistemas ferroviarios embarcados.",
          "Soporte en puesta en servicio, diagn\u00f3stico y validaci\u00f3n operacional de equipos ASFA, ERTMS/ETCS, ATP/ATO y CBTC.",
          "Trabajo en entornos de proyecto con instalaci\u00f3n, preparaci\u00f3n de trenes, pruebas funcionales, reporting t\u00e9cnico y soporte a entrega.",
          "Construcci\u00f3n de una base de campo en sistemas ferroviarios cr\u00edticos para la seguridad, aplicada posteriormente a mantenimiento, garant\u00edas y soporte t\u00e9cnico a cliente."
        ]
      }
    },
    {
      current: false,
      en: {
        period: "2015 - 2017",
        station: "Senior Testing and Commissioning Technician",
        title: "Senior Testing and Commissioning Technician - Project Execution",
        company: "Siemens Mobility \u00b7 Madrid, Spain / International",
        summary: "Senior field commissioning role for onboard signalling systems: ASFA, ERTMS/ETCS, ATP/ATO and CBTC.",
        bullets: [
          "Performed senior testing and commissioning activities for onboard signalling equipment in national and international railway projects.",
          "Led field troubleshooting, functional validation, configuration checks and technical deviation resolution during project delivery.",
          "Coordinated with project engineering, customer representatives, maintenance teams and suppliers to ensure safe commissioning and service readiness.",
          "Provided technical support during dynamic tests, operational validation, handover and early-life project support."
        ]
      },
      es: {
        period: "2015 - 2017",
        station: "T\u00e9cnico Senior de Pruebas y Puesta en Servicio",
        title: "T\u00e9cnico Senior de Pruebas y Puesta en Servicio - Ejecuci\u00f3n de Proyectos",
        company: "Siemens Mobility \u00b7 Madrid, Espa\u00f1a / Internacional",
        summary: "Rol senior de campo en puesta en servicio de sistemas de se\u00f1alizaci\u00f3n embarcada: ASFA, ERTMS/ETCS, ATP/ATO y CBTC.",
        bullets: [
          "Realizaci\u00f3n de actividades senior de pruebas y puesta en servicio de equipos embarcados en proyectos ferroviarios nacionales e internacionales.",
          "Liderazgo en diagn\u00f3stico de campo, validaci\u00f3n funcional, verificaci\u00f3n de configuraci\u00f3n y resoluci\u00f3n de desviaciones t\u00e9cnicas durante la entrega de proyecto.",
          "Coordinaci\u00f3n con ingenier\u00eda de proyecto, representantes de cliente, equipos de mantenimiento y proveedores para asegurar una puesta en servicio segura y preparada para explotaci\u00f3n.",
          "Soporte t\u00e9cnico durante pruebas din\u00e1micas, validaci\u00f3n operacional, transferencia y soporte inicial de proyecto."
        ]
      }
    },
    {
      current: false,
      en: {
        period: "2017 - 2022",
        station: "Customer Service Engineer",
        title: "Customer Service Engineer - ATP/ATO Maintenance Contract",
        company: "Siemens Mobility \u00b7 Madrid, Spain",
        summary: "Ferromovil 3000 and Ferromovil 9000 ATP/ATO maintenance contract.",
        bullets: [
          "Resolved incidents in onboard ATP/ATO Dimetronic equipment, supporting preventive and corrective maintenance activities.",
          "Managed and coordinated subcontracted personnel in maintenance execution.",
          "Controlled client certifications, billing documentation, contract progress and technical-financial status.",
          "Administered and improved IBM Maximo as the GMAO tool for integral maintenance management.",
          "Developed BI dashboards and automated reports with Qlik Sense, NPrinting and Power BI to monitor technical and financial indicators.",
          "Collaborated in the redesign of repair and spare parts management processes for Siemens Mobility Spain."
        ]
      },
      es: {
        period: "2017 - 2022",
        station: "Customer Service Engineer",
        title: "Customer Service Engineer - Contrato de mantenimiento ATP/ATO",
        company: "Siemens Mobility \u00b7 Madrid, Espa\u00f1a",
        summary: "Contrato de mantenimiento ATP/ATO Ferromovil 3000 y Ferromovil 9000.",
        bullets: [
          "Resoluci\u00f3n de incidencias en equipos embarcados ATP/ATO Dimetronic, dando soporte a actividades de mantenimiento preventivo y correctivo.",
          "Gesti\u00f3n y coordinaci\u00f3n de personal subcontratado en la ejecuci\u00f3n del mantenimiento.",
          "Control de certificaciones de cliente, documentaci\u00f3n de facturaci\u00f3n, avance contractual y estado t\u00e9cnico-financiero.",
          "Administraci\u00f3n y mejora de IBM Maximo como herramienta GMAO para la gesti\u00f3n integral del mantenimiento.",
          "Desarrollo de cuadros de mando BI e informes automatizados con Qlik Sense, NPrinting y Power BI para monitorizar indicadores t\u00e9cnicos y financieros.",
          "Colaboraci\u00f3n en el redise\u00f1o de procesos de reparaci\u00f3n y gesti\u00f3n de repuestos para Siemens Mobility Espa\u00f1a."
        ]
      }
    },
    {
      current: false,
      en: {
        period: "2022 - 2023",
        station: "Project Manager and BI Expert",
        title: "Project Manager and Business Intelligence Expert - Digital Services",
        company: "Siemens Mobility \u00b7 Madrid, Spain",
        summary: "Digital Services department set-up, IRIS/OPMES/OMMES fleet monitoring visualisation and project-control governance.",
        bullets: [
          "Collaborated in the creation and deployment of Digital Services activities within Siemens Mobility, supporting department set-up, operating model and reporting definition.",
          "Participated in the original definition of IRIS, the fleet-monitoring visualisation tool integrated into OPMES/OMMES, focused on train fleet, project/line and onboard equipment status control.",
          "Defined Qlik Sense dashboards and views to display the key information required for fleet condition monitoring, onboard equipment status, project/line follow-up and management KPIs.",
          "As Project Manager, supported project-control set-up for Digital Services, including customer invoicing approach, invoicing plan, team hour allocation, planned cost follow-up and risk tracking.",
          "Combined railway technical knowledge with data modelling, Qlik Sense, Power BI and NPrinting to transform onboard equipment data into operational and management reporting."
        ]
      },
      es: {
        period: "2022 - 2023",
        station: "Project Manager y experto BI",
        title: "Project Manager y experto en Business Intelligence - Digital Services",
        company: "Siemens Mobility \u00b7 Madrid, Espa\u00f1a",
        summary: "Puesta en marcha del departamento Digital Services, visualizaci\u00f3n de flota IRIS/OPMES/OMMES y gobierno de control de proyecto.",
        bullets: [
          "Colaboraci\u00f3n en la creaci\u00f3n y despliegue de actividades de Digital Services en Siemens Mobility, apoyando la definici\u00f3n del departamento, modelo operativo y reporting.",
          "Participaci\u00f3n en la definici\u00f3n original de IRIS, herramienta de visualizaci\u00f3n de monitorizaci\u00f3n de flota integrada en OPMES/OMMES, orientada al control de trenes, proyectos/l\u00edneas y equipos embarcados.",
          "Definici\u00f3n de cuadros de mando y vistas Qlik Sense para mostrar informaci\u00f3n clave sobre condici\u00f3n de flota, estado de equipos embarcados, seguimiento de proyecto/l\u00ednea e indicadores de gesti\u00f3n.",
          "Como Project Manager, soporte a la puesta en marcha del control de proyecto para Digital Services, incluyendo enfoque de facturaci\u00f3n, plan de facturaci\u00f3n, imputaci\u00f3n de horas, seguimiento de costes previstos y riesgos.",
          "Combinaci\u00f3n de conocimiento t\u00e9cnico ferroviario con modelado de datos, Qlik Sense, Power BI y NPrinting para transformar datos de equipos embarcados en reporting operativo y de gesti\u00f3n."
        ]
      }
    },
    {
      current: true,
      en: {
        period: "2023 - Present",
        station: "Technical Warranty Manager",
        title: "Technical Warranty Manager - Onboard Signalling",
        company: "Siemens Mobility \u00b7 Madrid, Spain",
        summary: "Responsible for technical warranty management of onboard signalling contracts, including ERTMS/ETCS and ASFA Digital/ASFA 4 equipment.",
        bullets: [
          "Lead technical analysis of warranty incidents, including JRU/onboard log review, failure categorisation and warranty applicability.",
          "Coordinate maintainers, customer stakeholders, repair centres, spare parts and logistics linked to warranty processes.",
          "Lead warranty incident meetings with customers and maintainers, explaining failure origin, categorisation criteria and contractual impact.",
          "Define and apply RAMS/contractual criteria based on customer contracts, ADIF ASFA technical specification and EN 50126 / EN 50129 principles.",
          "Design digital incident-reporting and repair-request architecture using Teams Lists, SharePoint and Power Automate."
        ]
      },
      es: {
        period: "2023 - Actualidad",
        station: "Responsable T\u00e9cnico de Garant\u00edas",
        title: "Responsable T\u00e9cnico de Garant\u00edas - Se\u00f1alizaci\u00f3n Embarcada",
        company: "Siemens Mobility \u00b7 Madrid, Espa\u00f1a",
        summary: "Responsable de la gesti\u00f3n t\u00e9cnica de garant\u00edas en contratos de se\u00f1alizaci\u00f3n embarcada, incluyendo equipos ERTMS/ETCS y ASFA Digital/ASFA 4.",
        bullets: [
          "Liderazgo del an\u00e1lisis t\u00e9cnico de incidencias en garant\u00eda, incluyendo revisi\u00f3n de registros JRU / logs embarcados, categorizaci\u00f3n de fallos y aplicabilidad de garant\u00eda.",
          "Coordinaci\u00f3n de mantenedores, interlocutores de cliente, centros de reparaci\u00f3n, repuestos y log\u00edstica vinculados a procesos de garant\u00eda.",
          "Liderazgo de reuniones de incidencias de garant\u00eda con clientes y mantenedores, explicando origen del fallo, criterios de categorizaci\u00f3n e impacto contractual.",
          "Definici\u00f3n y aplicaci\u00f3n de criterios RAMS/contractuales basados en contratos de cliente, especificaci\u00f3n t\u00e9cnica ASFA de ADIF y principios EN 50126 / EN 50129.",
          "Dise\u00f1o de arquitectura digital para reporte de incidencias y solicitudes de reparaci\u00f3n mediante Teams Lists, SharePoint y Power Automate."
        ]
      }
    }
  ];

  var translations = {
    en: {
      meta: {
        title: "Juan Carlos Diago Guijarro | Railway Systems Engineer",
        description: "Interactive railway systems portfolio for Juan Carlos Diago Guijarro, Railway Systems Engineer focused on onboard signalling, technical warranty management and railway digitalisation.",
        socialDescription: "Onboard signalling, testing and commissioning, maintenance engineering, technical warranty management and digital workflow automation."
      },
      identity: {
        fullName: "Juan Carlos Diago Guijarro",
        compactName: "Carlos Diago Guijarro"
      },
      brand: {
        homeLabel: "Juan Carlos Diago Guijarro home"
      },
      ui: {
        skipLink: "Skip to content",
        primaryNavigation: "Primary navigation",
        openNavigation: "Open navigation",
        closeNavigation: "Close navigation"
      },
      language: {
        selectorLabel: "Language selector"
      },
      nav: {
        profile: "Profile",
        expertise: "Expertise",
        map: "Map",
        journey: "Journey",
        blog: "Blog",
        contact: "Contact"
      },
      hero: {
        eyebrow: "Interactive Railway Systems Portfolio",
        title: "Railway Systems Engineer \u00b7 Onboard Signalling \u00b7 Technical Warranty Manager",
        subtitle: "Computer Engineer with 17+ years at Siemens Mobility, focused on onboard railway systems, signalling, testing and commissioning, maintenance engineering, technical warranty management, incident analysis, JRU/onboard log analysis and digital workflow automation.",
        actionsLabel: "Primary actions",
        mapButton: "View Project Map",
        contactButton: "Contact",
        visualLabel: "Onboard signalling focus overview",
        visualToplineLeft: "ONBOARD SIGNALLING",
        visualToplineRight: "RAMS & WARRANTY",
        visualCard1: "JRU review",
        visualCard2: "Failure criteria",
        visualCard3: "Testing field support",
        visualCard4: "Maintenance training",
        statusIncident: "Incident analysis",
        statusRepair: "Repair workflow",
        statusMeetings: "Customer meetings"
      },
      figures: {
        eyebrow: "Key figures",
        title: "Railway experience at a glance",
        cards: [
          { value: "17+ years", label: "Siemens Mobility railway systems experience" },
          { value: "8+ years", label: "Project Execution / Testing and Commissioning" },
          { value: "5+ years", label: "Maintenance Engineer / Service Engineer" },
          { value: "Current role", label: "Technical Warranty Manager for onboard signalling contracts" }
        ]
      },
      expertise: {
        eyebrow: "Core expertise",
        title: "Onboard systems, technical governance and digitalisation",
        subtitle: "A field-based railway systems profile combining commissioning, maintenance engineering, warranty assessment, customer-facing technical analysis and data-driven workflow control.",
        cards: [
          { title: "Onboard Signalling Technologies" },
          {
            title: "Technical Capabilities",
            items: [
              "JRU / onboard log analysis",
              "Incident analysis",
              "Root cause / failure categorisation",
              "Maintenance engineering",
              "Testing and commissioning",
              "Warranty management",
              "Repair and spare parts workflow",
              "Customer technical meetings"
            ]
          },
          {
            title: "Frameworks and Standards",
            items: [
              "ADIF ASFA technical specification",
              "Warranty contractual assessment",
              "Reliability / MTBF assessment"
            ]
          },
          { title: "Tools and Digitalisation" }
        ]
      },
      map: {
        eyebrow: "International assignments",
        title: "On-site Railway Project Assignments",
        subtitle: "Field project assignments across national railway, metro and international onboard signalling programmes.",
        note: "OpenStreetMap tiles, Leaflet.js and non-confidential project summaries.",
        mapLabel: "Interactive world map with project assignments",
        panelLabel: "Project assignment list",
        assignmentsTitle: "Assignments",
        fallback: "Map library unavailable. Project assignments remain listed beside the map.",
        assignmentButtonPrefix: "Open assignment",
        labels: {
          location: "Location",
          project: "Project",
          year: "Year",
          technology: "Technology / context",
          role: "Role"
        }
      },
      journey: {
        eyebrow: "Professional experience",
        title: "Professional Journey",
        subtitle: "A railway systems career built across project execution, commissioning, maintenance engineering, digital services and technical warranty management.",
        railLabel: "Professional journey railway stations",
        currentLabel: "Current role",
        focusPrefix: "Focus professional stage"
      },
      personal: {
        eyebrow: "Personal Drive",
        title: "Personal Drive",
        copy: "Endurance running and marathon preparation have reinforced the same principles I apply professionally: discipline, consistency, structured progress and resilience under demanding conditions.",
        cards: [
          { label: "Marathon experience" },
          { label: "Long-term endurance goals" },
          { label: "Discipline and consistency" }
        ]
      },
      education: {
        eyebrow: "Education and certifications",
        title: "Engineering foundation and continuous training",
        degreeLabel: "Education",
        university: "Universidad Polit\u00e9cnica de Madrid",
        degree: "Degree in Computer Engineering / Grado en Ingenier\u00eda de Computadores",
        certificationsLabel: "Certifications",
        certifications: [
          "English B2 - APTIS certified",
          "IBM Maximo Administrator Training - 12h",
          "PRL Generic 30h",
          "Qlik Sense / NPrinting training",
          "PM@ Siemens Project Management Career"
        ]
      },
      blog: {
        eyebrow: "Technical Notes and Blog",
        title: "Technical Notes & Blog",
        placeholder: "Future posts about railway systems, digitalisation, maintenance engineering and technical lessons learned.",
        button: "Blog coming soon"
      },
      contact: {
        eyebrow: "Contact",
        title: "Professional contact details",
        subtitle: "Available for railway systems engineering, onboard signalling, technical warranty and digital workflow discussions.",
        gridLabel: "Contact details",
        labels: {
          location: "Location",
          phone: "Phone",
          email: "Email",
          linkedin: "LinkedIn",
          portfolio: "Portfolio",
          languages: "Languages"
        },
        values: {
          location: "Madrid, Spain",
          languages: "English B2 - APTIS certified"
        }
      },
      footer: {
        tagline: "Railway Systems Engineer \u00b7 Onboard Signalling \u00b7 Technical Warranty Manager"
      }
    },
    es: {
      meta: {
        title: "Juan Carlos Diago Guijarro | Ingeniero de Sistemas Ferroviarios",
        description: "Portfolio interactivo de sistemas ferroviarios de Juan Carlos Diago Guijarro, Ingeniero de Sistemas Ferroviarios especializado en se\u00f1alizaci\u00f3n embarcada, gesti\u00f3n t\u00e9cnica de garant\u00edas y digitalizaci\u00f3n ferroviaria.",
        socialDescription: "Se\u00f1alizaci\u00f3n embarcada, pruebas y puesta en servicio, ingenier\u00eda de mantenimiento, gesti\u00f3n t\u00e9cnica de garant\u00edas y automatizaci\u00f3n de flujos digitales."
      },
      identity: {
        fullName: "Juan Carlos Diago Guijarro",
        compactName: "Carlos Diago Guijarro"
      },
      brand: {
        homeLabel: "Inicio de Juan Carlos Diago Guijarro"
      },
      ui: {
        skipLink: "Saltar al contenido",
        primaryNavigation: "Navegaci\u00f3n principal",
        openNavigation: "Abrir navegaci\u00f3n",
        closeNavigation: "Cerrar navegaci\u00f3n"
      },
      language: {
        selectorLabel: "Selector de idioma"
      },
      nav: {
        profile: "Perfil",
        expertise: "Especializaci\u00f3n",
        map: "Mapa",
        journey: "Trayectoria",
        blog: "Blog",
        contact: "Contacto"
      },
      hero: {
        eyebrow: "Portfolio interactivo de sistemas ferroviarios",
        title: "Ingeniero de Sistemas Ferroviarios \u00b7 Se\u00f1alizaci\u00f3n Embarcada \u00b7 Responsable T\u00e9cnico de Garant\u00edas",
        subtitle: "Ingeniero de Computadores con m\u00e1s de 17 a\u00f1os en Siemens Mobility, centrado en sistemas ferroviarios embarcados, se\u00f1alizaci\u00f3n, pruebas y puesta en servicio, ingenier\u00eda de mantenimiento, gesti\u00f3n t\u00e9cnica de garant\u00edas, an\u00e1lisis de incidencias, an\u00e1lisis de registros JRU / logs embarcados y automatizaci\u00f3n de flujos digitales.",
        actionsLabel: "Acciones principales",
        mapButton: "Ver mapa de proyectos",
        contactButton: "Contacto",
        visualLabel: "Resumen del foco en se\u00f1alizaci\u00f3n embarcada",
        visualToplineLeft: "SE\u00d1ALIZACI\u00d3N EMBARCADA",
        visualToplineRight: "RAMS Y GARANT\u00cdAS",
        visualCard1: "Revisi\u00f3n JRU",
        visualCard2: "Criterios de fallo",
        visualCard3: "Soporte de campo en pruebas",
        visualCard4: "Formaci\u00f3n de mantenimiento",
        statusIncident: "An\u00e1lisis de incidencias",
        statusRepair: "Flujo de reparaci\u00f3n",
        statusMeetings: "Reuniones t\u00e9cnicas"
      },
      figures: {
        eyebrow: "Indicadores clave",
        title: "Experiencia ferroviaria de un vistazo",
        cards: [
          { value: "17+ a\u00f1os", label: "Experiencia en sistemas ferroviarios en Siemens Mobility" },
          { value: "8+ a\u00f1os", label: "Ejecuci\u00f3n de proyectos / Pruebas y Puesta en Servicio" },
          { value: "5+ a\u00f1os", label: "Ingenier\u00eda de mantenimiento / servicio a cliente" },
          { value: "Rol actual", label: "Responsable T\u00e9cnico de Garant\u00edas en contratos de se\u00f1alizaci\u00f3n embarcada" }
        ]
      },
      expertise: {
        eyebrow: "Especializaci\u00f3n",
        title: "Sistemas embarcados, gobierno t\u00e9cnico y digitalizaci\u00f3n",
        subtitle: "Perfil de sistemas ferroviarios construido en campo, combinando puesta en servicio, ingenier\u00eda de mantenimiento, evaluaci\u00f3n de garant\u00edas, an\u00e1lisis t\u00e9cnico ante cliente y control de flujos basado en datos.",
        cards: [
          { title: "Tecnolog\u00edas de Se\u00f1alizaci\u00f3n Embarcada" },
          {
            title: "Capacidades t\u00e9cnicas",
            items: [
              "An\u00e1lisis de registros JRU / logs embarcados",
              "An\u00e1lisis de incidencias",
              "An\u00e1lisis de causa ra\u00edz y categorizaci\u00f3n de fallos",
              "Ingenier\u00eda de Mantenimiento",
              "Pruebas y Puesta en Servicio",
              "Gesti\u00f3n de garant\u00edas",
              "Flujo de reparaci\u00f3n y repuestos",
              "Reuniones t\u00e9cnicas con cliente"
            ]
          },
          {
            title: "Marcos y normas",
            items: [
              "Especificaci\u00f3n t\u00e9cnica ASFA de ADIF",
              "Evaluaci\u00f3n contractual de garant\u00edas",
              "Evaluaci\u00f3n de fiabilidad / MTBF"
            ]
          },
          { title: "Herramientas y digitalizaci\u00f3n" }
        ]
      },
      map: {
        eyebrow: "Proyectos internacionales",
        title: "Proyectos ferroviarios realizados in situ",
        subtitle: "Asignaciones de campo en proyectos ferroviarios nacionales, metro y programas internacionales de se\u00f1alizaci\u00f3n embarcada.",
        note: "Teselas de OpenStreetMap, Leaflet.js y res\u00famenes no confidenciales de proyecto.",
        mapLabel: "Mapa mundial interactivo con proyectos ferroviarios",
        panelLabel: "Lista de proyectos ferroviarios",
        assignmentsTitle: "Proyectos",
        fallback: "La librer\u00eda del mapa no est\u00e1 disponible. Los proyectos siguen listados junto al mapa.",
        assignmentButtonPrefix: "Abrir proyecto",
        labels: {
          location: "Ubicaci\u00f3n",
          project: "Proyecto",
          year: "A\u00f1o",
          technology: "Tecnolog\u00eda / contexto",
          role: "Rol"
        }
      },
      journey: {
        eyebrow: "Experiencia profesional",
        title: "Trayectoria profesional",
        subtitle: "Una trayectoria en sistemas ferroviarios construida entre ejecuci\u00f3n de proyectos, puesta en servicio, ingenier\u00eda de mantenimiento, servicios digitales y gesti\u00f3n t\u00e9cnica de garant\u00edas.",
        railLabel: "Estaciones de la trayectoria profesional",
        currentLabel: "Rol actual",
        focusPrefix: "Enfocar etapa profesional"
      },
      personal: {
        eyebrow: "Disciplina personal",
        title: "Disciplina personal",
        copy: "La preparaci\u00f3n de maratones y la carrera de resistencia refuerzan los mismos principios que aplico profesionalmente: disciplina, constancia, progreso estructurado y resiliencia en condiciones exigentes.",
        cards: [
          { label: "Experiencia en marat\u00f3n" },
          { label: "Objetivos de resistencia a largo plazo" },
          { label: "Disciplina y constancia" }
        ]
      },
      education: {
        eyebrow: "Formaci\u00f3n y certificaciones",
        title: "Base de ingenier\u00eda y formaci\u00f3n continua",
        degreeLabel: "Formaci\u00f3n",
        university: "Universidad Polit\u00e9cnica de Madrid",
        degree: "Grado en Ingenier\u00eda de Computadores",
        certificationsLabel: "Certificaciones",
        certifications: [
          "Ingl\u00e9s B2 - certificado APTIS",
          "Formaci\u00f3n de administrador IBM Maximo - 12h",
          "PRL gen\u00e9rico 30h",
          "Formaci\u00f3n Qlik Sense / NPrinting",
          "PM@ Siemens Project Management Career"
        ]
      },
      blog: {
        eyebrow: "Notas t\u00e9cnicas y blog",
        title: "Notas t\u00e9cnicas y blog",
        placeholder: "Futuras entradas sobre sistemas ferroviarios, digitalizaci\u00f3n, ingenier\u00eda de mantenimiento y aprendizajes t\u00e9cnicos.",
        button: "Blog pr\u00f3ximamente"
      },
      contact: {
        eyebrow: "Contacto",
        title: "Datos de contacto profesional",
        subtitle: "Disponible para conversaciones sobre ingenier\u00eda de sistemas ferroviarios, se\u00f1alizaci\u00f3n embarcada, garant\u00edas t\u00e9cnicas y flujos digitales.",
        gridLabel: "Datos de contacto",
        labels: {
          location: "Ubicaci\u00f3n",
          phone: "Tel\u00e9fono",
          email: "Email",
          linkedin: "LinkedIn",
          portfolio: "Portfolio",
          languages: "Idiomas"
        },
        values: {
          location: "Madrid, Espa\u00f1a",
          languages: "Ingl\u00e9s B2 - certificado APTIS"
        }
      },
      footer: {
        tagline: "Ingeniero de Sistemas Ferroviarios \u00b7 Se\u00f1alizaci\u00f3n Embarcada \u00b7 Responsable T\u00e9cnico de Garant\u00edas"
      }
    }
  };

  function getInitialLanguage() {
    return "en";
  }

  function getValue(path, language) {
    var keys = path.split(".");
    var value = translations[language || currentLanguage];

    keys.forEach(function (key) {
      if (value !== undefined && value !== null) {
        value = value[key];
      }
    });

    if ((value === undefined || value === null) && language !== "en") {
      return getValue(path, "en");
    }

    return value === undefined || value === null ? "" : value;
  }

  function getAssignment(index) {
    var assignment = assignments[index];
    var content = assignment[currentLanguage] || assignment.en;

    return {
      coordinates: assignment.coordinates,
      location: content.location,
      project: content.project,
      year: content.year,
      technology: content.technology,
      role: content.role
    };
  }

  function getJourneyStation(index) {
    var station = journeyStations[index];
    var content = station[currentLanguage] || station.en;

    return {
      current: station.current,
      period: content.period,
      station: content.station,
      title: content.title,
      company: content.company,
      summary: content.summary,
      bullets: content.bullets
    };
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function setMeta(selector, value) {
    var element = document.querySelector(selector);

    if (element) {
      element.setAttribute("content", value);
    }
  }

  function updateMeta() {
    var title = getValue("meta.title");
    var description = getValue("meta.description");
    var socialDescription = getValue("meta.socialDescription");

    document.documentElement.lang = currentLanguage;
    document.title = title;
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', socialDescription);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);
  }

  function renderStaticTranslations() {
    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      element.textContent = getValue(element.getAttribute("data-i18n"));
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach(function (element) {
      element.setAttribute("aria-label", getValue(element.getAttribute("data-i18n-aria-label")));
    });
  }

  function updateNavToggleLabel() {
    if (!navToggle) {
      return;
    }

    var isOpen = navMenu && navMenu.classList.contains("is-open");
    navToggle.setAttribute("aria-label", getValue(isOpen ? "ui.closeNavigation" : "ui.openNavigation"));
  }

  function updateLanguageButtons() {
    languageButtons.forEach(function (button) {
      var isActive = button.getAttribute("data-lang") === currentLanguage;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  function setNavOpen(isOpen) {
    if (!navMenu || !navToggle) {
      return;
    }

    navMenu.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("nav-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    updateNavToggleLabel();
  }

  function applyLanguage(language) {
    currentLanguage = supportedLanguages.indexOf(language) >= 0 ? language : "en";

    updateMeta();
    renderStaticTranslations();
    updateNavToggleLabel();
    updateLanguageButtons();
    renderAssignmentList();
    updateMarkerPopups();
    renderJourney();
    setActiveNav();
  }

  function initLanguageControls() {
    languageButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        applyLanguage(button.getAttribute("data-lang"));
      });
    });
  }

  function initNavigation() {
    if (navToggle && navMenu) {
      navToggle.addEventListener("click", function () {
        setNavOpen(!navMenu.classList.contains("is-open"));
      });
    }

    navItems.forEach(function (link) {
      link.addEventListener("click", function () {
        setNavOpen(false);
      });
    });
  }

  function setActiveNav() {
    var fromTop = window.scrollY + 120;

    navItems.forEach(function (link) {
      var section = document.querySelector(link.getAttribute("href"));

      if (!section) {
        return;
      }

      var startsBefore = section.offsetTop <= fromTop;
      var endsAfter = section.offsetTop + section.offsetHeight > fromTop;
      link.classList.toggle("is-active", startsBefore && endsAfter);
    });
  }

  function renderPopup(assignment) {
    var labels = getValue("map.labels");

    return [
      '<div class="map-popup">',
      "<h3>" + escapeHtml(assignment.project) + "</h3>",
      "<dl>",
      "<dt>" + escapeHtml(labels.location) + "</dt><dd>" + escapeHtml(assignment.location) + "</dd>",
      "<dt>" + escapeHtml(labels.project) + "</dt><dd>" + escapeHtml(assignment.project) + "</dd>",
      "<dt>" + escapeHtml(labels.year) + "</dt><dd>" + escapeHtml(assignment.year) + "</dd>",
      "<dt>" + escapeHtml(labels.technology) + "</dt><dd>" + escapeHtml(assignment.technology) + "</dd>",
      "<dt>" + escapeHtml(labels.role) + "</dt><dd>" + escapeHtml(assignment.role) + "</dd>",
      "</dl>",
      "</div>"
    ].join("");
  }

  function createMarkerIcon(index) {
    return window.L.divIcon({
      className: "portfolio-marker",
      html: '<span class="portfolio-marker-pin"><em>' + index + "</em></span>",
      iconSize: [34, 34],
      iconAnchor: [17, 34],
      popupAnchor: [0, -30]
    });
  }

  function updateMarkerPopups() {
    assignmentMarkers.forEach(function (marker, index) {
      var assignment = getAssignment(index);

      marker.setPopupContent(renderPopup(assignment));

      if (marker.options) {
        marker.options.title = assignment.location;
      }
    });
  }

  function renderAssignmentList() {
    var list = document.getElementById("assignment-list");
    var labels = getValue("map.labels");

    if (!list) {
      return;
    }

    list.innerHTML = "";

    assignments.forEach(function (_, index) {
      var assignment = getAssignment(index);
      var button = document.createElement("button");
      button.className = "assignment-button";
      button.type = "button";
      button.setAttribute("aria-label", getValue("map.assignmentButtonPrefix") + ": " + assignment.project);
      button.innerHTML = [
        "<strong>" + escapeHtml(assignment.project) + "</strong>",
        '<span class="assignment-summary">' + escapeHtml(assignment.location) + " \u00b7 " + escapeHtml(assignment.year) + "</span>",
        '<span class="assignment-detail"><span>' + escapeHtml(labels.location) + "</span><span>" + escapeHtml(assignment.location) + "</span></span>",
        '<span class="assignment-detail"><span>' + escapeHtml(labels.project) + "</span><span>" + escapeHtml(assignment.project) + "</span></span>",
        '<span class="assignment-detail"><span>' + escapeHtml(labels.year) + "</span><span>" + escapeHtml(assignment.year) + "</span></span>",
        '<span class="assignment-detail"><span>' + escapeHtml(labels.technology) + "</span><span>" + escapeHtml(assignment.technology) + "</span></span>",
        '<span class="assignment-detail"><span>' + escapeHtml(labels.role) + "</span><span>" + escapeHtml(assignment.role) + "</span></span>"
      ].join("");

      button.addEventListener("click", function () {
        setActiveAssignment(index);

        if (assignmentMarkers[index] && assignmentMap) {
          assignmentMap.flyTo(assignment.coordinates, 5, { duration: 0.65 });
          setTimeout(function () {
            assignmentMarkers[index].openPopup();
          }, 240);
        }
      });

      list.appendChild(button);
    });

    setActiveAssignment(activeAssignmentIndex);
  }

  function setActiveAssignment(index) {
    activeAssignmentIndex = index;

    document.querySelectorAll(".assignment-button").forEach(function (button, buttonIndex) {
      button.classList.toggle("is-active", buttonIndex === index);
    });
  }

  function initMap() {
    var mapElement = document.getElementById("assignment-map");

    if (!mapElement) {
      return;
    }

    if (!window.L) {
      mapElement.innerHTML = '<div class="map-fallback" data-i18n="map.fallback">' + escapeHtml(getValue("map.fallback")) + "</div>";
      renderAssignmentList();
      return;
    }

    assignmentMap = window.L.map("assignment-map", {
      scrollWheelZoom: false,
      worldCopyJump: true
    }).setView([27.5, 24], 2);

    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(assignmentMap);

    assignments.forEach(function (_, index) {
      var assignment = getAssignment(index);
      var marker = window.L.marker(assignment.coordinates, {
        icon: createMarkerIcon(index + 1),
        title: assignment.location
      })
        .addTo(assignmentMap)
        .bindPopup(renderPopup(assignment));

      marker.on("click", function () {
        setActiveAssignment(index);
      });

      marker.on("popupopen", function () {
        setActiveAssignment(index);
      });

      assignmentMarkers.push(marker);
    });

    var bounds = window.L.latLngBounds(assignments.map(function (assignment) {
      return assignment.coordinates;
    }));

    assignmentMap.fitBounds(bounds, {
      padding: [36, 36],
      maxZoom: 4
    });

    setTimeout(function () {
      assignmentMap.invalidateSize();
    }, 100);

    renderAssignmentList();
    setActiveAssignment(0);
  }

  function renderJourney() {
    var rail = document.getElementById("journey-rail");
    var cards = document.getElementById("journey-cards");

    if (!rail || !cards) {
      return;
    }

    rail.innerHTML = "";
    cards.innerHTML = "";

    journeyStations.forEach(function (station, index) {
      var content = getJourneyStation(index);
      var stationButton = document.createElement("button");
      var card = document.createElement("article");
      var isActive = index === activeJourneyIndex;
      var stationClasses = ["station-button"];
      var cardClasses = ["journey-card"];
      var bullets = content.bullets.map(function (item) {
        return "<li>" + escapeHtml(item) + "</li>";
      }).join("");
      var currentBadge = content.current ? '<span class="role-badge">' + escapeHtml(getValue("journey.currentLabel")) + "</span>" : "";

      if (content.current) {
        stationClasses.push("is-current");
        cardClasses.push("is-current");
      }

      if (isActive) {
        stationClasses.push("is-active");
        cardClasses.push("is-active");
      }

      stationButton.className = stationClasses.join(" ");
      stationButton.type = "button";
      stationButton.setAttribute("aria-pressed", String(isActive));
      stationButton.setAttribute("aria-controls", "journey-card-" + index);
      stationButton.setAttribute("aria-label", getValue("journey.focusPrefix") + ": " + content.title);

      if (content.current) {
        stationButton.setAttribute("aria-current", "step");
      }

      stationButton.innerHTML = [
        '<span class="station-node" aria-hidden="true"></span>',
        '<span class="station-copy">',
        "<time>" + escapeHtml(content.period) + "</time>",
        "<strong>" + escapeHtml(content.station) + "</strong>",
        "</span>"
      ].join("");

      stationButton.addEventListener("click", function () {
        setActiveJourney(index, true);
      });

      card.id = "journey-card-" + index;
      card.className = cardClasses.join(" ");
      card.tabIndex = -1;
      card.innerHTML = [
        '<div class="journey-card-topline">',
        "<time>" + escapeHtml(content.period) + "</time>",
        currentBadge,
        "</div>",
        "<h3>" + escapeHtml(content.title) + "</h3>",
        '<p class="company">' + escapeHtml(content.company) + "</p>",
        "<p>" + escapeHtml(content.summary) + "</p>",
        "<ul>" + bullets + "</ul>"
      ].join("");

      rail.appendChild(stationButton);
      cards.appendChild(card);
    });

    setActiveJourney(activeJourneyIndex, false);
  }

  function setActiveJourney(index, shouldFocus) {
    var buttons = document.querySelectorAll(".station-button");
    var cards = document.querySelectorAll(".journey-card");
    var behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

    activeJourneyIndex = index;

    buttons.forEach(function (button, buttonIndex) {
      var isActive = buttonIndex === index;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    cards.forEach(function (card, cardIndex) {
      card.classList.toggle("is-active", cardIndex === index);
    });

    if (shouldFocus && cards[index]) {
      cards[index].focus({ preventScroll: true });
      cards[index].scrollIntoView({ behavior: behavior, block: "center" });
    }
  }

  function initRevealAnimations() {
    var animated = document.querySelectorAll("[data-animate]");

    if (!animated.length) {
      return;
    }

    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animated.forEach(function (element) {
        element.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12
    });

    animated.forEach(function (element) {
      observer.observe(element);
    });
  }

  function initPage() {
    initNavigation();
    initLanguageControls();
    applyLanguage(getInitialLanguage());
    initMap();
    initRevealAnimations();
    setActiveNav();
  }

  window.addEventListener("scroll", setActiveNav, { passive: true });
  window.addEventListener("load", setActiveNav);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPage);
  } else {
    initPage();
  }
}());
