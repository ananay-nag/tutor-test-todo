import { model, Schema, SchemaTypes } from "mongoose";
import { DB_NAMES } from "@app/common/constant";
let session = new Schema({
  isActive: { type: SchemaTypes.Boolean, default: false },
  addedOn: { type: SchemaTypes.Number, default: 0 },
  modifiedOn: { type: SchemaTypes.Number, default: 0 },
  addedBy: { type: SchemaTypes.String, required: true, default: "" },
});

export const SessionModel = model(DB_NAMES.SESSIONS, session);
