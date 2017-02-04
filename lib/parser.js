var DataService = require("./DataService.js")
var StringParse = {
    string: require('./stringManager.js'),
    int: require('./integerManager.js')
}
var ObjectParse = {
    array: require('./arrayManager.js'),
    fixedArray: require('./fixedArrayManager.js'),
    object: require('./objectManager.js'),
    conditional: require('./conditionManager.js')
}
module.exports = function (object) {
    var data = {
        get: new DataService(),
        set: new DataService()
    };
    var parse = function (obj) {
        if (typeof obj == "string") {
            var split = obj.split(" ")
            var par = StringParse[split[0]];
            if (!par) throw "Invalid type. Use only int or string";
            return par(obj, data);
        }
        if (typeof obj == "object") {

            if (obj.isArray()) {
                if (typeof obj[0] == "string" && obj[0].substr(0, 6) == "length") ObjectParse.fixedArray(obj, data, parse);
                else ObjectParse.array(obj, data, parse);
                return;
            } else {
                if (obj.if && obj.then && obj.else) return ObjectParse.conditional(obj, data, parse);
                return ObjectParse.object(obj, data, parse);
            }
        }
        throw "ERR: Please only use a string, array, or object";
    }
}