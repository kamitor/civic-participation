let settings = {
    eosio: {
        nodeos: "http://localhost:4000",
        blockExplorerUrl: "localhost:8888",
    },
    dfuseOptions: {
        apiKey: "web_abcdef123456789",
        authUrl: "null://",
        secure: false,
        network: "localhost:4000"
    },
    env: 'development'
};

if (process.env.REACT_APP_NODE_ENV === "production") {
    settings.env = "production"
    settings.eosio.nodeos = "http://ec2-18-133-123-109.eu-west-2.compute.amazonaws.com:8888";
    settings.dfuseOptions.network = "";
    settings.eosio.blockExplorerUrl = "ec2-18-133-123-109.eu-west-2.compute.amazonaws.com";
    settings.dfuseOptions.network = "ec2-18-133-123-109.eu-west-2.compute.amazonaws.com"
    settings.dfuseOptions.secure = false
}

settings.isLiveEnvironment = function () {
    return settings.env === "production";
}

export default settings;