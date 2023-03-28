class Health{
    constructor(){
        this.health=0
        this.maxHealth=8
        this.node=document.getElementById("health")
    }
    
    decreaseHealth(){
        if( this.health>=0 && this.health<this.maxHealth){
            this.health++
            this.node.src=`./images/healthbar/health-${this.health}.png`
        }
    }

    increaseHealth(){
        if( this.health<=this.maxHealth){
            this.health--
            this.node.src=`./images/healthbar/health-${this.health}.png`
        }
    }
    
}

const NINJA_HEIGHT = "475px"
const FOOTMEN_POSITIONS=["400px", "500px", "600px", "700px"]
const FOOTMEN_IDS=["first" ,"second", "third", "fourth"]
const HERO_POSITIONS=["50px"]
const HERO_IDS=["hero"]


const health_bar = new Health()
console.log(`Type: "help()" to learn how to get started`)


function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

function reset(){
    
    Token.reset()
}


function help(){
    console.log("%cLet's Learn how to create your Hero","color: #8FD129; font-size: 20px");
    console.log(`%cYou can create only 1 Hero
to create a new Hero give your ninja a name, like "masterYoshi" and write`,"color: #8FD129");
    console.log("%clet masterYoshi = new Hero()","color: #ED1C28")
    console.log(`%cBe sure to use lower case letters for 'new Hero' except for the H
    and replace masterYoshi with any name you want`,"color: #8FD129");
    console.log(`%cTo learn what you can do with your Hero type "actions()"`,"color: #785447; font-size: 16px");
    console.log(`%cYou can start over at anytime by typing "reset()"`,"color: #785447; font-size: 16px")
    console.log("%cLets create some Footmen to Defeat","color: #8FD129; font-size: 20px");
    console.log("%clet danny = new Footmen()","color: #ED1C28")
    console.log(`%cBe sure to use lower case letters for 'new Footmen' except for the F
    and replace danny with any name you want`,"color: #8FD129");
}

function actions(){

    console.log("%cMOVEMENT","color: #8FD129; font-size: 20px");
    console.log(`%cYou can make the ninjas (both Hero and Footmen) walk left or walk right by using the ninjas name like so:`,"color: #8FD129");
    console.log("%cmasterYoshi.walkLeft()","color: #ED1C28")
    console.log(`%c- or -`,"color: #8FD129");
    console.log("%cmasterYoshi.walkRight()","color: #ED1C28")
    console.log(`%cYou can make them walk farther by passing a number of steps as an argument to the move function:`,"color: #8FD129");
    console.log("%cmasterYoshi.walkLeft(2)","color: #ED1C28")
    console.log(`%c- or -`,"color: #8FD129");
    console.log("%cmasterYoshi.walkRight(2)","color: #ED1C28")

    console.log("%c\nTHROWING STAR - FOOTMEN ONLY","color: #8FD129; font-size: 20px");
    console.log(`%cYou can make a member of the Footmen throw a ninja star to the Left or the Right like so:`,"color: #8FD129");
    console.log("%cdanny.throwStarLeft()","color: #ED1C28")
    console.log(`%c- or -`,"color: #8FD129");
    console.log("%cdanny.throwStarRight()","color: #ED1C28")

    console.log("%c\nKNIFE THROW - HERO ONLY","color: #8FD129; font-size: 20px");
    console.log(`%cYou can make your Hero throw a knife at a member of the footclan:`,"color: #8FD129");
    console.log("%cmasterYoshi.attack(danny)","color: #ED1C28")
    console.log(`%c- or -`,"color: #8FD129");
    console.log("%cmasterYoshi.attack(danny)","color: #ED1C28")

    console.log("%c\nBLOCK - HERO ONLY","color: #8FD129; font-size: 20px");
    console.log(`%cYou can make your Hero block Left or Right:`,"color: #8FD129");
    console.log("%cmasterYoshi.blockLeft()","color: #ED1C28")
    console.log(`%c- or -`,"color: #8FD129");
    console.log("%cmasterYoshi.blockRight()","color: #ED1C28")   

    console.log("%c\n REMOVING NINJA","color: #8FD129; font-size: 20px");
    console.log(`%cYou can remove a ninja (both Hero and Footmen) by calling the remove method on the ninja with its name like so:`,"color: #8FD129");
    console.log("%cmasterYoshi.remove()","color: #ED1C28")

    console.log("%c\n STARTING OVER","color: #8FD129; font-size: 20px");
    console.log(`%cYou can start over by running the reset function:`,"color: #8FD129");
    console.log("%creset()","color: #ED1C28")

}


