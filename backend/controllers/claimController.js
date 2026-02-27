import Claim from "../models/Claim.js";
import Policy from "../models/Policy.js";

export const createClaim = async (req, res) => {
  try {
    const { policyId, claimAmount, reason } = req.body;

    const policy = await Policy.findById(policyId);

    if (!policy || policy.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Policy not found" });
    }

    const claim = await Claim.create({
      user: req.user._id,
      policy: policyId,
      claimAmount,
      reason,
    });

    res.status(201).json(claim);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// user will only see their own claims, admin can see all claims
export const getMyClaims = async (req, res) => {
  const claims = await Claim.find({ user: req.user._id })
    .populate("policy", "policyNumber type");

  res.json(claims);
};

// admin can see all claims
export const getAllClaims = async (req, res) => {
  const claims = await Claim.find()
    .populate("user", "name email")
    .populate("policy", "policyNumber");

  res.json(claims);
};

// admin can approve or reject claims
export const updateClaimStatus = async (req, res) => {
  const claim = await Claim.findById(req.params.id);

  if (!claim) {
    return res.status(404).json({ message: "Claim not found" });
  }

  claim.status = req.body.status || claim.status;

  const updatedClaim = await claim.save();

  res.json(updatedClaim);
};