"use strict";

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "gitlab",

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
		merge: {
			rest: "/merge-request/:group",
			/** @param {Context} ctx  */
			async handler(ctx) {
				console.log("gitlab merge request", JSON.stringify(ctx.params));
				const {object_attributes, group} = ctx.params;

				if(!this.isValidState(object_attributes)) {
					return "Ok";
				}

				if(await this.existsIssue(object_attributes)) {
					return "Ok";
				}

				this.broker.cacher.set(`issue.${object_attributes.id}_id`, object_attributes);

				const message = this.makeMessage(ctx.params);

				this.broker.call("telegram.send", {group, message});
				this.broker.call("discord.send", {message});

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
		makeMessage({user, object_attributes}) {
			return `${user.name} abriu uma solicitação de Merge Request\n${object_attributes.url}`;
		},
		async existsIssue({id}) {
			return await this.broker.cacher.get(`issue.${id}_id`);
		},
		isValidState({state, action}) {
			return state ==="opened" && action === "open";
		}
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
