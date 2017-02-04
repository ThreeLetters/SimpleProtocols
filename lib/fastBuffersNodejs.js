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

    return 'var FastBuffers = {\n\
    writer: class Writer {\n\
        constructor(size) {\n\
            this.index = 0;\n\
            this.buffer = Buffer.alloc(size);\n\
        }\n\
        writeString8(string) {\n\
            for (var i = 0; i < string.length; i++) {\n\
                this.writeUInt8(string.charCodeAt(i))\n\
            }\n\
            this.writeUInt8(0)\n\
        }\n\
        writeString16(string) {\n\
            for (var i = 0; i < string.length; i++) {\n\
                this.writeUInt16BE(string.charCodeAt(i))\n\
            }\n\
            this.writeUInt16BE(0)\n\
        }\n\
        writeString32(string) {\n\
            for (var i = 0; i < string.length; i++) {\n\
                this.writeUInt32BE(string.charCodeAt(i))\n\
            }\n\
            this.writeUInt32BE(0)\n\
        }\n\
        writeInt8(n) {\n\
            this.buffer.writeInt8(n, this.index++)\n\
        }\n\
        writeInt16BE(n) {\n\
            this.buffer.writeInt16BE(n, this.index)\n\
            this.index += 2;\n\
        }\n\
        writeInt16LE(n) {\n\
            this.buffer.writeInt16LE(n, this.index)\n\
            this.index += 2\n\
        }\n\
        writeInt32BE(n) {\n\
            this.buffer.writeInt32BE(n, this.index)\n\
            this.index += 4;\n\
        }\n\
        writeInt32LE(n) {\n\
            this.buffer.writeInt32LE(n, this.index)\n\
            this.index += 4;\n\
        }\n\
        writeUInt8(n) {\n\
            this.buffer.writeUInt8(n, this.index++)\n\
        }\n\
        writeUInt16BE(n) {\n\
            this.buffer.writeUInt16BE(n, this.index)\n\
            this.index += 2;\n\
        }\n\
        writeUInt16LE(n) {\n\
            this.buffer.writeUInt16LE(n, this.index)\n\
            this.index += 2;\n\
        }\n\
        writeUInt32BE(n) {\n\
            this.buffer.writeUInt32BE(n, this.index)\n\
            this.index += 4;\n\
        }\n\
        writeUInt32LE(n) {\n\
            this.buffer.writeUInt32LE(n, this.index)\n\
            this.index += 4;\n\
        }\n\
        toBuffer() {\n\
            return this.buffer;\n\
        }\n\
    },\n\
    reader: class Reader {\n\
        constructor(buf) {\n\
            this.index = 0;\n\
            this.buffer = buf;\n\
        }\n\
        readString8() {\n\
            var data = "";\n\
            while (this.index <= this.buffer.length) {\n\
                var d = this.readUInt8();\n\
                if (!d) break;\n\
                data += String.fromCharCode(d);\n\
            }\n\
            return data;\n\
        }\n\
        readString16() {\n\
            var data = "";\n\
            while (this.index <= this.buffer.length) {\n\
                var d = this.readUInt16BE();\n\
                if (!d) break;\n\
                data += String.fromCharCode(d);\n\
            }\n\
            return data;\n\
        }\n\
        readString32() {\n\
            var data = "";\n\
            while (this.index <= this.buffer.length) {\n\
                var d = this.readUInt32BE();\n\
                if (!d) break;\n\
                data += String.fromCharCode(d);\n\
            }\n\
            return data;\n\
        }\n\
        readInt8() {\n\
            return this.buffer.readInt8(this.index++);\n\
        }\n\
        readUInt8() {\n\
            return this.buffer.readUInt8(this.index++);\n\
        }\n\
        readInt16BE() {\n\
            var data = this.buffer.readInt16BE(this.index);\n\
            this.index += 2;\n\
            return data;\n\
        }\n\
        readInt16LE() {\n\
            var data = this.buffer.readInt16LE(this.index);\n\
            this.index += 2;\n\
            return data;\n\
        }\n\
        readUInt16BE() {\n\
            var data = this.buffer.readUInt16BE(this.index);\n\
            this.index += 2;\n\
            return data;\n\
        }\n\
        readUInt16LE() {\n\
            var data = this.buffer.readUInt16LE(this.index);\n\
            this.index += 2;\n\
            return data;\n\
        }\n\
        readInt32BE() {\n\
            var data = this.buffer.readInt32BE(this.index);\n\
            this.index += 4;\n\
            return data;\n\
        }\n\
        readInt32LE() {\n\
            var data = this.buffer.readInt32LE(this.index);\n\
            this.index += 4;\n\
            return data;\n\
        }\n\
        readUInt32BE() {\n\
            var data = this.buffer.readUInt32BE(this.index);\n\
            this.index += 4;\n\
            return data;\n\
        }\n\
        readUInt32LE() {\n\
            var data = this.buffer.readUInt32LE(this.index);\n\
            this.index += 4;\n\
            return data;\n\
        }\n\
    }\n\
}';

}