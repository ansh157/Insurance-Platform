import Policy from "../models/Policy.js";

export const createPolicy = async (req, res) => {
  try {
    const { type, premiumAmount, coverageAmount } = req.body;

    const policyNumber = `INS-${Date.now()}`;

    const policy = await Policy.create({
      user: req.user._id,
      policyNumber,
      type,
      premiumAmount,
      coverageAmount,
    });

    res.status(201).json(policy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all policies
export const getPolicies = async (req, res) => {
  const policies = await Policy.find({ user: req.user._id });
  res.json(policies);
};

// get policy by id
export const getPolicyById = async (req, res) => {
  const policy = await Policy.findById(req.params.id);

  if (!policy || policy.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: "Policy not found" });
  }

  res.json(policy);
};

// update policy 
export const updatePolicy = async (req, res) => {
  const policy = await Policy.findById(req.params.id);

  if (!policy || policy.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: "Policy not found" });
  }

  policy.type = req.body.type || policy.type;
  policy.premiumAmount = req.body.premiumAmount || policy.premiumAmount;
  policy.coverageAmount = req.body.coverageAmount || policy.coverageAmount;
  policy.status = req.body.status || policy.status;

  const updatedPolicy = await policy.save();

  res.json(updatedPolicy);
};

// delete policy
export const deletePolicy = async (req, res) => {
  const policy = await Policy.findById(req.params.id);

  if (!policy || policy.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: "Policy not found" });
  }

  await policy.deleteOne();

  res.json({ message: "Policy deleted" });
};