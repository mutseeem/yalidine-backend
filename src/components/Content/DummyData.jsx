export const chapterData = [
    {
      reference: "C1.1",
      referenceTitle: "L’établissement a une politique d’ouverture à l’international.",
      questions: [
        {
          questionId: "C1.1.2",
          questionCode: "C1.1.2",
          questionTitle: "Est-ce que la politique d'ouverture sur l'international est communiquée ?",
          status: "answered",
          questionAnswer: [
            {
              type: "DocumentType",
              title: "Plan de communication externe de la politique",
              description: "Stratégie de communication internationale",
              date: "2023-03-22",
              size: "2.1 MB",
              format: "PDF",
              url: "/documents/plan-communication.pdf"
            },
            {
              type: "ChartType",
              title: "Actions de sensibilisation",
              subTitle: "Activités menées durant les 3 dernières années (2022-2024)",
              chartData: {
                labels: ['2022', '2023', '2024'],
                datasets: [
                  {
                    label: 'Conférences internationales',
                    data: [5, 8, 12],
                    backgroundColor: '#3a0ca3',
                  },
                  {
                    label: 'Ateliers de sensibilisation',
                    data: [3, 7, 9],
                    backgroundColor: '#7209b7',
                  },
                  {
                    label: 'Événements culturels',
                    data: [2, 5, 8],
                    backgroundColor: '#f72585',
                  }
                ]
              },
              chartOptions: {
                plugins: {
                  title: {
                    display: true,
                    text: 'Activités de sensibilisation par année'
                  }
                }
              }
            }
          ]
        },
        {
          questionId: "C1.1.3",
          questionCode: "C1.1.3",
          questionTitle: "Est-ce que l’établissement propose les dispositifs techniques et organisationnels pour améliorer sa visibilité ?",
          status: "answered",
          questionAnswer: [
            {
              type: "DocumentType",
              title: "Dispositifs proposés pour améliorer cette visibilité",
              description: "Document décrivant les dispositifs techniques et organisationnels",
              date: "2024-01-10",
              size: "1.2 MB",
              format: "PDF",
              url: "/documents/dispositifs-visibilite.pdf"
            },
            {
              type: "DocumentType",
              title: "Plan d’actions de l’année en cours",
              description: "Document détaillant le plan d’actions actuel",
              date: "2024-02-15",
              size: "1.8 MB",
              format: "PDF",
              url: "/documents/plan-actions-2024.pdf"
            }
          ]
        }
      ]
    },
    {
      reference: "C1.2",
      referenceTitle: "L’établissement dispose d’une stratégie pour les activités de la recherche et de la formation, intégrant le contexte international",
      questions: [
        {
          questionId: "C1.2.1",
          questionCode: "C1.2.1",
          questionTitle: "Est-ce que l’établissement établit une stratégie en matière de recherche, de formation et de relations en fonction de l’environnement international ?",
          status: "answered",
          questionAnswer: [
            {
              type: "DocumentType",
              title: "Document décrivant la stratégie",
              description: "Stratégie de recherche, formation et relations internationales",
              date: "2024-01-05",
              size: "1.6 MB",
              format: "PDF",
              url: "/documents/strategie-recherche.pdf"
            },
            {
              type: "DocumentType",
              title: "Liste des axes de la stratégie intégrant le contexte international",
              description: "Axes prioritaires orientés vers l’international",
              date: "2024-01-07",
              size: "1.3 MB",
              format: "PDF",
              url: "/documents/axes-strategie.pdf"
            },
            {
              type: "DocumentType",
              title: "Plan d’actions de l’année en cours",
              description: "Détail du plan opérationnel basé sur la stratégie",
              date: "2024-02-10",
              size: "1.9 MB",
              format: "PDF",
              url: "/documents/plan-actions-strategie.pdf"
            }
          ]
        },
        {
          questionId: "C1.2.2",
          questionCode: "C1.2.2",
          questionTitle: "Est-ce que l’établissement met en œuvre les actions découlant de sa stratégie en matière de recherche, de formation et de relations en fonction de l’environnement international ?",
          status: "answered",
          questionAnswer: [
            {
              type: "ChartType",
              title: "Actions réalisées durant les 3 dernières années",
              subTitle: "Mise en œuvre de la stratégie (2022-2024)",
              chartData: {
                labels: ["2022", "2023", "2024"],
                datasets: [
                  {
                    label: "Actions réalisées",
                    data: [10, 15, 18],
                    backgroundColor: "#4cc9f0"
                  }
                ]
              },
              chartOptions: {
                plugins: {
                  title: {
                    display: true,
                    text: "Actions réalisées en lien avec la stratégie"
                  }
                }
              }
            },
            {
              type: "ChartType",
              title: "Nombre de contrats, de conventions et de projets signés",
              subTitle: "2022 - 2024",
              chartData: {
                labels: ["2022", "2023", "2024"],
                datasets: [
                  {
                    label: "Contrats & projets",
                    data: [7, 12, 14],
                    backgroundColor: "#4895ef"
                  }
                ]
              },
              chartOptions: {
                plugins: {
                  title: {
                    display: true,
                    text: "Contrats et projets signés"
                  }
                }
              }
            },
            {
              type: "ChartType",
              title: "Nombre d’enseignants chercheurs visiteurs (entrants/sortants)",
              subTitle: "Recherche et formation (2022-2024)",
              chartData: {
                labels: ["2022", "2023", "2024"],
                datasets: [
                  {
                    label: "Entrants",
                    data: [3, 5, 6],
                    backgroundColor: "#80ffdb"
                  },
                  {
                    label: "Sortants",
                    data: [2, 4, 5],
                    backgroundColor: "#64dfdf"
                  }
                ]
              },
              chartOptions: {
                plugins: {
                  title: {
                    display: true,
                    text: "Mobilité des enseignants chercheurs"
                  }
                }
              }
            },
            {
              type: "ChartType",
              title: "Nombre de visites de délégations étrangères",
              subTitle: "Présentielles et virtuelles (2022-2024)",
              chartData: {
                labels: ["2022", "2023", "2024"],
                datasets: [
                  {
                    label: "Visites",
                    data: [4, 6, 9],
                    backgroundColor: "#b5179e"
                  }
                ]
              },
              chartOptions: {
                plugins: {
                  title: {
                    display: true,
                    text: "Visites de délégations étrangères"
                  }
                }
              }
            },
            {
              type: "ChartType",
              title: "Taux de réalisation des objectifs",
              subTitle: "Évaluation sur 3 ans (2022-2024)",
              chartData: {
                labels: ["2022", "2023", "2024"],
                datasets: [
                  {
                    label: "Taux de réalisation (%)",
                    data: [70, 82, 90],
                    backgroundColor: "#00bbf9"
                  }
                ]
              },
              chartOptions: {
                plugins: {
                  title: {
                    display: true,
                    text: "Taux de réalisation des objectifs"
                  }
                }
              }
            }
          ]
        }
      ]
    },
    {
      reference: "C1.3",
      referenceTitle: "L’établissement dispose d’une politique de communication lui permettant d’améliorer sa visibilité à l’international.",
      questions: [
        {
          questionId: "C1.3.1",
          questionCode: "C1.3.1",
          questionTitle: "Est-ce que l’établissement dispose d’une politique de communication et assure une dissémination de la production scientifique ?",
          status: "answered",
          questionAnswer: [
            {
              type: "DocumentType",
              title: "Existence d’une entité de communication",
              description: "PV ou preuve de structure dédiée à la communication",
              date: "2024-01-10",
              size: "1.2 MB",
              format: "PDF",
              url: "/documents/entite-communication.pdf"
            },
            {
              type: "DocumentType",
              title: "Moyens mis à disposition",
              description: "Outils, supports et ressources pour la communication",
              date: "2024-02-15",
              size: "1.5 MB",
              format: "PDF",
              url: "/documents/moyens-communication.pdf"
            },
            {
              type: "DocumentType",
              title: "Plan de communication de l’année en cours",
              description: "Document stratégique pour la communication institutionnelle",
              date: "2024-03-01",
              size: "1.4 MB",
              format: "PDF",
              url: "/documents/plan-communication-2024.pdf"
            },
            {
              type: "DocumentType",
              title: "Moyens de dissémination de la production scientifique",
              description: "Supports, plateformes et canaux de diffusion",
              date: "2024-02-20",
              size: "1.3 MB",
              format: "PDF",
              url: "/documents/diffusion-scientifique.pdf"
            },
            {
              type: "ChartType",
              title: "Production scientifique diffusée durant les 3 dernières années",
              subTitle: "Années 2022 - 2024",
              chartData: {
                labels: ["2022", "2023", "2024"],
                datasets: [
                  {
                    label: "Publications",
                    data: [50, 65, 72],
                    backgroundColor: "#00b4d8"
                  }
                ]
              },
              chartOptions: {
                plugins: {
                  title: {
                    display: true,
                    text: "Diffusion de la production scientifique"
                  }
                }
              }
            },
            {
              type: "ChartType",
              title: "Nombre de revues scientifiques visibles",
              subTitle: "Revue par année (2022-2024)",
              chartData: {
                labels: ["2022", "2023", "2024"],
                datasets: [
                  {
                    label: "Revues",
                    data: [12, 15, 17],
                    backgroundColor: "#ff006e"
                  }
                ]
              },
              chartOptions: {
                plugins: {
                  title: {
                    display: true,
                    text: "Revues scientifiques indexées/visibles"
                  }
                }
              }
            },
            {
              type: "ChartType",
              title: "Nombre de chercheurs de l’établissement dans les publications internationales",
              subTitle: "2022 - 2024",
              chartData: {
                labels: ["2022", "2023", "2024"],
                datasets: [
                  {
                    label: "Chercheurs publiants",
                    data: [18, 21, 25],
                    backgroundColor: "#8338ec"
                  }
                ]
              },
              chartOptions: {
                plugins: {
                  title: {
                    display: true,
                    text: "Chercheurs publiants en international"
                  }
                }
              }
            },
            {
              type: "ChartType",
              title: "Nombre de chercheurs étrangers associés aux productions scientifiques",
              subTitle: "Collaborations internationales (2022-2024)",
              chartData: {
                labels: ["2022", "2023", "2024"],
                datasets: [
                  {
                    label: "Publications",
                    data: [5, 8, 10],
                    backgroundColor: "#3a0ca3"
                  },
                  {
                    label: "Livres",
                    data: [1, 2, 3],
                    backgroundColor: "#7209b7"
                  },
                  {
                    label: "Brevets",
                    data: [0, 1, 2],
                    backgroundColor: "#4361ee"
                  },
                  {
                    label: "Communications",
                    data: [3, 4, 6],
                    backgroundColor: "#f72585"
                  },
                  {
                    label: "Autres",
                    data: [2, 3, 5],
                    backgroundColor: "#4cc9f0"
                  }
                ]
              },
              chartOptions: {
                plugins: {
                  title: {
                    display: true,
                    text: "Chercheurs étrangers associés par type de production"
                  }
                }
              }
            }
          ]
        },
        {
          questionId: "C1.3.2",
          questionCode: "C1.3.2",
          questionTitle: "Est-ce que l’établissement est en réseau avec les partenaires internationaux ?",
          status: "answered",
          questionAnswer: [
            {
              type: "DocumentType",
              title: "Types de réseaux",
              description: "Document présentant les partenariats institutionnels",
              date: "2024-01-20",
              size: "1.2 MB",
              format: "PDF",
              url: "/documents/types-reseaux.pdf"
            },
            {
              type: "DocumentType",
              title: "Liste des événements internationaux organisés avec des partenaires",
              description: "Événements coorganisés (2022-2024)",
              date: "2024-02-18",
              size: "1.5 MB",
              format: "PDF",
              url: "/documents/evenements-internationaux.pdf"
            },
            {
              type: "DocumentType",
              title: "Site web actualisé multilingue",
              description: "Accès à la version multilingue du site",
              date: "2024-02-25",
              size: "1.6 MB",
              format: "PDF",
              url: "/documents/site-web-multilingue.pdf"
            },
            {
              type: "DocumentType",
              title: "Pages sur réseaux sociaux incluant des partenaires internationaux",
              description: "Exemples d’intégration des partenaires dans la communication",
              date: "2024-03-05",
              size: "1.4 MB",
              format: "PDF",
              url: "/documents/reseaux-sociaux-internationaux.pdf"
            },
            {
              type: "ChartType",
              title: "Évolution du partenariat international durant les 3 dernières années",
              subTitle: "Nombre de nouveaux partenariats signés (2022-2024)",
              chartData: {
                labels: ["2022", "2023", "2024"],
                datasets: [
                  {
                    label: "Partenariats",
                    data: [6, 9, 13],
                    backgroundColor: "#06d6a0"
                  }
                ]
              },
              chartOptions: {
                plugins: {
                  title: {
                    display: true,
                    text: "Croissance des partenariats internationaux"
                  }
                }
              }
            }
          ]
        }
      ]
    }
  ];