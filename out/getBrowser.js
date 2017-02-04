function get(buf) {var FastBuffers = {};
var BinReader = function (buf) {
    this.index = 0;
    this.buffer = new DataView(buf);
}
BinReader.prototype.readString8 = function () {
    var data = "";
    while (this.index <= this.buffer.byteLength) {
        var d = this.readUInt8();
        if (!d) break;
        data += String.fromCharCode(d);
    }
    return data;
}
BinReader.prototype.readString16 = function () {
    var data = "";
    while (this.index <= this.buffer.byteLength) {
        var d = this.readUInt16BE();
        if (!d) break;
        data += String.fromCharCode(d);
    }
    return data;
}
BinReader.prototype.readString32 = function () {
    var data = "";
    while (this.index <= this.buffer.byteLength) {
        var d = this.readUInt32BE();
        if (!d) break;
        data += String.fromCharCode(d);
    }
    return data;
}
BinReader.prototype.readInt8 = function () {
    return this.buffer.getInt8(this.index++);
}
BinReader.prototype.readUInt8 = function () {
    return this.buffer.getUint8(this.index++);
}
BinReader.prototype.readInt16BE = function () {
    var data = this.buffer.getInt16(this.index);
    this.index += 2;
    return data;
}
BinReader.prototype.readInt16LE = function () {
    var data = this.buffer.getInt16(this.index, true);
    this.index += 2;
    return data;
}
BinReader.prototype.readUInt16BE = function () {
    var data = this.buffer.getUint16(this.index);
    this.index += 2;
    return data;
}
BinReader.prototype.readUInt16LE = function () {
    var data = this.buffer.getUint16(this.index, true);
    this.index += 2;
    return data;
}
BinReader.prototype.readInt32BE = function () {
    var data = this.buffer.getInt32(this.index);
    this.index += 4;
    return data;
}
BinReader.prototype.readInt32LE = function () {
    var data = this.buffer.getInt32(this.index, true);
    this.index += 4;
    return data;
}
BinReader.prototype.readUInt32BE = function () {
    var data = this.buffer.getUint32(this.index);
    this.index += 4;
    return data;
}
BinReader.prototype.readUInt32LE = function () {
    var data = this.buffer.getUint32(this.index, true);
    this.index += 4;
    return data;
}
function BinWriter(size) {
    this.buf = new ArrayBuffer(size);
    this.buffer = new DataView(this.buf);
    this.index = 0;
}
BinWriter.prototype.writeString8 = function (string) {
    for (var i = 0; i < string.length; i++) {
        this.writeUInt8(string.charCodeAt(i))
    }
    this.writeUInt8(0)
}
BinWriter.prototype.writeString16 = function (string) {
    for (var i = 0; i < string.length; i++) {
        this.writeUInt16BE(string.charCodeAt(i))
    }
    this.writeUInt16BE(0)
}
BinWriter.prototype.writeString32 = function (string) {
    for (var i = 0; i < string.length; i++) {
        this.writeUInt32BE(string.charCodeAt(i))
    }
    this.writeUInt32BE(0)
}
BinWriter.prototype.writeInt8 = function (n) {
    this.buffer.setInt8(n, this.index++)
}
BinWriter.prototype.writeInt16BE = function (n) {
    this.buffer.setInt16(n, this.index)
    this.index += 2;
}
BinWriter.prototype.writeInt16LE = function (n) {
    this.buffer.setInt16(n, this.index, true)
    this.index += 2;
}
BinWriter.prototype.writeInt32BE = function (n) {
    this.buffer.setInt32(n, this.index)
    this.index += 4;
}
BinWriter.prototype.writeInt32LE = function (n) {
    this.buffer.setInt32(n, this.index, true)
    this.index += 4;
}
BinWriter.prototype.writeUInt8 = function (n) {
    this.buffer.setUint8(n, this.index++)
}
BinWriter.prototype.writeUInt16BE = function (n) {
    this.buffer.setUint16(n, this.index)
    this.index += 2;
}
BinWriter.prototype.writeUInt16LE = function (n) {
    this.buffer.setUint16(n, this.index, true)
    this.index += 2;
}
BinWriter.prototype.writeUInt32BE = function (n) {
    this.buffer.setUint32(n, this.index)
    this.index += 4;
}
BinWriter.prototype.writeUInt32LE = function (n) {
    this.buffer.setUint32(n, this.index, true)
    this.index += 4;
}
BinWriter.prototype.toBuffer = function () {
    return this.buf;
}
FastBuffers.reader = BinReader;
FastBuffers.writer = BinWriter;
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
if (ifs[ifid++] == 1) {
var data2 = {};
data2.hello=reader.readString8();
data1.push(data2);
} else {
if (ifs[ifid++] == 1) {
var data2 = {};
data2.this=reader.readUInt8()-1;
data1.push(data2);
} else {
if (ifs[ifid++] == 1) {
var data2 = {};
data2.is=reader.readString16();
data1.push(data2);
} else {
var data2 = {};
data2.atest=reader.readUInt8()+500;
data1.push(data2);
}
}
}

}
return data1;}