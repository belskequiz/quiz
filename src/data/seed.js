// src/data/seed.js
// Run `npm run generate-cards` to regenerate public/cards.json
//
// Wave schedule (from first use):
//   Wave 1 — Day 1   (available immediately)
//   Wave 2 — Day 8
//   Wave 3 — Day 15
//   Wave 4 — Day 22
//   Wave 5 — Day 29

export const vocabularyCards = [
  // Wave 1
  { id:'vocab_001', wave:1, type:'vocabulary', word:'reluctant', definition:'Not willing to do something; hesitant', definitionSimple:"When you really don't want to do something", exampleSentence:'She was reluctant to leave the party early.', synonyms:['hesitant','unwilling'], antonyms:['eager','willing'] },
  { id:'vocab_007', wave:1, type:'vocabulary', word:'exasperated', definition:'Intensely irritated and frustrated', definitionSimple:'Super annoyed and fed up', exampleSentence:'The teacher was exasperated by the constant noise.', synonyms:['frustrated','irritated'], antonyms:['calm','pleased'] },
  { id:'vocab_008', wave:1, type:'vocabulary', word:'nonchalant', definition:'Appearing casually calm and relaxed', definitionSimple:'Acting cool like nothing bothers you', exampleSentence:'He seemed nonchalant about the exam results.', synonyms:['casual','indifferent'], antonyms:['anxious','concerned'] },
  { id:'vocab_009', wave:1, type:'vocabulary', word:'compassionate', definition:'Feeling or showing sympathy and concern for others', definitionSimple:"Caring deeply about other people's feelings", exampleSentence:'The compassionate nurse stayed with the patient all night.', synonyms:['caring','empathetic'], antonyms:['cruel','indifferent'] },
  { id:'vocab_010', wave:1, type:'vocabulary', word:'exploitative', definition:'Treating someone unfairly to benefit yourself', definitionSimple:'Using people in an unfair way to get what you want', exampleSentence:'The exploitative landlord charged too much rent.', synonyms:['manipulative','opportunistic'], antonyms:['fair','generous'] },
  { id:'vocab_011', wave:1, type:'vocabulary', word:'prestigious', definition:'Respected and admired; having high status', definitionSimple:'Famous and respected by everyone', exampleSentence:'She won a place at a prestigious school.', synonyms:['distinguished','renowned'], antonyms:['unknown','obscure'] },
  { id:'vocab_013', wave:1, type:'vocabulary', word:'perilous', definition:'Full of danger or risk', definitionSimple:'Very dangerous', exampleSentence:'The mountaineers faced a perilous climb.', synonyms:['dangerous','hazardous'], antonyms:['safe','secure'] },
  { id:'vocab_014', wave:1, type:'vocabulary', word:'boisterous', definition:'Noisy, energetic, and cheerful', definitionSimple:'Loud and full of energy', exampleSentence:'The boisterous children ran through the playground.', synonyms:['lively','rowdy'], antonyms:['quiet','calm'] },
  { id:'vocab_020', wave:1, type:'vocabulary', word:'apprehensive', definition:'Anxious or fearful about a future event', definitionSimple:'Worried about something that might happen', exampleSentence:'He felt apprehensive before the big match.', synonyms:['anxious','nervous'], antonyms:['confident','calm'] },
  { id:'vocab_029', wave:1, type:'vocabulary', word:'oppressive', definition:'Cruel, harsh, and controlling; also uncomfortably heavy', definitionSimple:'Very harsh and unfair, or so heavy it feels suffocating', exampleSentence:'The oppressive heat made it hard to breathe.', synonyms:['harsh','tyrannical'], antonyms:['gentle','fair'] },
  { id:'vocab_034', wave:1, type:'vocabulary', word:'foreboding', definition:'A strong feeling that something bad is about to happen', definitionSimple:'A scary feeling that something bad is coming', exampleSentence:'She had a sense of foreboding as she entered the dark house.', synonyms:['dread','premonition'], antonyms:['hope','optimism'] },
  { id:'vocab_042', wave:1, type:'vocabulary', word:'controversial', definition:'Causing strong disagreement or argument', definitionSimple:'Something that people strongly disagree about', exampleSentence:'The new rule was controversial among the students.', synonyms:['debatable','disputed'], antonyms:['uncontroversial','accepted'] },
  { id:'vocab_046', wave:1, type:'vocabulary', word:'unequivocal', definition:'Leaving no doubt; completely clear', definitionSimple:'Absolutely clear with no room for doubt', exampleSentence:'Her answer was unequivocal: "No."', synonyms:['clear','definite'], antonyms:['ambiguous','unclear'] },
  { id:'vocab_057', wave:1, type:'vocabulary', word:'compelling', definition:'Evoking strong interest or admiration; convincing', definitionSimple:'So interesting or convincing that you cannot look away or disagree', exampleSentence:'The film was so compelling she watched it twice.', synonyms:['gripping','persuasive'], antonyms:['boring','unconvincing'] },
  // Wave 2
  { id:'vocab_023', wave:2, type:'vocabulary', word:'absurd', definition:'Wildly unreasonable or illogical; ridiculous', definitionSimple:'So silly it makes no sense at all', exampleSentence:'It was absurd to wear a coat in summer heat.', synonyms:['ridiculous','preposterous'], antonyms:['reasonable','sensible'] },
  { id:'vocab_024', wave:2, type:'vocabulary', word:'nonsensical', definition:'Making no sense; absurd', definitionSimple:'Completely makes no sense', exampleSentence:'His nonsensical explanation confused everyone.', synonyms:['absurd','illogical'], antonyms:['sensible','logical'] },
  { id:'vocab_025', wave:2, type:'vocabulary', word:'infallible', definition:'Incapable of making mistakes; never wrong', definitionSimple:'Always right, never ever wrong', exampleSentence:'Nobody is infallible — everyone makes mistakes eventually.', synonyms:['faultless','perfect'], antonyms:['fallible','imperfect'] },
  { id:'vocab_027', wave:2, type:'vocabulary', word:'defiantly', definition:'In a way that boldly resists or challenges authority', definitionSimple:'In a way that shows you refuse to obey or back down', exampleSentence:'He defiantly refused to apologise.', synonyms:['boldly','rebelliously'], antonyms:['obediently','submissively'] },
  { id:'vocab_028', wave:2, type:'vocabulary', word:'eroded', definition:'Gradually worn away over time', definitionSimple:'Slowly worn away bit by bit', exampleSentence:'The cliffs had been eroded by the sea over centuries.', synonyms:['worn','deteriorated'], antonyms:['built','strengthened'] },
  { id:'vocab_030', wave:2, type:'vocabulary', word:'solitary', definition:'Done alone; existing alone without companions', definitionSimple:'Alone, by yourself, with nobody else', exampleSentence:'He preferred solitary walks in the woods.', synonyms:['alone','isolated'], antonyms:['social','accompanied'] },
  { id:'vocab_035', wave:2, type:'vocabulary', word:'supernatural', definition:'Beyond normal natural explanation; magical or ghostly', definitionSimple:'Things that science cannot explain, like ghosts or magic', exampleSentence:'The old house was said to have supernatural powers.', synonyms:['paranormal','unearthly'], antonyms:['natural','normal'] },
  { id:'vocab_039', wave:2, type:'vocabulary', word:'camaraderie', definition:'Mutual trust and friendship among people', definitionSimple:'The warm, friendly feeling between people in a group', exampleSentence:'There was great camaraderie among the team.', synonyms:['friendship','fellowship'], antonyms:['hostility','rivalry'] },
  { id:'vocab_040', wave:2, type:'vocabulary', word:'ingenuity', definition:'The quality of being clever, original, and inventive', definitionSimple:'Being really clever at finding creative solutions', exampleSentence:'The engineer solved the problem with great ingenuity.', synonyms:['cleverness','creativity'], antonyms:['stupidity','uncreative'] },
  { id:'vocab_041', wave:2, type:'vocabulary', word:'enduring', definition:'Lasting for a long time; continuing', definitionSimple:'Something that keeps going for a long time', exampleSentence:'Their enduring friendship lasted fifty years.', synonyms:['lasting','persistent'], antonyms:['brief','temporary'] },
  { id:'vocab_051', wave:2, type:'vocabulary', word:'analytical', definition:'Using careful, logical analysis to examine things', definitionSimple:'Thinking carefully and logically about things', exampleSentence:'She had an analytical mind and loved solving puzzles.', synonyms:['logical','methodical'], antonyms:['illogical','haphazard'] },
  { id:'vocab_054', wave:2, type:'vocabulary', word:'unrelenting', definition:'Never stopping or getting less intense', definitionSimple:'Never stopping, always continuing with full force', exampleSentence:'The unrelenting rain lasted all week.', synonyms:['relentless','persistent'], antonyms:['stopping','intermittent'] },
  { id:'vocab_062', wave:2, type:'vocabulary', word:'skeptical', definition:'Not easily convinced; having doubts', definitionSimple:'Not believing something easily, needing proof', exampleSentence:'She was skeptical about his excuse.', synonyms:['doubtful','unconvinced'], antonyms:['convinced','trusting'] },
  { id:'vocab_063', wave:2, type:'vocabulary', word:'agitated', definition:'Feeling troubled or nervous; anxious', definitionSimple:'Feeling nervous, worried, and unable to stay calm', exampleSentence:'The long wait made her increasingly agitated.', synonyms:['anxious','unsettled'], antonyms:['calm','relaxed'] },
  // Wave 3
  { id:'vocab_037', wave:3, type:'vocabulary', word:'practical', definition:'Concerned with real situations rather than theory', definitionSimple:'Useful in real life, not just in ideas', exampleSentence:'A raincoat is a practical choice for English weather.', synonyms:['useful','sensible'], antonyms:['impractical','theoretical'] },
  { id:'vocab_043', wave:3, type:'vocabulary', word:'garments', definition:'Pieces of clothing', definitionSimple:'Items of clothing', exampleSentence:'She packed her finest garments for the trip.', synonyms:['clothes','attire'], antonyms:[] },
  { id:'vocab_044', wave:3, type:'vocabulary', word:'accessible', definition:'Easy to reach, use, or understand', definitionSimple:'Easy to get to or use', exampleSentence:'The information was clearly written and accessible to all.', synonyms:['available','reachable'], antonyms:['inaccessible','unreachable'] },
  { id:'vocab_045', wave:3, type:'vocabulary', word:'logistics', definition:'The detailed planning and organisation of an activity', definitionSimple:'The practical planning and organisation of how to do something', exampleSentence:'Organising the school trip involved complex logistics.', synonyms:['organisation','planning'], antonyms:[] },
  { id:'vocab_047', wave:3, type:'vocabulary', word:'reconstructed', definition:'Built or created again after being damaged or destroyed', definitionSimple:'Built again after being destroyed', exampleSentence:'The ancient temple was carefully reconstructed.', synonyms:['rebuilt','restored'], antonyms:['demolished','destroyed'] },
  { id:'vocab_048', wave:3, type:'vocabulary', word:'optimistic', definition:'Hopeful and confident about the future', definitionSimple:'Believing good things will happen', exampleSentence:'She was optimistic about passing the exam.', synonyms:['hopeful','positive'], antonyms:['pessimistic','negative'] },
  { id:'vocab_049', wave:3, type:'vocabulary', word:'fowl', definition:'A bird, especially one kept for eggs or meat (e.g. chicken)', definitionSimple:'A bird like a chicken or duck', exampleSentence:'The farmer kept several different types of fowl.', synonyms:['bird','poultry'], antonyms:[] },
  { id:'vocab_050', wave:3, type:'vocabulary', word:'unassumingly', definition:'In a modest way, without drawing attention to oneself', definitionSimple:'In a quiet, modest way without showing off', exampleSentence:'He unassumingly helped clear the tables after dinner.', synonyms:['modestly','quietly'], antonyms:['arrogantly','boastfully'] },
  { id:'vocab_052', wave:3, type:'vocabulary', word:'financial', definition:'Relating to money and how it is managed', definitionSimple:'To do with money', exampleSentence:'He made a careful financial plan before spending.', synonyms:['monetary','economic'], antonyms:[] },
  { id:'vocab_053', wave:3, type:'vocabulary', word:'blunt', definition:'Direct and outspoken without being tactful; also not sharp', definitionSimple:'Saying things in a very direct way without being careful about feelings', exampleSentence:'His blunt comment hurt her feelings.', synonyms:['direct','frank'], antonyms:['tactful','diplomatic'] },
  { id:'vocab_055', wave:3, type:'vocabulary', word:'pressing', definition:'Requiring immediate attention; urgent', definitionSimple:'Something that needs to be done right now', exampleSentence:'There is a pressing need to fix the leaking roof.', synonyms:['urgent','critical'], antonyms:['unimportant','trivial'] },
  { id:'vocab_056', wave:3, type:'vocabulary', word:'neglected', definition:'Not given proper care or attention', definitionSimple:'Left without being looked after properly', exampleSentence:'The neglected garden was full of weeds.', synonyms:['abandoned','ignored'], antonyms:['cared for','tended'] },
  { id:'vocab_059', wave:3, type:'vocabulary', word:'dismally', definition:'In a way that is very bad or unsuccessful', definitionSimple:'Really badly, in a sad and disappointing way', exampleSentence:'He dismally failed the test after not revising.', synonyms:['poorly','terribly'], antonyms:['brilliantly','successfully'] },
  { id:'vocab_060', wave:3, type:'vocabulary', word:'luscious', definition:'Richly pleasing to the taste or senses', definitionSimple:'Deliciously rich and tasty', exampleSentence:'The luscious strawberries were perfectly ripe.', synonyms:['delicious','rich'], antonyms:['bland','unpleasant'] },
  // Wave 4
  { id:'vocab_002', wave:4, type:'vocabulary', word:'unconvinced', definition:'Not persuaded or certain about something', definitionSimple:'When you still have doubts and are not sure', exampleSentence:'He remained unconvinced by the argument.', synonyms:['doubtful','skeptical'], antonyms:['convinced','certain'] },
  { id:'vocab_003', wave:4, type:'vocabulary', word:'variable', definition:'Likely to change; not staying the same', definitionSimple:'Something that keeps changing', exampleSentence:'The weather in England is very variable.', synonyms:['changeable','inconsistent'], antonyms:['constant','stable'] },
  { id:'vocab_004', wave:4, type:'vocabulary', word:'unreliable', definition:'Cannot be trusted or depended on', definitionSimple:'Something you cannot count on', exampleSentence:'The old car was unreliable and often broke down.', synonyms:['untrustworthy','inconsistent'], antonyms:['reliable','dependable'] },
  { id:'vocab_005', wave:4, type:'vocabulary', word:'pending', definition:'Waiting to be decided or dealt with', definitionSimple:'Something not finished yet, still waiting', exampleSentence:'The decision is still pending.', synonyms:['awaiting','unresolved'], antonyms:['resolved','decided'] },
  { id:'vocab_006', wave:4, type:'vocabulary', word:'indecisive', definition:'Unable to make decisions quickly or clearly', definitionSimple:'When you cannot make up your mind', exampleSentence:'She was indecisive about which book to choose.', synonyms:['hesitant','uncertain'], antonyms:['decisive','resolute'] },
  { id:'vocab_012', wave:4, type:'vocabulary', word:'unbeknownst', definition:'Without the knowledge of someone', definitionSimple:'Without someone knowing about it', exampleSentence:'Unbeknownst to him, a surprise party was being planned.', synonyms:['unknown','secretly'], antonyms:[] },
  { id:'vocab_019', wave:4, type:'vocabulary', word:'intrigued', definition:'Very curious and interested', definitionSimple:'Really curious and wanting to find out more', exampleSentence:'She was intrigued by the mysterious package.', synonyms:['fascinated','curious'], antonyms:['bored','indifferent'] },
  { id:'vocab_021', wave:4, type:'vocabulary', word:'sorrow', definition:'A feeling of deep sadness or distress', definitionSimple:'Very deep sadness', exampleSentence:'She felt great sorrow when her dog died.', synonyms:['grief','sadness'], antonyms:['joy','happiness'] },
  { id:'vocab_038', wave:4, type:'vocabulary', word:'confections', definition:'Elaborately decorated sweet foods or cakes', definitionSimple:'Fancy sweets, chocolates, or decorated cakes', exampleSentence:'The bakery window was full of beautiful confections.', synonyms:['sweets','delicacies'], antonyms:[] },
  { id:'vocab_058', wave:4, type:'vocabulary', word:'urgent', definition:'Requiring immediate action or attention', definitionSimple:'Needs to happen right now', exampleSentence:'There was an urgent message waiting for him.', synonyms:['pressing','critical'], antonyms:['unimportant','leisurely'] },
  { id:'vocab_061', wave:4, type:'vocabulary', word:'overlooked', definition:'Failed to notice or consider; also to look over from above', definitionSimple:'Not noticed or missed out accidentally', exampleSentence:'An important clue had been overlooked by the detective.', synonyms:['missed','ignored'], antonyms:['noticed','identified'] },
  { id:'vocab_064', wave:4, type:'vocabulary', word:'proponent', definition:'A person who supports or argues for something', definitionSimple:'Someone who strongly supports an idea', exampleSentence:'She was a strong proponent of healthy eating.', synonyms:['supporter','advocate'], antonyms:['opponent','critic'] },
  { id:'vocab_069', wave:4, type:'vocabulary', word:'fund', definition:'A sum of money for a specific purpose', definitionSimple:'Money saved or collected for a special reason', exampleSentence:'They set up a fund to help the flood victims.', synonyms:['reserve','pool'], antonyms:[] },
  // Wave 5
  { id:'vocab_015', wave:5, type:'vocabulary', word:'inference', definition:'A conclusion reached by reasoning from evidence', definitionSimple:'Working out something that is not directly said', exampleSentence:'From the clues, the detective made an inference.', synonyms:['deduction','conclusion'], antonyms:[] },
  { id:'vocab_016', wave:5, type:'vocabulary', word:'enhance', definition:'To improve the quality or value of something', definitionSimple:'To make something better', exampleSentence:'The lighting enhanced the beauty of the room.', synonyms:['improve','boost'], antonyms:['worsen','diminish'] },
  { id:'vocab_017', wave:5, type:'vocabulary', word:'impact', definition:'A strong effect or influence on something', definitionSimple:'A big effect on something', exampleSentence:'The storm had a huge impact on the town.', synonyms:['effect','influence'], antonyms:[] },
  { id:'vocab_018', wave:5, type:'vocabulary', word:'fable', definition:'A short story with a moral lesson, often with animal characters', definitionSimple:'A short story that teaches you something, often with animals', exampleSentence:"Aesop's fable about the tortoise and the hare teaches us about patience.", synonyms:['parable','tale'], antonyms:[] },
  { id:'vocab_022', wave:5, type:'vocabulary', word:'gratification', definition:'Pleasure gained from getting what you wanted', definitionSimple:'The good feeling you get when something you wanted happens', exampleSentence:'Finishing the puzzle gave him great gratification.', synonyms:['satisfaction','pleasure'], antonyms:['disappointment','frustration'] },
  { id:'vocab_026', wave:5, type:'vocabulary', word:'trudged', definition:'Walked slowly and heavily, as if very tired', definitionSimple:'Walked in a slow, tired, heavy way', exampleSentence:'She trudged home through the snow.', synonyms:['plodded','dragged'], antonyms:['sprinted','dashed'] },
  { id:'vocab_031', wave:5, type:'vocabulary', word:'pity', definition:"A feeling of sorrow for someone else's misfortune", definitionSimple:'Feeling sad because something bad happened to someone else', exampleSentence:'She felt pity for the stray cat in the rain.', synonyms:['sympathy','compassion'], antonyms:['indifference','cruelty'] },
  { id:'vocab_032', wave:5, type:'vocabulary', word:'resonate', definition:'To have a strong effect or meaning for someone', definitionSimple:'When something connects with you and feels meaningful', exampleSentence:'The story resonated with everyone in the room.', synonyms:['connect','strike a chord'], antonyms:[] },
  { id:'vocab_033', wave:5, type:'vocabulary', word:'obnoxiously', definition:'In an extremely unpleasant or annoying way', definitionSimple:'In a way that is really annoying and hard to ignore', exampleSentence:'He laughed obnoxiously during the film.', synonyms:['annoyingly','offensively'], antonyms:['pleasantly','politely'] },
  { id:'vocab_036', wave:5, type:'vocabulary', word:'unvaried', definition:'Lacking variety; always the same', definitionSimple:'Always exactly the same, boring and repetitive', exampleSentence:'The unvaried menu made mealtimes dull.', synonyms:['monotonous','repetitive'], antonyms:['varied','diverse'] },
  { id:'vocab_065', wave:5, type:'vocabulary', word:'enlighten', definition:'To give someone greater knowledge or understanding', definitionSimple:'To help someone understand something better', exampleSentence:'The documentary enlightened viewers about climate change.', synonyms:['inform','educate'], antonyms:['confuse','mislead'] },
  { id:'vocab_066', wave:5, type:'vocabulary', word:'mirth', definition:'Amusement or laughter', definitionSimple:'Happy laughter and amusement', exampleSentence:'The comedy show was a source of great mirth.', synonyms:['laughter','merriment'], antonyms:['sorrow','sadness'] },
  { id:'vocab_067', wave:5, type:'vocabulary', word:'laddered', definition:'Having a run or ladder in (a stocking or tights)', definitionSimple:'When tights or stockings get a long rip in them', exampleSentence:'She noticed her tights were laddered before the performance.', synonyms:['torn','ripped'], antonyms:[] },
  { id:'vocab_068', wave:5, type:'vocabulary', word:'propose', definition:'To put forward an idea or plan for consideration', definitionSimple:'To suggest an idea for others to think about', exampleSentence:'She proposed a new way to organise the classroom.', synonyms:['suggest','recommend'], antonyms:['oppose','reject'] },
  { id:'vocab_070', wave:5, type:'vocabulary', word:'household', definition:'Relating to the home and the people in it', definitionSimple:'To do with your home and family', exampleSentence:'Washing up is a common household chore.', synonyms:['domestic','home'], antonyms:[] },
  // Report 2026-03-28
  { id:'vocab_071', wave:1, type:'vocabulary', word:'edible', definition:'Safe and suitable for eating', definitionSimple:'Something you can eat without getting sick', exampleSentence:'Not all wild berries are edible.', synonyms:['eatable','palatable'], antonyms:['inedible','poisonous'] },
  { id:'vocab_072', wave:1, type:'vocabulary', word:'resurgence', definition:'A revival or renewed occurrence of something after a period of decline', definitionSimple:'When something that disappeared comes back and gets popular again', exampleSentence:'There has been a resurgence of interest in vinyl records.', synonyms:['revival','comeback'], antonyms:['decline','disappearance'] },
  { id:'vocab_073', wave:1, type:'vocabulary', word:'improvise', definition:'To create or perform something spontaneously without preparation', definitionSimple:'To make something up on the spot because you have no plan', exampleSentence:'The actor forgot his lines and had to improvise.', synonyms:['ad-lib','extemporise'], antonyms:['prepare','rehearse'] },
  { id:'vocab_074', wave:1, type:'vocabulary', word:'constructive', definition:'Serving a useful purpose; intended to be helpful', definitionSimple:'Helpful advice that makes things better instead of just saying something is bad', exampleSentence:'The teacher gave constructive feedback on the essay.', synonyms:['helpful','productive'], antonyms:['destructive','unhelpful'] },
  { id:'vocab_075', wave:1, type:'vocabulary', word:'malevolent', definition:'Having or showing a wish to do evil to others', definitionSimple:'Wanting bad things to happen to other people — like a villain', exampleSentence:'The malevolent witch cast a terrible curse on the village.', synonyms:['malicious','spiteful'], antonyms:['benevolent','kind'] },
  { id:'vocab_076', wave:1, type:'vocabulary', word:'benevolent', definition:'Kind, generous, and well-meaning', definitionSimple:'Kind and wanting to do good things for others', exampleSentence:'The benevolent stranger donated money to the homeless shelter.', synonyms:['kind','generous'], antonyms:['malevolent','cruel'] },
  { id:'vocab_077', wave:1, type:'vocabulary', word:'credulous', definition:'Too ready to believe things; easily deceived', definitionSimple:'Being so trusting that you believe anything anyone tells you, even silly things', exampleSentence:'The credulous child believed everything the magician said.', synonyms:['gullible','naive'], antonyms:['sceptical','suspicious'] },
  { id:'vocab_078', wave:1, type:'vocabulary', word:'malign', definition:'To speak about someone in a spiteful and critical way', definitionSimple:'To say mean or untrue things about someone to make them look bad', exampleSentence:'He tried to malign his rival by spreading false rumours.', synonyms:['slander','defame'], antonyms:['praise','commend'] },
  { id:'vocab_079', wave:1, type:'vocabulary', word:'foment', definition:'To instigate or stir up trouble or rebellion', definitionSimple:'To stir the pot and try to start trouble or arguments', exampleSentence:'The troublemaker tried to foment a rebellion among the students.', synonyms:['provoke','incite'], antonyms:['suppress','quell'] },
  { id:'vocab_080', wave:1, type:'vocabulary', word:'cave in', definition:'To finally yield or surrender after resisting; also, to collapse inward', definitionSimple:'To finally give up and say yes after saying no for a long time', exampleSentence:'After hours of begging, Mum finally caved in and let us get a puppy.', synonyms:['yield','surrender'], antonyms:['resist','stand firm'] },
  { id:'vocab_081', wave:1, type:'vocabulary', word:'liaison', definition:'A person who serves as a link between groups to help them communicate and work together', definitionSimple:'A person whose job is to help two different groups talk to each other', exampleSentence:'She worked as a liaison between the school and the parents.', synonyms:['intermediary','go-between'], antonyms:[] },
  { id:'vocab_082', wave:1, type:'vocabulary', word:'know by heart', definition:'To have memorised something so thoroughly that it can be recalled without any aids', definitionSimple:'To know something so well you can say it without looking at any notes', exampleSentence:'She knew the poem by heart and recited it perfectly.', synonyms:['memorise','learn off by heart'], antonyms:['forget'] },
  { id:'vocab_083', wave:1, type:'vocabulary', word:'bewitching', definition:'Enchantingly beautiful or attractive', definitionSimple:'So beautiful or interesting that you feel like you are under a magic spell', exampleSentence:'The bewitching sunset painted the sky in shades of orange and pink.', synonyms:['enchanting','captivating'], antonyms:['repulsive','unattractive'] },
  { id:'vocab_084', wave:1, type:'vocabulary', word:'flattery', definition:'Excessive or insincere praise, often given to gain an advantage', definitionSimple:'Giving someone lots of compliments because you want them to like you or do something for you', exampleSentence:'He used flattery to try to get a better mark from the teacher.', synonyms:['compliments','sweet talk'], antonyms:['criticism','insult'] },
  { id:'vocab_085', wave:1, type:'vocabulary', word:'reside', definition:'To live in a particular place', definitionSimple:'To live somewhere', exampleSentence:'They reside in a small cottage by the sea.', synonyms:['live','dwell'], antonyms:['depart','leave'] },
  { id:'vocab_086', wave:1, type:'vocabulary', word:'blistering', definition:'Extremely hot; scorching', definitionSimple:'So hot it feels like it could burn you', exampleSentence:'They stayed indoors during the blistering afternoon heat.', synonyms:['scorching','sweltering'], antonyms:['freezing','chilly'] },
  { id:'vocab_087', wave:1, type:'vocabulary', word:'prosaic', definition:'Lacking imaginativeness or originality; dull', definitionSimple:'Boring and ordinary, with no imagination', exampleSentence:'His prosaic essay failed to capture the excitement of the adventure.', synonyms:['dull','unimaginative'], antonyms:['imaginative','creative'] },
  { id:'vocab_088', wave:1, type:'vocabulary', word:'ruthless', definition:'Having or showing no pity or compassion for others', definitionSimple:'Not caring at all about hurting others to get what you want', exampleSentence:'The ruthless pirate showed no mercy to his captives.', synonyms:['merciless','cruel'], antonyms:['merciful','compassionate'] },
]

