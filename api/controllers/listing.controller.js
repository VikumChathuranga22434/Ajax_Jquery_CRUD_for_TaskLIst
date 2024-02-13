import List from "../models/listing.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const test = (req, res) => {
    res.json({
        message: "Api route is working",
    });
}

export const createListing = async (req, res, next) => {
    try {
        const listing = await List.create(req.body);
        return res.status(200).json(listing);
    } catch (error) {
        next(error)
    }
}

export const getListing = async (req, res, next) => {
    try {
        const listings = await List.find();
        if (!listings) {
            return next(errorHandler(404, "Listing not found"));
        }
        res.json(listings);
    } catch (error) {
        next(error)
    }
}

export const getListingID = async (req, res, next) => {
    const taskId = req.params.id;
    try {
        // getting the task details
        const task = await List.findById(taskId);

        if(!task){
            return next(errorHandler(404, "Task not found"));
        }
        res.json(task);
    } catch (error) {
        next(error)
    }
}

export const updateListing = async (req, res, next) => {
    // getting the listing
    const listing = await List.findById(req.params.id);
    try {
        if(!listing){
            return next(errorHandler(404, "Task not found"));
        }
        const updateListing = await List.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updateListing);
    } catch (error) {
        next(error);
    }
}

export const deleteListing = async (req, res, next) => {
    //check the listing exist
    const listing = await List.findById(req.params.id);
    try {
        if(!listing){
            return next(errorHandler(404, "Task not found"));
        }
        // delete the listing
        await List.findByIdAndDelete(req.params.id);
        res.status(200).json("Task has been removed");
    } catch (error) {
        next(error)
    }
}
