"use strict";

module.exports = class DataService {
    constructor() {
        this.data = [];
        this.index = 0;
    }
    push(a) {
        this.data.splice(this.data, this.index++, a)
    }
    push2(a) {
        this.data.push(a);
    }
    push3(a) {
        this.data.splice(this.data, this.index + 1, a)
    }
    set(a, ind) {
        this.data[ind] = a;
    }
    toString() {
        return this.data.join("");
    }


}