export const literaryDeviceCards = [
  // Wave 1
  { id:'lit_001', wave:1, type:'literary_device', term:'Simile', definition:"Comparing two things using 'like' or 'as'", example:'Her eyes were like stars in the night sky.', confusableWith:['Metaphor'] },
  { id:'lit_002', wave:1, type:'literary_device', term:'Metaphor', definition:'Describing something as if it actually is something else (without using like or as)', example:'The classroom was a zoo after lunch.', confusableWith:['Simile'] },
  { id:'lit_003', wave:1, type:'literary_device', term:'Personification', definition:'Giving human feelings or actions to non-human things', example:'The wind whispered through the trees.', confusableWith:['Metaphor'] },
  // Wave 2
  { id:'lit_004', wave:2, type:'literary_device', term:'Hyperbole', definition:'Extreme exaggeration used for effect', example:"I've told you a million times!", confusableWith:[] },
  { id:'lit_005', wave:2, type:'literary_device', term:'Onomatopoeia', definition:'A word that sounds like what it describes', example:'The bees buzzed around the flower.', confusableWith:[] },
  { id:'lit_007', wave:2, type:'literary_device', term:'Juxtaposition', definition:'Placing two contrasting things close together to highlight the difference', example:'It was the best of times, it was the worst of times.', confusableWith:[] },
  // Wave 3
  { id:'lit_008', wave:3, type:'literary_device', term:'Repetition', definition:'Deliberately repeating a word or phrase for emphasis', example:'We shall fight on the beaches, we shall fight on the landing grounds.', confusableWith:[] },
  { id:'lit_009', wave:3, type:'literary_device', term:'Analogy', definition:'Explaining something by comparing it to something more familiar', example:'The brain is like a computer — it processes information.', confusableWith:['Simile','Metaphor'] },
  { id:'lit_013', wave:3, type:'literary_device', term:'Rhyme Scheme', definition:"The pattern of rhymes at the end of lines in a poem, shown with letters (e.g. ABAB, AABB)", example:"'Roses are red (A), violets are blue (B), sugar is sweet (A), and so are you (B)' — ABAB", confusableWith:[] },
  // Wave 4
  { id:'lit_011', wave:4, type:'literary_device', term:'Consonance', definition:'Repetition of consonant sounds within or at the end of words', example:'The black silk slacks were slick.', confusableWith:['Alliteration'] },
  { id:'lit_012', wave:4, type:'literary_device', term:'Fable', definition:'A short story, often featuring animal characters, that teaches a moral lesson', example:'The Tortoise and the Hare teaches us that slow and steady wins the race.', confusableWith:[] },
  // Wave 5
  { id:'lit_006', wave:5, type:'literary_device', term:'Alliteration', definition:'Repetition of the same consonant sound at the start of nearby words', example:'Peter Piper picked a peck of pickled peppers.', confusableWith:['Consonance'] },
  { id:'lit_010', wave:5, type:'literary_device', term:'Idiom', definition:'A phrase whose meaning is different from the literal words', example:"It's raining cats and dogs.", confusableWith:[] },
  { id:'lit_014', wave:5, type:'literary_device', term:'Literary Device Review', definition:'A technique used by a writer to convey meaning, create effect, or engage the reader', example:'"The angry clouds growled overhead." — identify the device (Personification)', confusableWith:[] },
]

