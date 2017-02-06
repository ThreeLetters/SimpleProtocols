/*
    SimpleProtocols - A protocol generator
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
    NodeJS: require('../assets/fastBuffersNodejs.js'),
    Browser: require('../assets/fastBuffersBrowser.js')
}
var get_code = "\
function getIfs(reader) {\n\
    var final = [];\n\
    while (true) {\n\
        var num = reader.readUInt8();\n\
        if (num == 0) break;\n\
       var length = 7\n\
   while(length--)\n\
   final.push((num >> length ) & 1);\n\
}\n\
return final;\n\
        }";

var set_code = "\
function setIfs(writer,array) {\n\
    var i,j,temparray,chunk = 7;\n\
for (i=0,j=array.length; i<j; i+=chunk) {\n\
    temparray = array.slice(i,i+chunk);\n\
while (temparray.length < 7) temparray.push(0)\ n\
    writer.writeUInt8(parseInt(\"1\" + temparray.join(\"\"),2));\n\
}\n\
    writer.writeUInt8(0);\n\
}";
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



    data.get.push(get_code);
    data.count.push(set_code);

    data.get.push("var reader = new FastBuffers.reader(buf);");

    data.count.push("var byteLen = 0;")
    data.count.push("var ifs = [];")


    data.get.push("var data1;");
    data.get.push("var ifid = 0;");
    data.get.push("var ifs = getIfs(reader);");
    var lvl = 0;
    var parse = function (obj, name, type) {

        if (typeof obj == "string") {
            var split = obj.split(" ")
            var par = StringParse[split[0]];
            if (!par) throw "Invalid type. Use only int or string";

            var code = par(obj, data, name, type, lvl);
            return;
        }
        if (typeof obj == "object") {

            if (obj.if && obj.then && obj.else) return ObjectParse.conditional(obj, data, parse, type, name, lvl);
            if (type == 1) {
                data.set.push("var data" + (lvl + 1) + " = data" + lvl + "." + name + ";")
                data.count.push("var data" + (lvl + 1) + " = data" + lvl + "." + name + ";")
            }
            lvl++;

            if (Array.isArray(obj)) {



                data.byteLen[++data.index] = 0;
                data.byteSize[data.index] = [];
                if (typeof obj[0] == "string" && obj[0].substr(0, 6) == "length") ObjectParse.fixedArray(obj, data, parse, lvl);
                else ObjectParse.array(obj, data, parse, lvl);


            } else {


                ObjectParse.object(obj, data, parse, lvl, type, name);
            }
            lvl--;
            var lvl2 = lvl + 1;
            //   if (!skip) {






            //            }


            if (Array.isArray(obj)) {

                if (data.byteLen[data.index]) data.count.push("byteLen += " + data.byteLen[data.index] + ";");
                data.byteLen[data.index] = 0;
                data.index--;

                data.count.end()
                data.get.end();
                data.set.end();
            }
            if (type == 1) {
                data.get.push("data" + lvl + "." + name + "=data" + lvl2 + ";");
            } else
            if (type == 2) {
                data.get.push("data" + lvl + ".push(data" + lvl2 + ");");
            }

            return;
        }

        throw "ERR: Please only use a string, array, or object";
    }
    parse(object, false, 0);
    data.get.push2("return data1;")

    data.set.push2("return writer.toBuffer();")

    data.count.push("byteLen += Math.ceil(ifs.length / 7) + 1")
    data.count.push("var writer = new FastBuffers.writer(byteLen);")
    data.count.push("setIfs(writer,ifs);");

    var get = "function get(buf) {" + FastBuffers.NodeJS() + "\n" + data.get.toString() + "}";
    var set = "function set(data1) {" + FastBuffers.NodeJS() + "\n" + data.count.toString() + "\n" + data.set.toString() + "}";
    var getBrowser = "function get(buf) {" + FastBuffers.Browser() + "\n" + data.get.toString() + "}";
    var setBrowser = "function set(data1) {" + FastBuffers.Browser() + "\n" + data.count.toString() + "\n" + data.set.toString() + "}";
    return {
        get: get,
        set: set,
        getb: getBrowser,
        setb: setBrowser
    }
}