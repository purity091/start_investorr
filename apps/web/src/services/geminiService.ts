// توليد المحتوى النصي
export const generateSectionContent = async (
  sectionTitle: string, 
  context: string = ""
): Promise<string> => {
  try {
    const response = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'text',
        payload: { sectionTitle, context }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.text || "";
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
  try {
    const response = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'image',
        payload: { prompt, style }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.image) {
      return data.image;
    }
    throw new Error(data.error || "لم يتم العثور على صورة في الرد");
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};
