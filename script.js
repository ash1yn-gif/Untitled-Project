const sharks = [];

function Shark(shark, sharkX, sharkY) {
    this.img = shark
    this.sharkX = sharkX;
    this.sharkY = sharkY;

}


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
    console.log(shark)
    shark.onload = () => {
        shark = new Shark(shark, 0, 0)
        console.log(shark)
        sharks.push(shark)
        random(shark, shark.sharkX, shark.sharkY)
    }
}

const randomMovement = function (shark, x, y) {
    const speed = Math.random() * 2 + 1;
    function move() {
        if (shark.sharkX < x) {
            shark.sharkX += speed;

            if (shark.sharkX > x) {
                shark.sharkX = x;
            }

        } else if (shark.sharkX > x) {
            shark.sharkX -= speed;

            if (shark.sharkX < x) {
                shark.sharkX = x;
            }
        }      

        if (shark.sharkY < y) {
            shark.sharkY += speed;

            if (shark.sharkY > y) {
                shark.sharkY = y;
            }

        } else if (shark.sharkY > y) {
            shark.sharkY -= speed;

            if (shark.sharkY < y) {
                shark.sharkY = y;
            }
        }   
        shark.img.style.transform = `translate(${shark.sharkX}px, ${shark.sharkY}px)`
        if (shark.sharkX != x || shark.sharkY != y) {
            requestAnimationFrame(move)
        }
        else {
            random(shark.sharkX, shark.sharkY)
        }
    }
    move()
    
    return shark;
}

const random = function (shark) {

    const container = document.querySelector(".container#fish-tank")
    sharks.forEach(shark => {
        randomMovement(
            shark, Math.random() * (container.clientWidth - shark.img.offsetWidth),
            Math.random() * (container.clientHeight - shark.img.offsetHeight  
        ))
    })    
}


const button = document.querySelector("button")
button.addEventListener("click", addShark)