export const grammarCards = [
  // Wave 1 — Parts of speech
  { id:'gram_024', wave:1, type:'grammar', subtype:'term', term:'Noun', definition:'A word that names a person, place, thing, or idea', examples:['teacher','London','happiness'] },
  { id:'gram_025', wave:1, type:'grammar', subtype:'term', term:'Verb', definition:'A word that expresses an action or state of being', examples:['run','think','is'] },
  { id:'gram_026', wave:1, type:'grammar', subtype:'term', term:'Adjective', definition:'A word that describes or modifies a noun', examples:['tall','blue','clever'] },
  { id:'gram_027', wave:1, type:'grammar', subtype:'term', term:'Adverb', definition:'A word that modifies a verb, adjective, or another adverb', examples:['quickly','very','often'] },
  // Wave 2 — Common suffixes
  { id:'gram_001', wave:2, type:'grammar', subtype:'suffix', suffix:'-ness', partOfSpeech:'Noun', examples:['happiness','darkness','kindness'] },
  { id:'gram_003', wave:2, type:'grammar', subtype:'suffix', suffix:'-ment', partOfSpeech:'Noun', examples:['enjoyment','movement','excitement'] },
  { id:'gram_008', wave:2, type:'grammar', subtype:'suffix', suffix:'-ify', partOfSpeech:'Verb', examples:['clarify','identify','simplify'] },
  { id:'gram_009', wave:2, type:'grammar', subtype:'suffix', suffix:'-ise/-ize', partOfSpeech:'Verb', examples:['organise','realise','recognise'] },
  { id:'gram_012', wave:2, type:'grammar', subtype:'suffix', suffix:'-ful', partOfSpeech:'Adjective', examples:['helpful','careful','powerful'] },
  { id:'gram_013', wave:2, type:'grammar', subtype:'suffix', suffix:'-less', partOfSpeech:'Adjective', examples:['hopeless','careless','useless'] },
  { id:'gram_018', wave:2, type:'grammar', subtype:'suffix', suffix:'-ly', partOfSpeech:'Adverb', examples:['quickly','carefully','happily'] },
  // Wave 3 — More suffixes
  { id:'gram_007', wave:3, type:'grammar', subtype:'suffix', suffix:'-ate', partOfSpeech:'Verb', examples:['create','educate','celebrate'] },
  { id:'gram_010', wave:3, type:'grammar', subtype:'suffix', suffix:'-en', partOfSpeech:'Verb', examples:['brighten','tighten','widen'] },
  { id:'gram_014', wave:3, type:'grammar', subtype:'suffix', suffix:'-able/-ible', partOfSpeech:'Adjective', examples:['readable','comfortable','possible'] },
  { id:'gram_015', wave:3, type:'grammar', subtype:'suffix', suffix:'-al', partOfSpeech:'Adjective', examples:['musical','logical','natural'] },
  { id:'gram_016', wave:3, type:'grammar', subtype:'suffix', suffix:'-ive', partOfSpeech:'Adjective', examples:['creative','active','positive'] },
  { id:'gram_017', wave:3, type:'grammar', subtype:'suffix', suffix:'-ish', partOfSpeech:'Adjective', examples:['childish','reddish','foolish'] },
  // Wave 4 — Homo- terms, pronoun, preposition, -ship
  { id:'gram_021', wave:4, type:'grammar', subtype:'term', term:'Homophone', definition:'Words that sound the same but have different spellings and meanings', examples:["there/their/they're","to/too/two"] },
  { id:'gram_022', wave:4, type:'grammar', subtype:'term', term:'Homonym', definition:'Words that are spelled and sound the same but have different meanings', examples:['bat (animal / cricket bat)','bank (river bank / money bank)'] },
  { id:'gram_023', wave:4, type:'grammar', subtype:'term', term:'Homograph', definition:'Words spelled the same but with different sounds and meanings', examples:['lead (the metal) / lead (to guide)','tear (to cry) / tear (to rip)'] },
  { id:'gram_028', wave:4, type:'grammar', subtype:'term', term:'Pronoun', definition:'A word used in place of a noun', examples:['he','she','they','it'] },
  { id:'gram_029', wave:4, type:'grammar', subtype:'term', term:'Preposition', definition:'A word that shows the position or relationship between things', examples:['in','on','under','between','through'] },
  { id:'gram_005', wave:4, type:'grammar', subtype:'suffix', suffix:'-ship', partOfSpeech:'Noun', examples:['friendship','leadership','relationship'] },
  // Wave 5 — Final suffixes
  { id:'gram_002', wave:5, type:'grammar', subtype:'suffix', suffix:'-ity', partOfSpeech:'Noun', examples:['creativity','ability','reality'] },
  { id:'gram_004', wave:5, type:'grammar', subtype:'suffix', suffix:'-tion', partOfSpeech:'Noun', examples:['information','education','celebration'] },
  { id:'gram_006', wave:5, type:'grammar', subtype:'suffix', suffix:'-ance/-ence', partOfSpeech:'Noun', examples:['performance','confidence','patience'] },
  { id:'gram_011', wave:5, type:'grammar', subtype:'suffix', suffix:'-ous', partOfSpeech:'Adjective', examples:['joyous','famous','dangerous'] },
  { id:'gram_019', wave:5, type:'grammar', subtype:'suffix', suffix:'-wise', partOfSpeech:'Adverb', examples:['likewise','clockwise','otherwise'] },
  { id:'gram_020', wave:5, type:'grammar', subtype:'suffix', suffix:'-ward(s)', partOfSpeech:'Adverb', examples:['forwards','backwards','upwards'] },
]

