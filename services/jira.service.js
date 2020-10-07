"use strict";
const DbService = require("../mixins/db.mixin");
const Card = require("../models/card.model");

const { DateTime } = require("luxon");
const axios = require("axios");

module.exports = {
	name: "jira",
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
			rest: "/issue/:issue",
			/** @param {Context} ctx  */
			async handler(ctx) {
				const {issue} = ctx.params;
				const data = await this.find_issue(issue);
				const card = await Card.findOneAndUpdate({
					issue_id: issue
				}, this.make_issue(data), {
					new:true,
					upsert: true
				});

				return card;
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
		find_issue(id) {
			return axios({
				method: "GET",
				url: `https://jira.pgmais.io/rest/api/latest/issue/${id}`,
				auth: {
					username: process.env.JIRA_USERNAME,
					password: process.env.JIRA_PASSWORD
				}
			}).then(response => {
				return response.data;
			});
		},
		make_issue({fields, key}) {
			return {
				issue_id: key,
				issue_type: this.valueToTag(fields.issuetype.name),
				current_step: this.valueToTag(fields.status.name),
				size: fields.customfield_12801 || "P",
				account: fields.customfield_10200.name || "pgmais",
				work_hours: this.calculateWorkingHours(fields.worklog),
				history:[],
			};
		},
		make_history({changelog}) {
			console.log(changelog);
			const [item] = changelog.items;
			return [
				{
					step: this.valueToTag(item.fromString),
					end_date: DateTime.local().setLocale("br").setZone("UTC-3")
				},
				{
					step: this.valueToTag(item.toString),
					start_date: DateTime.local().setLocale("br").setZone("UTC-3")
				}
			];
		},
		valueToTag(value){
			return value.toLowerCase().replace(/ /g,"-");
		},
		calculateWorkingHours({worklogs}) {
			return worklogs.reduce((response, worklog) => {
				return response + parseFloat(worklog);
			}, 0);
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
