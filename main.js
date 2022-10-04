'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};
 let numOfRings = 4

 // What is a win in Towers of Hanoi? When should this function run?
const checkForWin = (stack2) => {
  if (parseInt(stack2.length) == parseInt(numOfRings)) {
    console.log("WINNER WINNER CHIMKIN DINER")
    return true
  }
}

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
const movePiece = (stack1, stack2) => {
  let inHand = stack1.pop()
  stack2.push(inHand)
  // console.log('in hand: ' + inHand) //
  // console.log('stack a: ' + stacks.a) //
  // console.log('stack b: ' + stacks.b) //
  // console.log('length of b: '+ stacks.b.length) //
  checkForWin(stack2)
}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (stack1, stack2) => {
  // console.log("isLegal was run.") //
  let inHand = stack1.pop();
  // console.log(inHand) //
  // console.log(typeof inHand) //
  let checkedDisk = stack2.pop()
  // console.log(checkedDisk) //
if (typeof inHand == "number") {
  // console.log("inHand is a NUMBER") //
  if (parseInt(inHand) > parseInt(checkedDisk)) {
    stack1.push(inHand)
    stack2.push(checkedDisk)
    console.log("It's NOT legal!")
  } else {
    if (parseInt(inHand) < parseInt(checkedDisk)) {
      stack1.push(inHand)
      stack2.push(checkedDisk)
      console.log("It's legal!")
      movePiece(stack1, stack2)
    } else if (stack2.length == 0) {
      stack1.push(inHand)
      console.log("It's legal!")
      movePiece(stack1, stack2)
    } else {
      stack1.push(inHand)
      stack2.push(checkedDisk)
      console.log("It's NOT legal!")
    }
  }
} else {
  console.log("It's NOT legal!")
}
}
// isLegal(stacks.a, stacks.b)

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  console.log(typeof startStack)
  isLegal(stacks[startStack], stacks[endStack])
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);

      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
