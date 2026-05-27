import type { PowerLogDatabase as SQLiteDatabase } from '@/src/db/types';
import type { WeeklyReview } from '@/src/domain/types';
import generateId from '@/src/lib/uuid';

interface WeeklyReviewRow {
  id: string;
  period_start: string;
  period_end: string;
  generated_at: string;
  status: WeeklyReview['status'];
  review_json: string;
}

const toWeeklyReview = (row: WeeklyReviewRow): WeeklyReview => ({
  id: row.id,
  periodStart: row.period_start,
  periodEnd: row.period_end,
  generatedAt: row.generated_at,
  status: row.status,
  reviewJson: row.review_json,
});

export const getLatestWeeklyReview = async (db: SQLiteDatabase): Promise<WeeklyReview | null> => {
  const row = await db.getFirstAsync<WeeklyReviewRow>(
    'SELECT * FROM weekly_reviews ORDER BY generated_at DESC LIMIT 1',
  );
  return row ? toWeeklyReview(row) : null;
};

export const saveWeeklyReview = async (
  db: SQLiteDatabase,
  review: Omit<WeeklyReview, 'id' | 'generatedAt'>,
): Promise<WeeklyReview> => {
  const saved: WeeklyReview = {
    ...review,
    id: generateId(),
    generatedAt: new Date().toISOString(),
  };

  await db.runAsync(
    `INSERT INTO weekly_reviews (id, period_start, period_end, generated_at, status, review_json)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [saved.id, saved.periodStart, saved.periodEnd, saved.generatedAt, saved.status, saved.reviewJson],
  );

  return saved;
};
