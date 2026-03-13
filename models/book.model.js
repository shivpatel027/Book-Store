const { pgTable, uuid, varchar, text, index } = require("drizzle-orm/pg-core");
const { sql } = require("drizzle-orm");

const booksTable = pgTable("books", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description"),
  authorId: uuid("author_id").notNull(),
}, (table) => ({
  // Full-text search index on title
  titleSearchIndex: index("title_search_idx").using(
    "gin", 
    sql`to_tsvector('english', ${table.title})`
  ),
  // Optional: search index on description too
  descriptionSearchIndex: index("description_search_idx").using(
    "gin",
    sql`to_tsvector('english', ${table.description})`
  ),
}));

module.exports = {
  booksTable,
};