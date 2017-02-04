/*
    BufferGenerator - A protocol generator
    Copyright (C) 2017 Andrew S

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
    */
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
var FastBuffers = {
    NodeJS: require('./fastBuffersNodejs.js')
}
module.exports = function (object) {
    var data = {
        get: new DataService(),
        set: new DataService()
    };
    data.get.push('"use strict";')
    data.set.push('"use strict";')
    data.get.push("function get(buf) {")
    data.set.push("function set(obj) {")
    data.set.push(FastBuffers.NodeJS());
    data.get.push(FastBuffers.NodeJS());
    data.get.push("var reader = new FastBuffers.reader(buf);");
    var savedind = data.set.index++;



    data.get.push("var data1;");

    var lvl = 0;
    var parse = function (obj, name, type) {

        if (typeof obj == "string") {
            var split = obj.split(" ")
            var par = StringParse[split[0]];
            if (!par) throw "Invalid type. Use only int or string";
            var code = par(obj, data);
            if (lvl == 0) lvl++;
            switch (type) {
            case 0: // no object
                code = "data" + lvl + "=" + code + ";";
                break;
            case 1: // object
                code = "data" + lvl + "." + name + "=" + code + ";";
                break;
            case 2: // array
                code = "data" + lvl + ".push(" + code + ");"
                break;
            }
            data.get.push(code);
            return;
        }
        if (typeof obj == "object") {
            lvl++;
            if (Array.isArray(obj)) {
                if (typeof obj[0] == "string" && obj[0].substr(0, 6) == "length") ObjectParse.fixedArray(obj, data, parse, lvl);
                else ObjectParse.array(obj, data, parse, lvl);


            } else {
                if (obj.if && obj.then && obj.else) ObjectParse.conditional(obj, data, parse, lvl);
                else
                    ObjectParse.object(obj, data, parse, lvl);
            }
            var lvl2 = lvl - 1;
            switch (type) {
            case 1: // object
                code = "data" + lvl2 + "." + name + "=data" + lvl + ";";
                break;
            case 2: // array
                code = "data" + lvl2 + ".push(data" + lvl + ");"
                break;
            }
            data.get.push(code)


            return;
        }

        throw "ERR: Please only use a string, array, or object";
    }
    parse(object, false, 0);
    data.get.push2("return data1;")
    data.get.push2("}")
    console.log(data.get.toString())
}