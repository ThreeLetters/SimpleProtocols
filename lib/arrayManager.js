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
module.exports = function (obj, data, parse, lvl) {
    var nowGet = data.get.index;
    data.get.push("var len" + lvl + " = reader.readDynamic();");
    data.get.push("var data" + lvl + " = [];")
    data.get.push("for (var i" + lvl + " = 0; i" + lvl + " < len" + lvl + "; i" + lvl + " ++) {")
    data.get.push4("}")

    var lvl2 = lvl + 1;

    var nowSet = data.set.index;
    data.set.push("var len" + lvl + " = data" + lvl + ".length")
    data.set.push("writer.writeDynamic(len" + lvl + ")")
    data.set.push("for (var i" + lvl + " = 0; i" + lvl + " < len" + lvl + "; i" + lvl + " ++) {")
    data.set.push("var data" + lvl2 + " = data" + lvl + "[i" + lvl + "];")
    data.set.push4("}")

    var now = data.count.index + 1;
    data.count.push("byteLen += getDynamicSize(data" + lvl + ".length)")
    data.count.push("for (var i" + lvl + " = 0; i" + lvl + " < data" + lvl + ".length; i" + lvl + " ++) {")
    data.count.push("var data" + lvl2 + " = data" + lvl + "[i" + lvl + "];")

    var appendIndex = data.count.append.length;
    data.count.push4("}");

    data.breakArrays.push({
        lvl: lvl
    })
    var r = parse(obj[0], false, 2);
    var mine = data.breakArrays.pop();
    if (mine.useBreak) {
        data.get.set("", nowGet)
        data.get.set(mine.useOneBitFlag ? `for (var a${lvl} = 1; a${lvl} & 1;) {` : "while (true) {", nowGet + 2);
        data.get.insert(`var b${lvl} = ${mine.getCode};`, nowGet + 3);
        data.get.insert(`if (b${lvl} == ${mine.breakKey}) break;`, nowGet + 4);

        data.set.set('', nowSet + 1);
        if (!mine.useOneBitFlag) {
            data.set.insert(`var c${lvl} = writer.index++;`, nowSet + 4);
        }
        if (mine.useOneBitFlag) {
            data.count.set(`if (!data${lvl}.length) byteLen++;`, now - 1);
        } else {
            data.count.set(`byteLen++;`, now - 1);
        }

        data.set.append[appendIndex] = `}\n${mine.useOneBitFlag ? `if (!len${lvl}) ` : ''}writer.writeUInt8(${mine.breakKey});`;


    } else {
        if (mine.useOneBitFlag) {


            data.count.set(`byteLen++;`, now - 1);
            data.get.set("", nowGet)
            var rand = Math.floor(Math.random() * 155) + 50;
            data.get.set(`for (var a${lvl} = reader.readUint8() < ${rand}; a${lvl} & 1;) {`, nowGet + 2);
            data.set.set(`writer.writeUInt8(data${lvl}.length ? Math.random() * ${rand} : ${rand} + Math.random() * ${256 - rand});`, nowSet + 1);
        }

    }

    if (r) {

        data.count.data.splice(now, data.count.index - now)
        data.count.index = now;
        data.count.append.splice(0, 1);
        //  console.log(data)
    }


    return r;
}