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
            if (n < 127) {
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
    Reader.prototype.readUInt32BE = function() {
        var data = this.buffer.readUInt32BE(this.index);
        this.index += 4;
        return data;
    }

    var reader = new Reader(buf);

    var data1 = [];
    for (var i1 = 0; i1 < 5; i1++) {
        data1.push((reader.readUInt8() + 55) ^ 1650);
    }
    return data1;
}