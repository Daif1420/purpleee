-- شغّل الملف ده في Supabase > SQL Editor
create table products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null, name text not null, category text not null,
  price int not null, compare_at int, sizes text[] not null default '{S,M,L,XL}',
  images text[] not null default '{}', stock int not null default 10,
  active boolean not null default true, created_at timestamptz default now());
create table orders (
  id bigint generated always as identity (start with 1001) primary key,
  name text not null, phone text not null, email text, governorate text not null, address text not null,
  subtotal int not null, shipping int not null, total int not null,
  payment text not null default 'COD', status text not null default 'confirmed', created_at timestamptz default now());
create table order_items (
  id bigint generated always as identity primary key, order_id bigint references orders(id) on delete cascade,
  product_slug text not null, name text not null, size text not null, qty int not null, price int not null);
alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
-- الزوار يقروا المنتجات بس. الطلبات والأدمن بيتعاملوا من السيرفر بـ service role.
create policy "public read products" on products for select using (active);
insert into products (slug,name,category,price,compare_at,images) values
('p1','تيشيرت أوفر سايز','casual',250,320,'{https://picsum.photos/seed/purple1/600/800}'),
('p2','هودي بنفسجي','casual',600,null,'{https://picsum.photos/seed/purple2/600/800}'),
('p3','بيجامة قطن','homewear',450,550,'{https://picsum.photos/seed/purple3/600/800}'),
('p5','حجاب شيفون','hijab',150,null,'{https://picsum.photos/seed/purple5/600/800}'),
('p7','شنطة كروس','bags',750,null,'{https://picsum.photos/seed/purple7/600/800}');
