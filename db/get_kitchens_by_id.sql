SELECT * 
FROM kitchen 
JOIN kitchen_users ON kitchen.id = kitchen_users.kitchen_id 
JOIN users ON users.id = kitchen_users.user_id 
WHERE user_id = ${id};