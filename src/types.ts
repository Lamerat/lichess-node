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

type sort = 'dateAsc' | 'dateDesc'
type titles = 'GM' | 'WGM' | 'IM' | 'WIM' | 'FM' | 'WFM' | 'NM' | 'CM' | 'WCM' | 'WNM' | 'LM' | 'BOT'
type themes = 'blue' | 'blue2' | 'blue3' | 'blue-marble' | 'canvas' | 'wood' | 'wood2' | 'wood3' | 'wood4' | 'maple' | 'maple2' | 'brown' | 'leather' | 'green' | 'marble' | 'green-plastic' | 'grey' | 'metal' | 'olive' | 'newspaper' |'purple' |'purple-diag' |'pink' |'ic'
type pieceSets = 'cburnett' | 'merida' | 'alpha' | 'pirouetti' | 'chessnut' | 'chess7' | 'reillycraig' | 'companion' | 'riohacha' | 'kosal' | 'leipzig' | 'fantasy' | 'spatial' | 'california' | 'pixel' | 'maestro' | 'fresca' | 'cardinal' | 'gioco' | 'tatiana' | 'staunty' | 'governor' | 'dubrovny' | 'icpieces' | 'shapes' | 'letter'
type themes3d = 'Black-White-Aluminium' | 'Brushed-Aluminium' | 'China-Blue' | 'China-Green' | 'China-Grey' | 'China-Scarlet' | 'Classic-Blue' | 'Gold-Silver' | 'Light-Wood' | 'Power-Coated' | 'Rosewood' | 'Marble' | 'Wax' | 'Jade' | 'Woodi'
type pieceSets3d = 'Basic' | 'Wood' | 'Metal' | 'RedVBlue' | 'ModernJade' | 'ModernWood' | 'Glass' | 'Trimmed' | 'Experimental' | 'Staunton' | 'CubesAndPi'
type soundSets = 'silent' | 'standard' | 'piano' | 'nes' | 'sfx' | 'futuristic' | 'robot' | 'music' | 'speech'
type uciVariant = 'chess' | 'crazyhouse' | 'antichess' | 'atomic' | 'horde' | 'kingofthehill' | 'racingkings' | '3check'

type lightUser = {
  id: string,
  name: string,
  title: titles,
  patron: boolean
}

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
  title: titles,
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
type statuses = 'created' |'started' |'aborted' |'mate' |'resign' |'stalemate' |'timeout' |'draw' |'outoftime' |'cheat' |'noStart' |'unknownFinish' |'variantEnd'
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
  annotator?: string,
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

export type analysisRequest = { fen: string, multiPv?: number, variant?: openingVariants }
export type analysisResponse = {
  fen: string,
  knodes: number,
  depth: number,
  pvs: { moves: string, cp: number }[]
}

export type tableBaseResponse = {
  dtz: number,
  precise_dtz: number,
  dtm: number,
  checkmate: boolean,
  stalemate: boolean,
  variant_win: boolean,
  variant_loss: boolean,
  insufficient_material: boolean,
  category: string,
  moves: {
    uci: string,
    san: string,
    dtz: number,
    precise_dtz: number,
    dtm: number,
    zeroing: true,
    checkmate: boolean,
    stalemate: boolean,
    variant_win: boolean,
    variant_loss: boolean,
    insufficient_material: boolean,
    category: string
  }[]
}

type singleSimul = {
  id: string,
  name: string,
  fullName: string,
  host: {
    id: string,
    name: string,
    rating: number,
    title: string
  },
  isCreated: boolean,
  isFinished: boolean,
  isRunning: boolean,
  estimatedStartAt: number,
  startedAt: number,
  finishedAt: number,
  nbApplicants: 0,
  nbPairings: 24,
  text: string,
  variants: {
    icon: string,
    key: string,
    name: string
  }[]
}

export type simulsResponse = {
  pending: singleSimul[],
  created: singleSimul[],
  started: singleSimul[],
  finished: singleSimul[]
}

