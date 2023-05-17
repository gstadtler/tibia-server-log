export type CreatureKind = {
  [key: string]: number
}

interface DamageTaken {
  Total: number
  PerCreatureKind: CreatureKind
  ByUnknownOriginTotal: number
}

type Loot = {
  [key: string]: number
}

export interface Stats {
  DamageHealed: number
  DamageTaken: DamageTaken
  ExperienceGained: number
  Loot: Loot
  BlackKnightTotalHealth: number
}