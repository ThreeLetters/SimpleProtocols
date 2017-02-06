function set(data1) {var FastBuffers = {};
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
function setIfs(writer,array) {
    var i,j,temparray,chunk = 7;
for (i=0,j=array.length; i<j; i+=chunk) {
    temparray = array.slice(i,i+chunk);
while (temparray.length < 7) temparray.push(0) n    writer.writeUInt8(parseInt("1" + temparray.join(""),2));
}
    writer.writeUInt8(0);
}
var byteLen = 0;
var ifs = [];
byteLen += 2 + data1.is.length * 2;
byteLen += 1 + data1.hello.length * 1;
byteLen += Math.ceil(ifs.length / 7) + 1
var writer = new FastBuffers.writer(byteLen);
setIfs(writer,ifs);
writer.writeString16(data1.is);
writer.writeString8(data1.hello);
writer.writeUInt8(data1.this+62);
writer.writeUInt16BE(data1.atest-17029);
return writer.toBuffer();}