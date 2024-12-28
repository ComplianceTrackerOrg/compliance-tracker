drop table if exists public.assigned_learning_resource;
drop table if exists public.user;
drop table if exists public.user_role;
drop table if exists public.learning_resource;
drop table if exists public.learning_resource_type;
drop table if exists public.learning_status;

create table
  public.learning_resource_type (
    id smallint generated always as identity not null,
    name character varying not null,
    description character varying null,
    constraint learning_type_pkey primary key (id),
    constraint learning_resource_type_id_key unique (id)
  ) tablespace pg_default;

create table
  public.learning_resource (
    id smallint generated always as identity not null,
    type_id smallint not null,
    name character varying not null,
    url character varying null,
    description character varying null,
    deadline_at timestamp with time zone null,
    is_mandatory boolean null,
    created_at timestamp with time zone not null default (now() at time zone 'utc'::text),
    constraint learning_resource_pkey primary key (id),
    constraint learning_resource_id_key unique (id),
    constraint learning_resource_type_id_fkey foreign key (type_id) references learning_resource_type (id)
  ) tablespace pg_default;

create table
  public.learning_status (
    id smallint generated always as identity not null,
    name character varying not null,
    description character varying null,
    constraint learning_status_pkey primary key (id),
    constraint learning_status_id_key unique (id),
    constraint learning_status_name_key unique (name)
  ) tablespace pg_default;

create table
  public.user_role (
    id smallint generated always as identity not null,
    name character varying not null,
    description character varying not null,
    constraint user_role_pkey primary key (id),
    constraint user_role_id_key unique (id)
  ) tablespace pg_default;

create table
  public.user (
    id integer generated always as identity not null,
    role_id smallint not null,
    first_name character varying not null,
    last_name character varying not null,
    email character varying not null,
    is_active boolean null,
    constraint user_pkey primary key (id),
    constraint user_email_key unique (email),
    constraint user_id_key unique (id),
    constraint user_role_id_fkey foreign key (role_id) references user_role (id)
  ) tablespace pg_default;

create table
  public.assigned_learning_resource (
    id bigint generated always as identity not null,
    user_id integer not null,
    resource_id smallint not null,
    status_id smallint not null,
    started_at timestamp with time zone null,
    completed_at timestamp with time zone null,
    modified_at timestamp with time zone null,
    created_at timestamp with time zone not null default (now() at time zone 'utc'::text),
    constraint assigned_learning_resource_pkey primary key (id),
    constraint assigned_learning_resource_id_key unique (id),
    constraint assigned_learning_resource_resource_id_fkey foreign key (resource_id) references learning_resource (id),
    constraint assigned_learning_resource_status_id_fkey foreign key (status_id) references learning_status (id),
    constraint assigned_learning_resource_user_id_fkey foreign key (user_id) references "user" (id)
  ) tablespace pg_default;

alter sequence public.assigned_learning_resource_id_seq restart with 1;
alter sequence public.user_id_seq restart with 1;
alter sequence public.user_role_id_seq restart with 1;
alter sequence public.learning_resource_id_seq restart with 1;
alter sequence public.learning_resource_type_id_seq restart with 1;
alter sequence public.learning_status_id_seq restart with 1;
