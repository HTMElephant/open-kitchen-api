SELECT id, email
FROM users
WHERE email IN ($1:list)
