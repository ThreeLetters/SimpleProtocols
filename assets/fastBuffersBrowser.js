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
module.exports = function (type) {
    var FastBuffers = {
        reader: '\nvar Reader = function (buf, index) {\n\
    this.index = index || 0;\n\
    this.buffer = buf;\n\
}\n\
Reader.prototype.readDynamic = function() {\n\
            var num = 0;\n\
            for (var i = 0; i < 4; i++) {\n\
                var n = this.readUInt8();\n\
                num += (n & 127) << (i * 7);\n\
                if (n <= 127) {\n\
                    i++\n\
                    break;\n\
                }\n\
            }\n\
            if (i === 2) num += 128;\n\
            else if (i === 3) num += 16512;\n\
            else if (i === 4) num += 2113664;\n\
            return num;\n\
    }\n\
Reader.prototype.readString8 = function (mask) {\n\
    mask = mask || [0];\n\
    var data = [];\n\
    while (this.index <= this.buffer.byteLength) {\n\
        var d = this.readUInt8() ^ mask[data.length % mask.length];\n\
        if (!d) break;\n\
        data.push(String.fromCharCode(d));\n\
    }\n\
    return data.join("");\n\
}\n\
Reader.prototype.readString16 = function (mask) {\n\
    mask = mask || [0];\n\
    var data = [];\n\
    while (this.index <= this.buffer.byteLength) {\n\
        var d = this.readUInt16BE() ^ mask[data.length % mask.length];\n\
        if (!d) break;\n\
        data.push(String.fromCharCode(d));\n\
    }\n\
    return data.join("");\n\
}\n\
Reader.prototype.readString32 = function (mask) {\n\
    mask = mask || [0];\n\
    var data = [];\n\
    while (this.index <= this.buffer.byteLength) {\n\
        var d = this.readUInt32BE() ^ mask[data.length % mask.length];\n\
        if (!d) break;\n\
        data.push(String.fromCharCode(d));\n\
    }\n\
    return data.join("");\n\
}\n\
Reader.prototype.readUInt8 = function () {\n\
    return this.buffer.getUint8(this.index++);\n\
}\n\
Reader.prototype.readUInt16BE = function () {\n\
    var data = this.buffer.getUint16(this.index);\n\
    this.index += 2;\n\
    return data;\n\
}\n\
Reader.prototype.readUInt24BE = function () {\n\
    return (this.buffer.getUint8(this.index++) << 16) + (this.buffer.getUint8(this.index++) << 8) + this.buffer.getUint8(this.index++);\n\
}\n\
Reader.prototype.readUInt32BE = function () {\n\
    var data = this.buffer.getUint32(this.index);\n\
    this.index += 4;\n\
    return data;\n\
}\n\
Reader.prototype.readFloat32BE = function () {\n\
    var data = this.buffer.getFloat32(this.index);\n\
    this.index += 4;\n\
    return data;\n\
}',
        writer: '\nfunction Writer(size, index) {\n\
    this.buf = new ArrayBuffer(size);\n\
    this.buffer = new DataView(this.buf);\n\
    this.index = index || 0;\n\
}\n\
function getDynamicSize(a) {\n\
        if (a > 270549119) {\n\
            throw "ERR: OUT OF BOUNDS"\n\
        } else if (a > 2113663) {\n\
            return 4;\n\
        } else if (a > 16511) {\n\
            return 3;\n\
        } else if (a > 127) {\n\
            return 2;\n\
        } else {\n\
            return 1;\n\
        }\n\
    }\n\
Writer.prototype.writeDynamic = function(a) {\n\
            var i;\n\
            if (a > 270549119) {\n\
                throw "ERR: OUT OF BOUNDS"\n\
            } else if (a > 2113663) {\n\
                a = a - 2113664;\n\
                i = 3;\n\
            } else if (a > 16511) {\n\
                a = a - 16512;\n\
                i = 2;\n\
            } else if (a > 127) {\n\
                a = a - 128;\n\
                i = 1;\n\
            } else {\n\
                i = 0;\n\
            }\n\
            for (var j = 0; j < i; j++) {\n\
                this.writeUInt8((a & 127) | 128);\n\
                a = a >> 7;\n\
            }\n\
            this.writeUInt8(a);\n\
        }\n\
Writer.prototype.writeString8 = function (string, mask) {\n\
    mask = mask || [0];\n\
    for (var i = 0; i < string.length; i++) {\n\
        this.writeUInt8(string.charCodeAt(i) ^ mask[i % mask.length])\n\
    }\n\
    this.writeUInt8(mask[i % mask.length])\n\
}\n\
Writer.prototype.writeString16 = function (string, mask) {\n\
    mask = mask || [0];\n\
    for (var i = 0; i < string.length; i++) {\n\
        this.writeUInt16BE(string.charCodeAt(i) ^ mask[i % mask.length])\n\
    }\n\
    this.writeUInt16BE(mask[i % mask.length])\n\
}\n\
Writer.prototype.writeString32 = function (string, mask) {\n\
    mask = mask || [0];\n\
    for (var i = 0; i < string.length; i++) {\n\
        this.writeUInt32BE(string.charCodeAt(i) ^ mask[i % mask.length])\n\
    }\n\
    this.writeUInt32BE(mask[i % mask.length])\n\
}\n\
Writer.prototype.writeUInt8 = function (n,i) {\n\
    this.buffer.setUint8(i || this.index++,n)\n\
}\n\
Writer.prototype.writeUInt16BE = function (n) {\n\
    this.buffer.setUint16(this.index,n)\n\
    this.index += 2;\n\
}\n\
Writer.prototype.writeUInt24BE = function (n) {\n\
    this.buffer.setUint8(this.index + 2,n & 255);\n\
    n = n >> 8;\n\
    this.buffer.setUint8(this.index + 1,n & 255);\n\
    n = n >> 8;\n\
    this.buffer.setUint8(this.index, n);\n\
    this.index += 3;\n\
}\n\
Writer.prototype.writeUInt32BE = function (n) {\n\
    this.buffer.setUint32(this.index,n)\n\
    this.index += 4;\n\
}\n\
Writer.prototype.writeFloat32BE = function (n) {\n\
    this.buffer.setFloat32(this.index,n)\n\
    this.index += 4;\n\
}\n\
Writer.prototype.toBuffer = function () {\n\
    return this.buf;\n\
}'

    }

    return FastBuffers[type];
}