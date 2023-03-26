const fileBody = document.querySelector('body')
const gameContainer = document.querySelector(`.game-container`)
const closeBtn = document.querySelector('.main-menu-button')
isHaveProgress = localStorage.getItem("gameProgress") ? true : false;

closeBtn.addEventListener('click', ()=> {
    localStorage.removeItem('gameProgress')
    location.reload();
})



//  data base
bgList = [
    `https://assets.pokemon.com//assets/cms2/img/misc/virtual-backgrounds/masters/forest.jpg`,
    `https://assets.pokemon.com//assets/cms2/img/misc/virtual-backgrounds/masters/coast.jpg`,
    `https://assets.pokemon.com//assets/cms2/img/misc/virtual-backgrounds/masters/volcano.jpg`
]

pokemonList = [
    ['Absol',`https://d275t8dp8rxb42.cloudfront.net/pokemon/portrait/Absol.png`,20],
    ['Blastoise','https://d275t8dp8rxb42.cloudfront.net/pokemon/portrait/Blastoise.png',20],
    ['Decidueye','https://d275t8dp8rxb42.cloudfront.net/pokemon/portrait/Decidueye.png',20],
    ['Lucario','https://d275t8dp8rxb42.cloudfront.net/pokemon/portrait/Lucario.png',20],
    ['Snorlax','https://d275t8dp8rxb42.cloudfront.net/pokemon/portrait/Snorlax.png',20],
    ['Zoroark','https://d275t8dp8rxb42.cloudfront.net/pokemon/portrait/Zoroark.png',20],
    ['Urshifu','https://d275t8dp8rxb42.cloudfront.net/pokemon/portrait/Urshifu.png',20],
    ['Gengar','https://d275t8dp8rxb42.cloudfront.net/pokemon/portrait/Gengar.png',20],
    ['Dodrio','https://d275t8dp8rxb42.cloudfront.net/pokemon/portrait/Dodrio.png',20],
    ['Cramorant','https://d275t8dp8rxb42.cloudfront.net/pokemon/portrait/Cramorant.png',20],
]

// class

class Pokemon {
    constructor(name, hp, img, mindmg, maxdmg, heal ) {
        this.name = name;
        this.hp = hp;
        this.img = img
        this.mindmg = mindmg;
        this.maxdmg = maxdmg;
        this.heal = heal;
    }

    attack() {
        return Math.floor(Math.random() * (this.maxdmg - this.mindmg) + this.mindmg)
    }

    getDamage(dmg) {
        this.hp -= dmg;
        if (this.hp > 0) return `${this.name} пропускает удар и получает ${dmg} урона!`
        return `${this.name} пропускает удар и падает без сознания! ${this.name} повержен!`
    }

    getBigDamage(dmg) {
        this.hp -= Math.floor(dmg * 1.2);
        if (this.hp > 0) return `${this.name} пропускает тяжелый удар и получает ${dmg} урона!`
        return `${this.name} пропускает тяжелый удар и падает без сознания! ${this.name} повержен!`
    }

    healed(heal) {
        this.hp += heal;
        if (this.hp > 100) this.hp = 100
        return `${this.name} обливает рану исцеляющим зельем и восстанавливает здоровье! Новый показатель здоровья ${this.name}: ${this.hp} HP! `
    }
}

class mainHero extends Pokemon{
    constructor(name, hp, img, mindmg, maxdmg, heal) {
        super();
        this.name = name ? name : 'Hero'; 
        this.hp = hp ? hp : 100;
        this.img = img? img: pokemonList[Math.floor(Math.random()*9)][1]
        this.mindmg = mindmg? mindmg: Math.floor(Math.random()*(9-5) + 5); // 5-9
        this.maxdmg = maxdmg? maxdmg: Math.floor(Math.random()*(13-11) + 11); // 11-13
        this.heal = heal? heal: Math.floor(Math.random()*(8-5) + 5); // 5-8;
    }
}

class enemy extends Pokemon {
    constructor(name, hp, img, mindmg, maxdmg, heal) {
        super();
        this.name = name ? name : 'Enemy';
        this.hp = hp ? hp : 20;
        this.img = img? img: pokemonList[Math.floor(Math.random()*9)][1]
        this.mindmg = mindmg? mindmg: Math.floor(Math.random()*(7-4) + 4); // 4-7
        this.maxdmg = maxdmg? maxdmg: Math.floor(Math.random()*(13-8) + 8); // 8-13
        this.heal = heal? heal: Math.floor(Math.random()*(3-1) + 1); // 1-3;
    }
}

// project part 

const mainMenuHTML = `<ul class="main-menu">
<li><a id="start-game-button" href="#">Start</a></li>
<li><a id="records-button" href="#">Records</a></li>
<li><a id="author-button" href="#">Author</a></li>
</ul>`;

