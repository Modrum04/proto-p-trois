const paymentQuery = `CREATE TABLE payment_type(id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    prepaid_payment TINYINT NULL,
    c_card_payment TINYINT NULL,
    cash_payment TINYINT NULL
    )`;

module.exports = paymentQuery;
