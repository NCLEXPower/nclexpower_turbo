import fs from "fs";
import path from "path";

export const getAllRoutes = (): string[] => {

  const projectRoot = process.cwd();
  const pagesDir = path.join(projectRoot, "src", "pages");

  console.log("Scanning pages directory:", pagesDir);

  if (!fs.existsSync(pagesDir)) {
    console.warn(`Directory does not exist: ${pagesDir}`);
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
   } else if (entry.isFile() && /\.(js|jsx|ts|tsx)$/.test(entry.name)) {

    const routeName = entry.name.replace(/\.(js|jsx|ts|tsx)$/, "");
     if (routeName === "index") {
       routes.push(baseRoute || "/");
     } else {

       const normalizedRoute = `${baseRoute}/${routeName}`.replace(/\/+/g, '/');
       routes.push(normalizedRoute);
     }
   }
 }
};

scanDir(pagesDir);
console.log(`Found ${routes.length} routes`);
return routes;
};