export const mathsTechniqueCards = [
  // Wave 1
  { id:'math_001', wave:1, type:'maths_technique', question:'How do you find a percentage of a number?', method:'Find 10% (÷10), find 1% (÷100), then build the percentage you need from those parts', steps:['Find 10% by dividing by 10','Find 1% by dividing by 100','Combine to get the percentage you need'], example:'35% of 200: 10%=20, so 30%=60; 5%=10; 35%=70' },
  { id:'math_008', wave:1, type:'maths_technique', question:'What is the sum and difference method?', method:'Add the two equations to find 2A, then divide by 2 to find A; subtract equations to find 2B, then divide by 2 to find B', steps:['Add both equations: (A+B)+(A-B)=2A','Divide by 2 to find A','Subtract equations: (A+B)-(A-B)=2B','Divide by 2 to find B'], example:'A+B=12, A-B=4. Adding: 2A=16, A=8. Subtracting: 2B=8, B=4.' },
  // Wave 2
  { id:'math_002', wave:2, type:'maths_technique', question:'How do you check a division answer?', method:'Multiply your answer by the divisor — the result should equal the original number (plus the remainder if there is one)', steps:['Multiply answer × divisor','Add remainder if there is one','Check it equals the original number'], example:'23 ÷ 4 = 5 r 3. Check: 5×4=20, 20+3=23 ✓' },
  { id:'math_006', wave:2, type:'maths_technique', question:'How do you compare decimals using place value?', method:'Line up the decimal points, compare digit by digit from left to right', steps:['Line up the decimal points','Compare the digits in each column from left to right','The first column where they differ determines which is larger'], example:'0.75 vs 0.8: tenths column — 7 vs 8 — so 0.8 is larger' },
  { id:'math_009', wave:2, type:'maths_technique', question:'How do you find a point on a number line?', method:'Count the intervals, find the difference between endpoints, divide to get the step value, then count from the start', steps:['Count the total number of intervals between endpoints','Find the difference between start and end values','Divide the difference by number of intervals to get step size','Count intervals from the start to your point and multiply by step size'], example:'Number line from 0 to 50 with 5 intervals: each step = 10. Point at 3rd mark = 30.' },
  // Wave 3
  { id:'math_003', wave:3, type:'maths_technique', question:'How do you write a remainder as a fraction?', method:'Put the remainder over the divisor', steps:['Find the remainder','Write remainder ÷ divisor as a fraction','Simplify if possible'], example:'23 ÷ 4 = 5 remainder 3 → 5 and 3/4' },
  { id:'math_007', wave:3, type:'maths_technique', question:'How do you do long division?', method:'Divide, Multiply, Subtract, Bring down — repeat', steps:['Divide: how many times does the divisor go into the current number?','Multiply: write the result','Subtract: find the remainder','Bring down: bring the next digit down and repeat'], example:'156 ÷ 4: 4 into 15 = 3 r3, bring down 6 → 36 ÷ 4 = 9. Answer: 39' },
  // Wave 4
  { id:'math_004', wave:4, type:'maths_technique', question:'How do you find the area of a rectangle?', method:'Multiply length × width', steps:['Identify the length','Identify the width','Multiply them together'], example:'Rectangle 8cm × 5cm: area = 40cm²' },
  // Wave 5
  { id:'math_005', wave:5, type:'maths_technique', question:'How do you work with ratios?', method:'Find the value of one part by dividing the total by the number of parts, then multiply for each share', steps:['Add up all the parts of the ratio','Divide the total by this number to find one part','Multiply one part by each ratio number'], example:'Ratio 3:2, total=25. One part=25÷5=5. Shares: 3×5=15 and 2×5=10' },
]

