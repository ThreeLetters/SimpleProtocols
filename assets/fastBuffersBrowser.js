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
module.exports = function () {
    return 'var FastBuffers = {};\n\
var BinReader = function (buf) {\n\
    this.index = 0;\n\
    this.buffer = new DataView(buf);\n\
}\n\
BinReader.prototype.readString8 = function () {\n\
    var data = "";\n\
    while (this.index <= this.buffer.byteLength) {\n\
        var d = this.readUInt8();\n\
        if (!d) break;\n\
        data += String.fromCharCode(d);\n\
    }\n\
    return data;\n\
}\n\
BinReader.prototype.readString16 = function () {\n\
    var data = "";\n\
    while (this.index <= this.buffer.byteLength) {\n\
        var d = this.readUInt16BE();\n\
        if (!d) break;\n\
        data += String.fromCharCode(d);\n\
    }\n\
    return data;\n\
}\n\
BinReader.prototype.readString32 = function () {\n\
    var data = "";\n\
    while (this.index <= this.buffer.byteLength) {\n\
        var d = this.readUInt32BE();\n\
        if (!d) break;\n\
        data += String.fromCharCode(d);\n\
    }\n\
    return data;\n\
}\n\
BinReader.prototype.readInt8 = function () {\n\
    return this.buffer.getInt8(this.index++);\n\
}\n\
BinReader.prototype.readUInt8 = function () {\n\
    return this.buffer.getUint8(this.index++);\n\
}\n\
BinReader.prototype.readInt16BE = function () {\n\
    var data = this.buffer.getInt16(this.index);\n\
    this.index += 2;\n\
    return data;\n\
}\n\
BinReader.prototype.readInt16LE = function () {\n\
    var data = this.buffer.getInt16(this.index, true);\n\
    this.index += 2;\n\
    return data;\n\
}\n\
BinReader.prototype.readUInt16BE = function () {\n\
    var data = this.buffer.getUint16(this.index);\n\
    this.index += 2;\n\
    return data;\n\
}\n\
BinReader.prototype.readUInt16LE = function () {\n\
    var data = this.buffer.getUint16(this.index, true);\n\
    this.index += 2;\n\
    return data;\n\
}\n\
BinReader.prototype.readInt32BE = function () {\n\
    var data = this.buffer.getInt32(this.index);\n\
    this.index += 4;\n\
    return data;\n\
}\n\
BinReader.prototype.readInt32LE = function () {\n\
    var data = this.buffer.getInt32(this.index, true);\n\
    this.index += 4;\n\
    return data;\n\
}\n\
BinReader.prototype.readUInt32BE = function () {\n\
    var data = this.buffer.getUint32(this.index);\n\
    this.index += 4;\n\
    return data;\n\
}\n\
BinReader.prototype.readUInt32LE = function () {\n\
    var data = this.buffer.getUint32(this.index, true);\n\
    this.index += 4;\n\
    return data;\n\
}\n\
function BinWriter(size) {\n\
    this.buf = new ArrayBuffer(size);\n\
    this.buffer = new DataView(this.buf);\n\
    this.index = 0;\n\
}\n\
BinWriter.prototype.writeString8 = function (string) {\n\
    for (var i = 0; i < string.length; i++) {\n\
        this.writeUInt8(string.charCodeAt(i))\n\
    }\n\
    this.writeUInt8(0)\n\
}\n\
BinWriter.prototype.writeString16 = function (string) {\n\
    for (var i = 0; i < string.length; i++) {\n\
        this.writeUInt16BE(string.charCodeAt(i))\n\
    }\n\
    this.writeUInt16BE(0)\n\
}\n\
BinWriter.prototype.writeString32 = function (string) {\n\
    for (var i = 0; i < string.length; i++) {\n\
        this.writeUInt32BE(string.charCodeAt(i))\n\
    }\n\
    this.writeUInt32BE(0)\n\
}\n\
BinWriter.prototype.writeInt8 = function (n) {\n\
    this.buffer.setInt8(n, this.index++)\n\
}\n\
BinWriter.prototype.writeInt16BE = function (n) {\n\
    this.buffer.setInt16(n, this.index)\n\
    this.index += 2;\n\
}\n\
BinWriter.prototype.writeInt16LE = function (n) {\n\
    this.buffer.setInt16(n, this.index, true)\n\
    this.index += 2;\n\
}\n\
BinWriter.prototype.writeInt32BE = function (n) {\n\
    this.buffer.setInt32(n, this.index)\n\
    this.index += 4;\n\
}\n\
BinWriter.prototype.writeInt32LE = function (n) {\n\
    this.buffer.setInt32(n, this.index, true)\n\
    this.index += 4;\n\
}\n\
BinWriter.prototype.writeUInt8 = function (n) {\n\
    this.buffer.setUint8(n, this.index++)\n\
}\n\
BinWriter.prototype.writeUInt16BE = function (n) {\n\
    this.buffer.setUint16(n, this.index)\n\
    this.index += 2;\n\
}\n\
BinWriter.prototype.writeUInt16LE = function (n) {\n\
    this.buffer.setUint16(n, this.index, true)\n\
    this.index += 2;\n\
}\n\
BinWriter.prototype.writeUInt32BE = function (n) {\n\
    this.buffer.setUint32(n, this.index)\n\
    this.index += 4;\n\
}\n\
BinWriter.prototype.writeUInt32LE = function (n) {\n\
    this.buffer.setUint32(n, this.index, true)\n\
    this.index += 4;\n\
}\n\
BinWriter.prototype.toBuffer = function () {\n\
    return this.buf;\n\
}\n\
FastBuffers.reader = BinReader;\n\
FastBuffers.writer = BinWriter;';
}