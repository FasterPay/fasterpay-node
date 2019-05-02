class Pingback {
    constructor(gateway) {
        this.gateway = gateway;
    }

    validate() {
        return true;
    }
}

module.exports = { Pingback: Pingback };
