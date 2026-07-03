(function () {
  "use strict";

  var supportedLanguages = ["en", "es"];
  var currentLanguage = "en";
  var assignmentMap = null;
  var mapMarkers = {};
  var revealedGroups = {};
  var activeAssignmentKey = "spain";
  var activeJourneyIndex = 4;
  var resetMapButton = document.querySelector("[data-map-reset]");

  var navToggle = document.querySelector("[data-nav-toggle]");
  var navMenu = document.querySelector(".nav-menu");
  var navItems = document.querySelectorAll(".nav-links a");
  var languageButtons = document.querySelectorAll("[data-lang]");

  var assignmentGroups = [
    {
      key: "spain",
      type: "group",
      coordinates: [40.4168, -3.7038],
      zoom: 6,
      children: ["madrid", "valencia", "cataluna"],
      label: "ES",
      en: {
        location: "Spain",
        project: "Spain Railway Assignments",
        year: "2008 - Present"
      },
      es: {
        location: "Espa\u00f1a",
        project: "Proyectos ferroviarios en Espa\u00f1a",
        year: "2008 - Actualidad"
      }
    },
    {
      key: "singapore",
      type: "group",
      coordinates: [1.3335, 103.8565],
      zoom: 11,
      children: ["singapore-dtl1", "singapore-dtl3"],
      label: "SG",
      en: {
        location: "Singapore",
        project: "Singapore Downtown Line Assignments",
        year: "2013 - 2017"
      },
      es: {
        location: "Singapur",
        project: "Proyectos Downtown Line en Singapur",
        year: "2013 - 2017"
      }
    }
  ];

  var finalAssignments = [
    {
      key: "madrid",
      parentKey: "spain",
      coordinates: [40.4168, -3.7038],
      label: "MD",
      en: {
        location: "Madrid, Spain",
        project: "Renfe / Metro Madrid",
        year: "2008 - Present",
        technology: "ASFA Digital, ERTMS/ETCS, ATP/ATO, onboard signalling, maintenance engineering and warranty support.",
        role: "National railway and metro assignments involving onboard signalling, maintenance engineering, warranty support, customer coordination and technical analysis.",
        detail: "Field, maintenance and warranty work focused on non-confidential onboard signalling support and technical analysis."
      },
      es: {
        location: "Madrid, Espa\u00f1a",
        project: "Renfe / Metro Madrid",
        year: "2008 - Actualidad",
        technology: "ASFA Digital, ERTMS/ETCS, ATP/ATO, se\u00f1alizaci\u00f3n embarcada, ingenier\u00eda de mantenimiento y soporte de garant\u00edas.",
        role: "Asignaciones nacionales ferroviarias y de metro con se\u00f1alizaci\u00f3n embarcada, ingenier\u00eda de mantenimiento, soporte de garant\u00edas, coordinaci\u00f3n con cliente y an\u00e1lisis t\u00e9cnico.",
        detail: "Trabajo de campo, mantenimiento y garant\u00edas centrado en soporte no confidencial de se\u00f1alizaci\u00f3n embarcada y an\u00e1lisis t\u00e9cnico."
      }
    },
    {
      key: "valencia",
      parentKey: "spain",
      coordinates: [39.4699, -0.3763],
      label: "VL",
      en: {
        location: "Valencia, Spain",
        project: "FGV Valencia",
        year: "2013 - 2016",
        technology: "Onboard railway signalling systems.",
        role: "Field support and project assignment related to onboard railway systems.",
        detail: "Non-confidential field support for onboard railway systems in a regional railway context."
      },
      es: {
        location: "Valencia, Espa\u00f1a",
        project: "FGV Valencia",
        year: "2013 - 2016",
        technology: "Sistemas ferroviarios de se\u00f1alizaci\u00f3n embarcada.",
        role: "Soporte de campo y asignaci\u00f3n de proyecto relacionada con sistemas ferroviarios embarcados.",
        detail: "Soporte de campo no confidencial para sistemas ferroviarios embarcados en un contexto ferroviario regional."
      }
    },
    {
      key: "cataluna",
      parentKey: "spain",
      coordinates: [41.5912, 1.5209],
      label: "CT",
      en: {
        location: "Catalu\u00f1a, Spain",
        project: "FGC Catalu\u00f1a",
        year: "2022",
        technology: "Railway systems training support.",
        role: "Training / technical support assignment.",
        detail: "Technical support and training activities related to railway systems."
      },
      es: {
        location: "Catalu\u00f1a, Espa\u00f1a",
        project: "FGC Catalu\u00f1a",
        year: "2022",
        technology: "Soporte de formaci\u00f3n en sistemas ferroviarios.",
        role: "Asignaci\u00f3n de formaci\u00f3n / soporte t\u00e9cnico.",
        detail: "Actividades de soporte t\u00e9cnico y formaci\u00f3n relacionadas con sistemas ferroviarios."
      }
    },
    {
      key: "caracas",
      coordinates: [10.4806, -66.9036],
      label: "CC",
      en: {
        location: "Caracas, Venezuela",
        project: "CAMETRO Line 1",
        year: "2011 - 2012",
        technology: "Metro onboard systems.",
        role: "On-site commissioning activities for CAMETRO Line 1 onboard systems.",
        detail: "Commissioning support performed on site for metro onboard systems."
      },
      es: {
        location: "Caracas, Venezuela",
        project: "CAMETRO L\u00ednea 1",
        year: "2011 - 2012",
        technology: "Sistemas embarcados de metro.",
        role: "Actividades in situ de puesta en servicio para los sistemas embarcados de CAMETRO L\u00ednea 1.",
        detail: "Soporte de puesta en servicio realizado en campo para sistemas embarcados de metro."
      }
    },
    {
      key: "istanbul",
      coordinates: [41.0082, 28.9784],
      label: "IS",
      en: {
        location: "Istanbul, Turkey",
        project: "Marmaray",
        year: "2014",
        technology: "Railway onboard systems.",
        role: "On-site commissioning support for Marmaray railway project.",
        detail: "Commissioning support for railway onboard systems during project execution."
      },
      es: {
        location: "Estambul, Turqu\u00eda",
        project: "Marmaray",
        year: "2014",
        technology: "Sistemas ferroviarios embarcados.",
        role: "Soporte in situ de puesta en servicio para el proyecto ferroviario Marmaray.",
        detail: "Soporte de puesta en servicio para sistemas ferroviarios embarcados durante la ejecuci\u00f3n del proyecto."
      }
    },
    {
      key: "riyadh",
      coordinates: [24.7136, 46.6753],
      label: "RY",
      en: {
        location: "Riyadh, Saudi Arabia",
        project: "HSR Push-Pull",
        year: "2015",
        technology: "High-speed railway onboard systems.",
        role: "On-site project execution support for HSR Push-Pull railway project.",
        detail: "On-site execution support for high-speed onboard systems."
      },
      es: {
        location: "Riad, Arabia Saud\u00ed",
        project: "HSR Push-Pull",
        year: "2015",
        technology: "Sistemas embarcados de alta velocidad.",
        role: "Soporte in situ a la ejecuci\u00f3n del proyecto ferroviario HSR Push-Pull.",
        detail: "Soporte de ejecuci\u00f3n en campo para sistemas embarcados de alta velocidad."
      }
    },
    {
      key: "singapore-dtl1",
      parentKey: "singapore",
      coordinates: [1.3521, 103.8198],
      label: "D1",
      en: {
        location: "Singapore",
        project: "Downtown Line 1",
        year: "2013",
        technology: "CBTC / onboard signalling.",
        role: "On-site testing and commissioning activities for Downtown Line 1.",
        detail: "Testing and commissioning work for CBTC onboard signalling."
      },
      es: {
        location: "Singapur",
        project: "Downtown Line 1",
        year: "2013",
        technology: "CBTC / se\u00f1alizaci\u00f3n embarcada.",
        role: "Actividades in situ de pruebas y puesta en servicio para Downtown Line 1.",
        detail: "Trabajo de pruebas y puesta en servicio para se\u00f1alizaci\u00f3n embarcada CBTC."
      }
    },
    {
      key: "singapore-dtl3",
      parentKey: "singapore",
      coordinates: [1.3147, 103.8927],
      label: "D3",
      en: {
        location: "Singapore",
        project: "Downtown Line 3",
        year: "2017",
        technology: "CBTC / onboard signalling.",
        role: "On-site testing and commissioning activities for Downtown Line 3.",
        detail: "Testing and commissioning work for CBTC onboard signalling."
      },
      es: {
        location: "Singapur",
        project: "Downtown Line 3",
        year: "2017",
        technology: "CBTC / se\u00f1alizaci\u00f3n embarcada.",
        role: "Actividades in situ de pruebas y puesta en servicio para Downtown Line 3.",
        detail: "Trabajo de pruebas y puesta en servicio para se\u00f1alizaci\u00f3n embarcada CBTC."
      }
    },
    {
      key: "changsha",
      coordinates: [28.2282, 112.9388],
      label: "CS",
      en: {
        location: "Changsha, China",
        project: "Metro Line 2",
        year: "2019",
        technology: "CBTC onboard equipment.",
        role: "On-site maintenance engineering support and technical training for CBTC onboard equipment maintainers.",
        detail: "Maintenance engineering support and technical training for CBTC onboard equipment maintainers."
      },
      es: {
        location: "Changsha, China",
        project: "Metro L\u00ednea 2",
        year: "2019",
        technology: "Equipos embarcados CBTC.",
        role: "Soporte in situ de ingenier\u00eda de mantenimiento y formaci\u00f3n t\u00e9cnica para mantenedores de equipos embarcados CBTC.",
        detail: "Soporte de ingenier\u00eda de mantenimiento y formaci\u00f3n t\u00e9cnica para mantenedores de equipos embarcados CBTC."
      }
    }
  ];

  var assignmentListKeys = [
    "spain",
    "caracas",
    "istanbul",
    "riyadh",
    "singapore-dtl1",
    "singapore-dtl3",
    "changsha"
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
        summary: "Digital Services department set-up, IRIS/OMNES fleet monitoring visualisation and project-control governance.",
        bullets: [
          "Collaborated in the creation and deployment of Digital Services activities within Siemens Mobility, supporting department set-up, operating model and reporting definition.",
          "Participated in the original definition of IRIS, the fleet-monitoring visualisation tool integrated into OMNES, focused on train fleet, project/line and onboard equipment status control.",
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
        summary: "Puesta en marcha del departamento Digital Services, visualizaci\u00f3n de flota IRIS/OMNES y control de proyecto.",
        bullets: [
          "Colaboraci\u00f3n en la creaci\u00f3n y despliegue de actividades de Digital Services en Siemens Mobility, apoyando la definici\u00f3n del departamento, modelo operativo y reporting.",
          "Participaci\u00f3n en la definici\u00f3n original de IRIS, herramienta de visualizaci\u00f3n de monitorizaci\u00f3n de flota integrada en OMNES, orientada al control de trenes, proyectos/l\u00edneas y equipos embarcados.",
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
        journey: "Journey",
        expertise: "Expertise",
        map: "Map",
        contact: "Contact"
      },
      hero: {
        eyebrow: "Interactive Railway Systems Portfolio",
        title: "Railway Systems Engineer \u00b7 Onboard Signalling \u00b7 Technical Warranty Manager",
        subtitle: "Computer Engineer with 17+ years at Siemens Mobility, focused on onboard railway systems, signalling, testing and commissioning, maintenance engineering, technical warranty management, incident analysis, JRU/onboard log analysis and digital workflow automation.",
        actionsLabel: "Primary actions",
        mapButton: "View Project Map",
        contactButton: "Contact"
      },
      figures: {
        eyebrow: "Key figures",
        title: "Railway experience at a glance",
        cards: [
          { value: "17+ years", label: "Siemens Mobility railway systems experience" },
          { value: "8+ years", label: "Project Execution / Testing & Commissioning" },
          { value: "5+ years", label: "Maintenance Engineer / Service Engineer" },
          { value: "Current role", label: "Technical Warranty Manager for Renfe onboard signalling contracts" }
        ]
      },
      expertise: {
        eyebrow: "Core expertise",
        title: "Onboard systems, technical warranty and digitalisation",
        subtitle: "A field-based railway systems profile combining testing and commissioning, maintenance engineering, technical warranty management, customer-facing technical analysis and data-driven workflow control.",
        dashboardLabel: "Railway expertise control dashboard",
        kpis: [
          { value: "17+ years", label: "Railway systems experience" },
          { value: "5", label: "Signalling technologies" },
          { value: "8", label: "Technical capabilities" },
          { value: "9", label: "Tools & digital platforms" }
        ],
        experienceLabels: {
          core: "Core expertise",
          applied: "Applied experience",
          solid: "Solid experience"
        },
        cards: [
          { title: "Onboard Signalling Technologies" },
          {
            title: "Key Technical Capabilities",
            items: [
              "JRU / onboard log analysis",
              "Incident analysis",
              "Root cause / failure categorisation",
              "Maintenance engineering",
              "Testing & commissioning",
              "Warranty management",
              "Repair and spare parts workflow",
              "Customer technical meetings"
            ]
          },
          {
            title: "Frameworks & Standards",
            items: [
              "ADIF ASFA technical specification",
              "Warranty contractual assessment",
              "Reliability / MTBF assessment"
            ]
          },
          { title: "Tools & Digitalisation" }
        ],
        focusBar: "Focus: safety \u00b7 reliability \u00b7 compliance \u00b7 operational efficiency \u00b7 data-driven decisions"
      },
      map: {
        eyebrow: "International assignments",
        title: "On-site Railway Project Assignments",
        subtitle: "Field project assignments across national railway, metro and international onboard signalling programmes.",
        note: "OpenStreetMap tiles, Leaflet.js and non-confidential project summaries.",
        mapLabel: "Interactive world map with project assignments",
        panelLabel: "Project assignment list",
        assignmentsTitle: "Assignments",
        resetButton: "Reset map",
        fallback: "Map library unavailable. Project assignments remain listed beside the map.",
        assignmentButtonPrefix: "Open assignment",
        groupButtonPrefix: "Zoom into assignment area",
        labels: {
          location: "Location",
          project: "Project",
          year: "Year",
          technology: "Technology / context",
          role: "Role",
          detail: "Detail"
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
        copy: "Endurance running and marathon preparation have reinforced the same principles I apply professionally: discipline, consistency, structured progress and resilience under demanding conditions. I am currently rebuilding endurance fitness after becoming a father, balancing family, work and future long-distance challenges.",
        cards: [
          {
            label: "Marathon experience",
            text: "Completed marathon-distance challenges requiring structured preparation, consistency and long-term focus."
          },
          {
            label: "Long-term endurance goals",
            text: "Continuous improvement mindset applied through progressive endurance training and measurable objectives."
          },
          {
            label: "Discipline and consistency",
            text: "Training habits based on planning, repetition and resilience, aligned with the same approach used in technical project work."
          }
        ],
        activities: {
          title: "Selected activities",
          intro: "Selected endurance activities that reflect discipline, structured preparation and consistency over time.",
          linkLabel: "View on Strava",
          items: [
            {
              title: "Madrid Marathon",
              distance: "Marathon distance"
            },
            {
              title: "Barcelona Marathon",
              distance: "Marathon distance"
            }
          ]
        }
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
          "IBM Maximo Administrator Training",
          "Qlik Sense / NPrinting training",
          "PM@ Siemens Project Management Career"
        ]
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
          portfolio: "Portfolio"
        },
        values: {
          location: "Madrid, Spain"
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
        journey: "Trayectoria",
        expertise: "Especializaci\u00f3n",
        map: "Mapa",
        contact: "Contacto"
      },
      hero: {
        eyebrow: "Portfolio interactivo de sistemas ferroviarios",
        title: "Ingeniero de Sistemas Ferroviarios \u00b7 Se\u00f1alizaci\u00f3n Embarcada \u00b7 Responsable T\u00e9cnico de Garant\u00edas",
        subtitle: "Ingeniero de Computadores con m\u00e1s de 17 a\u00f1os en Siemens Mobility, centrado en sistemas ferroviarios embarcados, se\u00f1alizaci\u00f3n, pruebas y puesta en servicio, ingenier\u00eda de mantenimiento, gesti\u00f3n t\u00e9cnica de garant\u00edas, an\u00e1lisis de incidencias, an\u00e1lisis de registros JRU / logs embarcados y automatizaci\u00f3n de flujos digitales.",
        actionsLabel: "Acciones principales",
        mapButton: "Ver mapa de proyectos",
        contactButton: "Contacto"
      },
      figures: {
        eyebrow: "Indicadores clave",
        title: "Experiencia ferroviaria de un vistazo",
        cards: [
          { value: "17+ a\u00f1os", label: "Experiencia en sistemas ferroviarios en Siemens Mobility" },
          { value: "8+ a\u00f1os", label: "Ejecuci\u00f3n de proyectos / puesta en servicio" },
          { value: "5+ a\u00f1os", label: "Ingenier\u00eda de mantenimiento / service engineering" },
          { value: "Puesto actual", label: "Responsable t\u00e9cnico de garant\u00edas para contratos de se\u00f1alizaci\u00f3n embarcada Renfe" }
        ]
      },
      expertise: {
        eyebrow: "Especializaci\u00f3n",
        title: "Sistemas embarcados, gesti\u00f3n t\u00e9cnica de garant\u00edas y digitalizaci\u00f3n",
        subtitle: "Perfil t\u00e9cnico ferroviario desarrollado en campo, combinando puesta en servicio, ingenier\u00eda de mantenimiento, gesti\u00f3n de garant\u00edas, an\u00e1lisis t\u00e9cnico con cliente y digitalizaci\u00f3n de flujos basada en datos.",
        dashboardLabel: "Dashboard de control de especializaci\u00f3n ferroviaria",
        kpis: [
          { value: "17+ a\u00f1os", label: "Experiencia en sistemas ferroviarios" },
          { value: "5", label: "Tecnolog\u00edas de se\u00f1alizaci\u00f3n" },
          { value: "8", label: "Capacidades t\u00e9cnicas" },
          { value: "9", label: "Herramientas y plataformas digitales" }
        ],
        experienceLabels: {
          core: "Experiencia principal",
          applied: "Experiencia aplicada",
          solid: "Experiencia consolidada"
        },
        cards: [
          { title: "Tecnolog\u00edas de Se\u00f1alizaci\u00f3n Embarcada" },
          {
            title: "Capacidades t\u00e9cnicas clave",
            items: [
              "An\u00e1lisis de registros JRU / logs embarcados",
              "An\u00e1lisis de incidencias",
              "An\u00e1lisis de causa ra\u00edz y categorizaci\u00f3n de fallos",
              "Ingenier\u00eda de Mantenimiento",
              "Pruebas y puesta en servicio",
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
        ],
        focusBar: "Enfoque: seguridad \u00b7 fiabilidad \u00b7 cumplimiento \u00b7 eficiencia operativa \u00b7 decisiones basadas en datos"
      },
      map: {
        eyebrow: "Proyectos internacionales",
        title: "Proyectos ferroviarios realizados in situ",
        subtitle: "Asignaciones de campo en proyectos ferroviarios nacionales, metro y programas internacionales de se\u00f1alizaci\u00f3n embarcada.",
        note: "Teselas de OpenStreetMap, Leaflet.js y res\u00famenes no confidenciales de proyecto.",
        mapLabel: "Mapa mundial interactivo con proyectos ferroviarios",
        panelLabel: "Lista de proyectos ferroviarios",
        assignmentsTitle: "Proyectos",
        resetButton: "Restablecer mapa",
        fallback: "La librer\u00eda del mapa no est\u00e1 disponible. Los proyectos siguen listados junto al mapa.",
        assignmentButtonPrefix: "Abrir proyecto",
        groupButtonPrefix: "Ampliar zona de proyectos",
        labels: {
          location: "Ubicaci\u00f3n",
          project: "Proyecto",
          year: "A\u00f1o",
          technology: "Tecnolog\u00eda / contexto",
          role: "Rol",
          detail: "Detalle"
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
        copy: "La carrera de resistencia y la preparaci\u00f3n de maratones refuerzan los mismos principios que aplico profesionalmente: disciplina, constancia, progreso estructurado y resiliencia en condiciones exigentes. Actualmente estoy recuperando forma deportiva tras la paternidad, compaginando familia, trabajo y futuros retos de mayor distancia.",
        cards: [
          {
            label: "Experiencia en marat\u00f3n",
            text: "Retos de distancia marat\u00f3n completados mediante preparaci\u00f3n estructurada, constancia y enfoque a largo plazo."
          },
          {
            label: "Objetivos de resistencia",
            text: "Mentalidad de mejora continua aplicada mediante entrenamiento progresivo y objetivos medibles."
          },
          {
            label: "Disciplina y constancia",
            text: "H\u00e1bitos basados en planificaci\u00f3n, repetici\u00f3n y resiliencia, alineados con mi forma de trabajar en proyectos t\u00e9cnicos."
          }
        ],
        activities: {
          title: "Actividades destacadas",
          intro: "Actividades de resistencia seleccionadas que reflejan disciplina, preparaci\u00f3n estructurada y constancia en el tiempo.",
          linkLabel: "Ver en Strava",
          items: [
            {
              title: "Marat\u00f3n de Madrid",
              distance: "Distancia marat\u00f3n"
            },
            {
              title: "Marat\u00f3n de Barcelona",
              distance: "Distancia marat\u00f3n"
            }
          ]
        }
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
          "Formaci\u00f3n de administrador IBM Maximo",
          "Formaci\u00f3n Qlik Sense / NPrinting",
          "PM@ Siemens Project Management Career"
        ]
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
          portfolio: "Portfolio"
        },
        values: {
          location: "Madrid, Espa\u00f1a"
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

  function findByKey(collection, key) {
    for (var index = 0; index < collection.length; index += 1) {
      if (collection[index].key === key) {
        return collection[index];
      }
    }

    return null;
  }

  function getGroup(key) {
    var group = findByKey(assignmentGroups, key);
    var content = group && (group[currentLanguage] || group.en);

    if (!group || !content) {
      return null;
    }

    return {
      type: "group",
      key: group.key,
      coordinates: group.coordinates,
      zoom: group.zoom,
      children: group.children,
      label: group.label,
      location: content.location,
      project: content.project,
      year: content.year
    };
  }

  function getFinalAssignment(key) {
    var assignment = findByKey(finalAssignments, key);
    var content = assignment && (assignment[currentLanguage] || assignment.en);

    if (!assignment || !content) {
      return null;
    }

    return {
      type: "assignment",
      key: assignment.key,
      parentKey: assignment.parentKey || "",
      coordinates: assignment.coordinates,
      label: assignment.label,
      location: content.location,
      project: content.project,
      year: content.year,
      technology: content.technology,
      role: content.role,
      detail: content.detail
    };
  }

  function getListItem(key) {
    return getGroup(key) || getFinalAssignment(key);
  }

  function getVisibleMapItems() {
    var items = [];

    assignmentGroups.forEach(function (group) {
      if (!revealedGroups[group.key]) {
        items.push(getGroup(group.key));
      }
    });

    finalAssignments.forEach(function (assignment) {
      if (!assignment.parentKey || revealedGroups[assignment.parentKey]) {
        items.push(getFinalAssignment(assignment.key));
      }
    });

    return items.filter(Boolean);
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
    renderMapMarkers();
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
      '<div class="map-popup-content">',
      "<dl>",
      "<dt>" + escapeHtml(labels.location) + "</dt><dd>" + escapeHtml(assignment.location) + "</dd>",
      "<dt>" + escapeHtml(labels.project) + "</dt><dd>" + escapeHtml(assignment.project) + "</dd>",
      "<dt>" + escapeHtml(labels.year) + "</dt><dd>" + escapeHtml(assignment.year) + "</dd>",
      "<dt>" + escapeHtml(labels.technology) + "</dt><dd>" + escapeHtml(assignment.technology) + "</dd>",
      "<dt>" + escapeHtml(labels.role) + "</dt><dd>" + escapeHtml(assignment.role) + "</dd>",
      "<dt>" + escapeHtml(labels.detail) + "</dt><dd>" + escapeHtml(assignment.detail) + "</dd>",
      "</dl>",
      "</div>",
      "</div>"
    ].join("");
  }

  function createMarkerIcon(label, type) {
    var size = type === "group" ? 40 : 34;

    return window.L.divIcon({
      className: "portfolio-marker portfolio-marker-" + type,
      html: '<span class="portfolio-marker-pin"><em>' + escapeHtml(label) + "</em></span>",
      iconSize: [size, size],
      iconAnchor: [size / 2, size],
      popupAnchor: [0, -(size - 4)]
    });
  }

  function clearMapMarkers() {
    Object.keys(mapMarkers).forEach(function (key) {
      if (assignmentMap && mapMarkers[key]) {
        assignmentMap.removeLayer(mapMarkers[key]);
      }
    });

    mapMarkers = {};
  }

  function renderMapMarkers() {
    if (!assignmentMap || !window.L) {
      return;
    }

    clearMapMarkers();

    getVisibleMapItems().forEach(function (item) {
      var marker = window.L.marker(item.coordinates, {
        icon: createMarkerIcon(item.label, item.type),
        title: item.location
      }).addTo(assignmentMap);

      if (item.type === "group") {
        marker.on("click", function () {
          revealGroup(item.key, true);
        });
      } else {
        marker.bindPopup(renderPopup(item), {
          maxWidth: 340
        });

        marker.on("click", function () {
          setActiveAssignment(item.key);
        });

        marker.on("popupopen", function () {
          setActiveAssignment(item.key);
        });
      }

      mapMarkers[item.key] = marker;
    });
  }

  function fitInitialMap() {
    if (!assignmentMap || !window.L) {
      return;
    }

    var coordinates = assignmentGroups.map(function (group) {
      return group.coordinates;
    }).concat(finalAssignments.filter(function (assignment) {
      return !assignment.parentKey;
    }).map(function (assignment) {
      return assignment.coordinates;
    }));

    assignmentMap.fitBounds(window.L.latLngBounds(coordinates), {
      padding: [36, 36],
      maxZoom: 4
    });
  }

  function renderAssignmentList() {
    var list = document.getElementById("assignment-list");

    if (!list) {
      return;
    }

    list.innerHTML = "";

    assignmentListKeys.forEach(function (key) {
      var assignment = getListItem(key);
      var button = document.createElement("button");

      if (!assignment) {
        return;
      }

      button.className = "assignment-button" + (assignment.type === "group" ? " assignment-button-group" : "");
      button.type = "button";
      button.setAttribute("data-assignment-key", assignment.key);
      button.setAttribute("aria-label", getValue(assignment.type === "group" ? "map.groupButtonPrefix" : "map.assignmentButtonPrefix") + ": " + assignment.project);
      button.innerHTML = [
        "<strong>" + escapeHtml(assignment.project) + "</strong>",
        '<span class="assignment-meta">' + escapeHtml(assignment.location) + " \u00b7 " + escapeHtml(assignment.year) + "</span>"
      ].join("");

      button.addEventListener("click", function () {
        if (assignment.type === "group") {
          revealGroup(assignment.key, true);
        } else {
          openAssignment(assignment.key);
        }
      });

      list.appendChild(button);
    });

    setActiveAssignment(activeAssignmentKey);
  }

  function setActiveAssignment(key) {
    activeAssignmentKey = key;

    document.querySelectorAll(".assignment-button").forEach(function (button) {
      var isActive = button.getAttribute("data-assignment-key") === key;
      button.classList.toggle("is-active", isActive);
    });
  }

  function revealGroup(key, shouldFly) {
    var group = getGroup(key);

    if (!group) {
      return;
    }

    revealedGroups[key] = true;
    setActiveAssignment(key);
    renderMapMarkers();

    if (assignmentMap && shouldFly) {
      assignmentMap.flyTo(group.coordinates, group.zoom, { duration: 0.65 });
    }
  }

  function openAssignment(key) {
    var assignment = getFinalAssignment(key);

    if (!assignment || !assignmentMap) {
      return;
    }

    if (assignment.parentKey && !revealedGroups[assignment.parentKey]) {
      revealedGroups[assignment.parentKey] = true;
      renderMapMarkers();
    }

    setActiveAssignment(key);
    assignmentMap.flyTo(assignment.coordinates, assignment.parentKey === "singapore" ? 12 : 7, { duration: 0.65 });

    setTimeout(function () {
      if (mapMarkers[key]) {
        mapMarkers[key].openPopup();
      }
    }, 260);
  }

  function resetAssignmentMap() {
    revealedGroups = {};
    activeAssignmentKey = "spain";
    renderMapMarkers();
    fitInitialMap();
    setActiveAssignment(activeAssignmentKey);
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

    renderMapMarkers();
    fitInitialMap();

    setTimeout(function () {
      assignmentMap.invalidateSize();
    }, 100);

    renderAssignmentList();
    setActiveAssignment(activeAssignmentKey);

    if (resetMapButton) {
      resetMapButton.addEventListener("click", resetAssignmentMap);
    }
  }

  function getJourneyCardOrder() {
    var currentIndexes = [];
    var previousIndexes = [];

    journeyStations.forEach(function (station, index) {
      if (station.current) {
        currentIndexes.push(index);
      } else {
        previousIndexes.push(index);
      }
    });

    return currentIndexes.concat(previousIndexes.reverse());
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
      var isActive = index === activeJourneyIndex;
      var stationClasses = ["station-button"];
      var stationBadge = content.current ? '<span class="station-badge">' + escapeHtml(getValue("journey.currentLabel")) + "</span>" : "";

      if (content.current) {
        stationClasses.push("is-current");
      }

      if (isActive) {
        stationClasses.push("is-active");
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
        stationBadge,
        "</span>"
      ].join("");

      stationButton.addEventListener("click", function () {
        setActiveJourney(index, true);
      });

      rail.appendChild(stationButton);
    });

    getJourneyCardOrder().forEach(function (index) {
      var content = getJourneyStation(index);
      var card = document.createElement("article");
      var isActive = index === activeJourneyIndex;
      var cardClasses = ["journey-card"];
      var bullets = content.bullets.map(function (item) {
        return "<li>" + escapeHtml(item) + "</li>";
      }).join("");
      var currentBadge = content.current ? '<span class="role-badge">' + escapeHtml(getValue("journey.currentLabel")) + "</span>" : "";

      if (content.current) {
        cardClasses.push("is-current");
      }

      if (isActive) {
        cardClasses.push("is-active");
      }

      card.id = "journey-card-" + index;
      card.className = cardClasses.join(" ");
      card.setAttribute("data-journey-index", String(index));
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
      card.classList.toggle("is-active", Number(card.getAttribute("data-journey-index")) === index);
    });

    var activeCard = document.getElementById("journey-card-" + index);

    if (shouldFocus && activeCard) {
      activeCard.focus({ preventScroll: true });
      activeCard.scrollIntoView({ behavior: behavior, block: "center" });
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
