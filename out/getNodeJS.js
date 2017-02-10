function get(buf) {
function Reader(buf) {
            this.index = 0;
            this.buffer = buf;
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
        Reader.prototype.readInt8 = function() {
            return this.buffer.readInt8(this.index++);
        }
        Reader.prototype.readUInt8 = function() {
            return this.buffer.readUInt8(this.index++);
        }
        Reader.prototype.readInt16BE = function() {
            var data = this.buffer.readInt16BE(this.index);
            this.index += 2;
            return data;
        }
        Reader.prototype.readInt16LE = function() {
            var data = this.buffer.readInt16LE(this.index);
            this.index += 2;
            return data;
        }
        Reader.prototype.readUInt16BE = function() {
            var data = this.buffer.readUInt16BE(this.index);
            this.index += 2;
            return data;
        }
        Reader.prototype.readUInt16LE = function() {
            var data = this.buffer.readUInt16LE(this.index);
            this.index += 2;
            return data;
        }
        Reader.prototype.readInt32BE = function() {
            var data = this.buffer.readInt32BE(this.index);
            this.index += 4;
            return data;
        }
        Reader.prototype.readInt32LE = function() {
            var data = this.buffer.readInt32LE(this.index);
            this.index += 4;
            return data;
        }
        Reader.prototype.readUInt32BE = function() {
            var data = this.buffer.readUInt32BE(this.index);
            this.index += 4;
            return data;
        }
        Reader.prototype.readUInt32LE = function() {
            var data = this.buffer.readUInt32LE(this.index);
            this.index += 4;
            return data;
        }

var reader = new Reader(buf);
var data1;

var data1 = {};
data1.hello=reader.readString8();
data1.this=reader.readUInt8()-21;
data1.atest=reader.readUInt16BE()+48568;
data1.is=reader.readString16();
return data1;}