const POSITIONS=["400px", "500px", "600px", "700px", "50px"]
const IDS=["first" ,"second", "third", "fourth", "hero"]

class Token{
    
    static ids = [...IDS]
    static positions = [...POSITIONS]
    static isRunning=false

    static reset(){
        Token.ids = [...IDS]
        Token.positions  = [...POSITIONS]
        Hero.ids = [...HERO_IDS]
        Hero.positions = [...HERO_POSITIONS]
        Footmen.ids = [...FOOTMEN_IDS]
        Footmen.positions = [...FOOTMEN_POSITIONS]
        document.getElementById("backdrop").innerHTML=""
    }
    
    constructor(Invoker){
        this.backdrop=document.getElementById("backdrop")
        let img = document.createElement("img")
        this.img = img
        this.isBlocking=false
        this.baseImg="./images/standing-min.png"

        img.style.height="450px"
        img.style.position="absolute"
        img.style.top=NINJA_HEIGHT
        img.style.zIndex=99
        if (Invoker.positions.length>0){
            this.position=Invoker.positions.pop()
            this.id=Invoker.ids.pop()
            if (this.id=="hero"){
                this.baseImg="./images/hero-standing-min.png"
            }
            img.src=this.baseImg
            img.id=this.id
            img.style.left=this.position
        }
        else{
            console.log("You can only have 4 Footmen and 1 Hero")
            return
        }
        this.backdrop.appendChild(img)

    }

    walk(n = 1, direction=-1) {
        if(this.isRunning)return
        this.isRunning=true
        let baseimg = document.getElementById(this.id);
        let img = baseimg.cloneNode()
        if (this.id == "hero"){
            img.src="./images/hero-walk-min.gif"
        }else{
            img.src = "./images/animate-walking-min.gif";
        }

        let top = parseInt(img.style.top)
        let newTop=top
        if (this.id !=="hero"){
            newTop+=+15
        }
        
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
          if (newLeft > -150 && newLeft < 1150){
              img.style.left = `${newLeft}px`;
          }
        }
      
