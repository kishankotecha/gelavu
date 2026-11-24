import AppDataSource from '../data-source';
import { Sport } from '../entities/sport.entity';
import { City } from '../entities/city.entity';

/**
 * Idempotent reference data seed. Safe to run repeatedly: rows are upserted
 * on their unique keys (sport code, city slug).
 *
 * Run with: npm run seed   (migrations must be applied first)
 */

// BWF standard badminton rules: 21-point games, best of 3, win by 2, cap at 30,
// interval at 11. Keys mirror the ScoringRules entity fields.
const SPORTS: Array<Pick<Sport, 'code' | 'name' | 'default_scoring_rules' | 'is_active'>> = [
  {
    code: 'BADMINTON',
    name: 'Badminton',
    default_scoring_rules: {
      points_per_game: 21,
      best_of_games: 3,
      win_by_two: true,
      max_cap: 30,
      interval_at: 11,
    },
    is_active: true,
  },
];

const CITIES: Array<Pick<City, 'name' | 'slug' | 'state' | 'is_active'>> = [
  { name: 'Bengaluru', slug: 'bengaluru', state: 'Karnataka', is_active: true },
  { name: 'Mysuru', slug: 'mysuru', state: 'Karnataka', is_active: true },
  { name: 'Hyderabad', slug: 'hyderabad', state: 'Telangana', is_active: true },
  { name: 'Chennai', slug: 'chennai', state: 'Tamil Nadu', is_active: true },
  { name: 'Mumbai', slug: 'mumbai', state: 'Maharashtra', is_active: true },
  { name: 'Pune', slug: 'pune', state: 'Maharashtra', is_active: true },
  { name: 'Delhi NCR', slug: 'delhi-ncr', state: 'Delhi', is_active: true },
];

async function seed() {
  await AppDataSource.initialize();
  try {
    await AppDataSource.getRepository(Sport).upsert(SPORTS, ['code']);
    await AppDataSource.getRepository(City).upsert(CITIES, ['slug']);
    console.log(`Seeded ${SPORTS.length} sport(s) and ${CITIES.length} city(ies).`);
  } finally {
    await AppDataSource.destroy();
  }
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
