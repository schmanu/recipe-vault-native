type ParseObject = Object;
    
export type Action =
    | { type: "INITIALIZED", list: Array<ParseObject> }