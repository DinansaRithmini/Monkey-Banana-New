/**
 * English is the source of truth: `si.ts` and `ta.ts` are typed against it, so a
 * missing or misspelled key fails the build instead of rendering a raw key name
 * in production. Keys are flat and dotted; `{name}` / `{amount}` / `{date}` mark
 * interpolation points.
 */
export const en = {
  // ── Brand — kept in English in every language on purpose: it's the game's
  //    own name, not a description, so it isn't translated. ─────────────────
  'brand.monkey': 'MONKEY',
  'brand.banana': 'BANANA',

  // ── Loading / error states ───────────────────────────────────────────────
  'loading.game': 'Loading game...',
  'loading.winners': 'Loading past winners...',
  'error.enterName': 'Please enter your name first',
  'error.sessionNotReady': "Your session isn't ready yet. Please reload the game and try again.",
  'error.betFailed': 'Failed to place bet.',
  'error.joinFailed': 'Error joining game.',
  'error.loadWinnersFailed': 'Failed to load winners',
  'common.retry': 'Retry',

  // ── Shared labels used across the slot machine + popups ─────────────────
  'common.gotIt': 'Got It!',
  'common.continue': 'CONTINUE',
  'common.confirm': 'CONFIRM',
  'common.placing': 'PLACING...',
  'common.add': 'ADD',
  'common.quickBetPlusOne': '+ 1',
  'common.balanceLabel': 'BALANCE:',
  'common.won': 'WON',
  'common.pricePool': 'PRICE POOL',
  'common.activePlayers': 'ACTIVE PLAYERS',
  'common.activePlayersLeaf': '🌿 ACTIVE PLAYERS',
  'common.pastWinners': 'PAST WINNERS',
  'common.pastWinnersTitleCase': 'Past Winners',
  'common.pastWinnersTrophy': '🏆 PAST WINNERS',
  'common.noWinnersYet': 'No winners yet. Be the first!',
  'common.waitingForPlayers': 'Waiting for players...',
  'common.waitingForPlayersReel': 'WAITING FOR PLAYERS...',

  // ── How to Play popup ────────────────────────────────────────────────────
  'howToPlay.ariaLabel': 'How to play',
  'howToPlay.title': 'How to Play',
  'howToPlay.overviewHeading': '🎰 Game Overview',
  'howToPlay.overviewBody':
    'Monkey Banana is an exciting game where players compete for the jackpot! Place your wager and watch as the slot machine spins to determine the winner.',
  'howToPlay.stepsHeading': '💰 How to Play',
  'howToPlay.step1': 'Check your wallet balance at the top of the slot machine',
  'howToPlay.step2': 'Click "Add" to confirm your wager',
  'howToPlay.step3': 'Wait for other players to join the round',
  'howToPlay.step4': 'Watch the slot machine spin when the timer runs out',
  'howToPlay.step5': 'If you win, you take home the entire pot!',
  'howToPlay.winningHeading': '🏆 Winning',
  'howToPlay.winningBody':
    'The slot machine randomly selects one player as the winner. The total pot is displayed and updates as more players join.',
  'howToPlay.timerHeading': '⏱️ Timer',
  'howToPlay.timerBody':
    'Each round has a countdown timer. Place your wagers before time runs out! A new round starts automatically after each spin.',
  'howToPlay.tip':
    '💡 Tip: Keep an eye on the total pot and number of players to make strategic wagering decisions!',

  // ── Bet confirmation popup ───────────────────────────────────────────────
  'bet.confirmTitle': 'Confirm Your Wager',
  'bet.confirmBody1': 'Are you sure you want to place',
  'bet.confirmBody2': 'This amount will be deducted from your wallet balance.',

  // ── Insufficient balance popup ───────────────────────────────────────────
  'insufficient.title': 'Insufficient Balance',
  'insufficient.body': "Your wallet doesn't have enough coins to place this bet.",

  // ── Result popups ────────────────────────────────────────────────────────
  'jackpot.title': 'JACKPOT',
  'win.title': 'YOU WIN',
  'lose.you': 'YOU',
  'lose.lose': 'LOSE',

  // ── Slot machine phase messages (guest / no name yet) ────────────────────
  'phase.guestBetting': 'Sign in to place your wager! ',
  'phase.spinning': 'The wheel is spinning... ',
  'phase.guestFinished': 'Sign in to join the next round! ',
  'phase.roundEnding': 'Round ending — get ready for the next one! ',
  'phase.guestWelcome': 'Welcome to Monkey Banana ',
  'phase.enterName': 'Welcome player! Enter your name to start playing.',

  // ── Slot machine phase messages (named player) ───────────────────────────
  'phase.placedWager': 'Your wager has been placed, good luck! ',
  'phase.placeWager': 'Hey {name}, Place your wager! ',
  'phase.won': 'Congratulations {name}, You won this round! ',
  'phase.lost': 'Better luck next time, {name}! ',
  'phase.joinNext': 'Hey {name}, join the next round! ',
  'phase.welcomeName': 'Hey {name}, Welcome to Monkey Banana ',

  // ── Past winners list ─────────────────────────────────────────────────────
  'pastWinners.placedLine': 'Placed {amount} • {date}',
} as const;

export type Key = keyof typeof en;
/** Every translation file must cover every English key — enforced by tsc. */
export type Dict = Record<Key, string>;
