import envLoader from 'load-env-var';

export default {
  jwtSecret: envLoader.loadString('SUPABASE_JWT_SECRET'),
};
