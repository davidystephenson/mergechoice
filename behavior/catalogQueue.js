export const operation1 = {
  better: undefined,
  catalog: ['revisited', 'enter', 'online', 'path', 'awakens', 'animatrix', 'revolutions'],
  output: ['comics'],
  queue: ['original', 'reloaded']
}
/*
CHOICE
index: 3
catalog: path
queue: original

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

User chooses catalog
*/

export const operation2 = {
  better: 3,
  catalog: ['revisited', 'enter', 'online', 'path', 'awakens', 'animatrix', 'revolutions'],
  output: ['comics'],
  queue: ['original', 'reloaded']
}
/*
CHOICE
index: 1
catalog: enter
queue: original

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

User chooses queue
*/

export const operation3 = {
  better: undefined,
  catalog: ['reloaded', 'revolutions', 'animatrix'],
  output: ['comics', 'revisited', 'enter', 'original'],
  queue: ['online', 'path', 'awakens']
}
/*
CHOICE
index: 1
catalog: revolutions
queue: online

RANKING
1. animatrix: 6
1. awakens: 6
2. path: 5
2. revolutions: 5
3. online: 4
3. reloaded: 4
4. original: 3
5. enter: 2
6. revisited: 1
7. comics: 0

User chooses catalog
*/

export const operation4 = {
  better: 1,
  catalog: ['reloaded', 'revolutions', 'animatrix'],
  output: ['comics', 'revisited', 'enter', 'original'],
  queue: ['online', 'path', 'awakens']
}
/*
CHOICE
index: 0
catalog: reloaded
queue: online

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

User chooses queue
*/

export const operation5 = {
  better: undefined,
  catalog: ['path', 'awakens'],
  output: ['comics', 'revisited', 'enter', 'original', 'reloaded', 'online'],
  queue: ['revolutions', 'animatrix']
}
/*
CHOICE
index: 0
catalog: path
queue: revolutions

RANKING
1. animatrix: 7
1. awakens: 7
2. path: 6
2. revolutions: 6
3. online: 5
4. reloaded: 4
5. original: 3
6. enter: 2
7. revisited: 1
8. comics: 0

User chooses catalog
*/

export const operation6 = {
  better: undefined,
  catalog: ['animatrix'],
  output: ['comics', 'revisited', 'enter', 'original', 'reloaded', 'online', 'revolutions', 'path'],
  queue: ['awakens']
}
/*
CHOICE
index: 0
catalog: animatrix
queue: awakens

RANKING
1. animatrix: 8
1. awakens: 8
2. path: 7
3. revolutions: 6
4. online: 5
5. reloaded: 4
6. original: 3
7. enter: 2
8. revisited: 1
9. comics: 0

// User chooses queue
*/

export const operation7 = {
  better: undefined,
  catalog: [],
  output: ['comics', 'revisited', 'enter', 'original', 'reloaded', 'online', 'revolutions', 'path', 'animatrix', 'awakens'],
  queue: []
}
/*
complete

RANKING
1. awakens: 9
2. animatrix: 8
3. path: 7
4. revolutions: 6
5. online: 5
6. reloaded: 4
7. original: 3
8. enter: 2
9. revisited: 1
10. comics: 0
*/
