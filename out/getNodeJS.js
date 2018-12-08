function getData(reader) {

    function Reader(buf) {
        this.index = 0;
        this.buffer = buf;
    }
    Reader.prototype.readDynamic = function() {
        var num = 0;
        for (var i = 0; i < 4; i++) {
            var n = this.readUInt8();
            num += (n & 127) << (i * 7);
            if (n <= 127) {
                i++;
                break;
            }
        }
        if (i === 2) num += 128;
        else if (i === 3) num += 16512;
        else if (i === 4) num += 2113664;
        return num;
    }
    Reader.prototype.readString8 = function() {
        var data = "";
        while (this.index <= this.buffer.length) {
            var d = this.readUInt8();
            if (!d) break;
            data += String.fromCharCode(d);
        }
        return data;
    }
    Reader.prototype.readString16 = function() {
        var data = "";
        while (this.index <= this.buffer.length) {
            var d = this.readUInt16BE();
            if (!d) break;
            data += String.fromCharCode(d);
        }
        return data;
    }
    Reader.prototype.readString32 = function() {
        var data = "";
        while (this.index <= this.buffer.length) {
            var d = this.readUInt32BE();
            if (!d) break;
            data += String.fromCharCode(d);
        }
        return data;
    }
    Reader.prototype.readUInt8 = function() {
        return this.buffer.readUInt8(this.index++);
    }
    Reader.prototype.readUInt16BE = function() {
        var data = this.buffer.readUInt16BE(this.index);
        this.index += 2;
        return data;
    }
    Reader.prototype.readUInt24BE = function() {
        return (this.buffer.readUInt8(this.index++) << 16) + (this.buffer.readUInt8(this.index++) << 8) + this.buffer.readUInt8(this.index++);
    }
    Reader.prototype.readUInt32BE = function() {
        var data = this.buffer.readUInt32BE(this.index);
        this.index += 4;
        return data;
    }
    Reader.prototype.readFloat32BE = function() {
        var data = this.buffer.readFloatBE(this.index);
        this.index += 4;
        return data;
    }

    var reader = new Reader(buf);

    var data1 = {};
    var len2 = reader.readDynamic();
    var data2 = [];
    for (var i2 = 0; i2 < len2; i2++) {
        var data3 = {};
        data3.size = (((reader.readDynamic() ^ 61) ^ 61) >>> 0);
        data3.x = (((reader.readUInt24BE() ^ 7984082) ^ 7984082) >>> 0) - 8220409;
        data3.id = (((reader.readDynamic() ^ 66) ^ 66) >>> 0);
        data3.y = (((reader.readUInt24BE() ^ 4709325) ^ 4709325) >>> 0) - 8393309;
        data2.push(data3);
    }
    data1.moveUnits = data2;

    var data2 = [];
    for (var i2 = 0, a2; a2 & 1; i2++) {
        var data3 = {};
        data3.cx = (((reader.readUInt24BE() ^ 14901642) ^ 14901642) >>> 0) - 8499295;
        data3.type = ((((a2 = reader.readUInt8() ^ 72) >> 1) ^ 72) >>> 0) - 48;
        data3.cy = (((reader.readUInt24BE() ^ 12192830) ^ 12192830) >>> 0) - 8384257;
        data3.size = (((reader.readDynamic() ^ 6) ^ 6) >>> 0);
        data3.capturedAt = (((reader.readUInt24BE() ^ 997932) ^ 997932) >>> 0);
        data3.id = (((reader.readDynamic() ^ 123) ^ 123) >>> 0);
        data3.team = (((reader.readUInt8() ^ 84) ^ 84) >>> 0) - 36;
        data2.push(data3);
    }
    data1.addUnits = data2;
    var len2 = reader.readDynamic();
    var data2 = [];
    for (var i2 = 0; i2 < len2; i2++) {
        var data3 = {};
        data3.id = (((reader.readDynamic() ^ 103) ^ 103) >>> 0);
        data2.push(data3);
    }
    data1.deleteUnits = data2;
    data1.timestamp = (((reader.readUInt32BE() ^ 113906985) ^ 113906985) >>> 0);
    return data1;
}