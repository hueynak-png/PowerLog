import { useLocalSearchParams } from 'expo-router';

import { WeeklyReviewScreen } from '@/src/features/review/WeeklyReviewScreen';

export default function ReviewPage() {
  const { startDate, endDate } = useLocalSearchParams<{ startDate?: string; endDate?: string }>();

  const routePeriod =
    typeof startDate === 'string' && typeof endDate === 'string' && startDate.length > 0 && endDate.length > 0
      ? { start: startDate, end: endDate }
      : undefined;

  return <WeeklyReviewScreen initialPeriod={routePeriod} />;
}
