SELECT u.first_name, u.last_name, u.profile_img, u.id, ku.role
FROM users u
JOIN kitchen_users ku on u.id = ku.user_id 
WHERE ku.kitchen_id = ${id};