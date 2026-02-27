export const calculatePremium = async (req, res) => {
  try {
    const { age, type, coverageAmount } = req.body;

    if (!age || !type || !coverageAmount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let base = 1000;
    let premium = 0;

    if (type === "health") {
      premium = base + age * 20 + coverageAmount * 0.01;
    }

    if (type === "car") {
      premium = base + coverageAmount * 0.02;
    }

    if (type === "life") {
      premium = base + age * 30;
    }

    if (!premium) {
      return res.status(400).json({ message: "Invalid policy type" });
    }

    res.json({
      age,
      type,
      coverageAmount,
      calculatedPremium: Math.round(premium),
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};