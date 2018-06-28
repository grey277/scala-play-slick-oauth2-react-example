# --- !Ups

create table "basket" (
  "id" integer not null primary key autoincrement,
  "product_id" integer not null,
  FOREIGN KEY(product_id) REFERENCES product(id)
);

alter table "product" add "key_words" varchar(255);

create table "types" (
  "id" integer not null primary key autoincrement,
  "product_id" integer not null,
  "type" varchar(255),
  FOREIGN KEY(product_id) REFERENCES product(id)
);

create table "review" (
  "id" integer not null primary key autoincrement,
  "product_id" integer not null,
  "review_text" varchar(255),
  FOREIGN KEY(product_id) REFERENCES product(id)
);

create table "payment" (
  "id" integer not null primary key autoincrement,
  "status" varchar(255)
);

create table "order" (
  "id" integer not null primary key autoincrement
  "product_id" integer not null,
  "payment_id" integer not null,
  FOREIGN KEY(product_id) REFERENCES product(id)
  FOREIGN KEY(payment_id) REFERENCES payment(id)
);

# --- !Downs
ALTER TABLE product DROP key_words;
drop table "basket";
drop table "types";
drop table "review";
drop table "order";
drop table "payment";