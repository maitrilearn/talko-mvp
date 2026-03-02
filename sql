create table listeners (
  id uuid primary key default gen_random_uuid(),
  name text,
  language text,
  status text default 'online', -- online/offline
  created_at timestamptz default now()
);


create table time_slots (
  id uuid primary key default gen_random_uuid(),
  listener_id uuid references listeners(id),

  start_time timestamptz,
  end_time timestamptz,

  status text default 'available'
  check (status in ('available','booked','completed')),

  created_at timestamptz default now()
);


create table bookings (
  id uuid primary key default gen_random_uuid(),

  slot_id uuid references time_slots(id) on delete cascade,
  user_id uuid,

  booking_status text default 'confirmed'
  check (booking_status in ('confirmed','cancelled','completed')),

  created_at timestamptz default now()
);


create table sessions (
  id uuid primary key default gen_random_uuid(),

  booking_id uuid references bookings(id),

  agora_room text,
  start_time timestamptz,
  end_time timestamptz,

  status text default 'scheduled'
  check (status in ('scheduled','active','completed'))
);


alter table bookings enable row level security;
alter table sessions enable row level security;


create policy "user_can_book"
on bookings
for insert
with check (auth.uid() = user_id);



