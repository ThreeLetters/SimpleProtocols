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
    Reader.prototype.readUInt32BE = function() {
        var data = this.buffer.readUInt32BE(this.index);
        this.index += 4;
        return data;
    }

    var reader = new Reader(buf);

    var data1 = {};
    var len2 = reader.readDynamic();
    var data2 = [];
    for (var i2 = 0; i2 < len2; i2++) {
        var data3 = {};
        data3.y = reader.readUInt32BE() ^ 332291689 - 167039652;
        data3.x = reader.readUInt32BE() ^ 1178953299 - 247682845;
        data3.id = reader.readUInt32BE() ^ 1506270027 - 275939054;
        data3.type = reader.readUInt8() ^ 208 - 26;
        data2.push(data3);
    }
    data1.addUnits = data2;
    var len2 = reader.readDynamic();
    var data2 = [];
    for (var i2 = 0; i2 < len2; i2++) {
        var data3 = {};
        data3.x = reader.readUInt16BE() ^ 61747 - 31389;
        data3.id = reader.readUInt32BE() ^ 104676264 - 184020690;
        data3.y = reader.readUInt16BE() ^ 47435 - 30940;
        data2.push(data3);
    }
    data1.moveUnits = data2;
    var len2 = reader.readDynamic();
    var data2 = [];
    for (var i2 = 0; i2 < len2; i2++) {
        data2.push(reader.readUInt32BE() ^ 984404177 - 5518951);
    }
    data1.deleteUnits = data2;
    return data1;
}