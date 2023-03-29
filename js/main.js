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

    reset(){
        this.health=0
        this.node.src=`./images/healthbar/health-${this.health}.png`
    }
    
}

const NINJA_HEIGHT = "475px"
const FOOTMEN_POSITIONS=["400px", "500px", "600px", "700px"]
const FOOTMEN_IDS=["first" ,"second", "third", "fourth"]
const HERO_POSITIONS=["50px"]
const HERO_IDS=["hero"]


const health_bar = new Health()
console.log(`%cType: "tutorial()" to learn how to get started`,'font-size:25px; color:#8FD129')


function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  
  

const COMMANDS=[ "Block", "Walk Left", "Walk Right", "Throw Knife"]

let bombList=[]

class Bomb{
    constructor(){
        if(bombList.length!==0){
            return
        }
        this.img_src="./images/bomb.png"
        this.left = Math.floor(Math.random()*1000)
        // this.left=300
        this.top = 50
        this.position="absolute"
        this.node = document.createElement("img")
        this.node.style.width="50px"
        this.node.style.zIndex="999999999"
        this.id = "bomb"
        this.command = COMMANDS[Math.floor(Math.random()*COMMANDS.length)]
        this.setAttr()
        bombList.push(this)
        this.stop
        this.goInt
        document.getElementById("backdrop").appendChild(this.node)
        this.node.insertAdjacentHTML("beforebegin",`<div id="bomb-desc"><span id="bomb_ins">To Stop the Bomb:</span><br>${this.command}</div>`)
        this.go()


    };
    go(){
        this.goInt=setInterval(()=>{
            const hero=document.getElementById("hero")
            if(hero){
                let left_bound=parseInt(hero.style.left)+100
                let right_bound=parseInt(hero.style.left)+200 
                if(this.left >= left_bound && this.left <=right_bound && parseInt(this.top) >= 500){
                    hero.src='./images/damage_animate.gif'
                    this.setSrc('./images/explode.gif')
                    setTimeout(()=>{hero.src="./images/hero-standing-min.png"},2000)
                    health_bar.decreaseHealth()
                    checkDeath()
                    setTimeout(()=>this.destroy(), 1500)
                }

            }
            if(this.top>725){
                this.setSrc('./images/explode.gif')
                setTimeout(()=>this.destroy(), 1500)
                clearInterval(this.goInt)
            }
            this.setTop(this.top + 10)
        }, 400)
    }
    setAttr(){
        this.node.src=this.img_src,
        Object.assign(this.node.style,{
            left:`${this.left}px`,
            top:`${this.top}px`,
            id:this.id,
            position:this.position
        })
    }

    setTop(number){
        this.top=number
        this.setAttr()
    }
    setSrc(src){
        this.img_src=src
        this.setAttr()
    }

    setLeft(number){
        this.left=number
        this.setAttr()
    }

    destroy(){
        this.node.remove()
        clearInterval(this.goInt)
        // bombList=bombList.filter((bomb)=>bomb!==this)
        document.getElementById("bomb-desc")?.remove()
    }

    stopRaid(){
        clearInterval(this.stop)
        this.destroy()
        // console.log("%cThe raid is ending", "color:#ED1C28")
    }
}

function stopRaid(){
    const intervalId=setInterval(()=>{
        if (bombList.length!==0){
            bombList[0].stopRaid()
            clearInterval(intervalId)
        }
    },50)
}

function startRaid(){
        console.log("%cWatch out for BOMBS! \n To Destroy a Bomb Complete the action that pops up", "color: #ED1C28")
        const intervalId =setInterval(()=>{
                let b=new Bomb()
                b.stop=intervalId
            
        }
        ,6000)
}

function help(){
    console.log("%cLet's Learn how to create your Hero","color: #8FD129; font-size: 20px");
    console.log(`%cYou can create only 1 Hero
to create a new Hero give your ninja a name, like "yoshi" and write`,"color: #8FD129");
    console.log("%cwindow.yoshi = new Hero()","color: #ED1C28")
    console.log(`%cBe sure to use lower case letters for 'new Hero' except for the H
    and replace yoshi with any name you want`,"color: #8FD129");
    console.log(`%cTo learn what you can do with your Hero type "actions()"`,"color: #785447; font-size: 16px");
    console.log(`%cYou can start over at anytime by typing "reset()"`,"color: #785447; font-size: 16px");
}

