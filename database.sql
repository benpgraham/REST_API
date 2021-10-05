CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email varchar(50) NOT NULL,
    password varchar(50) NOT NULL,
    first_name varchar(20),
    last_name varchar(20)
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name varchar(50) NOT NULL,
    price money NOT NULL,
    description varchar(100),
    stock_level int NOT NULL
);

CREATE TABLE carts (
    id SERIAL PRIMARY KEY,
    created date NOT NULL,
    user_id int NOT NULL,
    modified date NOT NULL,
    converted varchar(20),
    is_active boolean NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE cart_product (
    id SERIAL PRIMARY KEY,
    product_id int NOT NULL,
    cart_id int NOT NULL,
    quantity int NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (cart_id) REFERENCES carts(id)
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    created date NOT NULL,
    modified date,
    total money NOT NULL,
    status varchar(20) NOT NULL,
    user_id int NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_product (
    id SERIAL PRIMARY KEY,
    created date NOT NULL,
    quantity int NOT NULL,
    price money NOT NULL,
    order_id int NOT NULL,
    product_id int NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
