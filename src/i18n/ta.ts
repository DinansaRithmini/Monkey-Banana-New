import type { Dict } from './en';

/** Tamil. First-pass translation — worth a native-speaker review before shipping. */
export const ta: Dict = {
  'brand.monkey': 'MONKEY',
  'brand.banana': 'BANANA',

  'loading.game': 'விளையாட்டு ஏற்றப்படுகிறது...',
  'loading.winners': 'கடந்த வெற்றியாளர்கள் ஏற்றப்படுகிறார்கள்...',
  'error.enterName': 'முதலில் உங்கள் பெயரை உள்ளிடவும்',
  'error.sessionNotReady': 'உங்கள் அமர்வு இன்னும் தயாராக இல்லை. விளையாட்டை மீண்டும் ஏற்றி முயற்சிக்கவும்.',
  'error.betFailed': 'பந்தையம் வைப்பது தோல்வியடைந்தது.',
  'error.joinFailed': 'விளையாட்டில் சேர பிழை.',
  'error.loadWinnersFailed': 'வெற்றியாளர்களை ஏற்ற முடியவில்லை',
  'common.retry': 'மீண்டும் முயற்சிக்கவும்',

  'common.gotIt': 'புரிந்தது!',
  'common.continue': 'தொடரவும்',
  'common.confirm': 'உறுதிசெய்க',
  'common.placing': 'வைக்கப்படுகிறது...',
  'common.add': 'சேர்',
  'common.quickBetPlusOne': '+ 1',
  'common.balanceLabel': 'இருப்பு:',
  'common.won': 'வென்றது',
  'common.pricePool': 'பரிசுத் தொகை',
  'common.activePlayers': 'செயலில் உள்ள வீரர்கள்',
  'common.activePlayersLeaf': '🌿 செயலில் உள்ள வீரர்கள்',
  'common.pastWinners': 'கடந்த வெற்றியாளர்கள்',
  'common.pastWinnersTitleCase': 'கடந்த வெற்றியாளர்கள்',
  'common.pastWinnersTrophy': '🏆 கடந்த வெற்றியாளர்கள்',
  'common.noWinnersYet': 'இன்னும் வெற்றியாளர்கள் இல்லை. முதலில் நீங்களே ஆகுங்கள்!',
  'common.waitingForPlayers': 'வீரர்களுக்காக காத்திருக்கிறது...',
  'common.waitingForPlayersReel': 'வீரர்களுக்காக காத்திருக்கிறது...',

  'howToPlay.ariaLabel': 'எப்படி விளையாடுவது',
  'howToPlay.title': 'எப்படி விளையாடுவது',
  'howToPlay.overviewHeading': '🎰 விளையாட்டு மேலோட்டம்',
  'howToPlay.overviewBody':
    'Monkey Banana என்பது வீரர்கள் ஜாக்பாட்டுக்காக போட்டியிடும் ஒரு சுவாரஸ்யமான விளையாட்டு! உங்கள் பந்தையத்தை வையுங்கள், வெற்றியாளரை தீர்மானிக்க ஸ்லாட் மெஷின் சுழல்வதைப் பாருங்கள்.',
  'howToPlay.stepsHeading': '💰 எப்படி விளையாடுவது',
  'howToPlay.step1': 'ஸ்லாட் மெஷினின் மேற்பகுதியில் உங்கள் வாலட் இருப்பைச் சரிபார்க்கவும்',
  'howToPlay.step2': 'உங்கள் பந்தையத்தை உறுதிப்படுத்த "சேர்" என்பதை கிளிக் செய்யவும்',
  'howToPlay.step3': 'மற்ற வீரர்கள் சுற்றில் சேரும் வரை காத்திருக்கவும்',
  'howToPlay.step4': 'நேரம் முடிந்தவுடன் ஸ்லாட் மெஷின் சுழல்வதைப் பாருங்கள்',
  'howToPlay.step5': 'நீங்கள் வென்றால், முழு பரிசுத் தொகையும் உங்களுக்கே!',
  'howToPlay.winningHeading': '🏆 வெற்றி',
  'howToPlay.winningBody':
    'ஸ்லாட் மெஷின் ஒரு வீரரை சீரற்ற முறையில் வெற்றியாளராகத் தேர்ந்தெடுக்கிறது. மேலும் வீரர்கள் சேரும்போது மொத்த பரிசுத் தொகை காட்டப்பட்டு புதுப்பிக்கப்படும்.',
  'howToPlay.timerHeading': '⏱️ நேரம்',
  'howToPlay.timerBody':
    'ஒவ்வொரு சுற்றுக்கும் ஒரு கவுண்ட்டவுன் டைமர் உள்ளது. நேரம் முடிவதற்கு முன் உங்கள் பந்தையங்களை வையுங்கள்! ஒவ்வொரு சுழற்சிக்குப் பிறகும் புதிய சுற்று தானாகவே தொடங்கும்.',
  'howToPlay.tip':
    '💡 குறிப்பு: உபாயமுறையாக பந்தையம் வைக்க மொத்த பரிசுத் தொகையையும் வீரர்களின் எண்ணிக்கையையும் கண்காணிக்கவும்!',

  'bet.confirmTitle': 'உங்கள் பந்தையத்தை உறுதிப்படுத்தவும்',
  'bet.confirmBody1': 'இதை வைக்க விரும்புகிறீர்களா',
  'bet.confirmBody2': 'இந்தத் தொகை உங்கள் வாலட் இருப்பிலிருந்து கழிக்கப்படும்.',

  'insufficient.title': 'போதிய இருப்பு இல்லை',
  'insufficient.body': 'இந்த பந்தையத்தை வைக்க உங்கள் வாலட்டில் போதிய நாணயங்கள் இல்லை.',

  'jackpot.title': 'ஜாக்பாட்',
  'win.title': 'நீங்கள் வென்றீர்கள்',
  'lose.you': 'நீங்கள்',
  'lose.lose': 'தோற்றீர்கள்',

  'phase.guestBetting': 'உங்கள் பந்தையத்தை வைக்க உள்நுழையவும்! ',
  'phase.spinning': 'சக்கரம் சுழல்கிறது... ',
  'phase.guestFinished': 'அடுத்த சுற்றில் சேர உள்நுழையவும்! ',
  'phase.roundEnding': 'சுற்று முடிகிறது — அடுத்ததற்கு தயாராகுங்கள்! ',
  'phase.guestWelcome': 'Monkey Banana-வுக்கு வரவேற்கிறோம் ',
  'phase.enterName': 'வீரரே, வரவேற்கிறோம்! விளையாட்டைத் தொடங்க உங்கள் பெயரை உள்ளிடவும்.',

  'phase.placedWager': 'உங்கள் பந்தையம் வைக்கப்பட்டது, வாழ்த்துகள்! ',
  'phase.placeWager': '{name}, உங்கள் பந்தையத்தை வையுங்கள்! ',
  'phase.won': 'வாழ்த்துகள் {name}, நீங்கள் இந்த சுற்றில் வென்றீர்கள்! ',
  'phase.lost': 'அடுத்த முறை நல்ல அதிர்ஷ்டம், {name}! ',
  'phase.joinNext': '{name}, அடுத்த சுற்றில் சேருங்கள்! ',
  'phase.welcomeName': '{name}, Monkey Banana-வுக்கு வரவேற்கிறோம் ',

  'pastWinners.placedLine': 'வைத்தது {amount} • {date}',
};
