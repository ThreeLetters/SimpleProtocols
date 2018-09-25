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
    Writer.prototype.writeUInt32BE = function(n) {
        this.buffer.setUint32(this.index, n)
        this.index += 4;
    }
    Writer.prototype.toBuffer = function() {
        return this.buf;
    }

    var byteLen = 0;

    var data2 = data1.addUnits;
    byteLen += getDynamicSize(data2)
    byteLen += 13 * data2.length;
    var data2 = data1.moveUnits;
    byteLen += getDynamicSize(data2)
    byteLen += 8 * data2.length;
    var data2 = data1.deleteUnits;
    byteLen += getDynamicSize(data2)
    byteLen += 4 * data2.length;
    var writer = new Writer(byteLen);
    var data2 = data1.addUnits;
    var len2 = data2.length
    writer.writeDynamic(len2)
    for (var i2 = 0; i2 < len2; i2++) {
        var data3 = data2[i2];
        writer.writeUInt32BE((data3.y + 167039652) ^ 332291689);
        writer.writeUInt32BE((data3.x + 247682845) ^ 1178953299);
        writer.writeUInt32BE((data3.id + 275939054) ^ 1506270027);
        writer.writeUInt8((data3.type + 26) ^ 208);
    }
    var data2 = data1.moveUnits;
    var len2 = data2.length
    writer.writeDynamic(len2)
    for (var i2 = 0; i2 < len2; i2++) {
        var data3 = data2[i2];
        writer.writeUInt16BE((data3.x + 31389) ^ 61747);
        writer.writeUInt32BE((data3.id + 184020690) ^ 104676264);
        writer.writeUInt16BE((data3.y + 30940) ^ 47435);
    }
    var data2 = data1.deleteUnits;
    var len2 = data2.length
    writer.writeDynamic(len2)
    for (var i2 = 0; i2 < len2; i2++) {
        var data3 = data2[i2];
        writer.writeUInt32BE((data3 + 5518951) ^ 984404177);
    }
    return writer.toBuffer();
}