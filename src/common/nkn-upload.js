const nkn = require('nkn-sdk')

const numBytes = 16 << 20
const numSubClients = 4
const writeChunkSize = 1024;

(async function () {
    let alice = new nkn.MultiClient({numSubClients, identifier: 'alice'})

    console.log('Secret seed:', alice.getSeed())

    await new Promise((resolve) => alice.onConnect(resolve))

    await new Promise((resolve) => setTimeout(resolve, 1000))

    let session = await alice.dial("file.33ed3f20f423dfa816ebd8c33f05523170b7ba86a78d5b39365bfb57db443f6c")
    console.log(session.localAddr, 'dialed a session')

    await write(session, numBytes)
})()


async function write(session, numBytes) {
    let timeStart = Date.now()
    let buffer = new ArrayBuffer(4)
    let dv = new DataView(buffer)
    dv.setUint32(0, numBytes, true)
    await session.write(new Uint8Array(buffer))

    let buf
    for (let n = 0; n < numBytes; n += buf.length) {
        buf = new Uint8Array(Math.min(numBytes - n, writeChunkSize))


        for (let i = 0; i < buf.length; i++) {
            buf[i] = byteAt(n + i)

        }
        console.log(buf)
        await session.write(buf)
        if (Math.floor((n + buf.length) * 10 / numBytes) !== Math.floor(n * 10 / numBytes)) {
            console.log(session.localAddr, 'sent', n + buf.length, 'bytes', (n + buf.length) / (1 << 20) / (Date.now() - timeStart) * 1000, 'MB/s')
        }
    }
    console.log(session.localAddr, 'finished sending', numBytes, 'bytes', numBytes / (1 << 20) / (Date.now() - timeStart) * 1000, 'MB/s')
}

function byteAt(n) {
    return n % 256
}