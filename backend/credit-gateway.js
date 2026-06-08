import express from "express";

const app = express();
app.use(express.json());

let credits = 50;

// check credits
app.get("/credits", (req, res) => {
  res.json({ credits });
});

// simulate processing (costs 2 credits)
app.post("/api/process", (req, res) => {

  if (credits < 2) {
    return res.status(402).json({
      error: "Out of credits"
    });
  }

  credits -= 2;

  res.json({
    message: "Processed successfully",
    remainingCredits: credits
  });

});

// simulate buying credits
app.post("/add-credits", (req, res) => {

  credits += 100;

  res.json({
    message: "Credits added",
    credits
  });

});

app.listen(4000, () => {
  console.log("Credit gateway running on port 4000");
});