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
console.log(`%cType: "help()" to learn how to get started`,'font-size:25px; color:#8FD129')


function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  
  

const COMMANDS=[ "Hero Block", "Hero Walk Left", "Hero Walk Right", "Hero Throw Knife"]

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
                    console.log("died")
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
        bombList=bombList.filter((bomb)=>bomb!==this)
        document.getElementById("bomb-desc").remove()
    }

    stopRaid(){
        clearInterval(this.stop)
        console.log("%cThe raid is ending", "color:#ED1C28")
    }
}

function stopRaid(){
    const intervalId=setInterval(()=>{
        if (bombList.length!==0){
            bombList[0].stopRaid()
            clearInterval(intervalId)
        }
    },5000)
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
    console.log("%clet yoshi = new Hero()","color: #ED1C28")
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
    console.log("%yoshi.walkLeft(2)","color: #ED1C28")
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


const POSITIONS=["400px", "500px", "600px", "700px", "50px"]
const IDS=["first" ,"second", "third", "fourth", "hero"]

function checkDeath(){
    if(health_bar.health==health_bar.maxHealth){
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
          if (newLeft > -150 && newLeft < 900){
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
        // let newImg = img.cloneNode()
        img.classList.add("throwing")
        if (direction=="left"){
            img.src="./images/right-arm-throw-min.gif"
        }else{
            img.src="./images/left-arm-throw-min.gif"
        }
        // this.backdrop.removeChild(img)
        // this.backdrop.appendChild(newImg)
        // img = img
        if (direction == "left"){
            img.insertAdjacentHTML("afterend",`<img src='./images/throwstar.gif' class='starLeft' id='star-${this.id}'>`)
        }else{
            img.insertAdjacentHTML("afterend",`<img src='./images/throwstar.gif' class='starRight' id='star-${this.id}'>`)
        }
        let star = document.getElementById(`star-${this.id}`)
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
        const intervalId=setInterval(()=>{
            let endLoop=()=>{    
                clearInterval(intervalId)
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
            if(parseInt(star.style.left)<0||parseInt(star.style.left)>950){
                endLoop()
                return
            }

            // if((hero&&direction=="left" && parseInt(star.style.left)<=parseInt(hero.style.left)+200 )||(hero&&direction=="right" && parseInt(star.style.left)>=parseInt(hero.style.left)+50)){
            //     if (hero.classList.contains("blocking")){
            //         endLoop()
            //         return
            //     }
            // }

            if(hero&&direction=="left" && heroOnLeft() && parseInt(star.style.left)<=parseInt(hero.style.left)+150){
                //hit the hero
                if (!hero.classList.contains("blocking")){
                    hero.src='./images/damage_animate.gif'
                    setTimeout(()=>{hero.src="./images/hero-standing-min.png"},2000)
                    health_bar.decreaseHealth()
                    checkDeath()
                }
                endLoop()
            }else if(hero&&direction=="right" && !heroOnLeft() && parseInt(star.style.left)>=parseInt(hero.style.left)+65){
                //hit the hero

                if (!hero.classList.contains("blocking")){
                    hero.src='./images/damage_animate.gif'
                    setTimeout(()=>{hero.src="./images/hero-standing-min.png"},2000)
                    health_bar.decreaseHealth()
                    checkDeath()
                }
                endLoop()
            }else if(parseInt(star.style.left)>=1050 ||parseInt(star.style.left)<=-50){
                endLoop()
            }
            const liveStar=document.getElementById(`star-${this.id}`)
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


function reset(){
    window.start_clan=[]
    window.danny=null
    window.shedder=null
    window.bebop=null
    window.rocksteady=null
    health_bar.health=0
    Token.reset()
}

class Hero extends Token{
    
    
    static ids = [...HERO_IDS]
    static positions = [...HERO_POSITIONS]
    constructor(){
        super(Hero)
    }

    attack(enemy){
        if(  bombList.length>0 && bombList[0].command==="Hero Throw Knife"){
            bombList[0].destroy()
        }
        super.attack(enemy)
    }
    walk(n=1, direction=-1){
        if(   (bombList.length>0 && direction !==-1 && bombList[0].command==="Hero Walk Right") || 
        (bombList.length>0 && direction==-1 && bombList[0.].command==="Hero Walk Left")){
            bombList[0].destroy()
        }
        super.walk(n,direction)
    }

    remove(){
        this.img.remove()
        Hero.ids.push(this.id)
        Hero.positions.push(this.position)
    }

    block(dir="right"){
        if(  bombList.length>0 && bombList[0].command==="Hero Block"){
            bombList[0].destroy()
        }

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
        Footmen.positions.push(this.position)
    }
}
window.start_clan=[new Footmen(),new Footmen(),new Footmen(),new Footmen()]
window.danny=start_clan[0]
window.shedder=start_clan[1]
window.bebop=start_clan[2]
window.rocksteady=start_clan[3]

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

function level1(){
    // window.location.reload();
    reset()
    gameInfo()
    const clan=[new Footmen(),new Footmen(),new Footmen(),new Footmen()]
    window.danny=clan[0]
    window.shedder=clan[1]
    window.bebop=clan[2]
    window.rocksteady=clan[3]
    window.yoshi=new Hero()
    const ACTIONS=["throwStarLeft()", "throwStarRight()","walkLeft(4)","walkRight(4)"]
    
    const intervalId=setTimeout(setInterval(()=>{

        if (health_bar.health<health_bar.maxHealth){
            eval("clan[randInt(0,clan.length)]."+ACTIONS[randInt(0,ACTIONS.length)])
            for(let footman of clan){
                if (!footman.img){
                    clan.splice(clan.indexOf(footman),1)
                }
            }

        }else{
            clearInterval(intervalId)
        }

    },700),1000)
}



function level2(){
    // window.location.reload();
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

    const intervalId=setTimeout(setInterval(()=>{

        if (health_bar.health<health_bar.maxHealth){
            let enemy=clan[randInt(0,clan.length)]

            if(parseInt(enemy.img.style.left) < parseInt(window.yoshi.img.style.left)){
                console.log(enemy+"."+ACTIONS_RIGHT[randInt(0,ACTIONS_RIGHT.length)])
                eval("enemy."+ACTIONS_RIGHT[randInt(0,ACTIONS_RIGHT.length)])
            }else{
                eval("enemy."+ ACTIONS_LEFT[randInt(0,ACTIONS_LEFT.length)])
            }
            for(let footman of clan){
                if (!footman.img){
                    clan.splice(clan.indexOf(footman),1)
                }
            }

        }else{
            clearInterval(intervalId)
        }

    },550),1000)
}

function level3(){
    // window.location.reload();
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
    const intervalId=setTimeout(setInterval(()=>{

        if (health_bar.health<health_bar.maxHealth){
            let enemy=clan[randInt(0,clan.length)]

            if(parseInt(enemy.img.style.left) < parseInt(window.yoshi.img.style.left)){
                eval("enemy."+ACTIONS_RIGHT[randInt(0,ACTIONS_RIGHT.length)])
            }else{

                eval("enemy."+ ACTIONS_LEFT[randInt(0,ACTIONS_LEFT.length)])
            }
            for(let footman of clan){
                if (!footman.img){
                    clan.splice(clan.indexOf(footman),1)
                }
            }

        }else{
            clearInterval(intervalId)
            stopRaid()
        }

    },550),1000)
}