export const operation1 = {
  queue: ['original', 'reloaded', 'revolutions', 'animatrix'],
  catalog: ['revisited', 'enter', 'online', 'path', 'awakens'],
  better: undefined,
  output: ['comics']
}
/*
CHOICE
index: 2
queue: original
catalog: online

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
  queue: ['original', 'reloaded', 'revolutions', 'animatrix'],
  catalog: ['revisited', 'enter', 'online', 'path', 'awakens'],
  better: 2,
  output: ['comics']
}
/*
CHOICE
index: 1
queue: original
catalog: enter

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

User chooses catalog
*/

export const operation3 = {
  queue: ['original', 'reloaded', 'revolutions', 'animatrix'],
  catalog: ['revisited', 'enter', 'online', 'path', 'awakens'],
  better: 1,
  output: ['comics']
}
/*
CHOICE
index: 0
a: original
b: revisited

RANKING
1. awakens: 6
2. path: 5
3. animatrix: 4
3. online: 4
4. enter: 3
4. revolutions: 3
5. reloaded: 2
6. original: 1
6. revisited: 1
7. comics: 0

User chooses catalog
*/

export const operation4 = {
  queue: ['reloaded', 'revolutions', 'animatrix'],
  catalog: ['enter', 'online', 'path', 'awakens'],
  better: undefined,
  output: ['comics', 'original', 'revisited']
}
/*
CHOICE
index: 1
a: reloaded
b: online

RANKING
1. awakens: 6
2. animatrix: 5
2. path: 5
3. online: 4
3. revolutions: 4
4. enter: 3
4. reloaded: 3
5. revisited: 2
6. original: 1
7. comics: 0

User chooses B
*/

export const operation5 = {
  queue: ['reloaded', 'revolutions', 'animatrix'],
  catalog: ['enter', 'online', 'path', 'awakens'],
  better: 1,
  output: ['comics', 'original', 'revisited']
}
/*
CHOICE
index: 0
a: reloaded
b: enter

RANKING
1. awakens: 7
2. path: 6
3. animatrix: 5
3. online: 5
4. revolutions: 4
5. enter: 3
5. reloaded: 3
6. revisited: 2
7. original: 1
8. comics: 0

User chooses catalog
*/

export const operation6 = {
  queue: ['revolutions', 'animatrix'],
  catalog: ['online', 'path', 'awakens'],
  better: undefined,
  output: ['comics', 'original', 'revisited', 'reloaded', 'enter']
}
/*
CHOICE
index: 1
queue: revolutions
catalog: path

RANKING
1. awakens: 7
2. animatrix: 6
2. path: 6
3. online: 5
3. revolutions: 5
4. enter: 4
4. reloaded: 3
5. revisited: 2
6. original: 1
7. comics: 0

User chooses catalog
*/

export const operation7 = {
  queue: ['revolutions', 'animatrix'],
  catalog: ['online', 'path', 'awakens'],
  better: 1,
  output: ['comics', 'original', 'revisited', 'reloaded', 'enter']
}
/*
CHOICE
index: 0
queue: revolutions
catalog: online

RANKING
1. awakens: 8
2. path: 7
3. animatrix: 6
4. online: 5
4. revolutions: 5
5. enter: 4
6. reloaded: 3
7. revisited: 2
8. original: 1
9. comics: 0

User chooses catalog
*/

export const operation8 = {
  better: undefined,
  catalog: ['path', 'awakens'],
  output: ['comics', 'original', 'revisited', 'reloaded', 'enter', 'revolutions', 'online'],
  queue: ['animatrix']
}
/*
CHOICE
index: 0
queue: animatrix
catalog: path

RANKING
1. awakens: 8
2. animatrix: 7
2. path: 7
3. online: 6
4. revolutions: 5
5. enter: 4
6. reloaded: 3
7. revisited: 2
8. original: 1
9. comics: 0

User chooses catalog
*/

export const operation9 = {
  queue: [],
  catalog: [],
  output: ['comics', 'original', 'revisited', 'reloaded', 'enter', 'revolutions', 'online', 'animatrix', 'path', 'awakens']
}
/*
complete

1. awakens: 9
2. path: 8
3. animatrix: 7
4. online: 6
5. revolutions: 5
6. enter: 4
7. reloaded: 3
8. revisited: 2
9. original: 1
10. comics: 0
*/
