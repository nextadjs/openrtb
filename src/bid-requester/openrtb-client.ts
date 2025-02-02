import { BidRequesterException } from "./exceptions";
import type { BidRequesterOptions } from "./types";

export class OpenRTBClient {
  private endpoint: string;
  private version: string;
  private options: Required<BidRequesterOptions>;

  public constructor(
    endpoint: string,
    version: string,
    options?: BidRequesterOptions
  ) {
    this.endpoint = endpoint;
    this.version = version;
    this.options = {
      dataFormat: "application/json",
      acceptEncoding: "gzip",
      cache: "no-store",
      headers: {},
      withCredentials: true,
      ...options,
    };
  }

  public async request<Req, Res>(bidRequest: Req): Promise<Res> {
    try {
      let init: any = {
        method: "POST",
        body: JSON.stringify(bidRequest),
        cache: this.options.cache,
        headers: {
          ...this.options.headers,
          "Content-Type": this.options.dataFormat,
          "Accept-Encoding": this.options.acceptEncoding,
          "x-openrtb-version": this.version,
        },
      };

      if (this.options.withCredentials) {
        init.credentials = "include";
      }

      const httpResponse = await fetch(this.endpoint, init);

      if (httpResponse.status === 200) {
        return httpResponse.json() as Res;
      } else if (httpResponse.status === 204) {
        throw new BidRequesterException(
          "No bid response received from the auction.",
          "NoBidResponse"
        );
      } else if (httpResponse.status === 400) {
        throw new BidRequesterException(
          (await httpResponse.text()) ||
            "required parameters are missing or malformed.",
          "InvalidBidRequest"
        );
      } else {
        throw new BidRequesterException(
          `Unexpected HTTP response: received status code ${httpResponse.status}`
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new BidRequesterException("Unexpected error");
      }
    }
  }
}
