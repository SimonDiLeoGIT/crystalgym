import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "thguewwe",
  dataset: "production",
  apiVersion: "2025-07-01",
  useCdn: false,
});