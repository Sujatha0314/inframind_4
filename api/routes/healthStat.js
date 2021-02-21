const express = require("express");
const vitalsRouter = express.Router();

const Vitals = require("../models/healthStat");

vitalsRouter.post("/create", async (req, res) => {
  let emailAddress = req.body.emailAddress;
  let bodyTemperature = req.body.bodyTemperature;
  let bloodPressure = req.body.bloodPressure;
  let respiration = req.body.respiration;
  let glucose = req.body.glucose;
  let heartRate = req.body.heartRate;
  let oxygenSaturation = req.body.oxygenSaturation;
  let cholestrol = req.body.cholestrol;

  try {
    const newVitals = new Vitals({
      emailAddress: emailAddress,
      bodyTemperature: bodyTemperature,
      bloodPressure: bloodPressure,
      respiration: respiration,
      glucose: glucose,
      heartRate: heartRate,
      oxygenSaturation: oxygenSaturation,
      cholestrol: cholestrol,
    });

    await newVitals.save();
    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      data: error,
    });
  }
});

vitalsRouter.post("/getall", async (req, res) => {
  let emailAddress = req.body.emailAddress;

  try {
    const userVitals = await Vitals.find({ emailAddress: emailAddress });
    res.status(200).json({ status: "success", data: userVitals });
  } catch (error) {
    req.status(400).json({ status: "failed", data: error });
  }
});

module.exports = vitalsRouter;
