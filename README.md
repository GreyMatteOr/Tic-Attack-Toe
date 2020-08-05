# TicTacToe

> A [Front-End Mod-1 Final Project] by [Matthew Lane](https://github.com/GreyMatteOr)
---
## Contents
1. [Overview and Goals](#overview-and-goals)
1. [Technologies](#technologies)
1. [Features](#features)
1. [Challenges](#challenges)
1. [Wins](#wins)
---


## Overview
Hi there! I am a Module One student at Turing School of Software and Design. This 5-day project was meant to be a comprehensive test of everything we learned throughout the last 6 weeks. The main focuses were implementing clean, intentional HTML, CSS, and JavaScript to build an accessible, functional web-site.

The website itself lets users play games of Tic-Tac-Toe either against other users or varying levels of computer opponents. Statistics are tracked for all different profiles locally on the user's machine. The game itself has good, albeit basic responsiveness, and many thoughtful ways to interact with the page.

### Goals

The project's goals, listed below in an abbreviated form, are taken directly from the Turing project write-up:

``` Markdown
- Solidify and demonstrate your understanding of:
- DRY JavaScript
- localStorage to persist data
- event delegation to handle similar event listeners
- Understand the difference between the data model and how the data is displayed on the DOM
- Iterate through/filter DOM elements using for loops
- Use your problem solving process to break down large problems, solve things step by step, and trust yourself to not rely on an outside “answer” to a logical challenge
```

Some personal goals that we also wanted to include:

- Implement as much of the project as possible
- Use good git-based workflow
- Build all the basic functionality, and attempt some ambitious stretch goals, like :
  - varying levels of AI (including an unbeatable one)
  - animations
  - tic-tac-toe ultimate (a game of tic-tac-toe where each cell is it's own game of tic-tac-toe) game mode 

---

 ## Technologies

  - HTML
  - CSS
  - JavaScript
  - JSON-based local storage
  - Git


 > [Back to the top](#tictactoe)
---

## Features
+ [Comp and Layout](#the-comp-and-layout)
+ [Playing a Game](#playing-a-game)
+ [Changing Profiles](#Changing-Profiles)
+ [AI Players](#AI-Players)

> [Back to the top](#tictactoe)
---

## The Comp and Layout

This is the basic layout the site was meant to emulate:

<img src="https://user-images.githubusercontent.com/65369751/89362236-3286a980-d682-11ea-913d-4e02384cbecc.png" alt="comp" width="400"/><img src="https://user-images.githubusercontent.com/65369751/89362319-6eba0a00-d682-11ea-986a-fbeb99ee6bda.png" alt="attempt" width="400"/>

The theming was up to some creativity, so I chose front-end vs back-end!

> [Back to Features](#features)
---
## Playing a Game

In a game of Tic Tac Toe, players take alternating turns placing thier icon in tiles. The default game board is in a 3 by 3, but behind the hood I tried to make most of the functionality of the game work for scaling game sizes. In on the site, when it's a players turn, their icon will display at the top signifying that.  

<img width="732" alt="JS-Turn" src="https://user-images.githubusercontent.com/65369751/89362977-f8b6a280-d683-11ea-9da8-c5a974765a53.png">
<img width="732" alt="ruby-turn" src="https://user-images.githubusercontent.com/65369751/89362976-f8b6a280-d683-11ea-8180-b5022cc35ee1.png">

When it's a players turn, they can place their icon with a click. The website uses an event listener on the main game board and delegates to appropriate tile to check if it's available. If it's available, then the site changes to display that players icon. After two turns, the game might look like this: 

<img width="732" alt="Example-Turn" src="https://user-images.githubusercontent.com/65369751/89362974-f81e0c00-d683-11ea-9fab-4e9ef4fe3046.png">

A user wins when they get 3 of their icons consecutively accross any row, column or diagonal. When the game detects this has occured, the page responds with a startling explosion. It also visibly informs the user(s) who won.

<img width="1392" alt="example-win" src="https://user-images.githubusercontent.com/65369751/89363602-76c77900-d685-11ea-92e5-ce3b480aee56.png">
">

If a game is completely filled, a tie is declared and the game is reset.

<img width="665" alt="tiegame" src="https://user-images.githubusercontent.com/65369751/89366568-f7897380-d68b-11ea-97e4-8e39c0aa90b8.png">

At anytime, a player may forfeit (giving their opponent a win) by clicking on the 'forfeit' button below the game board.

<img width="732" alt="DuringGameClear" src="https://user-images.githubusercontent.com/65369751/89362972-f81e0c00-d683-11ea-964f-35d091d11367.png">

If a game is not on-going, the button will be disabled. If a player leaves the page while a game in on going, it is also counted as a forfeit.

> [Back to Features](#features)
---
## Changing Profiles

When a user first loads the page, the game defaults to two anonymous profiles as players. 

<img width="376" alt="anonymous-js" src="https://user-images.githubusercontent.com/65369751/89363900-2866aa00-d686-11ea-9f5f-637f595d8eca.png">
<img width="376" alt="anonymous-ruby" src="https://user-images.githubusercontent.com/65369751/89363905-2bfa3100-d686-11ea-82f2-522fe1446fca.png">

These default players do not display any of their tracked stats. However, if a player wants to start tracking wins, they can hit the change button to open up the change-player form.

<img width="376" alt="change-player" src="https://user-images.githubusercontent.com/65369751/89364329-16d1d200-d687-11ea-8d14-d718d7abd3fd.png">

Here, they can type a name in and hit enter or hit the checkmark button to swap profiles. Profiles each a unique name that they are associated with and will persistently track game statistics (like wins ( which is displayed ) ties, games played ).

<img width="376" alt="example-player" src="https://user-images.githubusercontent.com/65369751/89364549-8e9ffc80-d687-11ea-8df0-02be4a0955a2.png">

If a player wants to reset their stats, they may hit the clear scores button. This is only available when there isn't a game being played.

<img width="423" alt="clear-button" src="https://user-images.githubusercontent.com/65369751/89366652-1f78d700-d68c-11ea-8082-093963d5d9c0.png">

A couple things to note: a profile may not be switched to if the other player is already playing them. Also, a user may not change matches while a game is underway.

<img width="425" alt="During-Game-Change" src="https://user-images.githubusercontent.com/65369751/89362961-f3f1ee80-d683-11ea-9402-0827d057d163.png">

A user can return to the anonymous profile by changing to the default profile name or by hitting the anonymous button.

> [Back to Features](#features)
---
## AI players
The game has different levels of AI that can play against the player or against themselves. There are buttons that allow a player to select the different levels.

<img width="376" alt="AI-buttons" src="https://user-images.githubusercontent.com/65369751/89365029-a7f57880-d688-11ea-9632-20eb15b65c65.png">

Each of the AI levels have different profiles associated with them, as well as player side. The names for all 6 are also very clever. After an AI bot is loaded in, the computer player will take a turn whenever it is appropriate to do so. 

<img width="376" alt="autorun" src="https://user-images.githubusercontent.com/65369751/89365010-9ca24d00-d688-11ea-98f6-ae75cfade059.png">

It is possible to have 2 auto-run AI's play each other (and the results are as you would expect). It is also possible to make the AI wait-until-instructed by toggling to the manual mode. After that, merely clicking the accompanying button will trigger a turn.

<img width="376" alt="manual move" src="https://user-images.githubusercontent.com/65369751/89365004-99a75c80-d688-11ea-9562-4f801b57e947.png">

If two computer players are set to manual mode, it is possible to toggle both of them with only one button (so that you don't have to move the cursor repeateedly).

The different levels of AI can be described as follows:

EZ: Picks a random open tile every move. Quite easy to beat, play sub-optimally very often
Med: If there is a winning play available to either player, it takes that spot. Otherwise, it picks randomly. Tricky to beat!
Hard: Difficult to win against. Not only that, it will very often play optimally to beat sub-optimal players frequently. There is currently only one strategy that will beat it, Can you find it?

> [Back to Features](#features)

---
 ## Challenges  
 
> [Back to the top](#tictactoe)
---

- Setting out, it was hard to predict what I wanted my data model to look like, or the architecture of my Javascript. I ended up refactoring huge swathes of code, sometimes several times after I realized that the direction I was heading was inefficient or sub-optimal. Things were often so inefficient, that adding more features was incredibly tedious and difficult. This prompted many clean-ups and overhauls. Also, this meant that a lot of my early efforts to test functionality might have been mostly useless, since changing so much so often meant having to re-test (and praying that it still worked!) During all this, though, it did really cement some solid design fundamentals that I think will gradually creep into habit after a while.

- I also took great pains to future-proof things (like handling style elements dynamically in the player class (for user-profiles), or testing win and board states with different board sizes). I did intend to possibly use this functionality, but in the end, I never made it there and will have to satisfy myself that I struggled productively.

- Which brings me to the AI and stretch goals. I spent easily a quarter of the entire project time one this one feature, and the final AI was still incomplete (not to mention probably very-ugly, code-wise). I really wasn't even that excited about the AI, but I thought it would be fairly simple to implement. The first 2 even were relatively simple. But I ended up in a rabbit-hole with the hard-AI and never got to try Ultimate Tic-Tac-Toe (which was what Ireally wanted to do :/)

---
## Wins
---

I was surprised how quickly my sites visuals came together. I had set aside the bulk of the project to do that, but instead I put it all together in basically 7 hours (including finding and formatting assets and animations). I also never expected it to look this good (historically, I'm pretty bad at visual design).

I also Was thrilled how good I got my animations to look. I had tried it on a project once before, but it was a headache to actually get it to look right.  This time, it went together pretty easily! I took this to mean I'm getting better!

Finally, I'm really proud of some of the ways I went about things. Starting out, I set so personal challenges for specific techniques to recognize when to use them and execute, and I'm happy to say I met all of them!
> [Back to the top](#tictactoe)
