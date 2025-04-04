import React from 'react';
import styles from './Content.module.css';
import CollapsibleSection from './CollapsibleSection';
import downloadIcon from '../../assets/icons/cloud-download-alt.svg';
import FaAngleDown from '../../assets/icons/angle-circle-down.svg';
import FaAngleRight from '../../assets/icons/angle-circle-right.svg';


const Overview = () => {
  return (
    <div className={styles.content}>
      <h1 className={styles.Title}></h1>

      {/* General Insights Section */}
      <div className={styles.insightsSection}>
        <div className={styles.tableContainer}>
          {/* Download Icon */}
          <div className={styles.downloadIcon}>
            <img src={downloadIcon} alt="Download Icon" style={{ width: '30px', height: '30px' }} />
          </div>
          <h2 className={styles.headTitle}>Nombre de questions répondues</h2>
          <h3 className={styles.underHead}>Par champ</h3>
          <table className={styles.insightsTable}>
            <thead>
              <tr>
                <th>Champ</th>
                <th>Réponses</th>
                <th>Progrès</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Champ 1</td>
                <td>5/10</td>
                <td>
                  <div className={styles.progressBar}>
                    <div className={styles.progress} style={{ width: '50%' }}></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Champ 2</td>
                <td>3/9</td>
                <td>
                  <div className={styles.progressBar}>
                    <div className={styles.progress} style={{ width: '33%' }}></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Champ 3</td>
                <td>11/11</td>
                <td>
                  <div className={styles.progressBar}>
                    <div className={styles.progress} style={{ width: '100%' }}></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
       
      </div>

      {/* Detailed Insights Section with Collapsible Sections */}
      <div className={styles.detailedInsights}>
        

        {/* Collapsible Section for Champ C1 */}
        <CollapsibleSection
          title="Champ C1 : Politique d'ouverture internationale"
          icon={<FaAngleRight />}
          indicator="5/10"
          category="category1"
        >
          <div className={styles.fieldDetails}>
            <p>Réponses: 5/10</p>
            <div className={styles.progressBar}>
              <div className={styles.progress} style={{ width: '50%' }}></div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Collapsible Section for Champ C2 */}
        <CollapsibleSection
          title="Champ C2 : Partenariat et mobilité"
          icon={<FaAngleRight />}
          indicator="3/9"
          category="category2"
        >
          <div className={styles.fieldDetails}>
            <p>Réponses: 3/9</p>
            <div className={styles.progressBar}>
              <div className={styles.progress} style={{ width: '33%' }}></div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Collapsible Section for Champ C3 */}
        <CollapsibleSection
          title="Champ C3 : Échange de connaissances et mutualisation des ressources"
          icon={<FaAngleRight />}
          indicator="11/11"
          category="category3"
        >
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