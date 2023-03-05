const { run } = require("hardhat")

async function verify(contractAddresss, args) {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddresss,
            constructorArguments: args,
        })
    } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(error)
        }
    }
}

module.exports = { verify }
