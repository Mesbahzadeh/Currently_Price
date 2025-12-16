import { GoogleGenAI } from "@google/genai";
import { MarketItem } from "../types";

const apiKey = process.env.API_KEY || '';

export const analyzeMarket = async (items: MarketItem[]): Promise<string> => {
  if (!apiKey) return "کلید API تنظیم نشده است. لطفاً کلید معتبر وارد کنید.";

  const ai = new GoogleGenAI({ apiKey });

  // Prepare a prompt based on the current data
  const dataSummary = items.slice(0, 10).map(i => `${i.title}: ${i.price} (${i.changePercent.toFixed(2)}%)`).join('\n');

  const prompt = `
    به عنوان یک تحلیلگر ارشد بازار مالی ایران، یک تحلیل کوتاه و جذاب (حداکثر ۳ پاراگراف) درباره وضعیت فعلی بازار بنویس.
    داده های لحظه ای زیر را در نظر بگیر:
    ${dataSummary}
    
    لحن باید حرفه‌ای اما قابل فهم برای عموم باشد. اگر بازار صعودی است به فرصت‌ها اشاره کن و اگر نزولی است به احتیاط.
    تحلیل باید به زبان فارسی باشد.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "تحلیل در حال حاضر در دسترس نیست.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "خطا در ارتباط با هوش مصنوعی. لطفاً بعداً تلاش کنید.";
  }
};