export type exportGame = {
  moves?: boolean,
  pgnInJson?: boolean,
  tags?: boolean,
  clocks?: boolean,
  evals?: boolean,
  accuracy?: boolean,
  opening?: boolean,
  literate?: boolean,
  players?: string
}


type gamePlayers = {
  user: { id: string, name: string, title: titles, patron: boolean },
  rating: number,
  ratingDiff: number,
  name: string,
  provisional: boolean,
  aiLevel: number,
  analysis: {
    inaccuracy: number,
    mistake: number,
    blunder: number,
    acpl: number
  },
  team: string
}

type analysisObject = {
  eval: number,
  best: string,
  variation: string,
  judgment: {
    name: 'Inaccuracy' | 'Mistake' | 'Blunder',
    comment: string
  }
}

type clockObject = {
  initial: number,
  increment: number,
  totalTime: number
}

export type exportGameResponse = {
  id: string,
  rated: boolean,
  variant: openingVariants,
  speed: openingSpeeds,
  perf: string,
  createdAt: number,
  lastMoveAt: number,
  status: statuses,
  players: {
    white: gamePlayers,
    black: gamePlayers
  },
  initialFen: string,
  winner: 'white' | 'black',
  opening: {
    eco: string,
    name: string,
    ply: number
  },
  moves: string,
  pgn?: string,
  daysPerTurn: number,
  analysis: analysisObject[],
  tournament: string,
  swiss: string,
  clock: clockObject,
  clocks?: number[],
}

export type exportGamesOptions = {
  since?: number,
  until?: number,
  max?: number,
  vs?: string,
  rated?: boolean,
  perfType?: perfType,
  color?: 'white' | 'black',
  analysed?: boolean,
  moves?: boolean,
  pgnInJson?: boolean,
  tags?: boolean,
  clocks?: boolean,
  evals?: boolean,
  accuracy?: boolean,
  opening?: boolean,
  ongoing?: boolean,
  finished?: boolean,
  literate?: boolean,
  lastFen?: boolean,
  players?: string,
  sort?: sort
}

export type studyQuery = {
  clocks?: boolean,
  comments?: boolean,
  variations?: boolean,
  source?: boolean,
  orientation?: boolean
}

export type StudyMetadata = {
  id: string,
  name: string,
  createdAt: number,
  updatedAt: number
}

export type preferencesResponse = {
  prefs: {
    dark: boolean,
    transp: boolean,
    bgImg: string,
    is3d: boolean,
    theme: themes,
    pieceSet: pieceSets,
    theme3d: themes3d,
    pieceSet3d: pieceSets3d,
    soundSet: soundSets,
    blindfold: number,
    autoQueen: number,
    autoThreefold: number,
    takeback: number,
    moretime: number,
    clockTenths: number,
    clockBar: boolean,
    clockSound: boolean,
    premove: boolean,
    animation: number,
    captured: boolean,
    follow: boolean,
    highlight: boolean,
    destination: boolean,
    coords: number,
    replay: number,
    challenge: number,
    message: number,
    coordColor: number,
    submitMove: number,
    confirmResign: number,
    insightShare: number,
    keyboardMove: number,
    zen: number,
    moveEvent: number,
    rookCastle: number
    },
  language: string
}

export type teamsSwiss = {
  rated: boolean,
  clock: { increment: number, limit: number },
  createdBy: string,
  id: string,
  name: string,
  nbOngoing: number,
  nbPlayers: number,
  nbRounds: number,
  nextRound: { at: string, in: number },
  round: number,
  startsAt: string,
  status: string,
  variant: string,
  isRecentlyFinished: boolean,
  password: boolean,
  stats: {
    absences: number,
    averageRating: number,
    blackWins: number,
    byes: number,
    draws: number,
    games: number,
    whiteWins: number
  }
}

