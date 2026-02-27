import { useState } from "react";
import axios from "../utils/axios";

const PremiumCalculator = () => {
  const [formData, setFormData] = useState({
    age: "",
    type: "health",
    coverageAmount: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post("/premium/calculate", formData);
    setResult(res.data);
  };

  return (
    <div className="flex-1 p-10 flex justify-center">
      <div className="bg-white w-full max-w-xl p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Premium Calculator
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="health">Health</option>
            <option value="car">Car</option>
            <option value="life">Life</option>
          </select>

          <input
            type="number"
            name="coverageAmount"
            placeholder="Coverage Amount"
            value={formData.coverageAmount}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
            Calculate Premium
          </button>
        </form>

        {result && (
          <div className="mt-6 bg-green-100 p-4 rounded-lg text-center">
            <p className="text-lg font-semibold">
              Calculated Premium: ₹{result.calculatedPremium}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PremiumCalculator;