const gameTableHTML = `<div class="battle-board">
<div class="hero-block pokemon-card"></div>
<div class="center-block">
    <div class="attack-button">
        <div class="hero-attack-1">Light Attack</div>
        <div class="hero-attack-2">Strong Attack</div>
        <div class="hero-heal">Heal</div>                    
    </div>
    <h3>Battle Log: </h3>
    <div class="fight-log">
    </div>
</div>
<div class="enemy-block pokemon-card"></div>

</div>`

const scoreInfoHTML = `<div class="score-table">
<h2>score table</h2>
<div class="score-list"></div>
</div>`

const authorInfoHTML = `<div class="author-info">
<h2>information about game author</h2>
<p>Game Tester - Sofia Nilga</p>
<p>Author Idea - Sofia Nilga</p>
<p>Game Designer - Sofia Nilga</p>
<p>Game Developer - Sofia Nilga</p>
<p>Dialog Developer - Sofia Nilga</p>
<p>Script Developer - Sofia Nilga</p>
<p>Frontend Developer - Sofia Nilga</p>
</div>`

function generateBG() {
    fileBody.style.backgroundImage = `url('${bgList[Math.floor(Math.random() * 3)]}')`
}
generateBG();

function loadScoreTable() {
    scoreList = document.querySelector('.score-list')
    
    scoreMas = JSON.parse(localStorage.getItem('record')) ? JSON.parse(localStorage.getItem('record')) : JSON.parse('[]');

    for (i=0;i<scoreMas.length;i++) {
        newLog = document.createElement('p');
        newLog.textContent = `${scoreMas[i].name}: ${scoreMas[i].Score}`;
        scoreList.appendChild(newLog)
    } 
}

function generateEnemy() {
    randmonPokemonId = Math.floor(Math.random()*9);
    gameEnemy = new enemy(pokemonList[randmonPokemonId][0],pokemonList[randmonPokemonId][2],pokemonList[randmonPokemonId][1])
}

