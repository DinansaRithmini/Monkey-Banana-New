import type { Dict } from './en';

/** Sinhala. First-pass translation — worth a native-speaker review before shipping. */
export const si: Dict = {
  'brand.monkey': 'MONKEY',
  'brand.banana': 'BANANA',

  'loading.game': 'ක්‍රීඩාව පූරණය වෙමින්...',
  'loading.winners': 'ජයග්‍රාහකයින් පූරණය වෙමින්...',
  'error.enterName': 'කරුණාකර පළමුව ඔබේ නම ඇතුළත් කරන්න',
  'error.sessionNotReady': 'ඔබේ සැසිය තවම සූදානම් නැත. කරුණාකර ක්‍රීඩාව නැවත පූරණය කර උත්සාහ කරන්න.',
  'error.betFailed': 'ඔට්ටුව තැබීම අසාර්ථකයි.',
  'error.joinFailed': 'ක්‍රීඩාවට එක්වීමේ දෝෂයක්.',
  'error.loadWinnersFailed': 'ජයග්‍රාහකයින් පූරණය කිරීමට අසමත් විය',
  'common.retry': 'නැවත උත්සාහ කරන්න',

  'common.gotIt': 'තේරුණා!',
  'common.continue': 'ඉදිරියට',
  'common.confirm': 'තහවුරු කරන්න',
  'common.placing': 'ඔට්ටුව තබමින්...',
  'common.add': 'එකතු කරන්න',
  'common.quickBetPlusOne': '+ 1',
  'common.balanceLabel': 'ශේෂය:',
  'common.won': 'දිනුවා',
  'common.pricePool': 'ත්‍යාග මුදල',
  'common.activePlayers': 'ක්‍රීඩකයින්',
  'common.activePlayersLeaf': '🌿 ක්‍රීඩකයින්',
  'common.pastWinners': 'පසුගිය ජයග්‍රාහකයින්',
  'common.pastWinnersTitleCase': 'පසුගිය ජයග්‍රාහකයින්',
  'common.pastWinnersTrophy': '🏆 පසුගිය ජයග්‍රාහකයින්',
  'common.noWinnersYet': 'තවම ජයග්‍රාහකයින් නැත. පලමු වන්න!',
  'common.waitingForPlayers': 'ක්‍රීඩකයින් එනතුරු...',
  'common.waitingForPlayersReel': 'ක්‍රීඩකයින් එනතුරු...',

  'howToPlay.ariaLabel': 'ක්‍රීඩා කරන ආකාරය',
  'howToPlay.title': 'ක්‍රීඩා කරන ආකාරය',
  'howToPlay.overviewHeading': '🎰 ක්‍රීඩාව පිළිබඳව',
  'howToPlay.overviewBody':
    'Monkey Banana යනු ක්‍රීඩකයින් ත්‍යාග මුදල සඳහා තරඟ කරන උද්‍යෝගිමත් ක්‍රීඩාවකි! ඔබේ ඔට්ටුව තබා, ජයග්‍රාහකයා තීරණය කිරීමට ස්ලොට් යන්ත්‍රය කැරකෙන ආකාරය නරඹන්න.',
  'howToPlay.stepsHeading': '💰 ක්‍රීඩා කරන ආකාරය',
  'howToPlay.step1': 'ස්ලොට් යන්ත්‍රයේ ඉහළ ඔබේ මුදල් පසුම්බියේ ශේෂය පරීක්ෂා කරන්න',
  'howToPlay.step2': 'ඔබේ ඔට්ටුව තහවුරු කිරීමට "එකතු කරන්න" ක්ලික් කරන්න',
  'howToPlay.step3': 'අනෙකුත් ක්‍රීඩකයින් වටයට එක්වන තුරු රැඳී සිටින්න',
  'howToPlay.step4': 'කාලය අවසන් වූ විට ස්ලොට් යන්ත්‍රය කැරකෙන ආකාරය නරඹන්න',
  'howToPlay.step5': 'ඔබ දිනුවොත්, සම්පූර්ණ ත්‍යාග මුදල ඔබටමයි!',
  'howToPlay.winningHeading': '🏆 ජයග්‍රහණය',
  'howToPlay.winningBody':
    'ස්ලොට් යන්ත්‍රය අහම්බෙන් එක් ක්‍රීඩකයෙකු ජයග්‍රාහකයා ලෙස තෝරයි. සම්පූර්ණ ත්‍යාග මුදල පෙන්වන අතර, තව ක්‍රීඩකයින් එක්වන විට එය යටිගත වේ.',
  'howToPlay.timerHeading': '⏱️ කාලය',
  'howToPlay.timerBody':
    'සෑම වට්ටමකටම කාල නිර්ණයක් ඇත. කාලය අවසන් වීමට පෙර ඔබේ ඔට්ටු තබන්න! සෑම කැරකීමකින් පසුවම නව වට්ටමක් ස්වයංක්‍රීයව ආරම්භ වේ.',
  'howToPlay.tip':
    '💡 ඉඟිය: උපායමාර්ගිකව ඔට්ටු තැබීමට ත්‍යාග මුදල සහ ක්‍රීඩකයින් ගණන නිරීක්ෂණය කරන්න!',

  'bet.confirmTitle': 'ඔබේ පොරොන්දුව තහවුරු කරන්න',
  'bet.confirmBody1': 'ඔබට මෙය තැබීමට අවශ්‍යද',
  'bet.confirmBody2': 'මෙම මුදල ඔබේ මුදල් පසුම්බියේ ශේෂයෙන් අඩු කරනු ලැබේ.',

  'insufficient.title': 'ප්‍රමාණවත් ශේෂයක් නැත',
  'insufficient.body': 'මෙම පොරොන්දුව තැබීමට ඔබේ මුදල් පසුම්බියේ ප්‍රමාණවත් මුදල් නොමැත.',

  'jackpot.title': 'ජැක්පොට්',
  'win.title': 'ඔබ දිනුවා!',
  'lose.you': 'ඔබ',
  'lose.lose': 'පැරදුණා',

  'phase.guestBetting': 'ඔට්ටුව තැබීමට ලොග් වන්න! ',
  'phase.spinning': 'රවුම කැරකෙමින් පවතී... ',
  'phase.guestFinished': 'ඊළඟ වටයට එක්වීමට පිවිසෙන්න! ',
  'phase.roundEnding': 'වටය අවසන් — ඊළඟ එකට සූදානම් වන්න! ',
  'phase.guestWelcome': 'Monkey Banana වලට ඔබ සාදරයෙන් පිළිගනිමු ',
  'phase.enterName': 'ක්‍රීඩකයාට සාදරයෙන් පිළිගනිමු! ක්‍රීඩාව ආරම්භ කිරීමට ඔබේ නම ඇතුළත් කරන්න.',

  'phase.placedWager': 'ඔට්ටුව සාර්ථකව තැබුවා! ',
  'phase.placeWager': '{name}, ඔබේ ඔට්ටුව තබන්න! ',
  'phase.won': 'සුභ පැතුම් {name}, ඔබ මෙම වටය දිනුවා! ',
  'phase.lost': 'ඊළඟ වටයේදී ජයවේවා, {name}! ',
  'phase.joinNext': '{name}, ඊළඟ වටයට එක්වන්න!',
  'phase.welcomeName': '{name}, Monkey Banana වලට ඔබ සාදරයෙන් පිළිගනිමු ',

  'pastWinners.placedLine': '{amount}ක් තැබුවා • {date}',
};
