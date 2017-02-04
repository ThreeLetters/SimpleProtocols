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
    writer.writeUInt8(parseInt("1" + temparray.join(""),2));
}
    writer.writeUInt8(0);
}
var byteLen = 0;
var ifs = [];
byteLen += 2
for (var i1 = 0; i1 < data1.length; i1 ++) {
var data2 = data1[i1];
var obj=data2;if (obj.type == 0) {
ifs.push(1)
byteLen += 1 + data2.hello.length * 1;
} else {
ifs.push(0)
var obj=data2;if (obj.type == 1) {
ifs.push(1)
byteLen += 1;
} else {
ifs.push(0)
var obj=data2;if (obj.type == 2) {
ifs.push(1)
byteLen += 2 + data2.is.length * 2;
} else {
ifs.push(0)
byteLen += 1;
}
}
}
}
byteLen += Math.ceil(ifs.length / 7) + 1
var writer = new FastBuffers.writer(byteLen);
setIfs(writer,ifs);
var len2 = data1.length
writer.writeUInt16BE(len2)
for (var i2 = 0; i2 < len2; i2 ++) {
var data2 = data1[i2];
var obj=data2;if (obj.type == 0) {
writer.writeString8(data2.hello);
} else {
var obj=data2;if (obj.type == 1) {
writer.writeUInt8(data2.this+1);
} else {
var obj=data2;if (obj.type == 2) {
writer.writeString16(data2.is);
} else {
writer.writeUInt8(data2.atest-500);
}
}
}
}
return writer.toBuffer();}