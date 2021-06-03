import express from "express";

const PORT = process.env.PORT || 45000;

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

app.listen(PORT, () => {
    console.log(
        `The application is listening on port ${PORT}! \n${kubeDescription}`
    );
});
