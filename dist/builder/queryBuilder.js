"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    // Applies text-b ased search on specified fields.
    search(searchableFields) {
        const searchTerm = this.query.search;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: "i" },
                })),
            });
        }
        return this;
    }
    // Applies sorting based on query parameters.
    sort() {
        const sortBy = this.query.sortBy || "createdAt";
        const sortOrder = this.query.sortOrder === "desc" ? -1 : 1;
        this.modelQuery = this.modelQuery.sort({ [sortBy]: sortOrder });
        return this;
    }
    // Filters based on specific fields.
    filter(filters) {
        filters.forEach((filter) => {
            if (this.query[filter]) {
                this.modelQuery = this.modelQuery.find({
                    [filter]: this.query[filter],
                });
            }
        });
        return this;
    }
    build() {
        return this.modelQuery;
    }
}
exports.default = QueryBuilder;
