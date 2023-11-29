document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid')
    let squares = Array.from(document.querySelectorAll('#grid div'))
    const scoreDisplay = document.getElementById('score')
    let startBtn = document.getElementById('startBtn')

    const width = 10

    // console.log(squares)

    // The Tetrominoes

    const lTetris = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 1]
    ]

    const zTetris = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width+1, width+2, width*2, width*2+1]
    ]

    const tTetris = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width+1, width*2+1]
    ]

    const oTetris = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],        
        [0, 1, width, width + 1],        
        [0, 1, width, width + 1],        
    ]

    const iTetris = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width+1, width+2, width+3]
    ]

    const theTetris = [lTetris, zTetris, tTetris, oTetris, iTetris]
    // console.log(theTetris)

    let currentPosition = 4;
    let currentRotation = 0
    
    // Randomly Select and its first rotation

    let random = Math.floor(Math.random() * theTetris.length)
    // let current = theTetris[0][0]
    let current = theTetris[random][currentRotation]

    // Draw the first rotation in the first 
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
        })
    }
    draw()

    // Undraw the tetris
    function unDraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
        })
    }



})