let data = [];

data.push({
    "NAME": "APP_ID",
    "VALUE": process.env.APP_ID
}, {
    "NAME": "APP_ID",
    "VALUE": "v"
});

data.forEach(function (item) {
    console.log(item);
});

console.log(process.env);