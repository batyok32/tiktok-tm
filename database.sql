create database perntiktok;

\c perntiktok;

create table channel(
    id serial primary key,
    name varchar(255)
);

create table video(
    id serial primary key,
    song_name varchar(255),
    description text,
    video_url varchar(300),
    likes integer,
    shares integer,
    messages integer,
    channel_id integer references channel(id)
);


insert into channel(name) values ('batyr_gurbangullyew');           
insert into channel(name) values ('mekancik');           
insert into channel(name) values ('yhlas_gh');           

insert into video(song_name, description, video_url, likes, shares, messages, channel_id) values(
    'We will rock you', 'Something about lorem',
    '/videos/1.mp4', 105, 200, 15, 1
);

insert into video(song_name, description, video_url, likes, shares, messages, channel_id) values(
    'We are friends', 'Lorem text',
    '/videos/1.mp4', 10, 12, 14, 4
);

insert into video(song_name, description, video_url, likes, shares, messages, channel_id) values(
    'Tam reveli gory', 'Cool music',
    '/videos/1.mp4', 505, 999, 21, 5
);

select channel.name as channel_name, v.* from video v left join channel on channel.id=v.channel_id;

delete from channel where id=2;