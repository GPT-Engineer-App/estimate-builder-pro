import { supabase } from '../integrations/supabase/index.js';

// Save Pre-Configured Job
export const savePreConfiguredJob = async (job) => {
  const { data, error } = await supabase
    .from('pre_configured_jobs')
    .insert([job]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Fetch Pre-Configured Jobs
export const fetchPreConfiguredJobs = async (filters = {}, sort = {}) => {
  let query = supabase.from('pre_configured_jobs').select('*');

  // Apply filters
  Object.keys(filters).forEach((key) => {
    query = query.eq(key, filters[key]);
  });

  // Apply sorting
  if (sort.column && sort.order) {
    query = query.order(sort.column, { ascending: sort.order === 'asc' });
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Fetch Detailed Job Information
export const fetchJobDetails = async (jobCode) => {
  const { data, error } = await supabase
    .from('pre_configured_jobs')
    .select('*')
    .eq('job_code', jobCode)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};