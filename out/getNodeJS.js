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
        data3.size = (((reader.readDynamic() ^ 73) ^ 73) >>> 0);
        data3.x = (((reader.readUInt24BE() ^ 10397003) ^ 10397003) >>> 0) - 8037928;
        data3.id = (((reader.readDynamic() ^ 7) ^ 7) >>> 0);
        data3.y = (((reader.readUInt24BE() ^ 9851495) ^ 9851495) >>> 0) - 8465274;
        data2.push(data3);
    }
    data1.moveUnits = data2;
    data1.timestamp = (((reader.readUInt32BE() ^ 2063392257) ^ 2063392257) >>> 0);
    var len2 = reader.readDynamic();
    var data2 = [];
    for (var i2 = 0; i2 < len2; i2++) {
        var data3 = {};
        data3.id = (((reader.readDynamic() ^ 31) ^ 31) >>> 0);
        data2.push(data3);
    }
    data1.deleteUnits = data2;

    var data2 = [];
    for (var i2 = 0, a2; a2 & 1; i2++) {
        var data3 = {};
        data3.cx = (((reader.readUInt24BE() ^ 6139462) ^ 6139462) >>> 0) - 8264856;
        data3.id = (((reader.readDynamic() ^ 1) ^ 1) >>> 0);
        data3.size = (((reader.readDynamic() ^ 15) ^ 15) >>> 0);
        data3.cy = (((reader.readUInt24BE() ^ 9066419) ^ 9066419) >>> 0) - 8380667;
        data3.team = ((((a2 = reader.readUInt8() ^ 197) >> 1) ^ 197) >>> 0) - 23;
        data3.type = (((reader.readUInt8() ^ 237) ^ 237) >>> 0) - 11;
        data3.capturedAt = (((reader.readUInt24BE() ^ 10085185) ^ 10085185) >>> 0);
        data2.push(data3);
    }
    data1.addUnits = data2;
    return data1;
}