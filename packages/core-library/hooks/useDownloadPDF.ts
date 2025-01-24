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