function actions(){

    console.log("%cMOVEMENT","color: #8FD129; font-size: 20px");
    console.log(`%cYou can make your hero walk left or walk right by using the heros name like so:`,"color: #8FD129");
    console.log("%yoshi.walkLeft()","color: #ED1C28")
    console.log(`%c- or -`,"color: #8FD129");
    console.log("%yoshi.walkRight()","color: #ED1C28")
    console.log(`%cYou can make them walk farther by passing a number of steps as an argument to the move function:`,"color: #8FD129");
    console.log("%yoshi.walkLeftPOSITIONS(2)","color: #ED1C28")
    console.log(`%c- or -`,"color: #8FD129");
    console.log("%yoshi.walkRight(2)","color: #ED1C28")

    console.log("%c\nKNIFE THROW","color: #8FD129; font-size: 20px");
    console.log(`%cYou can make your Hero throw a knife at a member of the footclan by passing the name of the footclan member to the attack method:`,"color: #8FD129");
    console.log(`%cEach member of the Footclan has their own specific name. they are:`,"color: #8FD129");
    console.log("%cbebop\nrocksteady\ndanny\nshedder","color: #ED1C28")
    console.log("%yoshi.attack(danny)","color: #ED1C28")
    console.log(`%c- or -`,"color: #8FD129");
    console.log("%yoshi.attack(danny)","color: #ED1C28")
    console.log(`%cBe sure to use lowercase letters for everything`,"color: #8FD129");

    console.log("%c\nBLOCK - HERO ONLY","color: #8FD129; font-size: 20px");
    console.log(`%cYou can make your Hero block Left or Right:`,"color: #8FD129");
    console.log("%yoshi.blockLeft()","color: #ED1C28")
    console.log(`%c- or -`,"color: #8FD129");
    console.log("%yoshi.blockRight()","color: #ED1C28")   

    console.log("%c\n BOMB RAIDS","color: #8FD129; font-size: 16px");
    console.log(`%cYou can start a bomb raid by calling the startRaid() function`,"color: #8FD129");
    console.log("%cstartRaid()","color: #ED1C28")
    console.log(`%cYou must dodge or destroy the bombs before they hit you`,"color: #8FD129");
    console.log(`%cYou can destroy the bombs by performing the action that appears in the box`,"color: #8FD129");
    console.log(`%cYou can stop a bomb raid by calling the stopRaid() function`,"color: #8FD129");
    console.log("%cstopRaid()","color: #ED1C28")

    console.log("%c\n STARTING OVER","color: #8FD129; font-size: 16px");
    console.log(`%cYou can start over by running the reset function:`,"color: #8FD129");
    console.log("%creset()","color: #ED1C28")


    console.log("%c\n Playing the Levels","color: #8FD129; font-size: 20px");
    console.log(`%cOnce you feel confident in your skills you can play 3 different levels`,"color: #8FD129");
    console.log(`%cTo Start a level you call the level1, level2, or level3 functions like so:`,"color: #8FD129");

    console.log("%clevel1()","color: #ED1C28")
    console.log("%clevel2()","color: #ED1C28")
    console.log("%clevel3()","color: #ED1C28")
    
}
function collision(img1,img2){
    // get the bounding rectangles of the images
    const rect1 = img1.getBoundingClientRect();
    const rect2 = img2.getBoundingClientRect();
    // calculate the overlapping area between the images
    const overlapLeft = Math.max(rect1.left, rect2.left);
    const overlapTop = Math.max(rect1.top, rect2.top);
    const overlapRight = Math.min(rect1.right, rect2.right);
    const overlapBottom = Math.min(rect1.bottom, rect2.bottom);
    // check if the overlapping area is non-zero
    if (overlapLeft < overlapRight && overlapTop < overlapBottom) {
    // // create a temporary canvas to draw the images onto
    return true
    // const canvas = document.createElement('canvas');
    // canvas.width = overlapRight - overlapLeft;
    // canvas.height = overlapBottom - overlapTop;
    // const ctx = canvas.getContext('2d', { willReadFrequently: true });
    // // draw img1 onto the canvas
    // const x1 = rect1.left - overlapLeft;
    // const y1 = rect1.top - overlapTop;    
    // if(x1||y1==0){return}

    // ctx.drawImage(img1, x1, y1);
    // // draw img2 onto the canvas
    // const x2 = rect2.left - overlapLeft;
    // const y2 = rect2.top - overlapTop;
    // if(x1||y1==0){return}
    // ctx.drawImage(img2, x2, y2);
    // // get the image data of the overlapping area
    // const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // const data = imageData.data;
    // // check if any non-transparent pixels exist in the overlapping area
    // for (let i = 3; i < data.length; i += 4) {
    //     if (data[i] === 0) {
    //     return true;
    //     }
    // }
    }
    return false;
}

