const jsonValidation = (json: any) => {
    if (json) return true;
    return false;
};

const sendToDummy = (json: any) => {
    //Communication to dummy backend (how?)
    return 'hello from dummyService: ' + json;
};

export {
    jsonValidation,
    sendToDummy,
};
