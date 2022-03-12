const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//create schema
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

//create reaction schema
const reactionSchema = new Schema (
    {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId,

    },
    reactionBody:{
        type: String,
        required: true,
        maxLength: 280
    },
    userName: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    }
);


//create virtual
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

//create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

//export Thought model
module.exports = Thought;