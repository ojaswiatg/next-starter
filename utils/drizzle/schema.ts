import {
    boolean,
    integer,
    pgTable,
    serial,
    text,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";

const timestamps = {
    updated_at: timestamp(),
    created_at: timestamp().defaultNow().notNull(),
    deleted_at: timestamp(),
};

export const users = pgTable("users", {
    id: serial(),
    email: text("email").notNull().unique(),
    username: text("username").notNull(),
    name: varchar(),
    ...timestamps,
});

export const todos = pgTable("todos", {
    id: serial(),
    title: varchar(),
    description: varchar(),
    completed: boolean(),
    ...timestamps,

    // foreign key to user table
    user_id: integer("user_id")
        .notNull()
        .references(() => users.id),
});
