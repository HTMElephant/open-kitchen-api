SELECT
    r.*,
    u.id as user_id,
    u.first_name,
    u.last_name,
    u.created_at as user_created_at,
    u.profile_img,
    u.username
FROM
    recipes r
    JOIN users u ON u.id = r.user_id
WHERE
    r.id = 1;