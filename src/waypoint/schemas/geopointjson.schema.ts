import { Schema, model, Model, Document } from 'mongoose';
import { GeoJSONPoint } from '../../graphql.classes';

export interface GeoJSONPointDocument extends GeoJSONPoint, Document {
  // Declaring everything that is not in the GraphQL Schema for a GeoJSONPoint

}

export interface IGeoJSONPointModel extends Model<GeoJSONPointDocument> {
  
}

export const GeoJSONPointSchema: Schema = new Schema(
  {
      type: {
          type: String,
          required: true,
          default: "Point"
      },
      coordinates: {
          type: [Number],
          required: true
      }
  }
);


export const GeoJSONPointModel: IGeoJSONPointModel = model<GeoJSONPointDocument, IGeoJSONPointModel>(
  'GeoJSONPoint',
  GeoJSONPointSchema,
);
