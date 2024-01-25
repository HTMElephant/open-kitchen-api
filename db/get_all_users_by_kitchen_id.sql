SELECT u.first_name, u.profile_img
FROM users u
JOIN kitchen_users ku on ku.kitchen_id = 37
WHERE u.id = ku.user_id;