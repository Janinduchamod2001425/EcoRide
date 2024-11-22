import CusPack from '../model/cuspackageModel.js';

// C - Create
export const createCusPack = async (req, res)  => {
    try {
        const cuspackData = new CusPack(req.body);

        if(!cuspackData) {
            return res.status(404).json({msg: "Cus Pack not found"});
        }

        const savedData = await cuspackData.save();
        res.status(200).json({ msg: "Cus Pack Added Successfully", data: savedData });

    } catch (error) {
        res.status(500).json({error: error});
    }
}

// R - Read 
export const getAllCusPack = async (req, res) => {
    try {
        const cuspackData = await CusPack.find();

        if(!cuspackData) {
            return res.status(404).json({msg: "Cus Pack not found"});
        }

        res.status(200).json(cuspackData);

    } catch (error) {
        res.status(500).json({error: error});
    }
}

// R - Read
export const getOneCusPack =  async (req, res) => {
    try {
        
        const id = req.params.id;

        const cuspackExist = await CusPack.findById(id);

        if(!cuspackExist) {
            return res.status(404).json({msg: "Cus Pack not found"});
        }

        res.status(200).json(cuspackExist);

    } catch (error) {
        res.status(500).json({error: error});
    }
}

// U - Update 
export const updateCusPack = async (req, res) => {
    try {
        const id = req.params.id;

        const cuspackExist = await CusPack.findById(id);

        if(!cuspackExist) {
            return res.status(404).json({msg: "Cus Pack not found"});
        }

        const updateData = await CusPack.findByIdAndUpdate(id, req.body, {new:true});

        res.status(200).json({msg: "Cus Pack Updated Successfully"});

    } catch (error) {
        res.status(500).json({error: error});
    }
}

// D - Delete 
export const deleteCusPack = async (req, res) => {
    try {
        const id = req.params.id;

        const cuspackExist = await CusPack.findById(id);

        if(!cuspackExist) {
            return res.status(404).json({msg: "Cus Pack not found"});
        }

        await CusPack.findByIdAndDelete(id);
        res.status(200).json({msg: "Cus Pack deleted successfully"}); 

    } catch (error) {
        res.status(500).json({error: error});
    }
}