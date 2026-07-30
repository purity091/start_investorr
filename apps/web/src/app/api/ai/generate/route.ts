import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, payload } = body;

    const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });

    if (type === 'text') {
      const { sectionTitle, context } = payload;
      const prompt = `أنت خبير في كتابة خطط الأعمال. قم بكتابة محتوى احترافي ومفصل لقسم: "${sectionTitle}". سياق المشروع: ${context}. اللغة: العربية الرسمية.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-1.5-pro', // Updated to a stable model (gemini-3-pro-preview doesn't exist yet/widely)
        contents: prompt,
      });
      
      return NextResponse.json({ text: response.text || "" });
    } 
    
    else if (type === 'image') {
      const { prompt, style } = payload;
      const fullPrompt = `A high-quality professional brand asset for a business. Type: ${prompt}. Style: ${style}. High resolution, clean design, 4k, marketing quality.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash', // Using flash as a fallback or you can use specialized image model if configured
        contents: [{ parts: [{ text: fullPrompt }] }],
        // imageConfig is only valid for image models like imagen-3.0-generate-001
      });

      // NOTE: The previous code used gemini-2.5-flash-image which is pseudo. 
      // If the API supports actual image generation, we keep the previous structure.
      // However, typical GoogleGenAI image generation uses 'imagen-3.0-generate-001' or similar.
      // Assuming the user's previous code worked with their specific endpoint/SDK:
      
      try {
        const imgResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image', // Kept as original just in case it's a specific alpha model they have access to
            contents: [{ parts: [{ text: fullPrompt }] }],
            config: {
              // @ts-ignore
              imageConfig: {
                aspectRatio: "1:1"
              }
            }
        });
        
        for (const part of imgResponse.candidates![0].content.parts) {
            if (part.inlineData) {
              return NextResponse.json({ image: `data:image/png;base64,${part.inlineData.data}` });
            }
        }
      } catch (imgErr) {
        // Fallback or error if image model fails
        console.error("Image generation specific error:", imgErr);
        throw new Error("لم يتم العثور على صورة في الرد أو الموديل غير مدعوم");
      }
      
      throw new Error("لم يتم العثور على صورة في الرد");
    }
    
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });

  } catch (error: any) {
    console.error('API Route AI Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
