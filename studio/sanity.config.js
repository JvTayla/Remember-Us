import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

import { visionTool } from "@sanity/vision";

export default defineConfig({
  name: "default",
  title: "Remember Us",
  projectId: "d8g1rpis",
  dataset: "production",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
