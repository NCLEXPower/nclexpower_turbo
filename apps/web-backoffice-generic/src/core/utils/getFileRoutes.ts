import fs from "fs";
import path from "path";
import { FILE_EXTENSION_REGEX, MULTIPLE_SLASHES_REGEX } from "core-library";

export const getAllRoutes = (): string[] => {

  const projectRoot = process.cwd();
  const pagesDir = path.join(projectRoot, "src", "pages");


  if (!fs.existsSync(pagesDir)) {
    return [];
  }

  const routes: string[] = [];

  const scanDir = (currentDir: string, baseRoute: string = ""): void => {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = path.join(currentDir, entry.name);

       if (entry.name.startsWith('_') || entry.name.startsWith('.') || 
       entry.name === 'api' || entry.name === 'node_modules') {
     continue;
   }

   if (entry.isDirectory()) {
     scanDir(entryPath, `${baseRoute}/${entry.name}`);
   } else if (entry.isFile() && FILE_EXTENSION_REGEX.test(entry.name)) {

    const routeName = entry.name.replace(FILE_EXTENSION_REGEX, "");
     if (routeName === "index") {
       routes.push(baseRoute || "/");
     } else {

       const normalizedRoute = `${baseRoute}/${routeName}`.replace(MULTIPLE_SLASHES_REGEX, "/");
       routes.push(normalizedRoute);
     }
   }
 }
};

scanDir(pagesDir);
return routes;
};