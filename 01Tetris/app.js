document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid')
    let squares = Array.from(document.querySelectorAll('#grid div'))
    const scoreDisplay = document.getElementById('score')
    let startBtn = document.getElementById('startBtn')
    const width = 10
    let nextRandom = 0
    let timerId;
    let score = 0;
    const colors = [
        'orange', 'red', 'purple', 'green', 'blue'
    ]

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
            squares[currentPosition + index].style.backgroundColor = colors[random]
        })
    }
    draw()

    // Undraw the tetris
    function unDraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
            squares[currentPosition + index].style.backgroundColor = ''
        })
    }
    // Movement
    // timerId = setInterval(moveDown, 1000) // Only when btn click

   


    function moveDown() {
        unDraw()
        currentPosition += width
        draw()
        freeze()
    }

    // Freeze
    function freeze() {
        if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))

            // Start a new Tetromino falling
            random = nextRandom
            nextRandom = Math.floor(Math.random() * theTetris.length)
            current = theTetris[random][currentRotation]
            currentPosition = 4
            draw()
            displayShape()
            addScore()
            gameOver()
        }
    }

    // Move tetris left and right
    function moveLeft() {
        unDraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
        
        if (!isAtLeftEdge) currentPosition -= 1
        
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1
        }
        draw()

    }

    // MoveRight

    function moveRight() {
        unDraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1) 

        if (!isAtRightEdge) currentPosition += 1
        
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -=1
        }
        draw()

    }
    // Rotate()

    function rotate() {
        unDraw()
        currentRotation++
        if (currentRotation === current.length) // if the currentRotation gets to 4, make it go back to 0
        {
            currentRotation = 0
        } 
        current = theTetris[random][currentRotation]
        draw()
    }

     // Assign functions to keyCodes
     function control(e) {
        if (e.keyCode === 37) {
            moveLeft()
        } else if (e.keyCode === 38) {
            rotate()
        } else if (e.keyCode === 39) {
            moveRight()
        } else if (e.keyCode === 40) {
            moveDown()
        } 
    }
    document.addEventListener('keyup', control)

    // Display the next shape

    const displaySquares = document.querySelectorAll('.subGrid div')
    const displayWidth = 4
    let displayIndex = 0
    

    // the Tetrominos without rotations

    const upNextTetris = [
        [1, displayWidth + 1, displayWidth * 2 + 1, 2], // lTetris
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], // zTetris
        [1, displayWidth, displayWidth + 1, displayWidth + 2], // tTetris
        [0, 1, displayWidth, displayWidth + 1] // oTetris
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1], // iTetris
    ]

    // display the Shape in subgrid
    function displayShape() {
        displaySquares.forEach(square => {
            square.classList.remove('tetromino')
            square.style.backgroundColor = ''
        })
        upNextTetris[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('tetromino')
            displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
        })
    }

    // Button 
    startBtn.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId)
            timerId = null
        } else {
            draw()
            timerId = setInterval(moveDown, 1000)
            nextRandom = Math.floor(Math.random() * theTetris.length)
            displayShape()
        }
    })

    // Score

    function addScore() {
        for (let i = 0; i < 199; i += width) {
            const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9]
            if (row.every(index => squares[index].classList.contains('taken'))) {
                score += 10
                scoreDisplay.innerHTML = score
                row.forEach(index => {
                    squares[index].classList.remove('taken')
                    squares[index].classList.remove('tetromino')
                    squares[index].style.backgroundColor = ''
                })
                const squaresRemoved = squares.splice(i, width)
                // console.log(squaresRemoved)
                squares.forEach(cell => grid.appendChild(cell))
            }
        }
    }

    // Game Over
    function gameOver() {
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            scoreDisplay.innerHTML = 'end'
            clearInterval(timerId)
        }
    }

    // Assign Color

})
