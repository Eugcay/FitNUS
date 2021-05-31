export function setRandomColor() {
    let rgb = []
    for (let i = 0; i < 3; i++) {
        rgb[i] = Math.floor(Math.random() * 256)
    }
    let randomCol = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
    console.log(randomCol)
    return randomCol
}

