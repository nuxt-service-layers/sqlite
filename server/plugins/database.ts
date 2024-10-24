import { Sequelize } from "sequelize"

async function connectToDatabase() {
	const sequelize = new Sequelize({
		dialect: "sqlite",
		storage: "./database.sqlite",
	})

	try {
		await sequelize.authenticate()
		console.log("\x1b[32m", "[database-connection] SQLite Connected", "\x1b[0m")
	} catch (error) {
		console.error("Unable to connect to the database:", error)
	}

	return sequelize
}

export default defineNitroPlugin(async (nitroApp) => {
	const db = await connectToDatabase()

	nitroApp.hooks.hook("request", async () => {
		nitroApp.context.db = db
	})
})
