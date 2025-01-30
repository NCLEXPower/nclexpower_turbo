/**
 * The useDownloadPDF hook handles the process of fetching a PDF file using an API and downloading it to the user's device. It also manages loading and error states.
 *
 * Expected behavior:
 *    1. Calls an API endpoint (https://api.example.com/get-pdf) with a security key to fetch a PDF.
 *    2. If successful, it creates a downloadable link for the file and triggers the download.
 *    3. If the request fails, it sets an error message.
 *    4. isLoading is true during the fetch process and false once complete.
 *
 * @returns An object with:
 *    - downloadFile: A function that triggers the file download.
 *    - isLoading: A boolean indicating whether the download is in progress.
 *    - error: A string representing an error message if the download fails (null if no error).
 *
 * @param downloadFile
 *    - key (string): A security key required to fetch the PDF.
 *    - fileName (string): The name to save the downloaded file as.
 *
 * @example
 * const { downloadFile, isLoading, error } = useDownloadPDF();
 * downloadFile('file-key', 'document.pdf');
 * 
**/

import { useState } from 'react';

export const useDownloadPDF = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const downloadFile = async (key: string, fileName: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const apiUrl = 'https://api.example.com/get-pdf';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch the file. Please try again.');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      
      link.href = url;
      link.download = fileName;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 100);
      
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message); 
      } else {
        setError('An unknown error occurred.'); 
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { downloadFile, isLoading, error };
};