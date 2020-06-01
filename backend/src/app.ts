"use strict";

import express from "express";

const app = express();

app.get("/users", (req, res) => {
  res.json(["Wilder", "Lucas", "Diego", "Andrés"]);
});

app.listen(3333, () => {
  console.log("🔥: server on port 3333");
});
