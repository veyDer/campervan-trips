import { Schema, model, Model, Document } from 'mongoose';
import { Waypoint } from '../../graphql.classes';
import { GeoJSONPointSchema } from './geopointjson.schema';

export interface WaypointDocument extends Waypoint, Document {
  // Declaring everything that is not in the GraphQL Schema for a Waypoint

}

export interface IWaypointModel extends Model<WaypointDocument> {
  
}

export const WaypointSchema: Schema = new Schema(
  {
    coords: GeoJSONPointSchema,
    poi: {type: Boolean, default: false},
    name: String,
    description: String,
    addedBy: {type: Schema.Types.ObjectId, ref: 'User'},
    comments: [{type: Schema.Types.ObjectId, ref: 'Content'}],
    photos: [{type: Schema.Types.ObjectId, ref: 'Content'}],
    videos: [{type: Schema.Types.ObjectId, ref: 'Content'}],
  },
  {
    timestamps: true,
  },
); 


export const WaypointModel: IWaypointModel = model<WaypointDocument, IWaypointModel>(
  'Waypoint',
  WaypointSchema,
);
