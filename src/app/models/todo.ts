import { model, Schema, SchemaTypes } from "mongoose";
import { DB_NAMES, TODO_STATUS } from "@app/common/constant";
let todo = new Schema(
  {
    name: { type: SchemaTypes.String, required: true, default: "" },
    description: { type: SchemaTypes.String, required: false, default: "" },
    list: [],
    status: { type: SchemaTypes.Number, enum: TODO_STATUS, default: TODO_STATUS.OPEN },
    addedBy: { type: SchemaTypes.String, required: true, default: "" },
  },
  {
    collection: DB_NAMES.TODOS,
    timestamps: true,
    collation: {
      locale: "en_US",
      strength: 2,
    },
  }
);

export const TodoModel = model(DB_NAMES.TODOS, todo);
