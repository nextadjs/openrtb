import type {
  BidRequest as BidRequestV25,
  BidResponse as BidResponseV25,
} from "iab-openrtb/v25";
import type {
  BidRequest as BidRequestV26,
  BidResponse as BidResponseV26,
} from "iab-openrtb/v26";
import type { Openrtb } from "iab-openrtb/v30";

export type BidRequesterOptions = {
  dataFormat?: string;
  acceptEncoding?: string;
  cache?: Cache;
  headers?: Record<string, string>;
  withCredentials?: boolean;
};

export type Cache =
  | "default"
  | "no-cache"
  | "no-store"
  | "reload"
  | "force-cache"
  | "only-if-cached";

export interface IBidRequester {
  requestV25(
    endpoint: string,
    bidRequest: BidRequestV25,
    options?: BidRequesterOptions
  ): Promise<BidResponseV25>;
  requestV26(
    endpoint: string,
    bidRequest: BidRequestV26,
    options?: BidRequesterOptions
  ): Promise<BidResponseV26>;
  requestV30(
    endpoint: string,
    openrtb: Openrtb,
    options?: BidRequesterOptions
  ): Promise<Openrtb>;
}

export type ExceptionType =
  | "InvalidBidRequest"
  | "NoBidResponse"
  | "Unexpected";
