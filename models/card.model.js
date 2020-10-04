"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const History = new Schema({
	"step": {
		type: String,
		enum: ["todo", "in-progress", "in-review", "ready-to-test", "in-test", "ready-to-deploy", "done"],
		required: true
	},
	"start_date": {
		type: Date,
		required: true
	},
	"end_date": {
		type: Date,
		required: true
	},
});

const CardSchema = new Schema({
	job: {
		type: String,
		required: true,
		unique: true,
	},
	issue_type: {
		type: String,
		enum: ["task", "sub-task", "story", "epic"],
		required: true
	},
	current_step: {
		type: String,
		enum: ["todo", "in-progress", "in-review", "ready-to-test", "in-test", "ready-to-deploy", "done"],
		required: true
	},
	size: {
		type: String,
		enum: ["P", "M", "G"],
		required: true
	},
	history: [History]
}, {
	timestamps: true
});

CardSchema.index({
	"content" : "text"
});

module.exports = mongoose.model("Card", CardSchema);
