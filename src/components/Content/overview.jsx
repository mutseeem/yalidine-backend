import React from 'react';
import styles from './Content.module.css';
import CollapsibleSection from './CollapsibleSection'; // Import the CollapsibleSection component

const Overview = () => {
  return (
    <div className={styles.content}>
      <h1>Domaine D7 | Coopération Internationale</h1>

      {/* General Insights Section */}
      <div className={styles.insightsSection}>
        <h2>Nombre de questions répondues</h2>
        <div className={styles.insightsGrid}>
          {/* Field 1 */}
          <div className={styles.insightCard}>
            <h3>Champ 1</h3>
            <p>Réponses: 5/10</p>
            <div className={styles.progressBar}>
              <div className={styles.progress} style={{ width: '50%' }}></div>
            </div>
          </div>

          {/* Field 2 */}
          <div className={styles.insightCard}>
            <h3>Champ 2</h3>
            <p>Réponses: 3/9</p>
            <div className={styles.progressBar}>
              <div className={styles.progress} style={{ width: '33%' }}></div>
            </div>
          </div>

          {/* Field 3 */}
          <div className={styles.insightCard}>
            <h3>Champ 3</h3>
            <p>Réponses: 11/11</p>
            <div className={styles.progressBar}>
              <div className={styles.progress} style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Insights Section with Collapsible Sections */}
      <div className={styles.detailedInsights}>
        <h2>Vue d'ensemble par champ</h2>

        {/* Collapsible Section for Champ C1 */}
        <CollapsibleSection title="Champ C1 : Politique d'ouverture internationale">
          <div className={styles.fieldDetails}>
            <p>Réponses: 5/10</p>
            <div className={styles.progressBar}>
              <div className={styles.progress} style={{ width: '50%' }}></div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Collapsible Section for Champ C2 */}
        <CollapsibleSection title="Champ C2 : Partenariat et mobilité">
          <div className={styles.fieldDetails}>
            <p>Réponses: 3/9</p>
            <div className={styles.progressBar}>
              <div className={styles.progress} style={{ width: '33%' }}></div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Collapsible Section for Champ C3 */}
        <CollapsibleSection title="Champ C3 : Échange de connaissances et mutualisation des ressources">
          <div className={styles.fieldDetails}>
            <p>Réponses: 11/11</p>
            <div className={styles.progressBar}>
              <div className={styles.progress} style={{ width: '100%' }}></div>
            </div>
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
};

export default Overview;