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
    Writer.prototype.toBuffer = function() {
        return this.buffer;
    }

    var byteLen = 0;

    byteLen += getDynamicSize(data1.length)
    for (var i1 = 0; i1 < data1.length; i1++) {
        var data2 = data1[i1];
        var data3 = data2.rotation;
        var data3 = data2.position;
        byteLen += getDynamicSize((data2.id ^ 114) >>> 0);
        var data3 = data2.scale;
        byteLen += 2 + data2.name.length * 2;
        byteLen += 36;
    }
    var writer = new Writer(byteLen);
    var len1 = data1.length
    writer.writeDynamic(len1)
    for (var i1 = 0; i1 < len1; i1++) {
        var data2 = data1[i1];
        var data3 = data2.rotation;
        writer.writeFloat32((data3.x));
        writer.writeFloat32((data3.z));
        writer.writeFloat32((data3.y));
        var data3 = data2.position;
        writer.writeFloat32((data3.x));
        writer.writeFloat32((data3.z));
        writer.writeFloat32((data3.y));
        writer.writeDynamic(((data2.id) ^ 114) >>> 0);
        var data3 = data2.scale;
        writer.writeFloat32((data3.x));
        writer.writeFloat32((data3.y));
        writer.writeFloat32((data3.z));
        writer.writeString16(data2.name);
    }
    return writer.toBuffer();
}