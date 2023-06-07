export type perfType = 'ultraBullet' | 'bullet' | 'blitz' | 'rapid' | 'classical' | 'chess960' | 'crazyhouse' | 'antichess' | 'atomic' | 'horde' | 'kingOfTheHill' | 'racingKings' | 'threeCheck'

export type topTenObject = {
  id: string,
  username: string,
  title: string | undefined,
  online: boolean | undefined,
  patron: boolean | undefined,
  perfs: { [gameSpeed: string]: { rating: number, progress: number } }
}

interface topBullet extends topTenObject { perfs: { bullet: { rating: number, progress: number } } }
interface topBlitz extends topTenObject { perfs: { blitz: { rating: number, progress: number } } }
interface topRapid extends topTenObject { perfs: { rapid: { rating: number, progress: number } } }
interface topClassical extends topTenObject { perfs: { classical: { rating: number, progress: number } } }
interface topUltraBullet extends topTenObject { perfs: { ultraBullet: { rating: number, progress: number } } }
interface topChess960 extends topTenObject { perfs: { chess960: { rating: number, progress: number } } }
interface topCrazyhouse extends topTenObject { perfs: { crazyhouse: { rating: number, progress: number } } }
interface topAntichess extends topTenObject { perfs: { antichess: { rating: number, progress: number } } }
interface topAtomic extends topTenObject { perfs: { atomic: { rating: number, progress: number } } }
interface topHorde extends topTenObject { perfs: { horde: { rating: number, progress: number } } }
interface topKingOfTheHill extends topTenObject { kingOfTheHill: { rapid: { rating: number, progress: number } } }
interface topRacingKings extends topTenObject { perfs: { racingKings: { rating: number, progress: number } } }
interface topThreeCheck extends topTenObject { perfs: { threeCheck: { rating: number, progress: number } } }

type perf = {
  games: number,
  rating: number,
  rd: number,
  prog: number,
  prov: boolean
}

interface perfs {
  chess960: perf,
  atomic: perf,
  racingKings: perf,
  ultraBullet: perf,
  blitz: perf,
  kingOfTheHill: perf,
  bullet: perf,
  correspondence: perf,
  horde: perf,
  puzzle: perf,
  classical: perf,
  rapid: perf,
  storm: perf
}

type count = {
  all: number,
  rated: number,
  ai: number,
  draw: number,
  drawH: number,
  loss: number,
  lossH: number,
  win: number,
  winH: number,
  bookmark: number,
  playing: number,
  import: number,
  me: number
}

type playTime = { total: number, tv: number }

type profile = {
  country: string,
  location: string,
  bio: string,
  firstName: string,
  lastName: string,
  fideRating: number,
  uscfRating: number,
  ecfRating: number,
  links: string
}

export interface userPublicData {
  id: string,
  username: string,
  perfs: perfs,
  createdAt: number,
  disabled: boolean,
  tosViolation: boolean,
  profile: profile,
  seenAt: number,
  patron: boolean,
  verified: boolean,
  playTime: playTime,
  title: string,
  url: string,
  playing: string,
  count: count,
  streaming: boolean,
  followable: boolean,
  following: boolean,
  blocking: boolean,
  followsYou: boolean
}


export interface playerObject {
  bullet: topBullet[],
  blitz: topBlitz[],
  rapid: topRapid[],
  classical: topClassical[],
  ultraBullet: topUltraBullet[],
  chess960: topChess960[],
  crazyhouse: topCrazyhouse[],
  antichess: topAntichess[],
  atomic: topAtomic[],
  horde: topHorde[],
  kingOfTheHill: topKingOfTheHill[],
  racingKings: topRacingKings[],
  threeCheck: topThreeCheck[]
}

export type realTimeUser = {
  id: string,
  name  : string,
  title : string | undefined,
  online  : boolean | undefined,
  playing : boolean | undefined,
  streaming : boolean | undefined,
  patron  : boolean | undefined,
  playingId: string | undefined
}


