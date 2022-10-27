create table if not exists _BILL
(
    id           varchar(255) not null
    primary key,
    buyer        varchar(255) not null,
    created_date datetime     null,
    total        double       not null,
    status       int          not null
    );

create table if not exists _CART
(
    id         int auto_increment
    primary key,
    product_id varchar(255) not null,
    quantity   int          not null,
    username   varchar(100) not null
    );

create table if not exists _CATEGORY
(
    id   varchar(255)                 not null
    primary key,
    name varchar(100) charset utf8mb3 not null
    );

create table if not exists _DETAIL_BILL
(
    id         int auto_increment
    primary key,
    bill_id    varchar(255) not null,
    product_id varchar(255) not null,
    price      double       not null,
    quantity   int          not null
    );

create table if not exists _DISTRICT
(
    id          int auto_increment
    primary key,
    name        varchar(100) charset utf8mb3 null,
    province_id int                          null
    );

create table if not exists _PRODUCT
(
    id           varchar(255)                 not null
    primary key,
    category_id  varchar(255)                 not null,
    name         varchar(255) charset utf8mb3 not null,
    description  text                         null,
    price        double                       not null,
    quantity     int                          not null,
    created_date date                         null,
    created_by   varchar(100)                 not null
    );

create table if not exists _PROVINCE
(
    id   int auto_increment
    primary key,
    name varchar(1000) charset utf8mb3 null
    );

create table if not exists _REQUEST
(
    id                int auto_increment
    primary key,
    created_date      datetime     not null,
    created_by        varchar(100) not null,
    status            int          not null,
    has_competitor    tinyint(1)   not null,
    stadium_detail_id int          not null,
    competitor_id     varchar(100) null,
    hire_date         date         not null
    );

create table if not exists _STADIUM
(
    id           varchar(255) not null
    primary key,
    name         varchar(100) not null,
    address      text         not null,
    district_id  int          not null,
    province_id  int          not null,
    avatar       text         not null,
    description  text         null,
    created_by   varchar(300) not null,
    created_date datetime     not null,
    status       int          not null
    );

create table if not exists _STADIUM_DETAIL
(
    id         int auto_increment
    primary key,
    name       varchar(100) not null,
    start_time time         not null,
    end_time   time         not null,
    price      decimal      not null,
    stadium_id varchar(255) null
    );

create table if not exists _STADIUM_IMAGE
(
    id         int auto_increment
    primary key,
    image      text not null,
    stadium_id text not null
);

create table if not exists _STADIUM_OPTION
(
    id         int auto_increment
    primary key,
    name       varchar(100) not null,
    stadium_id text         not null
    );

create table if not exists _USER
(
    id        varchar(255)                 not null
    primary key,
    username  varchar(300)                 not null,
    password  text                         not null,
    phone     varchar(20)                  not null,
    email     varchar(100)                 not null,
    role      varchar(100)                 null,
    otp_code  varchar(20)                  null,
    status    int                          null,
    full_name varchar(100) charset utf8mb3 not null
    );

