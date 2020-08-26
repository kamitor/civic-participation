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
};

if (process.env.REACT_APP_NODE_ENV === "production") {
    settings.eosio.nodeos = "https://d1hxgr8mqh915l.cloudfront.net";
    settings.dfuseOptions.network = "";
    settings.eosio.blockExplorerUrl = "d1uzqj8k54wt9u.cloudfront.net";
    settings.dfuseOptions.network = "d1hxgr8mqh915l.cloudfront.net"
    settings.dfuseOptions.secure = true
}

export default settings;