export type singleTeam = {
  id: string,
  name: string,
  description: string,
  open: boolean,
  leader: lightUser,
  leaders: lightUser[],
  nbMembers: number,
  location: string | null
}

export type popularTeams = {
  currentPage: number,
  maxPerPage: number,
  currentPageResults: singleTeam[],
  nbResults: number,
  previousPage: number | null,
  nextPage: number | null,
  nbPages: number | null
}

export type teamArenaTournament = {
  id: string,
  createdBy: string,
  system: 'arena',
  minutes: number,
  clock: { limit: number, increment: number },
  rated: boolean,
  fullName: string,
  nbPlayers: number,
  variant: {
    key: openingVariants,
    name: string,
    short: string
  },
  startsAt: number,
  finishesAt: number,
  status: 10 | 20 | 30,
  perf: {
    key: string,
    name: string,
    position: number,
    icon: string
  },
  secondsToStart: number,
  hasMaxRating: boolean,
  maxRating: { perf: perfType, rating: number },
  minRating: { perf: perfType, rating: number },
  minRatedGames: { nb: number, perf: perfType },
  onlyTitled: boolean,
  teamMember: string,
  private: boolean,
  position: { eco: string, name: string, fen: string, url: string } | { name: 'Custom position', fen: string },
  schedule: { freq: string, speed: string},
  teamBattle: { teams: string[], nbLeaders: number },
  winner: {
    id: string,
    name: string,
    title: titles
  }
}

export type arenaTournamentsResponse = {
  created: teamArenaTournament[],
  started: teamArenaTournament[],
  finished: teamArenaTournament[],
}

export type arenaTournamentDetails = {
  id: string,
  fullName: string,
  rated: boolean,
  clock: { limit: number, increment: number },
  minutes: number,
  createdBy: string,
  system: string,
  secondsToStart: number,
  secondsToFinish: number,
  isFinished: boolean,
  isRecentlyFinished: boolean,
  pairingsClosed: boolean,
  startsAt: number,
  nbPlayers: number,
  perf: {
    key: string,
    name: string,
    position: number,
    icon: string
  },
  schedule: { freq: string, speed: string},
  variant: string,
  duels: { id: string, p: { n: string, r: number, k: number }[] }[],
  standings: {
    page: number,
    players: {
      name: string,
      rank: number,
      rating: number,
      score: number,
      sheet: {
        scores: { 0: number, 1: number } | number []
        total: number,
        fire: boolean
      }
    }[]
  },
  featured: {
    id: string,
    fen: string,
    color: string,
    lastMove: string,
    white: {
      rank: number,
      name: string,
      rating: number
    },
    black: {
      rank: number,
      name: string,
      rating: number
    }
  },
  podium: {
    name: string,
    rank: number,
    rating: number,
    score: number,
    sheet: {
      scores: { 0: number, 1: number } | number []
      total: number,
      fire: boolean
    }
    nb: {
      game: number,
      beserk: number,
      win: number
    },
    performance: number
  }[],
  stats: {
    games: number,
    moves: number,
    whiteWins: number,
    blackWins: number,
    draws: number,
    berserks: number,
    averageRating: number
  }
}


type broadcastRound = {
  id: string,
  name: string,
  slug: string,
  finished: boolean,
  startsAt: number,
  url: string
}

type broadcastTour = {
  id: string,
  name: string,
  slug: string,
  description: string,
  markup: string,
  url: string
}

export type officialBroadcast = {
  tour: broadcastTour,
  rounds: broadcastRound[]
}

export type externalEngineResponse = {
  id: string,
  name: string,
  clientSecret: string,
  userId: string,
  maxThreads: number,
  maxHash: number,
  defaultDepth: number,
  variants: uciVariant[],
  providerData?: string
}

export type externalEngineRequest = {
  name: string,
  maxThreads: number,
  maxHash: number,
  defaultDepth: number,
  variants?: uciVariant[],
  providerSecret: string,
  providerData?: string
}