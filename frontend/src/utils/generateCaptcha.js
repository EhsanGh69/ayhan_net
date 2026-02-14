const generateCaptcha = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = ''
    for(let i = 0; i < 6; i++) {
        result += chars[Math.floor(Math.random() * chars.length)]
    }

    // create canvas image
    const canvas = document.createElement('canvas')
    canvas.width = 150
    canvas.height = 50
    const ctx = canvas.getContext('2d')

    // background
    ctx.fillStyle = '#f0f0f0'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // annoying lines
    ctx.strokeStyle = '#ccc'
    for(let i = 0; i < 10; i++){
        ctx.beginPath()
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height)
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height)
        ctx.stroke()
    }

    // text
    ctx.font = 'bold 24px Vazir'
    ctx.fillStyle = '#333'
    ctx.fillText(result, 20, 35)

    return {code: result, image: canvas.toDataURL()}
}

export default generateCaptcha;