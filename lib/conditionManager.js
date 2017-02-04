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

module.exports = function (obj, data, parse, type, name, lvl) {
    var condition = "var obj=data" + (lvl + 1) + ";if (" + obj.if+") {";
    data.index++;
    data.byteLen[data.index] = 0;
    data.get.push("if (ifs[ifid++] == 1) {");
    data.set.push(condition);
    data.count.push(condition);
    data.count.push("ifs.push(1)");
    parse(obj.then, name, type);
    if (data.byteLen[data.index]) data.count.push("byteLen += " + data.byteLen[data.index] + ";");
    data.byteLen[data.index] = 0;
    data.get.push("} else {");
    data.set.push("} else {");
    data.count.push("} else {");
    data.count.push("ifs.push(0)");
    parse(obj.else, name, type);
    if (data.byteLen[data.index]) data.count.push("byteLen += " + data.byteLen[data.index] + ";");
    data.byteLen[data.index] = 0;
    data.get.push("}");
    data.set.push("}");
    data.count.push("}");

    data.index--;

}