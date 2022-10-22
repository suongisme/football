create table _USER
(
    id       varchar(255) primary key,
    username varchar(300) not null,
    password text         not null,
    phone    varchar(20)  not null,
    email    varchar(100) not null
);

create table _DISTRICT
(
    id   int auto_increment primary key,
    name nvarchar(100)
);

create table _PROVINCE
(
    id   int auto_increment primary key,
    name nvarchar(1000)
);

create table _STADIUM
(
    id          varchar(255) primary key,
    name        varchar(100) not null,
    address     text         not null,
    district_id int          not null,
    province_id int          not null,
    avatar      text         not null,
    description text,
    created_by  varchar(300) not null
);

create table _STADIUM_IMAGE
(
    id         int auto_increment primary key,
    image      text not null,
    stadium_id text not null
);

create table _STADIUM_OPTION
(
    id         int auto_increment primary key,
    name       varchar(100) not null,
    stadium_id text         not null
);

create table _STADIUM_DETAIL
(
    id         varchar(255) primary key,
    name       varchar(100) not null,
    start_time time         not null,
    end_time   time         not null,
    price      numeric      not null
);

create table _REQUEST (
                          id int auto_increment primary key ,
                          created_date datetime not null,
                          created_by varchar(100) not null,
                          status int not null,
                          has_competitor bool not null,
                          stadium_detail_id int not null,
                          competitor_id varchar(100) null,
                          hire_date date not null
);

create table _ROLE (
                       id int auto_increment primary key ,
                       name nvarchar(100) not null,
                       code varchar(100) not null
);

create table _CATEGORY (
                           id varchar(255) primary key ,
                           name nvarchar(100) not null
);

create table _PRODUCT (
                          id varchar(255) primary key ,
                          category_id varchar(255) not null,
                          name nvarchar(255) not null,
                          description text null,
                          price double not null,
                          quantity int not null,
                          created_date date,
                          created_by varchar(100) not null
);

create table _CART (
                       id int auto_increment primary key ,
                       product_id varchar(255) not null,
                       quantity int not null,
                       username varchar(100) not null
);

create table _BILL (
                       id varchar(255) primary key ,
                       buyer varchar(255) not null,
                       created_date datetime,
                       total double not null,
                       status int not null
);

create table _DETAIL_BILL (
                              id int auto_increment primary key ,
                              bill_id varchar(255) not null,
                              product_id varchar(255) not null,
                              price double not null,
                              quantity int not null
);