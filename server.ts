import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { mockAnalyses } from "./src/mockAnalyses";

dotenv.config();

// Helper to resolve sample texts for offline/instant use
function findMockAnalysis(text: string) {
  const clean = text.trim().replace(/\s+/g, "");
  if (clean.includes("שניםאוחזיןבטלית")) {
    return mockAnalyses["bava-metzia-2a"];
  }
  if (clean.includes("באותוהיוםהשיברביאליעזר")) {
    return mockAnalyses["oven-of-akhnai"];
  }
  if (clean.includes("מאימתיקוריןאתשמע")) {
    return mockAnalyses["berakhot-2a"];
  }
  return null;
}

// Lazy initialization check of SDK or standard instantiation
const getGeminiClient = () => {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error("GEMINI_API_KEY environment variable is required. Please set it in Settings > Secrets.");
  }
  return new GoogleGenAI({
    apiKey: key,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "5mb" }));

  // Helper endpoint to check if API key is present
  app.get("/api/config-check", (req, res) => {
    res.json({ hasApiKey: !!process.env.GEMINI_API_KEY });
  });

  // Talmud Analysis Endpoint
  app.post("/api/explain-talmud", async (req, res) => {
    try {
      const { text } = req.body;
      if (!text || typeof text !== "string" || text.trim().length === 0) {
        return res.status(400).json({ error: "Missing or invalid 'text' in request body." });
      }

      // Check first for local mock fallback
      const mockResult = findMockAnalysis(text);
      if (mockResult) {
        console.log("Serving mock high-fidelity offline analysis for standard sample...");
        return res.json(mockResult);
      }

      // Check key existence before trying to call the client
      if (!process.env.GEMINI_API_KEY) {
        return res.status(400).json({
          error: "GEMINI_API_KEY secret is not configured. Please set it in Settings > Secrets to parse custom passages, or select one of the leather-stamped classic studies above to commence instantly!"
        });
      }

      console.log(`Analyzing Talmud passage of length: ${text.length}`);
      const ai = getGeminiClient();

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `You are an expert scholar of the Talmud, fluent in Aramaic (Babylonian and Jerusalem Talmud dialects), Rabbinic Hebrew, Modern Hebrew, and English.
Analyze the following copied Talmud passage. If the text contains Rashi, Tosafot, or Mishna, identify and analyze them correctly.
Pasted text:
"""
${text}
"""`,
        config: {
          systemInstruction: "You are an assistant that analyzes copied Talmud text. Extract its properties (Tractate name, Daf, Sages mentioned, original structure/logical flow, line-by-line translation and commentary, keywords/vocabulary) in BOTH English and Modern Hebrew so that the client application can toggle languages instantly. Return the results in structured JSON according to the schema provided.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: "A short descriptive title for this Talmudic passage in both English and Hebrew (e.g. 'The Oven of Akhnai / תנורו של עכנאי')"
              },
              tractate: {
                type: Type.STRING,
                description: "The tractate name, daf, or specific folio reference if recognized, or 'Not specifically identified' if uncertain."
              },
              category: {
                type: Type.STRING,
                description: "A categorization such as Mishna, Gemara, Halakha, Aggadah, mixed, or featuring Commentaries like Rashi/Tosafot."
              },
              sages: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    nameEn: { type: Type.STRING, description: "Name of the Sage in English (e.g. 'Rava', 'Rabbi Eliezer')" },
                    nameHe: { type: Type.STRING, description: "Name of the Sage in Hebrew (e.g. 'רבא', 'רבי אליעזר')" },
                    role: { type: Type.STRING, description: "Amora, Tanna, Sage, or Commentator" },
                    descriptionEn: { type: Type.STRING, description: "Brief description of their view, action, or bio in this context in English" },
                    descriptionHe: { type: Type.STRING, description: "Brief description of their view, action, or bio in this context in Hebrew" }
                  },
                  required: ["nameEn", "nameHe", "role", "descriptionEn", "descriptionHe"]
                },
                description: "List of Sages/Rabbis mentioned in this text or related commentators."
              },
              keywords: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    term: { type: Type.STRING, description: "The Aramaic or Rabbinic Hebrew term/phrase as it appears (e.g. 'תיקו', 'פשיטא')" },
                    meaningEn: { type: Type.STRING, description: "Translation/meaning in English" },
                    meaningHe: { type: Type.STRING, description: "Translation/meaning in Modern Hebrew" },
                    functionEn: { type: Type.STRING, description: "Hermeneutic action or rhetorical role of this term in English (e.g., 'Introduces query', 'Indicates query was resolved')" },
                    functionHe: { type: Type.STRING, description: "Hermeneutic action or rhetorical role of this term in Hebrew" }
                  },
                  required: ["term", "meaningEn", "meaningHe", "functionEn", "functionHe"]
                },
                description: "Key Talmudic Aramaic keywords or legal/hermeneutic terms used or implicit in this passage."
              },
              discussionFlow: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    stepNumber: { type: Type.INTEGER, description: "Sequential position of this logical turn in the debate" },
                    stageEn: { type: Type.STRING, description: "The logical category (e.g. 'Statement', 'Query', 'Objection', 'Refutation', 'Resolution')" },
                    stageHe: { type: Type.STRING, description: "The logical category in Hebrew (e.g. 'מימרא', 'בעיא', 'קשיא', 'תירוץ')" },
                    detailsEn: { type: Type.STRING, description: "Explanation of what is happening logically here in English" },
                    detailsHe: { type: Type.STRING, description: "Explanation of what is happening logically here in Hebrew" }
                  },
                  required: ["stepNumber", "stageEn", "stageHe", "detailsEn", "detailsHe"]
                },
                description: "Step-by-step description of the rhetorical flow of the Talmudic argument (Shakla Vetarya)."
              },
              lineByLine: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    original: { type: Type.STRING, description: "A sentence or phrase from the original text snippet" },
                    translationEn: { type: Type.STRING, description: "English translation" },
                    translationHe: { type: Type.STRING, description: "Modern Hebrew translation of this phrase" },
                    commentaryEn: { type: Type.STRING, description: "Elaboration / parenthetical context for this phrase in English" },
                    commentaryHe: { type: Type.STRING, description: "Elaboration / parenthetical context for this phrase in Hebrew" },
                    talmudicType: {
                      type: Type.STRING,
                      description: "The primary legal, logical, or rhetorical category of this specific segment. MUST be one of: 'מימרא' (Statement), 'קושיא' (Objection/Challenge), 'תירוץ' (Resolution/Defense), 'שאלה' (Query/Question), 'תשובה' (Decision/Directive), 'ראיה' (Proof/Evidence)."
                    }
                  },
                  required: ["original", "translationEn", "translationHe", "commentaryEn", "commentaryHe", "talmudicType"]
                },
                description: "A clause-by-clause translation and explanation of the actual pasted text."
              },
              overallExplanationEn: {
                type: Type.STRING,
                description: "High-quality, complete context and explanation of the debate/narrative in English, discussing background and halakhic/philosophical outcomes."
              },
              overallExplanationHe: {
                type: Type.STRING,
                description: "High-quality, complete context and explanation of the debate/narrative in Hebrew, discussing background and halakhic/philosophical outcomes."
              },
              legalPrinciples: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    conceptEn: { type: Type.STRING, description: "The core rule or abstract concept in English (e.g. 'Unintentional intellectual property infringement')" },
                    conceptHe: { type: Type.STRING, description: "The core rule or abstract concept in Hebrew (e.g. 'רוב', 'ברי ושמא', 'הפקר בית דין')" },
                    applicationEn: { type: Type.STRING, description: "How this concept applies to the current passage in English" },
                    applicationHe: { type: Type.STRING, description: "How this concept applies to the current passage in Hebrew" }
                  },
                  required: ["conceptEn", "conceptHe", "applicationEn", "applicationHe"]
                },
                description: "General legal or philosophical principles underlying this discussion."
              }
            },
            required: [
              "title",
              "tractate",
              "category",
              "sages",
              "keywords",
              "discussionFlow",
              "lineByLine",
              "overallExplanationEn",
              "overallExplanationHe",
              "legalPrinciples"
            ]
          }
        }
      });

      const responseText = response.text || "";
      let parsedData;
      try {
        parsedData = JSON.parse(responseText.trim());
      } catch (parseErr) {
        console.error("Failed to parse JSON response from Gemini:", responseText);
        return res.status(500).json({
          error: "Failed to parsestructured response from the AI. The text might be formatted incorrectly.",
          rawText: responseText
        });
      }

      res.json(parsedData);
    } catch (error: any) {
      console.error("Error analyzing Talmud text:", error);
      res.status(500).json({
        error: error.message || "An unexpected error occurred while explaining the Talmud passage."
      });
    }
  });

  // Vite middle-ware setup for hot serving or index backup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server listening on port ${PORT}`);
  });
}

startServer();