type performanceStat = { int: number, at: string, gameId: string }
type performanceResults = { opInt: number, opId: { id: string, name: string }, at: string, gameId: string }
type performanceResultStreak = { v: number, from: { at: string, gameId: string }, to: { at: string, gameId: string } }
export type performanceStatisticsUser = {
  user: { name: string }
  perf: {
    glicko: { rating: number, deviation: number, provisional: boolean },
    nb: number,
    progress: number
  },
  rank: number,
  percentile: number,
  stat: {
    perfType: { key: string, name: string },
    highest: performanceStat,
    lowest: performanceStat,
    bestWins: { results: performanceResults[] },
    worstLosses: { results: performanceResults[] },
    count: {
      all: number,
      rated: number,
      win: number,
      loss: number,
      draw: number,
      tour: number,
      berserk: number,
      opAvg: number,
      seconds: number,
      disconnects: number
    },
    resultStreak: {
      win: { cur: performanceResultStreak, max: performanceResultStreak },
      loss: { cur: performanceResultStreak, max: performanceResultStreak }
    },
    playStreak: {
      nb: { cur: performanceResultStreak, max: performanceResultStreak },
      time: { cur: performanceResultStreak, max: performanceResultStreak },
      lastDate: string
    }
  }
}

export interface userById {
  id: string,
  username: string,
  perfs: perfs,
  createdAt: number,
  disabled: boolean,
  tosViolation: boolean,
  profile: profile,
  seenAt: number,
  patron: boolean,
  verified: boolean,
  playTime: playTime,
  title: string
}

export interface teamMember extends userById {
  url: string,
  playing: string,
  count: count,
  streaming: boolean,
  followable: boolean,
  following: boolean,
  blocking: boolean,
  followsYou: boolean,
}

type stream = {
  service: string,
  status: string,
  lang: string
}

type streamer = {
  name: string,
  headline: string,
  description: string,
  twitch: string,
  youTube: string,
  image: string
}


export type liveStreamer = {
  id: string,
  name  : string,
  title : string,
  patron  : boolean,
  stream: stream,
  streamer: streamer
}

export type crosstable = {
  users: object,
  nbGames: number,
  matchup: {
    users: object,
    nbGames: number
  }
}

export type autocompleteUserName = {
  result: {
    id: string,
    name: string,
    title: string,
    patron: boolean,
    online: boolean
  }[]
}

type openingVariants = 'standard' | 'chess960' | 'crazyhouse' | 'antichess' | 'atomic' | 'horde' | 'kingOfTheHill' | 'racingKings' | 'threeCheck' | 'fromPosition'
type openingSpeeds = 'ultraBullet' | 'bullet' | 'blitz' | 'rapid' | 'classical' | 'correspondence'
type openingRatings = '0' | '1000' | '1200' | '1400' | '1600' | '1800' | '2000' | '2200' | '2500'
type modes = 'casual' | 'rated'
type openingHistory = {
  month: string,
  black: number,
  draws: number,
  white: number
}

type moves = {
  uci: string,
  san: string,
  averageRating: number,
  white: number,
  draws: number,
  black: number,
  game: {
    id: string,
    winner: string,
    white: { name: string, rating: number },
    black: { name: string, rating: number },
    year: number,
    month: string
  }
}

type topGames = {
  uci: string,
  id: string,
  winner: string,
  white: { name: string, rating: number },
  black: { name: string, rating: number },
  year: number,
  month: string
}

export type mastersDatabase = {
  fen?: string,
  play?: string,
  since?: number,
  until?: number,
  moves?: number,
  topGames?: number
}

export type masterResponse = {
  opening: { eco: string, name: string },
  white: number,
  draws: number,
  black: number,
  moves: moves[],
  topGames: topGames[],
  recentGames: [],
  history: openingHistory[]
}

export type lichessGamesRequest = {
  variant?: openingVariants,
  fen?: string,
  play?: string,
  speeds?: openingSpeeds[],
  ratings?: openingRatings[],
  since?: string,
  until?: string,
  moves?: number,
  topGames?: number,
  recentGames?: number,
  history?: boolean
}

export type playerGamesOpening = {
  player: string,
  color: 'white' | 'black',
  variant?: openingVariants,
  fen?: string,
  play?: string,
  speeds?: openingSpeeds[],
  modes?: modes[],
  since?: string,
  until?: string,
  moves?: number,
  recentGames?: number
}

