export const operation1 = {
  aInput: ['original', 'reloaded', 'revolutions', 'animatrix'],
  bInput: ['revisited', 'enter', 'online', 'path', 'awakens'],
  better: undefined,
  output: ['comics']
}
/*
CHOICE
index: 2
a: original
b: online

RANKING
1. awakens: 5
2. animatrix: 4
2. path: 4
3. online: 3
3. revolutions: 3
4. enter: 2
4. reloaded: 2
5. original: 1
5. revisited: 1
6. comics: 0

User chooses A
*/

export const operation2 = {
  aInput: ['path', 'awakens'],
  bInput: ['reloaded', 'revolutions', 'animatrix'],
  better: undefined,
  output: ['comics', 'revisited', 'enter', 'online', 'original']
}
/*
CHOICE
index: 1
a: path
b: revolutions

RANKING
1. animatrix: 7
2. awakens: 6
2. revolutions: 6
3. path: 5
4. reloaded: 5
5. original: 4
6. online: 3
7. enter: 2
8. revisited: 1
9. comics: 0

User chooses A
*/

export const operation3 = {
  aInput: ['animatrix'],
  bInput: ['awakens'],
  better: undefined,
  output: ['comics', 'revisited', 'enter', 'online', 'original', 'reloaded', 'revolutions', 'path']
}
/*
CHOICE
index: 0
a: animatrix
b: awakens

RANKING
1. animatrix: 8
1. awakens: 8
2. path: 7
3. revolutions: 6
4. reloaded: 5
5. original: 4
6. online: 3
7. enter: 2
8. revisited: 1
9. comics: 0

User chooses A
*/

export const operation4 = {
  aInput: [],
  bInput: [],
  better: undefined,
  output: ['comics', 'revisited', 'enter', 'online', 'original', 'reloaded', 'revolutions', 'path', 'awakens', 'animatrix']
}
/*
complete

RANKING
1. animatrix: 9
1. awakens: 8
2. path: 7
3. revolutions: 6
4. reloaded: 5
5. original: 4
6. online: 3
7. enter: 2
8. revisited: 1
9. comics: 0
*/
