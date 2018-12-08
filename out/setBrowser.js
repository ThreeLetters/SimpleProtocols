function setData(data1) {
    function Writer(size) {
        this.buf = new ArrayBuffer(size);
        this.buffer = new DataView(this.buf);
        this.index = 0;
    }

    function getDynamicSize(a) {
        if (a > 270549119) {
            throw "ERR: OUT OF BOUNDS"
        } else if (a > 2113663) {
            return 4;
        } else if (a > 16511) {
            return 3;
        } else if (a > 127) {
            return 2;
        } else {
            return 1;
        }
    }
    Writer.prototype.writeDynamic = function(a) {
        var i;
        if (a > 270549119) {
            throw "ERR: OUT OF BOUNDS"
        } else if (a > 2113663) {
            a = a - 2113664;
            i = 3;
        } else if (a > 16511) {
            a = a - 16512;
            i = 2;
        } else if (a > 127) {
            a = a - 128;
            i = 1;
        } else {
            i = 0;
        }
        for (var j = 0; j < i; j++) {
            this.writeUInt8((a & 127) | 128);
            a = a >> 7;
        }
        this.writeUInt8(a);
    }
    Writer.prototype.writeString8 = function(string) {
        for (var i = 0; i < string.length; i++) {
            this.writeUInt8(string.charCodeAt(i))
        }
        this.writeUInt8(0)
    }
    Writer.prototype.writeString16 = function(string) {
        for (var i = 0; i < string.length; i++) {
            this.writeUInt16BE(string.charCodeAt(i))
        }
        this.writeUInt16BE(0)
    }
    Writer.prototype.writeString32 = function(string) {
        for (var i = 0; i < string.length; i++) {
            this.writeUInt32BE(string.charCodeAt(i))
        }
        this.writeUInt32BE(0)
    }
    Writer.prototype.writeUInt8 = function(n) {
        this.buffer.setUint8(this.index++, n)
    }
    Writer.prototype.writeUInt16BE = function(n) {
        this.buffer.setUint16(this.index, n)
        this.index += 2;
    }
    Writer.prototype.writeUInt24BE = function(n) {
        this.buffer.setUint8(this.index + 2, n & 255);
        n = n >> 8;
        this.buffer.setUint8(this.index + 1, n & 255);
        n = n >> 8;
        this.buffer.setUint8(this.index, n);
        this.index += 3;
    }
    Writer.prototype.writeUInt32BE = function(n) {
        this.buffer.setUint32(this.index, n)
        this.index += 4;
    }
    Writer.prototype.writeFloat32BE = function(n) {
        this.buffer.setFloat32(this.index, n)
        this.index += 4;
    }
    Writer.prototype.toBuffer = function() {
        return this.buf;
    }

    var byteLen = 0;

    var data2 = data1.moveUnits;
    byteLen += getDynamicSize(data2.length)
    for (var i2 = 0; i2 < data2.length; i2++) {
        var data3 = data2[i2];
        byteLen += getDynamicSize((data3.id ^ 110) >>> 0);
        byteLen += getDynamicSize((data3.size ^ 36) >>> 0);
        byteLen += 6;
    }
    var data2 = data1.deleteUnits;
    byteLen += getDynamicSize(data2.length)
    for (var i2 = 0; i2 < data2.length; i2++) {
        var data3 = data2[i2];
        byteLen += getDynamicSize((data3.id ^ 76) >>> 0);
    }
    var data2 = data1.addUnits;

    for (var i2 = 0; i2 < data2.length; i2++) {
        var data3 = data2[i2];
        byteLen += getDynamicSize((data3.id ^ 33) >>> 0);
        byteLen += getDynamicSize((data3.size ^ 12) >>> 0);
        byteLen += 11;
    }
    byteLen += 4;
    var writer = new Writer(byteLen);
    writer.writeUInt32BE(((data1.timestamp) ^ 2085327692) >>> 0);
    var data2 = data1.moveUnits;
    var len2 = data2.length
    writer.writeDynamic(len2)
    for (var i2 = 0; i2 < len2; i2++) {
        var data3 = data2[i2];
        writer.writeUInt24BE(((data3.y + 8606036) ^ 11440619) >>> 0);
        writer.writeUInt24BE(((data3.x + 8438669) ^ 10768733) >>> 0);
        writer.writeDynamic(((data3.id) ^ 110) >>> 0);
        writer.writeDynamic(((data3.size) ^ 36) >>> 0);
    }
    var data2 = data1.deleteUnits;
    var len2 = data2.length
    writer.writeDynamic(len2)
    for (var i2 = 0; i2 < len2; i2++) {
        var data3 = data2[i2];
        writer.writeDynamic(((data3.id) ^ 76) >>> 0);
    }
    var data2 = data1.addUnits;
    var len2 = data2.length

    for (var i2 = 0; i2 < len2; i2++) {
        var data3 = data2[i2];
        writer.writeUInt8(((((data3.type + 2) << 1) | (i2 + 1 < len2)) ^ 85) >>> 0);
        writer.writeUInt24BE(((data3.capturedAt) ^ 4275749) >>> 0);
        writer.writeUInt24BE(((data3.cx + 8062272) ^ 2844981) >>> 0);
        writer.writeDynamic(((data3.id) ^ 33) >>> 0);
        writer.writeUInt8(((data3.team + 243) ^ 0) >>> 0);
        writer.writeDynamic(((data3.size) ^ 12) >>> 0);
        writer.writeUInt24BE(((data3.cy + 8031450) ^ 6770126) >>> 0);
    }
    return writer.toBuffer();
}