if (!isHaveProgress) {    
    gameContainer.style = `padding-top: 350px;`
    gameContainer.innerHTML = mainMenuHTML;

    const startGameBtn = document.querySelector(`#start-game-button`)
    const recordsBtn = document.querySelector(`#records-button `)
    const authorBtn = document.querySelector(`#author-button`)

    startGameBtn.addEventListener('click', () => {
        gameHero = new mainHero(window.prompt('Enter your hero name:', ''))
        generateEnemy();
        localStorage.setItem('gameProgress', 'gameIsStart')
        localStorage.setItem('GameHero',JSON.stringify(gameHero))
        localStorage.setItem('GameEnemy',JSON.stringify(gameEnemy))
        location.reload();
    })

    recordsBtn.addEventListener('click', () => {
        gameContainer.style = `padding-top: 100px;`
        gameContainer.innerHTML = scoreInfoHTML;
        loadScoreTable()
    })

    authorBtn.addEventListener('click', () => {
        gameContainer.style = `padding-top: 100px;`
        gameContainer.innerHTML = authorInfoHTML;
    })
}
else {

gameContainer.style = `padding-top: 100px;`
gameContainer.innerHTML = gameTableHTML;

fightLogDiv = document.querySelector(`.fight-log`)
function battleComment(str) {
    newLog = document.createElement('p');
    newLog.textContent = str;
    fightLogDiv.appendChild(newLog)
    fightLogDiv.scrollTop = fightLogDiv.scrollHeight
}


GameHeroBackup = JSON.parse(localStorage.getItem('GameHero'))
GameEnemyBackup = JSON.parse(localStorage.getItem('GameEnemy'))

gameHero = new mainHero(GameHeroBackup.name,GameHeroBackup.hp,GameHeroBackup.img,GameHeroBackup.mindmg,GameHeroBackup.maxdmg,GameHeroBackup.heal)
gameEnemy = new enemy(GameEnemyBackup.name,GameEnemyBackup.hp,GameEnemyBackup.img,GameEnemyBackup.mindmg,GameEnemyBackup.maxdmg,GameEnemyBackup.heal)

function loadHero() {
    localStorage.setItem('GameHero',JSON.stringify(gameHero))
    const heroBlock = document.querySelector(`.hero-block`)
    heroBlock.innerHTML = `
    <img src="${gameHero.img}" alt="Hero">
    <h2>${gameHero.name}</h2>
    <div class="hp-bar"><div style="width: ${Math.floor(gameHero.hp/100*100)}%;"><p>${gameHero.hp}</p></div></div>`
}
function loadEnemy() {
    localStorage.setItem('GameEnemy',JSON.stringify(gameEnemy))
    const enemyBlock = document.querySelector(`.enemy-block`)
    enemyBlock.innerHTML = `
    <img src="${gameEnemy.img}" alt="Hero">
    <h2>${gameEnemy.name}</h2>
    <div class="hp-bar"><div style="width: ${Math.floor(gameEnemy.hp/20*100)}%;"><p>${gameEnemy.hp}</p></div></div>`
}
loadHero()
loadEnemy()

heroAtkBtn1 = document.querySelector(`.hero-attack-1`)
heroAtkBtn2 = document.querySelector(`.hero-attack-2`)
heroHealBtn = document.querySelector(`.hero-heal`)

heroName = gameHero.name
gameEnd = false
gameScore = localStorage.getItem('gameScore') ? localStorage.getItem('gameScore') : 0



function playerDie() {
    alert(`${gameHero.name} погиб! Игра окончена!\nКоличество побеждённых врагов: ${gameScore}.`)
    localStorage.removeItem('GameHero')
    localStorage.removeItem('GameEnemy')
    localStorage.removeItem('gameProgress')
    localStorage.removeItem('gameScore')
    
    records = JSON.parse(localStorage.getItem('record')) ? JSON.parse(localStorage.getItem('record')) : JSON.parse('[]')
    records.push({name: gameHero.name, Score: gameScore})
    // score sort
    for (i = 0 ; i < records.length;i++)
    for (j = records.length-2-i;j>=0;j--) {
        if (records[j].Score < records[j+1].Score) {
            tmp = records[j+1]
            records[j+1] = records[j]
            records[j] = tmp
        }
    }
    localStorage.setItem('record',JSON.stringify(records))

    location.reload();
}

function enemyAttack() {
    whatEnemyDo = Math.floor(Math.random() * 3)
    // crit c. : 5%
    maxEnemyCritValue = 1

    // light atk    
    if (whatEnemyDo == 0) {
        enemyCritTry = Math.floor(Math.random()*20)
        enemyNowCrit = enemyCritTry <= maxEnemyCritValue ? true : false

        // def
        if (!enemyNowCrit) battleComment(gameHero.getDamage(gameEnemy.attack()))
        // crit
        else battleComment(gameHero.getDamage(Math.floor(gameEnemy.attack()*1.5)))

        if (gameHero.hp <= 0) {
            return playerDie()
        }

        loadHero()
    }
    // strong atk
    else if (whatEnemyDo == 1) {
        enemyCritTry = Math.floor(Math.random()*20)
        enemyNowCrit = enemyCritTry <= maxEnemyCritValue ? true : false

        // def
        if (!enemyNowCrit) battleComment(gameHero.getBigDamage(gameEnemy.attack()))
        // crit
        else battleComment(gameHero.getBigDamage(Math.floor(gameEnemy.attack()*1.5)))

        if (gameHero.hp <= 0) {
            return playerDie()
        }

        loadHero()
    }
    // heal
    else {
        enemyCritTry = Math.floor(Math.random()*20)
        enemyNowCrit = enemyCritTry <= maxEnemyCritValue ? true : false

        // def
        if (!enemyNowCrit) battleComment(gameEnemy.healed(gameEnemy.heal))
        // crit
        else (battleComment(gameEnemy.healed(Math.floor(gameEnemy.heal*1.5)))) 
        loadEnemy()
    }
}



// crit c. : 15%
maxCritValue = 3

// light atk
heroAtkBtn1.addEventListener('click', () => {
    heroCritTry = Math.floor(Math.random()*20)
    heroNowCrit = heroCritTry <= maxCritValue ? true : false 

    // def
    if (!heroNowCrit) battleComment(gameEnemy.getDamage(gameHero.attack()))
    // crit
    else battleComment(gameEnemy.getDamage(Math.floor(gameHero.attack()*1.5)))

    if (gameEnemy.hp <= 0) {
        gameScore++;
        localStorage.setItem("gameScore", gameScore)
        generateEnemy();
        return loadEnemy()
    }

    loadEnemy()

    enemyAttack()
})        

// strong atk
heroAtkBtn2.addEventListener('click', () => {
    heroCritTry = Math.floor(Math.random()*20)
    heroNowCrit = heroCritTry <= maxCritValue ? true : false 

    // 20% miss
    if (Math.floor(Math.random()*9) < 2 ) {
        battleComment(`Пока ${gameHero.name} замахивался, чтобы нанести тяжелый удар, ${gameEnemy.name} успел увернуться от удара!`)
    }
    else {
        // def
        if (!heroNowCrit) battleComment(gameEnemy.getBigDamage(gameHero.attack()))
        // crit
        else battleComment(gameEnemy.getBigDamage(Math.floor(gameHero.attack()*1.5)))

        if (gameEnemy.hp <= 0) {
            gameScore++;
            generateEnemy();
            return loadEnemy()
        }

        loadEnemy()
    }
    
    enemyAttack()
})

// heal
heroHealBtn.addEventListener('click', () => {
    heroCritTry = Math.floor(Math.random()*20)
    heroNowCrit = heroCritTry <= maxCritValue ? true : false 

    // def
    if (!heroNowCrit) battleComment(gameHero.healed(gameHero.heal))
    // crit
    else (battleComment(gameHero.healed(Math.floor(gameHero.heal*1.5)))) 
    loadHero()

    // enemy miss 50%
    if (Math.floor(Math.random()*10) % 2 == 0) {
        battleComment(`Зелье, которым ${gameHero.name} обрабатывал рану дополнительно увеличило ловкрость, что позволило ${gameHero.name} увернуться от атаки врага!`)
    }
    else {
        enemyAttack()
    }
})

}