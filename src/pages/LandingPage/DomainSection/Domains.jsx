import React from 'react';
import styles from './Domains.module.css';
import DomainCard from './DomainCard'; // Import the reusable DomainCard component

const Domains = () => {
  const domainsData = [
    {
      color: '#3498db',
      name: 'DOMAIN 1',
      number: '1',
      icon: <i className="fas fa-globe" />,
      description: 'Relations avec l’environnement sociécoéconomique.',
    },
    {
      color: '#e74c3c',
      name: 'DOMAIN 2',
      number: '2',
      icon: <i className="fas fa-users" />,
      description: 'Gestion des ressources humaines et optimisation.',
    },
    {
      color: '#2ecc71',
      name: 'DOMAIN 3',
      number: '3',
      icon: <i className="fas fa-chart-line" />,
      description: 'Analyse financière et budgétaire stratégique.',
    },
    {
      color: '#f1c40f',
      name: 'DOMAIN 4',
      number: '4',
      icon: <i className="fas fa-cogs" />,
      description: 'Infrastructure et technologies de l’information.',
    },
    {
      color: '#9b59b6',
      name: 'DOMAIN 5',
      number: '5',
      icon: <i className="fas fa-balance-scale" />,
      description: 'Conformité réglementaire et juridique.',
    },
    {
      color: '#34495e',
      name: 'DOMAIN 6',
      number: '6',
      icon: <i className="fas fa-globe" />,
      description: 'Relations avec l’environnement sociécoéconomique.',
    },
    {
      color: '#e67e22',
      name: 'DOMAIN 7',
      number: '7',
      icon: <i className="fas fa-users" />,
      description: 'Gestion des ressources humaines et optimisation.',
    },
    {
      color: '#95a5a6',
      name: 'DOMAIN 8',
      number: '8',
      icon: <i className="fas fa-chart-line" />,
      description: 'Analyse financière et budgétaire stratégique.',
    },
  ];

  return (
    <section className={styles.domainsSection}>
      {/* Title and Subtitle */}
      <h2 className={styles.title}>SERVICES</h2>
      <p className={styles.subtitle}>
        RNAQ-ESRS DOMAINS: Building a comprehensive framework for organizational excellence.
      </p>

      {/* First Row (Domains 1-4) */}
      <div className={styles.domainRow}>
        {domainsData.slice(0, 4).map((domain, index) => (
          <DomainCard
            key={`first-${index}`}
            color={domain.color}
            name={domain.name}
            number={domain.number}
            icon={domain.icon}
            description={domain.description}
          />
        ))}
      </div>

      {/* Second Row (Domains 5-8) */}
      <div className={styles.domainRow}>
        {domainsData.slice(4, 8).map((domain, index) => (
          <DomainCard
            key={`second-${index}`}
            color={domain.color}
            name={domain.name}
            number={domain.number}
            icon={domain.icon}
            description={domain.description}
          />
        ))}
      </div>
    </section>
  );
};

export default Domains;