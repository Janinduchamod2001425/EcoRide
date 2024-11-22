import Vehicle from "../model/vehicleModel.js";

// C - Create (create a new vehicle)
export const create = async (req, res) => {
  try {
    const vehicleData = new Vehicle(req.body);

    // check if the vehicle exist
    if (!vehicleData) {
      return res.status(404).json({ msg: "vehicle not found" });
    }

    const savedData = await vehicleData.save();
    res
      .status(200)
      .json({ msg: "vehicle Added Successfully", data: savedData });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// R - Read (Read all vehicle)
export const getAll = async (req, res) => {
  try {
    const vehicleData = await Vehicle.find();

    // check if the vehicle exist
    if (!vehicleData) {
      return res.status(404).json({ msg: "Vehicle not found" });
    }

    // Display all vehicle
    res.status(200).json(vehicleData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// R - Read (Read paticular vehicle by id)
export const getOne = async (req, res) => {
  try {
    // get the vehicle id
    const id = req.params.id;

    // pass the id to the function
    const vehicleExist = await Vehicle.findById(id);

    // check if the vehicle exist
    if (!vehicleExist) {
      return res.status(404).json({ msg: "Vehicle not found" });
    }

    // Display the vehicle according to the id
    res.status(200).json(vehicleExist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// U - Update (Update paticular vehicle by id)
export const updateVehicle = async (req, res) => {
  try {
    // get the vehicle id
    const id = req.params.id;

    // pass the id to the function
    const vehicleExist = await Vehicle.findById(id);

    // check if the user exist
    if (!vehicleExist) {
      return res.status(404).json({ msg: "Vehicle not found" });
    }

    // Update the vehicle data
    const updateData = await Vehicle.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    // Display the updated data
    res.status(200).json({ msg: "Vehicle Updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// D - Delete (Delete vehicle)
export const deleteVehicle = async (req, res) => {
  try {
    // get the vehicle id
    const id = req.params.id;

    // pass the id to the function
    const vehicleExist = await Vehicle.findById(id);

    // check if the vehicle exist
    if (!vehicleExist) {
      return res.status(404).json({ msg: "Vehicle not found" });
    }

    // Delete the vehicle
    await Vehicle.findByIdAndDelete(id);
    res.status(200).json({ msg: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
