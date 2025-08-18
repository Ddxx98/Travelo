import Listing from "../models/listing.js";

const createListing = async (req, res) => {
    try {
        const listing = await Listing.create(req.body);
        res.status(201).json(listing);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create listing" });
    }
};

const getAllListings = async (req, res) => {
    try {
        const listings = await Listing.find();
        res.json(listings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch listings" });
    }
};

const getListingById = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({ error: "Listing not found" });
        }
        res.json(listing);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch listing" });
    }
};

const updateListing = async (req, res) => {
    try {
        const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!listing) {
            return res.status(404).json({ error: "Listing not found" });
        }
        res.json(listing);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update listing" });
    }
};

const deleteListing = async (req, res) => {
    try {
        const listing = await Listing.findByIdAndDelete(req.params.id);
        if (!listing) {
            return res.status(404).json({ error: "Listing not found" });
        }
        res.json({ message: "Listing deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete listing" });
    }
};

export default {
    createListing,
    getAllListings,
    getListingById,
    updateListing,
    deleteListing,
};