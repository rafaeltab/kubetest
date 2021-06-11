import os from "os";
import osu from "node-os-utils";

type Usage = {
    ramPercentage: string;
    ramMB: number;
    cpu: any;
};

export async function getPcUsage(): Promise<Usage> {
    var usage: any = {};

    var mem = await osu.mem.used();

    usage.cpu = (await osu.cpu.usage()) + "%";
    usage.ramPercentage =
        Math.round((mem.usedMemMb / mem.totalMemMb) * 100).toString() + "%";
    usage.ramMB = mem.usedMemMb;

    return usage;
}
