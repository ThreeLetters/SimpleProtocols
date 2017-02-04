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
        set: new DataService(),
        count: new DataService(),
        byteLen: [],
        index: 0,
        byteSize: []
    };
    data.byteLen[0] = 0;
    data.byteSize[0] = [];

    data.get.push("function get(buf) {")
    data.count.push("function set(data1) {")
    data.count.push(FastBuffers.NodeJS());
    data.get.push(FastBuffers.NodeJS());
    data.get.push("var reader = new FastBuffers.reader(buf);");
    var savedind = data.set.index;
    data.count.push("var byteLen = 0;")



    data.get.push("var data1;");

    var lvl = 0;
    var parse = function (obj, name, type) {

        if (typeof obj == "string") {
            var split = obj.split(" ")
            var par = StringParse[split[0]];
            if (!par) throw "Invalid type. Use only int or string";
            if (lvl == 0) lvl++;
            var code = par(obj, data, name, type, lvl);
            return;
        }
        if (typeof obj == "object") {
            if (obj.if && obj.then && obj.else) return ObjectParse.conditional(obj, data, parse, lvl);

            if (Array.isArray(obj)) {
                lvl++;

                data.byteLen[++data.index] = 0;
                data.byteSize[data.index] = [];
                if (typeof obj[0] == "string" && obj[0].substr(0, 6) == "length") ObjectParse.fixedArray(obj, data, parse, lvl);
                else ObjectParse.array(obj, data, parse, lvl);


            } else {


                ObjectParse.object(obj, data, parse, lvl);
            }
            var lvl2 = lvl + 1;
            switch (type) {
            case 1: // object
                code = "data" + lvl + "." + name + "=data" + lvl2 + ";";

                break;
            case 2: // array
                code = "data" + lvl + ".push(data" + lvl2 + ");";
                break;

            }
            data.get.push(code)




            if (Array.isArray(obj)) {
                if (data.byteLen[data.index]) data.count.push("byteLen += " + data.byteLen[data.index] + ";");
                data.index--;
                lvl--;
                data.count.end()
                data.get.end();
                data.set.end();
            }


            return;
        }

        throw "ERR: Please only use a string, array, or object";
    }
    parse(object, false, 0);
    data.get.push2("return data1;")
    data.get.push2("}")
    data.set.push2("return writer.toBuffer();")
    data.set.push2("}")

    data.count.push("var writer = new FastBuffers.writer(byteLen);")
    var get = data.get.toString();
    var set = data.count.toString() + "\n" + data.set.toString()
    console.log(get)
}