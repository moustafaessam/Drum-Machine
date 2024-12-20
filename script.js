const bank = document.getElementById("bank");
const bankBlueBox = document.getElementById("black-box2");
const powerBlueBox = document.getElementById("black-box1");
const display = document.getElementById("display");
const power = document.getElementById("power");
const range = document.getElementById("range");
const texts = [
  {
    "Q-pad": {
      text: "Heater 1",
      audio:
        "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3",
    },
    "W-pad": {
      text: "Heater 2",
      audio:
        "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3",
    },
    "E-pad": {
      text: "Heater 3",
      audio:
        "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3",
    },
    "A-pad": {
      text: "Heater 4",
      audio:
        "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3",
    },
    "S-pad": {
      text: "Clap",
      audio:
        "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3",
    },
    "D-pad": {
      text: "Open HH",
      audio:
        "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3",
    },
    "Z-pad": {
      text: "Kick n' Hat",
      audio:
        "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3",
    },
    "X-pad": {
      text: "Kick",
      audio:
        "https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3",
    },
    "C-pad": {
      text: "Closed HH",
      audio:
        "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3",
    },
  },
  {
    "Q-pad": {
      text: "Chord 1",
      audio: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
    },
    "W-pad": {
      text: "Chord 2",
      audio: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
    },
    "E-pad": {
      text: "Chord 3",
      audio: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
    },
    "A-pad": {
      text: "Shaker",
      audio: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
    },
    "S-pad": {
      text: "Open HH",
      audio: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
    },
    "D-pad": {
      text: "Closed HH",
      audio: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
    },
    "Z-pad": {
      text: "Punchy Kick",
      audio: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
    },
    "X-pad": {
      text: "Side Stick",
      audio: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
    },
    "C-pad": {
      text: "Snare",
      audio: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
    },
  },
];

const soundletter = (l, i) => {
  display.innerText = texts[i][l]["text"];
  $(`#${l}`).html(
    `${l.replace("-pad", "")} <audio src=${
      texts[i][l]["audio"]
    } id="${l.replace("-pad", "")}" class="clip"></audio>`
  );
  $(`#${l}`).children()[0].play();
  $(`#${l}`).children()[0].volume = range.value / 100;
};

const setSources = (index) => {
  for (const text in texts[index]) {
    // console.log(texts[index][text]["audio"]);
    $(`#${text} audio`).attr("src", texts[index][text]["audio"]);
  }
};

$(document).ready(() => {
  setSources(0);
});

let powerValue = 1;
$(power).click(() => {
  if (powerValue) {
    powerBlueBox.style.justifyContent = "flex-end";
    powerValue = 0;
    $(display).text("");
    $(range).prop("disabled", true);
  } else {
    powerBlueBox.style.justifyContent = "flex-start";
    powerValue = 1;
    $(range).prop("disabled", false);
  }
});

let bankOpen = 1;
$(bank).click(() => {
  if (powerValue === 1) {
    if (bankOpen) {
      bankBlueBox.style.justifyContent = "flex-end";
      display.innerText = "Smooth Piano Kit";
      bankOpen = 0;
      setSources(1);
    } else {
      bankBlueBox.style.justifyContent = "flex-start";
      display.innerText = "Heater Kit";
      bankOpen = 1;
      setSources(0);
    }
  }
});

$(".drum-pad").click(function () {
  let id = $(this).attr("id");
  if (powerValue === 1) {
    if (bankOpen === 1) {
      soundletter(id, 0);
    } else {
      soundletter(id, 1);
    }
  }
});

$(document).keydown((e) => {
  const letter = e.key.toUpperCase() + "-pad";
  if (powerValue === 1) {
    if (bankOpen === 1) {
      soundletter(letter, 0);
    } else {
      soundletter(letter, 1);
    }
  }
});

$(".drum-pad").mousedown(function () {
  if (powerValue === 1) {
    $(this).css({
      "background-color": "orange",
      "box-shadow": "none", // Remove box shadow
      height: `${$(this).height() + 2}px`, // Increase height by 10px
    });
  }
});

$(".drum-pad").mouseup(function () {
  if (powerValue === 1) {
    const element = $(this); // Capture the current element
    setTimeout(() => {
      element.css({
        "background-color": "", // Revert background color
        "box-shadow": "", // Restore box shadow
        height: "", // Revert height
      });
    }, 50); // Delay in milliseconds
  }
});

range.addEventListener("input", () => {
  if (powerValue === 1) {
    $(display).text(`Volume: ${range.value}`);
  }
});
