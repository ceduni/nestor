import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    isMain: {
        type: Boolean,
        required: true,
    },
});
const availabilitySchema = new mongoose.Schema({
    startAt: {
        type: Date,
        required: true,
    },
    endAt: {
        type: Date,
        required: true,
    },
});

const spaceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        library: {
            type: String,
        },
        streetNumber: {
            type: String,
            required: true,
        },
        streetName: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        postalCode: {
            type: String,
            required: true,
        },
        capacity: {
            type: Number,
            min: 1,
            required: true,
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
        images: {
            type: [imageSchema],
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        organisation: {
            type: String,
            required: true,
        },
        features: {
            type: [String],
            enum: [
                "wifi",
                "screen",
                "plug",
                "projector",
                "noise cancelling",
                "whiteboard",
                "accessible",
            ],
            required: true,
        },
        availabilities: {
            type: [availabilitySchema],
            required: true,
        },
        type: {
            type: [String],
            enum: [
                "university",
                "library",
                "facility",
                "nature",
                "coffee",
                "laboratory",
                "studyRoom",
            ],
            required: true,
        },
    },
    { timestamps: true },
);

spaceSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.__v;
    return obj;
};

export const space = mongoose.model("space", spaceSchema);

