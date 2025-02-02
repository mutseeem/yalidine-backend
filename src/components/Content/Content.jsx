import React from 'react';
import CollapsibleSection from './CollapsibleSection';
import Subsection from './Subsection';
import styles from './Content.module.css';

        // this here is just a placeholder for the prototype in the future it'll be modified to be more optimal and dynamic Insha Allah

        // first the consts are just bunch of data forms Files and graphs just static as tester
export default function Content() {
  const files = [
    {
      name: 'Document décrivant la stratégie',
      size: '2.7 MB',
      url: '/path/to/document.pdf',
    },
    {
      name: 'Plan d’actions 5 (Unavailable)',
      size: '2.7 MB',
      url: '/path/to/plan.pdf',
    },
    {
      name: 'Liste des axes de la stratégie intégrant le contacte international',
      size: '1.6 MB',
      url: '/path/to/liste.pdf',
    },
  ];

  const graphs = [
    {
      title: 'Nombre de contrats, conventions et projets',
      type: 'bar', // Changed from 'table' to 'bar'
      data: {
        labels: ['2021', '2022', '2023'], // X-axis labels
        datasets: [
          {
            label: 'Contrats',
            data: [30, 25, 20], // Y-axis data
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'Conventions',
            data: [15, 20, 25],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
          },
          {
            label: 'Projets',
            data: [10, 15, 30],
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
          },
        ],
      },
    },
    {
      title: "Nombre d'académies chercheurs visiteurs entamis et actuants",
      type: 'line', // Changed from 'table' to 'line'
      data: {
        labels: ['2021', '2022'], // X-axis labels
        datasets: [
          {
            label: 'Montages électeurs',
            data: [30, 15], // Y-axis data
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
          },
          {
            label: 'Montages intervenus',
            data: [20, 5],
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
          },
          {
            label: 'Épreuves demandeurs',
            data: [10, 25],
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 2,
          },
        ],
      },
    },
  ];

  return (
    <div className={styles.content}>
      <CollapsibleSection title="Généralités">
        <Subsection title="Annonces" files={files} graphs={graphs} />
      </CollapsibleSection>

      <CollapsibleSection title="Another Section">
        <Subsection title="Subsection 1" files={files} graphs={graphs} />
        <Subsection title="Subsection 2" files={files} graphs={graphs} />
      </CollapsibleSection>
    </div>
  );
}