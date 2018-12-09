function setData(data1, startIndex, sizeAdd) {
    function Writer(size, index) {
        this.buf = new ArrayBuffer(size);
        this.buffer = new DataView(this.buf);
        this.index = index || 0;
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
    Writer.prototype.writeString8 = function(string, mask) {
        mask = mask || [0];
        for (var i = 0; i < string.length; i++) {
            this.writeUInt8(string.charCodeAt(i) ^ mask[i % mask.length])
        }
        this.writeUInt8(mask[i % mask.length])
    }
    Writer.prototype.writeString16 = function(string, mask) {
        mask = mask || [0];
        for (var i = 0; i < string.length; i++) {
            this.writeUInt16BE(string.charCodeAt(i) ^ mask[i % mask.length])
        }
        this.writeUInt16BE(mask[i % mask.length])
    }
    Writer.prototype.writeString32 = function(string, mask) {
        mask = mask || [0];
        for (var i = 0; i < string.length; i++) {
            this.writeUInt32BE(string.charCodeAt(i) ^ mask[i % mask.length])
        }
        this.writeUInt32BE(mask[i % mask.length])
    }
    Writer.prototype.writeUInt8 = function(n, i) {
        this.buffer.setUint8(i || this.index++, n)
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
        byteLen += getDynamicSize((data3.size ^ 19) >>> 0);
        byteLen += getDynamicSize((data3.id ^ 31) >>> 0);
        byteLen += 6;
    }
    var data2 = data1.addUnits;
    byteLen++;
    for (var i2 = 0; i2 < data2.length; i2++) {
        var data3 = data2[i2];
        byteLen += getDynamicSize((data3.size ^ 27) >>> 0);
        byteLen += getDynamicSize((data3.id ^ 10) >>> 0);
        byteLen += 11;
    }
    var data2 = data1.deleteUnits;
    byteLen += getDynamicSize(data2.length)
    for (var i2 = 0; i2 < data2.length; i2++) {
        var data3 = data2[i2];
        byteLen += getDynamicSize((data3.id ^ 73) >>> 0);
    }
    byteLen += 4;
    var writer = new Writer(byteLen + (startIndex || 0) + sizeAdd, startIndex);
    var data2 = data1.moveUnits;
    var len2 = data2.length
    writer.writeDynamic(len2)
    for (var i2 = 0; i2 < len2; i2++) {
        var data3 = data2[i2];
        writer.writeUInt24BE(((data3.x + 8332580) ^ 15139376) >>> 0);
        writer.writeDynamic(((data3.size) ^ 19) >>> 0);
        writer.writeDynamic(((data3.id) ^ 31) >>> 0);
        writer.writeUInt24BE(((data3.y + 8494729) ^ 611964) >>> 0);
    }
    writer.writeUInt32BE(((data1.timestamp) ^ 480693713) >>> 0);
    var data2 = data1.addUnits;
    var len2 = data2.length

    for (var i2 = 0; i2 < len2; i2++) {
        var data3 = data2[i2];
        var c2 = writer.index++;
        writer.writeUInt8(((data3.team + 19) ^ 252) >>> 0, c2);
        writer.writeDynamic(((data3.size) ^ 27) >>> 0);
        writer.writeDynamic(((data3.id) ^ 10) >>> 0);
        writer.writeUInt8(((data3.type + 12) ^ 72) >>> 0);
        writer.writeUInt24BE(((data3.capturedAt) ^ 5793911) >>> 0);
        writer.writeUInt24BE(((data3.cy + 8442296) ^ 14271170) >>> 0);
        writer.writeUInt24BE(((data3.cx + 8162649) ^ 4230855) >>> 0);
    }
    writer.writeUInt8(32);
    var data2 = data1.deleteUnits;
    var len2 = data2.length
    writer.writeDynamic(len2)
    for (var i2 = 0; i2 < len2; i2++) {
        var data3 = data2[i2];
        writer.writeDynamic(((data3.id) ^ 73) >>> 0);
    }
    return writer.toBuffer();
}