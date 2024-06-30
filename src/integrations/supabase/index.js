import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) {
        console.error(error);
        throw new Error(error.message);
    }
    return data;
};

/* supabase integration types

### estimates

| name                | type        | format | required |
|---------------------|-------------|--------|----------|
| estimate_id         | int8        | number | true     |
| estimate_number     | text        | string | true     |
| first_name          | text        | string | false    |
| last_name           | text        | string | true     |
| phone_number        | text        | string | false    |
| unit_description    | text        | string | false    |
| vin                 | text        | string | false    |
| advisor             | text        | string | false    |
| payment_type        | text        | string | false    |
| deductible          | text        | string | false    |
| estimate_date       | date        | string | false    |
| roof_kit            | numeric     | number | false    |
| roof_membrane       | numeric     | number | false    |
| slf_lvl_dicor       | numeric     | number | false    |
| non_lvl_dicor       | numeric     | number | false    |
| roof_screws         | numeric     | number | false    |
| glue                | numeric     | number | false    |
| additional_parts    | numeric     | number | false    |
| repair_description  | text        | string | false    |
| notes               | text        | string | false    |
| hrs                 | numeric     | number | false    |
| labor_per_hr        | numeric     | number | false    |
| sublet              | numeric     | number | false    |
| extras              | numeric     | number | false    |
| labor               | numeric     | number | false    |
| shop_supplies       | numeric     | number | false    |
| tax                 | numeric     | number | false    |
| total_estimate      | numeric     | number | false    |
| created_at          | timestamptz | string | true     |
| updated_at          | timestamptz | string | true     |
| job_code            | text        | string | true     |
| parts_configuration | jsonb       | object | true     |
| labor_configuration | jsonb       | object | true     |
| customer_id         | text        | string | true     |

### pre_configured_jobs

| name              | type    | format | required |
|-------------------|---------|--------|----------|
| id                | int8    | number | true     |
| job_code          | text    | string | false    |
| job_name          | text    | string | false    |
| job_description   | text    | string | false    |
| job_price         | numeric | number | false    |
| roof_kit          | numeric | number | false    |
| roof_membrane     | numeric | number | false    |
| slf_lvl_dicor     | numeric | number | false    |
| non_lvl_dicor     | numeric | number | false    |
| roof_screws       | numeric | number | false    |
| glue              | numeric | number | false    |
| additional_parts  | numeric | number | false    |
| repair_description| text    | string | false    |

### events

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| name       | text        | string | true     |
| created_at | timestamptz | string | true     |
| date       | date        | string | true     |

*/

// Hooks for estimates
export const useEstimates = () => useQuery({
    queryKey: ['estimates'],
    queryFn: () => fromSupabase(supabase.from('estimates').select('*')),
});

export const useEstimate = (id) => useQuery({
    queryKey: ['estimate', id],
    queryFn: () => fromSupabase(supabase.from('estimates').select('*').eq('estimate_id', id).single()),
});

export const useAddEstimate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newEstimate) => fromSupabase(supabase.from('estimates').insert([newEstimate])),
        onSuccess: () => {
            queryClient.invalidateQueries('estimates');
        },
    });
};

export const useUpdateEstimate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedEstimate) => fromSupabase(supabase.from('estimates').update(updatedEstimate).eq('estimate_id', updatedEstimate.estimate_id)),
        onSuccess: () => {
            queryClient.invalidateQueries('estimates');
        },
    });
};

export const useDeleteEstimate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('estimates').delete().eq('estimate_id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('estimates');
        },
    });
};

// Hooks for pre_configured_jobs
export const usePreConfiguredJobs = () => useQuery({
    queryKey: ['pre_configured_jobs'],
    queryFn: () => fromSupabase(supabase.from('pre_configured_jobs').select('*')),
});

export const usePreConfiguredJob = (id) => useQuery({
    queryKey: ['pre_configured_job', id],
    queryFn: () => fromSupabase(supabase.from('pre_configured_jobs').select('*').eq('id', id).single()),
});

export const useAddPreConfiguredJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newJob) => fromSupabase(supabase.from('pre_configured_jobs').insert([newJob])),
        onSuccess: () => {
            queryClient.invalidateQueries('pre_configured_jobs');
        },
    });
};

export const useUpdatePreConfiguredJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedJob) => fromSupabase(supabase.from('pre_configured_jobs').update(updatedJob).eq('id', updatedJob.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('pre_configured_jobs');
        },
    });
};

export const useDeletePreConfiguredJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('pre_configured_jobs').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('pre_configured_jobs');
        },
    });
};

// Hooks for events
export const useEvents = () => useQuery({
    queryKey: ['events'],
    queryFn: () => fromSupabase(supabase.from('events').select('*')),
});

export const useEvent = (id) => useQuery({
    queryKey: ['event', id],
    queryFn: () => fromSupabase(supabase.from('events').select('*').eq('id', id).single()),
});

export const useAddEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newEvent) => fromSupabase(supabase.from('events').insert([newEvent])),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

export const useUpdateEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedEvent) => fromSupabase(supabase.from('events').update(updatedEvent).eq('id', updatedEvent.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

export const useDeleteEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('events').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};