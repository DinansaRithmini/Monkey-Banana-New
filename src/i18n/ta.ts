import type { Dict } from './en';

/** Tamil. Updated for Betting/Gaming UI UX */
export const ta: Dict = {
  'brand.monkey': 'MONKEY',
  'brand.banana': 'BANANA',

  'loading.game': 'லோடிங்...', // Updated: Shorter (Loading...)
  'loading.winners': 'வெற்றியாளர்கள் லோடிங்...', // Updated: Shorter
  'error.enterName': 'முதலில் பெயரை உள்ளிடவும்', // Updated: Shorter
  'error.sessionNotReady': 'கேம் தயாராக இல்லை. மீண்டும் லோட் செய்யவும்.', // Updated: Shorter and transliterated 'Game/Load'
  'error.betFailed': 'பந்தயம் தோல்வி.', // Updated: 'பந்தயம் தோல்வி' is much shorter
  'error.joinFailed': 'கேமில் சேர முடியவில்லை.', // Updated
  'error.loadWinnersFailed': 'வெற்றியாளர்களை லோட் செய்ய முடியவில்லை', // Updated
  'common.retry': 'மீண்டும் முயற்சி செய்',

  'common.gotIt': 'புரிந்தது!',
  'common.continue': 'தொடரவும்',
  'common.confirm': 'உறுதி செய்', // Updated
  'common.placing': 'வைக்கிறது...', // Updated
  'common.add': 'சேர்',
  'common.quickBetPlusOne': '+ 1',
  'common.balanceLabel': 'பேலன்ஸ்:', // Updated: Transliterated 'Balance'
  'common.won': 'வெற்றி', // Updated: 'வெற்றி' (Win) instead of 'வென்றது'
  'common.pricePool': 'பரிசுத் தொகை',
  'common.activePlayers': 'பிளேயர்கள்', // Updated: Transliterated 'Players'
  'common.activePlayersLeaf': '🌿 பிளேயர்கள்', // Updated
  'common.pastWinners': 'முந்தைய வெற்றியாளர்கள்', // Updated
  'common.pastWinnersTitleCase': 'முந்தைய வெற்றியாளர்கள்',
  'common.pastWinnersTrophy': '🏆 முந்தைய வெற்றியாளர்கள்',
  'common.noWinnersYet': 'வெற்றியாளர்கள் இல்லை. நீங்களே முதல் வெற்றியாளர் ஆகுங்கள்!', // Updated
  'common.waitingForPlayers': 'பிளேயர்களுக்காக காத்திருப்பு...', // Updated: Shorter
  'common.waitingForPlayersReel': 'பிளேயர்களுக்காக காத்திருப்பு...', // Updated

  'howToPlay.ariaLabel': 'விளையாடுவது எப்படி',
  'howToPlay.title': 'விளையாடுவது எப்படி',
  'howToPlay.overviewHeading': '🎰 கேம் மேலோட்டம்', // Updated: Shorter
  'howToPlay.overviewBody':
    'Monkey Banana ஒரு சுவாரஸ்யமான கேம்! பந்தயம் கட்டி, வெற்றியாளரைத் தீர்மானிக்க ஸ்லாட் மெஷின் சுழல்வதைப் பாருங்கள்.', // Updated: Made concise
  'howToPlay.stepsHeading': '💰 விளையாடுவது எப்படி',
  'howToPlay.step1': 'மேலே உள்ள உங்கள் பேலன்ஸை சரிபார்க்கவும்', // Updated: Wallet -> Balance
  'howToPlay.step2': 'பந்தயத்தை உறுதிப்படுத்த "சேர்" என்பதை கிளிக் செய்யவும்',
  'howToPlay.step3': 'மற்ற பிளேயர்கள் சேரும் வரை காத்திருக்கவும்', // Updated: Players
  'howToPlay.step4': 'நேரம் முடிந்ததும் ஸ்லாட் சுழல்வதைப் பாருங்கள்', // Updated: Shorter
  'howToPlay.step5': 'நீங்கள் வென்றால், முழுப் பரிசும் உங்களுக்கே!',
  'howToPlay.winningHeading': '🏆 வெற்றி',
  'howToPlay.winningBody':
    'ஸ்லாட் மெஷின் ஒருவரை வெற்றியாளராகத் தேர்ந்தெடுக்கும். பிளேயர்கள் சேரும்போது பரிசுத் தொகை அப்டேட் ஆகும்.', // Updated: 'அப்டேட் ஆகும்' (Updates)
  'howToPlay.timerHeading': '⏱️ நேரம்',
  'howToPlay.timerBody':
    'சுற்றுக்கு ஒரு டைமர் உள்ளது. நேரம் முடிவதற்குள் பந்தயம் கட்டுங்கள்! முடிந்ததும் புதிய சுற்று தொடங்கும்.', // Updated: Shorter
  'howToPlay.tip':
    '💡 குறிப்பு: தந்திரமாக பந்தயம் கட்ட பரிசுத் தொகையையும் பிளேயர்கள் எண்ணிக்கையையும் கவனிக்கவும்!', // Updated

  'bet.confirmTitle': 'பந்தயத்தை உறுதி செய்', // Updated: Shorter
  'bet.confirmBody1': 'இதை வைக்க விரும்புகிறீர்களா',
  'bet.confirmBody2': 'இந்தத் தொகை உங்கள் பேலன்ஸிலிருந்து கழிக்கப்படும்.', // Updated

  'insufficient.title': 'பணம் போதவில்லை', // Updated: Matches standard UI (Insufficient funds)
  'insufficient.body': 'பந்தயம் கட்ட போதிய பணம் இல்லை.', // Updated

  'jackpot.title': 'ஜாக்பாட்',
  'win.title': 'வெற்றி!', // Updated
  'lose.you': 'நீங்கள்',
  'lose.lose': 'தோல்வி', // Updated: 'தோல்வி' (Loss)

  'phase.guestBetting': 'பந்தயம் கட்ட லாகின் செய்யவும்! ', // Updated: Transliterated 'Login'
  'phase.spinning': 'சுழல்கிறது... ', // Updated: Shorter
  'phase.guestFinished': 'அடுத்த சுற்றில் சேர லாகின் செய்யவும்! ', // Updated: Login
  'phase.roundEnding': 'சுற்று முடிகிறது — அடுத்ததற்கு தயார்! ', // Updated: Shorter
  'phase.guestWelcome': 'Monkey Banana-விற்கு நல்வரவு ', // Updated
  'phase.enterName': 'விளையாட உங்கள் பெயரை உள்ளிடவும்.', // Updated: Shorter

  'phase.placedWager': 'பந்தயம் உறுதியானது!', // Updated: Shorter (Bet confirmed)
  'phase.placeWager': '{name}, பந்தயம் கட்டுங்கள்! ', // Updated: Shorter
  'phase.won': 'வாழ்த்துகள் {name}, இந்த சுற்றில் வெற்றி! ', // Updated
  'phase.lost': 'அடுத்ததில் வெல்லலாம், {name}! ', // Updated: Matches previous ta.ts (Better luck next time)
  'phase.joinNext': '{name}, அடுத்த சுற்றில் சேருங்கள்! ',
  'phase.welcomeName': '{name}, Monkey Banana-விற்கு நல்வரவு ',

  'pastWinners.placedLine': 'வைத்தது {amount} • {date}',
};