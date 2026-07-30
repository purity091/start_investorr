
import { GoogleGenAI } from "@google/genai";

// توليد المحتوى النصي
export const generateSectionContent = async (
  sectionTitle: string, 
  context: string = ""
): Promise<string> => {
  // Always use a named parameter and obtain the API key exclusively from the environment variable.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const prompt = `أنت خبير في كتابة خطط الأعمال. قم بكتابة محتوى احترافي ومفصل لقسم: "${sectionTitle}". سياق المشروع: ${context}. اللغة: العربية الرسمية.`;
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
    });
    return response.text || "";
  } catch (error) {
    console.error("Error generating text:", error);
    throw error;
  }
};

// توليد الهوية البصرية (الصور)
export const generateBrandImage = async (
  prompt: string,
  style: string = "minimalist professional"
): Promise<string> => {
  // Always use a named parameter and obtain the API key exclusively from the environment variable.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const fullPrompt = `A high-quality professional brand asset for a business. Type: ${prompt}. Style: ${style}. High resolution, clean design, 4k, marketing quality.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: [{ parts: [{ text: fullPrompt }] }],
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    // البحث عن جزء الصورة في الرد. Iterating through all parts as required for image generation models.
    for (const part of response.candidates![0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("لم يتم العثور على صورة في الرد");
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};
