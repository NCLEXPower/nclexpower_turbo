import { NextApiHandler } from "next";
import { withSsrHttpClient } from "core-library";
import { errorResponse } from "core-library/api/ssr/responses";
import { CreateSectionResponse } from "core-library/api/types";
import { IncomingForm, File as FormidableFile } from "formidable";
import fs from "fs";
import FormData from "form-data";

export const config = {
  api: {
    bodyParser: false,
  },
};

interface SectionDataTypes {
  title?: string,
  contentArea?: string,
  catSimulator?: string,
  authorName?: string,
  description?: string,
  guided?: string,
  unguided?: string,
  practice?: string
}

const handler: NextApiHandler = withSsrHttpClient(
  (client) => async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({
        message: "MethodNotAllowedException",
      });
    }

    const form = new IncomingForm({ multiples: false });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ message: "Form parsing error" });
      }

      const sectionTitle = Array.isArray(fields.sectionTitle)
        ? fields.sectionTitle[0]
        : fields.sectionTitle;
      const sectionType = Array.isArray(fields.sectionType)
        ? fields.sectionType[0]
        : fields.sectionType;

      if (!sectionTitle || !sectionType) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const formData = new FormData();
      formData.append("sectionTitle", sectionTitle);
      formData.append("sectionType", sectionType);

      const sectionData: SectionDataTypes = {};

      sectionData.title = Array.isArray(fields['SectionData[0].title']) ? fields['SectionData[0].title'][0] : fields['SectionData[0].title'];
      sectionData.contentArea = Array.isArray(fields['SectionData[0].contentArea']) ? fields['SectionData[0].contentArea'][0] : fields['SectionData[0].contentArea'];
      sectionData.catSimulator = Array.isArray(fields['SectionData[0].catSimulator']) ? fields['SectionData[0].catSimulator'][0] : fields['SectionData[0].catSimulator'];
      sectionData.authorName = Array.isArray(fields['SectionData[0].authorName']) ? fields['SectionData[0].authorName'][0] : fields['SectionData[0].authorName'];
      sectionData.description = Array.isArray(fields['SectionData[0].description']) ? fields['SectionData[0].description'][0] : fields['SectionData[0].description'];
      sectionData.guided = Array.isArray(fields['SectionData[0].guided']) ? fields['SectionData[0].guided'][0] : fields['SectionData[0].guided'];
      sectionData.unguided = Array.isArray(fields['SectionData[0].unguided']) ? fields['SectionData[0].unguided'][0] : fields['SectionData[0].unguided'];
      sectionData.practice = Array.isArray(fields['SectionData[0].practice']) ? fields['SectionData[0].practice'][0] : fields['SectionData[0].practice'];

      formData.append("SectionData[0].title", sectionData.title || "");

      const linkFile = Array.isArray(files['SectionData[0].file']) ? files['SectionData[0].file'][0] : files['SectionData[0].file'];
      if (linkFile) {
        const filename = linkFile.originalFilename || "default_filename";
        const mimetype = linkFile.mimetype || "application/octet-stream";
        const linkStream = fs.createReadStream(linkFile.filepath);
        formData.append("SectionData[0].file", linkStream, {
          filename,
          contentType: mimetype,
        });
      } else {
        formData.append("SectionData[0].file", "");
      }

      formData.append("SectionData[0].contentArea", sectionData.contentArea || "");
      formData.append("SectionData[0].catSimulator", sectionData.catSimulator || "");
      formData.append("SectionData[0].authorName", sectionData.authorName || "");

      const authorImageFile = Array.isArray(files['SectionData[0].authorImage']) ? files['SectionData[0].authorImage'][0] : files['SectionData[0].authorImage'];
      if (authorImageFile) {
        const filename = authorImageFile.originalFilename || "default_filename";
        const mimetype = authorImageFile.mimetype || "application/octet-stream";
        const authorImageStream = fs.createReadStream(authorImageFile.filepath);
        formData.append("SectionData[0].authorImage", authorImageStream, {
          filename,
          contentType: mimetype,
        });
      } else {
        formData.append("SectionData[0].authorImageFile", "");
      }

      const videoPlaceholderFile = Array.isArray(files['SectionData[0].videoPlaceholder']) ? files['SectionData[0].videoPlaceholder'][0] : files['SectionData[0].videoPlaceholder'];
      if (videoPlaceholderFile) {
        const filename = videoPlaceholderFile.originalFilename || "default_filename";
        const mimetype = videoPlaceholderFile.mimetype || "application/octet-stream";
        const videoPlaceholderStream = fs.createReadStream(videoPlaceholderFile.filepath);
        formData.append("SectionData[0].videoPlaceholder", videoPlaceholderStream, {
          filename,
          contentType: mimetype,
        });
      } else {
        formData.append("SectionData[0].videoPlaceholder", "");
      }

      formData.append("SectionData[0].description", sectionData.description || "");
     
      if (sectionData.contentArea) {

        formData.append("SectionData[0].guided", sectionData.guided === "true" ? "true" : "false");
        formData.append("SectionData[0].unguided", sectionData.unguided === "true" ? "true" : "false");
        formData.append("SectionData[0].practice", sectionData.practice === "true" ? "true" : "false");
      }

      const contentAreaCoverageKeys = Object.keys(fields).filter(key => key.startsWith('SectionData[0].contentAreaCoverage'));
      if (contentAreaCoverageKeys.length > 0) {
        contentAreaCoverageKeys.forEach((key, index) => {
          if (fields[key]) {
            formData.append(`SectionData[0].contentAreaCoverage[${index}]`, fields[key][0]);
          }
        });
      }

      const cardKeys = Object.keys(fields).filter(key => key.startsWith('SectionData[0].cards'));
      if (cardKeys.length > 0) {
        const cardIndices = Array.from(new Set(cardKeys.map(key => {
          const match = key.match(/cards\[(\d+)\]/);
          return match ? parseInt(match[1], 10) : null;
        }).filter(index => index !== null)));

        cardIndices.forEach(cardIndex => {
          const cardTopicKey = `SectionData[0].cards[${cardIndex}].cardTopic`;
          if (fields[cardTopicKey]) {
            formData.append(`SectionData[0].cards[${cardIndex}].cardTopic`, fields[cardTopicKey][0]);
          }

          const cardFacesKey = `SectionData[0].cards[${cardIndex}].cardFaces`;
          if (files[cardFacesKey]) {
            const cardFaces = Array.isArray(files[cardFacesKey]) ? files[cardFacesKey] : [files[cardFacesKey]];
            cardFaces.forEach((face) => {
              if (face instanceof FormidableFile) {
                const filename = face.originalFilename || "default_filename";
                const mimetype = face.mimetype || "application/octet-stream";
                const faceStream = fs.createReadStream(face.filepath);
                formData.append(`SectionData[0].cards[${cardIndex}].cardFaces`, faceStream, {
                  filename,
                  contentType: mimetype,
                });
              }
            });
          } else {
            formData.append(`SectionData[0].cards[${cardIndex}].cardFaces`, "[]");
          }
        });
      }
      
      try {
        const result = await client.post<CreateSectionResponse>(
          `/api/v2/content/BaseContent/create-section`,
          formData,
          {
            headers: 
            {
                ...formData.getHeaders(),
                Authorization: req.headers.authorization,
            }
          }
        );
        res.status(result.status).json(result.data);
      } catch (error) {
        errorResponse(error, res);
      }
    });
  }
);

export default handler;