
const NINJA_HEIGHT = "475px"
console.log(`Type: "help()" to learn how to get started`)
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

function reset(){
    Ninja.reset()
}


function help(){
    console.log("%cLet's Learn how to use our Ninjas","color: #8FD129; font-size: 20px");
    console.log(`%cYou can create up to 4 ninjas

to create a new ninja give your ninja a name, like "raph" and write`,"color: #8FD129");
    console.log("%clet raph = new Ninja()","color: #ED1C28")
    console.log(`%cBe sure to use lower case letter except for the N in Ninja
    and replace Raph with any name you want`,"color: #8FD129");
    console.log(`%cTo learn what you can do with your Ninja type "actions()"`,"color: #785447; font-size: 16px");
    console.log(`%cYou can start over at anytime by typing "reset()"`,"color: #785447; font-size: 16px")
}

function actions(){
    console.log("%cMOVEMENT","color: #8FD129; font-size: 20px");
    console.log(`%cYou can make your ninja walk left or walk right by using the ninjas name like so:`,"color: #8FD129");
    console.log("%craph.walkLeft()","color: #ED1C28")
    console.log(`%c- or -`,"color: #8FD129");
    console.log("%craph.walkRight()","color: #ED1C28")
    console.log(`%cYou can make them walk farther by passing a number of steps as an argument to the move function:`,"color: #8FD129");
    console.log("%craph.walkLeft(2)","color: #ED1C28")
    console.log(`%c- or -`,"color: #8FD129");
    console.log("%craph.walkRight(2)","color: #ED1C28")

    console.log("%c\nTHROWING STAR","color: #8FD129; font-size: 20px");
    console.log(`%cYou can make your ninja throw a ninja star to the Left or the Right like so:`,"color: #8FD129");
    console.log("%craph.throwStarLeft()","color: #ED1C28")
    console.log(`%c- or -`,"color: #8FD129");
    console.log("%craph.throwStarRight()","color: #ED1C28")

    console.log("%c\n REMOVING NINJA","color: #8FD129; font-size: 20px");
    console.log(`%cYou can remove a ninja by calling the remove method on the ninja with its name like so:`,"color: #8FD129");
    console.log("%craph.remove()","color: #ED1C28")

    console.log("%c\n STARTING OVER","color: #8FD129; font-size: 20px");
    console.log(`%cYou can start over by running the reset function:`,"color: #8FD129");
    console.log("%creset()","color: #ED1C28")

}




class Ninja{
    
    static ids = ["first" ,"second", "third", "fourth"]
    static positions = ["100px", "200px", "300px", "400px"]

    static reset(){
        Ninja.ids = ["first" ,"second", "third", "fourth"]
        Ninja.positions  = ["100px", "200px", "300px", "400px"]
        document.getElementById("backdrop").innerHTML=""
    }
    
    constructor(){
        this.backdrop=document.getElementById("backdrop")
        let img = document.createElement("img")
        this.img = img
        img.src="./images/standing-min.png"
        img.style.height="450px"
        img.style.position="absolute"
        img.style.top=NINJA_HEIGHT
        img.style.zIndex=99
        if (Ninja.positions.length>0){
            this.position=Ninja.positions.pop()
            this.id=Ninja.ids.pop()
            img.id=this.id
            img.style.left=this.position
        }
        else{
            console.log("You can only have 4 Ninjas")
            return
        }
        this.backdrop.appendChild(img)

    }

    walk(n = 1, direction=-1) {
        let baseimg = document.getElementById(this.id);
        let img = baseimg.cloneNode()
        img.src = "./images/animate-walking-min.gif";
        let top = parseInt(img.style.top)
        let newTop=top+15
        
        let left = parseInt(img.style.left)
        let newLeft=left+25
        if (direction>0){
            img.style.left=`${newLeft}px`
        }
        img.style.top =`${newTop}px`
        if(direction>0){
            img.style.transform="scaleX(-1)"
        }
        this.backdrop.appendChild(img)
        this.backdrop.removeChild(baseimg)

        let i = 0;
        function move() {
          let left = parseInt(img.style.left) || 0;
          let newLeft = left + (1 * direction);
          if (newLeft > 0 || newLeft < 1000){
              img.style.left = `${newLeft}px`;
          }
        }
      
        const intervalId = setInterval(() => {
          if (i >= n * 25) {
            clearInterval(intervalId)
            let newImg=img.cloneNode()

            newImg.src = "./images/standing.png"
            if(direction>0){
                newImg.left
            }else{
                newImg.left=`${parseInt(newImg.left)-20}px`
            }
            
            newImg.style.top =NINJA_HEIGHT
            if(direction>0){
                newImg.style.transform="scaleX(1)"
            }
            this.backdrop.appendChild(newImg)
            this.backdrop.removeChild(img)
            // img.replaceWith(newImg)
            return
          }
          move()
          i++
        }, 40)
      }

    walkRight(n=1){
        this.walk(n,1)
    }

    walkLeft(n=1){
        this.walk(n,-1)
    }

    walkright(n=1){this.walkRight(n)}
    walk_right(n=1){this.walkRight(n)}
    walk_left(n=1){this.walkLeft(n)}
    walkleft(n=1){this.walkLeft(n)}
  
    throwStar(direction="left"){
        let img = document.getElementById(this.id);
        let newImg = img.cloneNode()
        if (direction=="left"){
            newImg.src="./images/right-arm-throw-min.gif"
        }else{
            newImg.src="./images/left-arm-throw-min.gif"
        }
        this.backdrop.removeChild(img)
        this.backdrop.appendChild(newImg)
        img = newImg
        if (direction == "left"){
            img.insertAdjacentHTML("afterend","<img src='./images/throwstar.gif' class='starLeft' id='star'>")
        }else{
            img.insertAdjacentHTML("afterend","<img src='./images/throwstar.gif' class='starRight' id='star'>")
        }
        let star = document.getElementById("star")
        star.style.height="50px"
        star.style.position="absolute"
        star.style.top="600px"
        let left
        if (direction =="left"){
            left = parseInt(this.position) + 100
        }else{
            left = parseInt(this.position) + 130
        }
        star.style.left=`${left}px`
        const removeStar=() => star.remove(); 
        setTimeout(removeStar,3000)
    }

    throwStarLeft(){
        this.throwStar()
    }

    throwStarRight(){
        this.throwStar("right")
    }
    
    throwstarright(){
        this.throwStarRight()
    }

    throwstarleft(){
        this.throwStarLeft()
    }
    throw_star_left(){
        this.throwStarLeft()

    }
    throw_star_right(){
        this.throwStarRight()
    }

    remove(){
        this.img.remove()
    }

}