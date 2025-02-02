# @nextad/openrtb/bid-requester

Typescript bid requester library compliant with OpenRTB 2.5/2.6/3.0

## Features

- 🎯 Full TypeScript type definitions support
- 📝 Compliant with OpenRTB
- 🛠️ Support for ESM and CommonJS
- ⚡ Can be used without instantiation
- 🧪 Test-friendly interface

## Usage

### Basic Usage

```typescript
import { bidRequester } from "@nextad/openrtb/bid-requester";
import { BidRequest, BidResponse } from "iab-openrtb/v26";

const bidRequest: BidRequest = {
  id: "bid-request-1",
  imp: [
    {
      id: "1",
      banner: {
        w: 300,
        h: 250,
      },
    },
  ],
};

const bidResponse = await bidRequester.requestV26(
  "https://example.com/endpoint",
  bidRequest,
  {
    headers: {
      Token: "auth-token",
    },
  }
);
```

### Version specific Bid Requests

```typescript
const bidResponseV25 = await bidRequester.requestV25(
  "https://example.com/v25",
  bidRequestV25
);
const bidResponseV26 = await bidRequester.requestV26(
  "https://example.com/v26",
  bidRequestV26
);
const bidResponseV30 = await bidRequester.requestV30(
  "https://example.com/v30",
  bidRequestV30
);
```

### Exception

```typescript
import {
  BidRequesterException
} from "@nextad/openrtb/bid-requester";

try {
  const bidResponse = await bidRequester.requestV26(
    "https://example.com/endpoint",
    bidRequest
  );
} catch (error) {
  if (error instanceof BidRequesterException) {
    // error handling...
    if (error.type === 'InvalidBidRequest') {

    } else if (error.type === 'NoBidResponse') {

    } else {

    }
}

// exception types...
type ExceptionType =
  | "InvalidBidRequest"
  | "NoBidResponse"
  | "Unexpected";
```

### Mock

Test-friendly interface available

```typescript
import { IBidRequester } from "@nextad/openrtb/bid-requester";

const bidRequesterMock = mock<IBidRequester>();
```

### Options

If you want to change from OpenRTB recommended data encoding and data format, you can use options.

Available options:

```typescript
export type BidRequesterOptions = {
  dataFormat?: string; // Corresponds to Content-Type (defaults to `application/json`)
  acceptEncoding?: string; // Corresponds to Accept-Encoding (defaults to `gzip`)
  headers?: Record<string, string>; // Custom Headers
  withCredentials?: boolean; // Include authentication credentials (cookies, TLS client certs)
};
```

Usage:

```typescript
import { BidRequester } from "@nextad/openrtb/bid-requester";
import { BidRequest, BidResponse } from "iab-openrtb/v26";

// Common options
const bidRequester = new BidRequester({
  acceptEncoding: "*",
});

const bidRequest: BidRequest = {
  id: "bid-request-1",
  imp: [
    {
      id: "1",
      banner: {
        w: 300,
        h: 250,
      },
    },
  ],
};

const bidResponse = await bidRequester.requestV26(
  "https://example.com/endpoint",
  bidRequest,
  {
    // Specific options
    acceptEncoding: "gzip",
  }
);
```

## License

[MIT License](./LICENSE)
