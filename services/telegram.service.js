"use strict";

const Telegraf = require("telegraf/telegram");
/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "telegram",

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
			params: {
				group: "string",
				message: "string"
			},
			async handler(ctx) {
				this.logger.info(ctx.params);
				return await this.settings.bot.sendMessage(ctx.params.group, ctx.params.message)
					.then((result) => {
						this.logger.info(result);
						return true;
					})
					.catch((error) => {
						this.logger.error(error);
						return false;
					});
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
		this.settings.bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
};
