// Here's how we ould access our contract

var abi = './zombieFactory.json'

var ZombieFactoryContract = web3.eth.contract(abi);
var contractAddress = '0x6a232146702721f972b612284FD103820b682a69'
var ZombieFactory = ZombieFactoryContract.at(contractAddress);

// zombiefactory has acess to contract's public functions and event

ZombieFactory.createRandomZombie(name);

var event = ZombieFactory.NewZombie((error,result)=>{
    if(error) return
    generateZombie(result.zombieId,result.name,result.dna);
})

function generateZombie(id,name,dna){
    let dnaStr = String(dna)
    while (dnaStr.length <16)
    dnaStr = "0"+dnaStr;
    let zombieDetails = {
        // first 2 digits make up the head. We have 7 possible heads, so % 7
        // to get a number 0 - 6, then add 1 to make it 1 - 7. Then we have 7
        // image files named "head1.png" through "head7.png" we load based on
        // this number:
        headChoice: dnaStr.substring(0, 2) % 7 + 1,
        // 2nd 2 digits make up the eyes, 11 variations:
        eyeChoice: dnaStr.substring(2, 4) % 11 + 1,
        // 6 variations of shirts:
        shirtChoice: dnaStr.substring(4, 6) % 6 + 1,
        // last 6 digits control color. Updated using CSS filter: hue-rotate
        // which has 360 degrees:
        skinColorChoice: parseInt(dnaStr.substring(6, 8) / 100 * 360),
        eyeColorChoice: parseInt(dnaStr.substring(8, 10) / 100 * 360),
        clothesColorChoice: parseInt(dnaStr.substring(10, 12) / 100 * 360),
        zombieName: name,
        zombieDescription: "A Level 1 CryptoZombie",
      }
      return zombieDetails
}



