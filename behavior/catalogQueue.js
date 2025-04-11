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

User chooses B
*/

export const operation2 = {
  aInput: ['original', 'reloaded', 'revolutions', 'animatrix'],
  bInput: ['revisited', 'enter', 'online', 'path', 'awakens'],
  better: 2,
  output: ['comics']
}
/*
CHOICE
index: 1
a: original
b: enter

RANKING
1. awakens: 6
2. path: 5
3. animatrix: 4
3. online: 4
4. revolutions: 3
5. enter: 2
5. reloaded: 2
6. original: 1
6. revisited: 1
7. comics: 0

User chooses A
*/

export const operation3 = {
  aInput: ['online', 'path', 'awakens'],
  bInput: ['reloaded', 'revolutions', 'animatrix'],
  better: undefined,
  output: ['comics', 'revisited', 'enter', 'original']
}
/*
CHOICE
index: 1
a: online
b: revolutions

RANKING
1. awakens: 6
1. animatrix: 6
2. path: 5
2. revolutions: 5
3. online: 4
3. reloaded: 4
4. original: 3
5. enter: 2
6. revisited: 1
7. comics: 0

User chooses B
*/

export const operation4 = {
  aInput: ['online', 'path', 'awakens'],
  bInput: ['reloaded', 'revolutions', 'animatrix'],
  better: 1,
  output: ['comics', 'revisited', 'enter', 'original']
}
/*
CHOICE
index: 0
a: online
b: reloaded

RANKING
1. animatrix: 7
2. awakens: 6
2. revolutions: 6
3. path: 5
4. online: 4
4. reloaded: 4
5. original: 3
6. enter: 2
7. revisited: 1
8. comics: 0

User chooses A
*/

export const operation5 = {
  aInput: ['animatrix'],
  bInput: ['path', 'awakens'],
  better: undefined,
  output: ['comics', 'revisited', 'enter', 'original', 'reloaded', 'revolutions']
}
/*
CHOICE
index: 0
a: animatrix
b: path

RANKING
1. awakens: 7
2. animatrix: 6
2. path: 6
3. revolutions: 5
4. reloaded: 4
5. original: 3
6. enter: 2
7. revisited: 1
8. comics: 0

User chooses B
*/

export const operation6 = {
  aInput: [],
  bInput: [],
  better: undefined,
  output: ['comics', 'revisited', 'enter', 'original', 'reloaded', 'revolutions', 'animatrix', 'path', 'awakens']
}
/*
complete

RANKING
1. awakens: 8
2. path: 7
3. animatrix: 6
4. revolutions: 5
5. reloaded: 4
6. original: 3
7. enter: 2
8. revisited: 1
9. comics: 0
*/