function outOfBounds(imgNode, containerNode) {
    // Get the boundaries of the container element
    const containerRect = containerNode.getBoundingClientRect();
    // Get the boundaries of the image element
    const imgRect = imgNode.getBoundingClientRect();
    // Get the canvas and context for the image
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', { willReadFrequently: true });
    const imgWidth = imgNode.width;
    const imgHeight = imgNode.height;
    // Set the canvas size to match the image size
    canvas.width = imgWidth;
    canvas.height = imgHeight;
    // Draw the image onto the canvas
    context.drawImage(imgNode, 0, 0, imgWidth, imgHeight);
    // Get the pixel data for the image
    const imgData = context.getImageData(0, 0, imgWidth, imgHeight).data;
    // Get the pixel data for the background image
    const bgImage = getComputedStyle(containerNode).backgroundImage;
    const bgImageSrc = bgImage.slice(4, -1).replace(/"/g, "");
    const bgImg = new Image();
    bgImg.src = bgImageSrc;
    const bgImgWidth = containerRect.width;
    const bgImgHeight = containerRect.height;
    // Set the canvas size to match the background image size
    canvas.width = bgImgWidth;
    canvas.height = bgImgHeight;
    // Draw the background image onto the canvas
    context.drawImage(bgImg, 0, 0, bgImgWidth, bgImgHeight);
    // Get the pixel data for the background image
    if(bgImgWidth||bgImgHeight==0){return}
    const bgData = context.getImageData(0, 0, bgImgWidth, bgImgHeight).data;
    // Check if any non-transparent pixels of the image are going outside the container
    for (let i = 0; i < imgData.length; i += 4) {
      // Check if the pixel is not transparent in the image
      if (imgData[i + 3] !== 0) {
        // Calculate the x and y coordinates of the pixel relative to the container
        const x = imgRect.left - containerRect.left + (i / 4) % imgWidth;
        const y = imgRect.top - containerRect.top + Math.floor(i / (imgWidth * 4));
        // Check if the pixel is outside the container or the background image
        if (
          x < 0 || x >= containerRect.width || y < 0 || y >= containerRect.height ||
          bgData[4 * (y * bgImgWidth + x) + 3] === 0
        ) {
          return true;
        }
      }
    }
    // If we reach this point, no non-transparent pixels of the image are going outside the container
    return false;
  }
const POSITIONS=["400px", "500px", "600px", "700px", "50px"]
const IDS=["first" ,"second", "third", "fourth", "hero"]

function checkDeath(){
    if(health_bar.health==health_bar.maxHealth){
        reset()
        stopRaid()
        document.getElementById("gameover").style.visibility="visible"
    }
}
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
        document.getElementById("gameover").style.visibility="hidden"
    }
    
    constructor(Invoker){
        this.backdrop=document.getElementById("backdrop")
        let img = document.createElement("img")
        this.img = img
        this.isBlocking=false
        this.baseImg="./images/standing-min.png"
        this.isRunning=false
        img.style.height="450px"
        img.style.position="absolute"
        img.style.top=NINJA_HEIGHT
        if (Invoker ===Hero){
            img.style.top=`${parseInt(NINJA_HEIGHT)-25}px`
        }else{
            img.classList.add("bad")
        }
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
        let img = document.getElementById(this.id);
        // let img = baseimg.cloneNode()
        if (this.id == "hero" && img){
            img.src="./images/hero-walk-min.gif"
        }else if(img){
            img.src = "./images/animate-walking-opt.gif";
        }
        if(!img){return}
        let top = parseInt(img.style.top)
        let newTop=top
        // if (this.id !=="hero"){
        //     newTop+=+15
        // }
        
        let left = parseInt(img.style.left)
        let newLeft=left+25

        if (direction>0){
            img.style.left=`${newLeft}px`
        }
        img.style.top =`${newTop}px`
        if(direction>0){
            img.style.transform="scaleX(-1)"
        }
        // this.backdrop.appendChild(img)
        // this.backdrop.removeChild(baseimg)

        let i = 0;
        function move() {
          let left = parseInt(img.style.left) || 0;
          let newLeft = left + (1 * direction);
          if (newLeft > -15 && newLeft < 1000-130){
              img.style.left = `${newLeft}px`;
          }else if(newLeft > 1000-130){
            img.style.left = `${1000-131}px`;

          }else if(newLeft <= -15){
            img.style.left = `${-14}px`;
          }
        }
      
        this.walkIntervalId = setInterval(() => {
          if (i >= n * 25) {
            clearInterval(this.walkIntervalId)
            // let newImg=img.cloneNode()

            img.src = this.baseImg
            if(direction>0){
                img.left
            }else{
                img.left=`${parseInt(img.left)-20}px`
            }
            
            img.style.top = NINJA_HEIGHT
            if(direction>0){
                img.style.transform="scaleX(1)"
            }
            // this.img=img
            // this.backdrop.appendChild(this.img)
            // this.backdrop.removeChild(img)
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
        // let newImg = img.cloneNode()
        if(!img){return}
        img?.classList.add("throwing")
        if (direction=="left" && img){
            img.src="./images/right-arm-throw-min.gif"
        }else if(img) {
            img.src="./images/left-arm-throw-min.gif"
        }
        // this.backdrop.removeChild(img)
        // this.backdrop.appendChild(newImg)
        // img = img
        let star_rand=randInt(1,1000000)
        if (direction == "left"){
            img?.insertAdjacentHTML("afterend",`<img src='./images/throwstar.gif' class='starLeft' id='star-${this.id}-${star_rand}'>`)
        }else{
            img?.insertAdjacentHTML("afterend",`<img src='./images/throwstar.gif' class='starRight' id='star-${this.id}-${star_rand}'>`)
        }
        let star = document.getElementById(`star-${this.id}-${star_rand}`)
        star.style.height="25px"
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
        this.starIntervalId=setInterval(()=>{
            let endLoop=()=>{    
                clearInterval(this.starIntervalId)
                img.classList.remove("throwing")
                star.remove()
                this.isRunning=false

            }

            const heroOnLeft=()=>{
                if(hero && parseInt(hero.style.left) < parseInt(this.img.style.left)){
                    return true
                }
                    return false
                
            }
            if(outOfBounds(star,this.backdrop)){
                endLoop()
                return
            }

            // if((hero&&direction=="left" && parseInt(star.style.left)<=parseInt(hero.style.left)+200 )||(hero&&direction=="right" && parseInt(star.style.left)>=parseInt(hero.style.left)+50)){
            //     if (hero.classList.contains("blocking")){
            //         endLoop()
            //         return
            //     }
            // }
        
            if(hero&&direction=="left" && heroOnLeft() && collision(hero,star)){
                //hit the hero
                if (!hero.classList.contains("block-right")){
                    hero.src='./images/damage_animate.gif'
                    setTimeout(()=>{hero.src="./images/hero-standing-min.png"},2000)
                    health_bar.decreaseHealth()
                    checkDeath()
                }else{
                    if (!hero.classList.contains("tut-blk")){
                        hero.classList.add("tut-blk")
                    }
                }
                endLoop()
            }else if(hero&&direction=="right" && !heroOnLeft() && collision(hero,star)){
                //hit the hero

                if (!hero.classList.contains("block-left")){
                    hero.src='./images/damage_animate.gif'
                    setTimeout(()=>{hero.src="./images/hero-standing-min.png"},2000)
                    health_bar.decreaseHealth()
                    checkDeath()
                }else{
                    if (!hero.classList.contains("tut-blk")){
                        hero.classList.add("tut-blk")
                    }
                }
                endLoop()
            }else if(parseInt(star.style.left)>=1000 ||parseInt(star.style.left)<=-50){
                endLoop()
            }
            const liveStar=document.getElementById(`star-${this.id}-${star_rand}`)
            if(liveStar){

                let left=parseInt(liveStar.style.left)
    
                if (direction ==="left"){ 
                    star.style.left=`${left-5}px`
                }else{
                    star.style.left=`${left+5}px`
                }
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
        // let newImg = hero.cloneNode()

        // this.backdrop.removeChild(this.img)
        // this.backdrop.appendChild(newImg)
        let direction
        if(parseInt(hero.style.left) >= parseInt(enemy.img.style.left)+150){
            //throw toward the left
            direction = "left"
            hero.src="./images/hero-throw-knife-left-min.gif"
            hero.insertAdjacentHTML("afterend","<img src='./images/knife-left-min.gif' class='knifeLeft' id='knife'>")

        }else{
            //throw toward the right
            direction="right"
            hero.src="./images/hero-throw-knife-right-min.gif"
            hero.insertAdjacentHTML("afterend","<img src='./images/knife-right-min.gif' class='knifeRight' id='knife'>")
        }

        let knife = document.getElementById("knife")
        if(direction == "right"){
            knife.style.left = `${parseInt(hero.style.left)+175}px`
        }else if (direction=="left"){
            knife.style.left = `${parseInt(hero.style.left)+75}px`

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
                // this.backdrop.removeChild(newImg)  
                // this.backdrop.appendChild(this.img)
                this.isRunning=false
            }
            if(direction==="right"){
                if (collision(enemy.img,knife) ||parseInt(knife.style.left)<=0||parseInt(knife.style.left)>=1200) {
                    endLoop()
                }
            }else if (direction ==="left"){
                if (collision(enemy.img,knife) ||parseInt(knife.style.left)<=0||parseInt(knife.style.left)>=1200) {
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
        clearInterval(this.walkIntervalId)
        clearInterval(this.starIntervalId)
    }

}


function reset(){
    window.start_clan=[]
    removeAll()
    window.danny=null
    window.shedder=null
    window.bebop=null
    window.rocksteady=null
    window.yoshi=null
    window.foot=null
    health_bar.reset()
    Token.reset()
    document.getElementById("backdrop").innerHTML=""
    const win=document.getElementById("win")
    
    if(win)win.style.visibility="hidden"
    const go=document.getElementById("gaveover")
    if(go)go.style.visibility="hidden"

}

class Hero extends Token{
    
    
    static ids = [...HERO_IDS]
    static positions = [...HERO_POSITIONS]
    constructor(){
        super(Hero)
    }

    attack(enemy){
        if(  bombList.length>0 && bombList[0].command==="Throw Knife"){
            bombList[0].destroy()
            if(!this.img.classList.contains("tut-bomb")){
                this.img.classList.add("tut-bomb")
            }
        }
        super.attack(enemy)
    }
    walk(n=1, direction=-1){
        if(direction==-1 && !this.img.classList.contains("tut-l")){
            this.img.classList.add("tut-l")
        }else if(direction>0 && !this.img.classList.contains("tut-r")){
            this.img.classList.add("tut-r")
        }
        if(n>1 && !this.img.classList.contains("tut-lw")){
            this.img.classList.add("tut-lw")
        }

        if(   (bombList.length>0 && direction !==-1 && bombList[0].command==="Walk Right") || 
        (bombList.length>0 && direction==-1 && bombList[0].command==="Walk Left")){
            bombList[0].destroy()
            if(!this.img.classList.contains("tut-bomb") && this.id==="first"){

                this.img.classList.add("tut-bomb")
            }

        }
        super.walk(n,direction)
    }

    remove(){
        
        this.img.remove()
        Hero.ids.push(this.id)
        Hero.positions.push(this.position)
        while(document.getElementById(this.id)){
            document.getElementById(this.id).remove()
        }
    }

    block(dir="right"){
        if(  bombList.length>0 && bombList[0].command==="Block"){
            bombList[0].destroy()
            if(!this.img.classList.contains("tut-bomb")){

                this.img.classList.add("tut-bomb")
            }
        }

        const old = this.img.src
        this.isBlocking=true
        if(dir==="right"){
            this.img.src="./images/block.png"
            this.img.classList.add("block-right")
        }
        else{
            this.img.src="./images/block-left.png"
            this.img.classList.add("block-left")
        }
        this.img.classList.add("blocking")
        setTimeout(()=>{this.img.src="./images/hero-standing-min.png"; this.isBlocking=false; this.img.classList.remove("blocking","block-left","block-right") },5000)
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
    static allFootmen=[]
    constructor(){
        super(Footmen)
        Footmen.allFootmen.push(this)
    }

    throwStar(direction){
        if( bombList.length>0 && bombList[0].command==="Footmen Throw Star"){
            bombList[0].destroy()
        }
        super.throwStar(direction)
    }

    walk(n, direction){
        if( ( bombList.length>0 && direction !==-1 && bombList[0].command==="Footman Walk Right") || 
        ( bombList.length>0 && direction==-1 && bombList[0.].command==="Footman Walk Left")){
            bombList[0].destroy()
        }
        super.walk(n,direction)
    }

    remove(){
        this.img.remove()
        Footmen.ids.push(this.id)
        if(!Footmen.positions.includes(this.position)){
            Footmen.positions.push(this.position)
        }

    }
}
function refresh(){window.location.reload()}
// window.start_clan=[new Footmen(),new Footmen(),new Footmen(),new Footmen()]
// window.danny=start_clan[0]
// window.shedder=start_clan[1]
// window.bebop=start_clan[2]
// window.rocksteady=start_clan[3]

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function gameInfo(){
    console.log(`%cYour Hero has been made for you`,"color: #8FD129")
    console.log(`%cYour Hero name:`,"color: #8FD129");
    console.log("%cyoshi","color: #ED1C28")
    console.log(`%cFootclan Names:`,"color: #8FD129");
    console.log("%cbebop\nrocksteady\ndanny\nshedder","color: #ED1C28")
}

function removeAll(){
    delete window.danny
    delete window.shedder
    delete window.bebop
    delete window.rocksteady
    delete window.yoshi
    delete window.foot

    window.danny?.remove()
    window.shedder?.remove()
    window.bebop?.remove()
    window.rocksteady?.remove()
    window.yoshi?.remove()
    window.foot?.remove()
    for(let footman of Footmen.allFootmen){
        footman.remove()
    }
}
let intervalIdL1
let intervalIdL2
let intervalIdL3
function clearMyIntervals(){
    clearInterval(intervalIdL1)
    clearInterval(intervalIdL2)
    clearInterval(intervalIdL3)


}

function winScreen(){
    reset()
    document.getElementById("win").style.visibility="visible"
}
function level1(){
    clearMyIntervals()
    removeAll()
    reset()
    gameInfo()
    const clan=[new Footmen(),new Footmen(),new Footmen(),new Footmen()]
    window.danny=clan[0]
    window.shedder=clan[1]
    window.bebop=clan[2]
    window.rocksteady=clan[3]
    window.yoshi=new Hero()
    const ACTIONS=["throwStarLeft()", "throwStarRight()","walkLeft(4)","walkRight(4)"]
    
    setTimeout(()=>{intervalIdL1=setInterval(()=>{
        if (health_bar.health<health_bar.maxHealth && document.getElementsByClassName("bad")?.length>0){
            eval("clan[randInt(0,clan.length)]."+ACTIONS[randInt(0,ACTIONS.length)])
            for(let footman of clan){
                if (!footman.img){
                    clan.splice(clan.indexOf(footman),1)
                }
            }

        }else if (!health_bar.health<health_bar.maxHealth || !document.getElementsByClassName("bad")?.length>0){
            if(document.getElementById("hero")){
                winScreen()
            }
            clearInterval(intervalIdL1)
        }

    },750)},1000)
}



function level2(){
    // window.location.reload();
    clearMyIntervals()

    removeAll()

    reset()
    gameInfo()
    const clan=[new Footmen(),new Footmen(),new Footmen(),new Footmen()]
    window.danny=clan[0]
    window.shedder=clan[1]
    window.bebop=clan[2]
    window.rocksteady=clan[3]
    window.yoshi=new Hero()
    const ACTIONS_RIGHT=["throwStarRight()","walkRight(4)"]
    const ACTIONS_LEFT=["throwStarLeft()","walkLeft(4)"]

    setTimeout(()=>{intervalIdL2=setInterval(()=>{

        if (health_bar.health<health_bar.maxHealth  && document.getElementsByClassName("bad")?.length>0){
            let enemy=clan[randInt(0,clan.length)]

            if(enemy?.img&& window.yoshi?.img &&parseInt(enemy?.img.style.left) < parseInt(window.yoshi?.img.style.left) ){
                eval("enemy."+ACTIONS_RIGHT[randInt(0,ACTIONS_RIGHT.length)])
            }else{
                eval("enemy."+ ACTIONS_LEFT[randInt(0,ACTIONS_LEFT.length)])
            }
            for(let footman of clan){
                if (!footman.img){
                    clan.splice(clan.indexOf(footman),1)
                }
            }

        }else if (!health_bar.health<health_bar.maxHealth  || !document.getElementsByClassName("bad")?.length>0){
            if(document.getElementById("hero")){
                winScreen()
            }
            clearInterval(intervalIdL2)
        }

    },500)},1000)
}

function level3(){
    // window.location.reload();
    clearMyIntervals()
    removeAll()

    reset()
    gameInfo()
    const clan=[new Footmen(),new Footmen(),new Footmen(),new Footmen()]
    window.danny=clan[0]
    window.shedder=clan[1]
    window.bebop=clan[2]
    window.rocksteady=clan[3]
    window.yoshi=new Hero()
    const ACTIONS_RIGHT=["throwStarRight()","walkRight(4)"]
    const ACTIONS_LEFT=["throwStarLeft()","walkLeft(4)"]
    startRaid()
    setTimeout(()=>{intervalIdL3=setInterval(()=>{

        if (health_bar.health<health_bar.maxHealth && document.getElementsByClassName("bad")?.length>0){
            let enemy=clan[randInt(0,clan.length)]

            if(enemy?.img && window.yoshi?.img && parseInt(enemy.img.style.left) < parseInt(window.yoshi.img.style.left)){
                eval("enemy."+ACTIONS_RIGHT[randInt(0,ACTIONS_RIGHT.length)])
            }else{

                eval("enemy."+ ACTIONS_LEFT[randInt(0,ACTIONS_LEFT.length)])
            }
            for(let footman of clan){
                if (!footman.img){
                    clan.splice(clan.indexOf(footman),1)
                }
            }

        }else if (!health_bar.health<health_bar.maxHealth || !document.getElementsByClassName("bad")?.length>0){
            if(document.getElementById("hero")){
                winScreen()
            }
            clearInterval(intervalIdL3)
            stopRaid()
        }

    },500)},1000)
}

function tutorial(){
    console.clear()
    console.log("%cWelcome to Ninja Coders\n", "color:#8FD129; font-size:20px")
    console.log("%cTo get started lets create our hero", "color:#8FD129;")
    console.log("%cWe are going to name him Yoshi after the great Master Splinter","color:#8FD129;")
    console.log("%cWe are going to initiate a new Hero instance and save it globally","color:#8FD129;")
    console.log("%cTry typing:","color:#8FD129;")
    console.log("%cwindow.yoshi = new Hero()","color:#ED1C28;")
    console.log("%cYou should see ninja Yoshi appear on the screen","color:#8FD129;")
    const tutorial1Id=setInterval(
        ()=>{
            if (window.yoshi!==undefined && window.yoshi!==null){
                clearInterval(tutorial1Id)
                tutorial2()
            }
        },50
    )
}


function tutorial2(){
    console.clear()
    console.log("%cCongrats You Did It\n", "color:#8FD129; font-size:20px")
    console.log("%cNow Lets Try walking to the Right","color:#8FD129;")
    console.log("%cWe Do this by Typing our hero's name then calling it's method walkRight()","color:#8FD129;")
    console.log("%cYou can think of a method as an ability of the Hero class","color:#8FD129;")
    console.log("%cTry typing:","color:#8FD129;")
    console.log("%cyoshi.walkRight()","color:#ED1C28;")
    const tutorial2Id=setInterval(
        ()=>{
            if (document.getElementById("hero").classList.contains("tut-r")){
                clearInterval(tutorial2Id)
                tutorial3()
            }
        },50
    )
}
function tutorial3(){
    console.clear()
    console.log("%cCongrats You Did It\n", "color:#8FD129; font-size:20px")
    console.log("%cNow Lets Try walking to the Left","color:#8FD129;")
    console.log("%cWe Do this by Typing our hero's name then calling it's method walkLeft()","color:#8FD129;")
    console.log("%cYou can think of a method as an ability of the Hero class","color:#8FD129;")
    console.log("%cTry typing:","color:#8FD129;")
    console.log("%cyoshi.walkLeft()","color:#ED1C28;")
    const tutorial3Id=setInterval(
        ()=>{
            if (document.getElementById("hero").classList.contains("tut-l")){
                clearInterval(tutorial3Id)
                tutorialWalk()
            }
        },50
    )
}

function tutorialWalk(){
    console.clear()
    console.log("%cCongrats You Did It\n", "color:#8FD129; font-size:20px")
    console.log("%cNow Lets Try walking farther","color:#8FD129;")
    console.log("%cWe Do this by passing a number of steps as an argument to the walkLeft/walkRight methods","color:#8FD129;")
    console.log("%cYou can think of a argument as an option","color:#8FD129;")
    console.log("%cTry typing:","color:#8FD129;")
    console.log("%cyoshi.walkLeft(3)","color:#ED1C28;")
    const tutorialWalkId=setInterval(
        ()=>{
            if (document.getElementById("hero").classList.contains("tut-lw")){
                clearInterval(tutorialWalkId)
                tutorial4()
            }
        },50
    )
}

function tutorial4(){
    console.clear()
    console.log("%cA NEW FOE HAS APPEARED\n", "color:#8FD129; font-size:20px")
    window.danny=new Footmen()
    console.log("%cYou better learn how to block in a hurry!","color:#8FD129;")
    console.log("%cTo block projectiles coming from your right:","color:#8FD129;")
    console.log("%cyoshi.blockLeft()","color:#ED1C28;")
    console.log("%cTo block projectiles coming from your left:","color:#8FD129;")
    console.log("%cyoshi.blockRight()","color:#ED1C28;")
    let tutorial4IdStars
    setTimeout(()=>{tutorial4IdStars=setInterval(
        ()=>{
            window.danny.throwStarLeft()
        },500
    )},5000)

    const tutorial4Id=setInterval(
        ()=>{
            if (document.getElementById("hero").classList.contains("tut-blk")){
                clearInterval(tutorial4Id)
                clearInterval(tutorial4IdStars)
                tutorial5()
            }
        },50
    )
}

function tutorial5(){
    window.danny.remove()
    console.clear()
    console.log("%cFIGHT BACK\n", "color:#8FD129; font-size:20px")
    console.log("%cIts time to take Danny down!","color:#8FD129;")
    console.log("%cTo attack you'll pass the name of the enemy as an argument to the attack method of our Hero class","color:#8FD129;")
    console.log("%cTry typing:","color:#8FD129;")
    console.log("%cyoshi.attack(danny)","color:#ED1C28;")
    window.danny=new Footmen()
    const tutorial5IdStars=setTimeout(()=>{setInterval(
        ()=>{
            window.danny.throwStarLeft()
        },500
    )},5000)

    const tutorial5Id=setInterval(
        ()=>{
            if (!document.documentElement.contains(window.danny.img)){
                clearTimeout(tutorial5IdStars)
                clearInterval(tutorial5Id)
                tutorial6()
            }
        },50
    )
}

function tutorial6(){
    console.clear()
    console.log("%cAIR RAID!\n", "color:#8FD129; font-size:20px")
    console.log("%cThe Clan was not happy and have sent an air raid to stop you","color:#8FD129;")
    console.log("%cA Message will appear at the top of the screen to give you a way to destroy the bombs","color:#8FD129;")
    console.log("%cTo help you remember how things work you can use the actions method:","color:#8FD129;")
    console.log("%cactions()","color:#ED1C28;")
    console.log("%cA random member of the foot has shown up aswell","color:#8FD129;")
    console.log('%cWe will call them "foot"',"color:#8FD129;")
    console.log("%cDon't attack them unless the bomb asks you too","color:#8FD129;")
    console.log('%cto attack "foot" it would look like:',"color:#8FD129;")
    console.log("%cyoshi.attack(foot)","color:#ED1C28;")

    startRaid()
    window.danny.remove()
    window.foot=new Footmen()
    const tutorial6Id=setInterval(
        ()=>{
            if (document.getElementById("hero").classList.contains("tut-bomb")){
                clearInterval(tutorial6Id)
                tutorial7()
            }
        },50
    )
}



function tutorial7() {
    stopRaid()
    window.foot.remove()
    console.clear()
    console.log("%cNew Foes Have Appeared\n", "color:#8FD129; font-size:20px")
    console.log("%cLooks like Shredder, BeBop, and Rocksteady have shown up","color:#8FD129;")
    console.log("%cTo attack to attack them be sure to type pass their name to the attack method like so:","color:#8FD129;")
    console.log("%cyoshi.attack(shedder)","color:#ED1C28;")
    console.log("%cyoshi.attack(bebop)","color:#ED1C28;")
    console.log("%cyoshi.attack(rocksteady)","color:#ED1C28;")
    const clan=[new Footmen(),new Footmen(),new Footmen()]
    window.shedder=clan[0]
    window.bebop=clan[1]
    window.rocksteady=clan[2]
    const ACTIONS=["throwStarRight()","throwStarLeft()"]

    setTimeout(()=>{
    
        const intervalId=setInterval(()=>{
        if(clan.length=0){ clearInterval(intervalId) }
        if (health_bar.health<health_bar.maxHealth){
            let enemy=clan[randInt(0,clan.length)]

            if(parseInt(enemy.img.style.left) < parseInt(window.yoshi.img.style.left)){
                eval("enemy."+ACTIONS[randInt(0,ACTIONS.length)])
            }else{

                eval("enemy."+ ACTIONS[randInt(0,ACTIONS.length)])
            }
            for(let footman of clan){
                if (!footman.img){
                    clan.splice(clan.indexOf(footman),1)
                }
            }

        }else{
            clearInterval(intervalId)
        }

    },850)},5000)

    const finishId=setInterval(
        ()=>{
            if (document.getElementById("first")===null&&document.getElementById("fourth")===null&&document.getElementById("third")===null&&document.getElementById("second")===null){
                clearInterval(finishId)
                console.clear()
                console.log("%cYou are Ready for your mission!","color:#8FD129; font-size:20px;")
                console.log("%cThere are three difficulties you can try","color:#8FD129;")
                
                console.log("%cLevel 1","color:#8FD129; font-size:15px;")
                console.log("%cFight four standard itelligence Foot","color:#8FD129;")
                console.log("%cTo play type:","color:#8FD129;")
                console.log("%clevel1()","color:#ED1C28;")


                console.log("%cLevel 2","color:#8FD129; font-size:20px;")
                console.log("%cThe Foot Clan members are smarter now and attack faster","color:#8FD129;")
                console.log("%cTo play type:","color:#8FD129;")
                console.log("%clevel2()","color:#ED1C28;")


                console.log("%cLevel 3","color:#8FD129; font-size:20px;")
                console.log("%cThe Foot is pist! They now send a constant air raid!","color:#8FD129;")
                console.log("%cTo play type:","color:#8FD129;")
                console.log("%clevel3()","color:#ED1C28;")


            }
        },50
    )


}
