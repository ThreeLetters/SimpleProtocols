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
    var get, set, count;
    var off = "",
        off2 = "";
    var decimals = 0;
    var minScramble = 0;
    var maxScramble = 2147483647;
    var scrambleBinary = true;
    var dtobj = {
        dynamic: function () {
            get = 'reader.readDynamic()'
            set = 'writer.writeDynamic('
            count = 'byteLen += getDynamicSize(';
            maxScramble = 127;
        },
        uint8: function () {
            get = 'reader.readUInt8()'
            set = 'writer.writeUInt8('
            data.byteLen[data.index] += 1;
            maxScramble = 255;
        },
        int8: function () {
            get = 'reader.readInt8()'
            set = 'writer.writeInt8('
            data.byteLen[data.index] += 1;
            maxScramble = 127;
            minScramble = -128
        },
        uint16: function () {
            get = 'reader.readUInt16BE()'
            set = 'writer.writeUInt16BE('
            data.byteLen[data.index] += 2;
            maxScramble = 65535
        },
        float32: function () {
            get = 'reader.readFloat32BE()'
            set = 'writer.writeFloat32BE('
            data.byteLen[data.index] += 4;
            maxScramble = 0;
            scrambleBinary = false;
        },
        int16: function () {
            get = 'reader.readInt16BE()'
            set = 'writer.writeInt16BE('
            data.byteLen[data.index] += 4;
            maxScramble = 32767;
            minScramble = -32768
        },
        uint24: function () {
            get = 'reader.readUInt24BE()'
            set = 'writer.writeUInt24BE('
            data.byteLen[data.index] += 3;
            maxScramble = 16777215;
        },
        uint32: function () {
            get = 'reader.readUInt32BE()'
            set = 'writer.writeUInt32BE('
            data.byteLen[data.index] += 4;
        },
        int32: function () {
            get = 'reader.readInt32BE()'
            set = 'writer.writeInt32BE('
            data.byteLen[data.index] += 4;
            minScramble = -2147483648;
        }
    }
    if (dtobj[split[1]]) {
        dtobj[split[1]]();
    } else {

        var ind1 = split[1].indexOf("."),
            ind2 = split[2].indexOf(".")

        var decimals1 = 0,
            decimals2 = 0
        if (ind1 != -1) {
            var s = split[1].split(".");
            split[1] = s.join('');
            decimals1 = s[1].length;
        }
        if (ind2 != -1) {
            var s = split[1].split(".");
            split[2] = s.join('');
            decimals2 = s[1].length;
        }

        decimals = Math.max(decimals1, decimals2)

        var min = parseInt(split[1]) * Math.pow(10, decimals - decimals1);
        var max = parseInt(split[2]) * Math.pow(10, decimals - decimals2);
        var diff = max - min;


        var mindiff;


        if (diff > 16777215) { // 32
            dtobj.uint32();
            mindiff = 4294967295 - diff;
        } else if (diff > 65536) { // 24
            dtobj.uint24();
            mindiff = 16777215 - diff;
        } else if (diff > 255) { // 16
            dtobj.uint16();
            mindiff = 65536 - diff;
        } else { // 8
            dtobj.uint8();
            mindiff = 255 - diff;
        }
        min = -min;
        if (opt.scrambleNumbers) {
            var offset = Math.floor(Math.random() * mindiff);
            min += offset;
        }
        var omin = min;
        if (min) {
            min = Math.abs(min)
            if (omin <= 0) {
                off = "+" + min;
                off2 = "-" + min;
            } else {

                off = "-" + min;
                off2 = "+" + min;
            }
        }

    }

    var code, code2


    var lvl2 = lvl + 1;
    var scramble = "";
    var rounderend = "",
        rounderstart = "";

    if (opt.scrambleNumbers && scrambleBinary) {
        scramble = "^" + (Math.floor(Math.random() * (maxScramble - minScramble)) + minScramble);
        rounderend = ">>>0)"
        rounderstart = "("
    }
    var decimalsToInt = "",
        intToDecimals = "",
        decimalsStart = ""
    if (decimals) {
        decimals = Math.pow(10, decimals);
        decimalsToInt = "*" + decimals + ">>0)";
        intToDecimals = ")/" + decimals;
        decimalsStart = "("
    }


    get = decimalsStart + rounderstart + "(" + get + scramble + ")" + rounderend + off + intToDecimals;

    switch (type) {
        case 0: // no object
            code = "data" + lvl2 + "=" + get + ";";
            code2 = set + rounderstart + decimalsStart + "(data" + lvl2 + decimalsToInt + off2 + ")" + scramble + ")" + rounderend + ";";
            if (count) data.count.push(count + rounderstart + decimalsStart + "data" + lvl2 + decimalsToInt + scramble + off2 + ")" + rounderend + ";");
            break;
        case 1: // object
            code = "data" + lvl + "." + name + "=" + get + ";";
            code2 = set + rounderstart + decimalsStart + "(data" + lvl + "." + name + decimalsToInt + off2 + ")" + scramble + ")" + rounderend + ";";
            if (count) data.count.push(count + rounderstart + decimalsStart + "data" + lvl + "." + name + decimalsToInt + scramble + off2 + ")" + rounderend + ";");

            break;
        case 2: // array
            code = "data" + lvl + ".push(" + get + ");"
            code2 = set + rounderstart + decimalsStart + "(data" + lvl2 + decimalsToInt + off2 + ")" + scramble + ")" + rounderend + ";";
            if (count) data.count.push(count + rounderstart + decimalsStart + "data" + lvl2 + decimalsToInt + scramble + off2 + ")" + rounderend + ";");
            break;
    }
    data.get.push(code);
    data.set.push(code2);
    return !count;
}