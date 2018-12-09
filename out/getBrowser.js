function getData(buf, startIndex) {

    var Reader = function(buf, index) {
        this.index = index || 0;
        this.buffer = buf;
    }
    Reader.prototype.readDynamic = function() {
        var num = 0;
        for (var i = 0; i < 4; i++) {
            var n = this.readUInt8();
            num += (n & 127) << (i * 7);
            if (n <= 127) {
                i++
                break;
            }
        }
        if (i === 2) num += 128;
        else if (i === 3) num += 16512;
        else if (i === 4) num += 2113664;
        return num;
    }
    Reader.prototype.readString8 = function(mask) {
        mask = mask || [0];
        var data = [];
        while (this.index <= this.buffer.byteLength) {
            var d = this.readUInt8() ^ mask[data.length % mask.length];
            if (!d) break;
            data.push(String.fromCharCode(d));
        }
        return data.join("");
    }
    Reader.prototype.readString16 = function(mask) {
        mask = mask || [0];
        var data = [];
        while (this.index <= this.buffer.byteLength) {
            var d = this.readUInt16BE() ^ mask[data.length % mask.length];
            if (!d) break;
            data.push(String.fromCharCode(d));
        }
        return data.join("");
    }
    Reader.prototype.readString32 = function(mask) {
        mask = mask || [0];
        var data = [];
        while (this.index <= this.buffer.byteLength) {
            var d = this.readUInt32BE() ^ mask[data.length % mask.length];
            if (!d) break;
            data.push(String.fromCharCode(d));
        }
        return data.join("");
    }
    Reader.prototype.readUInt8 = function() {
        return this.buffer.getUint8(this.index++);
    }
    Reader.prototype.readUInt16BE = function() {
        var data = this.buffer.getUint16(this.index);
        this.index += 2;
        return data;
    }
    Reader.prototype.readUInt24BE = function() {
        return (this.buffer.getUint8(this.index++) << 16) + (this.buffer.getUint8(this.index++) << 8) + this.buffer.getUint8(this.index++);
    }
    Reader.prototype.readUInt32BE = function() {
        var data = this.buffer.getUint32(this.index);
        this.index += 4;
        return data;
    }
    Reader.prototype.readFloat32BE = function() {
        var data = this.buffer.getFloat32(this.index);
        this.index += 4;
        return data;
    }

    var reader = new Reader(buf, startIndex);

    var data1 = {};
    var len2 = reader.readDynamic();
    var data2 = [];
    for (var i2 = 0; i2 < len2; i2++) {
        var data3 = {};
        data3.id = ((reader.readDynamic() ^ 116) >>> 0);
        data2.push(data3);
    }
    data1.deleteUnits = data2;
    data1.timestamp = ((reader.readUInt32BE() ^ 1735170382) >>> 0);
    var len2 = reader.readDynamic();
    var data2 = [];
    for (var i2 = 0; i2 < len2; i2++) {
        var data3 = {};
        data3.size = ((reader.readDynamic() ^ 125) >>> 0);
        data3.id = ((reader.readDynamic() ^ 116) >>> 0);
        data3.x = ((reader.readUInt24BE() ^ 1739395) >>> 0) - 8217726;
        data3.y = ((reader.readUInt24BE() ^ 4712616) >>> 0) - 8519123;
        data2.push(data3);
    }
    data1.moveUnits = data2;

    var data2 = [];
    while (true) {
        var b2 = reader.readUInt8();
        if (b2 == 144) break;
        var data3 = {};
        data3.capturedAt = ((reader.readUInt24BE() ^ 7364468) >>> 0);
        data3.team = ((b2 ^ 120) >>> 0) - 31;
        data3.id = ((reader.readDynamic() ^ 56) >>> 0);
        data3.size = ((reader.readDynamic() ^ 57) >>> 0);
        data3.cy = ((reader.readUInt24BE() ^ 16089254) >>> 0) - 8036923;
        data3.type = ((reader.readUInt8() ^ 171) >>> 0) - 33;
        data3.cx = ((reader.readUInt24BE() ^ 5856790) >>> 0) - 8554393;
        data2.push(data3);
    }
    data1.addUnits = data2;
    return data1;
}