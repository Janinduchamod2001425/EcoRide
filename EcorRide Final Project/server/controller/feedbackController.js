import Feedback from '../model/feedbackModel.js';

// C - Create 
export const createFeedback = async (req, res)  => {
    try {
        const feedbackData = new Feedback(req.body);

        if(!feedbackData) {
            return res.status(404).json({msg: "Feedback not found"});
        }

        const savedData = await feedbackData.save();
        res.status(200).json({ msg: "Feedback Added Successfully", data: savedData });

    } catch (error) {
        res.status(500).json({error: error});
    }
}

// R - Read
export const getAllFeedbacks = async (req, res) => {
    try {
        const feedbackData = await Feedback.find();

        if(!feedbackData) {
            return res.status(404).json({msg: "Feedback not found"});
        }

        res.status(200).json(feedbackData);

    } catch (error) {
        res.status(500).json({error: error});
    }
}

// R - Read 
export const getOneFeedback =  async (req, res) => {
    try {
    
        const id = req.params.id;

        const feedbackExist = await Feedback.findById(id);

        if(!feedbackExist) {
            return res.status(404).json({msg: "Feedback not found"});
        }

        res.status(200).json(feedbackExist);

    } catch (error) {
        res.status(500).json({error: error});
    }
}

// U - Update
export const updateFeedback = async (req, res) => {
    try {
        
        const id = req.params.id;

        const feedbackExist = await Feedback.findById(id);

        if(!feedbackExist) {
            return res.status(404).json({msg: "Feedback not found"});
        }

        const updateData = await Feedback.findByIdAndUpdate(id, req.body, {new:true});

        res.status(200).json({msg: "Feedback Updated Successfully"});

    } catch (error) {
        res.status(500).json({error: error});
    }
}

// D - Delete
export const deleteFeedback = async (req, res) => {
    try {
        const id = req.params.id;

        const feedbackExist = await Feedback.findById(id);

        if(!feedbackExist) {
            return res.status(404).json({msg: "Feedback not found"});
        }

        await Feedback.findByIdAndDelete(id);
        res.status(200).json({msg: "Feedback deleted successfully"}); 

    } catch (error) {
        res.status(500).json({error: error});
    }
}

export const getFeedbacksByCustomer = async (req, res) => {
    try {
        const customerId = req.params.id; // Corrected to req.params.id

        const feedbacks = await Feedback.find({ customer: customerId });

        if (!feedbacks || feedbacks.length === 0) { // Check if feedbacks array is empty
            return res.status(404).json({ msg: "Feedbacks not found for this customer" });
        }

        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}