import { NextApiHandler } from "next";
import { withSsrHttpClient } from "core-library";
import { errorResponse } from "core-library/api/ssr/responses";
import { CreateProgramResponse } from "core-library/api/types";
import { IncomingForm } from "formidable";
import fs from "fs";
import FormData from "form-data";

export const config = {
  api: {
    bodyParser: false,
  },
};

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

      const title = Array.isArray(fields.title)
        ? fields.title[0]
        : fields.title;
      const programType = Array.isArray(fields.programType)
        ? fields.programType[0]
        : fields.programType;
      const stringifiedSections = Array.isArray(fields.stringifiedSections)
        ? fields.stringifiedSections[0]
        : fields.stringifiedSections;
      const programImage = Array.isArray(files.programImage)
        ? files.programImage[0]
        : files.programImage;

      if (!title || !programType || !stringifiedSections || !programImage) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const filename = programImage.originalFilename || "default_filename";
      const mimetype = programImage.mimetype || "application/octet-stream";

      const programImageStream = fs.createReadStream(programImage.filepath);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("programType", programType);
      formData.append("stringifiedSections", stringifiedSections);
      formData.append("programImage", programImageStream, {
        filename,
        contentType: mimetype,
      });

      try {
        const result = await client.post<CreateProgramResponse>(
          `/api/v2/content/BaseContent/create-program`,
          formData,
          {
            headers: 
            {
                ...formData.getHeaders(),
                Authorization: req.headers.authorization,
            }
          }
        );
        console.log("ssr programs create", result.data);
        res.status(result.status).json(result.data);
      } catch (error) {
        errorResponse(error, res);
      }
    });
  }
);

export default handler;
