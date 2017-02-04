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
module.exports = function (obj) {

    var split = obj.split(" ");

    var min = parseInt(split[1])
    var max = parseInt(split[2])

    var diff = max - min;
    var off = (min) ? (min < 0) ? "+" + (min * -1) : "-" + min : "";

    if (diff > 255) { // 16
        return "reader.readUInt16BE()" + off;
    } else if (diff > 65536) { // 32
        return "reader.readUInt32BE()" + off;
    } else {
        return "reader.readUInt8()" + off;
    }
}