/**
 * useDownloadPDF
 *    - A custom hook that fetches a file URL from an API and downloads the corresponding PDF to the user's device.  
 *  
 * Expected behavior:
 *    1. Calls an API endpoint with a policy type to retrieve the file URL.
 *    2. Fetches the file from the returned URL and converts it into a downloadable format.
 *    3. Creates a temporary download link and triggers the file download.
 *    4. Cleans up the generated URL after the download is complete.
 *    5. If the request fails, it logs an error message.
 *
 * @returns An object with:
 *    - downloadPdf: A function that triggers the file download.
 *        - policyType (number): The identifier for the PDF file to fetch.
 *
 * @example
 * const { downloadPdf } = useDownloadPDF();
 * downloadPdf(1); // Downloads the PDF for policy type 1 (e.g., Privacy Policy)
 */

import { useApiCallback } from './index';

export const useDownloadPDF = () => {
  const downloadPdfCb = useApiCallback((api, policyType: number) =>
    api.webbackoffice.getPdf(policyType)
  );

  const downloadPdf = async (policyType: number) => {
    try{
      console.log("Executing API call...");
      const response = await downloadPdfCb.execute(policyType);
      console.log("API Response Data:", response.data); // Debugging
      const fileUrl = response.data.fileUrl;
      console.log(response.data.fileUrl);

      if (!fileUrl) {
        throw new Error("File URL not found!");
      }

      const fileResponse = await fetch(fileUrl);
      const blob = await fileResponse.blob();

      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", `document_${policyType}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => URL.revokeObjectURL(blobUrl), 100);

    } catch(error){
      console.error("Error fetching PDF:", error);
    }
  }

  return { downloadPdf };
};

