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
module.exports = function (obj, data, name, type, lvl, opt) {

    var split = obj.split(" ");
    var get, set;
    var min = parseInt(split[1])
    var max = parseInt(split[2])

    var diff = max - min;
    var mindiff;


    if (diff > 255) { // 16
        get = "reader.readUInt16BE()";
        set = "writer.writeUInt16BE(";
        data.byteLen[data.index] += 2;
        mindiff = 65536 - diff;
    } else if (diff > 65536) { // 32
        get = "reader.readUInt32BE()";
        set = "writer.writeUInt32BE(";
        data.byteLen[data.index] += 4;
        mindiff = 4294967295 - diff;
    } else { // 8
        get = "reader.readUInt8()";
        set = "writer.writeUInt8(";
        data.byteLen[data.index]++;
        mindiff = 255 - diff;
    }
    if (opt.scrambleNumbers) {
        var offset = Math.floor(Math.random() * mindiff);
        min += offset;
    }

    var off = (min) ? (min < 0) ? "-" + (min * -1) : "+" + min : "";
    var off2 = (min) ? (min < 0) ? "+" + (min * -1) : "-" + min : "";

    get += off
    var code, code2

    var lvl2 = lvl + 1
    switch (type) {
    case 0: // no object
        code = "data" + lvl2 + "=" + get + ";";
        code2 = set + "data" + lvl2 + off2 + ")"

        break;
    case 1: // object
        code = "data" + lvl + "." + name + "=" + get + ";";
        code2 = set + "data" + lvl + "." + name + off2 + ");";

        break;
    case 2: // array
        code = "data" + lvl + ".push(" + get + ");"
        code2 = set + "data" + lvl2 + ");";
        break;
    }
    data.get.push(code);
    data.set.push(code2);
}