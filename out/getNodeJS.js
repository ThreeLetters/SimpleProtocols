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


    var data1 = [];
    for (var a1 = 1; a1 & 1;) {
        var b1 = reader.readUInt8();
        if (b1 == 208) break;
        data1.push((((a1 = b1 ^ 0) >> 1) >>> 0) - 3);
    }
    return data1;
}