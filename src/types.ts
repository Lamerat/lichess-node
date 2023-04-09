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
