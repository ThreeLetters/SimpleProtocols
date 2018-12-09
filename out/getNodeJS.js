function getData(buf, startIndex) {

    function Reader(buf, index) {
        this.index = index || 0;
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
    Reader.prototype.readString8 = function(mask) {
        mask = mask || [0];
        var data = [];
        while (this.index <= this.buffer.length) {
            var d = this.readUInt8() ^ mask[data.length % mask.length];
            if (!d) break;
            data.push(String.fromCharCode(d));
        }
        return data.join("");
    }
    Reader.prototype.readString16 = function(mask) {
        mask = mask || [0];
        var data = [];
        while (this.index <= this.buffer.length) {
            var d = this.readUInt16BE() ^ mask[data.length % mask.length];
            if (!d) break;
            data.push(String.fromCharCode(d));
        }
        return data.join("");
    }
    Reader.prototype.readString32 = function(mask) {
        mask = mask || [0];
        var data = [];
        while (this.index <= this.buffer.length) {
            var d = this.readUInt32BE() ^ mask[data.length % mask.length];
            if (!d) break;
            data.push(String.fromCharCode(d));
        }
        return data.join("");
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

    var reader = new Reader(buf, startIndex);

    var data1 = {};
    var len2 = reader.readDynamic();
    var data2 = [];
    for (var i2 = 0; i2 < len2; i2++) {
        var data3 = {};
        data3.x = ((reader.readUInt24BE() ^ 15139376) >>> 0) - 8332580;
        data3.size = ((reader.readDynamic() ^ 19) >>> 0);
        data3.id = ((reader.readDynamic() ^ 31) >>> 0);
        data3.y = ((reader.readUInt24BE() ^ 611964) >>> 0) - 8494729;
        data2.push(data3);
    }
    data1.moveUnits = data2;
    data1.timestamp = ((reader.readUInt32BE() ^ 480693713) >>> 0);

    var data2 = [];
    while (true) {
        var b2 = reader.readUInt8();
        if (b2 == 32) break;
        var data3 = {};
        data3.team = ((b2 ^ 252) >>> 0) - 19;
        data3.size = ((reader.readDynamic() ^ 27) >>> 0);
        data3.id = ((reader.readDynamic() ^ 10) >>> 0);
        data3.type = ((reader.readUInt8() ^ 72) >>> 0) - 12;
        data3.capturedAt = ((reader.readUInt24BE() ^ 5793911) >>> 0);
        data3.cy = ((reader.readUInt24BE() ^ 14271170) >>> 0) - 8442296;
        data3.cx = ((reader.readUInt24BE() ^ 4230855) >>> 0) - 8162649;
        data2.push(data3);
    }
    data1.addUnits = data2;
    var len2 = reader.readDynamic();
    var data2 = [];
    for (var i2 = 0; i2 < len2; i2++) {
        var data3 = {};
        data3.id = ((reader.readDynamic() ^ 73) >>> 0);
        data2.push(data3);
    }
    data1.deleteUnits = data2;
    return data1;
}