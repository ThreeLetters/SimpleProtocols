function getData(buf) {

    var Reader = function(buf) {
        this.index = 0;
        this.buffer = new DataView(buf);
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
    Reader.prototype.readString8 = function() {
        var data = "";
        while (this.index <= this.buffer.byteLength) {
            var d = this.readUInt8();
            if (!d) break;
            data += String.fromCharCode(d);
        }
        return data;
    }
    Reader.prototype.readString16 = function() {
        var data = "";
        while (this.index <= this.buffer.byteLength) {
            var d = this.readUInt16BE();
            if (!d) break;
            data += String.fromCharCode(d);
        }
        return data;
    }
    Reader.prototype.readString32 = function() {
        var data = "";
        while (this.index <= this.buffer.byteLength) {
            var d = this.readUInt32BE();
            if (!d) break;
            data += String.fromCharCode(d);
        }
        return data;
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

    var reader = new Reader(buf);

    var data1 = {};
    data1.timestamp = ((reader.readUInt32BE() ^ 2085327692) >>> 0);
    var len2 = reader.readDynamic();
    var data2 = [];
    for (var i2 = 0; i2 < len2; i2++) {
        var data3 = {};
        data3.y = ((reader.readUInt24BE() ^ 11440619) >>> 0) - 8606036;
        data3.x = ((reader.readUInt24BE() ^ 10768733) >>> 0) - 8438669;
        data3.id = ((reader.readDynamic() ^ 110) >>> 0);
        data3.size = ((reader.readDynamic() ^ 36) >>> 0);
        data2.push(data3);
    }
    data1.moveUnits = data2;
    var len2 = reader.readDynamic();
    var data2 = [];
    for (var i2 = 0; i2 < len2; i2++) {
        var data3 = {};
        data3.id = ((reader.readDynamic() ^ 76) >>> 0);
        data2.push(data3);
    }
    data1.deleteUnits = data2;

    var data2 = [];
    for (var a2 = 1; a2 & 1;) {
        var data3 = {};
        data3.type = (((a2 = reader.readUInt8() ^ 85) >> 1) >>> 0) - 2;
        data3.capturedAt = ((reader.readUInt24BE() ^ 4275749) >>> 0);
        data3.cx = ((reader.readUInt24BE() ^ 2844981) >>> 0) - 8062272;
        data3.id = ((reader.readDynamic() ^ 33) >>> 0);
        data3.team = ((reader.readUInt8() ^ 0) >>> 0) - 243;
        data3.size = ((reader.readDynamic() ^ 12) >>> 0);
        data3.cy = ((reader.readUInt24BE() ^ 6770126) >>> 0) - 8031450;
        data2.push(data3);
    }
    data1.addUnits = data2;
    return data1;
}