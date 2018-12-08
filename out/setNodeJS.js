function setData(data1) {

    function Writer(size) {
        this.index = 0;
        this.buffer = Buffer.alloc(size);
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
        this.buffer.writeUInt8(n, this.index++)
    }
    Writer.prototype.writeUInt16BE = function(n) {
        this.buffer.writeUInt16BE(n, this.index)
        this.index += 2;
    }
    Writer.prototype.writeUInt24BE = function(n) {
        this.buffer.writeUInt8(n & 255, this.index + 2)
        n = n >> 8;
        this.buffer.writeUInt8(n & 255, this.index + 1)
        n = n >> 8;
        this.buffer.writeUInt8(n, this.index)
        this.index += 3;
    }
    Writer.prototype.writeUInt32BE = function(n) {
        this.buffer.writeUInt32BE(n, this.index)
        this.index += 4;
    }
    Writer.prototype.writeFloat32BE = function(n) {
        this.buffer.writeFloatBE(n, this.index)
        this.index += 4;
    }
    Writer.prototype.toBuffer = function() {
        return this.buffer;
    }

    var byteLen = 0;

    var data2 = data1.moveUnits;
    byteLen += getDynamicSize(data2.length)
    for (var i2 = 0; i2 < data2.length; i2++) {
        var data3 = data2[i2];
        byteLen += getDynamicSize((data3.size ^ 61) >>> 0);
        byteLen += getDynamicSize((data3.id ^ 66) >>> 0);
        byteLen += 6;
    }
    var data2 = data1.addUnits;

    for (var i2 = 0; i2 < data2.length; i2++) {
        var data3 = data2[i2];
        byteLen += getDynamicSize((data3.size ^ 6) >>> 0);
        byteLen += getDynamicSize((data3.id ^ 123) >>> 0);
        byteLen += 11;
    }
    var data2 = data1.deleteUnits;
    byteLen += getDynamicSize(data2.length)
    for (var i2 = 0; i2 < data2.length; i2++) {
        var data3 = data2[i2];
        byteLen += getDynamicSize((data3.id ^ 103) >>> 0);
    }
    byteLen += 4;
    var writer = new Writer(byteLen);
    var data2 = data1.moveUnits;
    var len2 = data2.length
    writer.writeDynamic(len2)
    for (var i2 = 0; i2 < len2; i2++) {
        var data3 = data2[i2];
        writer.writeDynamic(((data3.size) ^ 61) >>> 0);
        writer.writeUInt24BE(((data3.x + 8220409) ^ 7984082) >>> 0);
        writer.writeDynamic(((data3.id) ^ 66) >>> 0);
        writer.writeUInt24BE(((data3.y + 8393309) ^ 4709325) >>> 0);
    }
    var data2 = data1.addUnits;
    var len2 = data2.length

    for (var i2 = 0; i2 < len2; i2++) {
        var data3 = data2[i2];
        writer.writeUInt24BE(((data3.cx + 8499295) ^ 14901642) >>> 0);
        writer.writeUInt8(((((data3.type + 48) << 1) | (i2 < len2)) ^ 72) >>> 0);
        writer.writeUInt24BE(((data3.cy + 8384257) ^ 12192830) >>> 0);
        writer.writeDynamic(((data3.size) ^ 6) >>> 0);
        writer.writeUInt24BE(((data3.capturedAt) ^ 997932) >>> 0);
        writer.writeDynamic(((data3.id) ^ 123) >>> 0);
        writer.writeUInt8(((data3.team + 36) ^ 84) >>> 0);
    }
    var data2 = data1.deleteUnits;
    var len2 = data2.length
    writer.writeDynamic(len2)
    for (var i2 = 0; i2 < len2; i2++) {
        var data3 = data2[i2];
        writer.writeDynamic(((data3.id) ^ 103) >>> 0);
    }
    writer.writeUInt32BE(((data1.timestamp) ^ 113906985) >>> 0);
    return writer.toBuffer();
}