export const strategyCards = [
  // Wave 1
  { id:'test_001', wave:1, type:'strategy', question:'What colour is Pikachu?', answer:'Yellow', options:['Yellow','Red','Blue','Green'] },
  { id:'strat_001', wave:1, type:'strategy', question:'What is the Process of Elimination technique?', answer:'Read all options, cross out clearly wrong ones, then choose from what remains', options:['Read all options, cross out clearly wrong ones, then choose from what remains','Pick the longest answer','Choose the first one that seems right','Skip and come back later'] },
  { id:'strat_002', wave:1, type:'strategy', question:'What should you do BEFORE answering comprehension questions?', answer:'Read the entire passage first, then read the questions', options:['Read the questions first to know what to look for','Read the passage and questions at the same time','Answer what you can remember without re-reading','Read the entire passage first, then read the questions'] },
  // Wave 2
  { id:'strat_003', wave:2, type:'strategy', question:'How do you find evidence to support a comprehension answer?', answer:'Go back to the passage and underline or note the exact words that support your answer', options:['Underline evidence in the passage text','Write down what you remember','Make an inference without checking','Use your general knowledge','Go back to the passage and underline or note the exact words that support your answer'] },
  // Wave 3
  { id:'strat_004', wave:3, type:'strategy', question:'What should you do before selecting a final answer?', answer:'Re-read the question carefully to make sure you are answering exactly what was asked', options:['Re-read the question carefully to make sure you are answering exactly what was asked','Pick the answer you chose first','Choose the most interesting option','Look for the longest answer'] },
  { id:'strat_005', wave:3, type:'strategy', question:'How should you use spare time at the end of an exam?', answer:'Return to the 3 questions you felt least confident about and check your answers', options:['Return to the 3 questions you felt least confident about and check your answers','Read the passage again from the start','Change all your answers','Skip straight to the end'] },
]

