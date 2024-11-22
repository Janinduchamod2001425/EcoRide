import Pack from "../model/packModel.js";

const validatePackname = (packname) => {
  // can contain letters only. Not allowed symbols or digits
  const regex = /^[a-zA-Z]+$/; // Regular expression to match only letters
  return regex.test(packname);
};

const validateDescription = (description) => {
  // 100 words only
  const words = description.split(/\s+/).length;
  return words <= 100;
};

const validateDuration = (duration) => {
  // can contain numerical values only
  const regex = /^\d+$/;
  return regex.test(duration);
};

const validatePrice = (price) => {
  // can contain numerical values only
  const regex = /^\d+(\.\d{1,2})?$/;
  return regex.test(price);
};

// C - Create
export const createPack = async (req, res) => {
  try {
    // Validate the updated pack data before updating
    const { packname, description, duration, price } = req.body;

    // Perform validation
    if (!validatePackname(packname)) {
      return res.status(400).json({
        error: "Invalid packname. Packname should contain only letters.",
      });
    }

    if (!validateDescription(description)) {
      return res.status(400).json({
        error:
          "Invalid description. Description should contain 100 words or fewer.",
      });
    }

    if (!validateDuration(duration)) {
      return res.status(400).json({
        error:
          "Invalid duration. Duration should contain only numerical values.",
      });
    }

    if (!validatePrice(price)) {
      return res.status(400).json({
        error: "Invalid price. Price should contain only numerical values.",
      });
    }

    const packData = new Pack(req.body);

    if (!packData) {
      return res.status(404).json({ msg: "Pack not found" });
    }

    const savedData = await packData.save();
    res.status(200).json({ msg: "Pack Added Successfully", data: savedData });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// R - Read
export const getAllPack = async (req, res) => {
  try {
    const packData = await Pack.find();

    if (!packData) {
      return res.status(404).json({ msg: "Pack not found" });
    }

    res.status(200).json(packData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// R - Read
export const getOnePack = async (req, res) => {
  try {
    const id = req.params.id;

    const packExist = await Pack.findById(id);

    if (!packExist) {
      return res.status(404).json({ msg: "Pack not found" });
    }

    res.status(200).json(packExist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// U - Update
export const updatePack = async (req, res) => {
  try {
    const id = req.params.id;

    const packExist = await Pack.findById(id);

    if (!packExist) {
      return res.status(404).json({ msg: "Pack not found" });
    }

    // Validate the updated pack data before updating
    const { packname, description, duration, price } = req.body;

    // Perform validation
    if (!validatePackname(packname)) {
      return res.status(400).json({
        error: "Invalid packname. Packname should contain only letters.",
      });
    }

    if (!validateDescription(description)) {
      return res.status(400).json({
        error:
          "Invalid description. Description should contain 100 words or fewer.",
      });
    }

    if (!validateDuration(duration)) {
      return res.status(400).json({
        error:
          "Invalid duration. Duration should contain only numerical values.",
      });
    }

    if (!validatePrice(price)) {
      return res.status(400).json({
        error: "Invalid price. Price should contain only numerical values.",
      });
    }

    // If all validations pass, update the pack data
    const updateData = await Pack.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({ msg: "Pack Updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// D - Delete
export const deletePack = async (req, res) => {
  try {
    const id = req.params.id;

    const packExist = await Pack.findById(id);

    if (!packExist) {
      return res.status(404).json({ msg: "Pack not found" });
    }

    await Pack.findByIdAndDelete(id);
    res.status(200).json({ msg: "Pack deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
