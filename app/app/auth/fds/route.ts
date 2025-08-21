// Fuerza a usar runtime Node.js en este handler
export const runtime = 'nodejs';

import { handlers } from "@/auth";

// Exporta GET y POST del auth handler
export const { GET, POST } = handlers;
