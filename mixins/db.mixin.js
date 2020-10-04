"use strict";

const path = require("path");
const mkdir = require("mkdirp").sync;

const DbService = require("moleculer-db");

module.exports = collection => {
	if (process.env.MONGO_URI) {
		const MongooseAdapter = require("moleculer-db-adapter-mongoose");

		console.log("MONGO URI", process.env.MONGO_URI)

		return {
			mixins: [DbService],
			adapter: new MongooseAdapter(process.env.MONGO_URI, {
				user: process.env.MONGO_USERNAME,
				pass: process.env.MONGO_PASSWORD,
				keepAlive: true,
				useNewUrlParser: true
			}),
			collection
		};
	}

	mkdir(path.resolve("./data"));

	return {
		mixins: [DbService],
		adapter: new DbService.MemoryAdapter({
			filename: `./data/${collection}.db`
		})
	};
};
