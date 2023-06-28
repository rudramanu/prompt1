const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const configuration = new Configuration({
  apiKey: process.env.openAIkey,
});
const openai = new OpenAIApi(configuration);
app.get("/", (req, res) => {
  res.send("Working");
});
app.post("/generateResponse", async (req, res) => {
  const prompt = req.body.prompt;
  // const systemMessage = `you can act as a Expert of shayari, The user will provide you a keyword as an input and you have to generate a Shayari for them in Hindi`;
  // const message = [
  //   { role: "system", content: systemMessage },
  //   { role: "user", content: prompt },
  // ];

  try {
    if (!prompt) {
      return res.send({ message: "No prompt was provided" });
    }
    console.log("hello");
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
    });
    console.log("hi");
    console.log(response.data.choices[0].text);
    return res.send({ message: response.data.choices[0].text });
  } catch (error) {
    console.log("entered here");
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
      res.send("Error");
    } else {
      console.log(error.message);
    }
  }
});
app.listen(process.env.port, () => {
  console.log(`server is running at port ${process.env.port}`);
});