export const arithmeticCards = [
  // Wave 1 — Fraction/Percent (7)
  { id:'arith_f01', wave:1, type:'arithmetic', question:'1/2 as a percentage = ?', answer:50, explanation:'1/2 = 0.5 = 50%' },
  { id:'arith_f02', wave:1, type:'arithmetic', question:'1/4 as a percentage = ?', answer:25, explanation:'1/4 = 0.25 = 25%' },
  { id:'arith_f03', wave:1, type:'arithmetic', question:'3/4 as a percentage = ?', answer:75, explanation:'3/4 = 0.75 = 75%' },
  { id:'arith_f04', wave:1, type:'arithmetic', question:'1/5 as a percentage = ?', answer:20, explanation:'1/5 = 0.2 = 20%' },
  { id:'arith_f05', wave:1, type:'arithmetic', question:'1/10 as a percentage = ?', answer:10, explanation:'1/10 = 0.1 = 10%' },
  { id:'arith_f06', wave:1, type:'arithmetic', question:'2/5 as a percentage = ?', answer:40, explanation:'2/5 = 0.4 = 40%' },
  { id:'arith_f07', wave:1, type:'arithmetic', question:'3/5 as a percentage = ?', answer:60, explanation:'3/5 = 0.6 = 60%' },
  // Wave 1 — Percentage calcs (8)
  { id:'arith_p01', wave:1, type:'arithmetic', question:'10% of 200 = ?', answer:20 },
  { id:'arith_p02', wave:1, type:'arithmetic', question:'25% of 80 = ?', answer:20 },
  { id:'arith_p03', wave:1, type:'arithmetic', question:'50% of 90 = ?', answer:45 },
  { id:'arith_p04', wave:1, type:'arithmetic', question:'15% of 200 = ?', answer:30 },
  { id:'arith_p05', wave:1, type:'arithmetic', question:'10% of 350 = ?', answer:35 },
  { id:'arith_p06', wave:1, type:'arithmetic', question:'25% of 120 = ?', answer:30 },
  { id:'arith_p07', wave:1, type:'arithmetic', question:'50% of 66 = ?', answer:33 },
  { id:'arith_p08', wave:1, type:'arithmetic', question:'10% of 45 = ?', answer:4.5 },
  // Wave 2 — Fraction/Percent (6)
  { id:'arith_f08', wave:2, type:'arithmetic', question:'1/8 as a percentage = ?', answer:12.5, explanation:'1/8 = 0.125 = 12.5%' },
  { id:'arith_f09', wave:2, type:'arithmetic', question:'3/8 as a percentage = ?', answer:37.5, explanation:'3/8 = 0.375 = 37.5%' },
  { id:'arith_f10', wave:2, type:'arithmetic', question:'5/8 as a percentage = ?', answer:62.5, explanation:'5/8 = 0.625 = 62.5%' },
  { id:'arith_f11', wave:2, type:'arithmetic', question:'7/8 as a percentage = ?', answer:87.5, explanation:'7/8 = 0.875 = 87.5%' },
  { id:'arith_f12', wave:2, type:'arithmetic', question:'1/3 as a percentage (to 1dp) = ?', answer:33.3, explanation:'1/3 = 0.333... ≈ 33.3%' },
  { id:'arith_f13', wave:2, type:'arithmetic', question:'2/3 as a percentage (to 1dp) = ?', answer:66.7, explanation:'2/3 = 0.667... ≈ 66.7%' },
  // Wave 2 — Percentage calcs (8)
  { id:'arith_p09', wave:2, type:'arithmetic', question:'5% of 240 = ?', answer:12 },
  { id:'arith_p10', wave:2, type:'arithmetic', question:'15% of 60 = ?', answer:9 },
  { id:'arith_p11', wave:2, type:'arithmetic', question:'30% of 150 = ?', answer:45 },
  { id:'arith_p12', wave:2, type:'arithmetic', question:'35% of 200 = ?', answer:70 },
  { id:'arith_p13', wave:2, type:'arithmetic', question:'75% of 120 = ?', answer:90 },
  { id:'arith_p14', wave:2, type:'arithmetic', question:'20% of 85 = ?', answer:17 },
  { id:'arith_p15', wave:2, type:'arithmetic', question:'5% of 180 = ?', answer:9 },
  { id:'arith_p16', wave:2, type:'arithmetic', question:'15% of 340 = ?', answer:51 },
  // Wave 3 — Fraction/Percent (5)
  { id:'arith_f14', wave:3, type:'arithmetic', question:'1/6 as a percentage (to 1dp) = ?', answer:16.7, explanation:'1/6 = 0.1666... ≈ 16.7%' },
  { id:'arith_f15', wave:3, type:'arithmetic', question:'5/6 as a percentage (to 1dp) = ?', answer:83.3, explanation:'5/6 = 0.8333... ≈ 83.3%' },
  { id:'arith_f16', wave:3, type:'arithmetic', question:'3/10 as a percentage = ?', answer:30, explanation:'3/10 = 0.3 = 30%' },
  { id:'arith_f17', wave:3, type:'arithmetic', question:'7/10 as a percentage = ?', answer:70, explanation:'7/10 = 0.7 = 70%' },
  { id:'arith_f18', wave:3, type:'arithmetic', question:'9/10 as a percentage = ?', answer:90, explanation:'9/10 = 0.9 = 90%' },
  // Wave 3 — Percentage calcs (8)
  { id:'arith_p17', wave:3, type:'arithmetic', question:'40% of 90 = ?', answer:36 },
  { id:'arith_p18', wave:3, type:'arithmetic', question:'12% of 300 = ?', answer:36 },
  { id:'arith_p19', wave:3, type:'arithmetic', question:'60% of 35 = ?', answer:21 },
  { id:'arith_p20', wave:3, type:'arithmetic', question:'45% of 200 = ?', answer:90 },
  { id:'arith_p21', wave:3, type:'arithmetic', question:'85% of 40 = ?', answer:34 },
  { id:'arith_p22', wave:3, type:'arithmetic', question:'20% of 55 = ?', answer:11 },
  { id:'arith_p23', wave:3, type:'arithmetic', question:'35% of 80 = ?', answer:28 },
  { id:'arith_p24', wave:3, type:'arithmetic', question:'15% of 120 = ?', answer:18 },
  // Wave 4 — Fraction/Percent (7)
  { id:'arith_f19', wave:4, type:'arithmetic', question:'1/20 as a percentage = ?', answer:5, explanation:'1/20 = 0.05 = 5%' },
  { id:'arith_f20', wave:4, type:'arithmetic', question:'3/20 as a percentage = ?', answer:15, explanation:'3/20 = 0.15 = 15%' },
  { id:'arith_f21', wave:4, type:'arithmetic', question:'7/20 as a percentage = ?', answer:35, explanation:'7/20 = 0.35 = 35%' },
  { id:'arith_f22', wave:4, type:'arithmetic', question:'9/20 as a percentage = ?', answer:45, explanation:'9/20 = 0.45 = 45%' },
  { id:'arith_f23', wave:4, type:'arithmetic', question:'11/20 as a percentage = ?', answer:55, explanation:'11/20 = 0.55 = 55%' },
  { id:'arith_f24', wave:4, type:'arithmetic', question:'13/20 as a percentage = ?', answer:65, explanation:'13/20 = 0.65 = 65%' },
  { id:'arith_f25', wave:4, type:'arithmetic', question:'17/20 as a percentage = ?', answer:85, explanation:'17/20 = 0.85 = 85%' },
  // Wave 4 — Percentage calcs (10)
  { id:'arith_p25', wave:4, type:'arithmetic', question:'17.5% of 200 = ?', answer:35 },
  { id:'arith_p26', wave:4, type:'arithmetic', question:'22% of 50 = ?', answer:11 },
  { id:'arith_p27', wave:4, type:'arithmetic', question:'65% of 40 = ?', answer:26 },
  { id:'arith_p28', wave:4, type:'arithmetic', question:'90% of 70 = ?', answer:63 },
  { id:'arith_p29', wave:4, type:'arithmetic', question:'55% of 200 = ?', answer:110 },
  { id:'arith_p30', wave:4, type:'arithmetic', question:'8% of 150 = ?', answer:12 },
  { id:'arith_p31', wave:4, type:'arithmetic', question:'2% of 350 = ?', answer:7 },
  { id:'arith_p32', wave:4, type:'arithmetic', question:'33% of 300 = ?', answer:99 },
  { id:'arith_p33', wave:4, type:'arithmetic', question:'11% of 200 = ?', answer:22 },
  { id:'arith_p34', wave:4, type:'arithmetic', question:'45% of 80 = ?', answer:36 },
  // Wave 5 — Equivalent fractions/Percent (5)
  { id:'arith_f26', wave:5, type:'arithmetic', question:'2/8 as a percentage = ?', answer:25, explanation:'2/8 = 1/4 = 25%' },
  { id:'arith_f27', wave:5, type:'arithmetic', question:'4/8 as a percentage = ?', answer:50, explanation:'4/8 = 1/2 = 50%' },
  { id:'arith_f28', wave:5, type:'arithmetic', question:'6/8 as a percentage = ?', answer:75, explanation:'6/8 = 3/4 = 75%' },
  { id:'arith_f29', wave:5, type:'arithmetic', question:'2/6 as a percentage (to 1dp) = ?', answer:33.3, explanation:'2/6 = 1/3 ≈ 33.3%' },
  { id:'arith_f30', wave:5, type:'arithmetic', question:'4/6 as a percentage (to 1dp) = ?', answer:66.7, explanation:'4/6 = 2/3 ≈ 66.7%' },
  // Wave 5 — Percentage calcs (10)
  { id:'arith_p35', wave:5, type:'arithmetic', question:'7.5% of 200 = ?', answer:15 },
  { id:'arith_p36', wave:5, type:'arithmetic', question:'12.5% of 80 = ?', answer:10 },
  { id:'arith_p37', wave:5, type:'arithmetic', question:'37.5% of 40 = ?', answer:15 },
  { id:'arith_p38', wave:5, type:'arithmetic', question:'62.5% of 80 = ?', answer:50 },
  { id:'arith_p39', wave:5, type:'arithmetic', question:'87.5% of 40 = ?', answer:35 },
  { id:'arith_p40', wave:5, type:'arithmetic', question:'95% of 200 = ?', answer:190 },
  { id:'arith_p41', wave:5, type:'arithmetic', question:'3% of 500 = ?', answer:15 },
  { id:'arith_p42', wave:5, type:'arithmetic', question:'18% of 50 = ?', answer:9 },
  { id:'arith_p43', wave:5, type:'arithmetic', question:'72% of 50 = ?', answer:36 },
  { id:'arith_p44', wave:5, type:'arithmetic', question:'14% of 300 = ?', answer:42 },
  // Wave 5 — Remainder as mixed number (4, multiple choice)
  { id:'arith_r01', wave:5, type:'arithmetic', question:'17 ÷ 5 written as a mixed number = ?', answer:'3 2/5', options:['3 2/5','2 3/5','3 3/5','4 1/5'] },
  { id:'arith_r02', wave:5, type:'arithmetic', question:'23 ÷ 4 written as a mixed number = ?', answer:'5 3/4', options:['5 3/4','4 3/5','5 1/4','6 1/4'] },
  { id:'arith_r03', wave:5, type:'arithmetic', question:'29 ÷ 6 written as a mixed number = ?', answer:'4 5/6', options:['4 5/6','5 1/6','4 1/6','3 5/6'] },
  { id:'arith_r04', wave:5, type:'arithmetic', question:'31 ÷ 8 written as a mixed number = ?', answer:'3 7/8', options:['3 7/8','4 1/8','2 7/8','3 5/8'] },
  // Wave 1 — Reverse percentages (5)
  { id:'arith_rv01', wave:1, type:'arithmetic', question:'If 60 is 20%, what is 100%?', answer:300, explanation:'20% = 60, so 1% = 3, 100% = 300' },
  { id:'arith_rv02', wave:1, type:'arithmetic', question:'If 40 is 10%, what is 100%?', answer:400, explanation:'10% = 40, so 100% = 400' },
  { id:'arith_rv03', wave:1, type:'arithmetic', question:'If 90 is 30%, what is 100%?', answer:300, explanation:'30% = 90, so 10% = 30, 100% = 300' },
  { id:'arith_rv04', wave:1, type:'arithmetic', question:'If 150 is 50%, what is 100%?', answer:300, explanation:'50% = 150, so 100% = 300' },
  { id:'arith_rv05', wave:1, type:'arithmetic', question:'If 120 is 40%, what is 100%?', answer:300, explanation:'40% = 120, so 10% = 30, 100% = 300' },
  // Wave 2 — Reverse percentages (5)
  { id:'arith_rv06', wave:2, type:'arithmetic', question:'If 35 is 5%, what is 100%?', answer:700, explanation:'5% = 35, so 1% = 7, 100% = 700' },
  { id:'arith_rv07', wave:2, type:'arithmetic', question:'If 150 is 75%, what is 100%?', answer:200, explanation:'75% = 150, so 25% = 50, 100% = 200' },
  { id:'arith_rv08', wave:2, type:'arithmetic', question:'If 45 is 15%, what is 100%?', answer:300, explanation:'15% = 45, so 5% = 15, 10% = 30, 100% = 300' },
  { id:'arith_rv09', wave:2, type:'arithmetic', question:'If 63 is 9%, what is 100%?', answer:700, explanation:'9% = 63, so 1% = 7, 100% = 700' },
  { id:'arith_rv10', wave:2, type:'arithmetic', question:'If 84 is 12%, what is 100%?', answer:700, explanation:'12% = 84, so 1% = 7, 100% = 700' },
  // Wave 1 — Find what's left (4)
  { id:'arith_wl01', wave:1, type:'arithmetic', question:'A bakery makes 400 cupcakes. By noon 85% are sold. How many are left?', answer:60, explanation:'100% − 85% = 15%. 10% = 40, 5% = 20, so 15% = 60' },
  { id:'arith_wl02', wave:1, type:'arithmetic', question:'A library has 800 books. 25% are checked out. How many are on the shelves?', answer:600, explanation:'100% − 25% = 75%. 75% of 800 = 600' },
  { id:'arith_wl03', wave:1, type:'arithmetic', question:'A shop has 200 apples. 60% are sold in the morning. How many are left?', answer:80, explanation:'100% − 60% = 40%. 10% = 20, 40% = 80' },
  { id:'arith_wl04', wave:1, type:'arithmetic', question:'A tank holds 500 litres of water. 70% is used. How many litres remain?', answer:150, explanation:'100% − 70% = 30%. 10% = 50, 30% = 150' },
  // Wave 2 — Find what's left (4)
  { id:'arith_wl05', wave:2, type:'arithmetic', question:'A plane flies a 1,200-mile route. It has completed 70%. How many miles are left?', answer:360, explanation:'100% − 70% = 30%. 10% = 120, 30% = 360' },
  { id:'arith_wl06', wave:2, type:'arithmetic', question:'A school has 850 books. 18% are checked out. How many are on the shelves?', answer:697, explanation:'100% − 18% = 82%. 10% = 85, 80% = 680, 2% = 17, total = 697' },
  { id:'arith_wl07', wave:2, type:'arithmetic', question:'A coffee shop starts with 250 kg of beans. They use 64%. How many kg are left?', answer:90, explanation:'100% − 64% = 36%. 10% = 25, 30% = 75, 6% = 15, total = 90' },
  { id:'arith_wl08', wave:2, type:'arithmetic', question:'A gardener has 120 tulip bulbs. He plants 45%. How many are left?', answer:66, explanation:'100% − 45% = 55%. 50% = 60, 5% = 6, total = 66' },
]

const WAVE_DATES = {
  1: null,
  2: '2026-03-31',
  3: '2026-04-07',
  4: '2026-04-14',
  5: '2026-04-21',
}

export function generateAllCards() {
  const all = [
    ...vocabularyCards,
    ...literaryDeviceCards,
    ...grammarCards,
    ...mathsTechniqueCards,
    ...strategyCards,
    ...arithmeticCards,
  ]
  return all.map(c => ({ ...c, nextReviewDate: WAVE_DATES[c.wave] ?? null }))
}
