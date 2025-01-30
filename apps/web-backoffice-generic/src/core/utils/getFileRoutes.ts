import fs from "fs";
import path from "path";

export const getAllRoutes = (dir: string): string[] => {
  const resolveDir = path.join(process.cwd(), dir);

  if (!fs.existsSync(resolveDir)) {
    console.warn(`Directory does not exist: ${resolveDir}`);
    return [];
  }

  const routes: string[] = [];

  const scanDir = (currentDir: string, baseRoute: string = ""): void => {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        scanDir(entryPath, `${baseRoute}/${entry.name}`);
      } else if (entry.isFile()) {
        const routeName = entry.name.replace(/\.(js|jsx|ts|tsx)$/, "");
        if (routeName === "index") {
          routes.push(baseRoute || "/");
        } else {
          routes.push(`${baseRoute}/${routeName}`);
        }
      }
    }
  };

  scanDir(resolveDir);
  return routes;
};
