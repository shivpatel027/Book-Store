const { pgTable, uuid, varchar } = require("drizzle-orm/pg-core");

const authorsTable = pgTable("authors", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstname: varchar("firstname", { length: 100 }).notNull(),
  lastname: varchar("lastname", { length: 100 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
});

module.exports = {
  authorsTable,
};