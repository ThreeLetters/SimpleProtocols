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
        writer: '\nfunction Writer(size) {\n\
            this.index = 0;\n\
            this.buffer = Buffer.alloc(size);\n\
        }\n\
        Writer.prototype.writeString8 = function(string) {\n\
            for (var i = 0; i < string.length; i++) {\n\
                this.writeUInt8(string.charCodeAt(i))\n\
            }\n\
            this.writeUInt8(0)\n\
        }\n\
         Writer.prototype.writeString16 = function(string) {\n\
            for (var i = 0; i < string.length; i++) {\n\
                this.writeUInt16BE(string.charCodeAt(i))\n\
            }\n\
            this.writeUInt16BE(0)\n\
        }\n\
         Writer.prototype.writeString32 = function(string) {\n\
            for (var i = 0; i < string.length; i++) {\n\
                this.writeUInt32BE(string.charCodeAt(i))\n\
            }\n\
            this.writeUInt32BE(0)\n\
        }\n\
         Writer.prototype.writeInt8 = function(n) {\n\
            this.buffer.writeInt8(n, this.index++)\n\
        }\n\
         Writer.prototype.writeInt16BE = function(n) {\n\
            this.buffer.writeInt16BE(n, this.index)\n\
            this.index += 2;\n\
        }\n\
         Writer.prototype.writeInt16LE = function(n) {\n\
            this.buffer.writeInt16LE(n, this.index)\n\
            this.index += 2\n\
        }\n\
         Writer.prototype.writeInt32BE = function(n) {\n\
            this.buffer.writeInt32BE(n, this.index)\n\
            this.index += 4;\n\
        }\n\
         Writer.prototype.writeInt32LE = function(n) {\n\
            this.buffer.writeInt32LE(n, this.index)\n\
            this.index += 4;\n\
        }\n\
         Writer.prototype.writeUInt8 = function(n) {\n\
            this.buffer.writeUInt8(n, this.index++)\n\
        }\n\
         Writer.prototype.writeUInt16BE = function(n) {\n\
            this.buffer.writeUInt16BE(n, this.index)\n\
            this.index += 2;\n\
        }\n\
         Writer.prototype.writeUInt16LE = function(n) {\n\
            this.buffer.writeUInt16LE(n, this.index)\n\
            this.index += 2;\n\
        }\n\
         Writer.prototype.writeUInt32BE = function(n) {\n\
            this.buffer.writeUInt32BE(n, this.index)\n\
            this.index += 4;\n\
        }\n\
         Writer.prototype.writeUInt32LE = function(n) {\n\
            this.buffer.writeUInt32LE(n, this.index)\n\
            this.index += 4;\n\
        }\n\
         Writer.prototype.toBuffer = function() {\n\
            return this.buffer;\n\
        }',

        reader: '\nfunction Reader(buf) {\n\
            this.index = 0;\n\
            this.buffer = buf;\n\
        }\n\
        Reader.prototype.readString8 = function() {\n\
            var data = "";\n\
            while (this.index <= this.buffer.length) {\n\
                var d = this.readUInt8();\n\
                if (!d) break;\n\
                data += String.fromCharCode(d);\n\
            }\n\
            return data;\n\
        }\n\
        Reader.prototype.readString16 = function() {\n\
            var data = "";\n\
            while (this.index <= this.buffer.length) {\n\
                var d = this.readUInt16BE();\n\
                if (!d) break;\n\
                data += String.fromCharCode(d);\n\
            }\n\
            return data;\n\
        }\n\
        Reader.prototype.readString32 = function() {\n\
            var data = "";\n\
            while (this.index <= this.buffer.length) {\n\
                var d = this.readUInt32BE();\n\
                if (!d) break;\n\
                data += String.fromCharCode(d);\n\
            }\n\
            return data;\n\
        }\n\
        Reader.prototype.readInt8 = function() {\n\
            return this.buffer.readInt8(this.index++);\n\
        }\n\
        Reader.prototype.readUInt8 = function() {\n\
            return this.buffer.readUInt8(this.index++);\n\
        }\n\
        Reader.prototype.readInt16BE = function() {\n\
            var data = this.buffer.readInt16BE(this.index);\n\
            this.index += 2;\n\
            return data;\n\
        }\n\
        Reader.prototype.readInt16LE = function() {\n\
            var data = this.buffer.readInt16LE(this.index);\n\
            this.index += 2;\n\
            return data;\n\
        }\n\
        Reader.prototype.readUInt16BE = function() {\n\
            var data = this.buffer.readUInt16BE(this.index);\n\
            this.index += 2;\n\
            return data;\n\
        }\n\
        Reader.prototype.readUInt16LE = function() {\n\
            var data = this.buffer.readUInt16LE(this.index);\n\
            this.index += 2;\n\
            return data;\n\
        }\n\
        Reader.prototype.readInt32BE = function() {\n\
            var data = this.buffer.readInt32BE(this.index);\n\
            this.index += 4;\n\
            return data;\n\
        }\n\
        Reader.prototype.readInt32LE = function() {\n\
            var data = this.buffer.readInt32LE(this.index);\n\
            this.index += 4;\n\
            return data;\n\
        }\n\
        Reader.prototype.readUInt32BE = function() {\n\
            var data = this.buffer.readUInt32BE(this.index);\n\
            this.index += 4;\n\
            return data;\n\
        }\n\
        Reader.prototype.readUInt32LE = function() {\n\
            var data = this.buffer.readUInt32LE(this.index);\n\
            this.index += 4;\n\
            return data;\n\
        }'

    }
    return FastBuffers[type]
}