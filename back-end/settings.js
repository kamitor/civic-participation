// these settings are used on npm start
const settings = {
    eosio: {
        nodeos: "http://localhost:8888",
        accounts: {
            eosio: {
                privKey: "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3",
                pubKey: "EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV"
            }
        }

    },
    dfuseOptions: dfuseOptions = {
        apiKey: "web_abcdef123456789",
        authUrl: "null://",
        secure: false,
        network: "localhost:8080"
    },
    mongodb: {
        url: "mongodb://localhost:27017/conscious_dev"
    },
    port: 4000,
    env: "development"
};

if (process.env.REACT_APP_NODE_ENV === "production") {
    settings.env = "production";
    settings.mongodb.url = "mongodb://localhost:27017/conscious_prod";
}

settings.isLiveEnvironment = function() {
    return settings.env === "production";
}

module.exports = settings;