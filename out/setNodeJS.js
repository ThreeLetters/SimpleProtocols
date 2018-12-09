function setData(data1, startIndex, sizeAdd) {

    function Writer(size, index) {
        this.index = index || 0;
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
        this.buffer.writeUInt8(n, i || this.index++)
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

    if (!data1.length) byteLen++;
    byteLen += 1 * data1.length;
    var writer = new Writer(byteLen + (startIndex || 0) + sizeAdd, startIndex);
    var len1 = data1.length

    for (var i1 = 0; i1 < len1; i1++) {
        var data2 = data1[i1];
        writer.writeUInt8(((((data2 + 3) << 1) | (i1 + 1 < len1)) ^ 0) >>> 0, c1);
    }
    if (!len1) writer.writeUInt8(208);
    return writer.toBuffer();
}