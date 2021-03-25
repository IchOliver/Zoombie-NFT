// SPDX-License-Identifier: MIT

pragma solidity >=0.5.0 <0.9.0;

/**
   @dev ZombieFactory to build an army of zombies.
   1. our factory will maintain a database of all zombies in our army.
   2. our factory will have a function for creating new zombies.
   3. Each zombie will have a random and unique appearance.
 */

 contract ZombieFactory{
     // zombie DNA is going to be determined by a 16-digit number.
     uint dnaDigits = 16;
     uint dnaModules = 10 ** dnaDigits;
     
     event NewZombie(uint zombieId,string name,uint dna);
     // need structs to implement more complex data type.
     struct Zombie {
           string name;
           uint dna;
     }

     // store an army of zombies in app

     Zombie[] public zombies;

     /**
        @dev create zombie function 
         params _name 
         params _dna
         return null 
      */
     function createZombie(string memory _name,uint _dna) private {
            // creating new Zombie and Array of zombies
           
          zombies.push(Zombie(_name,_dna));
          uint id = zombies.length-1;
            
            // events fire to communicate that something happened on blockchain to your app front-end.
            emit NewZombie(id, _name, _dna);
     }

     /**
         @dev view - it's only viewing the data but not modifying it:
         pure-it means you are not even accessing any data in the app.
         params- _str
         return- uint type
      */

      function _generateRandomDna(string memory _str) private view returns(uint){   
          uint rand = uint(keccak256(abi.encodePacked(_str)));
          return rand % dnaModules;
      }

      /**
         @dev create random zombie with random DNA
      
       */

       function createRandomZombie(string memory _name) public {
          uint randData = _generateRandomDna(_name);
          createZombie(_name, randData);
       }
 }
