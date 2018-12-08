function setData(data1, startIndex) {
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

    byteLen += getDynamicSize(data1.length)
    for (var i1 = 0; i1 < data1.length; i1++) {
        var data2 = data1[i1];
        byteLen += 2 + data2.length * 2;
    }
    var writer = new Writer(byteLen + (startIndex || 0), startIndex);
    var len1 = data1.length
    writer.writeDynamic(len1)
    for (var i1 = 0; i1 < len1; i1++) {
        var data2 = data1[i1];
        writer.writeString16(data2, [24406, 12904, 16675, 23379, 37362]);
    }
    return writer.toBuffer();
}