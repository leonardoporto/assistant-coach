"use strict";
const DbService = require("../mixins/db.mixin");
const Card = require("../models/card.model");

module.exports = {
	name: "jira.card",
	mixins: [DbService("card")],
	model: Card,


	/**
	 * Settings
	 */
	settings: {

	},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {

		/**
		 * Gitlab merge request events
		 *
		 * @param {Number} group - Id of telegram group
		 */
		card: {
			rest: "/hook",
			/** @param {Context} ctx  */
			async handler(ctx) {
				console.log("jira action", ctx.params);
				return "Ok";
			}
		}
	},

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: {
	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
};
