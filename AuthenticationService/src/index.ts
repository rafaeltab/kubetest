import express from "express";
import fetch from "node-fetch";
import https from "https";
import fs from "fs";

const apigatewayService = "https://apigateway:45000/";
const dataService = "https://data:45002/";

var version = { version: "1.0.7" };

const my_node_name = process.env.MY_NODE_NAME;
const my_pod_name = process.env.MY_POD_NAME;
const my_pod_namespace = process.env.MY_POD_NAMESPACE;
const my_pod_ip = process.env.MY_POD_IP;
const my_pod_service_account = process.env.MY_POD_SERVICE_ACCOUNT;

let kubeDescription: string;
if (my_node_name !== undefined) {
    kubeDescription = `node name: \t\t${my_node_name}
pod name: \t\t${my_pod_name}
namespace: \t\t${my_pod_namespace}
IP: \t\t${my_pod_ip}
Service Account: \t\t${my_pod_service_account}
`;
} else {
    kubeDescription: "No kubernetes";
}

const app = express();

app.get("/", (req, res) => {
    if (my_node_name !== undefined) {
        let result = {
            message: "Connection made",
            version: version.version,
            kubernetes: {
                node: {
                    name: my_node_name,
                },
                pod: {
                    name: my_pod_name,
                    namespace: my_pod_namespace,
                    ip: my_pod_ip,
                    service_account: my_pod_service_account,
                },
            },
        };
        res.json(result);
    } else {
        res.send("Connection made");
    }
});

app.get("/gate/", async (req, res) => {
    const agent = new https.Agent({
        rejectUnauthorized: false,
    });

    try {
        var result = await fetch(apigatewayService, { agent });
        res.status(200).json(await result.json());
    } catch (err) {
        res.status(500).json(err);
    }
});

app.get("/data/", async (req, res) => {
    const agent = new https.Agent({
        rejectUnauthorized: false,
    });

    try {
        var result = await fetch(dataService, { agent });
        res.status(200).json(await result.json());
    } catch (err) {
        res.status(500).json(err);
    }
});

const PORT = parseInt(process.env.PORT ?? "45000");

if (process.env.TLSKEY && process.env.TLSCRT) {
    https
        .createServer(
            {
                key: fs.readFileSync(process.env.TLSKEY),
                cert: fs.readFileSync(process.env.TLSCRT),
            },
            app
        )
        .listen(PORT, () => {
            console.log(
                `The application version: ${version.version} is listening on port ${PORT} with tls! \n${kubeDescription}`
            );
        });
} else {
    app.listen(PORT, () => {
        console.log(
            `The application version: ${version.version} is listening on port ${PORT} without tls! \n${kubeDescription}`
        );
    });
}
