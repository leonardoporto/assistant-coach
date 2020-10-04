"use strict";

const Discord = require("discord.js");

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "discord",

	/**
	 * Settings
	 */
	settings: {
		hook: null
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
				// Send a message using the webhook
				this.settings.hook.send(ctx.params.message);
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
		this.settings.hook = new Discord.WebhookClient(
			process.env.DISCORD_WEBHOOK_ID,
			process.env.DISCORD_WEBHOOK_TOKEN
		);
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
};
