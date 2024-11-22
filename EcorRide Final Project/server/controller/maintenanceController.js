import Maintenance from "../model/maintenanceModel.js";

// C - Create 
export const createMaintenance = async (req, res)  => {
    try {
        const maintenanceData = new Maintenance(req.body);

        if(!maintenanceData) {
            return res.status(404).json({msg: "Maintenance Data not found"});
        }

        const savedData = await maintenanceData.save();
        res.status(200).json({ msg: "Maintenance Scheduled Successfully", data: savedData });

    } catch (error) {
        res.status(500).json({error: error});
    }
}

// R - Read
export const getAllmaintenance = async (req, res) => {
    try {
        const maintenanceData = await Maintenance.find();

        if(!maintenanceData) {
            return res.status(404).json({msg: "Maintenance not found"});
        }

        res.status(200).json(maintenanceData);

    } catch (error) {
        res.status(500).json({error: error});
    }
}

// R - Read 
export const getOneMaintenance =  async (req, res) => {
    try {
    
        const id = req.params.id;

        const maintenanceExist = await Maintenance.findById(id);

        if(!maintenanceExist) {
            return res.status(404).json({msg: "Maintenance not found"});
        }

        res.status(200).json(maintenanceExist);

    } catch (error) {
        res.status(500).json({error: error});
    }
}

// U - Update
export const updateMaintenance = async (req, res) => {
    try {
        
        const id = req.params.id;

        const maintenanceExist = await Maintenance.findById(id);

        if(!maintenanceExist) {
            return res.status(404).json({msg: "Maintenance not found"});
        }

        const updateData = await Maintenance.findByIdAndUpdate(id, req.body, {new:true});

        res.status(200).json({msg: "Maintenance Updated Successfully"});

    } catch (error) {
        res.status(500).json({error: error});
    }
}

// D - Delete
export const deleteMaintenance = async (req, res) => {
    try {
        const id = req.params.id;

        const maintenanceExist = await Maintenance.findById(id);

        if(!maintenanceExist) {
            return res.status(404).json({msg: "Maintenance not found"});
        }

        await Maintenance.findByIdAndDelete(id);
        res.status(200).json({msg: "Maintenance deleted successfully"}); 

    } catch (error) {
        res.status(500).json({error: error});
    }
}