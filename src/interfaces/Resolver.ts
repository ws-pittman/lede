/**
 * A Resolver is used to get Bits from a GoogleDoc.
 * {prop} googleId – The ID of the Google Doc to retrieve.
 * {prop} parser – A function which takes the raw content of the Google Doc and returns an array of Bits.
 */
import { Bit } from "../models";


export interface Resolver {
  fetch: () => Promise<Bit[]>;
}