export type playerGamesOpeningResponse = {
  white: number,
  draws: number,
  black: number,
  moves: {
    uci: string,
    san: string,
    averageOpponentRating: number,
    performance: number,
    white: number,
    draws: number,
    black: number,
    game: {
      id: string,
      winner: string,
      speed: string,
      mode: string,
      black: { name: string, rating: number },
      white: { name: string, rating: number },
      year: number,
      month: string
    }
  }[],
  recentGames:{
    uci: string,
    id: string,
    winner: string,
    speed: string,
    mode: string,
    black: { name: string, rating: number },
    white: { name: string, rating: number },
    year: number,
    month: string
  }[],
  opening: { eco: string, name: string },
  queuePosition: number
}

export type pngJSON = {
  event?: string,
  site?: string,
  date?: string,
  eventDate?: string,
  round?: string,
  white?: string,
  black?: string,
  result?: string,
  eco?: string,
  whiteElo?: string,
  blackElo?: string,
  plyCount?: string,
  moves?: string
}

export type puzzleType = {
  game: {
    id: string,
    perf: { key: perfType, name: string },
    rated: boolean,
    players: { userId: string, name: string, color: 'white' | 'black' }[],
    pgn: string,
    clock: string
  },
  puzzle: {
    id: string,
    rating: number,
    plays: number,
    solution: string[],
    themes: string[],
    initialPly: number
  }
}

export type yourPuzzle = {
  date: number,
  win: boolean,
  puzzle: {
    id: string,
    fen: string,
    plays: number,
    rating: number,
    solution: string[],
    themes: string[]
  }
}

type themeType = {
  theme: string,
  results: {
    nb: number,
    firstWins: number,
    replayWins: number,
    puzzleRatingAvg: number,
    performance: number
  }
}

export type puzzleDashBoardResponse = {
  days: number,
  global: {
    nb: number,
    firstWins: number,
    replayWins: number,
    puzzleRatingAvg: number,
    performance: number
  },
  themes: {
    endgame: themeType,
    middlegame: themeType,
    pin: themeType,
    exposedKing: themeType,
    clearance: themeType,
    advancedPawn: themeType,
    quietMove: themeType,
    sacrifice: themeType,
    opening: themeType,
    discoveredAttack: themeType,
    doubleCheck: themeType,
    skewer: themeType,
    attraction: themeType
  }
}

export type stormDashboardResponse = {
  high: {
    day: number,
    week: number,
    month: number,
    allTime: number
  },
  days: {
    _id: string,
    moves: number,
    errors: number,
    highest: number,
    score: number,
    runs: number,
    combo: number,
    time: number
  }[]
}

type singleTVGame = {
  user: {
    id: string,
    name: string,
    title?: string,
    patron?: boolean,
  },
  rating: number
  gameId: string
}

export type tvGames = {
  Bot: singleTVGame,
  Blitz: singleTVGame,
  'Racing Kings': singleTVGame,
  UltraBullet: singleTVGame,
  Bullet: singleTVGame,
  Classical: singleTVGame,
  'Three-check': singleTVGame,
  Antichess: singleTVGame,
  Computer: singleTVGame,
  Horde: singleTVGame,
  Rapid: singleTVGame,
  Atomic: singleTVGame,
  Crazyhouse: singleTVGame,
  Chess960: singleTVGame,
  'King of the Hill': singleTVGame,
  'Top Rated': singleTVGame
}



export type streamGame = {
  nb?: number,
  moves?: boolean,
  pgnInJson?: boolean,
  tags?: boolean,
  clocks?: boolean,
  opening?: boolean
}

export type streamGameResponse = {
  id: string,
  rated: boolean,
  variant: string,
  speed: string,
  perf: string,
  createdAt: number,
  lastMoveAt: number,
  status: string,
  players: {
    white: { user: { name: string, id: string }, rating: number },
    black: { user: { name: string, id: string }, rating: number }   
  },
  opening: { eco: string, name: string, ply: number },
  moves: string,
  clocks: number[],
  pgn: string
  clock: { initial: number, increment: number, totalTime: number }
}