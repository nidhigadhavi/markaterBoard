fetch("/performance/shortenUrl/shorten?shorten=vdotnode.mk/e", {
    method: "get"
}).then(function(response) {
    if (response.status >= 400) {
        throw new Error("Bad response from server");
    }
    return response.json();
}).then((data) => {
    if ((data.url.includes("https://")) || (data.url.includes("http://"))) {
        window.location = data.url;
    } else {
        window.location = "https://" + data.url;
    }
});