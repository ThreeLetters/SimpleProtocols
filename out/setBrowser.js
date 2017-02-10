function set(data1) {
function Writer(size) {
    this.buf = new ArrayBuffer(size);
    this.buffer = new DataView(this.buf);
    this.index = 0;
}
Writer.prototype.writeString8 = function (string) {
    for (var i = 0; i < string.length; i++) {
        this.writeUInt8(string.charCodeAt(i))
    }
    this.writeUInt8(0)
}
Writer.prototype.writeString16 = function (string) {
    for (var i = 0; i < string.length; i++) {
        this.writeUInt16BE(string.charCodeAt(i))
    }
    this.writeUInt16BE(0)
}
Writer.prototype.writeString32 = function (string) {
    for (var i = 0; i < string.length; i++) {
        this.writeUInt32BE(string.charCodeAt(i))
    }
    this.writeUInt32BE(0)
}
Writer.prototype.writeInt8 = function (n) {
    this.buffer.setInt8(n, this.index++)
}
Writer.prototype.writeInt16BE = function (n) {
    this.buffer.setInt16(n, this.index)
    this.index += 2;
}
Writer.prototype.writeInt16LE = function (n) {
    this.buffer.setInt16(n, this.index, true)
    this.index += 2;
}
Writer.prototype.writeInt32BE = function (n) {
    this.buffer.setInt32(n, this.index)
    this.index += 4;
}
Writer.prototype.writeInt32LE = function (n) {
    this.buffer.setInt32(n, this.index, true)
    this.index += 4;
}
Writer.prototype.writeUInt8 = function (n) {
    this.buffer.setUint8(n, this.index++)
}
Writer.prototype.writeUInt16BE = function (n) {
    this.buffer.setUint16(n, this.index)
    this.index += 2;
}
Writer.prototype.writeUInt16LE = function (n) {
    this.buffer.setUint16(n, this.index, true)
    this.index += 2;
}
Writer.prototype.writeUInt32BE = function (n) {
    this.buffer.setUint32(n, this.index)
    this.index += 4;
}
Writer.prototype.writeUInt32LE = function (n) {
    this.buffer.setUint32(n, this.index, true)
    this.index += 4;
}
Writer.prototype.toBuffer = function () {
    return this.buf;
}

var byteLen = 0;

byteLen += 1 + data1.hello.length * 1;
byteLen += 2 + data1.is.length * 2;
var writer = new Writer(byteLen);
writer.writeString8(data1.hello);
writer.writeUInt8(data1.this+21);
writer.writeUInt16BE(data1.atest-48568);
writer.writeString16(data1.is);
return writer.toBuffer();}