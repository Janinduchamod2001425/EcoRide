import Loyalty from '../model/loyaltyModel.js';

// C - Create (create a new user)
export const createloyalty = async (req, res)  => {
    try {
        const loyaltyData = new Loyalty(req.body);

        if(!loyaltyData) {
            return res.status(404).json({msg: "Loyalty not found"});
        }

        const savedData = await loyaltyData.save();
        res.status(200).json({ msg: "Loyalty Added Successfully", data: savedData });

    } catch (error) {
        res.status(500).json({error: error});
    }
}

// R - Read (Read all users)
export const getAllLoyalty = async (req, res) => {
    try {
        const loyaltyData = await Loyalty.find();

        if(!loyaltyData) {
            return res.status(404).json({msg: "Loyalty not found"});
        }

        res.status(200).json(loyaltyData);

    } catch (error) {
        res.status(500).json({error: error});
    }
}

// R - Read 
export const getOneLoyalty =  async (req, res) => {
    try {
        
        const id = req.params.id;

        const loyaltyExist = await Loyalty.findById(id);

        if(!loyaltyExist) {
            return res.status(404).json({msg: "Loyalty not found"});
        }

        res.status(200).json(loyaltyExist);

    } catch (error) {
        res.status(500).json({error: error});
    }
}

// U - Update
export const updateLoyalty = async (req, res) => {
    try {
        
        const id = req.params.id;

        const loyaltyExist = await Loyalty.findById(id);

        if(!loyaltyExist) {
            return res.status(404).json({msg: "Loyalty not found"});
        }

        
        const updateData = await Loyalty.findByIdAndUpdate(id, req.body, {new:true});

    
        res.status(200).json({msg: "Loyalty Updated Successfully"});

    } catch (error) {
        res.status(500).json({error: error});
    }
}

// D - Delete
export const deleteLoyalty = async (req, res) => {
    try {
        
        const id = req.params.id;

        const loyaltyExist = await Loyalty.findById(id);

        if(!loyaltyExist) {
            return res.status(404).json({msg: "Loyalty not found"});
        }

        await Loyalty.findByIdAndDelete(id);
        res.status(200).json({msg: "Loyalty deleted successfully"}); 

    } catch (error) {
        res.status(500).json({error: error});
    }
}