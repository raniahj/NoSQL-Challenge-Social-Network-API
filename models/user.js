const { Schema, model } = require('mongoose');

// create schema
const UserSchema = new Schema({
    userName: {
      type: String,
      unique: true,
      required: "A username is required. Please try again.",
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: "An email is required. Please try again.",
      match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thought"
        }
    ],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
    },
    {
        toJSON: {
            virtuals: true, 
            getters: true
        }, 
        id: false
    });

// create virtual
UserSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;