import User from "../models/User.js";

// POST /api/users/auth — Simple user login/register
export const authUser = async (req, res) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ message: "Name and phone are required" });
  }

  try {
    // Check if user exists by phone
    let user = await User.findOne({ phone });

    // If not, create new user
    if (!user) {
      user = await User.create({ name, phone });
    } else {
      // Optional: Update name if it changed
      if (user.name !== name) {
        user.name = name;
        await user.save();
      }
    }

    res.json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/users/:id — Fetch user details by ID for session validation
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
    });
  } catch (error) {
    res.status(500).json({ message: "Invalid user ID or server error" });
  }
};
