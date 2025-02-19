/**
 * useDownloadPDF
 *    - A custom hook that handles the process of fetching a PDF file using an API and downloading it to the user's device. It also manages loading and error states.
 * 
 * Expected behavior:
 *    1. Calls an API endpoint with a security key to fetch a PDF.
 *    2. If successful, it creates a downloadable link for the file and triggers the download.
 *    3. If the request fails, it sets an error message.
 *    4. isLoading is true during the fetch process and false once complete.
 *
 * @returns An object with:
 *    - downloadFile: A function that triggers the file download.
 *        - key (string): A security key required to fetch the PDF.
 *        - fileName (string): The name to save the downloaded file as.
 *    - isLoading: A boolean indicating whether the download is in progress.
 *    - error: A string representing an error message if the download fails (null if no error).
 *
 * @example
 * const { downloadFile, isLoading, error } = useDownloadPDF();
 * downloadFile('file-key', 'document.pdf');
 * 
 */

import { useApi } from './index';

export const useDownloadPDF = () => {
  const fetchPdfFunction = useApi(async (api) => {
    return (policyType: number) => api.webbackoffice.getPdf(policyType);
  }, []);

  const downloadFile = async (policyType: number) => {
    try {
      const fetchPdf = await fetchPdfFunction.execute();
      const response = await fetchPdf(policyType);

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `document_${policyType}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => URL.revokeObjectURL(url), 100);
    } catch (error) {
      console.error('Download failed!', error);
    }
  };

  return { downloadFile };
};

