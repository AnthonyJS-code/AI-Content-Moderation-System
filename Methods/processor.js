const OpenAI = require("openai");
const contentCollection = require("../models/contents.models");
// const dotenv = require("dotenv");
// dotenv.config();
module.exports = async (data) => {
  let processedInputvalue;
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENROUTERAI_API_KEY,
      baseURL: "https://openrouter.ai/api/v1",
    });
    messagePrompt =`${process.env.AI_PROMPT} \n\n\n ${data}`
    // console.log(messagePrompt)
    const completion = await openai.chat.completions.create({
      model: "tngtech/deepseek-r1t2-chimera:free",
      messages: [{ role: "user", content: messagePrompt }],
    });
    let processedInput = completion.choices[0].message.content;
    processedInputvalue = { processedInput: processedInput };
    newContents = new contentCollection({
      content: data,
      AIResultsDetails: processedInput,
    });
    await newContents.save();
    return processedInputvalue;
  } catch (e) {
    if (e.code === 11000 && e.name === "MongoServerError") {
      processedInputvalue = { error: "Duplicate Request" };
    } else {
      processedInputvalue = {
        error: "An error occured, Try again in about 2 minutes",
      };
    }
  }
  return processedInputvalue;
};
