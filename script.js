


const addShark = function () {
    const container = document.querySelector(".container#fish-tank");
    let shark = document.createElement("img");
    shark.src = "images/sharky_01.png"
    shark.style.top = "10em"
    shark.style.width = "6em"
    shark.style.position = "absolute"
    shark.style.left = "0px";
    shark.style.top = "0px";
    container.appendChild(shark)
    shark.onload = () => {
        random()
    }
}

const randomMovement = function (shark, x, y) {
    let sharkX = 0;
    let sharkY = 0;
    const speed = Math.random() * 2 + 1;
    function move() {
        if (sharkX < x) {
            sharkX += speed;
        } else if (sharkX > x) {
            sharkX -= speed;
        }       

        if (sharkY < y) {
            sharkY += speed;
        } else if (sharkY > y) {
            sharkY -= speed;
        }   
        shark.style.transform = `translate(${sharkX}px, ${sharkY}px)`
        if (sharkX != x && sharkY != y) {
            requestAnimationFrame(move)
        }
    }
    move()
    
    return shark;
}

const random = function () {
    const container = document.querySelector(".container#fish-tank")
    const sharks = container.querySelectorAll("img")
    sharks.forEach(shark => {
        randomMovement(
            shark, Math.random() * (container.clientWidth - shark.offsetWidth),
            Math.random() * (container.clientHeight - shark.offsetHeight    
        ))
    })    
}


const button = document.querySelector("button")
button.addEventListener("click", addShark)

