/** @param {NS} ns */
export async function main(ns) {
    var target = "crush-fitness"; //ns.args[0];
    var moneyThresh = ns.getServerMaxMoney(target) * 0.8;
    var securityThresh = ns.getServerMinSecurityLevel(target) + 3;
    if (ns.fileExists("BruteSSH.exe", "home")) {
        ns.brutessh(target);
    }
    ns.nuke(target);
    while(true) {
        if (ns.getServerSecurityLevel(target) > securityThresh) {
            await ns.weaken(target);
        } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
            await ns.grow(target);
        } else {
            await ns.hack(target);
        }
    }
}
