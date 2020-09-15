export const randomString = (length: number) => {
    length = length || 32
    let t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
    let a = t.length
    let n = ''
    for (let i = 0; i < length; i++) n += t.charAt(Math.floor(Math.random() * a))
    return n
}