SELECT r.*
FROM kitchen_recipes kr 
JOIN recipes r on r.id = kr.recipe_id
WHERE kr.kitchen_id = ${id};