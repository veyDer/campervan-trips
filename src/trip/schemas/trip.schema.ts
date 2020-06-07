import { Schema, model, Model, Document } from 'mongoose';
import { Trip } from '../../graphql.classes';

export interface TripDocument extends Trip, Document {
  // Declaring everything that is not in the GraphQL Schema for a Trip

}

export interface ITripModel extends Model<TripDocument> {
  
}

export const TripSchema: Schema = new Schema(
  {
      waypoints: [{type: Schema.Types.ObjectId, ref: 'Waypoint' }],
      name: String,
      ownedBy: [{type: Schema.Types.ObjectId, ref: 'User'}],
      startDate: Date,
      endDate: Date,
      journal: [{type: Schema.Types.ObjectId, ref: 'Post'}],
  },
  {
    timestamps: true,
  },
);


export const TripModel: ITripModel = model<TripDocument, ITripModel>(
  'Trip',
  TripSchema,
);
