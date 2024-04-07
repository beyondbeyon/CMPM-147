// project.js - A glitch.io generator 
// Author: Bryon Anderson
// Date: 4/6/24

// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

const fillers = {
  adventurer: ["My dude", "Bro", "WesBot", "Adventurer", "Traveller", "Fellow", "Citizen", "Ashen One", "Dragonborn", "Cool person", "Tarnished", "勇者", "$adventurer and $adventurer", "$adventurer, $adventurer, and $adventurer", "Geoff"],
  pre: ["you can't $mid when you", "you have to $mid everytime you", "whenever you $mid you have to"],
  mid: ["poop", "fart", "sing","hold $item", "lick the nearest toe", "run", "lose your keys", "sleep"],
  post: ["see a woman", "eat $num children", "step on a crack", "open a door", "lick something", "run into an acquaintance", "lose 15 pounds"],
  people: ["kindly", "meek", "brave", "wise", "sacred", "cherished", "honored", "forgotten", "apathetic", "mystic", "orca", "帥氣"],
  item: ["a axe", "a staff", "a book", "a cloak", "a shield", "a club", "a sword", "magic gloves", " a galvel", "fists", "a mace", "a potato"],
  num: ["two", "three", "eleven", "so many", "too many", "an unsatisfying number of", "barely any", "an unspecified amount of", "surely a satisfactory number of"],
  looty: ["gleaming", "valuable", "esteemed", "rare", "exalted", "scintillating", "kinda gross but still usefull", "complete garbage"],
  loots: ["coins", "chalices", "ingots", "hides", "victory points", "gems","scrolls", "bananas", "noodles", "goblins", "CS Majors", "college credits"],
  baddies: ["orcs", "glubs", "fishmen", "cordungles", "mountain trolls", "college professors", "dragon", "evil $adventurer", "agents of chaos"],
  power: ["Light manipulation", "Radar sense", "Prehensile hair", "Dust detection", "An Invincible Appendix", "Telekinesis", "Superhuman Hindsight", "Super smell", "Power Mimicry", "imagination", "Time travel", "Flight", "Necromancy"],
  
};

const template = `$adventurer, you have been chosen for power!

I bestow upon you the gift of $power, however it comes with a consquence.

My $looty champion, $pre $post. There is one way to over come this hindrance. You must venture forth, defeat the leader of the $baddies, and take hold of your destiny!
`;


// STUDENTS: You don't need to edit code below this line.

const slotPattern = /\$(\w+)/;

function replacer(match, name) {
  let options = fillers[name];
  if (options) {
    return options[Math.floor(Math.random() * options.length)];
  } else {
    return `<UNKNOWN:${name}>`;
  }
}

function generate() {
  let story = template;
  while (story.match(slotPattern)) {
    story = story.replace(slotPattern, replacer);
  }

  /* global box */
  box.innerText = story;
}

/* global clicker */
clicker.onclick = generate;

generate();