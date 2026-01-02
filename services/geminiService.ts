
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, Internship, MatchResult } from "../types";

export const getAIMatches = async (profile: UserProfile, internships: Internship[]): Promise<MatchResult[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    Given a user profile and a list of internship opportunities, calculate a match percentage (0-100) 
    for each internship and provide a short one-sentence reasoning for the score based on skills, location, education, and career goals.
    
    User Profile:
    Name: ${profile.userName}
    Education: ${profile.userEdu}
    Preferred Mode: ${profile.userMode}
    Location: ${profile.userLoc}
    Goals: ${profile.userGoals}
    Skills: ${profile.userSkills}
    
    Internships:
    ${JSON.stringify(internships)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-latest",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.INTEGER },
              matchPercentage: { type: Type.INTEGER },
              aiReasoning: { type: Type.STRING }
            },
            required: ["id", "matchPercentage", "aiReasoning"]
          }
        }
      }
    });

    const results = JSON.parse(response.text || "[]");
    
    return internships.map(job => {
      const matchData = results.find((r: any) => r.id === job.id);
      return {
        ...job,
        matchPercentage: matchData?.matchPercentage || 0,
        aiReasoning: matchData?.aiReasoning || "Manual matching applied."
      };
    }).sort((a, b) => b.matchPercentage - a.matchPercentage);

  } catch (error) {
    console.error("Gemini Error:", error);
    // Fallback to basic scoring if AI fails
    return internships.map(job => ({
      ...job,
      matchPercentage: 70, // Basic fallback
      aiReasoning: "Standard matching based on profile basics."
    }));
  }
};
