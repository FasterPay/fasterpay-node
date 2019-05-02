class Config {
    constructor(config) {
        this.version = '1.0.0';
        this.apiBaseUrl = 'https://pay.fasterpay.com';
        this.apiSandboxUrl = 'https://pay.sandbox.fasterpay.com';

        this.publicKey;
        this.privateKey;
        this.isTest;

        for (let key in config) {
            if (key === 'publicKey') {
                this.publicKey = config[key];
            }

            if (key === 'privateKey') {
                this.privateKey = config[key];
            }

            if (key === 'apiBaseUrl') {
                this.apiBaseUrl = config[key];
            }

            if (key === 'isTest' && config[key]) {
                this.isTest = 1;
                this.apiBaseUrl = this.apiSandboxUrl;
            }
        }
    }

    getVersion() {
        return this.version;
    }

    setPrivateKey(key) {
        this.privateKey = key;
    }

    getPrivateKey() {
        return this.privateKey;
    }

    setPublicKey(key) {
        this.publicKey = key;
    }

    getPublicKey() {
        return this.publicKey;
    }

    setApiBaseUrl(url) {
        this.apiBaseUrl = url;
    }

    getApiBaseUrl() {
        return this.apiBaseUrl;
    }

    setIsTest(value) {
        if (value) {
            this.isTest = 1;
        } else {
            this.isTest = 0;
        }
    }

    getIsTest() {
        return this.isTest;
    }
}

module.exports = { Config: Config };
