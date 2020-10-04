"use strict";

const Slack = require("slack");

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "slack",

	/**
	 * Settings
	 */
	settings: {
		bot: null
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
		 * Say a 'Hello' action.
		 *
		 * @returns
		 */
		send: {
			rest: {
				method: "POST",
				path: "/merge-request"
			},
			async handler(ctx) {
				console.log(ctx.params);
				return "Hello Moleculer";
			}
		},
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
		this.settings.bot = new Slack(process.env.SLACK_BOT_TOKEN);
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
};
