import html2canvas from "html2canvas";

/**
 * Utility function to download a chart as an image.
 * @param {HTMLElement} chartElement - The DOM element to capture.
 * @param {string} fileName - The name of the downloaded file.
 */
export const downloadChartAsImage = (chartElement, fileName) => {
  if (!chartElement) {
    console.error("Chart element not found for screenshot");
    return;
  }

  html2canvas(chartElement, {
    useCORS: true, // For external images like icons, etc.
    scale: 3, // Increase this value for higher resolution
    scrollX: 0,
    scrollY: -window.scrollY, // Adjust for page scrolling
    width: chartElement.offsetWidth,
    height: chartElement.offsetHeight,
  })
    .then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/jpeg", 1.0); // Convert to JPEG image with quality 1.0 (100%)
      link.download = fileName; // Name of the downloaded file
      link.click(); // Trigger the download
    })
    .catch((error) => {
      console.error("Error during html2canvas rendering:", error);
    });
};



