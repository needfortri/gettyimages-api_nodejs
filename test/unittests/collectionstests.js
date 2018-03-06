import Api from "../../gettyimages-api";
import nock from "nock";
import test from "ava";

test.before(t=>{
    nock("https://api.gettyimages.com")
            .post("/oauth2/token", "client_id=apikey&client_secret=apisecret&grant_type=client_credentials")
            .reply(200, {
                access_token: "client_credentials_access_token",
                token_type: "Bearer",
                expires_in: "1800"
            })
            .get("/v3/collections")
            .reply(200, {response : "response"});
});

test("Collections", t => {
    var client = new Api({apiKey: "apikey", apiSecret: "apisecret"}, null);
    return Promise.resolve(client.collections().execute()).then(res => {
        t.is(res.response, "response");
    });
})