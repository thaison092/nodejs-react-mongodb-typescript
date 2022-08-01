import HttpStatusCodes from 'http-status-codes';


export abstract class CrawlWebError extends Error {

    public readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;

    constructor(msg: string, httpStatus: number) {
        super(msg);
        this.HttpStatus = httpStatus;
    }
}


export class ParamMissingError extends CrawlWebError {

    public static readonly Msg = 'One or more of the required parameters was missing.';
    public static readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;

    constructor() {
        super(ParamMissingError.Msg, ParamMissingError.HttpStatus);
    }
}


export class CrawlWebCatchError extends CrawlWebError {

    public static readonly Msg = 'Error Occured has found while runtime.';
    public static readonly HttpStatus = 500;

    constructor() {
        super(CrawlWebCatchError.Msg, CrawlWebCatchError.HttpStatus);
    }
}

export class CrawlWebFetchError extends CrawlWebError {

    public static readonly Msg = 'Error occurred while fetching data...';
    public static readonly HttpStatus = 500;

    constructor() {
        super(CrawlWebFetchError.Msg, CrawlWebFetchError.HttpStatus);
    }
}
