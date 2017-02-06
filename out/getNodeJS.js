function get(buf) {var FastBuffers = {
    writer: class Writer {
        constructor(size) {
            this.index = 0;
            this.buffer = Buffer.alloc(size);
        }
        writeString8(string) {
            for (var i = 0; i < string.length; i++) {
                this.writeUInt8(string.charCodeAt(i))
            }
            this.writeUInt8(0)
        }
        writeString16(string) {
            for (var i = 0; i < string.length; i++) {
                this.writeUInt16BE(string.charCodeAt(i))
            }
            this.writeUInt16BE(0)
        }
        writeString32(string) {
            for (var i = 0; i < string.length; i++) {
                this.writeUInt32BE(string.charCodeAt(i))
            }
            this.writeUInt32BE(0)
        }
        writeInt8(n) {
            this.buffer.writeInt8(n, this.index++)
        }
        writeInt16BE(n) {
            this.buffer.writeInt16BE(n, this.index)
            this.index += 2;
        }
        writeInt16LE(n) {
            this.buffer.writeInt16LE(n, this.index)
            this.index += 2
        }
        writeInt32BE(n) {
            this.buffer.writeInt32BE(n, this.index)
            this.index += 4;
        }
        writeInt32LE(n) {
            this.buffer.writeInt32LE(n, this.index)
            this.index += 4;
        }
        writeUInt8(n) {
            this.buffer.writeUInt8(n, this.index++)
        }
        writeUInt16BE(n) {
            this.buffer.writeUInt16BE(n, this.index)
            this.index += 2;
        }
        writeUInt16LE(n) {
            this.buffer.writeUInt16LE(n, this.index)
            this.index += 2;
        }
        writeUInt32BE(n) {
            this.buffer.writeUInt32BE(n, this.index)
            this.index += 4;
        }
        writeUInt32LE(n) {
            this.buffer.writeUInt32LE(n, this.index)
            this.index += 4;
        }
        toBuffer() {
            return this.buffer;
        }
    },
    reader: class Reader {
        constructor(buf) {
            this.index = 0;
            this.buffer = buf;
        }
        readString8() {
            var data = "";
            while (this.index <= this.buffer.length) {
                var d = this.readUInt8();
                if (!d) break;
                data += String.fromCharCode(d);
            }
            return data;
        }
        readString16() {
            var data = "";
            while (this.index <= this.buffer.length) {
                var d = this.readUInt16BE();
                if (!d) break;
                data += String.fromCharCode(d);
            }
            return data;
        }
        readString32() {
            var data = "";
            while (this.index <= this.buffer.length) {
                var d = this.readUInt32BE();
                if (!d) break;
                data += String.fromCharCode(d);
            }
            return data;
        }
        readInt8() {
            return this.buffer.readInt8(this.index++);
        }
        readUInt8() {
            return this.buffer.readUInt8(this.index++);
        }
        readInt16BE() {
            var data = this.buffer.readInt16BE(this.index);
            this.index += 2;
            return data;
        }
        readInt16LE() {
            var data = this.buffer.readInt16LE(this.index);
            this.index += 2;
            return data;
        }
        readUInt16BE() {
            var data = this.buffer.readUInt16BE(this.index);
            this.index += 2;
            return data;
        }
        readUInt16LE() {
            var data = this.buffer.readUInt16LE(this.index);
            this.index += 2;
            return data;
        }
        readInt32BE() {
            var data = this.buffer.readInt32BE(this.index);
            this.index += 4;
            return data;
        }
        readInt32LE() {
            var data = this.buffer.readInt32LE(this.index);
            this.index += 4;
            return data;
        }
        readUInt32BE() {
            var data = this.buffer.readUInt32BE(this.index);
            this.index += 4;
            return data;
        }
        readUInt32LE() {
            var data = this.buffer.readUInt32LE(this.index);
            this.index += 4;
            return data;
        }
    }
}
function getIfs(reader) {
    var final = [];
    while (true) {
        var num = reader.readUInt8();
        if (num == 0) break;
       var length = 7
   while(length--)
   final.push((num >> length ) & 1);
}
return final;
        }
var reader = new FastBuffers.reader(buf);
var data1;
var ifid = 0;
var ifs = getIfs(reader);
var len1 = reader.readUInt16BE();
var data1 = [];
for (var i1 = 0; i1 < len1; i1 ++) {
var data2 = {};
data2.hello=reader.readString8();
data2.world=reader.readUInt8()-100;
var data3 = {};
data3.something=reader.readString16();
if (ifs[ifid++] == 1) {
var data4 = {};
data4.foo=reader.readString8();
data4.bar=reader.readUInt8();
data3.lolol=data4;
} else {
data3.lolol=reader.readUInt16BE()-2000;
}
data2.lol=data3;
data1.push(data2);
}
return data1;}