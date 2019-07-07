"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const klasa_1 = require("klasa");
const config_1 = require("../config");
const { MongoClient } = require('mongodb');
class default_1 extends klasa_1.Provider {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const mongoClient = yield MongoClient.connect(config_1.mongoOptions.uri, klasa_1.util.mergeObjects(config_1.mongoOptions.options, { useNewUrlParser: true }));
            this.db = mongoClient.db('giveaway');
        });
    }
    get exec() {
        return this.db;
    }
    hasTable(table) {
        return this.db
            .listCollections()
            .toArray()
            .then((collections) => collections.some((col) => col.name === table));
    }
    createTable(table) {
        return this.db.createCollection(table);
    }
    deleteTable(table) {
        return this.db.dropCollection(table);
    }
    getAll(table, filter = []) {
        if (filter.length) {
            return this.db
                .collection(table)
                .find({ id: { $in: filter } }, { _id: 0 })
                .toArray();
        }
        return this.db
            .collection(table)
            .find({}, { _id: 0 })
            .toArray();
    }
    getKeys(table) {
        return this.db
            .collection(table)
            .find({}, { id: 1, _id: 0 })
            .toArray();
    }
    get(table, id) {
        return this.db.collection(table).findOne(resolveQuery(id));
    }
    has(table, id) {
        return this.get(table, id).then(Boolean);
    }
    getRandom(table) {
        return this.db.collection(table).aggregate({ $sample: { size: 1 } });
    }
    create(table, id, doc = {}) {
        return this.db
            .collection(table)
            .insertOne(klasa_1.util.mergeObjects(this.parseUpdateInput(doc), resolveQuery(id)));
    }
    delete(table, id) {
        return this.db.collection(table).deleteOne(resolveQuery(id));
    }
    update(table, id, doc = {}) {
        return this.db.collection(table).updateOne(resolveQuery(id), {
            $set: klasa_1.util.isObject(doc) ? flatten(doc) : parseEngineInput(doc),
        });
    }
    replace(table, id, doc = {}) {
        return this.db
            .collection(table)
            .replaceOne(resolveQuery(id), this.parseUpdateInput(doc));
    }
}
exports.default = default_1;
const resolveQuery = (query) => (klasa_1.util.isObject(query) ? query : { id: query });
function flatten(obj, path = '') {
    let output = {};
    for (const [key, value] of Object.entries(obj)) {
        if (klasa_1.util.isObject(value)) {
            output = Object.assign(output, flatten(value, path ? `${path}.${key}` : key));
        }
        else {
            output[path ? `${path}.${key}` : key] = value;
        }
    }
    return output;
}
function parseEngineInput(updated) {
    return Object.assign({}, ...updated.map((entry) => ({ [entry.data[0]]: entry.data[1] })));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29kYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcm92aWRlcnMvbW9uZ29kYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUNBQXVDO0FBQ3ZDLHNDQUF5QztBQUN6QyxNQUFNLEVBQUUsV0FBVyxFQUFFLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRTNDLGVBQXFCLFNBQVEsZ0JBQVE7SUFHcEIsSUFBSTs7WUFDYixNQUFNLFdBQVcsR0FBRyxNQUFNLFdBQVcsQ0FBQyxPQUFPLENBQUMscUJBQVksQ0FBQyxHQUFHLEVBQzFELFlBQUksQ0FBQyxZQUFZLENBQUMscUJBQVksQ0FBQyxPQUFPLEVBQUUsRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FDckUsQ0FBQztZQUNGLElBQUksQ0FBQyxFQUFFLEdBQUcsV0FBVyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN6QyxDQUFDO0tBQUE7SUFJRCxJQUFXLElBQUk7UUFDWCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVNLFFBQVEsQ0FBQyxLQUFhO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLEVBQUU7YUFDVCxlQUFlLEVBQUU7YUFDakIsT0FBTyxFQUFFO2FBQ1QsSUFBSSxDQUFDLENBQUMsV0FBZ0IsRUFBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3pGLENBQUM7SUFFTSxXQUFXLENBQUMsS0FBYTtRQUM1QixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVNLFdBQVcsQ0FBQyxLQUFhO1FBQzVCLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENB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