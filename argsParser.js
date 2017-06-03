function parseArgs(...args) {
    let lastItem = null;
    return args.reduce((obj, item) => {
        if (item.indexOf('-') === 0) {
            obj[item] = true;
            lastItem = item;
            return obj;
        } else if (lastItem !== null) {
            if (obj[lastItem] === true) {
                obj[lastItem] = item;
            } else {
                if (typeof obj[lastItem] === 'string') {
                    obj[lastItem] = [obj[lastItem]];
                }
                obj[lastItem].push(item);
            }
            return obj;
        }
        obj._unusedArgs.push(item);
        return obj;
    }, {_unusedArgs: []});
}

console.log(parseArgs('-v', '1', '2', '3', '4', '-f'));