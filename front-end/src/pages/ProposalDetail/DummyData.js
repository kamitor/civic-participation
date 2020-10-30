const DetailsData = {
    "proposalId": 0,
    "title": "Build a flowerbed next to John's tacos",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis imperdiet consectetur convallis. Fusce elementum urna at velit venenatis malesuada a eu libero. Fusce sed nisl tempus, ultrices quam sit amet, ultrices nulla. Fusce vulputate vestibulum lacinia. Phasellus ultrices justo dolor, sit amet tempus nisl semper feugiat. Suspendisse imperdiet nec urna sed pulvinar. Sed sit amet leo sollicitudin, blandit massa at, lacinia quam. Aenean dapibus euismod tortor, id pharetra libero. Sed tempus vulputate ullamcorper. Curabitur porttitor, ex eget lobortis venenatis, metus sapien scelerisque metus, sed laoreet lacus odio non turpis. Donec hendrerit efficitur ornare. Pellentesque molestie neque elit, vitae porttitor tellus posuere non. Nulla lobortis, turpis non suscipit imperdiet, magna metus scelerisque lacus, id feugiat tortor tellus eu orci.",
    "category": 0,
    "budget": 0,
    "type": 0,
    "location": "52.122851226824444,4.286764835091674",
    "status": 1,
    "regulations": "",
    "created": "1970-01-01T00:00:00.000Z",
    "approved": "1970-01-01T00:00:00.000Z",
    "updated": "2020-10-29T18:04:01.500Z"
}

const HistoryData = [
    {
        "txId": "6dbfba0d6e241737aaaa45187afb34443f2da3bff6a80330f2f60407a5ce5ace",
        "action": "propcreate",
        "timestamp": "2020-10-29T18:04:00.000Z",
        "authHuman": "jack",
        "authHumanCommonName": "Jack Tanner",
        "status": 0
    },
    {
        "txId": "6a3184ee956b624b4c886c3e5ffeac7d5626fd038b2d910ff46723848f0b1fe3",
        "action": "propupdate",
        "timestamp": "2020-10-29T18:04:01.500Z",
        "authHuman": "tijn",
        "authHumanCommonName": "Tijn Kyuper",
        "status": 1
    },
    {
        "txId": "40b0549a88ad207a91a0b645c94fb79eae64afcc97a59b14c730288c8eefb1a2",
        "action": "propupdate",
        "timestamp": "2020-10-29T18:04:02.500Z",
        "authHuman": "tijn",
        "authHumanCommonName": "Tijn Kyuper",
        "status": 2,
        "comment": "Regulations checked and budget added"
    }
]

export { DetailsData, HistoryData }