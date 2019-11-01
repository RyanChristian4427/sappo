import crypto from "crypto";
import mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
    email: string;
    password: string;
    passwordResetToken: string;
    passwordResetExpires: Date;

    facebook: string;
    tokens: AuthToken[];

    profile: {
        name: string;
        gender: string;
        location: string;
        website: string;
        picture: string;
    };

    comparePassword: comparePasswordFunction;
    gravatar: (size: number) => string;
};

type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

export interface AuthToken {
    accessToken: string;
    kind: string;
}

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,

    facebook: String,
    twitter: String,
    google: String,
    tokens: Array,

    profile: {
        name: String,
        gender: String,
        location: String,
        website: String,
        picture: String
    }
}, { timestamps: true });

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function (size: number = 200) {
    if (!this.email) {
        return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    }
    const md5 = crypto.createHash("md5").update(this.email).digest("hex");
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

export const User = mongoose.model<UserDocument>("User", userSchema);