        const intervalId = setInterval(() => {
          if (i >= n * 25) {
            clearInterval(intervalId)
            let newImg=img.cloneNode()

            newImg.src = this.baseImg
            if(direction>0){
                newImg.left
            }else{
                newImg.left=`${parseInt(newImg.left)-20}px`
            }
            
            newImg.style.top = NINJA_HEIGHT
            if(direction>0){
                newImg.style.transform="scaleX(1)"
            }
            this.img=newImg
            this.backdrop.appendChild(this.img)
            this.backdrop.removeChild(img)
            // img.replaceWith(newImg)
            this.isRunning=false
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
        if(this.isRunning)return
        this.isRunning=true
        if (this.id=="hero"){
            console.log("Our Hero can not throw stars")
            return}
        let img = document.getElementById(this.id);
        let newImg = img.cloneNode()
        newImg.classList.add("throwing")
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
            left = parseInt(this.img.style.left) + 45
        }else{
            left = parseInt(this.img.style.left) + 125
        }
        star.style.left=`${left}px`
        let hero=document.getElementById("hero")
        let cnt=0
        const intervalId=setInterval(()=>{
            let endLoop=()=>{    
                clearInterval(intervalId)
                newImg.classList.remove("throwing")
                star.remove()
                this.isRunning=false
            }
            function checkDeath(){
                if(health_bar.health==0){
                    document.getElementById("gameover").style.visibility="visible"
                }
            }
            if((direction=="left" && parseInt(star.style.left)<=parseInt(hero.style.left)+200)||(direction=="right" && parseInt(star.style.left)>=parseInt(hero.style.left)+50)){
                if (hero.classList.contains("blocking")){
                    console.log("blocked")
                    return endLoop()
                }
            }

            if(direction=="left" && parseInt(star.style.left)<=parseInt(hero.style.left)+150){
                //hit the hero
                if (!hero.classList.contains("blocking")){
                    hero.src='./images/damage_animate.gif'
                    setTimeout(()=>{hero.src="./images/hero-standing-min.png"},2000)
                    health_bar.decreaseHealth()
                    checkDeath()
                }
                endLoop()
            }else if(direction=="right" && parseInt(star.style.left)>=parseInt(hero.style.left)+75){
                //hit the hero
                if (!hero.classList.contains("blocking")){
                    hero.src='./images/damage_animate.gif'
                    setTimeout(hero.src="./images/hero-standing-min.png",2000)
                    health_bar.decreaseHealth()
                    checkDeath()
                }
                endLoop()
            }else if(parseInt(star.style.left)>=1050 ||parseInt(star.style.left)<=-50){
                endLoop()
            }

            let left=parseInt(star.style.left)
            if (direction ==="left"){ 
                star.style.left=`${left-5}px`
            }else{
                star.style.left=`${left+5}px`
            }
        },30)


        // const removeStar=() => star.remove(); 
        // setTimeout(removeStar,3000)
    }

    attack(enemy){
        if(this.id!=="hero"){console.log("Only our Hero has this ability");return;}
        if(this.isRunning)return
        this.isRunning=true
        if (enemy == undefined || enemy==null){
            console.log("I need to know what enemy to attack")
            return
        }
        let hero = document.getElementById(this.id)
        if (hero.id !=="hero"){
            console.log("Only Our Hero Can Throw Knives")
            return
        }
        let newImg = hero.cloneNode()

        this.backdrop.removeChild(this.img)
        this.backdrop.appendChild(newImg)
        let direction
        if(hero.style.left >= enemy.img.style.left){
            //throw toward the left
            direction = "left"
            newImg.src="./images/hero-throw-knife-left-min.gif"
            newImg.insertAdjacentHTML("afterend","<img src='./images/knife-left-min.gif' class='knifeLeft' id='knife'>")

        }else{
            //throw toward the right
            direction="right"
            newImg.src="./images/hero-throw-knife-right-min.gif"
            newImg.insertAdjacentHTML("afterend","<img src='./images/knife-right-min.gif' class='knifeRight' id='knife'>")
        }

        let knife = document.getElementById("knife")
        if(direction == "right"){
            knife.style.left = `${parseInt(newImg.style.left)+175}px`
        }else if (direction=="left"){
            knife.style.left = `${parseInt(newImg.style.left)+75}px`

        }

        knife.style.height="75px"
        knife.style.position="absolute"
        knife.style.top="600px"

        let i = 0;
        
        const intervalId=setInterval(()=>{
            let endLoop=()=>{    
                clearInterval(intervalId)
                knife.remove()
                enemy.remove()
                this.backdrop.removeChild(newImg)  
                this.backdrop.appendChild(this.img)
                this.isRunning=false
            }
            if(direction==="right"){
                if (parseInt(knife.style.left) >= parseInt(enemy.img.style.left) + 25 ||parseInt(knife.style.left)<=0||parseInt(knife.style.left)>=1000) {
                    endLoop()
                }
            }else if (direction ==="left"){
                if (parseInt(knife.style.left) <= parseInt(enemy.img.style.left) + 115 ||parseInt(knife.style.left)<=0||parseInt(knife.style.left)>=1000) {
                    endLoop()
                }       
            }

            if(direction==="right"){
                let left = parseInt(knife.style.left)
                knife.style.left=`${left+5}px`
            }else if(direction==="left"){
                let left = parseInt(knife.style.left)
                knife.style.left=`${left-5}px`
            }
        }, 15)




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




class Hero extends Token{
    
    
    static ids = [...HERO_IDS]
    static positions = [...HERO_POSITIONS]
    constructor(){
        super(Hero)
    }

    remove(){
        this.img.remove()
        Hero.ids.push(this.id)
        Hero.positions.push(this.position)
    }

    block(dir="right"){
        const old = this.img.src
        //#TODO:
        this.isBlocking=true
        if(dir==="right"){
            this.img.src="./images/block.png"
        }
        else{
            this.img.src="./images/block-left.png"
        }
        this.img.classList.add("blocking")
        setTimeout(()=>{this.img.src="./images/hero-standing-min.png"; this.isBlocking=false; this.img.classList.remove("blocking") },5000)
    }

    blockLeft(){
        this.block("left")
    }
    blockRight(){
        this.block("right")
    }
    blockleft(){this.blockLeft()}
    block_left(){this.blockLeft()}
    block_right(){this.blockRight()}
    blockright(){this.blockRight()}
}


class Footmen extends Token{

    
    static ids = [...FOOTMEN_IDS]
    static positions = [...FOOTMEN_POSITIONS]
    constructor(){
        super(Footmen)
    }

    remove(){
        this.img.remove()
        Footmen.ids.push(this.id)
        Footmen.positions.push(this.position)
    }
}

